// React Imports
import { useState } from 'react';

// External Dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';
import PasswordInputField from './PasswordInputField';

// Types
import { ILoginCredentials } from '../types/auth.types';

/**
 * LoginForm Component
 *
 * A form component that handles user login with email and password
 * Uses Formik for form management and Yup for validation
 *
 * @param {function} handleLogin - Function to process login submission
 */
const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (credentials: ILoginCredentials) => Promise<void>;
}) => {
  // LOCAL STATE
  const [fieldType, setFieldType] = useState('password');

  // FORM CONFIGURATION
  const initialValues: ILoginCredentials = {
    email: '',
    password: '',
  };

  // VALIDATION SCHEMA
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // Process login credentials
          await handleLogin(values);
        } finally {
          // Reset submission state
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col w-full gap-3 mb-3">
          {/* EMAIL FIELD */}
          <div className="flex flex-col w-full">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className=" border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>

          {/* PASSWORD FIELD */}
          <div className="flex flex-col w-full">
            <Field
              name="password"
              type={fieldType}
              setType={setFieldType}
              placeholder="Password"
              component={PasswordInputField} // Custom component for password input with visibility toggle
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            size="medium"
            disabled={isSubmitting}
          >
            <div className="flex items-center justify-center h-full w-full">
              {isSubmitting ? (
                <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
              ) : (
                <span className="text-lg">Log In</span>
              )}
            </div>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
