import React, { useState } from 'react';
import { AgentStat, MatchRecord, PlayerProfile, PlayerRoleStat } from '../types';
import { RoleIcon } from './RoleIcon';
import { X, ArrowUpDown, ChevronRight, Search } from 'lucide-react';

export interface AgentPlayerUsage {
  nickname: string;
  matchesCount: number;
  winsCount: number;
  winRate: number;
  avgCombatScore: number;
  avgKda: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
}

interface AgentPlayerUsageModalProps {
  agent: AgentStat | null;
  matches?: MatchRecord[];
  players?: PlayerProfile[];
  onClose: () => void;
  onSelectPlayer?: (player: PlayerProfile) => void;
}

export const AgentPlayerUsageModal: React.FC<AgentPlayerUsageModalProps> = ({
  agent,
  matches = [],
  players = [],
  onClose,
  onSelectPlayer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'matchesCount' | 'winRate' | 'avgCombatScore' | 'avgKda'>('matchesCount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (!agent) return null;

  // Derive player usage for this agent from matches and player profiles
  const usageMap: Record<string, {
    nickname: string;
    matchesCount: number;
    winsCount: number;
    totalKills: number;
    totalDeaths: number;
    totalAssists: number;
    totalCombatScore: number;
  }> = {};

  // 1. Aggregate from match records
  matches.forEach((m) => {
    m.players.forEach((p) => {
      const matchAgentName = p.agent.trim().toLowerCase();
      const targetAgentName = agent.name.trim().toLowerCase();
      
      if (matchAgentName === targetAgentName || matchAgentName.includes(targetAgentName) || targetAgentName.includes(matchAgentName)) {
        if (!usageMap[p.nickname]) {
          usageMap[p.nickname] = {
            nickname: p.nickname,
            matchesCount: 0,
            winsCount: 0,
            totalKills: 0,
            totalDeaths: 0,
            totalAssists: 0,
            totalCombatScore: 0,
          };
        }
        const rec = usageMap[p.nickname];
        rec.matchesCount += 1;
        if (p.isWin) rec.winsCount += 1;
        rec.totalKills += p.kills;
        rec.totalDeaths += p.deaths;
        rec.totalAssists += p.assists;
        rec.totalCombatScore += p.combatScore;
      }
    });
  });

  // 2. Aggregate from player profile roleStats topAgents if missing or sparse
  players.forEach((pl) => {
    (Object.values(pl.roleStats) as PlayerRoleStat[]).forEach((roleStat) => {
      if (roleStat && roleStat.topAgents) {
        roleStat.topAgents.forEach((ta) => {
          const taName = ta.agentName.trim().toLowerCase();
          const targetName = agent.name.trim().toLowerCase();
          if (taName === targetName || taName.includes(targetName) || targetName.includes(taName)) {
            if (!usageMap[pl.nickname]) {
              usageMap[pl.nickname] = {
                nickname: pl.nickname,
                matchesCount: ta.matches,
                winsCount: Math.round((ta.winRate / 100) * ta.matches),
                totalKills: Math.round(ta.kda * 8 * ta.matches),
                totalDeaths: Math.max(1, 8 * ta.matches),
                totalAssists: Math.round(4 * ta.matches),
                totalCombatScore: roleStat.avgCombatScore || pl.avgCombatScore,
              };
            }
          }
        });
      }
    });
  });

  // Convert map to list and calculate metrics
  const playerUsages: AgentPlayerUsage[] = Object.values(usageMap).map((u) => {
    const winRate = u.matchesCount > 0 ? Math.round((u.winsCount / u.matchesCount) * 100) : 0;
    const avgCombatScore = u.matchesCount > 0 ? Math.round(u.totalCombatScore / u.matchesCount) : 0;
    const avgKda = u.totalDeaths > 0
      ? Number(((u.totalKills + u.totalAssists) / u.totalDeaths).toFixed(2))
      : Number((u.totalKills + u.totalAssists).toFixed(2));

    return {
      nickname: u.nickname,
      matchesCount: u.matchesCount,
      winsCount: u.winsCount,
      winRate,
      avgCombatScore,
      avgKda,
      totalKills: u.totalKills,
      totalDeaths: u.totalDeaths,
      totalAssists: u.totalAssists,
    };
  });

  // Filter and sort
  const filteredList = playerUsages
    .filter((p) => p.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const mult = sortDirection === 'desc' ? -1 : 1;
      return (a[sortField] - b[sortField]) * mult;
    });

  const handleSortToggle = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleRowClick = (nickname: string) => {
    const foundPlayer = players.find((p) => p.nickname === nickname);
    if (foundPlayer && onSelectPlayer) {
      onSelectPlayer(foundPlayer);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-shell max-w-4xl w-full my-8 shadow-2xl shadow-black/50">
        <div className="glass-core backdrop-blur-2xl p-6 sm:p-8 relative font-sans">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors duration-500 ease-premium flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={agent.portraitUrl}
                alt={agent.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover bg-zinc-800 ring-2 ring-rose-500/40"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <RoleIcon role={agent.role} size="sm" showLabel />
                  <span className="text-xs text-zinc-500 font-mono">AGENT ANALYTICS</span>
                </div>
                <h2 className="text-2xl font-semibold text-white font-display flex items-center gap-2">
                  <span>{agent.name}</span>
                  <span className="text-xs font-normal text-zinc-500 font-sans">({agent.englishName})</span>
                  <span className="text-rose-400 text-lg">사용 인원 목록</span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="bg-white/[0.03] ring-1 ring-white/10 px-3 py-2 rounded-2xl text-center">
                <span className="text-zinc-500 block text-[10px]">총 선택 횟수</span>
                <span className="font-bold text-cyan-400 text-sm">{agent.picksCount}회</span>
              </div>
              <div className="bg-white/[0.03] ring-1 ring-white/10 px-3 py-2 rounded-2xl text-center">
                <span className="text-zinc-500 block text-[10px]">평균 승률</span>
                <span className="font-bold text-emerald-400 text-sm">{agent.winRate}%</span>
              </div>
              <div className="bg-white/[0.03] ring-1 ring-white/10 px-3 py-2 rounded-2xl text-center">
                <span className="text-zinc-500 block text-[10px]">플레이어 수</span>
                <span className="font-bold text-white text-sm">{playerUsages.length}명</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="플레이어 닉네임 검색..."
                className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div className="text-xs text-zinc-500 font-mono">
              클릭하여 해당 플레이어 상세 프로필 조회 가능
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl ring-1 ring-white/5">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-white/[0.02] text-zinc-500 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">#</th>
                  <th className="py-3.5 px-4 font-semibold">플레이어 (이름)</th>
                  <th
                    onClick={() => handleSortToggle('matchesCount')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>판수 (경기 수)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortToggle('winRate')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>승률 (%)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortToggle('avgCombatScore')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>평균 전투 점수 (ACS)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortToggle('avgKda')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>KDA</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-right font-semibold">상세</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredList.length > 0 ? (
                  filteredList.map((p, idx) => (
                    <tr
                      key={p.nickname}
                      onClick={() => handleRowClick(p.nickname)}
                      className="hover:bg-white/[0.03] cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono text-zinc-500 font-bold">#{idx + 1}</td>
                      <td className="py-3 px-4 font-semibold text-white group-hover:text-rose-400 transition-colors text-sm">
                        {p.nickname}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-zinc-200">{p.matchesCount}판</td>
                      <td className="py-3 px-4 font-mono font-extrabold text-emerald-400">
                        {p.winRate}% <span className="text-[10px] font-normal text-zinc-400">({p.winsCount}승 {p.matchesCount - p.winsCount}패)</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-400 text-sm">{p.avgCombatScore}</td>
                      <td className="py-3 px-4 font-mono">
                        <span className="font-bold text-white text-sm">{p.avgKda}</span>
                        <span className="text-[10px] text-zinc-500 block">
                          ({p.totalKills} / {p.totalDeaths} / {p.totalAssists})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1 text-xs text-rose-400 group-hover:translate-x-1 transition-transform duration-500 ease-premium">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-zinc-500 font-mono">
                      해당 요원을 사용한 기록이 있는 플레이어가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
