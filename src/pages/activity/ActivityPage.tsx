import { useEffect, useState } from 'react';

import { useActivityApi } from '../../features/activity/hooks/useActivityApi';
import { getCalendarDate } from '../../features/calendar/utils';
import { IActivityEntry } from '../../features/activity/types/activity.types';
import ActivityLog from '../../features/activity/components/ActivityLog';

const ActivityPage = () => {
  const today = new Date();

  const { getActivityPeriod } = useActivityApi();

  const [log, setLog] = useState<IActivityEntry[]>([]);

  const firstDayOfMonth: Date = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const firstDayOfMonthStr: string = getCalendarDate(firstDayOfMonth);

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await getActivityPeriod({
        start_date: firstDayOfMonthStr,
        end_date: getCalendarDate(today),
      });

      setLog(response);
    };

    fetchActivity();
  }, []);

  return (
    <div className="p-2 md:px-45">
      {/* HEADER */}
      <div className="flex justify-center gap-2 my-6">
        <div className="border border-input-border rounded-[10px] px-8 py-6 max-w-50">
          <p className="font-nunito font-semibold text-body-text text-lg">
            Last 30 Days
          </p>
          <p className="font-nunito font-bold text-xl">24 Workouts</p>
        </div>
        <div className="border border-input-border rounded-[10px] px-8 py-6 max-w-50">
          <p className="font-nunito font-semibold text-body-text text-lg">
            Current Streak
          </p>
          <p className="font-nunito font-bold text-xl">3 Workouts</p>
        </div>
      </div>

      <div className="flex justify-between my-2">
        <p className="font-nunito font-semibold text-base text-body-text">
          Month 2000
        </p>
        <p className="font-nunito font-semibold text-base text-body-text">
          7/10 completed
        </p>
      </div>

      <ActivityLog log={log} />

      <div className="flex justify-between my-2">
        <p className="font-nunito font-semibold text-base text-body-text">
          January 2024
        </p>
        <p className="font-nunito font-semibold text-base text-body-text">
          7/10 completed
        </p>
      </div>

      <button className="border border-input-border rounded-[10px] p-3 font-nunito text-body-text font-semibold w-full cursor-pointer">
        Load More
      </button>
    </div>
  );
};

export default ActivityPage;
