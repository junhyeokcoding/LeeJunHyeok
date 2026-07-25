import React, { useState } from 'react';
import { ROLE_DEFINITIONS } from '../data/mockData';
import { RoleType } from '../types';

interface RoleIconProps {
  role: RoleType;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export const RoleIcon: React.FC<RoleIconProps> = ({
  role,
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const roleInfo = ROLE_DEFINITIONS[role] || ROLE_DEFINITIONS['타격대'];

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  }[size];

  const containerSizes = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2',
    xl: 'p-2.5',
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div
        className={`relative inline-flex items-center justify-center rounded-lg bg-zinc-900/90 border border-zinc-700/60 shadow-inner ${containerSizes}`}
        title={`${roleInfo.name} (${roleInfo.englishName})`}
        style={{ borderColor: `${roleInfo.color}40` }}
      >
        {!imageError ? (
          <img
            src={roleInfo.iconUrl}
            alt={role}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`${sizeClasses} object-contain filter drop-shadow`}
          />
        ) : (
          <svg
            className={`${sizeClasses}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke={roleInfo.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: roleInfo.fallbackIconSvg }}
          />
        )}
      </div>

      {showLabel && (
        <span
          className="font-medium text-xs tracking-wider uppercase"
          style={{ color: roleInfo.color }}
        >
          {roleInfo.name}
        </span>
      )}
    </div>
  );
};
