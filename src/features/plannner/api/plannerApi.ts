import api from '../../../services/api';

export interface IScheduleWorkoutData {
  workout: number;
  date_scheduled: string;
}

const plannerApi = {
  scheduleWorkout: async (data: IScheduleWorkoutData) => {
    const response = await api.post('workouts/activity/', data);
    return response;
  },
};

export default plannerApi;
