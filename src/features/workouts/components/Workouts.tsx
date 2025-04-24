// External dependencies
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'lucide-react';

// App-level imports
import { AppDispatch } from '../../../app/store';

// UI Components
import Button from '../../../components/common/Button';
import WorkoutCard from './WorkoutCard';

// Modals
import CreateWorkoutModal from './CreateWorkoutModal';
import ScheduleWorkoutModal from '../../calendar/components/ScheduleWorkoutModal';
import DeleteWorkoutModal from './DeleteWorkoutModal';

// Hooks and Context
import { useWorkoutsApi } from '../hooks/useWorkoutsApi';
import { useCalendarActivity } from '../../calendar/hooks/useCalendarActivity';
import {
  useSlideInModalContext,
  useCenteredModalContext,
} from '../../../context/ModalsContext';
import { useActivityHistory } from '../../activity/hooks/useActivityHistory';

// Redux state and actions
import { workouts as workoutList, updateWorkouts } from '../workoutsSlice';

/**
 * Workouts Component
 *
 * Displays a searchable, interactive list of user workouts with functionality to:
 * 1. Create new workouts
 * 2. Schedule existing workouts
 * 3. Delete workouts
 * 4. Search through workouts
 */
const Workouts = () => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { workouts } = useSelector(workoutList);

  // LOCAL STATE
  const [query, setQuery] = useState('');

  // MODAL CONTEXT
  const { open: openSlideIn } = useSlideInModalContext();
  const { open: openCenteredModal, close: closeCenteredModal } =
    useCenteredModalContext();

  // HOOKS
  const { deleteWorkout, getWorkouts } = useWorkoutsApi();
  const { setSchedule } = useCalendarActivity();
  const { setActivityHistory } = useActivityHistory();

  // COMPUTED VALUES
  // Filter workouts based on search query
  const searchResults = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full p-6">
      {/* HEADER */}
      <div className="flex flex-col mb-4">
        <p className="font-nunito text-2xl font-bold mb-6">My Workouts</p>
        <div className="flex justify-between">
          {/* Quick Search Input */}
          <div className="relative ">
            <input
              placeholder="Search"
              className="border-input-border border-1 rounded-full py-2 px-6 text-lg"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />

            {/* Clear search button */}
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
              >
                <X
                  strokeWidth={1.5}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full cursor-pointer hover:stroke-2"
                />
              </button>
            )}
          </div>

          {/* Create workout button */}
          <Button
            onClick={() => openSlideIn(<CreateWorkoutModal />)}
            size="medium"
          >
            Create New
          </Button>
        </div>
      </div>

      {/* Empty workout list state */}
      {workouts.length === 0 && (
        <div className="border border-input-border rounded-[10px] flex flex-col items-center py-6">
          <p className="text-body-text text-lg font-nunito">
            No workouts created yet
          </p>
          <button onClick={() => openSlideIn(<CreateWorkoutModal />)}>
            <p className="text-red-550 hover:font-semibold cursor-pointer font-nunito">
              Create new workout
            </p>
          </button>
        </div>
      )}

      {/* Workout cards grid */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 md:gap-5">
          {searchResults.map((workout) => (
            <WorkoutCard
              key={workout.id}
              {...workout}
              isDraggable={true}
              showCompletionControls={false}
              showMenu={true}
              eventHandlers={{
                // Opens scheduling modal for the workout
                onScheduleWorkout: (workoutName: string) =>
                  openSlideIn(
                    <ScheduleWorkoutModal
                      initialFormValues={{ name: workoutName }}
                    />
                  ),
                // Opens delete confirmation modal and handles deletion
                onDeleteWorkout: ({ id, name }) =>
                  openCenteredModal(
                    <DeleteWorkoutModal
                      workoutName={name}
                      onCancel={() => closeCenteredModal()}
                      onDelete={async () => {
                        await deleteWorkout({ id });

                        const response = await getWorkouts();
                        dispatch(updateWorkouts(response));

                        await setSchedule();
                        await setActivityHistory();
                        closeCenteredModal();
                      }}
                    />
                  ),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
