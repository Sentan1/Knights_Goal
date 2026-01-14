
import React from 'react';

interface StoryOverlayProps {
  fragment: string;
  onClose: () => void;
}

const StoryOverlay: React.FC<StoryOverlayProps> = ({ fragment, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-in fade-in duration-700">
      <div className="relative max-w-lg w-full bg-[#f4e4bc] p-12 shadow-[0_0_120px_rgba(0,0,0,1)] border-[16px] border-[#3d2b1f] rotate-[-0.5deg]">
        {/* Paper texture effect */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        
        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#8b4513] opacity-30"></div>
        <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#8b4513] opacity-30"></div>
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#8b4513] opacity-30"></div>
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#8b4513] opacity-30"></div>

        <div className="relative z-10 space-y-8 text-center">
          <div className="flex flex-col items-center gap-2 mb-2">
             <div className="pixel-font text-[9px] text-[#5d4037] uppercase tracking-[6px] opacity-40">Unveiled Memory</div>
             <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8b4513]/40 to-transparent"></div>
          </div>
          
          <div className="relative">
            <span className="absolute -left-2 -top-4 text-7xl font-serif text-[#8b4513]/10 italic">"</span>
            <p className="text-2xl font-serif text-[#2c1e16] leading-relaxed italic first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-[#8b4513] animate-in fade-in duration-1000 slide-in-from-top-2">
              {fragment}
            </p>
            <span className="absolute -right-2 -bottom-4 text-7xl font-serif text-[#8b4513]/10 italic rotate-180">"</span>
          </div>
          
          <div className="pt-10">
            <button 
              onClick={onClose}
              className="px-10 py-4 bg-[#3d2b1f] text-[#f4e4bc] pixel-font text-[10px] hover:bg-[#5d4037] transition-all border-4 border-black shadow-[6px_6px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-widest"
            >
              Commit to Chronicle
            </button>
          </div>
        </div>
        
        {/* Page fold effect */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#d4c3ab]/40 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StoryOverlay;
