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
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // June 1, 2025
  const weekdayOfFirstDay = firstDayOfMonth.getDay(); // integer Sunday - Saturday :  0 - 6

  const currentDays = [];

  for (let daySlot = 0; daySlot < 42; daySlot++) {
    if (daySlot === 0 && weekdayOfFirstDay === 0) {
      // First day of the month is a Sunday
      // Shift beginning of calendar to - 1 week
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (daySlot === 0) {
      // First day of the month is not a Sunday
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - weekdayOfFirstDay);
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === date.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return currentDays;
};
