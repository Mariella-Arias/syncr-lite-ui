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
