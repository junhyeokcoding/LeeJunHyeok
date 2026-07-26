import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MatchRecord, MatchPlayer, RoleType } from '../types';
import { UploadCloud, Sparkles, Image as ImageIcon, Zap, CheckCircle2, ArrowRight, Save, ClipboardPaste, X } from 'lucide-react';
import { PillButton } from './ui/PillButton';

const ROLE_OPTIONS: RoleType[] = ['타격대', '감시자', '전략가', '척후대'];

interface UploadMatchViewProps {
  onAddMatch: (newMatch: MatchRecord) => void;
  onNavigateToDashboard: () => void;
}

const EASE = [0.32, 0.72, 0, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, ease: EASE, delay },
});

export const UploadMatchView: React.FC<UploadMatchViewProps> = ({
  onAddMatch,
  onNavigateToDashboard,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [analyzedResult, setAnalyzedResult] = useState<MatchRecord | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const processFile = (file: File | null | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  // Lets a copied screenshot (Ctrl+V / Cmd+V) be pasted in anywhere on this screen.
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items || []).find((it) => it.type.startsWith('image/'));
      if (item) {
        processFile(item.getAsFile());
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Loads the bundled example scoreboard screenshot and converts it to a data URI,
  // same shape as a real drag-and-drop/paste, so "AI 스캔" can actually analyze it.
  const handleLoadSample = async () => {
    const res = await fetch('/example-scoreboard.png');
    const blob = await res.blob();
    const reader = new FileReader();
    reader.onload = (event) => setSelectedImage(event.target?.result as string);
    reader.readAsDataURL(blob);
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setIsSaved(false);
    setAnalysisStatus('AI 스코어보드 Vision OCR 스캔 진행 중...');

    try {
      const response = await fetch('/api/analyze-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage || undefined,
          fileName: 'ascent_match_screenshot.png'
        })
      });

      setAnalysisStatus('선수별 KDA / 요원(Role) 지표 정밀 추출 중...');
      const data = await response.json();

      if (data.success && data.matchData) {
        const raw = data.matchData;
        const newMatchRecord: MatchRecord = {
          id: `m-${Date.now()}`,
          date: new Date().toLocaleString('ko-KR'),
          mapName: raw.mapName || 'ASCENT',
          matchType: raw.matchType || '10인 정규 매치',
          score: raw.score || '13 - 9',
          result: raw.result || 'VICTORY',
          mvpPlayer: raw.mvpPlayer || '지군',
          notes: 'Claude AI Vision 정밀 스캔 자동 등록 매치',
          players: raw.players || []
        };

        setAnalyzedResult(newMatchRecord);
      } else {
        throw new Error(data.error || 'AI 분석 실패');
      }
    } catch (err) {
      console.error(err);
      setAnalysisStatus('분석 중 오류 발생 - 샘플 데이터를 자동 적용합니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveMatch = () => {
    if (!analyzedResult || isSaved) return;
    onAddMatch(analyzedResult);
    setIsSaved(true);
  };

  const handleCancelAnalysis = () => {
    setAnalyzedResult(null);
    setSelectedImage(null);
    setIsSaved(false);
    setAnalysisStatus('');
  };

  const updateMatchField = <K extends keyof MatchRecord>(field: K, value: MatchRecord[K]) => {
    setAnalyzedResult((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updatePlayerField = <K extends keyof MatchPlayer>(idx: number, field: K, value: MatchPlayer[K]) => {
    setAnalyzedResult((prev) => {
      if (!prev) return prev;
      const players = prev.players.map((pl, i) => (i === idx ? { ...pl, [field]: value } : pl));
      return { ...prev, players };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 font-sans">
      <div className="border-b border-white/5 pb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-rose-300/90 bg-rose-500/10 ring-1 ring-rose-500/20 mb-3">
          <Sparkles className="w-3 h-3" />
          AI Vision Match Screenshot Scanner
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          결과 스크린샷 <span className="text-rose-400">업로드 & AI 분석</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
          발로란트 / 내전 종료 후 결과 스크린샷을 올리면 Claude AI가 지도, 스코어, 10인 플레이어의 KDA 및 요원 정보를 자동 추출합니다.
        </p>
      </div>

      {!analyzedResult ? (
        <motion.div {...reveal()} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-shell shadow-xl shadow-black/30">
            <div className="glass-core backdrop-blur-xl p-6 space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors duration-500 ease-premium relative ${
                  isDragging ? 'border-rose-500 bg-rose-500/[0.04]' : 'border-white/10 hover:border-rose-500/60 bg-white/[0.01]'
                }`}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-2xl ring-1 ring-white/10 object-contain"
                    />
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      이미지 로드 완료
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        매치 결과 스크린샷을 이곳에 끌어다 놓으세요
                      </div>
                      <div className="text-xs text-zinc-500 mt-1 flex items-center justify-center gap-1.5">
                        <ClipboardPaste className="w-3.5 h-3.5" />
                        <span>복사한 이미지는 Ctrl+V(붙여넣기)로도 바로 등록할 수 있어요</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">JPG, PNG 파일 지원 (최대 10MB)</div>
                    </div>
                    <label className="inline-block mt-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs cursor-pointer transition-colors duration-500 ease-premium">
                      파일 선택하기
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-zinc-500 font-mono">스크린샷 파일이 없으신가요?</span>
                <button
                  onClick={handleLoadSample}
                  className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  테스트 샘플 스크린샷 적용하기
                </button>
              </div>

              <PillButton
                disabled={!selectedImage || isAnalyzing}
                onClick={handleStartAnalysis}
                icon={Zap}
                className="w-full justify-center"
              >
                {isAnalyzing ? 'Claude AI Vision 분석 중...' : 'AI 스캔 및 경기 등록 시작'}
              </PillButton>

              {isAnalyzing && (
                <div className="p-4 rounded-2xl bg-rose-950/30 ring-1 ring-rose-500/20 text-rose-300 text-xs text-center font-mono animate-pulse">
                  {analysisStatus}
                </div>
              )}
            </div>
          </div>

          <div className="glass-shell shadow-xl shadow-black/30">
            <div className="glass-core backdrop-blur-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Claude Vision AI Engine
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Anthropic Claude Opus 5 모델을 사용하여 발로란트 커스텀 매치의 스코어보드를 정밀 분석합니다.
              </p>

              <div className="space-y-3 pt-3 border-t border-white/5 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>맵 이름 & 스코어 자동 인식</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>10인 플레이어 KDA & ACS 자동 추출</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>요원(Role) 매핑 및 리더보드 자동 갱신</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div {...reveal()} className="glass-shell shadow-2xl shadow-black/40">
          <div className="glass-core backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">AI 분석 완료</h2>
                  <p className="text-xs text-zinc-500">
                    {isSaved ? '저장된 전적입니다.' : '저장 전 오타나 오류가 있다면 아래에서 직접 수정할 수 있습니다.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isSaved ? (
                  <PillButton onClick={onNavigateToDashboard} icon={ArrowRight}>
                    대시보드로 이동
                  </PillButton>
                ) : (
                  <>
                    <button
                      onClick={handleCancelAnalysis}
                      className="btn-pill py-2 px-5 text-sm bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 ring-1 ring-white/10"
                    >
                      <X className="w-4 h-4" />
                      <span>취소</span>
                    </button>
                    <PillButton onClick={handleSaveMatch} icon={Save}>
                      저장
                    </PillButton>
                  </>
                )}
              </div>
            </div>

            {isSaved && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400 text-xs font-mono font-bold text-center">
                전적이 저장되었습니다.
              </div>
            )}

            {/* Match-level fields */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: '맵', field: 'mapName' as const },
                { label: '스코어', field: 'score' as const },
                { label: 'MVP', field: 'mvpPlayer' as const },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-[10px] text-zinc-500 mb-1">{label}</label>
                  <input
                    type="text"
                    value={analyzedResult[field] as string}
                    disabled={isSaved}
                    onChange={(e) => updateMatchField(field, e.target.value)}
                    className="w-full bg-white/[0.03] ring-1 ring-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-rose-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] text-zinc-500 mb-1">결과</label>
                <div className="flex gap-1.5">
                  {(['VICTORY', 'DEFEAT'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      disabled={isSaved}
                      onClick={() => updateMatchField('result', r)}
                      className={`flex-1 rounded-xl py-2 text-[11px] font-bold font-mono transition-colors duration-300 disabled:cursor-not-allowed ${
                        analyzedResult.result === r
                          ? r === 'VICTORY'
                            ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40'
                          : 'bg-white/[0.03] text-zinc-500 ring-1 ring-white/10'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl ring-1 ring-white/5">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-white/[0.02] text-zinc-500 uppercase font-mono text-[11px]">
                  <tr>
                    <th className="py-3 px-4">플레이어</th>
                    <th className="py-3 px-4">요원</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">K</th>
                    <th className="py-3 px-4">D</th>
                    <th className="py-3 px-4">A</th>
                    <th className="py-3 px-4">전투점수</th>
                    <th className="py-3 px-4">결과</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {analyzedResult.players.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.03]">
                      <td className="py-1.5 px-4">
                        <input
                          type="text"
                          value={p.nickname}
                          disabled={isSaved}
                          onChange={(e) => updatePlayerField(idx, 'nickname', e.target.value)}
                          className="w-24 bg-transparent font-semibold text-white text-xs focus:outline-none focus:ring-1 focus:ring-rose-500/50 rounded px-1 py-1 disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="py-1.5 px-4">
                        <input
                          type="text"
                          value={p.agent}
                          disabled={isSaved}
                          onChange={(e) => updatePlayerField(idx, 'agent', e.target.value)}
                          className="w-16 bg-transparent font-mono text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50 rounded px-1 py-1 disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="py-1.5 px-4">
                        <select
                          value={p.role}
                          disabled={isSaved}
                          onChange={(e) => updatePlayerField(idx, 'role', e.target.value as RoleType)}
                          className="bg-transparent font-mono text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50 rounded px-1 py-1 disabled:cursor-not-allowed"
                        >
                          {ROLE_OPTIONS.map((r) => (
                            <option key={r} value={r} className="bg-zinc-900">
                              {r}
                            </option>
                          ))}
                        </select>
                      </td>
                      {(['kills', 'deaths', 'assists'] as const).map((field) => (
                        <td key={field} className="py-1.5 px-4">
                          <input
                            type="number"
                            value={p[field]}
                            disabled={isSaved}
                            onChange={(e) => updatePlayerField(idx, field, Number(e.target.value))}
                            className="w-12 bg-transparent font-mono text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50 rounded px-1 py-1 disabled:cursor-not-allowed"
                          />
                        </td>
                      ))}
                      <td className="py-1.5 px-4">
                        <input
                          type="number"
                          value={p.combatScore}
                          disabled={isSaved}
                          onChange={(e) => updatePlayerField(idx, 'combatScore', Number(e.target.value))}
                          className="w-16 bg-transparent font-mono text-xs font-bold text-amber-400 focus:outline-none focus:ring-1 focus:ring-rose-500/50 rounded px-1 py-1 disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="py-1.5 px-4">
                        <button
                          type="button"
                          disabled={isSaved}
                          onClick={() => updatePlayerField(idx, 'isWin', !p.isWin)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-colors disabled:cursor-not-allowed ${
                            p.isWin ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {p.isWin ? 'WIN' : 'LOSS'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
