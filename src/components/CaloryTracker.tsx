import { useMemo } from "react";
import CaloriesDisplay from "./CaloriesDisplay";

import { useActivity } from "../hooks/useActivity";

const CaloryTracker = () => {
  const { state } = useActivity();

  const { activities } = state;

  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + +activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + +activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBalance = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  return (
    <>
      <h2 className='text-4xl font-black text-white mb-5 text-center'>
        Contador de calorias
      </h2>

      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5'>
        <CaloriesDisplay text='Consumidas' calories={caloriesConsumed} />

        <CaloriesDisplay text='Quemadas' calories={caloriesBurned} />

        <CaloriesDisplay text='Balance' calories={caloriesBalance} />
      </div>
    </>
  );
};

export default CaloryTracker;
