import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AgentStat, MatchRecord, PlayerProfile, RoleType } from '../types';
import { RoleIcon } from './RoleIcon';
import { AgentPlayerUsageModal } from './AgentPlayerUsageModal';
import { Users, Filter, ArrowUpDown, Flame, Crosshair, ChevronRight } from 'lucide-react';

interface AgentStatsViewProps {
  agents: AgentStat[];
  matches?: MatchRecord[];
  players?: PlayerProfile[];
  onSelectPlayer?: (player: PlayerProfile) => void;
}

const EASE = [0.32, 0.72, 0, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: EASE, delay },
});

export const AgentStatsView: React.FC<AgentStatsViewProps> = ({
  agents,
  matches = [],
  players = [],
  onSelectPlayer,
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'pickRate' | 'winRate' | 'avgKda' | 'avgCombatScore'>('winRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedAgentForModal, setSelectedAgentForModal] = useState<AgentStat | null>(null);

  const topPickAgents = [...agents].sort((a, b) => b.pickRate - a.pickRate).slice(0, 3);
  const topWinAgents = [...agents].sort((a, b) => b.winRate - a.winRate).slice(0, 3);

  const filteredAgents = agents
    .filter((a) => selectedRoleFilter === 'ALL' || a.role === selectedRoleFilter)
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

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Title Header */}
      <div className="border-b border-white/5 pb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-rose-300/90 bg-rose-500/10 ring-1 ring-rose-500/20 mb-3">
          <Users className="w-3 h-3" />
          Vanguard Agent Analytics
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          요원별 <span className="text-rose-400">통계</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
          원하는 요원을 클릭하면 해당 요원을 사용한 플레이어 목록(판수, 승률, ACS, KDA)을 확인하실 수 있습니다.
        </p>
      </div>

      {/* Top Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div {...reveal()} className="glass-shell shadow-xl shadow-black/30">
          <div className="glass-core backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-cyan-400" />
                픽률 TOP 3
              </h2>
              <span className="text-xs text-zinc-500 font-mono">ALL MATCHES</span>
            </div>

            <div className="space-y-3">
              {topPickAgents.map((agent, idx) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentForModal(agent)}
                  className="space-y-1.5 cursor-pointer hover:bg-white/[0.03] p-2 rounded-2xl transition-colors duration-500 ease-premium group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-zinc-500">#{idx + 1}</span>
                      <img
                        src={agent.portraitUrl}
                        alt={agent.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-lg object-cover bg-white/5 ring-1 ring-white/10 group-hover:ring-rose-500/40 transition-all"
                      />
                      <span className="font-semibold text-white text-sm group-hover:text-rose-400 transition-colors">{agent.name}</span>
                      <RoleIcon role={agent.role} size="sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-sm font-bold text-cyan-400">{agent.pickRate}%</div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all duration-500 ease-premium" />
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      style={{ width: `${agent.pickRate * 5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal(0.05)} className="glass-shell shadow-xl shadow-black/30">
          <div className="glass-core backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                승률 TOP 3
              </h2>
              <span className="text-xs text-zinc-500 font-mono">ALL MATCHES</span>
            </div>

            <div className="space-y-3">
              {topWinAgents.map((agent, idx) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentForModal(agent)}
                  className="space-y-1.5 cursor-pointer hover:bg-white/[0.03] p-2 rounded-2xl transition-colors duration-500 ease-premium group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-zinc-500">#{idx + 1}</span>
                      <img
                        src={agent.portraitUrl}
                        alt={agent.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-lg object-cover bg-white/5 ring-1 ring-white/10 group-hover:ring-rose-500/40 transition-all"
                      />
                      <span className="font-semibold text-white text-sm group-hover:text-rose-400 transition-colors">{agent.name}</span>
                      <RoleIcon role={agent.role} size="sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-sm font-bold text-emerald-400">{agent.winRate}%</div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all duration-500 ease-premium" />
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
                      style={{ width: `${agent.winRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Role Filter Bar & Detailed Table */}
      <motion.div {...reveal(0.1)} className="glass-shell shadow-xl shadow-black/30">
        <div className="glass-core backdrop-blur-xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-400" />
              상세 요원 지표
            </h2>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['ALL', '타격대', '감시자', '전략가', '척후대'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRoleFilter(role)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-500 ease-premium flex items-center gap-1.5 ${
                    selectedRoleFilter === role
                      ? 'bg-rose-600 text-white'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white ring-1 ring-white/10'
                  }`}
                >
                  {role !== 'ALL' && <RoleIcon role={role as RoleType} size="sm" />}
                  <span>{role === 'ALL' ? '전체 요원' : role}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl ring-1 ring-white/5">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-white/[0.02] text-zinc-500 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">요원</th>
                  <th className="py-3.5 px-4 font-semibold">포지션 (Role)</th>
                  <th
                    onClick={() => handleSortToggle('pickRate')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>픽률 %</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortToggle('winRate')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>승률 %</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortToggle('avgKda')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>평균 KDA</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortToggle('avgCombatScore')}
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>ACS (전투점수)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-right font-semibold">사용자 목록</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    onClick={() => setSelectedAgentForModal(agent)}
                    className="hover:bg-white/[0.03] cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={agent.portraitUrl}
                          alt={agent.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-xl object-cover bg-white/5 ring-1 ring-white/10 group-hover:ring-rose-500/40 transition-all"
                        />
                        <div>
                          <div className="font-semibold text-white text-sm group-hover:text-rose-400 transition-colors">{agent.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{agent.englishName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <RoleIcon role={agent.role} size="md" showLabel />
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-cyan-400 text-sm">
                      {agent.pickRate}% ({agent.picksCount}회)
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-emerald-400 text-sm">
                      {agent.winRate}% ({agent.winsCount}승)
                    </td>

                    <td className="py-3 px-4 font-mono font-semibold text-zinc-200">{agent.avgKda}</td>

                    <td className="py-3 px-4 font-mono font-semibold text-amber-400">{agent.avgCombatScore}</td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1 text-xs text-rose-400 font-semibold group-hover:translate-x-1 transition-transform duration-500 ease-premium">
                        <span>사용 인원</span>
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

      <AgentPlayerUsageModal
        agent={selectedAgentForModal}
        matches={matches}
        players={players}
        onClose={() => setSelectedAgentForModal(null)}
        onSelectPlayer={(p) => {
          setSelectedAgentForModal(null);
          if (onSelectPlayer) onSelectPlayer(p);
        }}
      />
    </div>
  );
};
