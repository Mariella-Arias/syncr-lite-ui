import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ children, id }: { children: ReactNode; id: number }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver
          ? 'border-2  border-sky-450'
          : 'bg-white border-input-border border-t-0'
      }`}
    >
      {children}
    </div>
  );
};

export default Droppable;
