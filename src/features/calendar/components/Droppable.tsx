import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ children, id }: { children: ReactNode; id: string }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      //   className={`${isOver ? 'bg-green-100 rounded-md' : ''}`}
      className={`
        p-4 my-4 border-2 rounded-md min-h-[100px]
        ${
          isOver
            ? 'bg-green-100 border-green-500'
            : 'bg-gray-100 border-gray-300'
        }
      `}
    >
      {children}
    </div>
  );
};

export default Droppable;
