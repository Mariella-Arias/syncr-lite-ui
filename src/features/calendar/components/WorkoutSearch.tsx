// React Imports
import { useState, useRef, ChangeEvent, useEffect } from 'react';

// External Dependencies
import { FieldInputProps } from 'formik';

// Types
import { IWorkout } from '../../workouts/types/workouts.types';

/**
 * WorkoutSearchProps Interface
 *
 * Props required for the workout search component
 */
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

/**
 * WorkoutSearch Component
 *
 * Custom Formik-compatible field for searching and selecting workouts
 *
 * @param {WorkoutSearchProps} props Component props
 * @returns React component for workout search and selection
 */
const WorkoutSearch = ({
  field,
  options,
  form: { setFieldValue, setFieldTouched },
  ...props
}: WorkoutSearchProps) => {
  // State to track dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extract field properties from Formik
  const { name, value, onChange } = field;

  // Reference to the component's DOM element for click-outside detection
  const fieldRef = useRef<HTMLDivElement>(null);

  /**
   * Filter workouts based on the current input value
   * Matches workout names that contain the input text (case-insensitive)
   */
  const filteredExercises = options.filter((option) =>
    option.name.toLowerCase().includes(value.toLowerCase())
  );

  /**
   * Handle clicks outside the component to close the dropdown
   */
  useEffect(() => {
    /**
     * Event handler for clicks outside the component
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for mousedown events
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
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
      {/* Search Input Field */}
      <input
        {...field}
        {...props}
        value={value}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        onFocus={() => setIsDropdownOpen(true)}
        className="border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full bg-white transition-spacing duration-250 ease-in-out relative z-40"
      />

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute transition-transform duration-200 ease-in-out bg-white rounded-[10px] shadow-md top-0 pt-17 left-0 right-0 -mx-3 -translate-y-3 z-30 border-1 border-input-border p-3 flex flex-col cursor-pointer max-h-72">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {/* Workout Options */}
            {filteredExercises.length ? (
              filteredExercises.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    // Update form field value and mark as touched
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
              // No Matches Message
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
