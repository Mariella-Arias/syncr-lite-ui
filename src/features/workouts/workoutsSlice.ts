// External Dependencies
import { createSlice } from '@reduxjs/toolkit';

// Redux Store Configuration
import { RootState } from '../../app/store';

// Types
import { IWorkout, IExercise } from './types/workouts.types';

/**
 * Workouts State Interface
 *
 * Defines the structure of the workouts slice in the Redux store
 */
interface WorkoutsSlice {
  workouts: IWorkout[];
  exercises: IExercise[];
}

/**
 * Initial state for the workouts slice
 *
 * Sets default empty collections for workouts and exercises
 */
const initialState: WorkoutsSlice = {
  workouts: [],
  exercises: [],
};

/**
 * Workouts Redux Slice
 *
 * Defines the state management for workout-related data:
 * - State initialization
 * - Actions and reducers for modifying workout state
 */
const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    /**
     * Updates the collection of workouts
     *
     * @param state Current workouts state
     * @param action Action with payload containing the new workouts array
     */
    updateWorkouts(state, action) {
      state.workouts = action.payload;
    },

    /**
     * Updates the collection of exercises
     *
     * @param state Current workouts state
     * @param action Action with payload containing the new exercises array
     */
    updateExercises(state, action) {
      state.exercises = action.payload;
    },
  },
});

export const workouts = (state: RootState) => state.workouts;

export const { updateWorkouts, updateExercises } = workoutsSlice.actions;

export default workoutsSlice.reducer;
