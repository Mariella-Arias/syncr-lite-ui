import { useSelector } from 'react-redux';

import { IActivityEntry } from '../types/activity.types';
import { workouts as userWorkouts } from '../../workouts/workoutsSlice';
import ActivityItem from './ActivityItem';

const ActivityLog = ({ log }: { log: IActivityEntry[] }) => {
  const { workouts } = useSelector(userWorkouts);

  return (
    <div className="mb-6">
      {log.map(
        ({ completed, date_scheduled: date, workout: workoutId }, idx) => {
          const workout = workouts.find((workout) => workout.id === workoutId);
          const name = workout?.name || '';
          const count = workout?.exercise_count || 0;
          const dateScheduled = new Date(date);

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
