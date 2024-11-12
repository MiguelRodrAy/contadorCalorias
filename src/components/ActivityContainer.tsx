import type { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo, Dispatch } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityContainerProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

const ActivityContainer = ({
  activities,
  dispatch,
}: ActivityContainerProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    []
  );

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  return (
    <>
      <h2 className='text-4xl font-black text-text mb-5 text-center'>
        Comida y Actividades
      </h2>

      {isEmptyActivities && (
        <p className='text-center my-5 text-3xl text-text font-bold'>
          No se han agregado actividades
        </p>
      )}

      {activities.map((activity) => (
        <div
          key={activity.id}
          className='px-5 py-10 bg-white mt-5 flex justify-between rounded-lg shadow-lg'
        >
          <div className='space-y-2 relative'>
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 uppercase text-white font-bold rounded-md bg-${
                activity.category === 1 ? "primary" : "secondary"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className='text-2xl font-bold pt-5'>{activity.name}</p>

            <p className={`text-text font-black text-4xl `}>
              {activity.calories}
              {""}
              <span> Calorias </span>
            </p>
          </div>

          <div className='flex items-center'>
            <button
              onClick={() =>
                dispatch({
                  type: "SET_ACTIVE_ACTIVITY",
                  payload: { id: activity.id },
                })
              }
            >
              <PencilSquareIcon className=' mr-5 h-8 w-8 text-text' />
            </button>

            <button
              onClick={() =>
                dispatch({
                  type: "DELETE_ACTIVITY",
                  payload: { id: activity.id },
                })
              }
            >
              <TrashIcon className='h-8 w-8 text-red-600' />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActivityContainer;
