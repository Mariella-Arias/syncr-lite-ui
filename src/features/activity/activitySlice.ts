import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { IActivityEntry } from './types/activity.types';

interface ActivitySlice {
  recentActivity: IActivityEntry[];
  activityHistory: IActivityEntry[];
}

const initialState: ActivitySlice = {
  recentActivity: [],
  activityHistory: [],
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    updateRecentActivity(state, action) {
      state.recentActivity = action.payload;
    },
    updateActivityHistory(state, action) {
      state.activityHistory = action.payload;
    },
  },
});

export const activity = (state: RootState) => state.activity;

export const { updateRecentActivity, updateActivityHistory } =
  activitySlice.actions;

export default activitySlice.reducer;
