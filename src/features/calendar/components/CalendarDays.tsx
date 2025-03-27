import { useDroppable } from '@dnd-kit/core';

import Droppable from './Droppable';

interface ICalendarDay {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  year: number;
}

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
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

const CalendarDays = ({
  days,
  today,
}: {
  days: ICalendarDay[];
  today: Date;
}) => {
  const getAbbreviatedMonth = (index: number) => {
    return MONTHS_ABBREVIATED[index];
  };

  return (
    <div>
      {days.map((day, idx) => {
        return (
          <Droppable
            key={idx}
            id={idx}
          >
            <div className="h-20">
              <p
                className={`py-0.5 text-center ${
                  day.date.toDateString() === today.toDateString()
                    ? 'bg-sky-450 text-white'
                    : 'bg-sky-250'
                }`}
              >
                {day.date.toDateString() === today.toDateString()
                  ? 'Today'
                  : WEEKDAYS[idx % WEEKDAYS.length]}
                , {getAbbreviatedMonth(day.month)} {day.number}
              </p>
            </div>
          </Droppable>
        );
      })}
    </div>
  );
};

export default CalendarDays;
