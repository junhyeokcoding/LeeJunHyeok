import React, { useState } from 'react';
import { Shield, Key, Server, Plus, ArrowRight, Lock, Activity, Sparkles } from 'lucide-react';
import { CustomServer } from '../types';

interface LoginViewProps {
  servers: CustomServer[];
  onLoginSuccess: (serverName: string, operatorId: string) => void;
  onOpenCreateServer: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  servers,
  onLoginSuccess,
  onOpenCreateServer,
}) => {
  const [selectedServer, setSelectedServer] = useState<string>(servers[0]?.name || '이준혁테스트');
  const [operatorId, setOperatorId] = useState<string>('이준혁테스트');
  const [password, setPassword] = useState<string>('••••••••');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operatorId.trim()) {
      setErrorMsg('운영자 ID를 입력해주세요.');
      return;
    }
    setErrorMsg('');
    onLoginSuccess(selectedServer, operatorId.trim());
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2315_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2315_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[120px] pointer-events-none -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -bottom-20 -right-20" />

      {/* Main Login Card Container */}
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Tactical Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rose-600/60 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-rose-600/60 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rose-600/60 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rose-600/60 rounded-br-2xl" />

        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-700 to-rose-900 text-white shadow-xl shadow-rose-950/40 mb-4 border border-rose-600/30">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white font-mono uppercase">
            VANGUARD <span className="text-rose-400 font-sans">TACTICAL</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            발로란트 / 전술 슈팅 내전 분석 매니저
          </p>
        </div>

        {/* Server Selection & Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-700/30 text-rose-400 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* Target Server Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-rose-400" />
                접속 내전 서버
              </span>
              <button
                type="button"
                onClick={onOpenCreateServer}
                className="text-rose-400 hover:text-rose-300 text-[11px] font-sans flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                새 서버 생성
              </button>
            </label>
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-600/70 focus:ring-1 focus:ring-rose-500/30 transition-all font-sans"
            >
              {servers.map((srv) => (
                <option key={srv.id} value={srv.name}>
                  {srv.name} (운영자: {srv.operatorId})
                </option>
              ))}
            </select>
          </div>

          {/* Operator ID Input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              운영자 / 플레이어 계정
            </label>
            <input
              type="text"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              placeholder="예: 이준혁테스트"
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-rose-600/70 focus:ring-1 focus:ring-rose-500/30 transition-all font-sans"
            />
          </div>

          {/* Access Password */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              접속 패스워드
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="패스워드 입력"
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-rose-600/70 focus:ring-1 focus:ring-rose-500/30 transition-all font-sans"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-950/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>내전 서버 입장하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Create Server Shortcut Card */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80">
          <button
            onClick={onOpenCreateServer}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-between transition-all group"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              자신만의 커스텀 내전 서버 개설
            </span>
            <span className="text-rose-400 font-mono text-[11px] group-hover:translate-x-1 transition-transform">
              생성하기 &rarr;
            </span>
          </button>
        </div>

        {/* System Footer Status */}
        <div className="mt-6 text-center text-[11px] text-zinc-500 font-mono flex items-center justify-center gap-2">
          <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span>Server Online v2.4.0-Tactical</span>
        </div>
      </div>
    </div>
  );
};
