// Types
import { ICalendarDay } from './types/calendar.types';

/**
 * Converts a Date object to a standardized date string in YYYY-MM-DD format
 *
 * @param date - The Date object (or null) to convert
 * @returns A formatted date string, or empty string if date is null
 */

export const getCalendarDate = (date: Date | null): string => {
  if (!date) return '';

  const locale = navigator.language;

  // Format the date components using Intl.DateTimeFormat for locale-aware formatting
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

/**
 * Generates an array of calendar day objects for a 6-week period (42 days)
 * starting from the beginning of the week containing the specified date
 *
 * @param date - The reference date for generating the calendar
 * @returns An array of 42 ICalendarDay objects
 */
export const getCalendarDays = (date: Date) => {
  // Create a copy of the input date to avoid modifying it
  const today = new Date(date);

  // Set currentDay to the first day (Sunday) of the weeks containing the reference date
  const currentDay = new Date(today.setDate(today.getDate() - today.getDay()));

  const days = [];

  // Generate 42 days (6weeks) starting from the calculated first day
  for (let day = 0; day < 42; day++) {
    const calendarDay: ICalendarDay = {
      currentMonth: currentDay.getMonth() === date.getMonth(), // Flag if day is in the current month
      date: new Date(currentDay), // Clone the date to avoid reference issues
      month: currentDay.getMonth(),
      number: currentDay.getDate(),
      year: currentDay.getFullYear(),
    };

    days.push(calendarDay);
    currentDay.setDate(currentDay.getDate() + 1); // Move to next day
  }

  return days;
};
