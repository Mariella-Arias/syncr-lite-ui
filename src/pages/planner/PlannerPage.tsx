import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Workouts from '../../features/workouts/components/Workouts';
import Calendar from '../../features/calendar/components/Calendar';
import { useCalendarApi } from '../../features/calendar/hooks/useCalendarApi';

const PlannerPage = () => {
  const { scheduleWorkout } = useCalendarApi();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(event);
    if (!over) return;

    const workoutId = active.id as number;
    const containerId = over.id.toString();

    await scheduleWorkout({ workout: workoutId, date_scheduled: containerId });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex w-full h-full overflow-auto">
        {/* CALENDAR: droppable */}
        <div className="flex-1">
          <Calendar />
        </div>
        {/* WORKOUTS: draggable */}
        <div className="flex-1">
          <Workouts />
        </div>
      </div>
    </DndContext>
  );
};

export default PlannerPage;
