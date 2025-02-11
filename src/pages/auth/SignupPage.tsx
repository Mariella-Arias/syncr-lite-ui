import { Link } from 'react-router';
import { AxiosError } from 'axios';

import logo from '../../assets/logo.png';
import SignupForm, {
  IUserProfile,
} from '../../features/auth/components/SignupForm';
import api, { handleApiError } from '../../services/api';

const SignupPage = () => {
  const handleSignup = async (values: IUserProfile) => {
    try {
      await api.post('auth/users/', {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
        re_password: values.rePassword,
      });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Create your account</p>
        <SignupForm handleSubmit={handleSignup} />
        <p>
          Already have an account?
          <Link to="/login">
            <span className="text-sky-450">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
