import React, { useState } from 'react';
import { X, Server, ArrowRight, AlertCircle } from 'lucide-react';
import { CustomServer } from '../types';
import { PillButton } from './ui/PillButton';

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
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverName.trim() || !operatorId.trim()) {
      setErrorMsg('서버명과 운영자 ID를 입력해 주세요.');
      return;
    }
    if (!publicPassword.trim() || !adminPassword.trim()) {
      setErrorMsg('일반 접속 비밀번호와 관리자 전용 비밀번호를 모두 입력해 주세요.');
      return;
    }
    setErrorMsg('');

    const newServer: CustomServer = {
      id: `srv-${Date.now()}`,
      name: serverName.trim(),
      operatorId: operatorId.trim(),
      activePlayersCount: 1,
      totalMatchesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      publicPassword: publicPassword.trim(),
      adminPassword: adminPassword.trim()
    };

    onCreateServer(newServer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-shell max-w-md w-full shadow-2xl shadow-black/50">
        <div className="glass-core backdrop-blur-2xl p-6 sm:p-8 relative font-sans">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors duration-500 ease-premium flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white font-display">새 내전 서버 개설</h2>
              <p className="text-xs text-zinc-500">새로운 커스텀 10인 내전 관리 노드를 생성합니다.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/40 ring-1 ring-rose-700/30 text-rose-400 text-xs text-center font-medium flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">내전 서버명</label>
              <input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="예: 천상계 10인 내전 노드"
                className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">총괄 운영자 ID</label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                placeholder="예: 마스터오퍼"
                className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">일반 접속 비밀번호</label>
              <input
                type="password"
                value={publicPassword}
                onChange={(e) => setPublicPassword(e.target.value)}
                placeholder="일반 멤버 접속 패스워드"
                className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">관리자 전용 비밀번호</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="수정/삭제 권한 패스워드"
                className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-rose-500/50 transition-all"
              />
            </div>

            <PillButton type="submit" icon={ArrowRight} className="w-full justify-center mt-2">
              서버 생성 및 바로 접속
            </PillButton>
          </form>
        </div>
      </div>
    </div>
  );
};
