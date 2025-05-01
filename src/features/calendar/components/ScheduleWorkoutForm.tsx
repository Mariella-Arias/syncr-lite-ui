// External Dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';
import WorkoutSearch from './WorkoutSearch';
import DatePickerField from './DatePickerField';

// Types
import { IScheduleWorkoutData } from '../../activity/types/activity.types';
import { IWorkout } from '../../workouts/types/workouts.types';

// Utils
import { getCalendarDate } from '../utils';

/**
 * ScheduleWorkoutForm Component
 *
 * Form for scheduling workouts on specific dates
 *
 * @param {Object} props Component props
 * @param {IWorkout[]} props.workouts List of available workouts to schedule
 * @param {Function} props.onSubmit Handler function for form submission
 * @param {Partial<IScheduleWorkoutData>} [props.initialValues] Optional initial values for editing existing scheduled workout
 */
const ScheduleWorkoutForm = ({
  workouts,
  onSubmit,
  initialValues,
}: {
  workouts: IWorkout[];
  onSubmit: (data: IScheduleWorkoutData) => Promise<void>;
  initialValues?: Partial<IScheduleWorkoutData>;
}) => {
  /**
   * Validation schema for the schedule workout form
   * - Name must be a valid workout from the provided list
   * - Date is required
   */
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please select a workout')
      .test(
        'is-valid-workout',
        'Please select a workout from the list',
        function (value) {
          // Verify the entered name matches a workout in the workouts array
          return workouts.some((workout) => workout.name === value);
        }
      ),
    date: Yup.string().required('Please select a date'),
  });

  /**
   * Calculate today's date in UTC format to use as default
   * Adjusts for timezone offset to ensure consistent date representation
   */
  const todayInUtc = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  );

  /**
   * Default form values
   * - Empty workout name
   * - Today's date in calendar format
   */
  const defaultValues: IScheduleWorkoutData = {
    name: '',
    date: getCalendarDate(todayInUtc),
  };

  /**
   * Combine default values with any provided initial values
   * Used for editing existing scheduled workouts
   */
  const formInitialValues: IScheduleWorkoutData = {
    ...defaultValues,
    ...initialValues,
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // Submit form data to parent handler
          await onSubmit(values);
        } finally {
          // Reset form state regardless of submission result
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="flex flex-col h-full">
            {/* Form Fields Container */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Workout Selection Field */}
              <div className="flex flex-col w-full gap-1">
                <label className="text-lg text-body-text font-semibold">
                  Workout Name
                </label>
                <Field
                  name="name"
                  placeholder="Add Workout"
                  component={WorkoutSearch}
                  options={workouts}
                />

                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-550 text-sm"
                />
              </div>

              {/* Date Selection Field */}
              <div className="flex flex-col w-full gap-1">
                <label className="text-lg text-body-text font-semibold">
                  To Complete On:
                </label>
                <Field
                  name="date"
                  type="date"
                  component={DatePickerField}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-550 text-sm"
                />
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <Button
              type="submit"
              size="medium"
              className="text-lg"
            >
              <div className="flex items-center justify-center h-full w-full">
                {isSubmitting ? (
                  <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
                ) : (
                  <span className="text-lg">Schedule</span>
                )}
              </div>
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ScheduleWorkoutForm;
