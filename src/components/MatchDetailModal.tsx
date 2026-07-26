import React from 'react';
import { MatchRecord, MatchPlayer } from '../types';
import { getAgentPortraitUrl } from '../data/mockData';
import { X, Calendar, Award } from 'lucide-react';

interface MatchDetailModalProps {
  match: MatchRecord | null;
  onClose: () => void;
}

const calcKda = (p: MatchPlayer): string => {
  const kda = p.deaths > 0 ? (p.kills + p.assists) / p.deaths : p.kills + p.assists;
  return kda.toFixed(2);
};

const TeamTable: React.FC<{ title: string; players: MatchPlayer[]; won: boolean }> = ({ title, players, won }) => (
  <div>
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-t-2xl text-xs font-bold font-mono ${
        won ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20' : 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20'
      }`}
    >
      <span>{title}</span>
      <span className="text-[10px] font-normal opacity-70">({players.length}명)</span>
    </div>
    <div className="overflow-x-auto rounded-b-2xl ring-1 ring-white/5">
      <table className="w-full text-left text-xs text-zinc-300">
        <thead className="bg-white/[0.02] text-zinc-500 uppercase font-mono text-[11px]">
          <tr>
            <th className="py-2.5 px-4">플레이어</th>
            <th className="py-2.5 px-4">요원</th>
            <th className="py-2.5 px-4">K</th>
            <th className="py-2.5 px-4">D</th>
            <th className="py-2.5 px-4">A</th>
            <th className="py-2.5 px-4">전투점수</th>
            <th className="py-2.5 px-4">KDA</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-sans">
          {players.map((p, i) => (
            <tr key={i} className="hover:bg-white/[0.03]">
              <td className="py-2.5 px-4 font-semibold text-white">{p.nickname}</td>
              <td className="py-2.5 px-4">
                <div className="flex items-center gap-1.5">
                  <img
                    src={getAgentPortraitUrl(p.agent)}
                    alt={p.agent}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover bg-zinc-800 shrink-0"
                  />
                  <span className="font-mono">{p.agent}</span>
                </div>
              </td>
              <td className="py-2.5 px-4 font-mono">{p.kills}</td>
              <td className="py-2.5 px-4 font-mono">{p.deaths}</td>
              <td className="py-2.5 px-4 font-mono">{p.assists}</td>
              <td className="py-2.5 px-4 font-mono font-bold text-amber-400">{p.combatScore}</td>
              <td className="py-2.5 px-4 font-mono font-bold text-zinc-200">{calcKda(p)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose }) => {
  if (!match) return null;

  const winTeam = match.players.filter((p) => p.isWin);
  const loseTeam = match.players.filter((p) => !p.isWin);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-shell max-w-3xl w-full my-8 shadow-2xl shadow-black/50">
        <div className="glass-core backdrop-blur-2xl p-6 sm:p-8 relative font-sans">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors duration-500 ease-premium flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    match.result === 'VICTORY'
                      ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20'
                  }`}
                >
                  {match.result}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">{match.matchType}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white font-display flex items-center gap-2">
                {match.mapName} <span className="text-zinc-500 text-lg font-mono">({match.score})</span>
              </h2>
              <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mt-1.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {match.date}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  MVP: <strong className="text-amber-400 font-medium">{match.mvpPlayer}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <TeamTable title="승리 팀" players={winTeam} won />
            <TeamTable title="패배 팀" players={loseTeam} won={false} />
          </div>

          {match.notes && (
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-500">{match.notes}</div>
          )}
        </div>
      </div>
    </div>
  );
};
