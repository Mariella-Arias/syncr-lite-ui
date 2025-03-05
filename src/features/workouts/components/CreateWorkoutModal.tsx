import { useEffect, useState, useRef } from 'react';

import CreateWorkoutForm from './CreateWorkoutForm';
import { useWorkoutsApi } from '../hooks/useWorkoutsApi';
import { IWorkoutData } from './CreateWorkoutForm';
import {
  useSlideInModalContext,
  useCenteredModalContext,
} from '../../../context/ModalsContext';
import DeleteExerciseModal from './DeleteExerciseModal';
import { INewExerciseData } from './CreateExerciseForm';

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
  const { createExercise, getExercises, createWorkout, deleteExercise } =
    useWorkoutsApi();
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const hasFetched = useRef(false);
  const { close: closeSlideInModal } = useSlideInModalContext();
  const { open: openCenteredModal, close: closeCenteredModal } =
    useCenteredModalContext();

  const handleCreateWorkout = async (values: IWorkoutData) => {
    try {
      await createWorkout(values);
      // TODO: add success notification
    } catch (err) {
      // TODO: add error notification
      console.log(err);
    } finally {
      closeSlideInModal();
    }
  };

  const handleDeleteExercise = async (exercise: IExercise) => {
    openCenteredModal(
      <DeleteExerciseModal
        exerciseName={exercise.label}
        onCancel={() => closeCenteredModal()}
        onDelete={async () => {
          try {
            await deleteExercise({ id: exercise.id });
            await fetchExercises();
          } catch (err) {
            console.log(err);
            // TODO: handle error
          } finally {
            closeCenteredModal();
          }
        }}
      />
    );
  };

  const handleCreateExercise = async (data: INewExerciseData) => {
    try {
      await createExercise(data);
      await fetchExercises();
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    if (hasFetched.current) return;

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
          <CreateWorkoutForm
            handleSubmit={handleCreateWorkout}
            deleteExercise={handleDeleteExercise}
            createExercise={handleCreateExercise}
            options={exercises}
          />
        )}
      </div>
    </div>
  );
};

export default CreateWorkoutModal;
