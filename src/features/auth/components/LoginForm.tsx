import { Dispatch, SetStateAction, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldInputProps } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';

export interface ILoginCredentials {
  email: string;
  password: string;
}

const EyeSlashIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
};

const EyeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (credentials: ILoginCredentials) => Promise<void>;
}) => {
  const initialValues: ILoginCredentials = {
    email: '',
    password: '',
  };
  const [fieldType, setFieldType] = useState('password');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required'),
  });

  const customInput = ({
    field,
    type,
    setType,
    ...props
  }: {
    field: FieldInputProps<string>;
    type: string;
    setType: Dispatch<SetStateAction<string>>;
  }) => {
    return (
      <div className="relative">
        <input {...field} {...props} type={type} />
        <button
          onClick={() => {
            setType((prev) => (prev === 'text' ? 'password' : 'text'));
          }}
          type="button"
          className="w-10 h-10 rounded-full absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center"
        >
          {type === 'text' ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      </div>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await handleLogin(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col w-full gap-3 mb-3">
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

          <div className="flex flex-col w-full">
            <Field
              id="password"
              type={fieldType}
              setType={setFieldType}
              name="password"
              placeholder="Password"
              component={customInput}
              className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg relative w-full"
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
