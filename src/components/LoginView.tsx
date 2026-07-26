import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Server, Plus, ArrowRight, Lock, Activity, Sparkles, AlertCircle } from 'lucide-react';
import { CustomServer } from '../types';
import { PillButton } from './ui/PillButton';

interface LoginViewProps {
  servers: CustomServer[];
  onLoginSuccess: (serverName: string, operatorId: string, isAdmin: boolean) => void;
  onOpenCreateServer: () => void;
}

const EASE = [0.32, 0.72, 0, 1] as const;

export const LoginView: React.FC<LoginViewProps> = ({
  servers,
  onLoginSuccess,
  onOpenCreateServer,
}) => {
  const [serverInput, setServerInput] = useState<string>('');
  const [operatorId, setOperatorId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetName = serverInput.trim();
    if (!targetName) {
      setErrorMsg('접속할 서버명을 입력해주세요.');
      return;
    }
    if (!operatorId.trim()) {
      setErrorMsg('운영자 ID를 입력해주세요.');
      return;
    }

    const server = servers.find((s) => s.name.trim() === targetName);
    if (!server) {
      setErrorMsg('존재하지 않는 서버입니다. 서버명을 확인하거나 새 서버를 생성해주세요.');
      return;
    }

    let isAdmin = false;
    if (password === server.adminPassword) {
      isAdmin = true;
    } else if (password !== server.publicPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    setErrorMsg('');
    onLoginSuccess(server.name, operatorId.trim(), isAdmin);
  };

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Tactical grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="w-full max-w-md relative z-10"
      >
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-rose-300/90 bg-rose-500/10 ring-1 ring-rose-500/20">
            <Activity className="w-3 h-3" />
            Tactical Access Node
          </span>
        </div>

        {/* Double-bezel card */}
        <div className="glass-shell shadow-2xl shadow-black/60">
          <div className="glass-core backdrop-blur-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-[1.1rem] bg-gradient-to-br from-rose-600 to-rose-800 text-white shadow-lg shadow-rose-950/50 mb-5">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
                Vanguard <span className="text-rose-400">Tactical</span>
              </h1>
              <p className="text-xs text-zinc-500 mt-1.5 font-mono">
                발로란트 / 전술 슈팅 내전 분석 매니저
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/40 ring-1 ring-rose-700/30 text-rose-400 text-xs text-center font-medium flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="flex items-center justify-between text-xs font-medium text-zinc-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-rose-400" />
                    접속 내전 서버
                  </span>
                  <button
                    type="button"
                    onClick={onOpenCreateServer}
                    className="text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    새 서버 생성
                  </button>
                </label>
                <input
                  type="text"
                  value={serverInput}
                  onChange={(e) => setServerInput(e.target.value)}
                  placeholder="예: ~의 서버"
                  className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-rose-500/50 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-2">
                  <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  운영자 / 플레이어 계정
                </label>
                <input
                  type="text"
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  placeholder="예: 닉네임"
                  className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-rose-500/50 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-2">
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  접속 패스워드
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="패스워드 입력"
                  className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-rose-500/50 transition-all"
                />
              </div>

              <PillButton type="submit" icon={ArrowRight} className="w-full justify-center mt-2">
                내전 서버 입장하기
              </PillButton>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5">
              <button
                onClick={onOpenCreateServer}
                className="w-full py-3 px-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] ring-1 ring-white/5 text-zinc-400 hover:text-white text-xs font-medium flex items-center justify-between transition-all duration-500 ease-premium group"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  자신만의 커스텀 내전 서버 개설
                </span>
                <span className="text-rose-400 font-mono text-[11px] group-hover:translate-x-1 transition-transform duration-500 ease-premium">
                  생성하기 &rarr;
                </span>
              </button>
            </div>

            <div className="mt-6 text-center text-[11px] text-zinc-600 font-mono flex items-center justify-center gap-2">
              <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>Server Online v2.4.0-Tactical</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
