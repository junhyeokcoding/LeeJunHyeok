import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlayerProfile } from '../types';
import { getPreferredPositions } from '../data/mockData';
import { RoleIcon } from './RoleIcon';
import { Trophy, Search, Zap, Shield, ChevronRight, User, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface LeaderboardViewProps {
  players: PlayerProfile[];
  totalMatchesCount: number;
  onSelectPlayer: (player: PlayerProfile) => void;
}

const EASE = [0.32, 0.72, 0, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: EASE, delay },
});

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  players,
  totalMatchesCount,
  onSelectPlayer,
}) => {
  const [filterQuery, setFilterQuery] = useState<string>('');
  type SortableField = 'winRate' | 'avgCombatScore' | 'avgKda' | 'matchesCount';
  const [sortField, setSortField] = useState<SortableField | null>(null);
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  const handleSortClick = (field: SortableField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection('desc');
    } else if (sortDirection === 'desc') {
      setSortDirection('asc');
    } else {
      setSortField(null);
    }
  };

  // Default: global rank ascending (same order the rank badge reflects). Clicking 총경기수/승률/ACS/KDA cycles desc -> asc -> back to default.
  const sortedPlayers = [...players].sort((a, b) => {
    if (sortField) {
      const mult = sortDirection === 'desc' ? -1 : 1;
      return (a[sortField] - b[sortField]) * mult;
    }
    return a.rank - b.rank;
  });

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
    <div className="space-y-6 pb-16 font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-amber-300/90 bg-amber-500/10 ring-1 ring-amber-500/20 mb-3">
            <Trophy className="w-3 h-3" />
            Global Performance Ranking
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            내전 <span className="text-rose-400">리더보드</span>
          </h1>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="플레이어 닉네임 검색..."
            className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-rose-500/50 transition-all"
          />
        </div>
      </div>

      {/* Metric Summary Tiles */}
      <motion.div {...reveal()} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Trophy,
            label: '최고 KDA',
            value: topKdaPlayer ? `${topKdaPlayer.avgKda}` : '-',
            sub: topKdaPlayer ? `👑 ${topKdaPlayer.nickname}` : null,
            onClick: topKdaPlayer ? () => onSelectPlayer(topKdaPlayer) : undefined,
            tint: 'rose',
          },
          {
            icon: Zap,
            label: '최고 전투 점수',
            value: topAcsPlayer ? `${topAcsPlayer.avgCombatScore} ACS` : '-',
            sub: topAcsPlayer ? `⚡ ${topAcsPlayer.nickname}` : null,
            onClick: topAcsPlayer ? () => onSelectPlayer(topAcsPlayer) : undefined,
            tint: 'amber',
          },
          {
            icon: User,
            label: '등록 플레이어',
            value: `${players.length} 명`,
            sub: null,
            tint: 'cyan',
          },
          {
            icon: Shield,
            label: '분석 완료 매치',
            value: `${totalMatchesCount.toLocaleString()} 건`,
            sub: null,
            tint: 'emerald',
          },
        ].map(({ icon: Icon, label, value, sub, onClick, tint }) => (
          <div
            key={label}
            className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-xl p-4 flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                tint === 'rose'
                  ? 'bg-rose-500/10 text-rose-400'
                  : tint === 'amber'
                  ? 'bg-amber-500/10 text-amber-400'
                  : tint === 'cyan'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'bg-emerald-500/10 text-emerald-400'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-zinc-500 font-mono">{label}</div>
              <div className="text-lg font-semibold text-white font-mono leading-tight">{value}</div>
              {sub && (
                <div
                  onClick={onClick}
                  className={`text-[11px] font-semibold truncate mt-0.5 ${
                    tint === 'rose' ? 'text-rose-400' : 'text-amber-400'
                  } ${onClick ? 'cursor-pointer hover:underline' : ''}`}
                >
                  {sub}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Player Standings Table */}
      <motion.div {...reveal(0.1)} className="glass-shell shadow-xl shadow-black/30">
        <div className="glass-core backdrop-blur-xl p-6">
          <div className="overflow-x-auto rounded-2xl ring-1 ring-white/5">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-white/[0.02] text-zinc-500 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">순위</th>
                  <th className="py-3.5 px-4 font-semibold">플레이어 (닉네임)</th>
                  <th
                    onClick={() => handleSortClick('matchesCount')}
                    className={`py-3.5 px-4 font-semibold cursor-pointer select-none ${
                      sortField === 'matchesCount' ? 'text-rose-400' : 'hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>총 경기 수</span>
                      {sortField === 'matchesCount' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortClick('winRate')}
                    className={`py-3.5 px-4 font-semibold cursor-pointer select-none ${
                      sortField === 'winRate' ? 'text-rose-400' : 'hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>승률 (Win %)</span>
                      {sortField === 'winRate' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortClick('avgCombatScore')}
                    className={`py-3.5 px-4 font-semibold cursor-pointer select-none ${
                      sortField === 'avgCombatScore' ? 'text-rose-400' : 'hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>평균 전투점수 (ACS)</span>
                      {sortField === 'avgCombatScore' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortClick('avgKda')}
                    className={`py-3.5 px-4 font-semibold cursor-pointer select-none ${
                      sortField === 'avgKda' ? 'text-rose-400' : 'hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>KDA</span>
                      {sortField === 'avgKda' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">선호 포지션</th>
                  <th className="py-3.5 px-4 text-right font-semibold">프로필</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredPlayers.map((player) => (
                  <tr
                    key={player.id}
                    onClick={() => onSelectPlayer(player)}
                    className="hover:bg-white/[0.03] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div
                        className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                          player.rank === 1
                            ? 'bg-amber-500 text-black'
                            : player.rank === 2
                            ? 'bg-zinc-300 text-black'
                            : player.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-white/5 text-zinc-400'
                        }`}
                      >
                        #{player.rank}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-white group-hover:text-rose-400 text-sm transition-colors">
                      {player.nickname}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-zinc-400">
                      {player.matchesCount}전 {player.wins}승
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-sm">
                      {player.winRate}%
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-amber-400">
                      {player.avgCombatScore}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-zinc-200">
                      {player.avgKda}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getPreferredPositions(player).map((stat) => (
                          <span
                            key={stat.role}
                            className="px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10 text-[11px] text-zinc-200 font-mono flex items-center gap-1.5"
                          >
                            <RoleIcon role={stat.role} size="sm" />
                            <span>{stat.role}</span>
                            <span className="text-zinc-500">{stat.matches}전 {stat.winRate}%</span>
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1 text-xs text-rose-400 group-hover:translate-x-1 transition-transform duration-500 ease-premium">
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
      </motion.div>
    </div>
  );
};
