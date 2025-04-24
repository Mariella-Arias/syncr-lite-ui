// Services
import activityApi from '../api/activityApi';
import { handleApiError } from '../../../services/api';

// Types
import { AxiosError } from 'axios';

/**
 * Activity API Hook
 *
 * Provides methods for managing and retrieving activity entries:
 * - Schedule activity entries
 * - Retrieve activity data
 * - Delete and update activity entries
 *
 * Implements consistent error handling for API requests
 */
export const useActivityApi = () => {
  /**
   * Schedule a workout for a specific date
   * @param workout Workout ID to schedule
   * @param date_scheduled Date for scheduling the workout
   */
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

  /**
   * Retrieve all user activity
   */
  const getAllActivity = async () => {
    try {
      const response = await activityApi.getAllActivity();
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Retrieve user's activity history
   */

  const getActivityHistory = async () => {
    try {
      const response = await activityApi.getActivityHistory();
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Retrieve user's most recent activities
   */
  const getRecentActivity = async () => {
    try {
      const response = await activityApi.getRecentActivity();
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Retrieve activities within a specific date range
   * @param start_date Beginning of the activity period
   * @param end_date End of the activity period
   */
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

  /**
   * Delete a specific activity by its ID
   * @param id Activity identifier to delete
   */
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

  /**
   * Update an existing activity
   * @param id Activity identifier to update
   * @param data Updated activity information
   */
  const updateActivity = async ({
    id,
    data,
  }: {
    id: number;
    data: Record<string, boolean | string | number>;
  }) => {
    try {
      const response = await activityApi.updateActivity({
        id,
        data,
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
    getRecentActivity,
    getActivityPeriod,
    deleteActivity,
    getAllActivity,
    updateActivity,
    getActivityHistory,
  };
};
