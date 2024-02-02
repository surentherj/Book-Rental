import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware = [thunk];

const composeEnhancers =
  process.env.REACT_APP_ENABLE_REDUX === "true"
    ? compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : (f) => f
      )
    : compose(applyMiddleware(...middleware));

const store = createStore(rootReducer, composeEnhancers);

export default store;
