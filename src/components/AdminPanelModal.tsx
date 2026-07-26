import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlayerProfile, MatchRecord } from '../types';
import { ShieldAlert, Users, Trash2, Edit2, GitMerge, Check, AlertTriangle, Server, Database } from 'lucide-react';

interface AdminPanelModalProps {
  players: PlayerProfile[];
  matches: MatchRecord[];
  onUpdateNickname: (playerId: string, newName: string) => void;
  onMergePlayers: (sourceId: string, targetId: string) => void;
  onDeleteMatch: (matchId: string) => void;
}

const EASE = [0.32, 0.72, 0, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: EASE, delay },
});

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  players,
  matches,
  onUpdateNickname,
  onMergePlayers,
  onDeleteMatch,
}) => {
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const [sourceMergeId, setSourceMergeId] = useState<string>('');
  const [targetMergeId, setTargetMergeId] = useState<string>('');
  const [mergeSuccessMsg, setMergeSuccessMsg] = useState<string>('');
  const [mergeErrorMsg, setMergeErrorMsg] = useState<string>('');

  const handleStartEdit = (player: PlayerProfile) => {
    setEditingPlayerId(player.id);
    setEditingName(player.nickname);
  };

  const handleSaveEdit = (playerId: string) => {
    if (editingName.trim()) {
      onUpdateNickname(playerId, editingName.trim());
    }
    setEditingPlayerId(null);
  };

  const handleExecuteMerge = () => {
    if (!sourceMergeId || !targetMergeId || sourceMergeId === targetMergeId) {
      setMergeErrorMsg('병합할 서로 다른 두 플레이어를 선택해주세요.');
      return;
    }
    setMergeErrorMsg('');
    onMergePlayers(sourceMergeId, targetMergeId);
    setMergeSuccessMsg('플레이어 전적이 성공적으로 병합되었습니다.');
    setTimeout(() => setMergeSuccessMsg(''), 3000);
    setSourceMergeId('');
    setTargetMergeId('');
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-rose-300/90 bg-rose-500/10 ring-1 ring-rose-500/20 mb-3">
            <ShieldAlert className="w-3 h-3" />
            System Secure • Data Sync Active
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            서버 <span className="text-rose-400">관리자 페이지</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] ring-1 ring-white/10 text-zinc-300">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>Latency: 24ms</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] ring-1 ring-white/10 text-zinc-300">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>DB: Connected</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div {...reveal()} className="glass-shell shadow-xl shadow-black/30">
            <div className="glass-core backdrop-blur-xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                등록 플레이어 인원 관리
              </h2>

              <div className="overflow-x-auto rounded-2xl ring-1 ring-white/5">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-white/[0.02] text-zinc-500 uppercase font-mono text-[11px]">
                    <tr>
                      <th className="py-3 px-4">닉네임</th>
                      <th className="py-3 px-4">경기 수</th>
                      <th className="py-3 px-4">승률</th>
                      <th className="py-3 px-4 text-right">수정 관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {players.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.03]">
                        <td className="py-2.5 px-4 font-semibold text-white">
                          {editingPlayerId === p.id ? (
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="bg-white/[0.03] ring-1 ring-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:ring-rose-500/50"
                            />
                          ) : (
                            p.nickname
                          )}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-zinc-400">{p.matchesCount}전</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-emerald-400">{p.winRate}%</td>
                        <td className="py-2.5 px-4 text-right">
                          {editingPlayerId === p.id ? (
                            <button
                              onClick={() => handleSaveEdit(p.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-[11px] font-bold inline-flex items-center gap-1 transition-colors duration-500 ease-premium"
                            >
                              <Check className="w-3 h-3" /> 저장
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-full text-[11px] font-medium inline-flex items-center gap-1 transition-colors duration-500 ease-premium"
                            >
                              <Edit2 className="w-3 h-3" /> 수정
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div {...reveal(0.05)} className="glass-shell shadow-xl shadow-black/30">
            <div className="glass-core backdrop-blur-xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-amber-400" />
                중복 플레이어 전적 병합 (Merge)
              </h2>
              <p className="text-xs text-zinc-500">
                오타 또는 닉네임 변경으로 인해 생성된 중복 계정 전적을 합칩니다.
              </p>

              {mergeSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  {mergeSuccessMsg}
                </div>
              )}

              {mergeErrorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 ring-1 ring-rose-500/30 text-rose-400 text-xs font-mono font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {mergeErrorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">병합할 대상 계정 (삭제됨)</label>
                  <select
                    value={sourceMergeId}
                    onChange={(e) => setSourceMergeId(e.target.value)}
                    className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="" className="bg-zinc-900">대상 선택...</option>
                    {players.map((p) => (
                      <option key={p.id} value={p.id} className="bg-zinc-900">
                        {p.nickname} ({p.matchesCount}전)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">최종 유치 계정 (전적 합침)</label>
                  <select
                    value={targetMergeId}
                    onChange={(e) => setTargetMergeId(e.target.value)}
                    className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="" className="bg-zinc-900">최종 계정 선택...</option>
                    {players.map((p) => (
                      <option key={p.id} value={p.id} className="bg-zinc-900">
                        {p.nickname} ({p.matchesCount}전)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleExecuteMerge}
                className="px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors duration-500 ease-premium"
              >
                <GitMerge className="w-4 h-4" />
                <span>선택 계정 전적 병합 실행</span>
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div {...reveal(0.1)} className="glass-shell shadow-xl shadow-black/30">
          <div className="glass-core backdrop-blur-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" />
              등록 경기 목록 관리
            </h2>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] ring-1 ring-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span>{m.mapName}</span>
                      <span className="text-zinc-500">({m.score})</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{m.date}</div>
                  </div>

                  <button
                    onClick={() => onDeleteMatch(m.id)}
                    className="w-8 h-8 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/30 transition-colors duration-500 ease-premium flex items-center justify-center"
                    title="경기 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
