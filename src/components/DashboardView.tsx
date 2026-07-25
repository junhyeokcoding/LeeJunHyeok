import React from 'react';
import { AgentStat, MatchRecord, PlayerProfile, RoleType } from '../types';
import { RoleIcon } from './RoleIcon';
import {
  Trophy,
  Activity,
  Users,
  Target,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Zap,
  Calendar,
  Award
} from 'lucide-react';

interface DashboardViewProps {
  serverName: string;
  operatorId: string;
  matches: MatchRecord[];
  players: PlayerProfile[];
  agents: AgentStat[];
  onSelectPlayer: (player: PlayerProfile) => void;
  onNavigateToUpload: () => void;
  onNavigateToLeaderboard: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  serverName,
  operatorId,
  matches,
  players,
  agents,
  onSelectPlayer,
  onNavigateToUpload,
  onNavigateToLeaderboard,
}) => {
  // Top 3 Players by Win Rate
  const sortedPlayers = [...players].sort((a, b) => b.winRate - a.winRate);
  const top3Players = sortedPlayers.slice(0, 3);

  // Role winrate calculations
  const roleWinRates: Record<RoleType, number> = {
    타격대: 82,
    감시자: 71,
    척후대: 65,
    전략가: 48,
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-rose-950/30 p-6 sm:p-8 border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                ACTIVE NODE
              </span>
              <span className="text-zinc-500 text-xs font-mono">
                OPERATOR: {operatorId}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              {serverName} <span className="text-rose-400">대시보드</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              실시간 커스텀 내전 데이터 종합 분석 패널입니다. AI 결과 스크린샷 스캐닝 및 플레이어별 종합 통계를 한눈에 확인하세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToUpload}
              className="px-5 py-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-950/40 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>경기 스크린샷 분석</span>
            </button>
          </div>
        </div>

        {/* Top 3 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-zinc-400 font-mono">총 분석 경기 수</div>
              <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                1,402 <span className="text-xs text-rose-400 font-normal">건</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-zinc-400 font-mono">참여 플레이어</div>
              <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                86 <span className="text-xs text-cyan-400 font-normal">명</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-zinc-400 font-mono">최고 승률 (#1)</div>
              <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                75% <span className="text-xs text-amber-400 font-normal">({top3Players[0]?.nickname || '지군'})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bento Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Analysis Trend Chart (2 columns on large screen) */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rose-400" />
                전체 매치 분석 추이
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                최근 6개월간 등록된 10인 커스텀 경기 수 및 랭크 분포
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold">
                +18% 상승
              </span>
            </div>
          </div>

          {/* Custom SVG Line Chart */}
          <div className="relative h-52 w-full my-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
              <defs>
                <linearGradient id="matchTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#27272a" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="#27272a" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#27272a" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#27272a" strokeDasharray="3 3" />

              {/* Gradient Area */}
              <polygon
                points="0,120 80,95 160,110 240,65 320,80 400,35 500,25 500,150 0,150"
                fill="url(#matchTrendGrad)"
              />

              {/* Smooth Line */}
              <path
                d="M 0 120 Q 40 100, 80 95 T 160 110 T 240 65 T 320 80 T 400 35 T 500 25"
                fill="none"
                stroke="#e11d48"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data Points */}
              <circle cx="80" cy="95" r="4" fill="#e11d48" className="animate-ping" />
              <circle cx="80" cy="95" r="4" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />

              <circle cx="240" cy="65" r="4" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
              <circle cx="400" cy="35" r="5" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
              <circle cx="500" cy="25" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pt-4 border-t border-zinc-800/80">
            <span>9월 (180건)</span>
            <span>10월 (210건)</span>
            <span>11월 (240건)</span>
            <span>12월 (290건)</span>
            <span>1월 (320건)</span>
            <span className="text-rose-400 font-bold">2월 (380건)</span>
          </div>
        </div>

        {/* Agent Win Rate Distribution Donut / Progress Bars */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-cyan-400" />
              요원별 승률 분포
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              포지션(Role)별 내전 경기 평균 승률
            </p>

            {/* Circular Graphic & Role Breakdown */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-zinc-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-rose-500"
                    strokeDasharray="74, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-black text-white font-mono">74%</div>
                  <div className="text-[10px] text-zinc-400 font-mono">평균 승률</div>
                </div>
              </div>
            </div>

            {/* Role Win Rate Progress List */}
            <div className="space-y-3 mt-4">
              {(['타격대', '감시자', '척후대', '전략가'] as RoleType[]).map((role) => (
                <div key={role} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <RoleIcon role={role} size="sm" showLabel />
                    <span className="font-mono font-bold text-zinc-200">
                      {roleWinRates[role]}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full"
                      style={{ width: `${roleWinRates[role]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section Grid: Top Win Rate Players & Recent Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Win Rate Players List */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              승률 상위 플레이어
            </h2>
            <button
              onClick={onNavigateToLeaderboard}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-0.5 font-medium transition-colors"
            >
              전체 보기 &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {top3Players.map((player, idx) => (
              <div
                key={player.id}
                onClick={() => onSelectPlayer(player)}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-rose-500/40 hover:bg-zinc-900 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                      idx === 0
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                        : idx === 1
                        ? 'bg-zinc-300 text-black'
                        : 'bg-amber-700 text-white'
                    }`}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">
                      {player.nickname}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      {player.matchesCount}전 {player.wins}승 (KDA {player.avgKda})
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-base font-extrabold text-emerald-400">
                    {player.winRate}%
                  </div>
                  <div className="text-[10px] text-zinc-500">ACS {player.avgCombatScore}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches List */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-400" />
              최근 10인 매치 기록
            </h2>
            <button
              onClick={onNavigateToUpload}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              새 경기 스캔
            </button>
          </div>

          <div className="space-y-3">
            {matches.slice(0, 4).map((match) => (
              <div
                key={match.id}
                className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                      match.result === 'VICTORY'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {match.result}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm font-mono">
                        {match.mapName}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        ({match.score})
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                        {match.matchType}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                      {match.date} • MVP: <strong className="text-amber-400">{match.mvpPlayer}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {match.players.slice(0, 5).map((p, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-300"
                        title={`${p.nickname} (${p.agent})`}
                      >
                        {p.nickname.slice(0, 1)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
