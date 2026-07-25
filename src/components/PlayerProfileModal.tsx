import React from 'react';
import { PlayerProfile, RoleType } from '../types';
import { getAgentPortraitUrl } from '../data/mockData';
import { RoleIcon } from './RoleIcon';
import { X, Trophy, Target, Shield, Flame, Activity, Zap } from 'lucide-react';

interface PlayerProfileModalProps {
  player: PlayerProfile | null;
  onClose: () => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  player,
  onClose,
}) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Player Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-xl flex items-center justify-center shadow-xl shadow-red-600/30 border border-red-500/40 font-mono">
              #{player.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono font-bold">
                  OPERATOR PROFILE
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  가입일: {player.joinedDate}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white font-mono mt-0.5">
                {player.nickname}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">총 전적</span>
              <span className="font-extrabold text-white text-sm">
                {player.matchesCount}전 {player.wins}승
              </span>
            </div>
            <div className="bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">승률</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                {player.winRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
            <div className="text-[11px] text-zinc-400 font-mono">평균 전투점수</div>
            <div className="text-xl font-black text-amber-400 font-mono mt-1">
              {player.avgCombatScore}
            </div>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
            <div className="text-[11px] text-zinc-400 font-mono">평균 KDA</div>
            <div className="text-xl font-black text-white font-mono mt-1">
              {player.avgKda}
            </div>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
            <div className="text-[11px] text-zinc-400 font-mono">누적 킬 / 데스 / 어시</div>
            <div className="text-sm font-bold text-zinc-300 font-mono mt-1">
              {player.totalKills} / {player.totalDeaths} / {player.totalAssists}
            </div>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
            <div className="text-[11px] text-zinc-400 font-mono mb-1.5">주요 플레이 요원</div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {player.recentAgents.map((ag, i) => (
                <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-bold text-cyan-400 font-mono">
                  <img
                    src={getAgentPortraitUrl(ag)}
                    alt={ag}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover bg-zinc-800 border border-zinc-700"
                  />
                  <span>{ag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Role & Agent Detailed Breakdown */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 font-mono">
            <Target className="w-4 h-4 text-red-500" />
            포지션별 (Role) 스탯 분석 & 요원 세부 기록
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['타격대', '감시자', '전략가', '척후대'] as RoleType[]).map((role) => {
              const stat = player.roleStats[role];
              return (
                <div
                  key={role}
                  className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
                    <RoleIcon role={role} size="md" showLabel />
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      {stat.matches}전 {stat.wins}승 ({stat.winRate}%)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500 text-[10px]">평균 ACS:</span>{' '}
                      <span className="font-bold text-amber-400">{stat.avgCombatScore}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px]">KDA:</span>{' '}
                      <span className="font-bold text-white">{stat.avgKda}</span>
                    </div>
                  </div>

                  {/* Top Agents in this Role */}
                  {stat.topAgents && stat.topAgents.length > 0 ? (
                    <div className="pt-2 border-t border-zinc-800/40 space-y-1.5">
                      <div className="text-[10px] text-zinc-500 font-mono">해당 포지션 대표 요원:</div>
                      {stat.topAgents.map((ag, i) => (
                        <div key={i} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-200 font-bold flex items-center gap-1.5">
                            <img
                              src={getAgentPortraitUrl(ag.agentName)}
                              alt={ag.agentName}
                              referrerPolicy="no-referrer"
                              className="w-4 h-4 rounded-full object-cover bg-zinc-800 border border-zinc-700"
                            />
                            <span>{ag.agentName}</span>
                          </span>
                          <span className="text-zinc-400 text-[11px]">
                            {ag.matches}판 • 승률 {ag.winRate}% • KDA {ag.kda}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-600 font-mono italic">기록된 요원 전적 없음</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
