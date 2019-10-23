const {createStore, applyMiddleware, compose} = Redux;
const {handleActions} = ReduxActions;
const {connect: reduxConnect} = ReactRedux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import api from "./api.js";

import {
  setApplication,
  setLoggedIn,
  setUserData,
  setAnalyticsStatus,
} from "./actions.js";

const middleware = store => next => action => next(action);

const defaultState = {
  currentApplication: null,
  isLoggedIn: false,
  userData: null,
  analyticsStatus: "none",
};

const stateUpdaterFor = field => (state, {payload}) => ({
  ...state,
  [field]: payload,
});

const store = createStore(
  handleActions(
    {
      [setApplication]: stateUpdaterFor("currentApplication"),
      [setLoggedIn]: stateUpdaterFor("isLoggedIn"),
      [setUserData]: stateUpdaterFor("userData"),
      [setAnalyticsStatus]: stateUpdaterFor("analyticsStatus"),
    },
    defaultState,
  ),
  composeEnhancers(applyMiddleware(middleware)),
);

export default store;

export const connect = reduxConnect(s => s);
