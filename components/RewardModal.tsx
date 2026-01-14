
import React, { useState } from 'react';
import Chest from './Chest';
import Knight from './Knight';
import { ArmorSet } from '../types';

interface RewardModalProps {
  level: number;
  armor: ArmorSet;
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ level, armor, onClose }) => {
  const [chestOpen, setChestOpen] = useState(false);

  const handleOpen = () => {
    setChestOpen(true);
    // Add a slight delay before closing to let them see the reward
    setTimeout(() => {
      // We don't auto-close, we let them read then click again or have a "claim" button
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-[#e3d5c1] border-[10px] border-[#3d2b1f] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#3d2b1f]"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#3d2b1f]"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#3d2b1f]"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#3d2b1f]"></div>

        <div className="text-center space-y-8">
          <div>
            <h2 className="pixel-font text-gray-800 text-sm mb-3">YOU ATTAINED LEVEL <span className="text-red-600">{level + 1}</span>!</h2>
            <p className="pixel-font text-[11px] text-gray-700 uppercase tracking-tighter">Claim your <span className="text-red-600 underline decoration-2">legendary gear</span>, champion!</p>
          </div>

          <div className="flex justify-center items-center gap-8 py-4">
             <div className="scale-150 transition-all duration-500">
                <Chest scale={1} isOpen={chestOpen} />
             </div>
             <div className="scale-[2.2] drop-shadow-2xl">
                <Knight armor={armor} />
             </div>
          </div>

          <div className={`transition-all duration-700 bg-[#d4c3ab] p-6 border-2 border-[#3d2b1f]/20 shadow-inner ${chestOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest">{armor.name}</h3>
            <p className="text-lg text-[#5d4037] italic mt-2 font-serif leading-relaxed">
              &quot;{armor.description}&quot;
            </p>
          </div>

          {!chestOpen ? (
            <button
              onClick={handleOpen}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-black py-4 px-8 border-b-8 border-red-900 active:translate-y-2 active:border-b-0 transition-all pixel-font text-sm shadow-lg"
            >
              REVEAL REWARD!
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full bg-green-700 hover:bg-green-600 text-white font-black py-4 px-8 border-b-8 border-green-900 active:translate-y-2 active:border-b-0 transition-all pixel-font text-sm shadow-lg"
            >
              CLAIM & CONTINUE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
