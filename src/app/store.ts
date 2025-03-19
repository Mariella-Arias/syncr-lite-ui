import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from '../features/auth/authSlice';
import WorkoutsReducer from '../features/workouts/workoutsSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    workouts: WorkoutsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = typeof store;
export type AppDispatch = typeof store.dispatch;
