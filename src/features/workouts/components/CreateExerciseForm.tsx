// External Dependecies
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';

// Types
import { INewExercise } from '../types/workouts.types';

/**
 * CreateExerciseForm Component
 *
 * Form for adding a new exercise to the system
 *
 * @param {Object} props Component props
 * @param {string} props.initialName Initial value for the exercise name field
 * @param {Function} props.createExercise Function to handle exercise creation
 * @returns React component for creating a new exercise
 */
const CreateExerciseForm = ({
  initialName,
  createExercise,
}: {
  initialName: string;
  createExercise: (data: INewExercise) => Promise<void>;
}) => {
  /**
   * Validation schema for the exercise form
   * - Name: Required, alphanumeric with spaces only
   * - Parameter: Must be either 'reps' or 'duration'
   */
  const exerciseSchema = Yup.object().shape({
    name: Yup.string()
      .required('Exercise name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Invalid special character')
      .trim(),

    parameter: Yup.string()
      .required('Required')
      .oneOf(['reps', 'duration'], 'Required'),
  });

  return (
    <div className="flex flex-col gap-2 mt-1">
      {/* Form Header */}
      <p className="text-lg text-body-text font-semibold">
        Quick Add New Exercise
      </p>

      {/* Exercise Creation Form */}
      <Formik
        initialValues={{ name: initialName, parameter: 'reps' }}
        validationSchema={exerciseSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            // Create the new exercise
            await createExercise(values);
          } catch (err) {
            console.log(err);
          } finally {
            // Reset form fields regardless of outcome
            resetForm();
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => {
          /**
           * Handle form submission triggered by button click
           */
          const handleClick = async () => {
            handleSubmit();
          };

          return (
            <div className="flex flex-col gap-2">
              {/* Exercise Name Field */}
              <div>
                <Field
                  name="name"
                  autoComplete="off"
                  placeholder="Exercise Name"
                  className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-550 text-sm"
                />
              </div>

              {/* Tracking Parameter Field */}
              <div>
                <Field
                  name="parameter"
                  as="select"
                  placeholder="Select Tracking Unit"
                  className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
                >
                  <option value="reps">Reps</option>
                  <option value="duration">Duration</option>
                </Field>
                <ErrorMessage
                  name="parameter"
                  component="div"
                  className="text-red-550 text-sm"
                />
              </div>

              {/* Submit Button with Loading State */}
              <Button
                onClick={handleClick}
                size="medium"
                type="button"
                className=""
              >
                <div className="flex items-center justify-center h-full w-full">
                  {isSubmitting ? (
                    <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
                  ) : (
                    <span className="text-lg">Create Exercise</span>
                  )}
                </div>
              </Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateExerciseForm;
