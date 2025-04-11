// External dependencies
import { useDispatch } from 'react-redux';

// Redux state and actions
import { setScheduledWorkouts } from '../calendarSlice';
import { AppDispatch } from '../../../app/store';

// API hooks
import { useActivityApi } from '../../activity/hooks/useActivityApi';

// Utilities
import { getCalendarDate, getCalendarDays } from '../utils';

/**
 * Custom hook for managing calendar activity data
 *
 * Provides functionality to fetch and update activity data
 * for the entire calendar period (6 weeks/42 days)
 */
export const useCalendarActivity = () => {
  // HOOKS
  const { getActivityPeriod } = useActivityApi();
  const dispatch: AppDispatch = useDispatch();

  // INITIALIZATION
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate the full calendar period
  const calendarDays = getCalendarDays(today);

  // Calculate start and end dates for the calendar period
  const startDate: Date = calendarDays[0].date;
  const startDateStr: string = getCalendarDate(startDate);
  const endDate: Date = calendarDays[calendarDays.length - 1].date;
  const endDateStr: string = getCalendarDate(endDate);

  /**
   * Fetches activity data for the entire calendar period
   * and updates the Redux store with the results
   */
  const setScheduledActivity = async () => {
    const response = await getActivityPeriod({
      start_date: startDateStr,
      end_date: endDateStr,
    });

    dispatch(setScheduledWorkouts(response));
  };

  return { setScheduledActivity };
};
