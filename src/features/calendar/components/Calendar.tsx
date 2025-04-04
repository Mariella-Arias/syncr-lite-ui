import { useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { MoveRight } from 'lucide-react';

import CalendarDays from './CalendarDays';
import { ICalendarDay } from '../types/calendar.types';
import { MONTHS_ABBREVIATED, MONTHS_FULL } from '../constants';

const Calendar = ({
  calendarDays,
  onDeleteActivity,
}: {
  calendarDays: ICalendarDay[];
  onDeleteActivity: (id: number) => Promise<void>;
}) => {
  const today = new Date();
  const [weekIndex, setWeekIndex] = useState<number>(0);

  // Start of current week
  const startOfWeekIndex = weekIndex * 7;
  const weekStart = {
    month: MONTHS_ABBREVIATED[calendarDays[startOfWeekIndex].month],
    number: calendarDays[startOfWeekIndex].number,
  };

  // End of current week
  const endOfWeekIndex = (weekIndex + 1) * 7;
  const weekEnd = {
    month:
      endOfWeekIndex === 42
        ? MONTHS_ABBREVIATED[calendarDays[endOfWeekIndex - 1].month]
        : MONTHS_ABBREVIATED[calendarDays[endOfWeekIndex].month],
    number: calendarDays[endOfWeekIndex - 1].number,
  };

  return (
    <div className="p-4 flex flex-col h-full">
      {/* COMPONENT HEADER */}
      <p className="font-nunito text-2xl font-bold mb-6">Upcoming Schedule</p>
      <p className="font-nunito text-xl font-semibold mb-2">
        {MONTHS_FULL[today.getMonth()]} {today.getFullYear()}
      </p>

      {/* CALENDAR HEADER */}
      <div className="flex items-center justify-between border border-input-border border-b-0 rounded-t-[10px] p-3">
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
        <p className="font-nunito text-base font-bold">
          Week of {weekStart.month} {weekStart.number}
          &nbsp; - &nbsp;
          {weekEnd.month} {weekEnd.number}
        </p>
        <button onClick={() => setWeekIndex(0)}>
          <span className="text-body-text font-semibold text-base font-nunito">
            Today
          </span>
        </button>
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
        days={calendarDays.slice(startOfWeekIndex, endOfWeekIndex)}
        onActivityDelete={onDeleteActivity}
      />
    </div>
  );
};

export default Calendar;
