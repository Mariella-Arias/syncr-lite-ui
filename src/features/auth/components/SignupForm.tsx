// React Imports
import { useState } from 'react';

// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';
import PasswordInputField from './PasswordInputField';

// Types
import { IUserCreate } from '../types/auth.types';

/**
 * Signup Form Component
 *
 * Provides a user registration form:
 * - Collects user profile information
 * - Implements password validation
 * - Supports password visibility toggle
 * - Handles form submission and validation
 */
const SignupForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: IUserCreate) => Promise<void>;
}) => {
  // FORM CONFIGURATIION
  // Password Field Visibility States
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const [rePasswordFieldType, setRePasswordFieldType] = useState('password');

  // Validation Schema
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@$!%*?&)'
      )
      .required('Password is required'),
    re_password: Yup.string().required('Password required'),
  });

  // Initial Form Values
  const userProfile: IUserCreate = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
  };

  return (
    <Formik
      initialValues={userProfile}
      validationSchema={SignupSchema}
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
      {({ isSubmitting }) => {
        return (
          <Form className="flex flex-col w-full gap-2 mb-3">
            {/* First Name Input */}
            <div className="flex flex-col w-full">
              <Field
                type="text"
                name="first_name"
                placeholder="First Name"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>

            {/* Last Name Input */}
            <div className="flex flex-col w-full">
              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col w-full">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col w-full">
              <Field
                name="password"
                type={passwordFieldType}
                setType={setPasswordFieldType}
                component={PasswordInputField}
                placeholder="Create Password"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg relative w-full"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col w-full">
              <Field
                name="re_password"
                type={rePasswordFieldType}
                setType={setRePasswordFieldType}
                component={PasswordInputField}
                placeholder="Confirm Password"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
              />
              <ErrorMessage
                name="re_password"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="medium"
              disabled={isSubmitting}
            >
              <div className="flex items-center justify-center h-full w-full">
                {isSubmitting ? (
                  <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
                ) : (
                  <span className="text-lg">Sign Up</span>
                )}
              </div>
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignupForm;
