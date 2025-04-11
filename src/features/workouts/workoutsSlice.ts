import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { IWorkout, IExercise } from './types/workouts.types';

interface WorkoutsSlice {
  workouts: IWorkout[];
  exercises: IExercise[];
}

const initialState: WorkoutsSlice = {
  workouts: [],
  exercises: [],
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    updateWorkouts(state, action) {
      state.workouts = action.payload;
    },
    updateExercises(state, action) {
      state.exercises = action.payload;
    },
  },
});

export const workouts = (state: RootState) => state.workouts;

export const { updateWorkouts, updateExercises } = workoutsSlice.actions;

export default workoutsSlice.reducer;
