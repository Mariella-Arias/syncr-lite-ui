import { useSelector } from 'react-redux';

import Button from '../../../components/common/Button';
import { workouts as workoutList } from '../workoutsSlice';
import WorkoutCard from './WorkoutCard';

const Workouts = () => {
  const { workouts } = useSelector(workoutList);

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex flex-col mb-4">
        <p className="font-nunito text-2xl font-bold mb-6">My Workouts</p>
        <div className="flex justify-between">
          <input
            placeholder="Quick Search"
            className="border-input-border border-1 rounded-full py-2 px-6 text-lg"
          />
          <Button size="medium">Create New</Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 justify-items-center">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} {...workout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
