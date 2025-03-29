export interface IScheduleWorkoutData {
  name: string;
  date: string;
}

export interface IActivityEntry {
  completed: boolean;
  date_scheduled: string;
  id: number;
  user: number;
  workout: number;
}
