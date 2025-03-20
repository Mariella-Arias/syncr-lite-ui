import { useDraggable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { CSS } from '@dnd-kit/utilities';

const Draggable = ({ children }: { children: ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = { transform: CSS.Translate.toString(transform) };

  //   const baseClasses = 'transform transition-transform duration-200 ease-in-out';

  return (
    // <div ref={setNodeRef} className="border rounded-md w-25 h-25">
    //   <p>Other content</p>
    <button
      ref={setNodeRef}
      style={style}
      className="bg-pink-50"
      //   className={baseClasses}
      //   style={
      //     transform
      //       ? {
      //           transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`,
      //         }
      //       : undefined
      //   }
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
    // </div>
  );
};

export default Draggable;
