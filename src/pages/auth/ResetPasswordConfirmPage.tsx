import { Link } from 'react-router';

import logo from '../../assets/logo.png';
import Button from '../../components/common/Button';

const ResetPasswordConfirmPage = () => {
  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Reset your password</p>
        <p>Enter a new email below to change your password.</p>
        <form className="flex flex-col w-full gap-3 mb-3">
          <input
            placeholder="Create new password"
            className="border-input-border  border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <input
            placeholder="Confirm new password"
            className="border-input-border  border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <Button size="medium">Reset Password</Button>
        </form>
        <Link to="/login">
          <span className="text-sky-450 ">Back to Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage;
