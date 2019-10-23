const {CANCEL} = ReduxSaga;

const apiStub = (name, result) => {
  let cancel;
  const promise = new Promise((resolve, reject) => {
    cancel = reject;
    setTimeout(() => resolve(result), 1000);
  });
  promise[CANCEL] = cancel;
  promise
    .then(console.log.bind(console, name, "API call finished with:"))
    .catch(console.log.bind(console, name, "API call cancelled with:"));
  return promise;
};

export default {
  getUserData() {
    return apiStub("getUserData", "asfasdf");
  },
  sendAnalytics() {
    return apiStub("sendAnalytics", "done!");
  },
};
