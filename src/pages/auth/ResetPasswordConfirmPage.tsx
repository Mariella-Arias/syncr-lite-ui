import { Link, useParams, useNavigate } from 'react-router';

import logo from '../../assets/logo.png';
import ResetPasswordForm from '../../features/auth/components/ResetPasswordForm';
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';
import { AxiosError } from 'axios';
import { handleApiError } from '../../services/api';

const ResetPasswordConfirmPage = () => {
  const { resetPassword } = useAuthApi();
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (values: Record<string, string>) => {
    const body = {
      uid,
      token,
      new_password: values.password,
      re_new_password: values.rePassword,
    };
    try {
      await resetPassword(body);
      navigate('/', { replace: true });
      // TODO add success notification
    } catch (err: unknown) {
      // TODO add error notification and option to re send reset link
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Reset your password</p>
        <p>Enter a new password below to change your password.</p>
        <ResetPasswordForm handleSubmit={handleResetPassword} />
        <Link to="/login">
          <span className="text-sky-450 ">Back to Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage;
