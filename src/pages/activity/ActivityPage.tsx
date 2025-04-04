import { useEffect, useState } from 'react';

import { useActivityApi } from '../../features/activity/hooks/useActivityApi';
import { getCalendarDate } from '../../features/calendar/utils';
import { IActivityEntry } from '../../features/activity/types/activity.types';
import ActivityLog from '../../features/activity/components/ActivityLog';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-sky-450 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

const ActivityPage = () => {
  const [isFetching, setIsFetching] = useState(true);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { getActivityPeriod } = useActivityApi();

  const [log, setLog] = useState<IActivityEntry[]>([]);
  const [recentWorkoutCount, setRecentWorkoutCount] = useState(0);

  const firstDayOfMonth: Date = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const firstDayOfMonthStr: string = getCalendarDate(firstDayOfMonth);

  const fetchCurrentMonthActivity = async () => {
    setIsFetching(true);
    const response = await getActivityPeriod({
      start_date: firstDayOfMonthStr,
      end_date: getCalendarDate(today),
    });

    setLog(response);
    setIsFetching(false);
  };

  const fetchRecentActivity = async () => {
    setIsFetching(true);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const thirtyDaysAgoStr = getCalendarDate(thirtyDaysAgo);

    const response = await getActivityPeriod({
      start_date: thirtyDaysAgoStr,
      end_date: getCalendarDate(today),
    });

    setRecentWorkoutCount(response.length);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchCurrentMonthActivity();
    fetchRecentActivity();
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="p-2 md:px-45">
      {/* HEADER */}
      <div className="flex justify-center gap-2 my-6">
        {/* Last 30 Days */}
        <div className="border border-input-border rounded-[10px] px-8 py-6 max-w-50">
          <p className="font-nunito font-semibold text-body-text text-lg">
            Last 30 Days
          </p>
          <p className="font-nunito font-bold text-xl">
            {recentWorkoutCount} Workouts
          </p>
        </div>
        {/* Current Streak */}
        <div className="border border-input-border rounded-[10px] px-8 py-6 max-w-50">
          <p className="font-nunito font-semibold text-body-text text-lg">
            Current Streak
          </p>
          <p className="font-nunito font-bold text-xl">3 Workouts</p>
        </div>
      </div>

      <ActivityLog log={log} />

      <button className="border border-input-border rounded-[10px] p-3 font-nunito text-body-text font-semibold w-full cursor-pointer">
        Load More
      </button>
    </div>
  );
};

export default ActivityPage;
