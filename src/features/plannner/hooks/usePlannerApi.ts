import { AxiosError } from 'axios';

import plannerApi, { IScheduleWorkoutData } from '../api/plannerApi';
import { handleApiError } from '../../../services/api';

export const usePlannerApi = () => {
  const scheduleWorkout = async (data: IScheduleWorkoutData) => {
    try {
      const response = await plannerApi.scheduleWorkout(data);
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return {
    scheduleWorkout,
  };
};
