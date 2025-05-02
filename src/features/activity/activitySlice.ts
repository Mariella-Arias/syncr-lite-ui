// External Dependencies
import { createSlice } from '@reduxjs/toolkit';

// Redux Store Configuration
import { RootState } from '../../app/store';

// Types
import { IActivityEntry } from './types/activity.types';

/**
 * Activity State Interface
 *
 * Defines the structure of the activity slice in the Redux store
 */
interface ActivitySlice {
  recentActivity: IActivityEntry[];
  activityHistory: IActivityEntry[];
}

/**
 * Initial state for the activity slice
 *
 * Sets default empty collections for activity records
 */
const initialState: ActivitySlice = {
  recentActivity: [],
  activityHistory: [],
};

/**
 * Activity Redux Slice
 *
 * Defines the state management for activity-related data:
 * - State initialization
 * - Actions and reducers for modifying activity state
 */
const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    /**
     * Updates the recent activity collection
     *
     * @param state Current activity state
     * @param action Action with payload containing the new recent activities
     */
    updateRecentActivity(state, action) {
      state.recentActivity = action.payload;
    },

    /**
     * Updates the activity history collection
     *
     * @param state Current activity state
     * @param action Action with payload containing the new activity history
     */
    updateActivityHistory(state, action) {
      state.activityHistory = action.payload;
    },
  },
});

/**
 * Activity Selector
 *
 * Returns the activity slice from the Redux store
 *
 * @param state The root Redux state
 * @returns The activity state
 */
export const activity = (state: RootState) => state.activity;

// Export actions for use in components
export const { updateRecentActivity, updateActivityHistory } =
  activitySlice.actions;

// Export the reducer to be included in the Redux store
export default activitySlice.reducer;
