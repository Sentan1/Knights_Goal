
import React from 'react';
import { ArmorSet } from '../types';

interface KnightProps {
  armor: ArmorSet;
}

const Knight: React.FC<KnightProps> = ({ armor }) => {
  const level = armor.tier; // 0-99 index
  
  // Specific visual unlocks per level milestones
  const hasVisorSlit = level >= 2; // Lv 3
  const hasReinforcedShield = level >= 3; // Lv 4
  const hasChestPlateLogo = level >= 9; // Lv 10
  const hasSwordEngraving = level >= 9; // Lv 10
  const hasAdvancedHelmet = level >= 9; // Lv 10
  
  // Continuous progression milestones
  const hasPauldrons = level >= 15;
  const hasPlume = level >= 25;
  const hasCape = level >= 40;
  const hasSwordGlow = level >= 50;
  const hasDoubleWings = level >= 75;
  const hasWings = level >= 65 || hasDoubleWings;
  const hasHalo = level >= 80;
  const hasAura = level >= 90;

  // Granular scaling (changes every level)
  const swordWidth = 1.5 + (level * 0.05); // Grows 0.05 units per level
  const swordLength = 9 + (level * 0.12); // Grows 0.12 units per level
  const shieldScale = 1 + (level * 0.008); // Scales up 0.8% per level
  const plumeHeight = Math.min(6, (level - 25) * 0.2); // Grows after level 25
  const capeLength = Math.min(12, (level - 40) * 0.3); // Grows after level 40
  const wingSpan = 1 + (level * 0.02); // Grows after level 65

  return (
    <div className="relative w-20 h-20 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] animate-knight-idle">
      {/* Background Aura */}
      {hasAura && (
        <div 
          className="absolute inset-0 blur-xl animate-pulse rounded-full z-0"
          style={{ backgroundColor: `${armor.accent}44` }}
        ></div>
      )}

      <svg viewBox="0 0 24 24" className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* SHADOW */}
        <ellipse cx="12" cy="22" rx="7" ry="1.5" fill="black" opacity="0.3" />

        {/* --- WINGS --- */}
        {hasWings && (
          <g className="animate-pulse" opacity="0.7" transform={`scale(${wingSpan})`} transform-origin="center">
            <path d="M7 10 L1 4 L3 12 Z" fill={armor.accent} />
            <path d="M17 10 L23 4 L21 12 Z" fill={armor.accent} />
            {hasDoubleWings && (
              <g transform="translate(0, 3)">
                <path d="M7 10 L1 4 L3 12 Z" fill={armor.primary} opacity="0.5" />
                <path d="M17 10 L23 4 L21 12 Z" fill={armor.primary} opacity="0.5" />
              </g>
            )}
          </g>
        )}

        {/* --- CAPE --- */}
        {hasCape && (
          <g transform={`translate(0, ${Math.sin(Date.now() / 200) * 0.5})`}>
            <rect x="5" y="10" width="14" height={10 + capeLength} fill={armor.secondary} opacity="0.8" />
            <rect x="4" y="11" width="16" height={8 + capeLength} fill={armor.secondary} opacity="0.6" />
          </g>
        )}

        {/* --- LEGS --- */}
        <rect x="8" y="19" width="3" height="3" fill={armor.secondary} />
        <rect x="13" y="19" width="3" height="3" fill={armor.secondary} />
        <rect x="8" y="21" width="3" height="1" fill={armor.accent} />
        <rect x="13" y="21" width="3" height="1" fill={armor.accent} />

        {/* --- BODY --- */}
        <rect x="7" y="10" width="10" height="9" fill={armor.primary} />
        <rect x="7" y="10" width="2" height="9" fill={armor.secondary} />
        
        {/* Chest Plate Detail (Lv 10+) */}
        {hasChestPlateLogo && (
          <g>
            <rect x="11" y="13" width="2" height="3" fill={armor.accent} />
            {level > 50 && <rect x="10" y="14" width="4" height="1" fill={armor.accent} />}
          </g>
        )}

        {/* Pauldrons */}
        {hasPauldrons && (
          <g>
            <rect x="5" y="9" width="4" height="4" fill={armor.accent} />
            <rect x="15" y="9" width="4" height="4" fill={armor.accent} />
            {level > 30 && <rect x="5" y="8" width="4" height="1" fill={armor.primary} />}
          </g>
        )}

        {/* --- HEAD --- */}
        <rect x="8" y="3" width="8" height="7" fill={armor.primary} />
        <rect x="8" y="3" width="8" height="2" fill={armor.accent} />
        <rect x="8" y="3" width="1" height="7" fill={armor.secondary} />
        
        {/* Helmet evolution: Visor slit (Lv 3+) and Gem (Lv 10+) */}
        {hasAdvancedHelmet && <rect x="11" y="2" width="2" height="2" fill={armor.accent} />}
        
        {/* Visor */}
        <rect x="10" y="6" width="6" height={hasVisorSlit ? 2 : 1} fill="#000" />
        {level > 50 && <rect x="11" y="6" width="1" height="1" fill={armor.accent} className="animate-pulse" />}

        {/* Plume */}
        {hasPlume && (
          <path d={`M12 3 L12 ${-plumeHeight} L15 1 Z`} fill={armor.accent} />
        )}

        {/* Halo */}
        {hasHalo && (
          <ellipse cx="12" cy="1" rx="4" ry="1" fill="none" stroke={armor.accent} strokeWidth="0.5" className="animate-bounce" />
        )}

        {/* --- SHIELD --- */}
        <g transform={`translate(2, 11) scale(${shieldScale})`}>
          <rect x="0" y="0" width="6" height="8" fill={armor.accent} />
          <rect x="1" y="1" width="4" height="6" fill={armor.primary} />
          {hasReinforcedShield && (
            <g>
              <rect x="1" y="1" width="4" height="1" fill={armor.secondary} />
              <rect x="1" y="6" width="4" height="1" fill={armor.secondary} />
            </g>
          )}
          {level > 30 && <rect x="2" y="3" width="2" height="2" fill={armor.accent} />}
        </g>

        {/* --- WEAPON --- */}
        <g transform={`translate(17, 11)`}>
          <rect x="0" y="0" width="3" height="3" fill={armor.primary} />
          <g transform="translate(3, -7)">
             <rect x={-swordWidth/2 + 1} y={9 - swordLength} width={swordWidth} height={swordLength} fill={hasSwordGlow ? "#fff" : "#aaa"} filter={hasSwordGlow ? "url(#glow)" : ""} />
             {hasSwordEngraving && <rect x="0.5" y={10 - swordLength} width="0.5" height={swordLength-2} fill={armor.accent} opacity="0.6" />}
             <rect x="-1" y="8" width="4" height="1" fill="#555" />
             <rect x="0" y="9" width="2" height="2" fill="#3d2b1f" />
          </g>
        </g>

        {/* Ascended Particles */}
        {level > 90 && (
          <g>
            <rect x="4" y="4" width="1" height="1" fill="#fff" className="animate-ping" />
            <rect x="20" y="10" width="1" height="1" fill="#fff" className="animate-ping" style={{animationDelay: '0.2s'}} />
            <rect x="12" y="2" width="1" height="1" fill="#fff" className="animate-ping" style={{animationDelay: '0.4s'}} />
          </g>
        )}
      </svg>
    </div>
  );
};

export default Knight;
