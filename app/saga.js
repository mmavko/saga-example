const {
  call,
  fork,
  spawn,
  cancel,
  join,
  cancelled,
  take,
  put,
} = ReduxSaga.effects;

import api from "./api.js";

import {
  appSelected,
  appClosed,
  loggedIn,
  loggedOut,
  setApplication,
  setLoggedIn,
  setUserData,
  setAnalyticsStatus,
} from "./actions.js";

export default function* mainSaga() {
  yield yield fork(dashboardLogic);
}

function* dashboardLogic() {
  while (true) {
    const {payload: app} = yield take(appSelected);

    const appLogic = {
      "Application A": applicationALogic,
    }[app];

    if (!appLogic) continue;

    const appTask = yield fork(appLogic);
    yield put(setApplication(app));

    yield take(appClosed);

    appTask.cancel();
    yield put(setApplication(null));
  }
}

function* runClean(saga, cleanup) {
  try {
    const task = yield fork(saga);
    yield call(() => new Promise(() => {}));
  } finally {
    yield call(cleanup);
  }
}

function* runCleanUntil(pattern, saga, cleanup) {
  let task;
  try {
    task = yield fork(runClean, saga, cleanup);
    yield take(pattern);
  } finally {
    yield task.cancel();
  }
}

function* applicationALogic() {
  while (true) {
    yield take(loggedIn);
    yield put(setLoggedIn(true));
    try {
      yield call(
        runCleanUntil,
        loggedOut,
        loggedInScreenLogic,
        loggedInScreenCleanupLogic,
      );
    } finally {
      yield put(setLoggedIn(false));
    }
  }
}

function* loggedInScreenLogic() {
  const userData = yield call(api.getUserData);
  yield put(setUserData(userData));
  yield fork(runClean, analyticsLogic, analyticsCleanupLogic);
}

function* loggedInScreenCleanupLogic() {
  yield put(setUserData(null));
}

function* analyticsLogic() {
  yield put(setAnalyticsStatus("sending..."));
  const apiTask = yield spawn(api.sendAnalytics);
  const result = yield join(apiTask);
  yield put(setAnalyticsStatus(result));
}
function* analyticsCleanupLogic() {
  yield put(setAnalyticsStatus("none"));
}
