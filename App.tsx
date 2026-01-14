
import React, { useState, useEffect, useCallback } from 'react';
import GameMap from './components/GameMap';
import TaskList from './components/TaskList';
import RewardModal from './components/RewardModal';
import StoryOverlay from './components/StoryOverlay';
import LoreJournal from './components/LoreJournal';
import { Task, TaskFrequency, GameState } from './types';
import { ARMOR_SETS, TILES_PER_CHEST } from './constants';
import { getKnightFlavorText, getNextStoryFragment } from './services/geminiService';

const App: React.FC = () => {
  const TASKS_KEY = 'knight_quest_tasks_v3';
  const STATE_KEY = 'knight_quest_state_v3';

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(TASKS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STATE_KEY);
    return saved ? JSON.parse(saved) : {
      completedTaskCount: 0,
      level: 0,
      totalPower: 10,
      knightName: "Sir Productivity",
      storyHistory: [],
      lastStoryStep: 0
    };
  });

  const [flavorText, setFlavorText] = useState("The first page of your journal is blank...");
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentStoryFragment, setCurrentStoryFragment] = useState<string | null>(null);
  const [isLoreOpen, setIsLoreOpen] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    const today = new Date().toDateString();
    setTasks(prev => prev.map(t => {
      if (t.frequency === TaskFrequency.DAILY && t.lastCompletedDate !== today) {
        return { ...t, completed: false };
      }
      return t;
    }));
  }, []);

  const currentArmor = ARMOR_SETS[Math.min(gameState.level, ARMOR_SETS.length - 1)];

  const refreshFlavor = useCallback(async () => {
    const tasksRemaining = TILES_PER_CHEST - (gameState.completedTaskCount % TILES_PER_CHEST);
    const text = await getKnightFlavorText(currentArmor, gameState.totalPower, tasksRemaining);
    setFlavorText(text);
  }, [currentArmor, gameState.totalPower, gameState.completedTaskCount]);

  useEffect(() => {
    refreshFlavor();
  }, [gameState.level, refreshFlavor]);

  const triggerStory = async (newTotalSteps: number) => {
    // Trigger every 4 steps
    const storyCount = Math.floor(newTotalSteps / 4);
    const previousStoryCount = Math.floor(gameState.lastStoryStep / 4);

    if (storyCount > previousStoryCount && !isGeneratingStory) {
      setIsGeneratingStory(true);
      const fragment = await getNextStoryFragment(gameState.storyHistory, gameState.level);
      setCurrentStoryFragment(fragment);
      setGameState(prev => ({
        ...prev,
        storyHistory: [...prev.storyHistory, fragment],
        lastStoryStep: newTotalSteps
      }));
      setIsGeneratingStory(false);
    }
  };

  const addTask = (title: string, frequency: TaskFrequency, steps: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      frequency,
      steps,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = async (id: string) => {
    const taskToToggle = tasks.find(t => t.id === id);
    if (!taskToToggle) return;

    const isNowCompleted = !taskToToggle.completed;
    
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { 
          ...t, 
          completed: isNowCompleted, 
          lastCompletedDate: isNowCompleted ? new Date().toDateString() : t.lastCompletedDate 
        };
      }
      return t;
    }));

    if (isNowCompleted) {
      const addedSteps = taskToToggle.steps;
      const newCount = gameState.completedTaskCount + addedSteps;
      const newLevel = Math.floor(newCount / TILES_PER_CHEST);
      const newPower = gameState.totalPower + (20 * currentArmor.powerMultiplier * addedSteps);
      
      const leveledUp = newLevel > gameState.level && newLevel < ARMOR_SETS.length;
      
      if (leveledUp) {
         setShowRewardModal(true);
      }

      setGameState(gs => ({
        ...gs,
        completedTaskCount: newCount,
        level: Math.min(newLevel, ARMOR_SETS.length - 1),
        totalPower: newPower
      }));

      // Trigger story logic
      await triggerStory(newCount);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e3d5c1] flex justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 pb-20">
        
        <div className="relative shadow-[0_0_50px_rgba(0,0,0,1)] border-8 border-[#3d2b1f] overflow-hidden">
          <GameMap 
            armor={currentArmor} 
            gameState={gameState} 
            flavorText={flavorText} 
          />
          {isGeneratingStory && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-[100] backdrop-blur-[2px]">
              <div className="pixel-font text-[10px] text-white animate-pulse">Etching History...</div>
            </div>
          )}
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="pixel-font text-xl text-yellow-600 drop-shadow-lg tracking-widest uppercase">
              Quest Journal
            </h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsLoreOpen(true)}
                className="bg-[#3d2b1f] hover:bg-[#5d4037] text-white px-3 py-1.5 border-2 border-black pixel-font text-[8px] flex items-center gap-2 transition-all shadow-[2px_2px_0_0_#000]"
              >
                <span>📜</span> CHRONICLE
              </button>
              <div className="pixel-font text-[10px] text-gray-500">
                {tasks.filter(t => t.completed).length}/{tasks.length} CLEAR
              </div>
            </div>
          </div>
          
          <TaskList 
            tasks={tasks} 
            onAddTask={addTask} 
            onToggleTask={toggleTask} 
            onDeleteTask={deleteTask} 
          />
        </section>

        {showRewardModal && (
          <RewardModal 
            level={gameState.level}
            armor={currentArmor}
            onClose={() => setShowRewardModal(false)}
          />
        )}

        {currentStoryFragment && (
          <StoryOverlay 
            fragment={currentStoryFragment} 
            onClose={() => setCurrentStoryFragment(null)} 
          />
        )}

        {isLoreOpen && (
          <LoreJournal 
            history={gameState.storyHistory} 
            onClose={() => setIsLoreOpen(false)} 
          />
        )}

        <footer className="text-center text-gray-700 text-xs py-10 pixel-font opacity-50">
          POWERED BY PRODUCTIVITY & PIXELS
        </footer>
      </div>
    </div>
  );
};

export default App;
