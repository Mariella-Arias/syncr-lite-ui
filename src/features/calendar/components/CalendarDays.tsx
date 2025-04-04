import { useDroppable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

import { getCalendarDate } from '../utils';
import { calendar } from '../calendarSlice';
import { workouts as workoutList } from '../../workouts/workoutsSlice';
import { IActivityEntry } from '../../activity/types/activity.types';
import { ICalendarDay } from '../types/calendar.types';
import { WEEKDAYS, MONTHS_ABBREVIATED } from '../constants';

const CalendarDays = ({
  days,
  onActivityDelete,
}: {
  days: ICalendarDay[];
  onActivityDelete: (id: number) => Promise<void>;
}) => {
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
  const { workouts } = useSelector(workoutList);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayDate = new Date(day.date);
  dayDate.setHours(0, 0, 0, 0);

  const isPastDate = dayDate < today;
  const calendarDayId = getCalendarDate(day.date);

  const { isOver, setNodeRef } = useDroppable({
    id: calendarDayId,
    disabled: isPastDate,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver
          ? 'border-2  border-sky-450'
          : 'bg-white border-l border-r border-input-border border-t-0'
      } ${isPastDate ? 'opacity-50' : ''} ${
        index === 6 ? 'border-b rounded-b-[10px]' : ''
      }`}
    >
      {/* DAY HEADER */}
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

      {/* DAY BODY */}
      <div className="flex items-center gap-1 min-h-12 flex-1 overflow-x-auto no-scrollbar">
        {workoutsInDay.map((workoutInDay, idx) => {
          const workoutName: string =
            workouts.find((workout) => workout.id === workoutInDay.workout)
              ?.name || '';

          return (
            <div
              key={idx}
              className="bg-white rounded-[10px] shadow-md w-37 h-10 flex items-center justify-between border border-input-border"
            >
              <p className="font-nunito font-bold ml-3 max-w-24 truncate">
                {workoutName}
              </p>

              {!isPastDate && (
                <button
                  onClick={() => {
                    onDelete(workoutInDay.id);
                  }}
                  className="cursor-pointer rounded-[10px] p-2 hover:bg-neutral-100"
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

export default CalendarDays;
