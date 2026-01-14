
export enum TaskFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly'
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  frequency: TaskFrequency;
  steps: number;
  lastCompletedDate?: string;
  createdAt: number;
}

export interface ArmorSet {
  name: string;
  tier: number; // Used as the 0-99 level index
  primary: string;
  secondary: string;
  accent: string;
  powerMultiplier: number;
  description: string;
}

export interface GameState {
  completedTaskCount: number;
  level: number;
  totalPower: number;
  knightName: string;
  storyHistory: string[];
  lastStoryStep: number;
}
