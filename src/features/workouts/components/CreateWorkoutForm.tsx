// External Dependencies
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';
import ExerciseSearch from './ExerciseSearch';

// Types
import {
  INewExerciseData,
  IWorkoutData,
  IExercise,
} from '../types/workouts.types';

/**
 * Converts a string to title case
 * @param {string} str - String to convert
 * @returns {string} Title cased string
 */
const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * CreateWorkoutForm - Form component for creating and editing workouts
 *
 * @param {Object} props Component props
 * @param {IExercise[]} props.options Available exercise options
 * @param {Function} props.handleSubmit Function to handle form submission
 * @param {Function} props.deleteExercise Function to delete an exercise
 * @param {Function} props.createExercise Function to create a new exercise
 * @param {IWorkoutData} [props.initialValues] Optional initial values for editing existing workout
 */
const CreateWorkoutForm = ({
  options,
  handleSubmit,
  deleteExercise,
  createExercise,
  initialValues,
}: {
  options: IExercise[];
  handleSubmit: (values: IWorkoutData) => Promise<void>;
  deleteExercise: (exercise: IExercise) => Promise<void>;
  createExercise: (data: INewExerciseData) => Promise<void>;
  initialValues?: IWorkoutData;
}) => {
  /**
   * Validation schema for exercise data (sets, reps, duration)
   * - Sets are required and must be at least 1
   * - Either reps or duration must be provided
   */
  const dataSchema = Yup.object().shape({
    sets: Yup.number().required('Add sets').min(1, 'Add valid sets'),
    reps: Yup.number()
      .nullable()
      .min(1, 'Add reps')
      .test('reps-validation', 'Reps required', function (reps) {
        const { duration } = this.parent as { duration?: number | null };
        // If no duration is provided, reps must be provided
        if ((!duration || duration <= 0) && (!reps || reps <= 0)) {
          return false;
        }
        return true;
      }),
    duration: Yup.number()
      .nullable()
      .min(1, 'Add duration')
      .test('duration-validation', 'Duration required', function (duration) {
        const { reps } = this.parent as { reps?: number | null };
        // If no reps are provided, duration must be provided
        if ((!reps || reps <= 0) && (!duration || duration <= 0)) {
          return false;
        }
        return true;
      }),
  });

  /**
   * Validation schema for exercise entries
   * - Exercise name is required
   * - Fields array must have at least one field
   * - Data must conform to dataSchema
   */
  const exerciseSchema = Yup.object().shape({
    exercise: Yup.string().required('Add exercise'),
    fields: Yup.array().of(Yup.string()).min(1),
    data: dataSchema,
  });

  /**
   * Validation schema for workout blocks
   * - Each block must have at least one exercise
   */
  const blockSchema = Yup.object().shape({
    exercises: Yup.array().of(exerciseSchema).min(1).required('Required field'),
  });

  /**
   * Validation schema for the entire workout form
   * - Name is required
   * - Must have at least one block
   */
  const workoutSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    blocks: Yup.array()
      .of(blockSchema)
      .min(1, 'Add at least one block')
      .required('Blocks field is required'),
  });

  /**
   * Default initial values for a new workout
   */
  const defaultValues: IWorkoutData = {
    name: '',
    blocks: [],
  };

  const formInitialValues: IWorkoutData = {
    ...defaultValues,
    ...initialValues,
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={workoutSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // Transform exercise references from labels to IDs for API submission
          const transformedValues = {
            ...values,
            name: toTitleCase(values.name.trim()),
            blocks: values.blocks.map((block) => ({
              ...block,
              exercises: block.exercises.map((exercise) => ({
                ...exercise,
                exercise:
                  options.find((option) => option.label === exercise.exercise)
                    ?.id || exercise.exercise,
              })),
            })),
          };

          await handleSubmit(transformedValues);
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ isSubmitting, values }) => {
        return (
          <Form className="flex flex-col h-full">
            {/* Main form content */}
            <div className="flex flex-col flex-1 gap-4">
              {/* Workout Name Field */}
              <div className="flex flex-col w-full gap-1">
                <label className="text-lg text-body-text font-semibold">
                  Workout Name
                </label>
                <Field
                  name="name"
                  autoComplete="off"
                  placeholder="Enter workout name"
                  className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-550 text-sm"
                />
              </div>

              {/* Blocks Array - Manages workout blocks */}
              <div className="flex flex-col w-full gap-1 mb-4">
                <FieldArray name="blocks">
                  {({ push: pushBlock, remove: removeBlock }) => {
                    return (
                      <div className="flex flex-col gap-1">
                        <label className="text-lg text-body-text font-semibold">
                          Exercise Blocks
                        </label>

                        {/* Map through all blocks */}
                        {values.blocks.map((block, blockIdx) => {
                          return (
                            <div key={blockIdx}>
                              {/* Exercises Array - Manages exercises within each block */}
                              <FieldArray name={`blocks.${blockIdx}.exercises`}>
                                {({
                                  push: pushExercise,
                                  remove: removeExercise,
                                }) => {
                                  return (
                                    <div className="border-1 border-input-border rounded-[10px] px-5 pb-5 flex flex-col gap-2 mb-4 shadow-md">
                                      {/* Block Header with Remove Block Button */}
                                      <div className="flex items-center justify-between mt-4">
                                        <p className="text-lg text-body-text font-semibold">
                                          Block {blockIdx + 1}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() => removeBlock(blockIdx)}
                                          className="h-10 w-10  text-body-text text-2xl p-2 flex items-center justify-center rounded-full hover:bg-neutral-100"
                                        >
                                          &times;
                                        </button>
                                      </div>

                                      {/* Map through all exercises in the current block */}
                                      {block.exercises.map(
                                        (exercise, exerciseIdx) => {
                                          // Find the selected exercise from options
                                          const selectedExercise =
                                            typeof exercise.exercise ===
                                              'string' &&
                                            exercise.exercise.length > 0
                                              ? options.find((option) => {
                                                  if (
                                                    option.label ===
                                                    exercise.exercise
                                                  ) {
                                                    return option.tracking_param;
                                                  }
                                                })
                                              : null;

                                          // Generate a label for the exercise (e.g., "1A", "1B")
                                          const blockExerciseLabel =
                                            blockIdx +
                                            1 +
                                            String.fromCharCode(
                                              exerciseIdx + 65
                                            );

                                          return (
                                            <div
                                              key={blockExerciseLabel}
                                              className="flex flex-col gap-3"
                                            >
                                              <div className="flex flex-col gap-1">
                                                <label className="text-lg text-body-text font-semibold">
                                                  {blockExerciseLabel}
                                                </label>

                                                {/* Exercise Selection Field */}
                                                <div className="flex items-start">
                                                  <div className="w-full relative rounded-[10px]">
                                                    <Field
                                                      name={`blocks.${blockIdx}.exercises.${exerciseIdx}.exercise`}
                                                      component={ExerciseSearch}
                                                      options={options}
                                                      placeholder="Add Exercise"
                                                      onDeleteExercise={
                                                        deleteExercise
                                                      }
                                                      createExercise={
                                                        createExercise
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name={`blocks.${blockIdx}.exercises.${exerciseIdx}.exercise`}
                                                      component="div"
                                                      className="text-red-550 text-sm"
                                                    />
                                                  </div>
                                                  {/* Remove Exercise Button (not shown for first exercise) */}
                                                  {exerciseIdx > 0 && (
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        removeExercise(
                                                          exerciseIdx
                                                        )
                                                      }
                                                      className="h-10 w-10  text-body-text text-2xl p-2 flex items-center justify-center rounded-full hover:bg-neutral-100"
                                                    >
                                                      &times;
                                                    </button>
                                                  )}
                                                </div>
                                              </div>

                                              {/* Exercise Fields (sets, reps, duration, etc.) */}
                                              <div className="flex gap-5">
                                                {selectedExercise &&
                                                  values.blocks[
                                                    blockIdx
                                                  ].exercises[
                                                    exerciseIdx
                                                  ].fields.map(
                                                    (field: string) => {
                                                      return (
                                                        <div
                                                          key={field}
                                                          className="flex flex-col gap-1"
                                                        >
                                                          {/* Field Label (capitalized) */}
                                                          <label
                                                            className="text-lg text-body-text font-semibold"
                                                            htmlFor={`blocks.${blockIdx}.exercises.${exerciseIdx}.data.${field}`}
                                                          >
                                                            {field
                                                              .slice(0, 1)
                                                              .toUpperCase() +
                                                              field
                                                                .slice(1)
                                                                .toLowerCase()}
                                                          </label>
                                                          {/* Field Input */}
                                                          <Field
                                                            name={`blocks.${blockIdx}.exercises.${exerciseIdx}.data.${field}`}
                                                            type="number"
                                                            placeholder="0"
                                                            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
                                                          />
                                                          {/* Field Error Message */}
                                                          <ErrorMessage
                                                            name={`blocks.${blockIdx}.exercises.${exerciseIdx}.data.${field}`}
                                                            component="div"
                                                            className="text-red-550 text-sm"
                                                          />
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}

                                      {/* Add Exercise button */}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          pushExercise({
                                            exercise: '',
                                            fields: ['sets'],
                                            data: {
                                              sets: 1,
                                              reps: '',
                                              duration: '',
                                            },
                                          })
                                        }
                                        className="bg-input-border p-2 mt-2 text-lg text-body-text font-semibold rounded-[10px] shadow-md"
                                      >
                                        + Add Exercise
                                      </button>
                                    </div>
                                  );
                                }}
                              </FieldArray>
                            </div>
                          );
                        })}

                        {/* Add Block button */}
                        <button
                          type="button"
                          onClick={() =>
                            pushBlock({
                              exercises: [
                                {
                                  exercise: '',
                                  fields: ['sets'],
                                  data: { sets: 1, reps: '', duration: '' },
                                },
                              ],
                            })
                          }
                          className="border-2 border-dashed bg-[#F2F5F9] border-input-border p-2 text-lg text-body-text font-semibold rounded-[10px] w-full shadow-sm"
                        >
                          + Add Block
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
            </div>

            {/* Form Submit Button with Loading State */}
            <Button
              type="submit"
              size="medium"
              className="w-full text-lg"
            >
              <div className="flex items-center justify-center h-full w-full">
                {isSubmitting ? (
                  <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
                ) : (
                  <span className="text-lg">Create Workout</span>
                )}
              </div>
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateWorkoutForm;
