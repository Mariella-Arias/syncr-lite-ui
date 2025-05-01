// External Dependencies
import { AxiosError } from 'axios';

// Services
import workoutsApi from '../api/workoutsApi';
import { handleApiError } from '../../../services/api';

// Types
import { IWorkoutData, INewExerciseData } from '../types/workouts.types';

/**
 * useWorkoutsApi Hook
 *
 * Custom hook that provides workout and exercise API operations with
 * error handling and response processing.
 *
 * @returns Object containing all workout and exercise methods
 */
export const useWorkoutsApi = () => {
  /**
   * Create Exercise
   *
   * Creates a new exercise in the database
   *
   * @param data - New exercise data (name, description, etc.)
   * @returns API response from exercise creation
   * @throws Processed API error with user-friendly message
   */
  const createExercise = async (data: INewExerciseData) => {
    try {
      const response = await workoutsApi.createExercise(data);
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Get Exercises
   *
   * Retrieves all exercises for the current user
   *
   * @returns List of exercises from the API
   * @throws Processed API error with user-friendly message
   */
  const getExercises = async () => {
    try {
      const response = await workoutsApi.getExercises();
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Delete Exercise
   *
   * Removes an exercise from the database by ID
   *
   * @param id - Exercise ID to delete
   * @returns API response from exercise deletion
   * @throws Processed API error with user-friendly message
   */
  const deleteExercise = async ({ id }: { id: number }) => {
    try {
      const response = await workoutsApi.deleteExercise(id);
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Create Workout
   *
   * Creates a new workout plan in the database
   *
   * @param data - Workout data including exercises, sets, etc.
   * @returns API response from workout creation
   * @throws Processed API error with user-friendly message
   */
  const createWorkout = async (data: IWorkoutData) => {
    try {
      const response = await workoutsApi.createWorkout(data);
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Get Workouts
   *
   * Retrieves all workouts for the current user
   *
   * @returns List of workouts from the API
   * @throws Processed API error with user-friendly message
   */
  const getWorkouts = async () => {
    try {
      const response = await workoutsApi.getWorkouts();
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Get Workout
   *
   * Retrieves a single workout by ID
   *
   * @param id - Workout ID to retrieve
   * @returns Detailed workout data from the API
   * @throws Processed API error with user-friendly message
   */
  const getWorkout = async ({ id }: { id: number }) => {
    try {
      const response = await workoutsApi.getWorkout(id);
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Delete Workout
   *
   * Removes a workout from the database by ID
   *
   * @param id - Workout ID to delete
   * @returns API response from workout deletion
   * @throws Processed API error with user-friendly message
   */
  const deleteWorkout = async ({ id }: { id: number }) => {
    try {
      const response = await workoutsApi.deleteWorkout(id);

      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return {
    createExercise,
    getExercises,
    createWorkout,
    getWorkouts,
    deleteExercise,
    getWorkout,
    deleteWorkout,
  };
};
