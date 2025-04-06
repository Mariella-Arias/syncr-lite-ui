import { useState } from 'react';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

import Button from '../../../components/common/Button';
import { workouts as workoutList } from '../workoutsSlice';
import WorkoutCard from './WorkoutCard';
import { useSlideInModalContext } from '../../../context/ModalsContext';
import CreateWorkoutModal from './CreateWorkoutModal';

const Workouts = () => {
  const { workouts } = useSelector(workoutList);
  const { open: openSlideIn } = useSlideInModalContext();

  const [query, setQuery] = useState('');

  const searchResults = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full p-4">
      {/* HEADER */}
      <div className="flex flex-col mb-4">
        <p className="font-nunito text-2xl font-bold mb-6">My Workouts</p>
        <div className="flex justify-between">
          <div className="relative ">
            <input
              placeholder="Search"
              className="border-input-border border-1 rounded-full py-2 px-6 text-lg"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />

            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
              >
                <X
                  strokeWidth={1.5}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full cursor-pointer hover:stroke-2"
                />
              </button>
            )}
          </div>

          <Button
            onClick={() => openSlideIn(<CreateWorkoutModal />)}
            size="medium"
          >
            Create New
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 md:gap-5">
          {searchResults.map((workout) => (
            <WorkoutCard
              key={workout.id}
              {...workout}
              isDraggable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
