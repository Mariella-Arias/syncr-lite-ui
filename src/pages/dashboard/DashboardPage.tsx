import Button from '../../components/common/Button';
import CreateWorkoutModal from '../../features/workouts/components/CreateWorkoutModal';
import { useSlideInModalContext } from '../../context/ModalsContext';
import ScheduleWorkoutModal from '../../features/calendar/components/ScheduleWorkoutModal';

const DashboardPage = () => {
  const { open: openSlideIn } = useSlideInModalContext();

  return (
    <div className="flex justify-center">
      <p className="text-2xl">DASHBOARD PAGE</p>
      <Button
        onClick={() => {
          openSlideIn(<CreateWorkoutModal />);
        }}
        size="medium"
      >
        Create New Workout
      </Button>
      <Button
        onClick={() => {
          openSlideIn(<ScheduleWorkoutModal />);
        }}
        size="medium"
      >
        Schedule Workout
      </Button>
    </div>
  );
};

export default DashboardPage;
