import React, { useState } from 'react';
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

  // Top 3 Pick Rate
  const topPickAgents = [...agents].sort((a, b) => b.pickRate - a.pickRate).slice(0, 3);
  // Top 3 Win Rate
  const topWinAgents = [...agents].sort((a, b) => b.winRate - a.winRate).slice(0, 3);

  // Filtering & Sorting
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
    <div className="space-y-6 pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <Users className="w-4 h-4 text-rose-400" />
            VANGUARD AGENT ANALYTICS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono">
            요원별 <span className="text-rose-400">통계</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            원하는 요원을 클릭하면 해당 요원을 사용한 플레이어 목록(판수, 승률, ACS, KDA)을 확인하실 수 있습니다.
          </p>
        </div>
      </div>

      {/* Top Indicators: Pick Rate TOP3 & Win Rate TOP3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pick Rate Top 3 */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              픽률 TOP 3
            </h2>
            <span className="text-xs text-zinc-400 font-mono">ALL MATCHES</span>
          </div>

          <div className="space-y-4">
            {topPickAgents.map((agent, idx) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentForModal(agent)}
                className="space-y-1.5 cursor-pointer hover:bg-zinc-800/50 p-2 rounded-xl transition-colors group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-zinc-400">#{idx + 1}</span>
                    <img
                      src={agent.portraitUrl}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-lg object-cover bg-zinc-800 border border-zinc-700 group-hover:border-rose-500/50 transition-colors"
                    />
                    <span className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors">{agent.name}</span>
                    <RoleIcon role={agent.role} size="sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm font-extrabold text-cyan-400">
                      {agent.pickRate}%
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    style={{ width: `${agent.pickRate * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Win Rate Top 3 */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              승률 TOP 3
            </h2>
            <span className="text-xs text-zinc-400 font-mono">ALL MATCHES</span>
          </div>

          <div className="space-y-4">
            {topWinAgents.map((agent, idx) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentForModal(agent)}
                className="space-y-1.5 cursor-pointer hover:bg-zinc-800/50 p-2 rounded-xl transition-colors group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-zinc-400">#{idx + 1}</span>
                    <img
                      src={agent.portraitUrl}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-lg object-cover bg-zinc-800 border border-zinc-700 group-hover:border-rose-500/50 transition-colors"
                    />
                    <span className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors">{agent.name}</span>
                    <RoleIcon role={agent.role} size="sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm font-extrabold text-emerald-400">
                      {agent.winRate}%
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
                    style={{ width: `${agent.winRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Filter Bar & Detailed Indicator Table */}
      <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-400" />
            상세 요원 지표
          </h2>

          {/* Role Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', '타격대', '감시자', '전략가', '척후대'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRoleFilter(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedRoleFilter === role
                    ? 'bg-rose-700 hover:bg-rose-600 text-white shadow-lg shadow-rose-950/40'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {role !== 'ALL' && <RoleIcon role={role as RoleType} size="sm" />}
                <span>{role === 'ALL' ? '전체 요원' : role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Agents Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-mono text-[11px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">요원</th>
                <th className="py-3.5 px-4 font-bold">포지션 (Role)</th>
                <th
                  onClick={() => handleSortToggle('pickRate')}
                  className="py-3.5 px-4 font-bold cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>픽률 %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSortToggle('winRate')}
                  className="py-3.5 px-4 font-bold cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>승률 %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSortToggle('avgKda')}
                  className="py-3.5 px-4 font-bold cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>평균 KDA</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSortToggle('avgCombatScore')}
                  className="py-3.5 px-4 font-bold cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>ACS (전투점수)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right font-bold">사용자 목록</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {filteredAgents.map((agent) => (
                <tr
                  key={agent.id}
                  onClick={() => setSelectedAgentForModal(agent)}
                  className="hover:bg-zinc-950/80 cursor-pointer transition-colors group"
                >
                  {/* Agent Image & Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={agent.portraitUrl}
                        alt={agent.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover bg-zinc-800 border border-zinc-700 shadow group-hover:border-rose-500/50 transition-colors"
                      />
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors">{agent.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          {agent.englishName}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3 px-4">
                    <RoleIcon role={agent.role} size="md" showLabel />
                  </td>

                  {/* Pick Rate */}
                  <td className="py-3 px-4 font-mono font-extrabold text-cyan-400 text-sm">
                    {agent.pickRate}% ({agent.picksCount}회)
                  </td>

                  {/* Win Rate */}
                  <td className="py-3 px-4 font-mono font-extrabold text-emerald-400 text-sm">
                    {agent.winRate}% ({agent.winsCount}승)
                  </td>

                  {/* Avg KDA */}
                  <td className="py-3 px-4 font-mono font-bold text-zinc-200">
                    {agent.avgKda}
                  </td>

                  {/* Avg Combat Score */}
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">
                    {agent.avgCombatScore}
                  </td>

                  {/* Action link */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1 text-xs text-rose-400 font-bold group-hover:translate-x-1 transition-transform">
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

      {/* Agent Player Usage Modal */}
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

