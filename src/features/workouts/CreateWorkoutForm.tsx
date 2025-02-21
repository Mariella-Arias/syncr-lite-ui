import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/common/Button';

const CreateWorkoutForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: any) => Promise<void>;
}) => {
  const initialValues = {
    name: '',
    blocks: [],
  };
  const templateSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    blocks: Yup.array().min(1, 'Add at least one block'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={templateSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await handleSubmit(values);
          // TODO add success notification
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ isSubmitting, values }) => {
        return (
          <Form className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex flex-col w-full gap-1">
                <label className="text-lg text-body-text font-semibold">
                  Workout Name
                </label>
                <Field
                  name="name"
                  placeholder="Enter workout name"
                  className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
                />
              </div>

              <FieldArray name="blocks">
                {({ push: pushBlock, remove: removeBlock }) => {
                  return (
                    <div className="flex flex-col gap-1">
                      <label className="text-lg text-body-text font-semibold">
                        Exercise Blocks
                      </label>
                      {/* <div className="flex flex-col gap-5"> */}
                      {values.blocks.map((block, blockIdx) => (
                        <FieldArray name={`blocks.${blockIdx}.exercises`}>
                          {({ push: pushExercise, remove: removeExercise }) => {
                            return (
                              <div className="border-1 border-input-border rounded-[10px] px-5 pb-5 flex flex-col gap-2 mb-4">
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
                                    return (
                                      <div
                                        key={exerciseIdx}
                                        className="flex flex-col gap-3"
                                      >
                                        <div className="flex flex-col gap-1">
                                          {/* Exercise number */}
                                          <label className="text-lg text-body-text font-semibold">
                                            {blockIdx + 1}
                                            {String.fromCharCode(
                                              exerciseIdx + 65
                                            )}
                                          </label>

                                          {/* Exercise name + "x" button*/}
                                          <div className="flex items-start">
                                            <Field
                                              name="exercise"
                                              placeholder="Exercise Name"
                                              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
                                            />
                                            {exerciseIdx > 0 && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeExercise(blockIdx)
                                                }
                                                className="h-10 w-10  text-body-text text-2xl p-2 flex items-center justify-center rounded-full hover:bg-neutral-100"
                                              >
                                                &times;
                                              </button>
                                            )}
                                          </div>
                                        </div>

                                        {/* Sets and Reps fields */}
                                        <div className="flex w-full gap-5 mb-3">
                                          <div className="flex flex-col gap-1">
                                            <label className="text-lg text-body-text font-semibold">
                                              Sets
                                            </label>
                                            <Field
                                              name="sets"
                                              placeholder="0"
                                              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
                                            />
                                          </div>
                                          <div className="flex flex-col gap-1">
                                            <label className="text-lg text-body-text font-semibold">
                                              Reps
                                            </label>
                                            <Field
                                              name="reps"
                                              placeholder="0"
                                              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}

                                <button
                                  type="button"
                                  onClick={() =>
                                    pushExercise({
                                      exercise: null,
                                      sets: null,
                                      reps: null,
                                    })
                                  }
                                  className="bg-input-border p-2 text-lg text-body-text font-semibold rounded-[10px]"
                                >
                                  + Add Exercise
                                </button>
                              </div>
                            );
                          }}
                        </FieldArray>
                      ))}
                      {/* </div> */}
                      <button
                        type="button"
                        onClick={() =>
                          pushBlock({
                            exercises: [
                              {
                                exercise: null,
                                sets: null,
                                reps: null,
                              },
                            ],
                          })
                        }
                        className="border-2 border-dashed bg-[#F2F5F9] border-input-border p-2 text-lg text-body-text font-semibold rounded-[10px] w-full mb-4"
                      >
                        + Add Block
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <Button size="medium" className="w-full text-lg">
              Create Workout
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateWorkoutForm;
