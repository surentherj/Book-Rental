import { combineReducers } from "redux";
import authReducer from "./auth";
import landingPageReducer from "./landingPage";
import toastReducer from "./toast";

export default combineReducers({
  auth: authReducer,
  toast: toastReducer,
  landingPage: landingPageReducer,
});
