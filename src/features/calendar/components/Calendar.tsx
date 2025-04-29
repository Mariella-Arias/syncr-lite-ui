// React Imports
import { useState } from 'react';

// External Dependencies
import { MoveLeft } from 'lucide-react';
import { MoveRight } from 'lucide-react';

// UI Components
import CalendarDays from './CalendarDays';

// Constants and Utils
import { MONTHS_ABBREVIATED, MONTHS_FULL } from '../constants';
import { getCalendarDays } from '../utils';

/**
 * Calendar Component
 *
 * Provides an interactive calendar view:
 * - Displays current month and year
 * - Allows navigation between weeks
 * - Shows calendar days with activities
 * - Supports deleting activities
 */
const Calendar = ({
  onDeleteActivity,
}: {
  onDeleteActivity: (id: number) => Promise<void>;
}) => {
  // INITIALIZATION
  // Current Date Setup
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Week Navigation State
  const [weekIndex, setWeekIndex] = useState<number>(0);
  const calendarSlots = getCalendarDays(today);

  // Current Week Calculation
  const startOfWeekIndex = weekIndex * 7;
  const weekStart = {
    month: MONTHS_ABBREVIATED[calendarSlots[startOfWeekIndex].month],
    number: calendarSlots[startOfWeekIndex].number,
  };

  // End of Current Week Calculation
  const endOfWeekIndex = (weekIndex + 1) * 7;
  const weekEnd = {
    month:
      endOfWeekIndex === 42
        ? MONTHS_ABBREVIATED[calendarSlots[endOfWeekIndex - 1].month]
        : MONTHS_ABBREVIATED[calendarSlots[endOfWeekIndex].month],
    number: calendarSlots[endOfWeekIndex - 1].number,
  };

  return (
    <div className="p-6 flex flex-col h-full">
      {/* Page Header */}
      <p className="font-nunito text-2xl font-bold mb-6">Upcoming Schedule</p>
      <p className="font-nunito text-xl font-semibold mb-2">
        {MONTHS_FULL[today.getMonth()]} {today.getFullYear()}
      </p>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between border border-input-border border-b-0 rounded-t-[10px] p-3">
        {/* Previous Week Button */}
        <button
          onClick={() => {
            if (weekIndex >= 1) {
              setWeekIndex((prev) => prev - 1);
            }
          }}
          className="rounded-full size-11 flex items-center justify-center hover:bg-neutral-100"
        >
          <MoveLeft />
        </button>

        {/* Week Range Display */}
        <p className="font-nunito text-base font-bold">
          Week of {weekStart.month} {weekStart.number}
          &nbsp; - &nbsp;
          {weekEnd.month} {weekEnd.number}
        </p>

        {/* Reset to Today Button */}
        <button onClick={() => setWeekIndex(0)}>
          <span className="text-body-text font-semibold text-base font-nunito">
            Today
          </span>
        </button>

        {/* Next Week Button */}
        <button
          onClick={() => {
            if (weekIndex <= 4) {
              setWeekIndex((prev) => prev + 1);
            }
          }}
          className="rounded-full size-11 flex items-center justify-center hover:bg-neutral-100"
        >
          <MoveRight />
        </button>
      </div>

      {/* CALENDAR TABLE */}
      <CalendarDays
        days={calendarSlots.slice(startOfWeekIndex, endOfWeekIndex)}
        onActivityDelete={onDeleteActivity}
      />
    </div>
  );
};

export default Calendar;
