// External Dependencies
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// UI Components
import ActivityLog from '../../features/activity/components/ActivityLog';

// Redux
import { activity } from '../../features/activity/activitySlice';

// API Hooks
import { useActivityApi } from '../../features/activity/hooks/useActivityApi';

// Utils
import { getCalendarDate } from '../../features/calendar/utils';

/**
 * Loader Component
 *
 * Displays a spinner while content is loading
 */
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-sky-450 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

/**
 * ActivityPage Component
 *
 * Main page for viewing workout activity history with:
 * 1. Summary of recent activity (last 30 days)
 * 2. Complete activity history organized by month
 */
const ActivityPage = () => {
  // LOCAL STATE
  const [isFetching, setIsFetching] = useState(true);
  const [recentWorkoutCount, setRecentWorkoutCount] = useState(0);

  // DATA INITIALIZATION
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // API HOOKS
  const { getActivityPeriod } = useActivityApi();

  // REDUX
  const { activityHistory } = useSelector(activity);

  /**
   * Fetches activity data for the last 30 days
   * Updates the recent workout count and loading state
   */
  const fetchRecentActivity = async () => {
    setIsFetching(true);

    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = getCalendarDate(thirtyDaysAgo);

    // Fetch activity between 30 days ago and today
    const response = await getActivityPeriod({
      start_date: thirtyDaysAgoStr,
      end_date: getCalendarDate(today),
    });

    setRecentWorkoutCount(response.length);
    setIsFetching(false);
  };

  // Fetch recent activity on component mount
  useEffect(() => {
    fetchRecentActivity();
  }, []);

  // Show loader while fetching data
  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="p-6 md:px-45 h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-4">
        <p className="font-nunito font-bold text-2xl">Activity History</p>
        <p className="font-nunito text-body-text text-lg">
          Track your workout progress and completion over time
        </p>
      </div>

      {/* 30-day Activity Summary */}
      <div className="border border-input-border rounded-[10px] px-8 py-6 w-full mb-6">
        <p className="font-nunito font-semibold text-body-text text-lg">
          Last 30 Days
        </p>
        <p className="font-nunito font-bold text-xl">
          {recentWorkoutCount} Workouts
        </p>
      </div>

      {/* Complete Activity History */}
      <div className="flex-1 h-full overflow-y-auto no-scrollbar">
        <ActivityLog log={activityHistory} />
      </div>
    </div>
  );
};

export default ActivityPage;
