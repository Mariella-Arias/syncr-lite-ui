import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GripVertical, EllipsisVertical } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { workouts as workoutList } from '../workoutsSlice';
import { useWorkoutsApi } from '../hooks/useWorkoutsApi';
import { IWorkout, IBlockData } from '../types/workouts.types';

interface WorkoutCardProps {
  id: number;
  name: string;
  exercise_count: number;
  isDraggable: boolean;
}
interface IWorkoutDetails extends IWorkout {
  blocks: IBlockData[];
}

const WorkoutCard = ({
  id,
  name,
  exercise_count: count,
  isDraggable,
}: WorkoutCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
    over,
  } = useDraggable({
    id: id,
  });
  const [workoutDetails, setWorkoutDetails] = useState<IWorkoutDetails | null>(
    null
  );
  const { getWorkout } = useWorkoutsApi();

  // IMPORTANT: Must use inline styles here instead of Tailwind classes:
  // 1. dnd-kit generates dynamic transform values at runtime that can't be predetermined
  // 2. These transform values are precise coordinates that change during dragging
  // 3. Tailwind is designed for predefined utility classes, not runtime-calculated styles
  // 4. CSS.Translate.toString() generates a complete transform string with specific coordinates
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform), // Generates transform: translate3d(x, y, 0)
        opacity: isDragging ? 0.7 : 1, // Visual feedback during drag
        border: over ? '2px #41A4F2 solid' : '', // Highlight when over a drop target
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style} // Dynamic inline styles from dnd-kit (can't use Tailwind for these)
      className="border-1 p-2 border-input-border rounded-[10px] shadow-md flex flex-col min-w-60 w-full md:max-w-100 relative h-fit"
    >
      <div className="flex items-center gap-2 w-full h-full my-4">
        {/*   The drag handle needs both refs and event listeners from dnd-kit */}
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          <GripVertical
            color="#CECDCD"
            size={24}
            className={`hover:cursor-grab flex-shrink-0 ${
              !isDraggable ? 'hidden' : ''
            }`}
          />
        </div>

        {/* Workout Name and Exercise Count */}
        <div className="flex-1  min-w-0">
          <p className="font-nunito text-lg font-bold truncate">{name}</p>
          <p className="font-nunito text-body-text text-sm">
            {count} exercises
          </p>
        </div>

        <EllipsisVertical
          size={24}
          className="cursor-pointer flex-shrink-0"
        />
      </div>

      {workoutDetails && (
        <div className="w-full mt-1 border-t border-gray-100 pt-2 pb-4">
          <Workout {...workoutDetails} />
        </div>
      )}

      <button
        onClick={async () => {
          if (!workoutDetails) {
            try {
              const res = await getWorkout({ id });
              setWorkoutDetails(res);
            } catch (err) {
              console.log(err);
            }
          } else {
            setWorkoutDetails(null);
          }
        }}
        className="text-[#AAAAAA] text-xs cursor-pointer absolute right-4 bottom-2 p-1"
      >
        See {`${workoutDetails ? 'Less' : 'More'}`}
      </button>
    </div>
  );
};

const Workout = ({ blocks }: IWorkoutDetails) => {
  const { exercises } = useSelector(workoutList);

  const indexToLetter = (index: number) => String.fromCharCode(97 + index);

  return (
    <div className="mb-3">
      {blocks.map(({ exercises: blockExercises }, blockIdx) => {
        return (
          <div
            key={blockIdx}
            className="flex odd:bg-[#F3F2F2] even:bg-white p-2"
          >
            <p className="font-nunito font-bold text-body-text mr-2">
              {blockIdx + 1}
            </p>

            <div className="w-full space-y-1">
              {blockExercises.map(
                (
                  {
                    data: blockExerciseData,
                    exercise: blockExerciseId,
                    fields: blockExerciseFields,
                  },
                  blockExerciseIdx
                ) => {
                  const current = exercises.find(
                    (exercise, exerciseIdx) => exercise.id === blockExerciseId
                  );
                  const setCount = blockExerciseData.sets;
                  const repCount = blockExerciseData.reps ?? null;
                  const durationCount = blockExerciseData.duration ?? null;

                  return (
                    <div
                      key={blockExerciseIdx}
                      className="ml-1 flex justify-between font-semibold font-nunito text-body-text"
                    >
                      <p className="truncate mr-2 flex-1">
                        {blockExercises.length > 1 &&
                          `${indexToLetter(blockExerciseIdx)}. `}
                        {current?.label}
                      </p>
                      <p className="flex-shrink-0">
                        {setCount} x {repCount ?? durationCount}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutCard;
