import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';
import PasswordInputField from './PasswordInputField';

export interface IDeleteAccountFormData {
  current_password: string;
}

const DeleteAccountForm = ({
  handleSubmit,
}: {
  handleSubmit: (data: IDeleteAccountFormData) => Promise<void>;
}) => {
  const [passwordFieldType, setPasswordFieldType] = useState('password');
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
