import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';
import PasswordInputField from './PasswordInputField';

export interface IChangePasswordFormData {
  current_password: string;
  new_password: string;
  re_new_password: string;
}

const ChangePasswordForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: IChangePasswordFormData) => Promise<void>;
}) => {
  const [passwordFieldTyoe, setPasswordFieldType] = useState('password');
  const [newPasswordFieldType, setNewPasswordFieldType] = useState('password');
  const [reNewPasswordFieldType, setReNewPasswordFieldType] =
    useState('password');

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required('Password is required'),
    new_password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@$!%*?&)'
      )
      .required('Password required'),
    re_new_password: Yup.string().required('Password required'),
  });

  return (
    <Formik
      initialValues={{
        current_password: '',
        new_password: '',
        re_new_password: '',
      }}
      validationSchema={validationSchema}
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
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-2">
          <div className="flex flex-col w-full">
            <label className="text-lg text-body-text font-semibold">
              Current Password
            </label>
            <Field
              name="current_password"
              type={passwordFieldTyoe}
              setType={setPasswordFieldType}
              component={PasswordInputField}
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
            />
            <ErrorMessage
              name="current_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg text-body-text font-semibold">
              New Password
            </label>
            <Field
              name="new_password"
              type={newPasswordFieldType}
              setType={setNewPasswordFieldType}
              component={PasswordInputField}
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
            />
            <ErrorMessage
              name="new_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg text-body-text font-semibold">
              Confirm Password
            </label>
            <Field
              name="re_new_password"
              type={reNewPasswordFieldType}
              setType={setReNewPasswordFieldType}
              component={PasswordInputField}
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full"
            />
            <ErrorMessage
              name="re_new_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>
          <Button size="medium" type="submit" disabled={isSubmitting}>
            <div className="flex items-center justify-center h-full w-full">
              {isSubmitting ? (
                <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
              ) : (
                <span className="text-lg">Update Password</span>
              )}
            </div>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
