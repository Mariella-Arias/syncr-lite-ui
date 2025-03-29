import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from '../features/auth/authSlice';
import WorkoutsReducer from '../features/workouts/workoutsSlice';
import CalendarReducer from '../features/calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    workouts: WorkoutsReducer,
    calendar: CalendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = typeof store;
export type AppDispatch = typeof store.dispatch;
