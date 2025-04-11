// Constants
import { MONTHS_ABBREVIATED } from '../../calendar/constants';

/**
 * ActivityItem Component
 *
 * Displays a single workout activity entry with:
 * 1. Completion status indicator (if applicable)
 * 2. Workout name
 * 3. Exercise count and formatted date
 *
 * @param name - Name of the workout
 * @param count - Number of exercises in the workout
 * @param date - Date when the workout was/will be performed
 * @param completed - Optional completion status (true/false/undefined)
 */
const ActivityItem = ({
  name,
  count,
  date,
  completed,
}: {
  name: string;
  count: number;
  date: Date;
  completed?: boolean;
}) => {
  return (
    <div className="border border-input-border rounded-[10px] p-4 flex items-center gap-4 mb-2">
      {/* Completion status indicator (only shown when completed status is provided) */}
      {completed !== undefined && (
        <div
          className={`size-4 rounded-full ${
            completed ? 'bg-green-500' : 'bg-red-200'
          }`}
        ></div>
      )}

      {/* Workout details */}
      <div>
        <p className="font-nunito text-lg font-bold">{name}</p>
        <p className="font-nunito text-body-text text-sm">
          {count} exercises - {MONTHS_ABBREVIATED[date.getMonth()]}{' '}
          {date.getDate()}, {date.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
