// External Dependencies
import { useDroppable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

// Redux
import { workouts as workoutList } from '../../workouts/workoutsSlice';
import { calendar } from '../calendarSlice';

// Utils and Constants
import { getCalendarDate } from '../utils';
import { WEEKDAYS, MONTHS_ABBREVIATED } from '../constants';

// Types
import { IActivityEntry } from '../../activity/types/activity.types';
import { ICalendarDay } from '../types/calendar.types';

/**
 * CalendarDay Component
 *
 * Renders a single day cell in the calendar with:
 * 1. Day header showing date information
 * 2. List of scheduled workouts for the day
 * 3. Drag-and-drop target area for scheduling workouts
 *
 * @param index - Index of the day in the week (0-6)
 * @param day - Calendar day data
 * @param workoutsInDay - Activities scheduled for this day
 * @param onDelete - Function to handle workout deletion
 */
const CalendarDay = ({
  index,
  day,
  workoutsInDay,
  onDelete,
}: {
  index: number;
  day: ICalendarDay;
  workoutsInDay: IActivityEntry[];
  onDelete: (id: number) => void;
}) => {
  // REDUX
  const { workouts } = useSelector(workoutList);

  // Date calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayDate = new Date(day.date);
  dayDate.setHours(0, 0, 0, 0);

  const isPastDate = dayDate < today;
  const calendarDayId = getCalendarDate(day.date);

  // DND setup for droppable area
  const { isOver, setNodeRef } = useDroppable({
    id: calendarDayId,
    disabled: isPastDate,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver
          ? 'border-2  border-sky-450' // Highlight when dragging over
          : 'bg-white border-l border-r border-input-border border-t-0'
      } ${isPastDate ? 'opacity-50' : ''} ${
        index === 6 ? 'border-b rounded-b-[10px]' : '' // Add bottom border for last day of week
      }`}
    >
      {/* DAY HEADER - Shows day name and date */}
      <p
        className={`py-0.5 text-center ${
          dayDate.toDateString() === today.toDateString()
            ? 'bg-sky-450 text-white'
            : 'bg-sky-250'
        } `}
      >
        {dayDate.toDateString() === today.toDateString()
          ? 'Today'
          : WEEKDAYS[index % WEEKDAYS.length]}
        , {MONTHS_ABBREVIATED[day.month]} {day.number}
      </p>

      {/* DAY BODY - Contains scheduled workouts*/}
      <div className="flex items-center gap-1 min-h-12 flex-1 overflow-x-auto no-scrollbar">
        {workoutsInDay.map((workoutInDay, idx) => {
          // Find workout name from the ID in the activity entry
          const workoutName: string =
            workouts.find((workout) => workout.id === workoutInDay.workout)
              ?.name || '';

          return (
            <div
              key={idx}
              className={`bg-white rounded-[10px] shadow-md h-10 max-w-[200px] flex items-center justify-between border px-2 ${
                workoutInDay.completed === true
                  ? 'border-2 border-green-500'
                  : 'border-input-border'
              }`}
            >
              <p className="font-nunito font-bold min-w-0 flex-1 truncate">
                {workoutName}
              </p>

              {/* Delete button - only shown for current/future dates */}
              {!isPastDate && (
                <button
                  onClick={() => {
                    onDelete(workoutInDay.id);
                  }}
                  className="cursor-pointer rounded-[10px] p-2 -mr-2 hover:bg-neutral-100"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * CalendarDays Component
 *
 * Renders a scrollable list of calendar days with their scheduled workouts
 * Supports drag-and-drop interactions for scheduling workouts
 *
 * @param days - Array of calendar day objects to display
 * @param onActivityDelete - Function to handle activity deletion
 */
const CalendarDays = ({
  days,
  onActivityDelete,
}: {
  days: ICalendarDay[];
  onActivityDelete: (id: number) => Promise<void>;
}) => {
  // REDUX
  const { scheduledWorkouts: activity } = useSelector(calendar);

  return (
    <div className="flex-1 overflow-y-auto">
      {days.map((day, idx) => {
        // Find the workouts that are scheduled for the day
        const workoutsInDay = activity.filter(
          (activityEntry) =>
            activityEntry.date_scheduled === getCalendarDate(day.date)
        );

        return (
          <CalendarDay
            key={idx}
            index={idx}
            day={day}
            workoutsInDay={workoutsInDay}
            onDelete={onActivityDelete}
          />
        );
      })}
    </div>
  );
};

export default CalendarDays;
