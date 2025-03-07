import { useSelector } from 'react-redux';

import ScheduleWorkoutForm from './ScheduleWorkoutForm';
import { useSlideInModalContext } from '../../../context/ModalsContext';
import { IWorkout } from '../../workouts/types/workouts.types';
import { useCalendarApi } from '../hooks/useCalendarApi';
import { workouts as workoutsState } from '../../workouts/workoutsSlice';
import { IScheduleWorkoutData } from '../types/calendar.types';

const ScheduleWorkoutModal = () => {
  const { close } = useSlideInModalContext();
  const { workouts }: { workouts: IWorkout[] } = useSelector(workoutsState);

  const { scheduleWorkout } = useCalendarApi();

  const handleScheduleWorkout = async (data: IScheduleWorkoutData) => {
    const workout = workouts.find((workout) => workout.name === data.name);
    if (!workout) {
      console.error(`Expected to find workout with name: ${data.name}`);
      return;
    }
    const workoutId: number = workout.id;

    try {
      await scheduleWorkout({
        workout: workoutId,
        date_scheduled: data.date,
      });
      // TODO handle successful scheduling
      // TODO update activity
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
      />
    </div>
  );
};

export default ScheduleWorkoutModal;
