// Types
import { IActivityEntry } from './types/activity.types';

// Utils and Constants
import { MONTHS_FULL } from '../calendar/constants';
import { getCalendarDate } from '../calendar/utils';

/**
 * Interface representing activity entries grouped by month and year
 * @property activity - Object with month-year keys and arrays of activity entries
 * @property order - Array of month-year strings in chronological order
 */
interface IActivityByMonth {
  activity: { [key: string]: IActivityEntry[] };
  order: string[];
}

/**
 * Groups activity entries by month and year
 *
 * Takes an array of activity entries and organizes them into an object
 * where keys are month-year strings (e.g., "April 2025") and values are
 * arrays of activity entries that occurred in that month.
 *
 * @param activity - Array of activity entries to group
 * @returns An object containing the grouped activities and their order
 */
export const groupActivityByMonth = (activity: IActivityEntry[]) => {
  const activityByMonth: IActivityByMonth = {
    activity: {},
    order: [],
  };

  for (let i = 0; i < activity.length; i++) {
    // Parse the date from the activity entry
    const date = new Date(activity[i].date_scheduled);
    const dateStr = getCalendarDate(date);

    // Extract year and month from the date string (format: YYYY-MM-DD)
    const [year, month] = dateStr.split('-');
    const dateHeader: string = `${MONTHS_FULL[parseInt(month) - 1]} ${year}`;

    // Add the entry to the appropriate month group
    if (!activityByMonth.activity[dateHeader]) {
      // Create a new array if this is the first entry for this month
      activityByMonth.activity[dateHeader] = [activity[i]];
      activityByMonth.order.push(dateHeader);
    } else {
      // Add to existing array for this month
      activityByMonth.activity[dateHeader].push(activity[i]);
    }
  }

  return activityByMonth;
};
