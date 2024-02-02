import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_GENERAL_STATE_VALUES,
  USER_LOADED
} from "../actionTypes";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
  error: "",
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
   
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: "",
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    
    case UPDATE_GENERAL_STATE_VALUES:
      return {
        ...state,
        [payload.key]: payload.value,
      };
    default:
      return state;
  }
}

export default authReducer;
