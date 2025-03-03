import { useEffect, useState, useRef } from 'react';

import CreateWorkoutForm from './CreateWorkoutForm';
import { useWorkoutsApi } from '../hooks/useWorkoutsApi';
import { IWorkoutData } from './CreateWorkoutForm';
import { useModalContext } from '../../../context/ModalContext';

export interface IExercise {
  id: number;
  is_editable: boolean;
  label: string;
  tracking_param: string;
  user: number;
  value: string;
}

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-sky-450 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

const CreateWorkoutModal = () => {
  const { getExercises, createWorkout } = useWorkoutsApi();
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const hasFetched = useRef(false);
  const { closeModal } = useModalContext();

  const handleSubmit = async (values: IWorkoutData) => {
    console.log('Submitting', values);

    try {
      await createWorkout(values);
    } catch (err) {
      // TODO: add error notification
      console.log(err);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchExercises = async () => {
      try {
        const response = await getExercises();
        setExercises(response);
      } catch (error) {
        console.log('Error fetching exercises', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
    hasFetched.current = true;
  }, [getExercises]);

  return (
    <div className="px-12 py-8 h-full flex flex-col">
      {/* Header */}
      <p className="font-nunito text-2xl font-bold mb-6">New Workout</p>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {isLoading ? (
          <Loader />
        ) : (
          <CreateWorkoutForm handleSubmit={handleSubmit} options={exercises} />
        )}
      </div>
    </div>
  );
};

export default CreateWorkoutModal;
