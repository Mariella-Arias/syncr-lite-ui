import { useNavigate } from 'react-router';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/common/Button';

export interface IUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
}

const SignupForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: IUserProfile) => Promise<void>;
}) => {
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
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
    rePassword: Yup.string().required('Password required'),
  });

  const userProfile: IUserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
  };

  return (
    <Formik
      initialValues={userProfile}
      validationSchema={SignupSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await handleSubmit(values);
          // TODO add success notification
        } catch (error) {
          console.log('Error creating user', error);
          // TODO add error notification
        } finally {
          navigate('/login', { replace: true });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="flex flex-col w-full gap-2 mb-3">
            <div className="flex flex-col w-full">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>
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
            <div className="flex flex-col w-full">
              <Field
                type="password"
                name="password"
                placeholder="Create Password"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <Field
                type="password"
                name="rePassword"
                placeholder="Confirm Password"
                className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
              />
              <ErrorMessage
                name="rePassword"
                component="div"
                className="text-red-550 text-sm"
              />
            </div>
            <Button size="medium" disabled={isSubmitting}>
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
