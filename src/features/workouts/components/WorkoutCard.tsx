import { GripVertical, EllipsisVertical } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface WorkoutCardProps {
  id: number;
  name: string;
  exercise_count: number;
}

const WorkoutCard = ({ id, name, exercise_count: count }: WorkoutCardProps) => {
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

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.7 : 1,
        border: over ? '2px #41A4F2 solid' : '',
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-1 p-2 border-input-border rounded-[10px] shadow-md flex items-center justify-center w-60 h-24 relative overflow-hidden"
    >
      <div className="flex items-center gap-2 w-full">
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          <GripVertical
            color="#CECDCD"
            size={24}
            className="hover:cursor-grab flex-shrink-0"
          />
        </div>

        <div className="flex-1">
          <p className="font-nunito text-lg font-bold truncate max-w-40">
            {name}
          </p>
          <p className="font-nunito text-body-text text-sm">
            {count} exercises
          </p>
        </div>

        <EllipsisVertical
          size={24}
          className=" cursor-pointer"
        />
      </div>

      <button className="text-[#AAAAAA] text-xs cursor-pointer absolute right-4 bottom-1 p-1">
        See More
      </button>
    </div>
  );
};

export default WorkoutCard;
