import { useSelector } from 'react-redux';

import { IActivityEntry } from '../types/activity.types';
import { workouts as userWorkouts } from '../../workouts/workoutsSlice';
import ActivityItem from './ActivityItem';
import { MONTHS_FULL } from '../../calendar/constants';

interface ActivityLogProps {
  log: IActivityEntry[];
}

const ActivityLog = ({ log }: ActivityLogProps) => {
  const { workouts } = useSelector(userWorkouts);

  const completedCount: number = log.reduce((count, activity) => {
    return activity.completed === true ? count + 1 : count;
  }, 0);

  const currentDate = log[0].date_scheduled;

  const [currentYear, currentMonth] = currentDate.split('-');

  return (
    <div className="">
      <div className="flex justify-between my-2">
        <p className="font-nunito font-semibold text-base text-body-text">
          {MONTHS_FULL[parseInt(currentMonth) - 1]} {currentYear}
        </p>
        <p className="font-nunito font-semibold text-base text-body-text">
          {completedCount}/{log.length} completed
        </p>
      </div>
      {log.map(
        ({ completed, date_scheduled: date, workout: workoutId }, idx) => {
          const workout = workouts.find((workout) => workout.id === workoutId);
          const name = workout?.name || '';
          const count = workout?.exercise_count || 0;
          const [year, month, day] = date.split('-');
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
              completed={completed}
            />
          );
        }
      )}
    </div>
  );
};

export default ActivityLog;
