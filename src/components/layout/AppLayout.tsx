// External dependencies
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';

// App-level imports
import { AppDispatch } from '../../app/store';

// UI Components
import Navbar from './Navbar';
import SlideInModal from '../overlays/SlideInModal';
import CenteredModal from '../overlays/CenteredModal';

// Context Providers
import { ModalsProvider } from '../../context/ModalsProvider';

// Hooks
import { useActivityApi } from '../../features/activity/hooks/useActivityApi';
import { useWorkoutsApi } from '../../features/workouts/hooks/useWorkoutsApi';
import { useCalendarActivity } from '../../features/calendar/hooks/useCalendarActivity';

// Redux
import {
  updateRecentActivity,
  updateActivityHistory,
} from '../../features/activity/activitySlice';
import {
  updateWorkouts,
  updateExercises,
} from '../../features/workouts/workoutsSlice';

/**
 * AppLayout Component
 *
 * Main layout wrapper that:
 * 1. Initializes core application data (workouts, exercises, activities)
 * 2. Provides modal context for the entire application
 * 3. Renders the main layout structure with navbar and content area
 */
const AppLayout = () => {
  // INITIALIZATION
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // HOOKS
  const { getWorkouts, getExercises } = useWorkoutsApi();
  const { getRecentActivity, getActivityHistory } = useActivityApi();
  const { setSchedule } = useCalendarActivity();

  // REDUX
  const dispatch: AppDispatch = useDispatch();

  // Data initializtion functions
  const initializeWorkouts = async () => {
    const response = await getWorkouts();
    dispatch(updateWorkouts(response));
  };

  const initializeExercises = async () => {
    const response = await getExercises();
    dispatch(updateExercises(response));
  };

  const initializeRecentActivity = async () => {
    const response = await getRecentActivity();
    dispatch(updateRecentActivity(response));
  };

  const initializeActivityHistory = async () => {
    const response = await getActivityHistory();
    dispatch(updateActivityHistory(response));
  };

  // Initialize all application data on component mount
  useEffect(() => {
    initializeWorkouts();
    initializeExercises();
    initializeRecentActivity();
    initializeActivityHistory();

    // Fetch scheduled activity for calendar and store data in redux
    setSchedule();
  }, []);

  return (
    <ModalsProvider>
      <SlideInModal />
      <CenteredModal />
      <div className="w-screen h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </ModalsProvider>
  );
};

export default AppLayout;
