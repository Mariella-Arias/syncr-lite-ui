import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { useWorkoutsApi } from './hooks/useWorkoutsApi';

const initialState = {
  workouts: [],
  exercises: [],
};

export const setWorkouts = createAsyncThunk('auth/setWorkouts', async () => {
  const { getWorkouts } = useWorkoutsApi();

  const response = await getWorkouts();
  return response;
});

export const setExercises = createAsyncThunk('auth/setExercises', async () => {
  const { getExercises } = useWorkoutsApi();

  const response = await getExercises();
  return response;
});

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
      })
      .addCase(setWorkouts.rejected, (state, action) => {
        console.log('Fetched workouts rejected');
      })
      .addCase(setExercises.fulfilled, (state, action) => {
        state.exercises = action.payload;
      })
      .addCase(setExercises.rejected, (state, action) => {
        console.log('Fetched exercises rejected');
      });
  },
});

export const workouts = (state: RootState) => state.workouts;

export default workoutsSlice.reducer;
