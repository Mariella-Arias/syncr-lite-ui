import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

import { workouts as workoutList } from '../../features/workouts/workoutsSlice';
import Droppable from '../../features/calendar/components/Droppable';
import Workouts from '../../features/workouts/components/Workouts';
import { IWorkout } from '../../features/workouts/types/workouts.types';

const PlannerPage = () => {
  const { workouts } = useSelector(workoutList);

  const [workoutPlacements, setWorkoutPlacements] = useState<
    Record<string, string>
  >({});
  const containers = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

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

  const getWorkoutName = (workoutId: string) => {
    const target = workouts.filter(
      (workout: IWorkout) => workout.id.toString() === workoutId
    );
    console.log(target);
    return target[0].name;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex w-full h-full overflow-auto">
        {/* CALENDAR: droppable */}
        <div className="flex-1">
          <div className="h-full p-4">
            <p className="font-nunito text-2xl font-bold mb-6">
              Upcoming Schedule
            </p>
            <p className="font-nunito text-xl font-semibold mb-2">March 2025</p>
            {containers.map((containerId, idx) => (
              <Droppable
                key={containerId}
                id={containerId}
              >
                <div className="min-h-25">
                  <div className="bg-sky-250 flex items-center justify-center">
                    <p className="text-base p-1">{containerId}</p>
                  </div>
                  {/* Add workout cards to container */}
                  {Object.entries(workoutPlacements)
                    .filter(([_, container]) => container === containerId)
                    .map(([workoutId]) => (
                      <div
                        key={workoutId}
                        className="bg-white rounded-[10px] shadow-md w-45 flex items-center justify-between py-1"
                      >
                        <p className="font-bold ml-3">
                          {getWorkoutName(workoutId)}
                        </p>
                        <button
                          onClick={() =>
                            setWorkoutPlacements((prev) => {
                              const previousState = { ...prev };

                              if (previousState[workoutId]) {
                                delete previousState[workoutId];
                              }
                              return previousState;
                            })
                          }
                          className="cursor-pointer rounded-[10px] p-3 hover:bg-neutral-100"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  {/* Renders if container is empty */}
                  {!Object.values(workoutPlacements).includes(containerId) && (
                    <p className="text-[#AAAAAA]">Add workout</p>
                  )}
                </div>
              </Droppable>
            ))}
          </div>
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
