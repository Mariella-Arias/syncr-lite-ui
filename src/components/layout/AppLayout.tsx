import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';

import Navbar from './Navbar';
import { ModalsProvider } from '../../context/ModalsProvider';
import SlideInModal from '../overlays/SlideInModal';
import CenteredModal from '../overlays/CenteredModal';
import {
  setWorkouts,
  setExercises,
} from '../../features/workouts/workoutsSlice';
import { AppDispatch } from '../../app/store';

const AppLayout = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const initializeData = async () => {
      console.log('Initializing data');
      try {
        await dispatch(setWorkouts());
        await dispatch(setExercises());
      } catch (error) {
        console.error('Failed to initialize data', error);
      }
    };

    initializeData();
  }, []);

  return (
    <ModalsProvider>
      <SlideInModal />
      <CenteredModal />

      <div className="w-screen h-screen flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </ModalsProvider>
  );
};

export default AppLayout;

// Desktop grid layout
{
  /* <div className="absolute inset-0 pointer-events-none">
  <div className="grid grid-cols-12 gap-5 h-full">
    {[...Array(12)].map((_, index) => (
      <div
        key={index}
        className="h-full bg-red-500 border-x border-red-500 opacity-8"
      />
    ))}
  </div>
</div> */
}

// Mobile grid layout
{
  // MOBILE LAYOUT GRID
  /* <div className="fixed inset-0 w-screen h-screen pointer-events-none">
<div className="grid grid-cols-5 gap-5 h-full">
{[...Array(5)].map((_, index) => (
  <div
    key={index}
    className="h-full bg-red-500 border-x border-red-500 opacity-8"
  />
))}
</div>
</div> */
}
