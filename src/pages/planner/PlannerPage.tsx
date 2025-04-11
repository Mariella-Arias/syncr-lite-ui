// External Libraries
import { DndContext, DragEndEvent } from '@dnd-kit/core';

// UI Components
import Workouts from '../../features/workouts/components/Workouts';
import Calendar from '../../features/calendar/components/Calendar';

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // HOOKS
  const { setScheduledActivity } = useCalendarActivity();
  const { setActivityHistory } = useActivityHistory();
  const { scheduleWorkout, deleteActivity } = useActivityApi();

  /**
   * Handles the end of a drag event
   * Creates a new activity entry when a workout is dropped on a calendar slot
   */
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const workoutId = active.id as number;
    const containerId = over.id.toString();

    // TODO: limit 3 workouts per calendar slot
    // Creates a new activity entry
    await scheduleWorkout({ workout: workoutId, date_scheduled: containerId });
    await setScheduledActivity();
    await setActivityHistory();
  };

  /**
   * Handles deletion of a scheduled workout from the calendar
   */
  const handleDeleteActivity = async (id: number) => {
    await deleteActivity({ id });
    await setScheduledActivity();
    await setActivityHistory();
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden">
          <Calendar onDeleteActivity={handleDeleteActivity} />
        </div>
        <div className="h-1/2 md:h-full md:w-1/2">
          <Workouts />
        </div>
      </div>
    </DndContext>
  );
};

export default PlannerPage;
