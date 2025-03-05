import { AxiosError } from 'axios';

import workoutsApi from '../api/workoutsApi';
import { handleApiError } from '../../../services/api';
import { IWorkoutData } from '../components/CreateWorkoutForm';
import { INewExerciseData } from '../components/CreateExerciseForm';

export const useWorkoutsApi = () => {
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
  return { createExercise, getExercises, createWorkout, deleteExercise };
};
