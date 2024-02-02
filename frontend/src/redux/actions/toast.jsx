// IMPORT ACTION TYPES
import { REMOVE_TOAST, SET_TOAST } from "../actionTypes";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

// SET ALERT WITH TIMEOUT
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_TOAST,
      payload: { msg, alertType, id },
    });
    setTimeout(
      () => dispatch({ type: REMOVE_TOAST, payload: { id } }),
      timeout
    );
  };

// DELETE ALERT ON DEMAND
export const deleteAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_TOAST,
    payload: { id },
  });
};
