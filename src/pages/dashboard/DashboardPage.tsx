import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router';

import Button from '../../components/common/Button';
import CreateWorkoutModal from '../../features/workouts/components/CreateWorkoutModal';
import { useSlideInModalContext } from '../../context/ModalsContext';
import ScheduleWorkoutModal from '../../features/calendar/components/ScheduleWorkoutModal';
import WorkoutCard from '../../features/workouts/components/WorkoutCard';
import {
  WEEKDAYS,
  MONTHS_ABBREVIATED,
} from '../../features/calendar/constants';
import { workouts as userWorkouts } from '../../features/workouts/workoutsSlice';
import { useActivityApi } from '../../features/activity/hooks/useActivityApi';
import { IActivityEntry } from '../../features/activity/types/activity.types';
import ActivityItem from '../../features/activity/components/ActivityItem';
import { getCalendarDate } from '../../features/calendar/utils';

const DashboardPage = () => {
  const today = new Date();

  const { open: openSlideIn } = useSlideInModalContext();

  const { workouts } = useSelector(userWorkouts);

  const [recentActivity, setRecentActivity] = useState<IActivityEntry[]>([]);

  const { getRecentActivity } = useActivityApi();

  const activityToday = recentActivity.find(
    (entry) => entry.date_scheduled === getCalendarDate(today)
  );
  const workoutToday = workouts.find((workout) => {
    if (activityToday) {
      return activityToday.workout === workout.id;
    }
    return;
  });

  // Fetch the most recent activity entries (3)
  const fetchActivity = async () => {
    const response = await getRecentActivity();
    setRecentActivity(response);
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className="p-6 md:px-45">
      {/* Today */}
      <div className="flex justify-end mb-2">
        <p className="">
          {WEEKDAYS[today.getDay()]}, {MONTHS_ABBREVIATED[today.getMonth()]}{' '}
          {today.getDate()}, {today.getFullYear()}
        </p>
      </div>
      {/* Quick Links */}
      <div className="flex md:justify-end mb-6">
        <div className="">
          <p className="text-xl my-2">Quick Links</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                openSlideIn(<CreateWorkoutModal />);
              }}
              size="medium"
            >
              Create New Workout
            </Button>
            <Button
              onClick={() => {
                openSlideIn(<ScheduleWorkoutModal />);
              }}
              size="medium"
            >
              Schedule Workout
            </Button>
          </div>
        </div>
      </div>

      {/* Upcoming Schedule */}
      <p className="font-nunito font-bold text-2xl mb-2">On Schedule Today</p>

      {workoutToday && (
        <WorkoutCard
          id={workoutToday.id}
          name={workoutToday.name}
          exercise_count={workoutToday.exercise_count}
        />
      )}

      {!workoutToday && (
        <div className="border border-input-border rounded-[10px] flex flex-col items-center py-6">
          <p className="text-body-text text-lg font-nunito">
            No workouts scheduled for today
          </p>
          <Link
            to="/planner"
            className="text-red-550 hover:font-semibold flex gap-2 items-center w-fit"
          >
            <p className="">Add today's workout</p>
            <MoveRight strokeWidth={1.2} />
          </Link>
        </div>
      )}

      {/* Activity */}
      <div className="flex justify-between mb-2 mt-6">
        <p className="font-nunito font-bold text-2xl">Recent Activity</p>
        <Link
          to="/activity"
          className="text-xs cursor-pointer flex items-center gap-2 rounded-[10px] hover:bg-neutral-100"
        >
          <p className="text-body-text text-sm">View All</p>
          <MoveRight strokeWidth={1} />
        </Link>
      </div>

      {/* Empty Activity component */}
      {!recentActivity.length && (
        <div className="border border-input-border rounded-[10px] flex flex-col items-center py-6">
          <p className="text-body-text text-lg font-nunito">
            No recent activity
          </p>
          <Link
            to="/planner"
            className="text-red-550 hover:font-semibold flex gap-2 items-center w-fit"
          >
            <p className="">Visit planner to get started</p>
            <MoveRight strokeWidth={1.2} />
          </Link>
        </div>
      )}

      {recentActivity.map((entry, idx) => {
        const workout = workouts.find(
          (workout) => workout.id === entry.workout
        );
        const name = workout?.name || '';
        const count = workout?.exercise_count || 0;
        const dateScheduled = new Date(entry.date_scheduled);

        return (
          <ActivityItem
            key={idx}
            name={name}
            count={count}
            date={dateScheduled}
          />
        );
      })}
    </div>
  );
};

export default DashboardPage;
