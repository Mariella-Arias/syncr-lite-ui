// React Imports
import { useState } from 'react';

// External Dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// UI Components
import Button from '../../../components/common/Button';
import PasswordInputField from './PasswordInputField';

// Types
import { IDeleteAccountFormData } from '../types/auth.types';

/**
 * Delete Account Form Component
 *
 * Provides a form for account deletion confirmation:
 * - Requires current password input
 * - Supports password visibility toggle
 * - Handles form submission and cancellation
 */
const DeleteAccountForm = ({
  handleSubmit,
  onCancel,
}: {
  handleSubmit: (data: IDeleteAccountFormData) => Promise<void>;
  onCancel: () => void;
}) => {
  // FORM CONFIGURATION
  // Password Field Visibility State
  const [passwordFieldType, setPasswordFieldType] = useState('password');

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{ current_password: '' }}
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
        <Form className="flex flex-col gap-3">
          {/* Password Input Field */}
          <div className="flex flex-col w-full">
            <Field
              name="current_password"
              type={passwordFieldType}
              setType={setPasswordFieldType}
              component={PasswordInputField}
              placeholder="Current password"
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
            />
            <ErrorMessage
              name="current_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* Cancel Button */}
            <Button
              onClick={() => onCancel()}
              size="medium"
              intent="outlined"
              className="w-full"
            >
              Cancel
            </Button>

            {/* Delete Button */}
            <Button
              type="submit"
              size="medium"
              disabled={isSubmitting}
              className="w-full"
            >
              <div className="flex items-center justify-center h-full w-full">
                {isSubmitting ? (
                  <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
                ) : (
                  <span className="text-lg">Delete</span>
                )}
              </div>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DeleteAccountForm;
