import { useState } from 'react';
import Button from '../../../components/common/Button';

const DeleteExerciseModal = ({
  exerciseName,
  onCancel,
  onDelete,
}: {
  exerciseName: string;
  onCancel: () => void;
  onDelete: () => Promise<void>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-1">
      <p className="font-nunito text-2xl font-bold self-center mt-2 mb-3">
        Delete Exercise
      </p>
      <p>Are you sure you want to delete "{exerciseName}"?</p>
      <p>This cannot be undone.</p>
      <div className="flex gap-4 mt-3">
        <Button
          onClick={() => onCancel()}
          size="medium"
          intent="outlined"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setIsSubmitting(true);
            try {
              await onDelete();
            } finally {
              setIsSubmitting(false);
            }
          }}
          size="medium"
          className="flex-1"
        >
          <div className="flex items-center justify-center h-full w-full">
            {isSubmitting ? (
              <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
            ) : (
              <span className="text-lg">Delete</span>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DeleteExerciseModal;
