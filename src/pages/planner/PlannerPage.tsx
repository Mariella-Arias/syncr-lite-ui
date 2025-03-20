import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Calendar from '../../features/calendar/components/Calendar';
import Droppable from '../../features/calendar/components/Droppable';
import Workouts from '../../features/workouts/components/Workouts';
import Draggable from '../../features/workouts/components/Draggable';

const PlannerPage = () => {
  const [workoutPlacements, setWorkoutPlacements] = useState({});
  const draggableMarkup = (
    <Draggable>
      <div className="bg-white p-4 rounded shadow-md">Workout Card</div>
    </Draggable>
  );
  const containers = ['A', 'B', 'C'];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const workoutId = active.id.toString();
    const containerId = over.id.toString();

    if (containers.includes(containerId)) {
      setWorkoutPlacements((prev) => ({
        ...prev,
        [workoutId]: containerId,
      }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* <div className="flex w-full h-full overflow-auto">
        <div className="flex-1">
          <Calendar />
        </div>
        <div className="w-px bg-gray-300 h-full border-r border-gray-400"></div>
        <div className="flex-1">
          <Workouts />
        </div>
      </div> */}
      <div className="flex w-full h-full overflow-auto">
        <div className="flex-1">
          {containers.map((id) => (
            <Droppable key={id} id={id}>
              <div className="min-h-[120px] p-4 bg-blue-100 rounded-lg">
                <h3 className="font-bold mb-2">Container {id}</h3>
                {Object.entries(workoutPlacements)
                  .filter(([_, container]) => container === id)
                  .map(([workoutId]) => (
                    <div
                      key={workoutId}
                      className="p-2 bg-white rounded shadow mb-2"
                    >
                      Workout {workoutId}
                    </div>
                  ))}
                {!Object.values(workoutPlacements).includes(id) && (
                  <p className="text-gray-400">Drop workouts here</p>
                )}
              </div>
            </Droppable>
          ))}
        </div>
        <div className="flex-1">
          <Workouts />
        </div>
      </div>
    </DndContext>
  );
};

export default PlannerPage;
