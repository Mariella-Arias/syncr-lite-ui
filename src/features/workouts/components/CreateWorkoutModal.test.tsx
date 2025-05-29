/**
 * @vitest-environment jsdom
 */
import { describe, test, vi, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CreateWorkoutModal from './CreateWorkoutModal';
import workoutsReducer from '../workoutsSlice';

vi.mock('./CreateWorkoutForm', () => ({
  default: ({ handleSubmit, deleteExercise, createExercise, options }) => (
    <div data-testid="create-workout-form">
      <div data-testid="form-props">
        {JSON.stringify({
          hasHandleSubmit: typeof handleSubmit === 'function',
          hasDeleteExercise: typeof deleteExercise === 'function',
          hasCreateExercise: typeof createExercise === 'function',
          optionsCount: options?.length || 0,
        })}
      </div>
      <button
        onClick={() =>
          handleSubmit({
            name: 'Test Workout',
            blocks: [
              {
                exercises: [
                  {
                    exercise: 'Single Leg Deadlift',
                    fields: ['sets', 'reps'],
                    data: { sets: 3, reps: 10, duration: '' },
                  },
                ],
              },
            ],
          })
        }
        data-testid="mock-submit"
      >
        Mock Submit
      </button>
    </div>
  ),
}));

vi.mock('../hooks/useWorkoutsApi', () => ({
  useWorkoutsApi: () => ({
    createWorkout: vi.fn().mockResolvedValue({}),
    getWorkouts: vi.fn().mockResolvedValue([]),
    createExercise: vi.fn(),
    deleteExercise: vi.fn(),
    getExercises: vi.fn(),
  }),
}));

vi.mock('../../calendar/hooks/useCalendarActivity', () => ({
  useCalendarActivity: () => ({ setSchedule: vi.fn() }),
}));

vi.mock('../../activity/hooks/useActivityHistory', () => ({
  useActivityHistory: () => ({ setActivityHistory: vi.fn() }),
}));

vi.mock('../../../context/ModalsContext', () => ({
  useSlideInModalContext: () => ({ close: vi.fn() }),
  useCenteredModalContext: () => ({ open: vi.fn(), close: vi.fn() }),
}));

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      workouts: workoutsReducer,
    },
    preloadedState: {
      workouts: {
        workouts: [],
        exercises: [
          {
            id: 1,
            label: 'Single Leg Deadlift',
            value: 'single leg deadlift',
            tracking_param: 'reps',
            is_editable: false,
            user: 1,
          },
          {
            id: 2,
            label: 'Squats',
            value: 'squats',
            tracking_param: 'reps',
            is_editable: false,
            user: 1,
          },
        ],
      },
    },
  });
};

const renderModal = () => {
  const store = createMockStore();

  return render(
    <Provider store={store}>
      <CreateWorkoutModal />
    </Provider>
  );
};

describe('Create Workout Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('renders modal with correct title and form', () => {
    renderModal();

    expect(screen.getByText('New Workout')).toBeTruthy();
    expect(screen.getByTestId('create-workout-form')).toBeTruthy();
  });

  test('passes correct props to CreateWorkoutForm', () => {
    renderModal();

    const formProps = JSON.parse(
      screen.getByTestId('form-props').textContent || ''
    );

    expect(formProps.hasHandleSubmit).toBe(true);
    expect(formProps.hasDeleteExercise).toBe(true);
    expect(formProps.hasCreateExercise).toBe(true);
    expect(formProps.optionsCount).toBe(2);
  });

  test('handles workout creation successfully', async () => {
    const mockToast = await import('react-hot-toast');

    renderModal();

    const submitButton = screen.getByTestId('mock-submit');
    submitButton.click();

    await waitFor(() => {
      expect(mockToast.default.success).toHaveBeenCalledWith(
        'Workout created successfully!',
        { duration: 4000, icon: '💪' }
      );
    });
  });
});
