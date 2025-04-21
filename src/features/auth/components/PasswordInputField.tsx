// React Imports
import { Dispatch, SetStateAction } from 'react';

// External Dependencies
import { Eye, EyeOff } from 'lucide-react';
import { FieldInputProps } from 'formik';

interface PasswordInputFieldProps {
  field: FieldInputProps<string>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}

/**
 * PasswordInputField Component
 *
 * A custom input field for passwords with visibility toggle functionality
 * Designed to work with Formik form library
 *
 * @param {FieldInputProps<string>} field - Formik field props
 * @param {string} type - Current input type (password/text)
 * @param {Dispatch<SetStateAction<string>>} setType - Function to toggle visibility by toggling the input type
 * @param {Object} props - Additional props to pass to the input element
 */
const PasswordInputField = ({
  field,
  type,
  setType,
  ...props
}: PasswordInputFieldProps) => {
  return (
    <div className="relative">
      {/* Password Input */}
      <input
        {...field}
        {...props}
        type={type}
      />

      {/* Visibility Toggle Button */}
      <button
        onClick={() => {
          setType((prev) => (prev === 'text' ? 'password' : 'text'));
        }}
        type="button"
        aria-label={type === 'text' ? 'Hide password' : 'Show password'}
        className="w-10 h-10 rounded-full absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center"
      >
        {/* Toggle Icon - Shows EyeOff when password is hidden, Eye when visible */}
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
