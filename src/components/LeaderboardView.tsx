import React, { useState } from 'react';
import { PlayerProfile } from '../types';
import { getAgentPortraitUrl } from '../data/mockData';
import { Trophy, Search, Flame, Zap, Award, Shield, ChevronRight, User } from 'lucide-react';

interface LeaderboardViewProps {
  players: PlayerProfile[];
  onSelectPlayer: (player: PlayerProfile) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  players,
  onSelectPlayer,
}) => {
  const [filterQuery, setFilterQuery] = useState<string>('');

  const sortedPlayers = [...players].sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const filteredPlayers = sortedPlayers.filter((p) =>
    p.nickname.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const topKdaPlayer = players.length > 0
    ? [...players].sort((a, b) => b.avgKda - a.avgKda)[0]
    : null;

  const topAcsPlayer = players.length > 0
    ? [...players].sort((a, b) => b.avgCombatScore - a.avgCombatScore)[0]
    : null;

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            GLOBAL PERFORMANCE RANKING
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono">
            내전 <span className="text-rose-500">리더보드</span>
          </h1>
        </div>

        {/* Player Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="플레이어 닉네임 검색..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50"
          />
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] text-zinc-400 font-mono">최고 KDA</div>
            <div className="text-lg font-black text-white font-mono leading-tight">
              {topKdaPlayer ? `${topKdaPlayer.avgKda}` : '-'}
            </div>
            {topKdaPlayer && (
              <div
                onClick={() => onSelectPlayer(topKdaPlayer)}
                className="text-[11px] text-rose-400 font-bold truncate cursor-pointer hover:underline mt-0.5"
                title={`달성자: ${topKdaPlayer.nickname}`}
              >
                👑 {topKdaPlayer.nickname}
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] text-zinc-400 font-mono">최고 전투 점수</div>
            <div className="text-lg font-black text-white font-mono leading-tight">
              {topAcsPlayer ? `${topAcsPlayer.avgCombatScore} ACS` : '-'}
            </div>
            {topAcsPlayer && (
              <div
                onClick={() => onSelectPlayer(topAcsPlayer)}
                className="text-[11px] text-amber-400 font-bold truncate cursor-pointer hover:underline mt-0.5"
                title={`달성자: ${topAcsPlayer.nickname}`}
              >
                ⚡ {topAcsPlayer.nickname}
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-zinc-400 font-mono">등록 플레이어</div>
            <div className="text-lg font-black text-white font-mono">{players.length} 명</div>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-zinc-400 font-mono">분석 완료 매치</div>
            <div className="text-lg font-black text-white font-mono">24.5K 건</div>
          </div>
        </div>
      </div>

      {/* Player Standings Table */}
      <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-mono text-[11px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">순위</th>
                <th className="py-3.5 px-4 font-bold">플레이어 (닉네임)</th>
                <th className="py-3.5 px-4 font-bold">총 경기 수</th>
                <th className="py-3.5 px-4 font-bold">승률 (Win %)</th>
                <th className="py-3.5 px-4 font-bold">평균 전투점수 (ACS)</th>
                <th className="py-3.5 px-4 font-bold">KDA</th>
                <th className="py-3.5 px-4 font-bold">주요 요원</th>
                <th className="py-3.5 px-4 text-right font-bold">프로필</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {filteredPlayers.map((player) => (
                <tr
                  key={player.id}
                  onClick={() => onSelectPlayer(player)}
                  className="hover:bg-zinc-950/80 cursor-pointer transition-colors group"
                >
                  {/* Rank Badge */}
                  <td className="py-3.5 px-4">
                    <div
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                        player.rank === 1
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                          : player.rank === 2
                          ? 'bg-zinc-300 text-black'
                          : player.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      #{player.rank}
                    </div>
                  </td>

                  {/* Nickname */}
                  <td className="py-3.5 px-4 font-bold text-white group-hover:text-red-400 text-sm transition-colors">
                    {player.nickname}
                  </td>

                  {/* Matches Count */}
                  <td className="py-3.5 px-4 font-mono text-zinc-300">
                    {player.matchesCount}전 {player.wins}승
                  </td>

                  {/* Win Rate */}
                  <td className="py-3.5 px-4 font-mono font-black text-emerald-400 text-sm">
                    {player.winRate}%
                  </td>

                  {/* ACS */}
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {player.avgCombatScore}
                  </td>

                  {/* KDA */}
                  <td className="py-3.5 px-4 font-mono font-bold text-zinc-200">
                    {player.avgKda}
                  </td>

                  {/* Recent Agents */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {player.recentAgents.map((ag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-zinc-800/90 border border-zinc-700/60 text-[11px] text-zinc-200 font-mono flex items-center gap-1.5 shadow-sm"
                        >
                          <img
                            src={getAgentPortraitUrl(ag)}
                            alt={ag}
                            referrerPolicy="no-referrer"
                            className="w-4 h-4 rounded-full object-cover bg-zinc-900 border border-zinc-600 shrink-0"
                          />
                          <span>{ag}</span>
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1 text-xs text-red-400 group-hover:translate-x-1 transition-transform">
                      <span>상세보기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
