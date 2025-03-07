import DatePicker from 'react-datepicker';
import { FieldInputProps } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

import { getCalendarDate } from '../utils';

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

const DatePickerField = ({
  field,
  form: { setFieldValue, setFieldTouched },
  ...props
}: DatePickerProps) => {
  const { name, value } = field;

  const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr
      .split('-')
      .map((num) => parseInt(num, 10));

    const date = new Date(year, month - 1, day, 12, 0, 0, 0);

    return date;
  };

  const selectedDate = value
    ? typeof value === 'string' && value !== ''
      ? parseDate(value)
      : (value as unknown as Date)
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DatePicker
      {...props}
      selected={selectedDate}
      minDate={today}
      onChange={(date: Date | null) => {
        const formattedDate = date ? getCalendarDate(date) : '';
        setFieldValue(name, formattedDate);
        setFieldTouched(name, true, true);
      }}
      onBlur={() => setFieldTouched(name, true)}
      dateFormat="MM/dd/yyyy"
      className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full text-center"
    />
  );
};

export default DatePickerField;
