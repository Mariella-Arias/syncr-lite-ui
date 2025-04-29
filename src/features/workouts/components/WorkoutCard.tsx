// React Imports
import { useState, useRef, RefObject, useEffect } from 'react';

// External Dependencies
import { useSelector } from 'react-redux';
import { GripVertical, EllipsisVertical, X, Check } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Redux
import { workouts as workoutList } from '../workoutsSlice';

// Hooks
import { useWorkoutsApi } from '../hooks/useWorkoutsApi';

// Types
import { IWorkout, IBlockData, IWorkoutData } from '../types/workouts.types';

/**
 * Props for the WorkoutCard component
 */
interface WorkoutCardProps {
  id: number;
  name: string;
  exercise_count: number;
  isDraggable: boolean;
  showCompletionControls: boolean;
  showMenu: boolean;
  eventHandlers?: {
    onDuplicateWorkout?: (workoutData: IWorkoutData) => void;
    onScheduleWorkout?: (workoutName: string) => void;
    onDeleteWorkout?: ({ id, name }: { id: number; name: string }) => void;
    onComplete?: () => Promise<void>;
    onRemove?: () => Promise<void>;
  };
  isCompleted?: boolean;
}

/**
 * Extended workout interface with blocks data
 */
interface IWorkoutDetails extends IWorkout {
  blocks: IBlockData[];
}

/**
 * Props for the Workout component (expanded workout details)
 */
interface WorkoutDetailsProps extends IWorkoutDetails {
  workoutRef: RefObject<HTMLDivElement>;
}

/**
 * WorkoutCard Component
 *
 * Displays a workout card with features:
 * 1. Drag and drop capability for scheduling
 * 2. Expandable workout details
 * 3. Completion controls for marking workouts done
 * 4. Optional menu for additional actions
 */
const WorkoutCard = ({
  id,
  name,
  exercise_count: count,
  isDraggable = false,
  showCompletionControls = false,
  showMenu = true,
  eventHandlers = {},
  isCompleted,
}: WorkoutCardProps) => {
  // DND KIT SETUP
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
    disabled: !isDraggable,
  });

  // LOCAL STATE
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [workoutDetails, setWorkoutDetails] = useState<IWorkoutDetails | null>(
    null
  );

  // API HOOKS
  const { getWorkout } = useWorkoutsApi();

  // REFS
  const workoutRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // DYNAMIC STYLES FOR DRAG AND DROP
  // Must use inline styles for transform values generated at runtime by dnd-kit
  const style = isDragging
    ? { opacity: 0.5 }
    : transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  // Close workout details when clicking outside
  useEffect(() => {
    if (!workoutDetails) return;

    const handleClickOutsideWorkout = (e: MouseEvent) => {
      if (
        workoutRef.current &&
        !workoutRef.current.contains(e.target as Node)
      ) {
        setWorkoutDetails(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideWorkout);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideWorkout);
    };
  }, [workoutDetails]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutsideMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMenu);

    return () =>
      document.removeEventListener('mousedown', handleClickOutsideMenu);
  }, [isMenuOpen]);

  return (
    <div
      ref={isDraggable ? setNodeRef : undefined}
      style={style} // Dynamic inline styles from dnd-kit (can't use Tailwind for these)
      className={`border-1 p-2  rounded-[10px] bg-white shadow-md flex flex-col min-w-60 w-full md:max-w-100 relative h-fit ${
        isCompleted !== undefined && isCompleted
          ? 'border-green-500'
          : 'border-input-border'
      }`}
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

        {/* Completion Controls */}
        {showCompletionControls && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (eventHandlers.onComplete) {
                  eventHandlers.onComplete();
                }
              }}
              className={`rounded-full p-1 ${
                isCompleted !== undefined && isCompleted
                  ? 'bg-green-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Check
                size={20}
                className={
                  isCompleted !== undefined && isCompleted
                    ? 'text-white'
                    : 'text-gray-500'
                }
              />
            </button>
            <button
              onClick={() => {
                if (eventHandlers.onRemove) {
                  eventHandlers.onRemove();
                }
              }}
              className={`rounded-full p-1 bg-gray-100 hover:bg-gray-200`}
            >
              <X
                size={20}
                className="text-gray-500"
              />
            </button>
          </div>
        )}

        {/* Menu Button */}
        {showMenu && (
          <div className="relative ">
            <EllipsisVertical
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
              size={24}
              className="cursor-pointer flex-shrink-0"
            />
            {isMenuOpen && (
              <WorkoutMenu
                workoutMenuRef={menuRef}
                onSchedule={() => {
                  if (eventHandlers.onScheduleWorkout)
                    eventHandlers.onScheduleWorkout(name);
                }}
                onDelete={() => {
                  if (eventHandlers.onDeleteWorkout)
                    eventHandlers.onDeleteWorkout({ id, name });
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {workoutDetails && (
        <div className="w-full mt-1 border-t border-gray-100 pt-2 pb-4">
          <Workout
            {...workoutDetails}
            workoutRef={workoutRef}
          />
        </div>
      )}

      {/* See More/Less Button */}
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

/**
 * Workout Component
 *
 * Displays expanded workout details with exercises grouped into blocks
 */
const Workout = ({ blocks, workoutRef }: WorkoutDetailsProps) => {
  const { exercises } = useSelector(workoutList);

  // Convert index to alphabetical label (0 → a, 1 → b, etc.)
  const indexToLetter = (index: number) => String.fromCharCode(97 + index);

  return (
    <div
      ref={workoutRef}
      className="mb-3"
    >
      {blocks.map(({ exercises: blockExercises }, blockIdx) => {
        return (
          <div
            key={blockIdx}
            className="flex odd:bg-[#F3F2F2] even:bg-white p-2"
          >
            {/* Block number */}
            <p className="font-nunito font-bold text-body-text mr-2">
              {blockIdx + 1}
            </p>

            {/* Block exercises */}
            <div className="w-full space-y-1">
              {blockExercises.map(
                (
                  { data: blockExerciseData, exercise: blockExerciseId },
                  blockExerciseIdx
                ) => {
                  const current = exercises.find(
                    (exercise) => exercise.id === blockExerciseId
                  );
                  const setCount = blockExerciseData.sets;
                  const repCount = blockExerciseData.reps ?? null;
                  const durationCount = blockExerciseData.duration ?? null;

                  return (
                    <div
                      key={blockExerciseIdx}
                      className="ml-1 flex justify-between font-semibold font-nunito text-body-text"
                    >
                      {/* Exercise name with alphabetical label if needed */}
                      <p className="truncate mr-2 flex-1">
                        {blockExercises.length > 1 &&
                          `${indexToLetter(blockExerciseIdx)}. `}
                        {current?.label}
                      </p>

                      {/* Sets × Reps/Duration */}
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

/**
 * WorkoutMenu Component
 *
 * Dropdown menu for workout actions (schedule, delete)
 */
const WorkoutMenu = ({
  workoutMenuRef,
  onSchedule,
  onDelete,
}: {
  workoutMenuRef: RefObject<HTMLDivElement>;
  onSchedule?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <div
      ref={workoutMenuRef}
      className="border border-body-text p-2 bg-white rounded-[10px] absolute shadow-md flex flex-col items-start left-1/2 -translate-x-full top1/2 -translate-y-1/2 z-20 my-2"
    >
      {/* Schedule Action */}
      <button
        onClick={() => {
          if (onSchedule) onSchedule();
        }}
        className={`text-body-text whitespace-nowrap py-1.5 px-2 w-full ${
          onSchedule
            ? 'hover:bg-[#F3F2F2] rounded-[10px]'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        Schedule Workout
      </button>

      {/* Delete Action */}
      <button
        onClick={() => {
          if (onDelete) onDelete();
        }}
        className={`text-red-550 whitespace-nowrap py-1.5 px-2 w-full text-start ${
          onDelete
            ? 'hover:bg-[#F3F2F2] rounded-[10px]'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        Delete Workout
      </button>
    </div>
  );
};

export default WorkoutCard;
