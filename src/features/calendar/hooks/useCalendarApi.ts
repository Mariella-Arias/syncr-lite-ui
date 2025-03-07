import { AxiosError } from 'axios';

import calendarApi, { IScheduleWorkoutData } from '../api/calendarApi';
import { handleApiError } from '../../../services/api';

export const useCalendarApi = () => {
  const scheduleWorkout = async (data: IScheduleWorkoutData) => {
    try {
      const response = await calendarApi.scheduleWorkout(data);
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
