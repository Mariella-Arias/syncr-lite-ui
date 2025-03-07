import { useSelector, useDispatch } from 'react-redux';

import { workouts, setExercises, setWorkouts } from '../workoutsSlice';
import CreateWorkoutForm from './CreateWorkoutForm';
import { useWorkoutsApi } from '../hooks/useWorkoutsApi';
import {
  useSlideInModalContext,
  useCenteredModalContext,
} from '../../../context/ModalsContext';
import DeleteExerciseModal from './DeleteExerciseModal';
import {
  INewExerciseData,
  IExercise,
  IWorkoutData,
} from '../types/workouts.types';
import { AppDispatch } from '../../../app/store';

const CreateWorkoutModal = () => {
  const { createExercise, createWorkout, deleteExercise } = useWorkoutsApi();
  const { close: closeSlideInModal } = useSlideInModalContext();
  const { open: openCenteredModal, close: closeCenteredModal } =
    useCenteredModalContext();
  const { exercises } = useSelector(workouts);
  const dispatch: AppDispatch = useDispatch();

  const handleCreateWorkout = async (values: IWorkoutData) => {
    try {
      await createWorkout(values);
      await dispatch(setWorkouts());
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
            await dispatch(setExercises());
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
      await dispatch(setExercises());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-12 py-8 h-full flex flex-col">
      {/* Header */}
      <p className="font-nunito text-2xl font-bold mb-6">New Workout</p>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <CreateWorkoutForm
          handleSubmit={handleCreateWorkout}
          deleteExercise={handleDeleteExercise}
          createExercise={handleCreateExercise}
          options={exercises}
        />
      </div>
    </div>
  );
};

export default CreateWorkoutModal;
