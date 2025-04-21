// React imports
import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';

// External Dependencies
import { FieldInputProps } from 'formik';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';

// UI Components
import Button from '../../../components/common/Button';
import CreateExerciseForm from './CreateExerciseForm';

// Redux
import { auth } from '../../auth/authSlice';

// Types
import {
  INewExerciseData,
  INewExercise,
  IExercise,
} from '../types/workouts.types';

interface ExerciseSearchProps {
  field: FieldInputProps<string>;
  options: IExercise[];
  onDeleteExercise: (exercise: IExercise) => Promise<void>;
  form: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void>;
    setFieldTouched: (
      field: string,
      isTouched?: boolean,
      shouldValidate?: boolean
    ) => Promise<void>;
  };
  createExercise: (data: INewExerciseData) => Promise<void>;
}

/**
 * ExerciseSearch component - A searchable dropdown for exercise selection
 * with the ability to create new exercises
 */
const ExerciseSearch = ({
  field,
  options,
  onDeleteExercise,
  form: { setFieldValue, setFieldTouched },
  createExercise,
  ...props
}: ExerciseSearchProps) => {
  // Component State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [exerciseForm, setExerciseForm] = useState<ReactNode>(null);

  // Destructure field props
  const { name, value, onChange } = field;

  // Reference to the component for click-outside detection
  const fieldRef = useRef<HTMLDivElement>(null);

  // Get user data from Redux store
  const { user } = useSelector(auth);

  /**
   * Filter exercises based on the current search value
   */
  const filteredExercises = options.filter((option) =>
    option.value.includes(value.toLowerCase())
  );

  /**
   * Handle creating a new exercise
   * @param {INewExercise} param0 - New exercise data
   */
  const handleCreateExercise = async ({ name, parameter }: INewExercise) => {
    // Convert exercise name to title case
    const titleCaseName = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    // Prepare exercise data for API
    const data = {
      value: name.toLowerCase(),
      label: titleCaseName,
      user: user?.id,
      tracking_param: parameter,
    };

    // Call the create exercise function
    await createExercise(data);
  };

  /**
   * Handle clicks outside the component to close the dropdown
   */
  useEffect(() => {
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
      {/* Search input and add button */}
      <div className="flex gap-2 relative z-40">
        {/* Search icon */}
        <div
          className={`absolute inset-y-0 left-3 pointer-events-none text-gray-400 ${
            isSearchIcon ? 'flex items-center' : 'hidden'
          }`}
        >
          <Search
            strokeWidth={1.5}
            size={22}
          />
        </div>

        {/* Search input field */}
        <input
          {...field}
          {...props}
          autoComplete="off"
          value={value || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          onFocus={() => {
            setIsDropdownOpen(true);
            setIsSearchIcon(false);
          }}
          onBlur={() => {
            if (value === '') {
              setIsSearchIcon(true);
            }
          }}
          className={`border-input-border border-1 rounded-[10px] py-2 px-3 text-lg w-full bg-white transition-spacing duration-250 ease-in-out ${
            isSearchIcon ? 'pl-10' : ''
          }`}
        />

        {/* Add new exercise button */}
        <Button
          size="medium"
          disabled={value.length === 0 || filteredExercises.length > 0}
          className={`z-20 ${isDropdownOpen ? 'inline' : 'hidden'}`}
          type="button"
          onClick={() => {
            setExerciseForm(
              <CreateExerciseForm
                initialName={value}
                createExercise={async ({ name, parameter }: INewExercise) => {
                  await handleCreateExercise({ name, parameter });
                  setExerciseForm(null);
                }}
              />
            );
          }}
        >
          Add
        </Button>
      </div>

      {/* Dropdown menu for exercises */}
      {isDropdownOpen && (
        <div className="absolute transition-transform duration-200 ease-in-out bg-white rounded-[10px] shadow-md top-0 pt-17 left-0 right-0 -mx-3 -translate-y-3 z-30 border-1 border-input-border p-3 flex flex-col cursor-pointer max-h-67">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filteredExercises.length ? (
              // Show filtered exercise options
              filteredExercises.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setIsSearchIcon(false);

                    // Parse field path to get indices
                    const pathPieces = name.split('.');
                    const blockIdx = parseInt(pathPieces[1]);
                    const exerciseIdx = parseInt(pathPieces[3]);

                    // Construct paths for form fields
                    const fieldsPath = `blocks.${blockIdx}.exercises.${exerciseIdx}.fields`;
                    const dataPath = `blocks.${blockIdx}.exercises.${exerciseIdx}.data`;
                    const newFields = ['sets', option.tracking_param];

                    // Update multiple form fields in sequence
                    setFieldValue(name, option.label, true)
                      .then(() => setFieldTouched(name, true, true))
                      .then(() => setFieldValue(fieldsPath, newFields, true))
                      .then(() =>
                        setFieldValue(
                          `${dataPath}.${option.tracking_param}`,
                          '',
                          true
                        )
                      )
                      .then(() => setFieldTouched(fieldsPath, true, true))
                      .then(() =>
                        setFieldTouched(
                          `${dataPath}.${option.tracking_param}`,
                          true,
                          true
                        )
                      )
                      .then(() => {
                        setIsDropdownOpen(false);
                      });
                  }}
                  className="flex justify-between items-center font-nunito text-base font-semibold text-body-text p-2 hover:font-extrabold odd:bg-[#F3F2F2] even:bg-white relative"
                >
                  {option.label}

                  {/* Delete button for user-created exercises */}
                  {option.is_editable && (
                    <button
                      type="button"
                      onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        onDeleteExercise(option);
                      }}
                      className="hover:bg-neutral-200 absolute right-0 top-0 bottom-0 px-3 rounded-[10px]"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))
            ) : exerciseForm ? (
              // Show create exercise form when no matching exercises found and form is active
              exerciseForm
            ) : (
              // Show "not found" message when no matching exercises found
              <div>
                <p className="text-base italic">Exercise not found</p>
                <p className="text-base italic">
                  Click "Add" to create a new exercise
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseSearch;
