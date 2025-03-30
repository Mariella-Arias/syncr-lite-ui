import api from '../../../services/api';

const activityApi = {
  scheduleWorkout: async (data: Record<string, string | number>) => {
    const response = await api.post('workouts/activity/', data);
    return response;
  },

  getAllActivity: async () => {
    const response = await api.get('workouts/activity/');
    return response;
  },

  getRecentActivity: async () => {
    const response = await api.get('workouts/activity/?type=recent');

    return response;
  },

  getActivityPeriod: async ({
    start_date = '',
    end_date = '',
  }: {
    start_date: string | undefined;
    end_date: string | undefined;
  }) => {
    const response = await api.get(
      `workouts/activity/?type=period?start_date=${start_date}&end_date=${end_date}`
    );

    return response;
  },

  deleteActivityById: async ({ id }: { id: number }) => {
    const response = await api.delete(`workouts/activity/${id}/`);
    return response;
  },
};

export default activityApi;
