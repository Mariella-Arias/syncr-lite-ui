import { useEffect, useRef, useState } from 'react';

import ScheduleWorkoutForm, { IScheduleFormData } from './ScheduleWorkoutForm';
import { useSlideInModalContext } from '../../../context/ModalsContext';
import { useWorkoutsApi } from '../../workouts/hooks/useWorkoutsApi';
import { IWorkout } from './WorkoutSearch';
import { usePlannerApi } from '../hooks/usePlannerApi';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-sky-450 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

const ScheduleWorkoutModal = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { close } = useSlideInModalContext();
  const hasFetched = useRef(false);
  const { getWorkouts } = useWorkoutsApi();
  const { scheduleWorkout } = usePlannerApi();

  const handleScheduleWorkout = async (data: IScheduleFormData) => {
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
      // TODO add success notification
    } catch (err) {
      console.log(err);
    } finally {
      close();
    }
  };

  const fetchExercises = async () => {
    try {
      const response = await getWorkouts();
      setWorkouts(response);
    } catch (error) {
      console.log('Error fetching exercises', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    fetchExercises();
    hasFetched.current = true;
  }, [getWorkouts]);

  return (
    <div className="px-12 py-8 h-full flex flex-col">
      <p className="font-nunito text-2xl font-bold mb-6">Schedule Workout</p>
      {isLoading ? (
        <Loader />
      ) : (
        <ScheduleWorkoutForm
          workouts={workouts}
          onSubmit={handleScheduleWorkout}
        />
      )}
    </div>
  );
};

export default ScheduleWorkoutModal;
