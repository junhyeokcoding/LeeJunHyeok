import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Crosshair,
  Menu,
} from 'lucide-react';
import { RoleIcon } from './RoleIcon';

interface HeaderNavigationProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  serverName: string;
  operatorId: string;
  isAdmin: boolean;
  onLogout: () => void;
  onOpenCreateServer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  players?: PlayerProfile[];
  agents?: AgentStat[];
  onSelectPlayer?: (player: PlayerProfile) => void;
  onSelectAgent?: (agent: AgentStat) => void;
}

const NAV_ITEMS: { tab: ViewTab; label: string; icon: React.ElementType }[] = [
  { tab: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { tab: 'agent_stats', label: '요원 통계', icon: Users },
  { tab: 'leaderboard', label: '리더보드', icon: Trophy },
  { tab: 'upload', label: '경기 업로드', icon: UploadCloud },
  { tab: 'admin', label: '관리자', icon: ShieldAlert },
];

const EASE = [0.32, 0.72, 0, 1] as const;

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentTab,
  onTabChange,
  serverName,
  operatorId,
  isAdmin,
  onLogout,
  onOpenCreateServer,
  searchQuery,
  setSearchQuery,
  players = [],
  agents = [],
  onSelectPlayer,
  onSelectAgent,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = NAV_ITEMS.filter((item) => item.tab !== 'admin' || isAdmin);

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
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSelectPlayerItem = (p: PlayerProfile) => {
    onSelectPlayer?.(p);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleSelectAgentItem = (agent: AgentStat) => {
    if (onSelectAgent) {
      onSelectAgent(agent);
    } else {
      onTabChange('agent_stats');
    }
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleMobileNav = (tab: ViewTab) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 pt-4 sm:pt-6 px-3 sm:px-6 pb-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Floating Glass Island */}
          <div className="glass-shell shadow-2xl shadow-black/40 flex-1 min-w-0">
            <div className="glass-core backdrop-blur-2xl flex items-center gap-1 px-2 py-1.5">
              {/* Brand */}
              <button
                onClick={() => onTabChange('dashboard')}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full shrink-0 group"
              >
                <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white transition-transform duration-700 ease-premium group-hover:scale-110">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <span className="hidden lg:inline font-display font-semibold text-sm tracking-tight text-white">
                  Vanguard
                </span>
              </button>

              <div className="hidden md:block w-px h-5 bg-white/10 mx-1" />

              {/* Desktop nav tabs */}
              <nav className="hidden md:flex items-center gap-0.5">
                {navItems.map(({ tab, label, icon: Icon }) => {
                  const isActive = currentTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => onTabChange(tab)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-500 ease-premium ${
                        isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      )}
                      <Icon className="w-3.5 h-3.5 relative" />
                      <span className="relative hidden xl:inline">{label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="flex-1" />

              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen((v) => !v)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-500 ease-premium"
                >
                  <Search className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute right-0 top-full mt-3 w-[min(22rem,85vw)] glass-shell shadow-2xl shadow-black/50 origin-top-right"
                    >
                      <div className="glass-core backdrop-blur-2xl overflow-hidden">
                        <div className="p-2.5 border-b border-white/5">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                              autoFocus
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="플레이어 / 요원 검색..."
                              className="w-full bg-white/[0.04] rounded-full pl-8 pr-8 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500/50 transition-all"
                            />
                            {searchQuery && (
                              <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {cleanQuery.length > 0 && (
                          <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                            {matchingPlayers.length > 0 && (
                              <div className="p-2">
                                <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <User className="w-3 h-3 text-rose-400" />
                                  플레이어 ({matchingPlayers.length})
                                </div>
                                {matchingPlayers.map((p) => (
                                  <div
                                    key={p.id}
                                    onClick={() => handleSelectPlayerItem(p)}
                                    className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-mono font-bold text-rose-400">
                                        #{p.rank}
                                      </span>
                                      <div>
                                        <div className="font-semibold text-xs text-white group-hover:text-rose-400 transition-colors">
                                          {p.nickname}
                                        </div>
                                        <div className="text-[10px] text-zinc-500 font-mono">
                                          승률 {p.winRate}% · KDA {p.avgKda}
                                        </div>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-400" />
                                  </div>
                                ))}
                              </div>
                            )}

                            {matchingAgents.length > 0 && (
                              <div className="p-2">
                                <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <Crosshair className="w-3 h-3 text-cyan-400" />
                                  요원 ({matchingAgents.length})
                                </div>
                                {matchingAgents.map((agent) => (
                                  <div
                                    key={agent.id}
                                    onClick={() => handleSelectAgentItem(agent)}
                                    className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <img
                                        src={agent.portraitUrl}
                                        alt={agent.name}
                                        referrerPolicy="no-referrer"
                                        className="w-7 h-7 rounded-lg object-cover bg-white/5"
                                      />
                                      <div>
                                        <div className="font-semibold text-xs text-white group-hover:text-rose-400 transition-colors">
                                          {agent.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                                          <RoleIcon role={agent.role} size="sm" />
                                          <span>픽률 {agent.pickRate}%</span>
                                        </div>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-400" />
                                  </div>
                                ))}
                              </div>
                            )}

                            {!hasResults && (
                              <div className="p-6 text-center text-xs text-zinc-500">
                                '{searchQuery}'에 대한 결과가 없습니다.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Live status dot (desktop only) */}
              <div className="hidden lg:flex items-center gap-1.5 pl-2 pr-1 shrink-0">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[8rem]">{serverName}</span>
              </div>

              {/* Desktop server/logout actions */}
              <div className="hidden md:flex items-center gap-0.5 shrink-0">
                <button
                  onClick={onOpenCreateServer}
                  title="새 내전 서버 만들기"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-rose-400 hover:bg-white/5 transition-colors duration-500 ease-premium"
                >
                  <Server className="w-4 h-4" />
                </button>
                <button
                  onClick={onLogout}
                  title="접속 종료"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-500 ease-premium"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:bg-white/5 shrink-0"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <span className="font-display font-semibold text-sm text-white">Vanguard</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navItems.map(({ tab, label, icon: Icon }, i) => (
                <motion.button
                  key={tab}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: EASE }}
                  onClick={() => handleMobileNav(tab)}
                  className={`flex items-center gap-4 py-3 text-left ${
                    currentTab === tab ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-display text-2xl font-medium tracking-tight">{label}</span>
                </motion.button>
              ))}
            </nav>

            <div className="px-8 pb-10 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="text-xs font-mono text-zinc-500">
                {serverName} · {operatorId}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    onOpenCreateServer();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-400 flex items-center gap-1.5"
                >
                  <Server className="w-3.5 h-3.5" />
                  새 서버
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs text-zinc-400 flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  종료
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
