// React Imports
import { useState } from 'react';

// UI Components
import Button from '../../../components/common/Button';

/**
 * DeleteExerciseModal Component
 *
 * Confirmation dialog that requires explicit user confirmation
 * before permanently deleting an exercise.
 *
 * @param {Object} props Component props
 * @param {string} props.exerciseName Name of the exercise to be deleted
 * @param {Function} props.onCancel Handler function when deletion is canceled
 * @param {Function} props.onDelete Async handler function to process deletion
 * @returns React component for exercise deletion confirmation
 */
const DeleteExerciseModal = ({
  exerciseName,
  onCancel,
  onDelete,
}: {
  exerciseName: string;
  onCancel: () => void;
  onDelete: () => Promise<void>;
}) => {
  // Track submission state for loading indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-1">
      {/* Modal Header */}
      <p className="font-nunito text-2xl font-bold self-center mt-2 mb-3">
        Delete Exercise
      </p>

      {/* Warning Message */}
      <p>Are you sure you want to delete "{exerciseName}"?</p>
      <p>This cannot be undone.</p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-3">
        {/* Cancel Button */}
        <Button
          onClick={() => onCancel()}
          size="medium"
          intent="outlined"
          className="flex-1"
        >
          Cancel
        </Button>

        {/* Delete Button with Loading State */}
        <Button
          onClick={async () => {
            setIsSubmitting(true);
            try {
              // Execute delete operation
              await onDelete();
            } finally {
              // Reset loading state regardless of outcome
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
