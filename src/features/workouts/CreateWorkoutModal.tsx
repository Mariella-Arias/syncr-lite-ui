import CreateWorkoutForm from './CreateWorkoutForm';

const CreateWorkoutModal = () => {
  const handleSubmit = async (values: any) => {};

  return (
    <div className="px-12 py-8 h-full flex flex-col">
      {/* Header */}
      <p className="font-nunito text-2xl font-bold mb-6">New Workout</p>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <CreateWorkoutForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateWorkoutModal;
