import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { FieldInputProps } from 'formik';

import { IWorkout } from '../../workouts/types/workouts.types';

interface WorkoutSearchProps {
  field: FieldInputProps<string>;
  options: IWorkout[];
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

const WorkoutSearch = ({
  field,
  options,
  form: { setFieldValue, setFieldTouched },
  ...props
}: WorkoutSearchProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { name, value, onChange } = field;
  const fieldRef = useRef<HTMLDivElement>(null);

  const filteredExercises = options.filter((option) =>
    option.name.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative transition-spacing duration-250 ease-in-out ${
        isDropdownOpen ? 'm-3 z-50' : 'm-0'
      }`}
      ref={fieldRef}
    >
      <input
        {...field}
        {...props}
        value={value}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        onFocus={() => setIsDropdownOpen(true)}
        className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full bg-white transition-spacing duration-250 ease-in-out relative z-40"
      />
      {isDropdownOpen && (
        <div className="absolute transition-transform duration-200 ease-in-out bg-white rounded-[10px] shadow-md top-0 pt-17 left-0 right-0 -mx-3 -translate-y-3 z-30 border-1 border-input-border p-3 flex flex-col cursor-pointer max-h-72">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filteredExercises.length ? (
              filteredExercises.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    setFieldValue('name', option.name, true)
                      .then(() => setFieldTouched(name, true, true))
                      .then(() => setFieldTouched(name, true, true))
                      .then(() => setIsDropdownOpen(false));
                  }}
                  className="flex justify-between items-center font-nunito text-base font-semibold text-body-text p-2 hover:font-extrabold odd:bg-[#F3F2F2] even:bg-white relative"
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div>
                <p className="text-base italic">Workout not found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default WorkoutSearch;
