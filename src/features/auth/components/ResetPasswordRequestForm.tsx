// External Dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';

/**
 * Reset Password Request Form Component
 *
 * Provides a form for initiating password reset:
 * - Collects user email
 * - Implements email validation
 * - Handles form submission for password reset request
 */
const ResetPasswordRequestForm = ({
  handleSubmit,
}: {
  handleSubmit: (username: Record<string, string>) => Promise<void>;
}) => {
  // FORM CONFIGURATION
  // Initial Form Values
  const initialValues = {
    email: '',
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
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
        <Form className="flex flex-col w-full gap-3 mb-3">
          {/* Email Input */}
          <div className="flex flex-col w-full">
            <Field
              type="email"
              name="email"
              placeholder="Enter email"
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>

          {/* Submit Button */}
          <Button
            size="medium"
            type="submit"
            disabled={isSubmitting}
          >
            <div className="flex items-center justify-center h-full w-full">
              {isSubmitting ? (
                <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
              ) : (
                <span className="text-lg">Send Reset Link</span>
              )}
            </div>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordRequestForm;
