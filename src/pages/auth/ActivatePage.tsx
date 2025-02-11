import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import logo from '../../assets/logo.png';
import Button from '../../components/common/Button';
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

const ActivatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { activate } = useAuthApi();

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Verify your account</p>
        <p className="text-center mb-3">
          Your account is ready to be activated. Click the button below to
          complete the verification process.
        </p>
        <Button
          size="medium"
          className="w-full"
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              await activate({ uid, token });
              navigate('/login');
            } catch {
              console.log('ERROR VERIFYING');
            }
            setIsLoading(false);
          }}
        >
          <div className="flex items-center justify-center h-full w-full">
            {isLoading ? (
              <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
            ) : (
              <span className="text-lg">Verify</span>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ActivatePage;
