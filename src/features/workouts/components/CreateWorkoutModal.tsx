// External Dependencies
import { useSelector, useDispatch } from 'react-redux';

// UI Components
import CreateWorkoutForm from './CreateWorkoutForm';
import DeleteExerciseModal from './DeleteExerciseModal';

// Redux
import { workouts, updateWorkouts, updateExercises } from '../workoutsSlice';
import {
  useSlideInModalContext,
  useCenteredModalContext,
} from '../../../context/ModalsContext';

// Hooks
import { useWorkoutsApi } from '../hooks/useWorkoutsApi';
import { useCalendarActivity } from '../../calendar/hooks/useCalendarActivity';
import { useActivityHistory } from '../../activity/hooks/useActivityHistory';

// Types
import { AppDispatch } from '../../../app/store';
import {
  INewExerciseData,
  IExercise,
  IWorkoutData,
} from '../types/workouts.types';

/**
 * CreateWorkoutModal Component
 *
 * Modal for creating new workouts with functionality to:
 * 1. Create a new workout with selected exercises
 * 2. Create new exercises if needed
 * 3. Delete existing exercises
 */
const CreateWorkoutModal = () => {
  // API HOOKS
  const {
    createExercise,
    createWorkout,
    deleteExercise,
    getWorkouts,
    getExercises,
  } = useWorkoutsApi();
  const { setScheduledActivity } = useCalendarActivity();
  const { setActivityHistory } = useActivityHistory();

  // MODALS CONTEXT
  const { close: closeSlideInModal } = useSlideInModalContext();
  const { open: openCenteredModal, close: closeCenteredModal } =
    useCenteredModalContext();

  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { exercises } = useSelector(workouts);

  /**
   * Creates a new workout and updates the Redux store
   * @param values - The workout data to be created
   */
  const handleCreateWorkout = async (values: IWorkoutData) => {
    try {
      await createWorkout(values);

      const response = await getWorkouts();
      dispatch(updateWorkouts(response));
      // TODO: add success notification
    } catch (err) {
      // TODO: add error notification
      console.log(err);
    } finally {
      closeSlideInModal();
    }
  };

  /**
   * Shows confirmation modal and handles exercise deletion
   * @param exercise - The exercise to be deleted
   */
  const handleDeleteExercise = async (exercise: IExercise) => {
    openCenteredModal(
      <DeleteExerciseModal
        exerciseName={exercise.label}
        onCancel={() => closeCenteredModal()}
        onDelete={async () => {
          try {
            await deleteExercise({ id: exercise.id });

            // Update exercises list
            const exercisesRes = await getExercises();
            dispatch(updateExercises(exercisesRes));

            // Update workouts list
            const workoutsRes = await getWorkouts();
            dispatch(updateWorkouts(workoutsRes));

            // Update calendar and activity history
            await setScheduledActivity();
            await setActivityHistory();
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

  /**
   * Creates a new exercise and updates the Redux store
   * @param data - The exercise data to be created
   */
  const handleCreateExercise = async (data: INewExerciseData) => {
    try {
      await createExercise(data);

      const response = await getExercises();
      dispatch(updateExercises(response));
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
