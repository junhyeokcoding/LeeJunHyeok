import { AgentStat, PlayerProfile, MatchRecord, RoleInfo, CustomServer } from '../types';

export const AGENT_PORTRAITS: Record<string, string> = {
  // Duelists (타격대)
  jett: 'https://media.valorant-api.com/agents/e370fa57-4ba3-080b-95a3-00d22553455d/displayIcon.png',
  제트: 'https://media.valorant-api.com/agents/e370fa57-4ba3-080b-95a3-00d22553455d/displayIcon.png',

  phoenix: 'https://media.valorant-api.com/agents/eb93336a-4494-04b3-0a9a-a87a9b6b2151/displayIcon.png',
  피닉스: 'https://media.valorant-api.com/agents/eb93336a-4494-04b3-0a9a-a87a9b6b2151/displayIcon.png',

  reyna: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayIcon.png',
  레이나: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayIcon.png',

  raze: 'https://media.valorant-api.com/agents/f949a01d-488e-828b-39a5-e6992d88f3f9/displayIcon.png',
  레이즈: 'https://media.valorant-api.com/agents/f949a01d-488e-828b-39a5-e6992d88f3f9/displayIcon.png',

  yoru: 'https://media.valorant-api.com/agents/7f949027-479c-7e69-2109-eb0c31077520/displayIcon.png',
  요루: 'https://media.valorant-api.com/agents/7f949027-479c-7e69-2109-eb0c31077520/displayIcon.png',

  neon: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd0-a775-be2309c0fc00/displayIcon.png',
  네온: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd0-a775-be2309c0fc00/displayIcon.png',

  iso: 'https://media.valorant-api.com/agents/0e38b54f-4576-9980-4998-d163d4db13a4/displayIcon.png',
  아이소: 'https://media.valorant-api.com/agents/0e38b54f-4576-9980-4998-d163d4db13a4/displayIcon.png',

  waylay: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd0-a775-be2309c0fc00/displayIcon.png',
  웨이레이: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd0-a775-be2309c0fc00/displayIcon.png',

  // Initiators (척후대)
  sova: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f2-f40ac9411b3d/displayIcon.png',
  소바: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f2-f40ac9411b3d/displayIcon.png',

  fade: 'https://media.valorant-api.com/agents/ade69646-47a3-962d-a708-480bf1feb96a/displayIcon.png',
  페이드: 'https://media.valorant-api.com/agents/ade69646-47a3-962d-a708-480bf1feb96a/displayIcon.png',

  breach: 'https://media.valorant-api.com/agents/5387da77-46e5-432c-a661-7001805778e3/displayIcon.png',
  브리치: 'https://media.valorant-api.com/agents/5387da77-46e5-432c-a661-7001805778e3/displayIcon.png',

  skye: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayIcon.png',
  스카이: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayIcon.png',

  kayo: 'https://media.valorant-api.com/agents/601e1e00-4ab5-bc49-4377-3b389216f516/displayIcon.png',
  'kay/o': 'https://media.valorant-api.com/agents/601e1e00-4ab5-bc49-4377-3b389216f516/displayIcon.png',
  '케이/오': 'https://media.valorant-api.com/agents/601e1e00-4ab5-bc49-4377-3b389216f516/displayIcon.png',
  '케이오': 'https://media.valorant-api.com/agents/601e1e00-4ab5-bc49-4377-3b389216f516/displayIcon.png',

  gekko: 'https://media.valorant-api.com/agents/e28a11f2-4c0d-9372-a068-af2e7b349b7d/displayIcon.png',
  게코: 'https://media.valorant-api.com/agents/e28a11f2-4c0d-9372-a068-af2e7b349b7d/displayIcon.png',

  // Controllers (전략가)
  omen: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayIcon.png',
  오멘: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayIcon.png',

  clove: 'https://media.valorant-api.com/agents/1dbf2cee-4001-43e9-0a63-094160d21e51/displayIcon.png',
  클로브: 'https://media.valorant-api.com/agents/1dbf2cee-4001-43e9-0a63-094160d21e51/displayIcon.png',

  brimstone: 'https://media.valorant-api.com/agents/9f0d8027-4132-bfa9-122b-671022469ed0/displayIcon.png',
  브림스톤: 'https://media.valorant-api.com/agents/9f0d8027-4132-bfa9-122b-671022469ed0/displayIcon.png',

  viper: 'https://media.valorant-api.com/agents/7077350d-4072-5012-0828-85f24c98e9a5/displayIcon.png',
  바이퍼: 'https://media.valorant-api.com/agents/7077350d-4072-5012-0828-85f24c98e9a5/displayIcon.png',

  astra: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayIcon.png',
  아스트라: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayIcon.png',

  harbor: 'https://media.valorant-api.com/agents/2262947d-4730-8124-7705-905f5bda7739/displayIcon.png',
  하버: 'https://media.valorant-api.com/agents/2262947d-4730-8124-7705-905f5bda7739/displayIcon.png',

  mix: 'https://media.valorant-api.com/agents/1dbf2cee-4001-43e9-0a63-094160d21e51/displayIcon.png',
  믹스: 'https://media.valorant-api.com/agents/1dbf2cee-4001-43e9-0a63-094160d21e51/displayIcon.png',

  // Sentinels (감시자)
  chamber: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acef203c00/displayIcon.png',
  체임버: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acef203c00/displayIcon.png',

  killjoy: 'https://media.valorant-api.com/agents/1e58d92f-4950-0816-012e-a6122b4b41c0/displayIcon.png',
  킬조이: 'https://media.valorant-api.com/agents/1e58d92f-4950-0816-012e-a6122b4b41c0/displayIcon.png',

  cypher: 'https://media.valorant-api.com/agents/1172a791-4113-5757-fee0-867e286d8c80/displayIcon.png',
  사이퍼: 'https://media.valorant-api.com/agents/1172a791-4113-5757-fee0-867e286d8c80/displayIcon.png',

  sage: 'https://media.valorant-api.com/agents/568500d1-4572-5c0a-042c-f6e2a60397b2/displayIcon.png',
  세이지: 'https://media.valorant-api.com/agents/568500d1-4572-5c0a-042c-f6e2a60397b2/displayIcon.png',

  deadlock: 'https://media.valorant-api.com/agents/cc8b02aa-4576-5252-0aea-8154131ee73d/displayIcon.png',
  데드락: 'https://media.valorant-api.com/agents/cc8b02aa-4576-5252-0aea-8154131ee73d/displayIcon.png',

  vyse: 'https://media.valorant-api.com/agents/b13693e0-405e-85c8-1004-9c8e8a719942/displayIcon.png',
  바이스: 'https://media.valorant-api.com/agents/b13693e0-405e-85c8-1004-9c8e8a719942/displayIcon.png',

  veto: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acef203c00/displayIcon.png',
  비토: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acef203c00/displayIcon.png',
};

export function getAgentPortraitUrl(agentName: string): string {
  if (!agentName) return AGENT_PORTRAITS['jett'];
  const key = agentName.trim().toLowerCase();
  if (AGENT_PORTRAITS[key]) return AGENT_PORTRAITS[key];

  const found = Object.keys(AGENT_PORTRAITS).find((k) => key.includes(k) || k.includes(key));
  if (found) return AGENT_PORTRAITS[found];

  return 'https://media.valorant-api.com/agents/e370fa57-4ba3-080b-95a3-00d22553455d/displayIcon.png';
}

export const ROLE_DEFINITIONS: Record<string, RoleInfo> = {
  타격대: {
    name: '타격대',
    englishName: 'Duelist',
    iconUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbQuUUEkYJdJG6vBxBSBtgGLQQg5aX34905Y5cOZIKM36ewF2EqN84l6GOcQtz7fJRkZDSdgbfJiiHjWgyzuNuDp14Nc8v8dMJWEtc3lb_45yYHDDHCen8CimpdMo0UWi6jU0xUbvyVnN7dQrq0kq0snXNtBDAP7Wvo4P7ypC9rBSBSwZ3I1sZKem6n5l6PSsGI2RwPNHVQpKkrJjytmMB__IqE2hTTwbxAf3Yd4uLv0HdCoLmN7mn7Z-MOcMYHpc9oJqguuOvJQ',
    fallbackIconSvg: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    color: '#ff4655'
  },
  감시자: {
    name: '감시자',
    englishName: 'Sentinel',
    iconUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMxDY84kvI2SRfuGzlM7xgqJoozfxdhUUCxheKIMnJdlEkhOkhIW2ncevrjiPuTZgrJquDNlpkZxwRRbtJ19LClWJp8vPMFna-xvL6WK29jfUxXQlh90iCZMz2TqifHrfo1Ruoyl0CUfOklQ7Yj8C1qRVqHCD02IO_IRH2wkJzujh4qTS8CKKxmBDUS08PFIVXHvMU2jdl6uRocj344PWBBFbt16pOrSnUbLj1QEMWqGjIPtS5wtDDhZhVcz2_MiL7cqdVsNWL6w',
    fallbackIconSvg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    color: '#00f0ff'
  },
  전략가: {
    name: '전략가',
    englishName: 'Controller',
    iconUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTg_rMdorJf3sAqKejTEK_BUY6483qZEdFMBbHzt4GLLuVsnyySu9BlD_uFk6LAiNrInOCphMZpZPm2KCEPLNKbQAEYCKscnkj5nrZBLRrFl1oh1AXTh3oOqBARg5wQJqCc0vCuWhm4Riqip-tijAgaEK4MfQwRGpDDUSfPDQ00KzR1gTUAi85xuJwuKf9o-ZqHQyoORbo-DYful18ah3hl180H4FCvWVrQCmtugS7zgGrlKSQ69sXl5o15pmKKjYWxZ-H3CH4rQ',
    fallbackIconSvg: '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>',
    color: '#a855f7'
  },
  척후대: {
    name: '척후대',
    englishName: 'Initiator',
    iconUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcB3KiiNxu0zBveBWdIOAG6eWnAPn3GSn-ow1S-JU5AxT9tJBihKMDGW_296_zJ6i0HPhgH0L7e0u3g5RN-DRdvuhsE-5ShVZu3tjtj7OTTQkSHbRRNlygjsPqUH8YLP_k1tNxR5jmateN4HEK9JWyK-f94sKERaNIa0A1m4VHsuTyX18VkwvsnjKn-u2avsvX9dft115bLf3G8BmGfb73ApriHEhVaYHZ_VMBQXT2s1l4EZp7LbcvNQnvR7mz2kjHZH1zdLoPkA',
    fallbackIconSvg: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    color: '#eab308'
  }
};

export const INITIAL_AGENTS: AgentStat[] = [
  // Duelists (타격대)
  {
    id: 'jett',
    name: '제트',
    englishName: 'Jett',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/e370fa57-4ba3-080b-95a3-00d22553455d/displayIcon.png',
    picksCount: 15,
    winsCount: 9,
    pickRate: 14.0,
    winRate: 60.0,
    avgKda: 1.85,
    avgCombatScore: 285.4
  },
  {
    id: 'phoenix',
    name: '피닉스',
    englishName: 'Phoenix',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/eb93336a-4494-04b3-0a9a-a87a9b6b2151/displayIcon.png',
    picksCount: 9,
    winsCount: 5,
    pickRate: 8.3,
    winRate: 55.6,
    avgKda: 1.78,
    avgCombatScore: 228.0
  },
  {
    id: 'reyna',
    name: '레이나',
    englishName: 'Reyna',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayIcon.png',
    picksCount: 12,
    winsCount: 7,
    pickRate: 11.2,
    winRate: 58.3,
    avgKda: 2.05,
    avgCombatScore: 268.0
  },
  {
    id: 'raze',
    name: '레이즈',
    englishName: 'Raze',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/f949a01d-488e-828b-39a5-e6992d88f3f9/displayIcon.png',
    picksCount: 8,
    winsCount: 4,
    pickRate: 7.5,
    winRate: 50.0,
    avgKda: 1.70,
    avgCombatScore: 232.0
  },
  {
    id: 'yoru',
    name: '요루',
    englishName: 'Yoru',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/7f949027-479c-7e69-2109-eb0c31077520/displayIcon.png',
    picksCount: 5,
    winsCount: 3,
    pickRate: 4.6,
    winRate: 60.0,
    avgKda: 1.68,
    avgCombatScore: 218.5
  },
  {
    id: 'neon',
    name: '네온',
    englishName: 'Neon',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd0-a775-be2309c0fc00/displayIcon.png',
    picksCount: 6,
    winsCount: 4,
    pickRate: 5.5,
    winRate: 66.7,
    avgKda: 1.82,
    avgCombatScore: 245.0
  },
  {
    id: 'iso',
    name: '아이소',
    englishName: 'Iso',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/0e38b54f-4576-9980-4998-d163d4db13a4/displayIcon.png',
    picksCount: 7,
    winsCount: 4,
    pickRate: 6.4,
    winRate: 57.1,
    avgKda: 1.88,
    avgCombatScore: 252.0
  },
  {
    id: 'waylay',
    name: '웨이레이',
    englishName: 'Waylay',
    role: '타격대',
    portraitUrl: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd0-a775-be2309c0fc00/displayIcon.png',
    picksCount: 8,
    winsCount: 5,
    pickRate: 7.4,
    winRate: 62.5,
    avgKda: 1.96,
    avgCombatScore: 268.0
  },

  // Initiators (척후대)
  {
    id: 'sova',
    name: '소바',
    englishName: 'Sova',
    role: '척후대',
    portraitUrl: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f2-f40ac9411b3d/displayIcon.png',
    picksCount: 10,
    winsCount: 6,
    pickRate: 9.3,
    winRate: 60.0,
    avgKda: 2.04,
    avgCombatScore: 215.3
  },
  {
    id: 'fade',
    name: '페이드',
    englishName: 'Fade',
    role: '척후대',
    portraitUrl: 'https://media.valorant-api.com/agents/ade69646-47a3-962d-a708-480bf1feb96a/displayIcon.png',
    picksCount: 9,
    winsCount: 6,
    pickRate: 8.3,
    winRate: 66.7,
    avgKda: 1.92,
    avgCombatScore: 230.5
  },
  {
    id: 'breach',
    name: '브리치',
    englishName: 'Breach',
    role: '척후대',
    portraitUrl: 'https://media.valorant-api.com/agents/5387da77-46e5-432c-a661-7001805778e3/displayIcon.png',
    picksCount: 6,
    winsCount: 3,
    pickRate: 5.5,
    winRate: 50.0,
    avgKda: 1.62,
    avgCombatScore: 195.0
  },
  {
    id: 'skye',
    name: '스카이',
    englishName: 'Skye',
    role: '척후대',
    portraitUrl: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayIcon.png',
    picksCount: 8,
    winsCount: 5,
    pickRate: 7.4,
    winRate: 62.5,
    avgKda: 1.95,
    avgCombatScore: 210.0
  },
  {
    id: 'kayo',
    name: '케이/오',
    englishName: 'KAY/O',
    role: '척후대',
    portraitUrl: 'https://media.valorant-api.com/agents/601e1e00-4ab5-bc49-4377-3b389216f516/displayIcon.png',
    picksCount: 7,
    winsCount: 3,
    pickRate: 6.5,
    winRate: 42.9,
    avgKda: 1.58,
    avgCombatScore: 202.0
  },
  {
    id: 'gekko',
    name: '게코',
    englishName: 'Gekko',
    role: '척후대',
    portraitUrl: 'https://media.valorant-api.com/agents/e28a11f2-4c0d-9372-a068-af2e7b349b7d/displayIcon.png',
    picksCount: 11,
    winsCount: 7,
    pickRate: 10.2,
    winRate: 63.6,
    avgKda: 2.01,
    avgCombatScore: 225.0
  },

  // Controllers (전략가)
  {
    id: 'omen',
    name: '오멘',
    englishName: 'Omen',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayIcon.png',
    picksCount: 14,
    winsCount: 8,
    pickRate: 13.0,
    winRate: 57.1,
    avgKda: 1.88,
    avgCombatScore: 204.0
  },
  {
    id: 'clove',
    name: '클로브',
    englishName: 'Clove',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/1dbf2cee-4001-43e9-0a63-094160d21e51/displayIcon.png',
    picksCount: 10,
    winsCount: 8,
    pickRate: 9.3,
    winRate: 80.0,
    avgKda: 2.15,
    avgCombatScore: 260.1
  },
  {
    id: 'brimstone',
    name: '브림스톤',
    englishName: 'Brimstone',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/9f0d8027-4132-bfa9-122b-671022469ed0/displayIcon.png',
    picksCount: 7,
    winsCount: 4,
    pickRate: 6.5,
    winRate: 57.1,
    avgKda: 1.65,
    avgCombatScore: 192.0
  },
  {
    id: 'viper',
    name: '바이퍼',
    englishName: 'Viper',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/7077350d-4072-5012-0828-85f24c98e9a5/displayIcon.png',
    picksCount: 9,
    winsCount: 5,
    pickRate: 8.3,
    winRate: 55.6,
    avgKda: 1.76,
    avgCombatScore: 215.0
  },
  {
    id: 'astra',
    name: '아스트라',
    englishName: 'Astra',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayIcon.png',
    picksCount: 4,
    winsCount: 2,
    pickRate: 3.7,
    winRate: 50.0,
    avgKda: 1.52,
    avgCombatScore: 188.0
  },
  {
    id: 'harbor',
    name: '하버',
    englishName: 'Harbor',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/2262947d-4730-8124-7705-905f5bda7739/displayIcon.png',
    picksCount: 5,
    winsCount: 2,
    pickRate: 4.6,
    winRate: 40.0,
    avgKda: 1.48,
    avgCombatScore: 182.0
  },
  {
    id: 'mix',
    name: '믹스',
    englishName: 'Mix',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/1dbf2cee-4001-43e9-0a63-094160d21e51/displayIcon.png',
    picksCount: 7,
    winsCount: 4,
    pickRate: 6.5,
    winRate: 57.1,
    avgKda: 1.84,
    avgCombatScore: 215.0
  },

  // Sentinels (감시자)
  {
    id: 'chamber',
    name: '체임버',
    englishName: 'Chamber',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acef203c00/displayIcon.png',
    picksCount: 9,
    winsCount: 4,
    pickRate: 8.3,
    winRate: 44.4,
    avgKda: 1.73,
    avgCombatScore: 242.0
  },
  {
    id: 'killjoy',
    name: '킬조이',
    englishName: 'Killjoy',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/1e58d92f-4950-0816-012e-a6122b4b41c0/displayIcon.png',
    picksCount: 11,
    winsCount: 7,
    pickRate: 10.2,
    winRate: 63.6,
    avgKda: 2.15,
    avgCombatScore: 210.0
  },
  {
    id: 'cypher',
    name: '사이퍼',
    englishName: 'Cypher',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/1172a791-4113-5757-fee0-867e286d8c80/displayIcon.png',
    picksCount: 10,
    winsCount: 6,
    pickRate: 9.3,
    winRate: 60.0,
    avgKda: 1.94,
    avgCombatScore: 218.0
  },
  {
    id: 'sage',
    name: '세이지',
    englishName: 'Sage',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/568500d1-4572-5c0a-042c-f6e2a60397b2/displayIcon.png',
    picksCount: 8,
    winsCount: 5,
    pickRate: 7.4,
    winRate: 62.5,
    avgKda: 1.80,
    avgCombatScore: 198.0
  },
  {
    id: 'deadlock',
    name: '데드락',
    englishName: 'Deadlock',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/cc8b02aa-4576-5252-0aea-8154131ee73d/displayIcon.png',
    picksCount: 4,
    winsCount: 2,
    pickRate: 3.7,
    winRate: 50.0,
    avgKda: 1.64,
    avgCombatScore: 190.0
  },
  {
    id: 'vyse',
    name: '바이스',
    englishName: 'Vyse',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/b13693e0-405e-85c8-1004-9c8e8a719942/displayIcon.png',
    picksCount: 5,
    winsCount: 3,
    pickRate: 4.6,
    winRate: 60.0,
    avgKda: 1.75,
    avgCombatScore: 205.0
  },
  {
    id: 'veto',
    name: '비토',
    englishName: 'Veto',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acef203c00/displayIcon.png',
    picksCount: 6,
    winsCount: 4,
    pickRate: 5.5,
    winRate: 66.7,
    avgKda: 1.88,
    avgCombatScore: 220.0
  }
];

export const INITIAL_PLAYERS: PlayerProfile[] = [
  {
    id: 'p1',
    nickname: '지군',
    rank: 1,
    matchesCount: 12,
    wins: 9,
    winRate: 75,
    avgCombatScore: 312,
    totalKills: 284,
    totalDeaths: 182,
    totalAssists: 68,
    avgKda: 1.93,
    joinedDate: '2024-11-01',
    recentAgents: ['제트', '피닉스', '레이나'],
    roleStats: {
      타격대: {
        role: '타격대',
        matches: 8,
        wins: 6,
        winRate: 75,
        avgCombatScore: 325,
        avgKda: 2.1,
        topAgents: [{ agentName: '제트', matches: 5, winRate: 80, kda: 2.2 }, { agentName: '피닉스', matches: 3, winRate: 67, kda: 1.9 }]
      },
      감시자: {
        role: '감시자',
        matches: 2,
        wins: 2,
        winRate: 100,
        avgCombatScore: 280,
        avgKda: 1.8,
        topAgents: [{ agentName: '체임버', matches: 2, winRate: 100, kda: 1.8 }]
      },
      전략가: {
        role: '전략가',
        matches: 1,
        wins: 1,
        winRate: 100,
        avgCombatScore: 260,
        avgKda: 1.5,
        topAgents: [{ agentName: '오멘', matches: 1, winRate: 100, kda: 1.5 }]
      },
      척후대: {
        role: '척후대',
        matches: 1,
        wins: 0,
        winRate: 0,
        avgCombatScore: 240,
        avgKda: 1.2,
        topAgents: [{ agentName: '소바', matches: 1, winRate: 0, kda: 1.2 }]
      }
    }
  },
  {
    id: 'p2',
    nickname: '행복한오징어',
    rank: 2,
    matchesCount: 15,
    wins: 10,
    winRate: 67,
    avgCombatScore: 289,
    totalKills: 310,
    totalDeaths: 210,
    totalAssists: 95,
    avgKda: 1.93,
    joinedDate: '2024-11-03',
    recentAgents: ['체임버', '킬조이', '클로브'],
    roleStats: {
      타격대: {
        role: '타격대',
        matches: 3,
        wins: 2,
        winRate: 67,
        avgCombatScore: 290,
        avgKda: 1.8,
        topAgents: [{ agentName: '레이즈', matches: 3, winRate: 67, kda: 1.8 }]
      },
      감시자: {
        role: '감시자',
        matches: 8,
        wins: 6,
        winRate: 75,
        avgCombatScore: 295,
        avgKda: 2.0,
        topAgents: [{ agentName: '체임버', matches: 5, winRate: 80, kda: 2.1 }, { agentName: '킬조이', matches: 3, winRate: 67, kda: 1.9 }]
      },
      전략가: {
        role: '전략가',
        matches: 3,
        wins: 2,
        winRate: 67,
        avgCombatScore: 270,
        avgKda: 1.9,
        topAgents: [{ agentName: '클로브', matches: 3, winRate: 67, kda: 1.9 }]
      },
      척후대: {
        role: '척후대',
        matches: 1,
        wins: 0,
        winRate: 0,
        avgCombatScore: 220,
        avgKda: 1.1,
        topAgents: [{ agentName: '페이드', matches: 1, winRate: 0, kda: 1.1 }]
      }
    }
  },
  {
    id: 'p3',
    nickname: 'Ailere99',
    rank: 3,
    matchesCount: 18,
    wins: 12,
    winRate: 67,
    avgCombatScore: 275,
    totalKills: 345,
    totalDeaths: 240,
    totalAssists: 140,
    avgKda: 2.02,
    joinedDate: '2024-11-05',
    recentAgents: ['클로브', '오멘', '페이드'],
    roleStats: {
      타격대: {
        role: '타격대',
        matches: 2,
        wins: 1,
        winRate: 50,
        avgCombatScore: 260,
        avgKda: 1.5,
        topAgents: [{ agentName: '제트', matches: 2, winRate: 50, kda: 1.5 }]
      },
      감시자: {
        role: '감시자',
        matches: 2,
        wins: 1,
        winRate: 50,
        avgCombatScore: 250,
        avgKda: 1.6,
        topAgents: [{ agentName: '킬조이', matches: 2, winRate: 50, kda: 1.6 }]
      },
      전략가: {
        role: '전략가',
        matches: 10,
        wins: 7,
        winRate: 70,
        avgCombatScore: 285,
        avgKda: 2.2,
        topAgents: [{ agentName: '클로브', matches: 6, winRate: 83, kda: 2.4 }, { agentName: '오멘', matches: 4, winRate: 50, kda: 1.9 }]
      },
      척후대: {
        role: '척후대',
        matches: 4,
        wins: 3,
        winRate: 75,
        avgCombatScore: 270,
        avgKda: 2.0,
        topAgents: [{ agentName: '페이드', matches: 3, winRate: 67, kda: 2.1 }, { agentName: '소바', matches: 1, winRate: 100, kda: 1.8 }]
      }
    }
  },
  {
    id: 'p4',
    nickname: 'Pies',
    rank: 4,
    matchesCount: 10,
    wins: 6,
    winRate: 60,
    avgCombatScore: 252,
    totalKills: 198,
    totalDeaths: 155,
    totalAssists: 110,
    avgKda: 1.98,
    joinedDate: '2024-11-02',
    recentAgents: ['소바', '페이드'],
    roleStats: {
      타격대: { role: '타격대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 210, avgKda: 1.1, topAgents: [] },
      감시자: { role: '감시자', matches: 1, wins: 1, winRate: 100, avgCombatScore: 240, avgKda: 1.7, topAgents: [] },
      전략가: { role: '전략가', matches: 2, wins: 1, winRate: 50, avgCombatScore: 235, avgKda: 1.6, topAgents: [] },
      척후대: {
        role: '척후대',
        matches: 6,
        wins: 4,
        winRate: 67,
        avgCombatScore: 270,
        avgKda: 2.3,
        topAgents: [{ agentName: '소바', matches: 4, winRate: 75, kda: 2.4 }, { agentName: '페이드', matches: 2, winRate: 50, kda: 2.1 }]
      }
    }
  },
  {
    id: 'p5',
    nickname: '늦으면 노으시',
    rank: 5,
    matchesCount: 14,
    wins: 8,
    winRate: 57,
    avgCombatScore: 240,
    totalKills: 260,
    totalDeaths: 210,
    totalAssists: 88,
    avgKda: 1.65,
    joinedDate: '2024-11-04',
    recentAgents: ['킬조이', '체임버'],
    roleStats: {
      타격대: { role: '타격대', matches: 2, wins: 1, winRate: 50, avgCombatScore: 230, avgKda: 1.4, topAgents: [] },
      감시자: {
        role: '감시자',
        matches: 9,
        wins: 6,
        winRate: 67,
        avgCombatScore: 255,
        avgKda: 1.8,
        topAgents: [{ agentName: '킬조이', matches: 6, winRate: 67, kda: 1.9 }, { agentName: '체임버', matches: 3, winRate: 67, kda: 1.6 }]
      },
      전략가: { role: '전략가', matches: 2, wins: 1, winRate: 50, avgCombatScore: 220, avgKda: 1.3, topAgents: [] },
      척후대: { role: '척후대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 200, avgKda: 1.0, topAgents: [] }
    }
  },
  {
    id: 'p6',
    nickname: '아니야나그런데',
    rank: 6,
    matchesCount: 11,
    wins: 6,
    winRate: 55,
    avgCombatScore: 268,
    totalKills: 225,
    totalDeaths: 180,
    totalAssists: 65,
    avgKda: 1.61,
    joinedDate: '2024-11-06',
    recentAgents: ['페이드', '제트'],
    roleStats: {
      타격대: { role: '타격대', matches: 4, wins: 2, winRate: 50, avgCombatScore: 280, avgKda: 1.7, topAgents: [{ agentName: '제트', matches: 4, winRate: 50, kda: 1.7 }] },
      감시자: { role: '감시자', matches: 1, wins: 0, winRate: 0, avgCombatScore: 220, avgKda: 1.1, topAgents: [] },
      전략가: { role: '전략가', matches: 1, wins: 1, winRate: 100, avgCombatScore: 240, avgKda: 1.5, topAgents: [] },
      척후대: { role: '척후대', matches: 5, wins: 3, winRate: 60, avgCombatScore: 275, avgKda: 1.7, topAgents: [{ agentName: '페이드', matches: 5, winRate: 60, kda: 1.7 }] }
    }
  },
  {
    id: 'p7',
    nickname: '인생그게뭐길래',
    rank: 7,
    matchesCount: 9,
    wins: 4,
    winRate: 44,
    avgCombatScore: 228,
    totalKills: 162,
    totalDeaths: 158,
    totalAssists: 35,
    avgKda: 1.24,
    joinedDate: '2024-11-07',
    recentAgents: ['레이나', '피닉스'],
    roleStats: {
      타격대: { role: '타격대', matches: 7, wins: 3, winRate: 43, avgCombatScore: 240, avgKda: 1.3, topAgents: [{ agentName: '레이나', matches: 4, winRate: 50, kda: 1.3 }] },
      감시자: { role: '감시자', matches: 1, wins: 1, winRate: 100, avgCombatScore: 210, avgKda: 1.2, topAgents: [] },
      전략가: { role: '전략가', matches: 1, wins: 0, winRate: 0, avgCombatScore: 180, avgKda: 0.9, topAgents: [] },
      척후대: { role: '척후대', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] }
    }
  },
  {
    id: 'p8',
    nickname: '엉덩이보글덮밥',
    rank: 8,
    matchesCount: 13,
    wins: 5,
    winRate: 38,
    avgCombatScore: 215,
    totalKills: 210,
    totalDeaths: 220,
    totalAssists: 85,
    avgKda: 1.34,
    joinedDate: '2024-11-08',
    recentAgents: ['오멘', '클로브'],
    roleStats: {
      타격대: { role: '타격대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 190, avgKda: 0.9, topAgents: [] },
      감시자: { role: '감시자', matches: 1, wins: 0, winRate: 0, avgCombatScore: 200, avgKda: 1.0, topAgents: [] },
      전략가: { role: '전략가', matches: 10, wins: 5, winRate: 50, avgCombatScore: 230, avgKda: 1.4, topAgents: [{ agentName: '오멘', matches: 7, winRate: 43, kda: 1.4 }] },
      척후대: { role: '척후대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 180, avgKda: 0.8, topAgents: [] }
    }
  },
  {
    id: 'p9',
    nickname: '정신박약',
    rank: 9,
    matchesCount: 8,
    wins: 3,
    winRate: 37,
    avgCombatScore: 210,
    totalKills: 135,
    totalDeaths: 142,
    totalAssists: 30,
    avgKda: 1.16,
    joinedDate: '2024-11-09',
    recentAgents: ['피닉스', '제트'],
    roleStats: {
      타격대: { role: '타격대', matches: 6, wins: 2, winRate: 33, avgCombatScore: 225, avgKda: 1.2, topAgents: [{ agentName: '피닉스', matches: 4, winRate: 25, kda: 1.2 }] },
      감시자: { role: '감시자', matches: 1, wins: 1, winRate: 100, avgCombatScore: 190, avgKda: 1.1, topAgents: [] },
      전략가: { role: '전략가', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
      척후대: { role: '척후대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 180, avgKda: 0.9, topAgents: [] }
    }
  },
  {
    id: 'p10',
    nickname: '병장 노갱식',
    rank: 10,
    matchesCount: 7,
    wins: 2,
    winRate: 28,
    avgCombatScore: 185,
    totalKills: 98,
    totalDeaths: 125,
    totalAssists: 22,
    avgKda: 0.96,
    joinedDate: '2024-11-10',
    recentAgents: ['레이즈', '소바'],
    roleStats: {
      타격대: { role: '타격대', matches: 4, wins: 1, winRate: 25, avgCombatScore: 195, avgKda: 1.0, topAgents: [{ agentName: '레이즈', matches: 4, winRate: 25, kda: 1.0 }] },
      감시자: { role: '감시자', matches: 1, wins: 0, winRate: 0, avgCombatScore: 170, avgKda: 0.8, topAgents: [] },
      전략가: { role: '전략가', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
      척후대: { role: '척후대', matches: 2, wins: 1, winRate: 50, avgCombatScore: 185, avgKda: 1.1, topAgents: [] }
    }
  }
];

export const INITIAL_MATCHES: MatchRecord[] = [
  {
    id: 'm1',
    date: '2025. 02. 24 21:15',
    mapName: 'ASCENT',
    matchType: '10인 정규 매치',
    score: '13 - 11',
    result: 'VICTORY',
    mvpPlayer: '지군',
    notes: '아슬아슬한 연장 직전 승리. 지군 제트 클러치 활약.',
    players: [
      { nickname: '지군', agent: '제트', role: '타격대', kills: 24, deaths: 14, assists: 6, combatScore: 312, isWin: true },
      { nickname: '행복한오징어', agent: '체임버', role: '감시자', kills: 19, deaths: 12, assists: 4, combatScore: 245, isWin: true },
      { nickname: 'Ailere99', agent: '클로브', role: '전략가', kills: 18, deaths: 15, assists: 9, combatScore: 238, isWin: true },
      { nickname: 'Pies', agent: '소바', role: '척후대', kills: 15, deaths: 16, assists: 11, combatScore: 198, isWin: true },
      { nickname: '늦으면 노으시', agent: '킬조이', role: '감시자', kills: 12, deaths: 13, assists: 5, combatScore: 165, isWin: true },
      { nickname: '아니야나그런데', agent: '페이드', role: '척후대', kills: 21, deaths: 16, assists: 8, combatScore: 268, isWin: false },
      { nickname: '인생그게뭐길래', agent: '레이나', role: '타격대', kills: 17, deaths: 18, assists: 3, combatScore: 210, isWin: false },
      { nickname: '엉덩이보글덮밥', agent: '오멘', role: '전략가', kills: 14, deaths: 17, assists: 7, combatScore: 180, isWin: false },
      { nickname: '정신박약', agent: '피닉스', role: '타격대', kills: 16, deaths: 19, assists: 4, combatScore: 195, isWin: false },
      { nickname: '병장 노갱식', agent: '레이즈', role: '타격대', kills: 10, deaths: 18, assists: 2, combatScore: 140, isWin: false }
    ]
  },
  {
    id: 'm2',
    date: '2025. 02. 23 20:40',
    mapName: 'HAVEN',
    matchType: '10인 훈련 매치',
    score: '13 - 8',
    result: 'VICTORY',
    mvpPlayer: '행복한오징어',
    notes: 'A사이트 철통 방어 체임버',
    players: [
      { nickname: '행복한오징어', agent: '체임버', role: '감시자', kills: 22, deaths: 10, assists: 5, combatScore: 298, isWin: true },
      { nickname: '지군', agent: '피닉스', role: '타격대', kills: 20, deaths: 12, assists: 7, combatScore: 275, isWin: true },
      { nickname: 'Ailere99', agent: '오멘', role: '전략가', kills: 16, deaths: 11, assists: 12, combatScore: 220, isWin: true },
      { nickname: 'Pies', agent: '페이드', role: '척후대', kills: 14, deaths: 13, assists: 9, combatScore: 190, isWin: true },
      { nickname: '늦으면 노으시', agent: '킬조이', role: '감시자', kills: 11, deaths: 10, assists: 4, combatScore: 160, isWin: true },
      { nickname: '아니야나그런데', agent: '제트', role: '타격대', kills: 18, deaths: 17, assists: 3, combatScore: 230, isWin: false },
      { nickname: '인생그게뭐길래', agent: '레이나', role: '타격대', kills: 15, deaths: 16, assists: 2, combatScore: 195, isWin: false },
      { nickname: '엉덩이보글덮밥', agent: '클로브', role: '전략가', kills: 12, deaths: 17, assists: 6, combatScore: 165, isWin: false },
      { nickname: '정신박약', agent: '소바', role: '척후대', kills: 10, deaths: 17, assists: 5, combatScore: 145, isWin: false },
      { nickname: '병장 노갱식', agent: '레이즈', role: '타격대', kills: 9, deaths: 16, assists: 3, combatScore: 130, isWin: false }
    ]
  },
  {
    id: 'm3',
    date: '2025. 02. 22 22:10',
    mapName: 'BIND',
    matchType: '10인 연습 경기',
    score: '13 - 10',
    result: 'VICTORY',
    mvpPlayer: 'Ailere99',
    notes: '바인드 텔레포트 교전 중심 승리',
    players: [
      { nickname: 'Ailere99', agent: '클로브', role: '전략가', kills: 23, deaths: 12, assists: 10, combatScore: 305, isWin: true },
      { nickname: '지군', agent: '제트', role: '타격대', kills: 21, deaths: 15, assists: 4, combatScore: 280, isWin: true },
      { nickname: '행복한오징어', agent: '레이즈', role: '타격대', kills: 17, deaths: 14, assists: 6, combatScore: 240, isWin: true },
      { nickname: 'Pies', agent: '소바', role: '척후대', kills: 13, deaths: 12, assists: 13, combatScore: 185, isWin: true },
      { nickname: '늦으면 노으시', agent: '체임버', role: '감시자', kills: 12, deaths: 13, assists: 3, combatScore: 170, isWin: true },
      { nickname: '아니야나그런데', agent: '페이드', role: '척후대', kills: 19, deaths: 18, assists: 7, combatScore: 245, isWin: false },
      { nickname: '인생그게뭐길래', agent: '피닉스', role: '타격대', kills: 16, deaths: 17, assists: 4, combatScore: 205, isWin: false },
      { nickname: '엉덩이보글덮밥', agent: '오멘', role: '전략가', kills: 13, deaths: 17, assists: 8, combatScore: 175, isWin: false },
      { nickname: '정신박약', agent: '레이나', role: '타격대', kills: 11, deaths: 18, assists: 2, combatScore: 150, isWin: false },
      { nickname: '병장 노갱식', agent: '소바', role: '척후대', kills: 9, deaths: 16, assists: 6, combatScore: 135, isWin: false }
    ]
  },
  {
    id: 'm4',
    date: '2025. 02. 21 19:30',
    mapName: 'SUNSET',
    matchType: '10인 스크림',
    score: '11 - 13',
    result: 'DEFEAT',
    mvpPlayer: '아니야나그런데',
    notes: '선셋 B 미드 공방전',
    players: [
      { nickname: '아니야나그런데', agent: '페이드', role: '척후대', kills: 25, deaths: 14, assists: 9, combatScore: 320, isWin: true },
      { nickname: '인생그게뭐길래', agent: '레이나', role: '타격대', kills: 20, deaths: 15, assists: 4, combatScore: 260, isWin: true },
      { nickname: '엉덩이보글덮밥', agent: '오멘', role: '전략가', kills: 16, deaths: 13, assists: 11, combatScore: 215, isWin: true },
      { nickname: '정신박약', agent: '제트', role: '타격대', kills: 15, deaths: 16, assists: 3, combatScore: 195, isWin: true },
      { nickname: '병장 노갱식', agent: '킬조이', role: '감시자', kills: 12, deaths: 14, assists: 5, combatScore: 160, isWin: true },
      { nickname: '지군', agent: '제트', role: '타격대', kills: 22, deaths: 18, assists: 5, combatScore: 285, isWin: false },
      { nickname: '행복한오징어', agent: '체임버', role: '감시자', kills: 18, deaths: 17, assists: 3, combatScore: 235, isWin: false },
      { nickname: 'Ailere99', agent: '클로브', role: '전략가', kills: 16, deaths: 18, assists: 8, combatScore: 210, isWin: false },
      { nickname: 'Pies', agent: '소바', role: '척후대', kills: 12, deaths: 17, assists: 10, combatScore: 165, isWin: false },
      { nickname: '늦으면 노으시', agent: '킬조이', role: '감시자', kills: 10, deaths: 18, assists: 4, combatScore: 140, isWin: false }
    ]
  },
  {
    id: 'm5',
    date: '2025. 02. 20 20:00',
    mapName: 'LOTUS',
    matchType: '10인 커스텀 게임',
    score: '13 - 7',
    result: 'VICTORY',
    mvpPlayer: '지군',
    notes: '로터스 3개 사이트 속공 운영',
    players: [
      { nickname: '지군', agent: '제트', role: '타격대', kills: 26, deaths: 9, assists: 4, combatScore: 348, isWin: true },
      { nickname: '행복한오징어', agent: '체임버', role: '감시자', kills: 18, deaths: 11, assists: 3, combatScore: 250, isWin: true },
      { nickname: 'Ailere99', agent: '클로브', role: '전략가', kills: 15, deaths: 10, assists: 11, combatScore: 215, isWin: true },
      { nickname: 'Pies', agent: '페이드', role: '척후대', kills: 14, deaths: 10, assists: 8, combatScore: 195, isWin: true },
      { nickname: '늦으면 노으시', agent: '킬조이', role: '감시자', kills: 11, deaths: 8, assists: 6, combatScore: 160, isWin: true },
      { nickname: '아니야나그런데', agent: '소바', role: '척후대', kills: 16, deaths: 17, assists: 5, combatScore: 210, isWin: false },
      { nickname: '인생그게뭐길래', agent: '피닉스', role: '타격대', kills: 12, deaths: 17, assists: 3, combatScore: 165, isWin: false },
      { nickname: '엉덩이보글덮밥', agent: '오멘', role: '전략가', kills: 10, deaths: 17, assists: 6, combatScore: 140, isWin: false },
      { nickname: '정신박약', agent: '레이나', role: '타격대', kills: 8, deaths: 17, assists: 2, combatScore: 125, isWin: false },
      { nickname: '병장 노갱식', agent: '레이즈', role: '타격대', kills: 7, deaths: 16, assists: 1, combatScore: 110, isWin: false }
    ]
  }
];

export const MOCK_CUSTOM_SERVERS: CustomServer[] = [
  {
    id: 'srv-1',
    name: '이준혁테스트',
    operatorId: '이준혁테스트',
    activePlayersCount: 86,
    totalMatchesCount: 1402,
    createdAt: '2024-10-15'
  },
  {
    id: 'srv-2',
    name: '발로란트 천상계 내전',
    operatorId: '레전드오퍼',
    activePlayersCount: 120,
    totalMatchesCount: 2340,
    createdAt: '2024-09-20'
  },
  {
    id: 'srv-3',
    name: '즐겜 10인 커스텀 서버',
    operatorId: '발로짱',
    activePlayersCount: 45,
    totalMatchesCount: 512,
    createdAt: '2024-11-01'
  }
];
