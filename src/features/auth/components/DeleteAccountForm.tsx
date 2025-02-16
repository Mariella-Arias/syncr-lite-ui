import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';

const DeleteAccountForm = ({
  handleSubmit,
}: {
  handleSubmit: (data: Record<string, string>) => Promise<void>;
}) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await handleSubmit(values);
        } finally {
          resetForm();
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-2">
          <div className="flex flex-col w-full">
            <Field
              name="password"
              type="password"
              placeholder="Current password"
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>
          <Button type="submit" size="medium" disabled={isSubmitting}>
            <div className="flex items-center justify-center h-full w-full">
              {isSubmitting ? (
                <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
              ) : (
                <span className="text-lg">Delete</span>
              )}
            </div>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DeleteAccountForm;
