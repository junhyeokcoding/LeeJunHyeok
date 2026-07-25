import React, { useState } from 'react';
import { PlayerProfile, MatchRecord } from '../types';
import { ShieldAlert, Users, Trash2, Edit2, GitMerge, Check, AlertTriangle, Server, Database } from 'lucide-react';

interface AdminPanelModalProps {
  players: PlayerProfile[];
  matches: MatchRecord[];
  onUpdateNickname: (playerId: string, newName: string) => void;
  onMergePlayers: (sourceId: string, targetId: string) => void;
  onDeleteMatch: (matchId: string) => void;
}

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
      alert('병합할 서로 다른 두 플레이어를 선택해주세요.');
      return;
    }
    onMergePlayers(sourceMergeId, targetMergeId);
    setMergeSuccessMsg('플레이어 전적이 성공적으로 병합되었습니다.');
    setTimeout(() => setMergeSuccessMsg(''), 3000);
    setSourceMergeId('');
    setTargetMergeId('');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            SYSTEM SECURE • DATA SYNC ACTIVE
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono">
            서버 <span className="text-red-500">관리자 페이지</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>Latency: 24ms</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>DB: Connected</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Player Management & Nickname Edit & Merge */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nickname & Player ID Management */}
          <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <Users className="w-4 h-4 text-cyan-400" />
              등록 플레이어 인원 관리
            </h2>

            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 uppercase font-mono text-[11px] border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">닉네임</th>
                    <th className="py-3 px-4">경기 수</th>
                    <th className="py-3 px-4">승률</th>
                    <th className="py-3 px-4 text-right">수정 관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans">
                  {players.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-950/80">
                      <td className="py-2.5 px-4 font-bold text-white">
                        {editingPlayerId === p.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-red-500"
                          />
                        ) : (
                          p.nickname
                        )}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-zinc-400">
                        {p.matchesCount}전
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-emerald-400">
                        {p.winRate}%
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        {editingPlayerId === p.id ? (
                          <button
                            onClick={() => handleSaveEdit(p.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold inline-flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> 저장
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded text-[11px] font-medium inline-flex items-center gap-1"
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

          {/* Player Account Merge Feature */}
          <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <GitMerge className="w-4 h-4 text-amber-400" />
              중복 플레이어 전적 병합 (Merge)
            </h2>
            <p className="text-xs text-zinc-400">
              오타 또는 닉네임 변경으로 인해 생성된 중복 계정 전적을 합칩니다.
            </p>

            {mergeSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                {mergeSuccessMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  병합할 대상 계정 (삭제됨)
                </label>
                <select
                  value={sourceMergeId}
                  onChange={(e) => setSourceMergeId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="">대상 선택...</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nickname} ({p.matchesCount}전)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  최종 유치 계정 (전적 합침)
                </label>
                <select
                  value={targetMergeId}
                  onChange={(e) => setTargetMergeId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="">최종 계정 선택...</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nickname} ({p.matchesCount}전)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleExecuteMerge}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <GitMerge className="w-4 h-4" />
              <span>선택 계정 전적 병합 실행</span>
            </button>
          </div>
        </div>

        {/* Right Column: Match List & Delete */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Trash2 className="w-4 h-4 text-red-500" />
            등록 경기 목록 관리
          </h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {matches.map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{m.mapName}</span>
                    <span className="text-zinc-500">({m.score})</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    {m.date}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteMatch(m.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                  title="경기 삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
