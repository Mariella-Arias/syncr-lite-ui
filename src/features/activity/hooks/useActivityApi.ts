import { AxiosError } from 'axios';

import activityApi from '../api/activityApi';
import { handleApiError } from '../../../services/api';

export const useActivityApi = () => {
  const scheduleWorkout = async ({
    workout,
    date_scheduled,
  }: {
    workout: number;
    date_scheduled: string;
  }) => {
    try {
      const response = await activityApi.scheduleWorkout({
        workout,
        date_scheduled,
      });
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const getActivityPeriod = async ({
    start_date,
    end_date,
  }: {
    start_date: string;
    end_date: string;
  }) => {
    try {
      const response = await activityApi.getActivityPeriod({
        start_date,
        end_date,
      });
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const deleteActivity = async ({ id }: { id: number }) => {
    try {
      const response = await activityApi.deleteActivityById({
        id,
      });
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return {
    scheduleWorkout,
    getActivityPeriod,
    deleteActivity,
  };
};
