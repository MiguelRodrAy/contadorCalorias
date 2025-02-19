import { createContext, useReducer } from "react";
import {
  ActivityActions,
  ActivityState,
  activityReducer,
  initialState,
} from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { useMemo } from "react";

type ActivityProviderProps = {
  children: React.ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityActions>;
  categoryName: (category: Activity["category"]) => string[];
  isEmptyActivities: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(
  {} as ActivityContextProps
);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
