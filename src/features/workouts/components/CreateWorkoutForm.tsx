import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';
import ExerciseSearch from './ExerciseSearch';
import {
  INewExerciseData,
  IWorkoutData,
  IExercise,
} from '../types/workouts.types';

const CreateWorkoutForm = ({
  options,
  handleSubmit,
  deleteExercise,
  createExercise,
}: {
  options: IExercise[];
  handleSubmit: (values: IWorkoutData) => Promise<void>;
  deleteExercise: (exercise: IExercise) => Promise<void>;
  createExercise: (data: INewExerciseData) => Promise<void>;
}) => {
  const initialValues: IWorkoutData = {
    name: '',
    blocks: [],
  };

  const dataSchema = Yup.object().shape({
    sets: Yup.number().required('Add sets').min(1, 'Add valid sets'),
    reps: Yup.number()
      .nullable()
      .min(1, 'Add reps')
      .test('reps-validation', 'Reps required', function (reps) {
        const { duration } = this.parent as { duration?: number | null };
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
        if ((!reps || reps <= 0) && (!duration || duration <= 0)) {
          return false;
        }
        return true;
      }),
  });

  const exerciseSchema = Yup.object().shape({
    exercise: Yup.string().required('Add exercise'),
    fields: Yup.array().of(Yup.string()).min(1),
    data: dataSchema,
  });

  const blockSchema = Yup.object().shape({
    exercises: Yup.array().of(exerciseSchema).min(1).required('Required field'),
  });

  const workoutSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    blocks: Yup.array()
      .of(blockSchema)
      .min(1, 'Add at least one block')
      .required('Blocks field is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={workoutSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const transformedValues = {
            ...values,
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
          // TODO add success notification
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ isSubmitting, values, errors }) => {
        return (
          <Form className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-4">
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

              <FieldArray name="blocks">
                {({ push: pushBlock, remove: removeBlock }) => {
                  return (
                    <div className="flex flex-col gap-1">
                      <label className="text-lg text-body-text font-semibold">
                        Exercise Blocks
                      </label>

                      {values.blocks.map((block, blockIdx) => {
                        return (
                          <div key={blockIdx}>
                            <FieldArray name={`blocks.${blockIdx}.exercises`}>
                              {({
                                push: pushExercise,
                                remove: removeExercise,
                              }) => {
                                return (
                                  <div className="border-1 border-input-border rounded-[10px] px-5 pb-5 flex flex-col gap-2 mb-4 shadow-md">
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

                                    {block.exercises.map(
                                      (exercise, exerciseIdx) => {
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

                                        const blockExerciseLabel =
                                          blockIdx +
                                          1 +
                                          String.fromCharCode(exerciseIdx + 65);

                                        return (
                                          <div
                                            key={blockExerciseLabel}
                                            className="flex flex-col gap-3"
                                          >
                                            <div className="flex flex-col gap-1">
                                              <label className="text-lg text-body-text font-semibold">
                                                {blockExerciseLabel}
                                              </label>

                                              {/* Exercise */}
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

                                            {/* Exercise Fields */}
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
                                                        <label className="text-lg text-body-text font-semibold">
                                                          {field
                                                            .slice(0, 1)
                                                            .toUpperCase() +
                                                            field
                                                              .slice(1)
                                                              .toLowerCase()}
                                                        </label>
                                                        <Field
                                                          name={`blocks.${blockIdx}.exercises.${exerciseIdx}.data.${field}`}
                                                          type="number"
                                                          placeholder="0"
                                                          className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
                                                        />
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
                                            // reps: null,
                                            // duration: null,
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
                                // data: { sets: 1, reps: null, duration: null },
                                data: { sets: 1, reps: '', duration: '' },
                              },
                            ],
                          })
                        }
                        className="border-2 border-dashed bg-[#F2F5F9] border-input-border p-2 text-lg text-body-text font-semibold rounded-[10px] w-full mb-4 shadow-sm"
                      >
                        + Add Block
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* Create Workout button */}
            <Button type="submit" size="medium" className="w-full text-lg">
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
