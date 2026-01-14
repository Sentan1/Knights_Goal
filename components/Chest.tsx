
import React from 'react';

const Chest: React.FC<{ scale?: number, isOpen?: boolean }> = ({ scale = 1, isOpen = false }) => {
  return (
    <div style={{ width: `${48 * scale}px`, height: `${48 * scale}px` }} className="relative">
      <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
        {/* Light Glow when open */}
        {isOpen && (
          <g className="animate-pulse">
            <rect x="2" y="2" width="12" height="4" fill="#fff7e0" opacity="0.6" />
            <rect x="4" y="0" width="8" height="2" fill="#fff7e0" opacity="0.4" />
          </g>
        )}

        {/* Outline Base */}
        <rect x="1" y="7" width="14" height="7" fill="#000" />
        
        {/* Main Box */}
        <rect x="2" y="8" width="12" height="5" fill="#a0522d" />
        
        {/* Iron Bands Base */}
        <rect x="4" y="8" width="2" height="5" fill="#ffd700" />
        <rect x="10" y="8" width="2" height="5" fill="#ffd700" />

        {/* Lid (Animated) */}
        <g style={{ 
          transition: 'transform 0.5s ease-out', 
          transform: isOpen ? 'translateY(-4px)' : 'translateY(0)',
          transformOrigin: 'center'
        }}>
          {/* Lid Outline */}
          <rect x="1" y="4" width="14" height="4" fill="#000" />
          {/* Lid Color */}
          <rect x="2" y="5" width="12" height="3" fill="#cd853f" />
          {/* Lid Bands */}
          <rect x="4" y="5" width="2" height="3" fill="#ffd700" />
          <rect x="10" y="5" width="2" height="3" fill="#ffd700" />
          {/* Lock Panel */}
          {!isOpen && <rect x="7" y="7" width="2" height="2" fill="#000" />}
          {!isOpen && <rect x="7.5" y="7.5" width="1" height="1" fill="#ffd700" />}
        </g>

        {/* Shading */}
        <rect x="2" y="12" width="12" height="1" fill="#000" opacity="0.3" />
      </svg>
    </div>
  );
};

export default Chest;
