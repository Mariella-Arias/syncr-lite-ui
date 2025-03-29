import { useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../app/store';
import Workouts from '../../features/workouts/components/Workouts';
import Calendar from '../../features/calendar/components/Calendar';
import { useActivityApi } from '../../features/activity/hooks/useActivityApi';
import { setScheduledWorkouts } from '../../features/calendar/calendarSlice';
import {
  getCalendarDays,
  getCalendarDate,
} from '../../features/calendar/utils';

const PlannerPage = () => {
  const { scheduleWorkout, getActivityPeriod, deleteActivity } =
    useActivityApi();
  const dispatch: AppDispatch = useDispatch();
  const today = new Date();

  // A list of 42 calendar days: ICalendarDay[]
  const calendarDays = getCalendarDays(today);

  const startDate: Date = calendarDays[0].date;
  const startDateStr: string = getCalendarDate(startDate); // '2025-03-25'
  const endDate: Date = calendarDays[calendarDays.length - 1].date;
  const endDateStr: string = getCalendarDate(endDate); // '2025-03-25'

  const updateScheduledWorkouts = async () => {
    const response = await getActivityPeriod({
      start_date: startDateStr,
      end_date: endDateStr,
    });
    dispatch(setScheduledWorkouts(response));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const workoutId = active.id as number;
    const containerId = over.id.toString();

    await scheduleWorkout({ workout: workoutId, date_scheduled: containerId });
    await updateScheduledWorkouts();
  };

  const handleDeleteActivity = async (id: number) => {
    await deleteActivity({ id });
    await updateScheduledWorkouts();
  };

  useEffect(() => {
    updateScheduledWorkouts();
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex w-full h-full overflow-auto">
        {/* CALENDAR: droppable */}
        <div className="flex-1">
          <Calendar
            calendarDays={calendarDays}
            refreshSchedule={updateScheduledWorkouts}
            onDeleteActivity={handleDeleteActivity}
          />
        </div>
        {/* WORKOUTS: draggable */}
        <div className="flex-1">
          <Workouts />
        </div>
      </div>
    </DndContext>
  );
};

export default PlannerPage;
