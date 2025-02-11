import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';

interface ILoginCredentials {
  email: string;
  password: string;
}

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (credentials: ILoginCredentials) => Promise<void>;
}) => {
  const initialValues: ILoginCredentials = {
    email: '',
    password: '',
  };

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
              type="password"
              name="password"
              placeholder="Password"
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
