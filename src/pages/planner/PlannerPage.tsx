// React Import
import { useState } from 'react';

// External Libraries
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { useSelector } from 'react-redux';

// UI Components
import Workouts from '../../features/workouts/components/Workouts';
import Calendar from '../../features/calendar/components/Calendar';
import WorkoutCard from '../../features/workouts/components/WorkoutCard';

// Redux
import { workouts as workoutList } from '../../features/workouts/workoutsSlice';

// Hooks
import { useActivityApi } from '../../features/activity/hooks/useActivityApi';
import { useCalendarActivity } from '../../features/calendar/hooks/useCalendarActivity';
import { useActivityHistory } from '../../features/activity/hooks/useActivityHistory';

/**
 * PlannerPage Component
 *
 * Provides an interactive workout planning interface with:
 * 1. Drag-and-drop functionality to schedule workouts on a calendar
 * 2. A calendar view showing scheduled workouts
 * 3. A workouts list that can be dragged onto calendar days
 */
const PlannerPage = () => {
  // INITIALIZATION
  // Today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Redux state
  const { workouts } = useSelector(workoutList);

  // Local State to track currently dragged workout card
  const [activeId, setActiveId] = useState<number | null>(null);

  // HOOKS
  const { setSchedule } = useCalendarActivity();
  const { setActivityHistory } = useActivityHistory();
  const { scheduleWorkout, deleteActivity } = useActivityApi();

  /**
   * Handles the start of a drag event
   * Stores the ID of the currently dragged workout
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as number);
  };

  /**
   * Handles the end of a drag event
   * Creates a new activity entry when a workout is dropped on a calendar slot
   */
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // Reset the active ID
    setActiveId(null);

    if (!over) return;

    const workoutId = active.id as number;
    const containerId = over.id.toString();

    // TODO: limit 3 workouts per calendar slot
    // Creates a new activity entry
    await scheduleWorkout({ workout: workoutId, date_scheduled: containerId });
    await setSchedule();
    await setActivityHistory(); // ! Need?
  };

  /**
   * Handles deletion of a scheduled workout from the calendar
   */
  const handleDeleteActivity = async (id: number) => {
    await deleteActivity({ id });
    await setSchedule();
    await setActivityHistory();
  };

  // Find the active workout for overlay rendering
  const activeWorkout = workouts.find((workout) => workout.id === activeId);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden">
          <Calendar onDeleteActivity={handleDeleteActivity} />
        </div>
        <div className="h-1/2 md:h-full md:w-1/2">
          <Workouts />
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeId !== null && activeWorkout ? (
          <WorkoutCard
            id={activeWorkout.id}
            name={activeWorkout.name}
            exercise_count={activeWorkout.exercise_count}
            isDraggable={true}
            showCompletionControls={false}
            showMenu={false} // No need for menu in overlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default PlannerPage;
