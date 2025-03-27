import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Workouts from '../../features/workouts/components/Workouts';
import Calendar from '../../features/calendar/components/Calendar';

const PlannerPage = () => {
  // TODO: move workout placements to redux
  const [workoutPlacements, setWorkoutPlacements] = useState<
    Record<string, string>
  >({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const workoutId = active.id.toString();
    const containerId = over.id.toString();

    // TODO: Update workout placement in container
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
