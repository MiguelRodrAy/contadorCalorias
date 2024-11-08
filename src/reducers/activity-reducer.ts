import { Activity } from "../types";

export type ActivityActions =
  | { type: "SAVE_ACTIVITY"; payload: { newActivity: Activity } }
  | {
      type: "UPDATE_ACTIVITY";
      payload: { id: number; name: string; calories: number };
    };

type ActivityState = {
  activities: Activity[];
};

export const initialState: ActivityState = {
  activities: [],
};

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
  if (action.type === "SAVE_ACTIVITY") {
    return {
      activities: [...state.activities, action.payload.newActivity],
    };
  }
};
