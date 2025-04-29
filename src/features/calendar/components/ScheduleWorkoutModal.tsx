// External Dependencies
import { useSelector } from 'react-redux';

// UI Components
import ScheduleWorkoutForm from './ScheduleWorkoutForm';

// Redux
import { workouts as workoutsState } from '../../workouts/workoutsSlice';

// Hooks and Context
import { useActivityHistory } from '../../activity/hooks/useActivityHistory';
import { useCalendarActivity } from '../hooks/useCalendarActivity';
import { useActivityApi } from '../../activity/hooks/useActivityApi';
import { useSlideInModalContext } from '../../../context/ModalsContext';

// Types
import { IWorkout } from '../../workouts/types/workouts.types';
import { IScheduleWorkoutData } from '../../activity/types/activity.types';

/**
 * ScheduleWorkoutModal Component
 *
 * Modal for scheduling workouts on specific dates with functionality to:
 * 1. Select a workout from existing workouts
 * 2. Choose a date for the workout
 * 3. Create a new activity entry for the scheduled workout
 *
 * @param initialFormValues - Optional initial values for the form (workout name and date)
 */
const ScheduleWorkoutModal = ({
  initialFormValues,
}: {
  initialFormValues?: { name?: string; date?: string };
}) => {
  // CONTEXT
  const { close } = useSlideInModalContext();

  // REDUX
  const { workouts }: { workouts: IWorkout[] } = useSelector(workoutsState);

  // HOOKS
  const { scheduleWorkout } = useActivityApi();
  const { setSchedule } = useCalendarActivity();
  const { setActivityHistory } = useActivityHistory();

  /**
   * Schedules a workout for a specific date and updates relevant state
   * @param data - Contains the workout name and date to schedule
   */
  const handleScheduleWorkout = async (data: IScheduleWorkoutData) => {
    // Find the workout ID based on the selected name
    const workout = workouts.find((workout) => workout.name === data.name);
    if (!workout) {
      console.error(`Expected to find workout with name: ${data.name}`);
      return;
    }
    const workoutId: number = workout.id;

    try {
      // Create the activity entry
      await scheduleWorkout({
        workout: workoutId,
        date_scheduled: data.date,
      });

      // Update relevant state
      await setSchedule();
      await setActivityHistory();
    } catch (err) {
      console.log(err);
    } finally {
      close();
    }
  };

  return (
    <div className="px-12 py-8 h-full flex flex-col">
      <p className="font-nunito text-2xl font-bold mb-6">Schedule Workout</p>
      <ScheduleWorkoutForm
        workouts={workouts}
        onSubmit={handleScheduleWorkout}
        initialValues={{ ...initialFormValues }}
      />
    </div>
  );
};

export default ScheduleWorkoutModal;
