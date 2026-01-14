
import React from 'react';

interface StoryOverlayProps {
  fragment: string;
  onClose: () => void;
}

const StoryOverlay: React.FC<StoryOverlayProps> = ({ fragment, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in duration-500">
      <div className="relative max-w-lg w-full bg-[#f4e4bc] p-10 shadow-[0_0_100px_rgba(0,0,0,0.9)] border-[12px] border-[#3d2b1f] rotate-[-1deg]">
        {/* Paper texture effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        
        {/* Corner Ornaments */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#8b4513] opacity-40"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#8b4513] opacity-40"></div>

        <div className="relative z-10 space-y-6 text-center">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-1 bg-[#8b4513]/30"></div>
          </div>
          
          <h4 className="pixel-font text-[10px] text-[#5d4037] uppercase tracking-[4px] opacity-60">Chronicle Fragment</h4>
          
          <p className="text-2xl font-serif text-[#2c1e16] leading-relaxed italic first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-[#8b4513]">
            {fragment}
          </p>
          
          <div className="pt-8">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-[#3d2b1f] text-[#f4e4bc] pixel-font text-[10px] hover:bg-[#5d4037] transition-all border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              COMMIT TO MEMORY
            </button>
          </div>
        </div>
        
        {/* Page fold effect */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#d4c3ab] to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StoryOverlay;
