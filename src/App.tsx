import React, { useEffect, useState } from 'react';
import { ViewTab, PlayerProfile, MatchRecord, MatchPlayer, AgentStat, CustomServer, PublicServer, RoleType, PlayerRoleStat, ServerData } from './types';
import { HeaderNavigation } from './components/HeaderNavigation';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { AgentStatsView } from './components/AgentStatsView';
import { LeaderboardView } from './components/LeaderboardView';
import { UploadMatchView } from './components/UploadMatchView';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PlayerProfileModal } from './components/PlayerProfileModal';
import { MatchDetailModal } from './components/MatchDetailModal';
import { CreateServerModal } from './components/CreateServerModal';
import { AmbientBackground } from './components/AmbientBackground';

const EMPTY_ROLE_STATS: Record<RoleType, PlayerRoleStat> = {
  타격대: { role: '타격대', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
  감시자: { role: '감시자', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
  전략가: { role: '전략가', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
  척후대: { role: '척후대', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
};

// A player uploaded in a match that has no existing profile yet gets a fresh one.
const createPlayerFromMatch = (p: MatchPlayer): PlayerProfile => {
  const kda = p.deaths > 0 ? Number(((p.kills + p.assists) / p.deaths).toFixed(2)) : p.kills + p.assists;
  const roleStats: Record<RoleType, PlayerRoleStat> = {
    ...EMPTY_ROLE_STATS,
    [p.role]: {
      role: p.role,
      matches: 1,
      wins: p.isWin ? 1 : 0,
      winRate: p.isWin ? 100 : 0,
      avgCombatScore: p.combatScore,
      avgKda: kda,
      topAgents: [{ agentName: p.agent, matches: 1, winRate: p.isWin ? 100 : 0, kda }],
    },
  };

  return {
    id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nickname: p.nickname,
    matchesCount: 1,
    wins: p.isWin ? 1 : 0,
    winRate: p.isWin ? 100 : 0,
    avgCombatScore: p.combatScore,
    totalKills: p.kills,
    totalDeaths: p.deaths,
    totalAssists: p.assists,
    avgKda: kda,
    joinedDate: new Date().toISOString().split('T')[0],
    recentAgents: [p.agent],
    roleStats,
    rank: 0,
  };
};

// Merges one match's result into an existing player's aggregate + per-role + per-agent stats.
const applyMatchToPlayer = (player: PlayerProfile, p: MatchPlayer): PlayerProfile => {
  const matchKda = p.deaths > 0 ? (p.kills + p.assists) / p.deaths : p.kills + p.assists;

  const prevRole = player.roleStats[p.role] || EMPTY_ROLE_STATS[p.role];
  const roleMatches = prevRole.matches + 1;
  const roleWins = prevRole.wins + (p.isWin ? 1 : 0);
  const roleAvgCombatScore = Math.round((prevRole.avgCombatScore * prevRole.matches + p.combatScore) / roleMatches);
  const roleAvgKda = Number((((prevRole.avgKda * prevRole.matches) + matchKda) / roleMatches).toFixed(2));

  const agentIdx = prevRole.topAgents.findIndex((a) => a.agentName === p.agent);
  const topAgents = [...prevRole.topAgents];
  if (agentIdx >= 0) {
    const prevAgent = topAgents[agentIdx];
    const agentMatches = prevAgent.matches + 1;
    const agentWins = Math.round((prevAgent.winRate / 100) * prevAgent.matches) + (p.isWin ? 1 : 0);
    topAgents[agentIdx] = {
      agentName: p.agent,
      matches: agentMatches,
      winRate: Math.round((agentWins / agentMatches) * 100),
      kda: Number((((prevAgent.kda * prevAgent.matches) + matchKda) / agentMatches).toFixed(2)),
    };
  } else {
    topAgents.push({ agentName: p.agent, matches: 1, winRate: p.isWin ? 100 : 0, kda: Number(matchKda.toFixed(2)) });
  }
  topAgents.sort((a, b) => b.matches - a.matches);

  const totalKills = player.totalKills + p.kills;
  const totalDeaths = player.totalDeaths + p.deaths;
  const totalAssists = player.totalAssists + p.assists;
  const matchesCount = player.matchesCount + 1;
  const wins = player.wins + (p.isWin ? 1 : 0);

  return {
    ...player,
    matchesCount,
    wins,
    totalKills,
    totalDeaths,
    totalAssists,
    winRate: Math.round((wins / matchesCount) * 100),
    avgCombatScore: Math.round((player.avgCombatScore * (matchesCount - 1) + p.combatScore) / matchesCount),
    avgKda: Number(((totalKills + totalAssists) / Math.max(1, totalDeaths)).toFixed(2)),
    recentAgents: Array.from(new Set([p.agent, ...player.recentAgents])).slice(0, 3),
    roleStats: {
      ...player.roleStats,
      [p.role]: {
        role: p.role,
        matches: roleMatches,
        wins: roleWins,
        winRate: Math.round((roleWins / roleMatches) * 100),
        avgCombatScore: roleAvgCombatScore,
        avgKda: roleAvgKda,
        topAgents,
      },
    },
  };
};

// Recomputes the agent roster's picks/wins/rates from every player in a newly added match.
const applyMatchToAgentRoster = (agents: AgentStat[], matchPlayers: MatchPlayer[]): AgentStat[] => {
  const updated = agents.map((a) => ({ ...a }));
  matchPlayers.forEach((p) => {
    const idx = updated.findIndex((a) => a.name === p.agent);
    if (idx === -1) return; // unrecognized agent name — leave roster untouched rather than guess
    const a = updated[idx];
    const matchKda = p.deaths > 0 ? (p.kills + p.assists) / p.deaths : p.kills + p.assists;
    const picksCount = a.picksCount + 1;
    const winsCount = a.winsCount + (p.isWin ? 1 : 0);
    updated[idx] = {
      ...a,
      picksCount,
      winsCount,
      winRate: Number(((winsCount / picksCount) * 100).toFixed(1)),
      avgKda: Number((((a.avgKda * a.picksCount) + matchKda) / picksCount).toFixed(2)),
      avgCombatScore: Number((((a.avgCombatScore * a.picksCount) + p.combatScore) / picksCount).toFixed(1)),
    };
  });
  const totalPicks = updated.reduce((sum, a) => sum + a.picksCount, 0) || 1;
  return updated.map((a) => ({ ...a, pickRate: Number(((a.picksCount / totalPicks) * 100).toFixed(1)) }));
};

// Helper to sort and recalculate sequential ranks (1, 2, 3, ...) for players
export const sortAndRankPlayers = (playerList: PlayerProfile[]): PlayerProfile[] => {
  const sorted = [...playerList].sort((a, b) => {
    if (b.winRate !== a.winRate) return b.winRate - a.winRate;
    if (b.avgCombatScore !== a.avgCombatScore) return b.avgCombatScore - a.avgCombatScore;
    if (b.avgKda !== a.avgKda) return b.avgKda - a.avgKda;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.matchesCount - a.matchesCount;
  });

  return sorted.map((player, index) => ({
    ...player,
    rank: index + 1,
  }));
};

export function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [serverName, setServerName] = useState<string>('');
  const [operatorId, setOperatorId] = useState<string>('');

  const [currentServerId, setCurrentServerId] = useState<string>('');
  const [serverData, setServerData] = useState<ServerData>({ players: [], matches: [], agents: [] });

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchRecord | null>(null);
  const [isCreateServerOpen, setIsCreateServerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Server data now lives on the backend (data/store.json), not per-browser —
  // fetch it whenever we switch into a server.
  useEffect(() => {
    if (!currentServerId) return;
    fetch(`/api/servers/${currentServerId}/data`)
      .then((r) => r.json())
      .then(setServerData);
  }, [currentServerId]);

  useEffect(() => {
    if (currentTab === 'admin' && !isAdmin) {
      setCurrentTab('dashboard');
    }
  }, [currentTab, isAdmin]);

  const { players, matches, agents } = serverData;

  const updateCurrentServerData = (updater: (data: ServerData) => ServerData) => {
    setServerData((prev) => {
      const next = updater(prev);
      fetch(`/api/servers/${currentServerId}/data`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      return next;
    });
  };

  // Handle Login
  const handleLoginSuccess = (server: PublicServer, opId: string, admin: boolean) => {
    setServerName(server.name);
    setOperatorId(opId);
    setCurrentServerId(server.id);
    setIsAdmin(admin);
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentTab('login');
  };

  // Delete the currently active server (admin-password gated on the backend)
  const handleDeleteServer = async (adminPassword: string): Promise<{ success: boolean; error?: string }> => {
    const res = await fetch(`/api/servers/${currentServerId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword }),
    });
    const data = await res.json();
    if (data.success) {
      handleLogout();
    }
    return data;
  };

  // Add Match from AI Screenshot Scanner
  const handleAddMatch = (newMatch: MatchRecord) => {
    updateCurrentServerData((data) => {
      const updatedMatches = [newMatch, ...data.matches];
      const updatedPlayers = data.players.map((player) => ({ ...player }));

      newMatch.players?.forEach((p) => {
        const existingIdx = updatedPlayers.findIndex((x) => x.nickname === p.nickname);
        if (existingIdx >= 0) {
          updatedPlayers[existingIdx] = applyMatchToPlayer(updatedPlayers[existingIdx], p);
        } else {
          updatedPlayers.push(createPlayerFromMatch(p));
        }
      });

      return {
        ...data,
        matches: updatedMatches,
        players: sortAndRankPlayers(updatedPlayers),
        agents: applyMatchToAgentRoster(data.agents, newMatch.players || []),
      };
    });
  };

  // Update Player Nickname
  const handleUpdateNickname = (playerId: string, newName: string) => {
    updateCurrentServerData((data) => ({
      ...data,
      players: data.players.map((p) => (p.id === playerId ? { ...p, nickname: newName } : p)),
    }));
  };

  // Merge Player Records
  const handleMergePlayers = (sourceId: string, targetId: string) => {
    const source = players.find((p) => p.id === sourceId);
    const target = players.find((p) => p.id === targetId);
    if (!source || !target) return;

    updateCurrentServerData((data) => {
      const mergedList = data.players
        .filter((p) => p.id !== sourceId)
        .map((p) => {
          if (p.id !== targetId) return p;

          const newMatches = p.matchesCount + source.matchesCount;
          const newWins = p.wins + source.wins;
          const newKills = p.totalKills + source.totalKills;
          const newDeaths = p.totalDeaths + source.totalDeaths;
          const newAssists = p.totalAssists + source.totalAssists;
          const newWinRate = newMatches > 0 ? Math.round((newWins / newMatches) * 100) : 0;
          const newAvgKda = Number(((newKills + newAssists) / Math.max(1, newDeaths)).toFixed(2));
          const newAvgCombatScore =
            newMatches > 0
              ? Math.round((p.avgCombatScore * p.matchesCount + source.avgCombatScore * source.matchesCount) / newMatches)
              : p.avgCombatScore;
          const combinedAgents = Array.from(new Set([...p.recentAgents, ...source.recentAgents])).slice(0, 3);

          return {
            ...p,
            matchesCount: newMatches,
            wins: newWins,
            winRate: newWinRate,
            avgKda: newAvgKda,
            avgCombatScore: newAvgCombatScore,
            totalKills: newKills,
            totalDeaths: newDeaths,
            totalAssists: newAssists,
            recentAgents: combinedAgents,
          };
        });

      return { ...data, players: sortAndRankPlayers(mergedList) };
    });
  };

  // Delete Match Record
  const handleDeleteMatch = (matchId: string) => {
    updateCurrentServerData((data) => ({
      ...data,
      matches: data.matches.filter((m) => m.id !== matchId),
    }));
  };

  // Create New Server — persisted on the backend, gets its own isolated (empty) dataset.
  const handleCreateServer = async (newServer: CustomServer) => {
    const res = await fetch('/api/servers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newServer),
    });
    const created: PublicServer = await res.json();
    setServerName(created.name);
    setOperatorId(created.operatorId);
    setCurrentServerId(created.id);
    setIsAdmin(true); // the creator set the admin password, so they start as admin
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  if (!isLoggedIn || currentTab === 'login') {
    return (
      <>
        <AmbientBackground />
        <LoginView
          onLoginSuccess={handleLoginSuccess}
          onOpenCreateServer={() => setIsCreateServerOpen(true)}
        />
        <CreateServerModal
          isOpen={isCreateServerOpen}
          onClose={() => setIsCreateServerOpen(false)}
          onCreateServer={handleCreateServer}
        />
      </>
    );
  }

  return (
    <div className="min-h-dvh text-zinc-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      <AmbientBackground />
      {/* Header Navigation */}
      <HeaderNavigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        serverName={serverName}
        operatorId={operatorId}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onOpenCreateServer={() => setIsCreateServerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        players={players}
        agents={agents}
        onSelectPlayer={(p) => setSelectedPlayer(p)}
        onSelectAgent={() => setCurrentTab('agent_stats')}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'dashboard' && (
          <DashboardView
            serverName={serverName}
            operatorId={operatorId}
            totalMatchesCount={matches.length}
            activePlayersCount={players.length}
            matches={matches}
            players={players}
            agents={agents}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
            onSelectMatch={(m) => setSelectedMatch(m)}
            onNavigateToUpload={() => setCurrentTab('upload')}
            onNavigateToLeaderboard={() => setCurrentTab('leaderboard')}
          />
        )}

        {currentTab === 'agent_stats' && (
          <AgentStatsView
            agents={agents}
            matches={matches}
            players={players}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            players={players}
            totalMatchesCount={matches.length}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
          />
        )}

        {currentTab === 'upload' && (
          <UploadMatchView
            onAddMatch={handleAddMatch}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'admin' && isAdmin && (
          <AdminPanelModal
            players={players}
            matches={matches}
            serverName={serverName}
            onUpdateNickname={handleUpdateNickname}
            onMergePlayers={handleMergePlayers}
            onDeleteMatch={handleDeleteMatch}
            onDeleteServer={handleDeleteServer}
          />
        )}
      </main>

      {/* Player Profile Modal */}
      <PlayerProfileModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      {/* Match Detail Modal */}
      <MatchDetailModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      {/* Create Server Modal */}
      <CreateServerModal
        isOpen={isCreateServerOpen}
        onClose={() => setIsCreateServerOpen(false)}
        onCreateServer={handleCreateServer}
      />
    </div>
  );
}

export default App;
