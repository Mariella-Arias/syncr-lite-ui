/**
 * @vitest-environment jsdom
 */
// External Dependencies
import { describe, test, vi, expect, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { FieldInputProps } from 'formik';

// UI Components
import CreateWorkoutForm from './CreateWorkoutForm';

// Redux
import authReducer from '../../auth/authSlice';

// Types
import { IExercise } from '../types/workouts.types';

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
        },
      },
    },
  });
};

// ExerciseSearch mock component
vi.mock('./ExerciseSearch', () => ({
  default: ({
    field,
    form,
    options,
    onDeleteExercise = vi.fn(),
    createExercise = vi.fn(),
    ...props
  }: {
    field: FieldInputProps<string>;
    form: {
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
      ) => Promise<void>;
      setFieldTouched: (
        field: string,
        isTouched?: boolean,
        shouldValidate?: boolean
      ) => Promise<void>;
    };
    options: IExercise[];
    onDeleteExercise: (exercise: any) => Promise<void>;
    createExercise: (data: any) => Promise<void>;
  }) => {
    const { name, value, onChange } = field;
    const { setFieldValue, setFieldTouched } = form;

    const handleExerciseClick = async (selectedOption: IExercise) => {
      try {
        // Parse field path to get indices
        const pathPieces = name.split('.');
        const blockIdx = parseInt(pathPieces[1]);
        const exerciseIdx = parseInt(pathPieces[3]);

        // Construct paths for form fields
        const fieldsPath = `blocks.${blockIdx}.exercises.${exerciseIdx}.fields`;
        const dataPath = `blocks.${blockIdx}.exercises.${exerciseIdx}.data`;
        const newFields = ['sets', selectedOption.tracking_param];

        // Update form fields in sequence
        await setFieldValue(name, selectedOption.label, true);
        await setFieldTouched(name, true, true);
        await setFieldValue(fieldsPath, newFields, true);
        await setFieldValue(
          `${dataPath}.${selectedOption.tracking_param}`,
          10,
          true
        );
        await setFieldTouched(fieldsPath, true, true);
        await setFieldTouched(
          `${dataPath}.${selectedOption.tracking_param}`,
          true,
          true
        );
      } catch (error) {
        console.error('Error updating form fields:', error);
      }
    };

    return (
      <div className="relative">
        <input
          {...field}
          {...props}
          data-testid="exercise-search"
          name={name}
          value={value || ''}
          onChange={onChange}
          // placeholder={placeholder || 'Add Exercise'}
          placeholder="Add Exercise"
          autoComplete="off"
        />

        {
          <div className="absolute w-full z-10">
            {options?.map((option) => (
              <div
                key={option.id}
                data-testid={`exercise-option-${option.value}`}
                onClick={() => handleExerciseClick(option)}
                className=""
              >
                {option.label}
              </div>
            ))}
          </div>
        }
      </div>
    );
  },
}));

describe('New Workout Form', () => {
  let mockHandleSubmit: any;
  let mockDeleteExercise: any;
  let mockCreateExercise: any;
  let mockExerciseOptions: any;

  beforeEach(() => {
    // Create fresh mocks for each test
    mockHandleSubmit = vi.fn();
    mockDeleteExercise = vi.fn();
    mockCreateExercise = vi.fn();

    // Mock exercise options
    mockExerciseOptions = [
      {
        id: 1,
        is_editable: false,
        label: 'Single Leg Deadlift',
        value: 'single leg deadlift',
        tracking_param: 'reps',
        user: null,
      },
      {
        id: 2,
        is_editable: false,
        label: 'Squats',
        value: 'squats',
        tracking_param: 'reps',
        user: null,
      },
      {
        id: 3,
        is_editable: false,
        label: 'Bulgarian Split Squat',
        value: 'bulgarian split squat',
        tracking_param: 'reps',
        user: null,
      },
    ];

    vi.clearAllMocks();
    cleanup();
  });

  const renderForm = ({
    options = mockExerciseOptions,
    handleSubmit = mockHandleSubmit,
    deleteExercise = mockDeleteExercise,
    createExercise = mockCreateExercise,
    initialValues = undefined,
  } = {}) => {
    const store = createMockStore();

    return render(
      <Provider store={store}>
        <CreateWorkoutForm
          options={options}
          handleSubmit={handleSubmit}
          deleteExercise={deleteExercise}
          createExercise={createExercise}
          initialValues={initialValues}
        />
      </Provider>
    );
  };

  test('renders form fields correctly', () => {
    renderForm({ options: [] });

    expect(screen.getByPlaceholderText('Enter workout name')).toBeTruthy();
    expect(screen.getByText('Workout Name')).toBeTruthy();
    expect(screen.getByText('Exercise Blocks')).toBeTruthy();
    expect(screen.getByText('+ Add Block')).toBeTruthy();
    expect(screen.getByText('Create Workout')).toBeTruthy();
  });

  test('validates required fields', async () => {
    renderForm({ options: [] });

    // Try to submit without any data
    const submitButton = screen.getByText('Create Workout');
    fireEvent.click(submitButton);

    // Should show validation error for workout name
    expect(await screen.findByText('Required field')).toBeTruthy();

    // Should not call handleSubmit
    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });

  test('submits workout data correctly', async () => {
    renderForm();

    // Fill workout name
    const nameInput = screen.getByPlaceholderText('Enter workout name');
    fireEvent.change(nameInput, { target: { value: 'test workout' } });

    // Add a block
    const addBlockButton = screen.getByText('+ Add Block');
    fireEvent.click(addBlockButton);

    // Select an exercise
    const exerciseOption = screen.getByTestId(
      'exercise-option-bulgarian split squat'
    );
    fireEvent.click(exerciseOption);

    await waitFor(() => {
      const exerciseInput = screen.getByTestId(
        'exercise-search'
      ) as HTMLInputElement;
      expect(exerciseInput.value).toBe('Bulgarian Split Squat');
    });

    // The form should now have default sets and reps values, submit form
    const submitButton = screen.getByText('Create Workout');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(mockHandleSubmit).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );

    // Verify the correct data was submitted
    expect(mockHandleSubmit).toHaveBeenCalledWith({
      name: 'Test Workout',
      blocks: [
        {
          exercises: [
            {
              exercise: 3,
              fields: ['sets', 'reps'],
              data: {
                sets: 1,
                reps: 10,
                duration: '',
              },
            },
          ],
        },
      ],
    });
  });
});
