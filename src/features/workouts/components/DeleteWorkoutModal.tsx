// React Imports
import { useState } from 'react';

// UI Components
import Button from '../../../components/common/Button';

/**
 * DeleteWorkoutModal Component
 *
 * Confirmation dialog that requires explicit user confirmation
 * before permanently deleting a workout.
 *
 * @param {Object} props Component props
 * @param {string} props.workoutName Name of the workout to be deleted
 * @param {Function} props.onCancel Handler function when deletion is canceled
 * @param {Function} props.onDelete Async handler function to process deletion
 * @returns React component for workout deletion confirmation
 */
const DeleteWorkoutModal = ({
  workoutName,
  onCancel,
  onDelete,
}: {
  workoutName: string;
  onCancel: () => void;
  onDelete: () => Promise<void>;
}) => {
  // Track submission state for loading indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-1">
      {/* Modal Header */}
      <p className="font-nunito text-2xl font-bold self-center mt-3 mb-4">
        Delete Workout
      </p>
      {/* Warning Message */}
      <p className="text-body-text">
        Are you sure you want to delete "{workoutName}"?
      </p>
      <p className="text-body-text">This action cannot be undone.</p>

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

export default DeleteWorkoutModal;
