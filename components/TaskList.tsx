
import React, { useState } from 'react';
import { Task, TaskFrequency } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (title: string, frequency: TaskFrequency, steps: number) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newFrequency, setNewFrequency] = useState<TaskFrequency>(TaskFrequency.ONCE);
  const [steps, setSteps] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle, newFrequency, steps);
    setNewTitle('');
    setSteps(1);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="panel-stone p-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter a new quest..."
            className="flex-1 bg-[#1a1a1a] border-2 border-[#444] rounded-none px-4 py-2 text-white focus:outline-none focus:border-[#f4a460] transition-colors"
          />
          <div className="flex gap-2">
             <div className="flex flex-col">
                <label className="text-[9px] pixel-font text-gray-500 mb-1">FREQ</label>
                <select
                  value={newFrequency}
                  onChange={(e) => setNewFrequency(e.target.value as TaskFrequency)}
                  className="bg-[#1a1a1a] border-2 border-[#444] text-white px-2 py-2 outline-none text-sm"
                >
                  <option value={TaskFrequency.ONCE}>Once</option>
                  <option value={TaskFrequency.DAILY}>Daily</option>
                  <option value={TaskFrequency.WEEKLY}>Weekly</option>
                </select>
             </div>
             <div className="flex flex-col w-20">
                <label className="text-[9px] pixel-font text-gray-500 mb-1">STEPS</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={steps}
                  onChange={(e) => setSteps(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-[#1a1a1a] border-2 border-[#444] text-white px-2 py-2 outline-none text-sm"
                />
             </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#3d2b1f] hover:bg-[#5d4037] text-yellow-500 font-bold px-6 py-3 border-2 border-black pixel-font text-[10px] whitespace-nowrap shadow-[4px_4px_0_0_#000]"
        >
          ENLIST QUEST
        </button>
      </form>

      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-600 italic text-xl">
            No active quests. Speak to the town clerk!
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`relative flex items-center justify-between p-5 border-2 transition-all ${
                task.completed 
                  ? 'bg-[#1a1a1a] border-black opacity-50 grayscale' 
                  : 'bg-[#2a2a2a] border-[#3d2b1f] hover:border-yellow-900 shadow-lg'
              }`}
            >
              <div className="absolute top-1 left-1 w-2 h-2 bg-[#444]"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#444]"></div>

              <div className="flex items-center gap-5 z-10">
                <div className="relative">
                    <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                    className="w-8 h-8 opacity-0 absolute cursor-pointer z-20"
                    />
                    <div className={`w-8 h-8 border-4 border-black flex items-center justify-center transition-colors ${task.completed ? 'bg-green-800' : 'bg-[#1a1a1a]'}`}>
                        {task.completed && <span className="text-white text-xl">✓</span>}
                    </div>
                </div>
                
                <div>
                  <h3 className={`text-lg font-bold tracking-wide ${task.completed ? 'line-through text-gray-600' : 'text-[#e3d5c1]'}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] pixel-font text-yellow-600 opacity-80 uppercase">[{task.frequency}]</span>
                    <span className="px-1.5 py-0.5 bg-blue-900/40 border border-blue-700 text-[8px] pixel-font text-blue-300">
                      {task.steps} STEPS
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-red-900 hover:text-red-600 p-2 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
