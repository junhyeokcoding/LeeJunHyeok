import React, { useState, useRef, useEffect } from 'react';
import { ViewTab, PlayerProfile, AgentStat } from '../types';
import {
  LayoutDashboard,
  Users,
  Trophy,
  UploadCloud,
  ShieldAlert,
  Search,
  Server,
  LogOut,
  Sparkles,
  ChevronRight,
  X,
  User,
  Crosshair
} from 'lucide-react';
import { RoleIcon } from './RoleIcon';

interface HeaderNavigationProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  serverName: string;
  operatorId: string;
  onLogout: () => void;
  onOpenCreateServer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  players?: PlayerProfile[];
  agents?: AgentStat[];
  onSelectPlayer?: (player: PlayerProfile) => void;
  onSelectAgent?: (agent: AgentStat) => void;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentTab,
  onTabChange,
  serverName,
  operatorId,
  onLogout,
  onOpenCreateServer,
  searchQuery,
  setSearchQuery,
  players = [],
  agents = [],
  onSelectPlayer,
  onSelectAgent,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cleanQuery = searchQuery.trim().toLowerCase();

  const matchingPlayers = cleanQuery
    ? players.filter((p) => p.nickname.toLowerCase().includes(cleanQuery)).slice(0, 5)
    : [];

  const matchingAgents = cleanQuery
    ? agents
        .filter(
          (a) =>
            a.name.toLowerCase().includes(cleanQuery) ||
            a.englishName.toLowerCase().includes(cleanQuery) ||
            a.role.toLowerCase().includes(cleanQuery)
        )
        .slice(0, 5)
    : [];

  const hasResults = matchingPlayers.length > 0 || matchingAgents.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPlayerItem = (p: PlayerProfile) => {
    if (onSelectPlayer) {
      onSelectPlayer(p);
    }
    setSearchQuery('');
    setIsOpenDropdown(false);
  };

  const handleSelectAgentItem = (agent: AgentStat) => {
    if (onSelectAgent) {
      onSelectAgent(agent);
    } else {
      onTabChange('agent_stats');
    }
    setSearchQuery('');
    setIsOpenDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl">
      {/* Top Banner Status */}
      <div className="bg-gradient-to-r from-rose-950/70 via-zinc-900 to-zinc-950 px-4 py-1.5 border-b border-zinc-800/50 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-semibold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            LIVE SECURE NODE
          </span>
          <span className="hidden sm:inline font-mono text-zinc-500">|</span>
          <span className="hidden sm:inline text-zinc-300 font-mono">
            SERVER: <strong className="text-white">{serverName}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateServer}
            className="hover:text-rose-400 text-zinc-400 flex items-center gap-1 transition-colors text-[11px] font-medium"
          >
            <Server className="w-3.5 h-3.5 text-rose-400" />
            새 내전 서버 만들기
          </button>
          <span className="text-zinc-700">|</span>
          <button
            onClick={onLogout}
            className="hover:text-zinc-200 text-zinc-500 flex items-center gap-1 transition-colors text-[11px]"
            title="서버 접속 종료"
          >
            <LogOut className="w-3.5 h-3.5" />
            접속 종료
          </button>
        </div>
      </div>

      {/* Main Header Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Server Badge */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-rose-700 flex items-center justify-center text-white shadow-lg shadow-rose-950/40 group-hover:bg-rose-600 transition-all transform group-hover:scale-105 border border-rose-600/30">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5 font-mono">
                  VANGUARD <span className="text-rose-400 font-sans">TACTICAL</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono tracking-tight -mt-0.5">
                  CUSTOM MATCH ANALYTICS
                </div>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-1 text-xs text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-zinc-200">{serverName}</span>
              <span className="text-zinc-500">대시보드</span>
            </div>
          </div>

          {/* Active Search Box with Dropdown */}
          <div ref={searchRef} className="flex-1 max-w-xs sm:max-w-sm relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsOpenDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsOpenDropdown(true);
                }}
                placeholder="플레이어 / 요원 검색..."
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500/70 focus:ring-1 focus:ring-rose-500/30 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsOpenDropdown(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isOpenDropdown && cleanQuery.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-zinc-800/60 font-sans">
                {/* Section: Players */}
                {matchingPlayers.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3 h-3 text-rose-400" />
                      플레이어 검색 결과 ({matchingPlayers.length})
                    </div>
                    <div className="space-y-1 mt-1">
                      {matchingPlayers.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectPlayerItem(p)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono font-bold text-rose-400">
                              #{p.rank}
                            </span>
                            <div>
                              <div className="font-bold text-xs text-white group-hover:text-rose-400 transition-colors">
                                {p.nickname}
                              </div>
                              <div className="text-[10px] text-zinc-500 font-mono">
                                승률 {p.winRate}% | KDA {p.avgKda}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 group-hover:text-rose-400">
                            <span>프로필</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Agents */}
                {matchingAgents.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Crosshair className="w-3 h-3 text-cyan-400" />
                      요원 검색 결과 ({matchingAgents.length})
                    </div>
                    <div className="space-y-1 mt-1">
                      {matchingAgents.map((agent) => (
                        <div
                          key={agent.id}
                          onClick={() => handleSelectAgentItem(agent)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={agent.portraitUrl}
                              alt={agent.name}
                              referrerPolicy="no-referrer"
                              className="w-7 h-7 rounded-lg object-cover bg-zinc-800 border border-zinc-700"
                            />
                            <div>
                              <div className="font-bold text-xs text-white group-hover:text-rose-400 transition-colors flex items-center gap-1.5">
                                <span>{agent.name}</span>
                                <span className="text-[10px] text-zinc-500 font-normal font-mono">
                                  ({agent.englishName})
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                                <RoleIcon role={agent.role} size="sm" />
                                <span>픽률 {agent.pickRate}% | 승률 {agent.winRate}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 group-hover:text-rose-400">
                            <span>통계 보기</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results */}
                {!hasResults && (
                  <div className="p-6 text-center text-xs text-zinc-500">
                    '<span className="text-zinc-300 font-semibold">{searchQuery}</span>'에 관한 플레이어 또는 요원을 찾을 수 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-rose-950/60 text-rose-400 border border-rose-600/30 shadow-lg shadow-rose-950/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>대시보드</span>
            </button>

            <button
              onClick={() => onTabChange('agent_stats')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'agent_stats'
                  ? 'bg-rose-950/60 text-rose-400 border border-rose-600/30 shadow-lg shadow-rose-950/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>요원 통계</span>
            </button>

            <button
              onClick={() => onTabChange('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'leaderboard'
                  ? 'bg-rose-950/60 text-rose-400 border border-rose-600/30 shadow-lg shadow-rose-950/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>리더보드</span>
            </button>

            <button
              onClick={() => onTabChange('upload')}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'upload'
                  ? 'bg-rose-700 hover:bg-rose-600 text-white shadow-lg shadow-rose-950/40'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">경기 업로드</span>
              <span className="inline flex items-center gap-0.5 text-[9px] px-1 py-0.2 bg-rose-950 text-rose-300 rounded border border-rose-800/40">
                <Sparkles className="w-2.5 h-2.5" />
                AI
              </span>
            </button>

            <button
              onClick={() => onTabChange('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'admin'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/60'
              }`}
              title="관리자 설정"
            >
              <ShieldAlert className="w-4 h-4 text-zinc-400" />
              <span className="hidden lg:inline">관리자</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

