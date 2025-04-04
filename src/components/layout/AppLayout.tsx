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
      <div className="w-screen h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </ModalsProvider>
  );
};

export default AppLayout;
