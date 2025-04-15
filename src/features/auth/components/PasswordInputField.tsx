import { Eye, EyeOff } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { FieldInputProps } from 'formik';

interface PasswordInputFieldProps {
  field: FieldInputProps<string>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}

const PasswordInputField = ({
  field,
  type,
  setType,
  ...props
}: PasswordInputFieldProps) => {
  return (
    <div className="relative">
      <input
        {...field}
        {...props}
        type={type}
      />
      <button
        onClick={() => {
          setType((prev) => (prev === 'text' ? 'password' : 'text'));
        }}
        type="button"
        aria-label={type === 'text' ? 'Hide password' : 'Show password'}
        className="w-10 h-10 rounded-full absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center"
      >
        {type === 'text' ? (
          <Eye
            strokeWidth={2}
            size={22}
          />
        ) : (
          <EyeOff
            strokeWidth={2}
            size={22}
          />
        )}
      </button>
    </div>
  );
};

export default PasswordInputField;
