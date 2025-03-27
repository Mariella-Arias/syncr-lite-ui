import { useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { MoveRight } from 'lucide-react';

import CalendarDays from './CalendarDays';
import { getCalendarDays } from '../utils';

const MONTHS_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTHS_ABBREVIATED = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
];

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [weekIndex, setWeekIndex] = useState<number>(0);
  const calendarDays = getCalendarDays(today);

  const beginningOfWeek = weekIndex * 7;
  const endOfWeek = (weekIndex + 1) * 7;

  // Returns abbreviated month name: Jan
  const getAbbreviatedMonth = (monthIndex: number) => {
    return MONTHS_ABBREVIATED[monthIndex];
  };

  // Returns month name: January
  const getFullMonth = (date: Date) => {
    return MONTHS_FULL[date.getMonth()];
  };

  // Returns full year: MMMM
  const getYear = (date: Date) => {
    return date.getFullYear();
  };

  const weekStart = {
    month: getAbbreviatedMonth(calendarDays[beginningOfWeek].month),
    number: calendarDays[beginningOfWeek].number,
  };

  const weekEnd = {
    month:
      endOfWeek === 42
        ? getAbbreviatedMonth(calendarDays[endOfWeek - 1].month)
        : getAbbreviatedMonth(calendarDays[endOfWeek].month),
    number: calendarDays[endOfWeek - 1].number,
  };

  const navToToday = () => {};

  return (
    <div className="p-4">
      {/* COMPONENT HEADER */}
      <p className="font-nunito text-2xl font-bold mb-6">Upcoming Schedule</p>
      <p className="font-nunito text-xl font-semibold mb-2">
        {getFullMonth(today)} {getYear(today)}
      </p>

      <div
        id="calendar-container"
        className=""
      >
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
          <button onClick={() => navToToday()}>
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
        <div className="border border-input-border border-t-0 rounded-b-[10px]">
          <CalendarDays
            days={calendarDays.slice(beginningOfWeek, endOfWeek)}
            today={today}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
