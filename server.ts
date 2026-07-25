import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(express.json({ limit: "25mb" }));

// Initialize Gemini Client (Lazy/guarded on server)
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", version: "v2.4.0-TACTICAL" });
});

// API: Analyze match result image using Gemini AI
app.post("/api/analyze-match", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/png", fileName } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        success: true,
        isSimulated: true,
        matchData: {
          mapName: "ASCENT",
          result: "VICTORY",
          score: "13-11",
          matchType: "10인 정규 매치",
          timestamp: new Date().toLocaleString("ko-KR"),
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

    // Call Gemini 3.6 Flash for screenshot vision OCR + analysis
    const parts: any[] = [];
    if (imageBase64) {
      // Clean base64 string if it contains data URL header
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64
        }
      });
    }

    parts.push({
      text: `Analyze this Valorant/Tactical shooter match summary screenshot (${fileName || "match_result"}). Extract scoreboard information.
      Return a structured JSON with:
      - mapName (e.g. ASCENT, HAVEN, BIND, BREEZE, SUNSET, LOTUS, SPLIT)
      - result ("VICTORY" or "DEFEAT")
      - score (e.g. "13-9")
      - matchType (e.g. "10인 정규 매치", "10인 훈련 매치", "10인 연습 경기", "10인 스크림")
      - timestamp (current string time)
      - mvpPlayer (nickname of MVP)
      - players: array of player objects with fields:
        - nickname (string)
        - agent (Korean agent name: 제트, 체임버, 클로브, 페이드, 피닉스, 소바, 레이나, 레이즈, 오멘, 킬조이, etc.)
        - role (Korean role name: 타격대, 감시자, 전략가, 척후대)
        - kills (number)
        - deaths (number)
        - assists (number)
        - combatScore (number)
        - isWin (boolean)`
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mapName: { type: Type.STRING },
            result: { type: Type.STRING },
            score: { type: Type.STRING },
            matchType: { type: Type.STRING },
            timestamp: { type: Type.STRING },
            mvpPlayer: { type: Type.STRING },
            players: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nickname: { type: Type.STRING },
                  agent: { type: Type.STRING },
                  role: { type: Type.STRING },
                  kills: { type: Type.NUMBER },
                  deaths: { type: Type.NUMBER },
                  assists: { type: Type.NUMBER },
                  combatScore: { type: Type.NUMBER },
                  isWin: { type: Type.BOOLEAN },
                },
                required: ["nickname", "agent", "role", "kills", "deaths", "assists", "combatScore", "isWin"]
              }
            }
          },
          required: ["mapName", "result", "score", "matchType", "players"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const parsedData = JSON.parse(text);
    return res.json({
      success: true,
      isSimulated: false,
      matchData: parsedData
    });

  } catch (error: any) {
    console.error("Gemini Match Analysis Error:", error);
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
