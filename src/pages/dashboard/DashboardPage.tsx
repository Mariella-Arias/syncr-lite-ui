// External dependencies
import { useSelector } from 'react-redux';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router';

// UI Components
import Button from '../../components/common/Button';
import WorkoutCard from '../../features/workouts/components/WorkoutCard';
import ActivityItem from '../../features/activity/components/ActivityItem';

// Modal Components
import CreateWorkoutModal from '../../features/workouts/components/CreateWorkoutModal';
import { useSlideInModalContext } from '../../context/ModalsContext';
import ScheduleWorkoutModal from '../../features/calendar/components/ScheduleWorkoutModal';

// Hooks and Context
import { useActivityApi } from '../../features/activity/hooks/useActivityApi';
import { useCalendarActivity } from '../../features/calendar/hooks/useCalendarActivity';
import { useActivityHistory } from '../../features/activity/hooks/useActivityHistory';

// Redux State and Actions
import { workouts as userWorkouts } from '../../features/workouts/workoutsSlice';
import { activity } from '../../features/activity/activitySlice';
import { calendar } from '../../features/calendar/calendarSlice';

// Utils and Constants
import { getCalendarDate } from '../../features/calendar/utils';
import {
  WEEKDAYS,
  MONTHS_ABBREVIATED,
} from '../../features/calendar/constants';

// Types
import { IActivityEntry } from '../../features/activity/types/activity.types';
import { IWorkout } from '../../features/workouts/types/workouts.types';

/**
 * DashboardPage Component
 * Serves as the landing page rendering:
 * 1. Today's scheduled workouts
 * 2. Recent activity history (excluding today)
 * 3. Quick Links for creating and scheduling workouts
 *
 */
const DashboardPage = () => {
  // INITIALIZATION
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparisons
  const todayStr = getCalendarDate(today);

  // HOOKS AND CONTEXT
  const { updateActivity, deleteActivity } = useActivityApi();
  const { open: openSlideIn } = useSlideInModalContext();
  const { setActivityHistory } = useActivityHistory();

  // REDUX
  const { workouts } = useSelector(userWorkouts);
  const { recentActivity } = useSelector(activity); // A list of the five most recent activity entries
  const { scheduledWorkouts } = useSelector(calendar);
  const { setScheduledActivity } = useCalendarActivity();

  // COMPUTED VALUES
  const scheduleToday: IActivityEntry[] = scheduledWorkouts.filter(
    (entry) => entry.date_scheduled === todayStr
  );

  // Find the corresponding workout objects for today's scheduled activities
  const workoutsScheduledToday: (IWorkout | undefined)[] = scheduleToday.map(
    ({ workout }) => workouts.find((curr) => curr.id === workout)
  );

  return (
    <div className="p-6 md:px-45 flex flex-col h-full">
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

      {/* Upcoming Schedule: today's workout(s) */}
      {workoutsScheduledToday.length > 0 && workouts.length > 0 && (
        <div className="flex overflow-x-auto gap-2 no-scrollbar">
          {scheduleToday.map((scheduledEntry, scheduledEntryIdx) => {
            const {
              id: scheduledActivityId,
              completed,
              workout: scheduledWorkoutId,
            } = scheduledEntry;

            const scheduledWorkout = workouts.find(
              (workout) => workout.id === scheduledWorkoutId
            );

            if (!scheduledWorkout) return null;

            return (
              <WorkoutCard
                key={scheduledEntryIdx}
                id={scheduledWorkout.id}
                name={scheduledWorkout.name}
                exercise_count={scheduledWorkout.exercise_count}
                isDraggable={false}
                showCompletionControls={true}
                showMenu={false}
                eventHandlers={{
                  onComplete: async () => {
                    try {
                      await updateActivity({
                        id: scheduledActivityId,
                        data: {
                          completed: !completed,
                        },
                      });

                      // Update activity scheduled on calendar
                      await setScheduledActivity();

                      // Update activity history in redux
                      await setActivityHistory();
                    } catch (err) {
                      console.log(err);
                    }
                  },
                  onRemove: async () => {
                    try {
                      await deleteActivity({
                        id: scheduledActivityId,
                      });
                      // Update activity scheduled on calendar
                      await setScheduledActivity();

                      // Update activity history in redux
                      await setActivityHistory();
                    } catch (err) {
                      console.log(err);
                    }
                  },
                }}
                isCompleted={completed}
              />
            );
          })}
        </div>
      )}

      {/* Upcoming Schedule (empty container) */}
      {!workoutsScheduledToday.length && (
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

      {/* Recent Activity */}
      {/* Recent Activity Header */}
      <div className="flex justify-between mb-2 mt-6">
        <p className="font-nunito font-bold text-2xl">Recent Activity</p>
        <Link
          to="/activity"
          className="text-xs cursor-pointer flex items-center gap-2 rounded-[10px] hover:bg-neutral-100 py-2 px-1"
        >
          <p className="text-body-text text-sm">View All</p>
          <MoveRight
            strokeWidth={1}
            className="text-body-text"
          />
        </Link>
      </div>

      {/* Recent Activity (empty container) */}
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

      {/* Recent Activity (log) */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {recentActivity.map((entry, idx) => {
          const workout = workouts.find(
            (workout) => workout.id === entry.workout
          );
          const name = workout?.name || '';
          const count = workout?.exercise_count || 0;

          const [year, month, day] = entry.date_scheduled.split('-');
          const dateScheduled = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );

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
    </div>
  );
};

export default DashboardPage;
