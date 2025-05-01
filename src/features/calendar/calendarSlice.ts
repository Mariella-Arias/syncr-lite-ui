import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { IActivityEntry } from '../activity/types/activity.types';

/**
 * Calendar State Interface
 *
 * Defines the structure of the calendar slice in the Redux store
 */
interface IInitialState {
  scheduledWorkouts: IActivityEntry[];
}

/**
 * Initial state for the calendar slice
 *
 * Sets default values for the calendar state properties
 */
const initialState: IInitialState = {
  scheduledWorkouts: [],
};

/**
 * Calendar Redux Slice
 *
 * Defines the state management for calendar-related data:
 * - State initialization
 * - Actions and reducers for modifying calendar state
 */
const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    /**
     * Sets the scheduled workouts in the calendar
     *
     * @param state Current calendar state
     * @param action Action with payload containing the new scheduled workouts
     */
    setScheduledWorkouts: (state, action) => {
      state.scheduledWorkouts = action.payload;
    },
  },
});

/**
 * Calendar Selector
 *
 * Returns the calendar slice from the Redux store
 *
 * @param state The root Redux state
 * @returns The calendar state
 */
export const calendar = (state: RootState) => state.calendar;

// Export actions for use in components
export const { setScheduledWorkouts } = calendarSlice.actions;

// Export the reducer to be included in the Redux store
export default calendarSlice.reducer;
