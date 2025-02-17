import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';

export interface IResetPasswordFormData {
  new_password: string;
  re_new_password: string;
}

const ResetPasswordForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: IResetPasswordFormData) => Promise<void>;
}) => {
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
          <div className="flex flex-col w-full">
            <Field
              name="new_password"
              type="password"
              placeholder="Create new password"
              className="border-input-border  border-1 rounded-[10px] py-2 px-3 text-lg"
            />
            <ErrorMessage
              name="new_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <Field
              name="re_new_password"
              type="password"
              placeholder="Confirm new password"
              className="border-input-border  border-1 rounded-[10px] py-2 px-3 text-lg"
            />
            <ErrorMessage
              name="re_new_password"
              component="div"
              className="text-red-550 text-sm"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} size="medium">
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
