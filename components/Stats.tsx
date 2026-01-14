
import React from 'react';
import { ArmorSet, GameState } from '../types';

interface StatsProps {
  armor: ArmorSet;
  gameState: GameState;
  flavorText: string;
}

const Stats: React.FC<StatsProps> = ({ armor, gameState, flavorText }) => {
  const nextPower = (gameState.level + 1) * 100 * (armor.powerMultiplier * 1.5);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-inner border-2 border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="pixel-font text-yellow-400 text-lg mb-1">{gameState.knightName}</h2>
          <p className="text-gray-400 text-sm">Equipped: <span className="text-blue-300 font-bold">{armor.name}</span></p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold text-red-500 flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase pixel-font">Power</span>
            {Math.floor(gameState.totalPower)}
          </div>
          <div className="w-full md:w-48 bg-gray-900 h-2 rounded-full overflow-hidden mt-1">
            <div 
              className="bg-yellow-500 h-full transition-all duration-1000" 
              style={{ width: `${(gameState.totalPower / nextPower) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-2 bg-gray-900 rounded border border-gray-700 italic text-center text-green-400 min-h-[40px] flex items-center justify-center">
        &quot;{flavorText}&quot;
      </div>
    </div>
  );
};

export default Stats;
