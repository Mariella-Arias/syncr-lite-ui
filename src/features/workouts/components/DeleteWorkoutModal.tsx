import { useState } from 'react';
import Button from '../../../components/common/Button';

const DeleteWorkoutModal = ({
  workoutName,
  onCancel,
  onDelete,
}: {
  workoutName: string;
  onCancel: () => void;
  onDelete: () => Promise<void>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-1">
      <p className="font-nunito text-2xl font-bold self-center mt-3 mb-4">
        Delete Workout
      </p>
      <p className="text-body-text">
        Are you sure you want to delete "{workoutName}"?
      </p>
      <p className="text-body-text">This action cannot be undone.</p>
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

export default DeleteWorkoutModal;
