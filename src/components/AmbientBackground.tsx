import React from 'react';

const NOISE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

// Fixed, pointer-events-none atmosphere layer: radial mesh glow + film grain.
// Mounted once at the app root so every screen shares the same ambient depth.
export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[720px] max-h-[720px] rounded-full bg-rose-900/15 blur-[140px] animate-[drift_22s_ease-in-out_infinite]" />
      <div className="absolute -bottom-1/3 -right-1/4 w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full bg-cyan-900/10 blur-[140px] animate-[drift_26s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/3 left-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-violet-900/[0.08] blur-[130px]" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_URL}")` }}
      />
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4%, 3%); }
        }
      `}</style>
    </div>
  );
};
