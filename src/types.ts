export type RoleType = '타격대' | '감시자' | '전략가' | '척후대';

export interface RoleInfo {
  name: RoleType;
  englishName: 'Duelist' | 'Sentinel' | 'Controller' | 'Initiator';
  iconUrl: string;
  fallbackIconSvg: string;
  color: string;
}

export interface AgentStat {
  id: string;
  name: string;
  englishName: string;
  role: RoleType;
  portraitUrl: string;
  picksCount: number;
  winsCount: number;
  pickRate: number; // percentage
  winRate: number;  // percentage
  avgKda: number;
  avgCombatScore: number;
}

export interface PlayerRoleStat {
  role: RoleType;
  matches: number;
  wins: number;
  winRate: number;
  avgCombatScore: number;
  avgKda: number;
  topAgents: { agentName: string; matches: number; winRate: number; kda: number }[];
}

export interface PlayerProfile {
  id: string;
  nickname: string;
  matchesCount: number;
  wins: number;
  winRate: number;
  avgCombatScore: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
  avgKda: number;
  recentAgents: string[];
  roleStats: Record<RoleType, PlayerRoleStat>;
  joinedDate: string;
  rank: number;
}

export interface MatchPlayer {
  nickname: string;
  agent: string;
  role: RoleType;
  kills: number;
  deaths: number;
  assists: number;
  combatScore: number;
  isWin: boolean;
}

export interface MatchRecord {
  id: string;
  date: string;
  mapName: string;
  matchType: '10인 정규 매치' | '10인 훈련 매치' | '10인 연습 경기' | '10인 스크림' | '10인 커스텀 게임';
  score: string;
  result: 'VICTORY' | 'DEFEAT';
  mvpPlayer: string;
  players: MatchPlayer[];
  notes?: string;
}

export interface CustomServer {
  id: string;
  name: string;
  operatorId: string;
  activePlayersCount: number;
  totalMatchesCount: number;
  createdAt: string;
}

export type ViewTab =
  | 'login'
  | 'dashboard'
  | 'agent_stats'
  | 'leaderboard'
  | 'upload'
  | 'admin'
  | 'player_profile'
  | 'create_server';
