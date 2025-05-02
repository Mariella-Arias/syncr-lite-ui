// API Core Client
import api from '../../../services/api';

// Utils
import { getCalendarDate } from '../../calendar/utils';

/**
 * Activity API client object
 *
 * Contains methods for all workout activity related API operations
 */
const activityApi = {
  /**
   * Schedule a new workout activity
   *
   * @param data - Workout scheduling data (workout ID, date, etc.)
   * @returns API response with created activity
   */
  scheduleWorkout: async (data: Record<string, string | number>) => {
    const response = await api.post('workouts/activity/', data);
    return response;
  },

  /**
   * Fetch all activity entries without filtering
   *
   * @returns API response with all activity entries
   */
  getAllActivity: async () => {
    const response = await api.get('workouts/activity/');
    return response;
  },

  /**
   * Fetch historical activity (all activities before today)
   *
   * Sets today's date as the end date and leaves start date empty
   * to retrieve all past activities
   *
   * @returns API response with historical activity entries
   */
  getActivityHistory: async () => {
    // Create today's date with time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Format request with today as end_date parameter
    const response = await api.get(
      `workouts/activity/?type=period&end_date=${getCalendarDate(today)}`
    );
    return response;
  },

  /**
   * Fetch recent activity (today's and upcoming activities)
   *
   * Uses a server-side filter for recent activities
   *
   * @returns API response with recent activity entries
   */
  getRecentActivity: async () => {
    const response = await api.get('workouts/activity/?type=recent');
    return response;
  },

  /**
   * Fetch activities within a specific date range
   *
   * @param options - Date range options
   * @param options.start_date - Start date in YYYY-MM-DD format
   * @param options.end_date - End date in YYYY-MM-DD format
   * @returns API response with activities in the specified period
   */
  getActivityPeriod: async ({
    start_date = '',
    end_date = '',
  }: {
    start_date: string | undefined;
    end_date: string | undefined;
  }) => {
    const response = await api.get(
      `workouts/activity/?type=period&start_date=${start_date}&end_date=${end_date}`
    );
    return response;
  },

  /**
   * Delete an activity by ID
   *
   * @param params - Parameters object
   * @param params.id - ID of the activity to delete
   * @returns API response from deletion operation
   */
  deleteActivityById: async ({ id }: { id: number }) => {
    const response = await api.delete(`workouts/activity/${id}/`);
    return response;
  },

  /**
   * Update an existing activity
   *
   * @param params - Parameters object
   * @param params.id - ID of the activity to update
   * @param params.data - Updated activity data
   * @returns API response with updated activity
   */
  updateActivity: async ({
    id,
    data,
  }: {
    id: number;
    data: Record<string, any>;
  }) => {
    const response = await api.patch(`workouts/activity/${id}/`, data);
    return response;
  },
};

export default activityApi;
