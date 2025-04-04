import { useSelector } from 'react-redux';

import Button from '../../../components/common/Button';
import { workouts as workoutList } from '../workoutsSlice';
import WorkoutCard from './WorkoutCard';
import { useSlideInModalContext } from '../../../context/ModalsContext';
import CreateWorkoutModal from './CreateWorkoutModal';

const Workouts = () => {
  const { workouts } = useSelector(workoutList);
  const { open: openSlideIn } = useSlideInModalContext();

  return (
    <div className="flex flex-col h-full p-4">
      {/* HEADER */}
      <div className="flex flex-col mb-4">
        <p className="font-nunito text-2xl font-bold mb-6">My Workouts</p>
        <div className="flex justify-between">
          <input
            placeholder="Search"
            className="border-input-border border-1 rounded-full py-2 px-6 text-lg"
          />

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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 justify-items-center">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              {...workout}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
