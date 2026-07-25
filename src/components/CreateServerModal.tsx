import React, { useState } from 'react';
import { X, Server, Lock, Shield, Plus, ArrowRight } from 'lucide-react';
import { CustomServer } from '../types';

interface CreateServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateServer: (server: CustomServer) => void;
}

export const CreateServerModal: React.FC<CreateServerModalProps> = ({
  isOpen,
  onClose,
  onCreateServer,
}) => {
  const [serverName, setServerName] = useState('');
  const [operatorId, setOperatorId] = useState('');
  const [publicPassword, setPublicPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverName.trim() || !operatorId.trim()) {
      alert('서버명과 운영자 ID를 입력해 주세요.');
      return;
    }

    const newServer: CustomServer = {
      id: `srv-${Date.now()}`,
      name: serverName.trim(),
      operatorId: operatorId.trim(),
      activePlayersCount: 1,
      totalMatchesCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onCreateServer(newServer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative font-sans">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white font-mono">
              새 내전 서버 개설
            </h2>
            <p className="text-xs text-zinc-400">
              새로운 커스텀 10인 내전 관리 노드를 생성합니다.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
              내전 서버명
            </label>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="예: 천상계 10인 내전 노드"
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
              총괄 운영자 ID
            </label>
            <input
              type="text"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              placeholder="예: 마스터오퍼"
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
              일반 접속 비밀번호
            </label>
            <input
              type="password"
              value={publicPassword}
              onChange={(e) => setPublicPassword(e.target.value)}
              placeholder="일반 멤버 접속 패스워드"
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
              관리자 전용 비밀번호
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="수정/삭제 권한 패스워드"
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>서버 생성 및 바로 접속</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
