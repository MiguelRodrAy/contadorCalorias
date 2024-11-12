import { Activity } from "../types";

export type ActivityActions =
  | { type: "SAVE_ACTIVITY"; payload: { newActivity: Activity } }
  | { type: "SET_ACTIVE_ACTIVITY"; payload: { id: Activity["id"] } }
  | { type: "UPDATE_ACTIVITY"; payload: { updatedActivity: Activity }}
  | { type: "DELETE_ACTIVITY"; payload: { id: Activity["id"] } }
  | { type: "RESET_ACTIVITIES"};

  

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localActivities = () => {
  const activities = localStorage.getItem("activities");

  return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
  activities: localActivities(),
  activeId: "",
};
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
): ActivityState => {
  switch (action.type) {
    case "SAVE_ACTIVITY":
      return {
        ...state,
        activities: [...state.activities, action.payload.newActivity],
      };

    case "SET_ACTIVE_ACTIVITY":
      return {
        ...state,
        activeId: action.payload.id,
      };

    case "UPDATE_ACTIVITY":
      let updatedActivities: Activity[] = state.activities.map((activity) =>
        activity.id === state.activeId
          ? action.payload.updatedActivity
          : activity
      );

      return {
        ...state,
        activities: updatedActivities,
        activeId: "",
      };

    case "DELETE_ACTIVITY":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload.id
        ),
        activeId: "",
      };

    case "RESET_ACTIVITIES":
      return {
        activities: [],
        activeId: "",
    }  

    default:
      return state;
  }
};
