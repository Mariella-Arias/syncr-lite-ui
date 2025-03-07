import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';
import WorkoutSearch from './WorkoutSearch';
import DatePickerField from './DatePickerField';
import { getCalendarDate } from '../utils';
import { IScheduleWorkoutData } from '../types/calendar.types';
import { IWorkout } from '../../workouts/types/workouts.types';

const ScheduleWorkoutForm = ({
  workouts,
  onSubmit,
}: {
  workouts: IWorkout[];
  onSubmit: (data: IScheduleWorkoutData) => Promise<void>;
}) => {
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

  const todayInUtc = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  );

  const initialValues: IScheduleWorkoutData = {
    name: '',
    date: getCalendarDate(todayInUtc),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await onSubmit(values);
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="flex flex-col h-full">
            <div className="flex-1 flex flex-col gap-4">
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
              <div className="flex flex-col w-full gap-1">
                <label className="text-lg text-body-text font-semibold">
                  To Complete On:
                </label>
                <Field name="date" type="date" component={DatePickerField} />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-550 text-sm"
                />
              </div>
            </div>
            <Button type="submit" size="medium" className="text-lg">
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
