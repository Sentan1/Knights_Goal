
import React, { useState, useEffect, useRef } from 'react';
import Knight from './Knight';
import Chest from './Chest';
import { ArmorSet, GameState } from '../types';
import { TILES_PER_CHEST } from '../constants';

interface GameMapProps {
  armor: ArmorSet;
  gameState: GameState;
  flavorText: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

const GameMap: React.FC<GameMapProps> = ({ armor, gameState, flavorText }) => {
  const currentTile = gameState.completedTaskCount % TILES_PER_CHEST;
  const progressPercent = (currentTile / (TILES_PER_CHEST - 1)) * 100;
  
  const maxPowerForLevel = (gameState.level + 1) * 200;
  const powerProgress = (gameState.totalPower / maxPowerForLevel) * 100;

  // Particle Logic
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextParticleId = useRef(0);
  const lastTaskCount = useRef(gameState.completedTaskCount);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameState.completedTaskCount > lastTaskCount.current) {
      // Create a burst of particles
      const newParticles: Particle[] = [];
      const particleCount = 15;
      
      // Calculate knight position roughly
      const rect = containerRef.current?.getBoundingClientRect();
      const knightX = rect ? (progressPercent / 100) * (rect.width - 80) + 40 : 150;
      const knightY = 220;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: nextParticleId.current++,
          x: knightX,
          y: knightY,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 8 - 2,
          color: ['#ffd700', '#fff', '#f1c40f', '#e67e22'][Math.floor(Math.random() * 4)],
          size: Math.random() * 4 + 2,
          life: 1.0
        });
      }
      setParticles(prev => [...prev, ...newParticles]);
    }
    lastTaskCount.current = gameState.completedTaskCount;
  }, [gameState.completedTaskCount, progressPercent]);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3, // gravity
            life: p.life - 0.05
          }))
          .filter(p => p.life > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [particles]);
  
  return (
    <div ref={containerRef} className="relative w-full h-80 overflow-hidden border-b-4 border-black bg-[#4a6b6b]">
      <div className="vignette"></div>
      <div className="scanlines"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#3a5252] to-[#4a6b6b]"></div>
      
      {/* Background Decor */}
      <div className="absolute top-4 left-[-10px] w-32 h-20 opacity-80" style={{ transform: 'scale(1.2)' }}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20 L28 20 L24 28 L8 28 Z" fill="#3d2b1f" />
          <rect x="4" y="16" width="24" height="4" fill="#6a8a2a" />
          <rect x="2" y="18" width="28" height="2" fill="#4d661b" />
        </svg>
      </div>

      <div className="absolute bottom-20 w-full flex justify-around opacity-30">
        <div className="w-24 h-40 bg-[#2a3a3a] rounded-t-full"></div>
        <div className="w-40 h-52 bg-[#2a3a3a] rounded-t-full mt-10"></div>
        <div className="w-24 h-32 bg-[#2a3a3a] rounded-t-full"></div>
      </div>

      {/* Bridge/Ground */}
      <div className="absolute bottom-0 w-full h-20 bg-[#1a1a1a]">
        <div className="w-full h-4 bg-[#4d661b]"></div>
        <div className="absolute top-0 left-0 w-full h-4 flex justify-around">
           {[...Array(15)].map((_, i) => (
             <div key={i} className="w-5 h-full border-x border-black bg-[#5c4033]"></div>
           ))}
        </div>
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 scale-90 origin-top-left">
         <div className="flex items-center gap-4 bg-black/40 p-2 rounded border border-white/10 backdrop-blur-sm">
            <div className="w-14 h-14 bg-[#3d2b1f] border-4 border-black flex items-center justify-center relative">
                <div className="w-10 h-10 bg-red-800 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-[10px] text-white pixel-font">STR</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="relative w-48 h-5 bg-black border-2 border-[#555] p-[2px]">
                    <div className="bg-red-600 h-full transition-all duration-1000" style={{ width: `${Math.min(100, powerProgress)}%` }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] pixel-font text-white drop-shadow">POW {Math.floor(gameState.totalPower)}</span>
                </div>
                <div className="relative w-40 h-4 bg-black border-2 border-[#555] p-[2px]">
                    <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] pixel-font text-white drop-shadow">STEP {currentTile + 1}/10</span>
                </div>
            </div>
         </div>
      </div>

      {/* Grid Elements */}
      <div className="absolute bottom-14 w-full flex justify-between px-10 h-full items-end">
        {[...Array(TILES_PER_CHEST)].map((_, i) => (
          <div key={i} className="relative w-full flex justify-center items-end pb-2">
            {i === TILES_PER_CHEST - 1 && (
              <div className="absolute bottom-2 scale-110">
                <Chest />
              </div>
            )}
            
            {i === currentTile && (
              <div className="absolute bottom-2 transition-all duration-700 ease-in-out z-30 transform scale-110">
                <Knight armor={armor} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Particles Layer */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {particles.map(p => (
          <div 
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.life,
              boxShadow: `0 0 5px ${p.color}`,
              imageRendering: 'pixelated'
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] bg-black/70 backdrop-blur-md p-4 text-center border-t border-b border-white/10 z-20 shadow-xl">
        <p className="text-white text-base italic font-medium leading-tight">
          &quot;{flavorText}&quot;
        </p>
      </div>

      <div className="absolute top-4 right-4 pixel-font text-[12px] text-white bg-red-900 px-3 py-1 border-2 border-black shadow-[2px_2px_0_0_#000]">
         LVL {gameState.level + 1}
      </div>
    </div>
  );
};

export default GameMap;
