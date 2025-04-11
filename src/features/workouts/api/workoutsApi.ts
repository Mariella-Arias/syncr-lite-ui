import api from '../../../services/api';
import { INewExerciseData, IWorkoutData } from '../types/workouts.types';

const workoutsApi = {
  createExercise: async (data: INewExerciseData) => {
    const response = await api.post('workouts/exercises/', data);
    return response;
  },

  getExercises: async () => {
    const response = await api.get('workouts/exercises/');
    return response;
  },

  deleteExercise: async (id: number) => {
    const response = await api.delete(`workouts/exercises/${id}/`);
    return response;
  },

  createWorkout: async (data: IWorkoutData) => {
    const response = await api.post('workouts/', data);
    return response;
  },

  getWorkouts: async () => {
    const response = await api.get('workouts/');
    return response;
  },

  getWorkout: async (id: number) => {
    const response = await api.get(`workouts/${id}`);
    return response;
  },

  deleteWorkout: async (id: number) => {
    const response = await api.delete(`workouts/${id}/`);
    return response;
  },

  updateWorkout: async (id: number) => {
    const response = await api.put(`workouts/${id}/`);
    return response;
  },
};

export default workoutsApi;
