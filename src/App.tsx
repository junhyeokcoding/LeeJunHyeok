import React, { useState } from 'react';
import { ViewTab, PlayerProfile, MatchRecord, AgentStat, CustomServer } from './types';
import { INITIAL_AGENTS, INITIAL_MATCHES, INITIAL_PLAYERS, MOCK_CUSTOM_SERVERS } from './data/mockData';
import { HeaderNavigation } from './components/HeaderNavigation';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { AgentStatsView } from './components/AgentStatsView';
import { LeaderboardView } from './components/LeaderboardView';
import { UploadMatchView } from './components/UploadMatchView';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PlayerProfileModal } from './components/PlayerProfileModal';
import { CreateServerModal } from './components/CreateServerModal';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [serverName, setServerName] = useState<string>('이준혁테스트');
  const [operatorId, setOperatorId] = useState<string>('이준혁테스트');

  const [matches, setMatches] = useState<MatchRecord[]>(INITIAL_MATCHES);
  const [players, setPlayers] = useState<PlayerProfile[]>(INITIAL_PLAYERS);
  const [agents, setAgents] = useState<AgentStat[]>(INITIAL_AGENTS);
  const [servers, setServers] = useState<CustomServer[]>(MOCK_CUSTOM_SERVERS);

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile | null>(null);
  const [isCreateServerOpen, setIsCreateServerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle Login
  const handleLoginSuccess = (selectedSrv: string, opId: string) => {
    setServerName(selectedSrv);
    setOperatorId(opId);
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab('login');
  };

  // Add Match from AI Screenshot Scanner
  const handleAddMatch = (newMatch: MatchRecord) => {
    setMatches((prev) => [newMatch, ...prev]);

    // Update Player stats dynamically
    if (newMatch.players && newMatch.players.length > 0) {
      setPlayers((prevPlayers) => {
        const updated = prevPlayers.map((player) => ({ ...player }));
        newMatch.players.forEach((p) => {
          const existing = updated.find((x) => x.nickname === p.nickname);
          if (existing) {
            existing.matchesCount += 1;
            if (p.isWin) existing.wins += 1;
            existing.totalKills += p.kills;
            existing.totalDeaths += p.deaths;
            existing.totalAssists += p.assists;
            existing.winRate = Math.round((existing.wins / existing.matchesCount) * 100);
            existing.avgCombatScore = Math.round(
              (existing.avgCombatScore * (existing.matchesCount - 1) + p.combatScore) / existing.matchesCount
            );
            existing.avgKda = Number(
              ((existing.totalKills + existing.totalAssists) / Math.max(1, existing.totalDeaths)).toFixed(2)
            );
          }
        });
        return sortAndRankPlayers(updated);
      });
    }
  };

  // Update Player Nickname
  const handleUpdateNickname = (playerId: string, newName: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, nickname: newName } : p))
    );
  };

  // Merge Player Records
  const handleMergePlayers = (sourceId: string, targetId: string) => {
    const source = players.find((p) => p.id === sourceId);
    const target = players.find((p) => p.id === targetId);

    if (source && target) {
      setPlayers((prev) => {
        const mergedList = prev
          .filter((p) => p.id !== sourceId)
          .map((p) => {
            if (p.id === targetId) {
              const newMatches = p.matchesCount + source.matchesCount;
              const newWins = p.wins + source.wins;
              const newKills = p.totalKills + source.totalKills;
              const newDeaths = p.totalDeaths + source.totalDeaths;
              const newAssists = p.totalAssists + source.totalAssists;
              const newWinRate = newMatches > 0 ? Math.round((newWins / newMatches) * 100) : 0;
              const newAvgKda = Number(
                ((newKills + newAssists) / Math.max(1, newDeaths)).toFixed(2)
              );
              const newAvgCombatScore = newMatches > 0
                ? Math.round((p.avgCombatScore * p.matchesCount + source.avgCombatScore * source.matchesCount) / newMatches)
                : p.avgCombatScore;

              const combinedAgents = Array.from(
                new Set([...p.recentAgents, ...source.recentAgents])
              ).slice(0, 3);

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
            }
            return p;
          });

        return sortAndRankPlayers(mergedList);
      });
    }
  };

  // Delete Match Record
  const handleDeleteMatch = (matchId: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== matchId));
  };

  // Create New Server
  const handleCreateServer = (newServer: CustomServer) => {
    setServers((prev) => [newServer, ...prev]);
    setServerName(newServer.name);
    setOperatorId(newServer.operatorId);
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  if (!isLoggedIn || currentTab === 'login') {
    return (
      <>
        <LoginView
          servers={servers}
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Header Navigation */}
      <HeaderNavigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        serverName={serverName}
        operatorId={operatorId}
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
            matches={matches}
            players={players}
            agents={agents}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
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
            onSelectPlayer={(p) => setSelectedPlayer(p)}
          />
        )}

        {currentTab === 'upload' && (
          <UploadMatchView
            onAddMatch={handleAddMatch}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPanelModal
            players={players}
            matches={matches}
            onUpdateNickname={handleUpdateNickname}
            onMergePlayers={handleMergePlayers}
            onDeleteMatch={handleDeleteMatch}
          />
        )}
      </main>

      {/* Player Profile Modal */}
      <PlayerProfileModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
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
