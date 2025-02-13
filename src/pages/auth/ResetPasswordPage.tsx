import { Link, useNavigate } from 'react-router';
import { AxiosError } from 'axios';

import logo from '../../assets/logo.png';
import ResetPasswordRequestForm from '../../features/auth/components/ResetPasswordRequestForm';
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';
import { handleApiError } from '../../services/api';

const ResetPasswordPage = () => {
  const { initiatePasswordReset } = useAuthApi();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Reset Password</p>
        <p>Enter your email to receive a password reset link.</p>
        <ResetPasswordRequestForm
          handleSubmit={async (username) => {
            try {
              // TODO add success notification
              await initiatePasswordReset(username);
              navigate('/login', { replace: true });
            } catch (err: unknown) {
              // TODO add error notification
              console.log(err);
            }
          }}
        />
        <Link to="/login">
          <span className="text-sky-450 ">Back to Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
