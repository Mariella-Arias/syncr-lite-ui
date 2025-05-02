// External Dependencies
import DatePicker from 'react-datepicker';
import { FieldInputProps } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

// Utils
import { getCalendarDate } from '../utils';

/**
 * DatePickerProps Interface
 *
 * Props required for the date picker component
 */
interface DatePickerProps {
  field: FieldInputProps<string>;
  form: {
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => Promise<void>;
    setFieldTouched: (
      field: string,
      isTouched?: boolean,
      shouldValidate?: boolean
    ) => Promise<void>;
  };
}

/**
 * DatePickerField Component
 *
 * Custom Formik-compatible field for date selection
 *
 * @param {DatePickerProps} props Component props
 * @returns React component for date selection
 */
const DatePickerField = ({
  field,
  form: { setFieldValue, setFieldTouched },
  ...props
}: DatePickerProps) => {
  // Extract field properties from Formik
  const { name, value } = field;

  /**
   * Parses a date string in YYYY-MM-DD format to a Date object
   * Sets time to noon to avoid timezone issues
   *
   * @param dateStr Date string in YYYY-MM-DD format
   * @returns JavaScript Date object
   */
  const parseDate = (dateStr: string): Date => {
    // Split date string and convert to integers
    const [year, month, day] = dateStr
      .split('-')
      .map((num) => parseInt(num, 10));

    // Create date object with time set to noon to avoid timezone issues
    const date = new Date(year, month - 1, day, 12, 0, 0, 0);

    return date;
  };

  /**
   * Determine the selected date based on field value
   * Handles string values by parsing them
   * Returns null if no valid value exists
   */
  const selectedDate = value
    ? typeof value === 'string' && value !== ''
      ? parseDate(value)
      : (value as unknown as Date)
    : null;

  /**
   * Create a Date object for today with time set to midnight
   * Used to prevent selection of past dates
   */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DatePicker
      {...props}
      selected={selectedDate}
      minDate={today} // Prevents selection of dates before today
      onChange={(date: Date | null) => {
        // Format the date as YYYY-MM-DD and update form value
        const formattedDate = date ? getCalendarDate(date) : '';
        setFieldValue(name, formattedDate);
        setFieldTouched(name, true, true);
      }}
      onBlur={() => setFieldTouched(name, true)}
      dateFormat="MM/dd/yyyy" // Display format for user
      className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full text-center"
    />
  );
};

export default DatePickerField;
