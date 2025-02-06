import { Link } from 'react-router';

import Button from '../../components/common/Button';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Welcome back</p>

        <form className="flex flex-col w-full gap-3 mb-3">
          <input
            placeholder="Email"
            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
          ></input>
          <input
            placeholder="Password"
            className="border-input-border  border-1 rounded-[10px] py-2 px-3 text-lg"
          ></input>
          <Button size="medium">
            <span className="text-lg py-2 px-3">Sign In</span>
          </Button>
        </form>

        <Link to="/reset-password">
          <span className="text-sky-450">Forgot password?</span>
        </Link>
        <p>
          Don't have an account?
          <Link to="/signup">
            <span className="text-sky-450">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
