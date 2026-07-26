import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PillButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  icon?: LucideIcon;
  variant?: 'primary' | 'ghost' | 'subtle';
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<PillButtonProps['variant']>, string> = {
  primary:
    'bg-rose-800/90 hover:bg-rose-700/90 text-white shadow-[0_8px_24px_-8px_rgba(159,18,57,0.4)]',
  ghost:
    'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-100 ring-1 ring-white/10',
  subtle:
    'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white ring-1 ring-white/5',
};

const ICON_BG: Record<NonNullable<PillButtonProps['variant']>, string> = {
  primary: 'bg-white/15',
  ghost: 'bg-white/10',
  subtle: 'bg-white/5',
};

// Nested "button-in-button" trailing icon + magnetic hover physics (group).
export const PillButton: React.FC<PillButtonProps> = ({
  icon: Icon,
  variant = 'primary',
  className = '',
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={`group btn-pill py-2 pl-6 ${Icon ? 'pr-2' : 'pr-6'} text-sm ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {Icon && (
        <span className={`btn-pill-icon w-8 h-8 ${ICON_BG[variant]}`}>
          <Icon className="w-4 h-4" />
        </span>
      )}
    </button>
  );
};
