// External Dependencies
import { useSelector } from 'react-redux';

// UI Components
import ActivityItem from './ActivityItem';

// Hooks and Context
import { useSlideInModalContext } from '../../../context/ModalsContext';
import ScheduleWorkoutModal from '../../calendar/components/ScheduleWorkoutModal';

// Redux
import { workouts as userWorkouts } from '../../workouts/workoutsSlice';

// Utils and Types
import { IActivityEntry } from '../types/activity.types';
import { groupActivityByMonth } from '../utils';

interface ActivityLogProps {
  log: IActivityEntry[];
}

/**
 * ActivityLog Component
 *
 * Displays a chronological log of workout activities grouped by month
 * Shows completion status and provides an empty state with action
 *
 * @param log - Array of activity entries to display
 */
const ActivityLog = ({ log = [] }: ActivityLogProps) => {
  // REDUX
  const { workouts } = useSelector(userWorkouts);

  // MODALS CONTEXT
  const { open: openSlideInModal } = useSlideInModalContext();

  // Empty state when no activity exists
  if (!log.length) {
    return (
      <div className="border border-input-border rounded-[10px] flex flex-col items-center py-6">
        <p className="text-body-text text-lg font-nunito">
          No activity history
        </p>
        <button onClick={() => openSlideInModal(<ScheduleWorkoutModal />)}>
          <p className="text-red-550 hover:font-semibold cursor-pointer font-nunito">
            Schedule a workout
          </p>
        </button>
      </div>
    );
  }

  // Group activities by month for better organization
  const { activity, order } = groupActivityByMonth(log);

  return (
    <div className="mt-4">
      {order.map((monthHeader, monthHeaderIdx) => {
        // Calculate completion rate for this month
        const completedCount: number = activity[monthHeader].reduce(
          (count, activity) => {
            return activity.completed === true ? count + 1 : count;
          },
          0
        );

        return (
          <div
            key={monthHeaderIdx}
            className="mb-4"
          >
            {/* Month header with completion statistics */}
            <div className="flex justify-between">
              <p className="font-nunito font-semibold text-base text-body-text">
                {monthHeader}
              </p>
              <p className="font-nunito font-semibold text-base text-body-text">
                {completedCount}/{activity[monthHeader].length} completed
              </p>
            </div>

            {/* Activity entries for this month */}
            {activity[monthHeader].map(
              (
                { completed, date_scheduled: date, workout: workoutId },
                entryIdx
              ) => {
                // Find workout details based on the workout ID
                const workout = workouts.find(
                  (workout) => workout.id === workoutId
                );
                const name = workout?.name || '';
                const count = workout?.exercise_count || 0;

                // Parse the date string into a Date object
                const [year, month, day] = date.split('-');
                const dateScheduled = new Date(
                  parseInt(year),
                  parseInt(month) - 1,
                  parseInt(day)
                );

                return (
                  <div key={entryIdx}>
                    <ActivityItem
                      name={name}
                      count={count}
                      date={dateScheduled}
                      completed={completed}
                    />
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ActivityLog;
