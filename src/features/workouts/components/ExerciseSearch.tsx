import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';
import { FieldInputProps } from 'formik';
import { useSelector } from 'react-redux';

import { IExercise } from './CreateWorkoutModal';
import Button from '../../../components/common/Button';
import CreateExerciseForm, {
  INewExerciseData,
  INewExercise,
} from './CreateExerciseForm';
import { auth } from '../../auth/authSlice';

interface ExerciseAutocompleteProps {
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

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
};

const ExerciseSearch = ({
  field,
  options,
  onDeleteExercise,
  form: { setFieldValue, setFieldTouched },
  createExercise,
  ...props
}: ExerciseAutocompleteProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [exerciseForm, setExerciseForm] = useState<ReactNode>(null);
  const { name, value, onChange } = field;
  const fieldRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector(auth);

  const filteredExercises = options.filter((option) =>
    option.value.includes(value.toLowerCase())
  );

  const handleCreateExercise = async ({ name, parameter }: INewExercise) => {
    const titleCaseName = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const data = {
      value: name.toLowerCase(),
      label: titleCaseName,
      user: user?.id,
      tracking_param: parameter,
    };

    await createExercise(data);
  };

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
      <div className="flex gap-2 relative z-40">
        <div
          className={`absolute inset-y-0 left-3 pointer-events-none text-gray-400 ${
            isSearchIcon ? 'flex items-center' : 'hidden'
          }`}
        >
          <SearchIcon />
        </div>
        <input
          {...field}
          {...props}
          autoComplete="off"
          value={value}
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
      {isDropdownOpen && (
        <div className="absolute transition-transform duration-200 ease-in-out bg-white rounded-[10px] shadow-md top-0 pt-17 left-0 right-0 -mx-3 -translate-y-3 z-30 border-1 border-input-border p-3 flex flex-col cursor-pointer max-h-67">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filteredExercises.length ? (
              filteredExercises.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    // Set exercise value and trigger validation on its field
                    setFieldValue(name, option.label);
                    setFieldTouched(name, true, true);

                    setIsSearchIcon(false);
                    setIsDropdownOpen(false);

                    // Update Fields-array to include the newly selected exercise's tracking parameter
                    const pathPieces = name.split('.');

                    const blockIdx = parseInt(pathPieces[1]);
                    const exerciseIdx = parseInt(pathPieces[3]);

                    // Update Fields[]
                    const fieldsPath = `blocks.${blockIdx}.exercises.${exerciseIdx}.fields`;
                    const newFields = ['sets', option.tracking_param];
                    setFieldValue(fieldsPath, newFields);

                    // Update Data{}
                    const dataPath = `blocks.${blockIdx}.exercises.${exerciseIdx}.data`;
                    setFieldValue(`${dataPath}.${option.tracking_param}`, '');

                    setFieldTouched(fieldsPath, true, true);
                    setFieldTouched(
                      `${dataPath}.${option.tracking_param}`,
                      true,
                      true
                    );
                  }}
                  className="flex justify-between items-center font-nunito text-base font-semibold text-body-text p-2 hover:font-extrabold odd:bg-[#F3F2F2] even:bg-white relative"
                >
                  {option.label}

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
              exerciseForm
            ) : (
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
