import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { IActivityEntry } from '../activity/types/activity.types';

interface IInitialState {
  scheduledWorkouts: IActivityEntry[];
}

const initialState: IInitialState = {
  scheduledWorkouts: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setScheduledWorkouts: (state, action) => {
      state.scheduledWorkouts = action.payload;
    },
  },
});

export const calendar = (state: RootState) => state.calendar;

export const { setScheduledWorkouts } = calendarSlice.actions;

export default calendarSlice.reducer;
