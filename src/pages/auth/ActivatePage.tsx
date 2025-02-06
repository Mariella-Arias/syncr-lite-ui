import logo from '../../assets/logo.png';
import Button from '../../components/common/Button';

const ActivatePage = () => {
  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Verify your account</p>
        <p className="text-center mb-3">
          Your account is ready to be activated. Click the button below to
          complete the verification process.
        </p>
        <Button size="medium" className="w-full">
          <span className="text-lg">Verify</span>
        </Button>
      </div>
    </div>
  );
};

export default ActivatePage;
