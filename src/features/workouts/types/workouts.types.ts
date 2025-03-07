export interface IExercise {
  id: number;
  is_editable: boolean;
  label: string;
  tracking_param: string;
  user: number;
  value: string;
}

export interface INewExerciseData {
  value: string;
  label: string;
  user?: number;
  tracking_param: string;
}

export interface INewExercise {
  name: string;
  parameter: string;
}

interface IExerciseData {
  exercise: number | string;
  fields: string[];
  data: {
    sets: number;
    reps?: number;
    duration?: number;
  };
}

interface IBlockData {
  exercises: IExerciseData[];
}

export interface IWorkoutData {
  name: string;
  blocks: IBlockData[];
}

export interface IWorkout {
  id: number;
  name: string;
  created_at: string;
  user: number;
}

export interface IScheduleWorkoutData {
  name: string;
  date: string;
}
