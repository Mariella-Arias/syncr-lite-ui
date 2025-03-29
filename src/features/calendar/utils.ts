import { ICalendarDay } from './types/calendar.types';

export const getCalendarDate = (date: Date | null): string => {
  if (!date) return '';

  const locale = navigator.language;

  const year = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);

  const month = new Intl.DateTimeFormat(locale, {
    month: '2-digit',
    timeZone: 'UTC',
  }).format(date);

  const day = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);

  return `${year}-${month}-${day}`;
};

export const getCalendarDays = (date: Date) => {
  const today = new Date(date);
  const currentDay = new Date(today.setDate(today.getDate() - today.getDay()));

  const days = [];

  for (let day = 0; day < 42; day++) {
    const calendarDay: ICalendarDay = {
      currentMonth: currentDay.getMonth() === date.getMonth(),
      date: new Date(currentDay),
      month: currentDay.getMonth(),
      number: currentDay.getDate(),
      year: currentDay.getFullYear(),
    };

    days.push(calendarDay);
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return days;
};
