import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import { MOCK_CUSTOM_SERVERS, INITIAL_AGENTS, INITIAL_MATCHES, INITIAL_PLAYERS } from "./src/data/mockData";
import type { CustomServer, ServerData } from "./src/types";

dotenv.config({ quiet: true });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser middleware
app.use(express.json({ limit: "25mb" }));

// --- Server-side data store (JSON file) ---------------------------------
// ponytail: whole-file read/write, no locking — fine for a handful of small
// custom-game servers. If this ever needs real concurrent writers, move to
// a real DB (e.g. Postgres) instead of hand-rolling locks around a JSON file.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

interface Store {
  servers: CustomServer[];
  serverData: Record<string, ServerData>;
}

const zeroedAgents = () =>
  INITIAL_AGENTS.map((a) => ({ ...a, picksCount: 0, winsCount: 0, pickRate: 0, winRate: 0, avgKda: 0, avgCombatScore: 0 }));

function loadStore(): Store {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
  } catch {
    const seeded: Store = {
      servers: MOCK_CUSTOM_SERVERS,
      serverData: Object.fromEntries(
        MOCK_CUSTOM_SERVERS.map((s) => [
          s.id,
          s.id === "srv-1"
            ? { players: INITIAL_PLAYERS, matches: INITIAL_MATCHES, agents: INITIAL_AGENTS }
            : { players: [], matches: [], agents: zeroedAgents() },
        ])
      ),
    };
    saveStore(seeded);
    return seeded;
  }
}

function saveStore(s: Store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(s));
}

const store = loadStore();

const stripPasswords = ({ publicPassword, adminPassword, ...rest }: CustomServer) => rest;

// API: create a custom server (persisted on the backend, not per-browser)
app.post("/api/servers", (req, res) => {
  const newServer: CustomServer = req.body;
  store.servers = [newServer, ...store.servers];
  store.serverData[newServer.id] = { players: [], matches: [], agents: zeroedAgents() };
  saveStore(store);
  res.json(stripPasswords(newServer));
});

// API: log in to a server by name + password (public or admin)
app.post("/api/servers/login", (req, res) => {
  const { name, password } = req.body;
  const server = store.servers.find((s) => s.name.trim() === String(name || "").trim());
  if (!server) {
    return res.status(404).json({ success: false, error: "존재하지 않는 서버입니다. 서버명을 확인하거나 새 서버를 생성해주세요." });
  }
  const isAdmin = password === server.adminPassword;
  if (!isAdmin && password !== server.publicPassword) {
    return res.status(401).json({ success: false, error: "비밀번호가 일치하지 않습니다." });
  }
  res.json({ success: true, isAdmin, server: stripPasswords(server) });
});

// API: read/write a server's roster + match data
app.get("/api/servers/:id/data", (req, res) => {
  res.json(store.serverData[req.params.id] || { players: [], matches: [], agents: [] });
});

app.put("/api/servers/:id/data", (req, res) => {
  store.serverData[req.params.id] = req.body;
  saveStore(store);
  res.json({ success: true });
});

// API: delete a custom server — requires that server's admin password
app.delete("/api/servers/:id", (req, res) => {
  const server = store.servers.find((s) => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ success: false, error: "존재하지 않는 서버입니다." });
  }
  if (req.body?.password !== server.adminPassword) {
    return res.status(401).json({ success: false, error: "관리자 비밀번호가 일치하지 않습니다." });
  }
  store.servers = store.servers.filter((s) => s.id !== req.params.id);
  delete store.serverData[req.params.id];
  saveStore(store);
  res.json({ success: true });
});

// Initialize Claude client (lazy/guarded on server)
const getClaudeClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
};

const MATCH_PLAYER_SCHEMA = {
  type: "object",
  properties: {
    nickname: { type: "string" },
    agent: { type: "string", description: "Korean agent name: 제트, 체임버, 클로브, 페이드, 피닉스, 소바, 레이나, 레이즈, 오멘, 킬조이, etc." },
    role: { type: "string", enum: ["타격대", "감시자", "전략가", "척후대"] },
    kills: { type: "integer" },
    deaths: { type: "integer" },
    assists: { type: "integer" },
    combatScore: { type: "integer" },
    isWin: { type: "boolean" },
  },
  required: ["nickname", "agent", "role", "kills", "deaths", "assists", "combatScore", "isWin"],
  additionalProperties: false,
};

const MATCH_RESULT_SCHEMA = {
  type: "object",
  properties: {
    mapName: { type: "string", description: "e.g. ASCENT, HAVEN, BIND, BREEZE, SUNSET, LOTUS, SPLIT" },
    result: { type: "string", enum: ["VICTORY", "DEFEAT"] },
    score: { type: "string", description: "e.g. 13-9" },
    matchType: { type: "string", description: "e.g. 10인 정규 매치, 10인 훈련 매치, 10인 연습 경기, 10인 스크림" },
    mvpPlayer: { type: "string" },
    players: { type: "array", items: MATCH_PLAYER_SCHEMA },
  },
  required: ["mapName", "result", "score", "matchType", "players"],
  additionalProperties: false,
};

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", version: "v2.4.0-TACTICAL" });
});

// API: Analyze match result image using Claude Vision
app.post("/api/analyze-match", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/png", fileName } = req.body;

    const client = getClaudeClient();

    if (!client) {
      // Fallback response if ANTHROPIC_API_KEY is not configured yet
      return res.json({
        success: true,
        isSimulated: true,
        matchData: {
          mapName: "ASCENT",
          result: "VICTORY",
          score: "13-11",
          matchType: "10인 정규 매치",
          mvpPlayer: "지군",
          players: [
            { nickname: "지군", agent: "제트", role: "타격대", kills: 24, deaths: 14, assists: 6, combatScore: 312, isWin: true },
            { nickname: "행복한오징어", agent: "체임버", role: "감시자", kills: 19, deaths: 12, assists: 4, combatScore: 245, isWin: true },
            { nickname: "Ailere99", agent: "클로브", role: "전략가", kills: 18, deaths: 15, assists: 9, combatScore: 238, isWin: true },
            { nickname: "Pies", agent: "소바", role: "척후대", kills: 15, deaths: 16, assists: 11, combatScore: 198, isWin: true },
            { nickname: "늦으면 노으시", agent: "킬조이", role: "감시자", kills: 12, deaths: 13, assists: 5, combatScore: 165, isWin: true },
            { nickname: "아니야나그런데", agent: "페이드", role: "척후대", kills: 21, deaths: 16, assists: 8, combatScore: 268, isWin: false },
            { nickname: "인생그게뭐길래", agent: "레이나", role: "타격대", kills: 17, deaths: 18, assists: 3, combatScore: 210, isWin: false },
            { nickname: "엉덩이보글덮밥", agent: "오멘", role: "전략가", kills: 14, deaths: 17, assists: 7, combatScore: 180, isWin: false },
            { nickname: "정신박약", agent: "피닉스", role: "타격대", kills: 16, deaths: 19, assists: 4, combatScore: 195, isWin: false },
            { nickname: "병장 노갱식", agent: "레이즈", role: "타격대", kills: 10, deaths: 18, assists: 2, combatScore: 140, isWin: false }
          ]
        }
      });
    }

    if (!imageBase64) {
      throw new Error("이미지가 없습니다.");
    }

    // Strip a data: URL header if present
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 4096,
      thinking: { type: "disabled" },
      output_config: {
        effort: "low",
        format: { type: "json_schema", schema: MATCH_RESULT_SCHEMA },
      },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mimeType, data: cleanBase64 },
            },
            {
              type: "text",
              text: `Analyze this Valorant/Tactical shooter match summary screenshot (${fileName || "match_result"}). Extract the scoreboard: map name, result, score, match type, MVP, and every player's nickname, agent, role, kills, deaths, assists, combat score, and win/loss.`,
            },
          ],
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      throw new Error("분석 요청이 거부되었습니다.");
    }

    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
    if (!textBlock) {
      throw new Error("Empty response from Claude");
    }

    const matchData = JSON.parse(textBlock.text);
    return res.json({ success: true, isSimulated: false, matchData });

  } catch (error: any) {
    console.error("Claude Match Analysis Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze match image"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Vanguard Tactical] Server running on http://localhost:${PORT}`);
  });
}

startServer();
