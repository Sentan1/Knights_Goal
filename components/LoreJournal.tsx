
import React from 'react';

interface LoreJournalProps {
  history: string[];
  onClose: () => void;
}

const LoreJournal: React.FC<LoreJournalProps> = ({ history, onClose }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative max-w-2xl w-full h-[80vh] bg-[#f4e4bc] border-[12px] border-[#3d2b1f] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
        {/* Paper texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        
        {/* Header */}
        <div className="relative z-10 p-6 border-b-2 border-[#8b4513]/20 flex justify-between items-center bg-[#ecd9a9]">
          <h2 className="pixel-font text-lg text-[#5d4037] uppercase tracking-widest">The Great Chronicle</h2>
          <button 
            onClick={onClose}
            className="text-[#8b4513] hover:text-[#5d4037] text-2xl font-bold p-2"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar scroll-smooth">
          {history.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#8b4513]/40 italic text-xl font-serif">The pages are blank... your journey has yet to be written.</p>
            </div>
          ) : (
            history.map((fragment, idx) => (
              <div key={idx} className="relative animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute -left-6 top-0 text-[#8b4513]/20 font-serif text-4xl opacity-50">§</div>
                <p className="text-xl font-serif text-[#2c1e16] leading-relaxed italic first-letter:text-4xl first-letter:font-bold first-letter:text-[#8b4513] pl-2">
                  {fragment}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-[1px] flex-1 bg-[#8b4513]/10"></div>
                  <span className="pixel-font text-[8px] text-[#8b4513]/30 uppercase">Entry {idx + 1}</span>
                  <div className="h-[1px] flex-1 bg-[#8b4513]/10"></div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 p-6 bg-[#ecd9a9] border-t-2 border-[#8b4513]/20 text-center">
          <p className="pixel-font text-[9px] text-[#5d4037] opacity-60">Seek the remaining truths through toil and triumph.</p>
        </div>
      </div>
    </div>
  );
};

export default LoreJournal;
