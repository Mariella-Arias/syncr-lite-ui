import { Link, useNavigate } from 'react-router';

import logo from '../../assets/logo.png';
import SignupForm, {
  IUserCreate,
} from '../../features/auth/components/SignupForm';
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

const SignupPage = () => {
  const { createAccount } = useAuthApi();
  const navigate = useNavigate();

  const handleSignup = async (values: IUserCreate) => {
    try {
      await createAccount(values);
      // TODO add success notification
    } catch (err: unknown) {
      // TODO add error notification
      console.log(err);
    } finally {
      navigate('/login', { replace: true });
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
