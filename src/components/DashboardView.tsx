import React from 'react';
import { motion } from 'motion/react';
import { AgentStat, MatchRecord, PlayerProfile, RoleType } from '../types';
import { RoleIcon } from './RoleIcon';
import { PillButton } from './ui/PillButton';
import {
  Trophy,
  Activity,
  Users,
  Target,
  TrendingUp,
  ChevronRight,
  Zap,
  Calendar,
  Award
} from 'lucide-react';

interface DashboardViewProps {
  serverName: string;
  operatorId: string;
  totalMatchesCount: number;
  activePlayersCount: number;
  matches: MatchRecord[];
  players: PlayerProfile[];
  agents: AgentStat[];
  onSelectPlayer: (player: PlayerProfile) => void;
  onSelectMatch: (match: MatchRecord) => void;
  onNavigateToUpload: () => void;
  onNavigateToLeaderboard: () => void;
}

const EASE = [0.32, 0.72, 0, 1] as const;

// Groups matches by ISO week (Monday start, parsed from either the seeded "YYYY. MM. DD"
// format or the "toLocaleString('ko-KR')" format newly-uploaded matches use) and returns
// the most recent weeks that actually have data — so an empty server shows an empty chart.
const getWeeklyTrend = (matches: MatchRecord[]): { label: string; count: number }[] => {
  const counts = new Map<string, number>();
  matches.forEach((m) => {
    const parsed = m.date.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    if (!parsed) return;
    const d = new Date(Number(parsed[1]), Number(parsed[2]) - 1, Number(parsed[3]));
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // roll back to Monday of that week
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  const recentKeys = Array.from(counts.keys()).sort().slice(-6);
  return recentKeys.map((key) => {
    const [, month, day] = key.split('-');
    return { label: `${parseInt(month, 10)}/${parseInt(day, 10)}`, count: counts.get(key)! };
  });
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: EASE, delay },
});

export const DashboardView: React.FC<DashboardViewProps> = ({
  serverName,
  operatorId,
  totalMatchesCount,
  activePlayersCount,
  matches,
  players,
  agents,
  onSelectPlayer,
  onSelectMatch,
  onNavigateToUpload,
  onNavigateToLeaderboard,
}) => {
  const sortedPlayers = [...players].sort((a, b) => b.winRate - a.winRate);
  const top3Players = sortedPlayers.slice(0, 3);
  const mostPlayedPlayer = [...players].sort(
    (a, b) => b.matchesCount - a.matchesCount || b.winRate - a.winRate
  )[0];

  // Match trend: derived from real match dates, so an empty/new server renders empty.
  const weeklyTrend = getWeeklyTrend(matches);
  const maxTrendCount = Math.max(1, ...weeklyTrend.map((d) => d.count));
  const trendPoints = weeklyTrend.map((d, i) => ({
    x: weeklyTrend.length > 1 ? (i / (weeklyTrend.length - 1)) * 500 : 250,
    y: 140 - (d.count / maxTrendCount) * 120,
    ...d,
  }));
  const trendLinePath = trendPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const trendAreaPoints =
    trendPoints.length > 0
      ? [
          ...trendPoints.map((p) => `${p.x},${p.y}`),
          `${trendPoints[trendPoints.length - 1].x},150`,
          `${trendPoints[0].x},150`,
        ].join(' ')
      : '';
  const prevCount = trendPoints.length >= 2 ? trendPoints[trendPoints.length - 2].count : null;
  const trendGrowthPct =
    prevCount !== null && prevCount > 0
      ? Math.round(((trendPoints[trendPoints.length - 1].count - prevCount) / prevCount) * 100)
      : null;

  // Role win rates: derived from the agent roster's own pick/win stats (zeroed for a new server).
  const rolesOrder: RoleType[] = ['타격대', '감시자', '척후대', '전략가'];
  const roleWinRates = rolesOrder.reduce((acc, role) => {
    const played = agents.filter((a) => a.role === role && a.picksCount > 0);
    acc[role] = played.length > 0 ? Math.round(played.reduce((s, a) => s + a.winRate, 0) / played.length) : 0;
    return acc;
  }, {} as Record<RoleType, number>);
  const playedAgents = agents.filter((a) => a.picksCount > 0);
  const overallAgentWinRate =
    playedAgents.length > 0
      ? Math.round(playedAgents.reduce((s, a) => s + a.winRate, 0) / playedAgents.length)
      : 0;

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Welcome Banner */}
      <motion.div {...reveal()} className="glass-shell shadow-2xl shadow-black/40">
        <div className="glass-core backdrop-blur-xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-rose-300/90 bg-rose-500/10 ring-1 ring-rose-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Active Node
                </span>
                <span className="text-zinc-600 text-xs font-mono">OPERATOR: {operatorId}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {serverName} <span className="text-rose-400">대시보드</span>
              </h1>
              <p className="text-sm text-zinc-500 mt-3 max-w-xl leading-relaxed">
                실시간 커스텀 내전 데이터 종합 분석 패널입니다. AI 결과 스크린샷 스캐닝 및
                플레이어별 종합 통계를 한눈에 확인하세요.
              </p>
            </div>

            <PillButton onClick={onNavigateToUpload} icon={Zap} className="shrink-0">
              경기 스크린샷 분석
            </PillButton>
          </div>

          {/* Top 3 Summary Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/5">
            {[
              {
                icon: Activity,
                label: '총 분석 경기 수',
                value: totalMatchesCount.toLocaleString(),
                unit: '건',
                tint: 'rose',
              },
              {
                icon: Users,
                label: '참여 플레이어',
                value: activePlayersCount.toLocaleString(),
                unit: '명',
                tint: 'cyan',
              },
              {
                icon: Trophy,
                label: '최다 플레이 (#1)',
                value: `${mostPlayedPlayer?.matchesCount ?? 0}전`,
                unit: `(${mostPlayedPlayer?.nickname || '-'})`,
                tint: 'amber',
              },
            ].map(({ icon: Icon, label, value, unit, tint }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/[0.02] ring-1 ring-white/5 p-4 flex items-center gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    tint === 'rose'
                      ? 'bg-rose-500/10 text-rose-400'
                      : tint === 'cyan'
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-zinc-500 font-mono">{label}</div>
                  <div className="text-xl font-semibold text-white font-mono mt-0.5 truncate">
                    {value} <span className="text-xs text-zinc-500 font-normal">{unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Bento Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Analysis Trend Chart */}
        <motion.div {...reveal(0.05)} className="lg:col-span-2 glass-shell shadow-xl shadow-black/30">
          <div className="glass-core backdrop-blur-xl p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-400" />
                  전체 매치 분석 추이
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  최근 6주간 등록된 10인 커스텀 경기 수 및 랭크 분포
                </p>
              </div>
              {trendGrowthPct !== null && (
                <span
                  className={`px-2.5 py-1 rounded-full ring-1 text-xs font-mono font-semibold ${
                    trendGrowthPct >= 0
                      ? 'bg-rose-500/10 ring-rose-500/20 text-rose-400'
                      : 'bg-white/5 ring-white/10 text-zinc-400'
                  }`}
                >
                  {trendGrowthPct >= 0 ? '+' : ''}
                  {trendGrowthPct}% {trendGrowthPct >= 0 ? '상승' : '하락'}
                </span>
              )}
            </div>

            {weeklyTrend.length === 0 ? (
              <div className="h-52 w-full flex items-center justify-center text-sm text-zinc-600">
                아직 등록된 매치가 없습니다.
              </div>
            ) : (
              <>
                <div className="relative h-52 w-full my-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
                    <defs>
                      <linearGradient id="matchTrendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <line x1="0" y1="20" x2="500" y2="20" stroke="#ffffff12" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#ffffff12" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#ffffff12" strokeDasharray="3 3" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="#ffffff12" strokeDasharray="3 3" />

                    {trendPoints.length > 1 && <polygon points={trendAreaPoints} fill="url(#matchTrendGrad)" />}

                    <path d={trendLinePath} fill="none" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" />

                    {trendPoints.map((p, i) => {
                      const isLast = i === trendPoints.length - 1;
                      return (
                        <React.Fragment key={p.label + i}>
                          {isLast && <circle cx={p.x} cy={p.y} r="4" fill="#fb7185" className="animate-ping" />}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={isLast ? 5 : 4}
                            fill={isLast ? '#fb7185' : '#050505'}
                            stroke="#fb7185"
                            strokeWidth={isLast ? 2 : 2}
                          />
                        </React.Fragment>
                      );
                    })}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-4 border-t border-white/5">
                  {weeklyTrend.map((d, i) => (
                    <span key={d.label + i} className={i === weeklyTrend.length - 1 ? 'text-rose-400 font-semibold' : ''}>
                      {d.label} ({d.count}건)
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Agent Win Rate Distribution */}
        <motion.div {...reveal(0.1)} className="glass-shell shadow-xl shadow-black/30">
          <div className="glass-core backdrop-blur-xl p-6">
            <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-cyan-400" />
              요원별 승률 분포
            </h2>
            <p className="text-xs text-zinc-500 mb-6">포지션(Role)별 내전 경기 평균 승률</p>

            <div className="flex items-center justify-center my-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-rose-500"
                    strokeDasharray={`${overallAgentWinRate}, 100`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-semibold text-white font-mono">{overallAgentWinRate}%</div>
                  <div className="text-[10px] text-zinc-500 font-mono">평균 승률</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {(['타격대', '감시자', '척후대', '전략가'] as RoleType[]).map((role) => (
                <div key={role} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <RoleIcon role={role} size="sm" showLabel />
                    <span className="font-mono font-semibold text-zinc-300">{roleWinRates[role]}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full"
                      style={{ width: `${roleWinRates[role]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lower Section: Top Players & Recent Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...reveal(0.05)} className="glass-shell shadow-xl shadow-black/30">
          <div className="glass-core backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
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

            <div className="space-y-2.5">
              {top3Players.map((player, idx) => (
                <div
                  key={player.id}
                  onClick={() => onSelectPlayer(player)}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] ring-1 ring-white/5 hover:ring-rose-500/30 cursor-pointer transition-all duration-500 ease-premium"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                        idx === 0
                          ? 'bg-amber-500 text-black'
                          : idx === 1
                          ? 'bg-zinc-300 text-black'
                          : 'bg-amber-700 text-white'
                      }`}
                    >
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white group-hover:text-rose-400 transition-colors">
                        {player.nickname}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {player.matchesCount}전 {player.wins}승 (KDA {player.avgKda})
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-base font-semibold text-emerald-400">{player.winRate}%</div>
                    <div className="text-[10px] text-zinc-600">ACS {player.avgCombatScore}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal(0.1)} className="lg:col-span-2 glass-shell shadow-xl shadow-black/30">
          <div className="glass-core backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
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

            <div className="space-y-2.5">
              {matches.slice(0, 4).map((match) => (
                <div
                  key={match.id}
                  onClick={() => onSelectMatch(match)}
                  className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] ring-1 ring-white/5 hover:ring-rose-500/30 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-500 ease-premium"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                        match.result === 'VICTORY'
                          ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20'
                      }`}
                    >
                      {match.result}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm font-mono">{match.mapName}</span>
                        <span className="text-xs text-zinc-500 font-mono">({match.score})</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">
                          {match.matchType}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-600 font-mono mt-0.5">
                        {match.date} • MVP: <strong className="text-amber-400 font-medium">{match.mvpPlayer}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 overflow-hidden">
                      {match.players.slice(0, 5).map((p, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-zinc-800 ring-2 ring-[#0a0a0b] flex items-center justify-center text-[10px] font-semibold text-zinc-300"
                          title={`${p.nickname} (${p.agent})`}
                        >
                          {p.nickname.slice(0, 1)}
                        </div>
                      ))}
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
