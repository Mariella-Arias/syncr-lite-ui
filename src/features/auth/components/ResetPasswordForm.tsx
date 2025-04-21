// React Imports
import { useState } from 'react';

// External Dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';
import PasswordInputField from './PasswordInputField';

// Types
import { IResetPasswordFormData } from '../types/auth.types';

/**
 * Reset Password Form Component
 *
 * Provides a form for password reset:
 * - Requires new password input with confirmation
 * - Supports password visibility toggle
 * - Implements strict password strength validation
 * - Handles form submission
 */
const ResetPasswordForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: IResetPasswordFormData) => Promise<void>;
}) => {
  // FORM CONFIGURATION
  // Password Field Visibility States
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const [rePasswordFieldType, setRePasswordFieldType] = useState('password');

  // Form Validation Schema
  const resetPasswordSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@$!%*?&)'
      )
      .required('Password is required'),
    re_new_password: Yup.string().required('Password required'),
  });

  return (
    <Formik
      initialValues={{
        new_password: '',
        re_new_password: '',
      }}
      validationSchema={resetPasswordSchema}
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
          {/* New Password Input Field */}
          <div className="flex flex-col w-full">
            <Field
              name="new_password"
              type={passwordFieldType}
              setType={setPasswordFieldType}
              component={PasswordInputField}
              placeholder="Create new password"
              className="border-input-border  border-1 rounded-[10px] py-2 px-3 text-lg w-full"
            />
            <ErrorMessage
              name="new_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>

          {/* Confirm New Password Input Fied */}
          <div className="flex flex-col w-full">
            <Field
              name="re_new_password"
              type={rePasswordFieldType}
              setType={setRePasswordFieldType}
              component={PasswordInputField}
              placeholder="Confirm new password"
              className="border-input-border  border-1 rounded-[10px] py-2 px-3 text-lg w-full"
            />
            <ErrorMessage
              name="re_new_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            size="medium"
          >
            <div className="flex items-center justify-center h-full w-full">
              {isSubmitting ? (
                <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
              ) : (
                <span className="text-lg">Reset Password</span>
              )}
            </div>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
