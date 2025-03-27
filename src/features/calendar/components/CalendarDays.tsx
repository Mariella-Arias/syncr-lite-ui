import { useDroppable } from '@dnd-kit/core';

import { getCalendarDate } from '../utils';
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
  return (
    <div>
      {days.map((day, idx) => {
        return (
          <CalendarDay
            key={idx}
            index={idx}
            day={day}
          />
        );
      })}
    </div>
  );
};

const CalendarDay = ({ day, index }: { day: ICalendarDay; index: number }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: getCalendarDate(day.date),
  });

  const getAbbreviatedMonth = (index: number) => {
    return MONTHS_ABBREVIATED[index];
  };

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver
          ? 'border-2  border-sky-450'
          : 'bg-white border-input-border border-t-0'
      }`}
    >
      <div className="h-20">
        <p
          className={`py-0.5 text-center ${
            day.date.toDateString() === new Date().toDateString()
              ? 'bg-sky-450 text-white'
              : 'bg-sky-250'
          }`}
        >
          {day.date.toDateString() === new Date().toDateString()
            ? 'Today'
            : WEEKDAYS[index % WEEKDAYS.length]}
          , {getAbbreviatedMonth(day.month)} {day.number}
        </p>
      </div>
    </div>
  );
};

export default CalendarDays;
