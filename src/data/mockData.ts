import { AgentStat, PlayerProfile, MatchRecord, RoleInfo, CustomServer } from '../types';

export const AGENT_PORTRAITS: Record<string, string> = {
  // Duelists (타격대)
  jett: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png',
  제트: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png',

  phoenix: 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png',
  피닉스: 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png',

  reyna: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png',
  레이나: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png',

  raze: 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png',
  레이즈: 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png',

  yoru: 'https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png',
  요루: 'https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png',

  neon: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png',
  네온: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png',

  iso: 'https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png',
  아이소: 'https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png',

  waylay: 'https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/displayicon.png',
  웨이레이: 'https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/displayicon.png',

  // Initiators (척후대)
  sova: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png',
  소바: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png',

  fade: 'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png',
  페이드: 'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png',

  breach: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png',
  브리치: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png',

  skye: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png',
  스카이: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png',

  kayo: 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png',
  'kay/o': 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png',
  '케이/오': 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png',
  '케이오': 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png',

  gekko: 'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png',
  게코: 'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png',

  tejo: 'https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/displayicon.png',
  테호: 'https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/displayicon.png',

  // Controllers (전략가)
  omen: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png',
  오멘: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png',

  clove: 'https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png',
  클로브: 'https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png',

  brimstone: 'https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png',
  브림스톤: 'https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png',

  viper: 'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png',
  바이퍼: 'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png',

  astra: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png',
  아스트라: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png',

  harbor: 'https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png',
  하버: 'https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png',

  miks: 'https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/displayicon.png',
  믹스: 'https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/displayicon.png',

  // Sentinels (감시자)
  chamber: 'https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png',
  체임버: 'https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png',

  killjoy: 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png',
  킬조이: 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png',

  cypher: 'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png',
  사이퍼: 'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png',

  sage: 'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png',
  세이지: 'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png',

  deadlock: 'https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png',
  데드록: 'https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png',

  vyse: 'https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayicon.png',
  바이스: 'https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayicon.png',

  veto: 'https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/displayicon.png',
  비토: 'https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/displayicon.png',
};

export function getAgentPortraitUrl(agentName: string): string {
  if (!agentName) return AGENT_PORTRAITS['jett'];
  const key = agentName.trim().toLowerCase();
  if (AGENT_PORTRAITS[key]) return AGENT_PORTRAITS[key];

  const found = Object.keys(AGENT_PORTRAITS).find((k) => key.includes(k) || k.includes(key));
  if (found) return AGENT_PORTRAITS[found];

  return 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
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
    portraitUrl: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png',
    picksCount: 11,
    winsCount: 7,
    pickRate: 10.2,
    winRate: 63.6,
    avgKda: 2.01,
    avgCombatScore: 225.0
  },
  {
    id: 'tejo',
    name: '테호',
    englishName: 'Tejo',
    role: '척후대',
    portraitUrl: 'https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/displayicon.png',
    picksCount: 6,
    winsCount: 4,
    pickRate: 5.6,
    winRate: 66.7,
    avgKda: 1.97,
    avgCombatScore: 219.0
  },

  // Controllers (전략가)
  {
    id: 'omen',
    name: '오멘',
    englishName: 'Omen',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png',
    picksCount: 5,
    winsCount: 2,
    pickRate: 4.6,
    winRate: 40.0,
    avgKda: 1.48,
    avgCombatScore: 182.0
  },
  {
    id: 'miks',
    name: '믹스',
    englishName: 'Miks',
    role: '전략가',
    portraitUrl: 'https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png',
    picksCount: 8,
    winsCount: 5,
    pickRate: 7.4,
    winRate: 62.5,
    avgKda: 1.80,
    avgCombatScore: 198.0
  },
  {
    id: 'deadlock',
    name: '데드록',
    englishName: 'Deadlock',
    role: '감시자',
    portraitUrl: 'https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayicon.png',
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
    portraitUrl: 'https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/displayicon.png',
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
      타격대: { role: '타격대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 210, avgKda: 1.1, topAgents: [{ agentName: '제트', matches: 1, winRate: 0, kda: 1.1 }] },
      감시자: { role: '감시자', matches: 1, wins: 1, winRate: 100, avgCombatScore: 240, avgKda: 1.7, topAgents: [{ agentName: '킬조이', matches: 1, winRate: 100, kda: 1.7 }] },
      전략가: { role: '전략가', matches: 2, wins: 1, winRate: 50, avgCombatScore: 235, avgKda: 1.6, topAgents: [{ agentName: '오멘', matches: 2, winRate: 50, kda: 1.6 }] },
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
      타격대: { role: '타격대', matches: 2, wins: 1, winRate: 50, avgCombatScore: 230, avgKda: 1.4, topAgents: [{ agentName: '제트', matches: 2, winRate: 50, kda: 1.4 }] },
      감시자: {
        role: '감시자',
        matches: 9,
        wins: 6,
        winRate: 67,
        avgCombatScore: 255,
        avgKda: 1.8,
        topAgents: [{ agentName: '킬조이', matches: 6, winRate: 67, kda: 1.9 }, { agentName: '체임버', matches: 3, winRate: 67, kda: 1.6 }]
      },
      전략가: { role: '전략가', matches: 2, wins: 1, winRate: 50, avgCombatScore: 220, avgKda: 1.3, topAgents: [{ agentName: '오멘', matches: 2, winRate: 50, kda: 1.3 }] },
      척후대: { role: '척후대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 200, avgKda: 1.0, topAgents: [{ agentName: '소바', matches: 1, winRate: 0, kda: 1.0 }] }
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
      감시자: { role: '감시자', matches: 1, wins: 0, winRate: 0, avgCombatScore: 220, avgKda: 1.1, topAgents: [{ agentName: '킬조이', matches: 1, winRate: 0, kda: 1.1 }] },
      전략가: { role: '전략가', matches: 1, wins: 1, winRate: 100, avgCombatScore: 240, avgKda: 1.5, topAgents: [{ agentName: '오멘', matches: 1, winRate: 100, kda: 1.5 }] },
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
      감시자: { role: '감시자', matches: 1, wins: 1, winRate: 100, avgCombatScore: 210, avgKda: 1.2, topAgents: [{ agentName: '킬조이', matches: 1, winRate: 100, kda: 1.2 }] },
      전략가: { role: '전략가', matches: 1, wins: 0, winRate: 0, avgCombatScore: 180, avgKda: 0.9, topAgents: [{ agentName: '오멘', matches: 1, winRate: 0, kda: 0.9 }] },
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
      타격대: { role: '타격대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 190, avgKda: 0.9, topAgents: [{ agentName: '제트', matches: 1, winRate: 0, kda: 0.9 }] },
      감시자: { role: '감시자', matches: 1, wins: 0, winRate: 0, avgCombatScore: 200, avgKda: 1.0, topAgents: [{ agentName: '킬조이', matches: 1, winRate: 0, kda: 1.0 }] },
      전략가: { role: '전략가', matches: 10, wins: 5, winRate: 50, avgCombatScore: 230, avgKda: 1.4, topAgents: [{ agentName: '오멘', matches: 7, winRate: 43, kda: 1.4 }] },
      척후대: { role: '척후대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 180, avgKda: 0.8, topAgents: [{ agentName: '소바', matches: 1, winRate: 0, kda: 0.8 }] }
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
      감시자: { role: '감시자', matches: 1, wins: 1, winRate: 100, avgCombatScore: 190, avgKda: 1.1, topAgents: [{ agentName: '킬조이', matches: 1, winRate: 100, kda: 1.1 }] },
      전략가: { role: '전략가', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
      척후대: { role: '척후대', matches: 1, wins: 0, winRate: 0, avgCombatScore: 180, avgKda: 0.9, topAgents: [{ agentName: '소바', matches: 1, winRate: 0, kda: 0.9 }] }
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
      감시자: { role: '감시자', matches: 1, wins: 0, winRate: 0, avgCombatScore: 170, avgKda: 0.8, topAgents: [{ agentName: '킬조이', matches: 1, winRate: 0, kda: 0.8 }] },
      전략가: { role: '전략가', matches: 0, wins: 0, winRate: 0, avgCombatScore: 0, avgKda: 0, topAgents: [] },
      척후대: { role: '척후대', matches: 2, wins: 1, winRate: 50, avgCombatScore: 185, avgKda: 1.1, topAgents: [{ agentName: '소바', matches: 2, winRate: 50, kda: 1.1 }] }
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
    createdAt: '2024-10-15',
    publicPassword: '1234',
    adminPassword: 'admin1234'
  },
  {
    id: 'srv-2',
    name: '발로란트 천상계 내전',
    operatorId: '레전드오퍼',
    activePlayersCount: 120,
    totalMatchesCount: 2340,
    createdAt: '2024-09-20',
    publicPassword: '1234',
    adminPassword: 'admin1234'
  },
  {
    id: 'srv-3',
    name: '즐겜 10인 커스텀 서버',
    operatorId: '발로짱',
    activePlayersCount: 45,
    totalMatchesCount: 512,
    createdAt: '2024-11-01',
    publicPassword: '1234',
    adminPassword: 'admin1234'
  }
];
