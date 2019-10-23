const {createAction} = ReduxActions;

export const appSelected = createAction("appSelected");
export const appClosed = createAction("appClosed");
export const loggedIn = createAction("loggedIn");
export const loggedOut = createAction("loggedOut");

export const setApplication = createAction("setApplication");
export const setLoggedIn = createAction("setLoggedIn");
export const setUserData = createAction("setUserData");
export const setAnalyticsStatus = createAction("setAnalyticsStatus");
