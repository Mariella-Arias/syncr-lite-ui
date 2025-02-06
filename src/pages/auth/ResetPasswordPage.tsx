import { Link } from 'react-router';

import logo from '../../assets/logo.png';
import Button from '../../components/common/Button';

const ResetPasswordPage = () => {
  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Reset Password</p>
        <p>Enter your email to receive a password reset link.</p>
        <form className="flex flex-col w-full gap-3 mb-3">
          <input
            placeholder="Enter email"
            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <Button size="medium">
            <span className="text-lg">Send Reset Link</span>
          </Button>
        </form>
        <Link to="/login">
          <span className="text-sky-450 ">Back to Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
