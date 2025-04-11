// External dependencies
import { useDispatch } from 'react-redux';

// Redux
import { updateActivityHistory } from '../activitySlice';

// API hooks
import { useActivityApi } from './useActivityApi';

// Types
import { AppDispatch } from '../../../app/store';

/**
 * Custom hook for managing activity history
 *
 * Provides functionality to fetch and update the user's
 * complete workout activity history in the Redux store
 */
export const useActivityHistory = () => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();

  // API HOOKS
  const { getActivityHistory } = useActivityApi();

  /**
   * Fetches the complete activity history
   * and updates the Redux store with the results
   */
  const setActivityHistory = async () => {
    const response = await getActivityHistory();

    dispatch(updateActivityHistory(response));
  };

  return { setActivityHistory };
};
