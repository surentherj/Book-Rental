// IMPORT ACTION TYPES
import { SET_TOAST, REMOVE_TOAST } from "../actionTypes";

const initialState = {
  alerts: []
};

function toastReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TOAST:
      return {
        ...state,
        alerts: [...state.alerts, payload],
      };

    case REMOVE_TOAST:
      return {
        ...state,
        alerts: state.alerts?.filter((alert) => alert.id !== payload.id),
      };

    default:
      return state;
  }
}

export default toastReducer;
