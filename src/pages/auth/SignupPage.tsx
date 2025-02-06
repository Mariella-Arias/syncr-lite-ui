import { Link } from 'react-router';

import logo from '../../assets/logo.png';
import Button from '../../components/common/Button';

const SignupPage = () => {
  return (
    <div className="flex justify-center">
      <div className="border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Create your account</p>
        <form className="flex flex-col w-full gap-2 mb-3">
          <input
            placeholder="First Name"
            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <input
            placeholder="Last Name"
            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <input
            placeholder="Email"
            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <input
            placeholder="Password"
            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <input
            placeholder="Confirm Password"
            className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg"
          />
          <Button size="medium">
            <span className="text-lg py-2 px-3">Sign Up</span>
          </Button>
        </form>
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
