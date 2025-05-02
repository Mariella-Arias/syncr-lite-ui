// API Core Client
import api from '../../../services/api';

// Types
import { INewExerciseData, IWorkoutData } from '../types/workouts.types';

/**
 * Workouts API client object
 *
 * Contains methods for all workout and exercise related API operations
 */
const workoutsApi = {
  /**
   * Create a new exercise
   *
   * @param data - Exercise data to create
   * @returns API response with created exercise
   */
  createExercise: async (data: INewExerciseData) => {
    const response = await api.post('workouts/exercises/', data);
    return response;
  },

  /**
   * Fetch all exercises for the current user
   *
   * @returns API response with exercises collection
   */
  getExercises: async () => {
    const response = await api.get('workouts/exercises/');
    return response;
  },

  /**
   * Delete an exercise by ID
   *
   * @param id - ID of the exercise to delete
   * @returns API response from deletion operation
   */
  deleteExercise: async (id: number) => {
    const response = await api.delete(`workouts/exercises/${id}/`);
    return response;
  },

  /**
   * Create a new workout
   *
   * @param data - Workout data to create
   * @returns API response with created workout
   */
  createWorkout: async (data: IWorkoutData) => {
    const response = await api.post('workouts/', data);
    return response;
  },

  /**
   * Fetch all workouts for the current user
   *
   * @returns API response with workouts collection
   */
  getWorkouts: async () => {
    const response = await api.get('workouts/');
    return response;
  },

  /**
   * Fetch a single workout by ID
   *
   * @param id - ID of the workout to fetch
   * @returns API response with workout details
   */
  getWorkout: async (id: number) => {
    const response = await api.get(`workouts/${id}`);
    return response;
  },

  /**
   * Delete a workout by ID
   *
   * @param id - ID of the workout to delete
   * @returns API response from deletion operation
   */
  deleteWorkout: async (id: number) => {
    const response = await api.delete(`workouts/${id}/`);
    return response;
  },

  /**
   * Update a workout by ID
   *
   * @param id - ID of the workout to update
   * @returns API response with updated workout
   */
  updateWorkout: async (id: number) => {
    const response = await api.put(`workouts/${id}/`);
    return response;
  },
};

export default workoutsApi;
