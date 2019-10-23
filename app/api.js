const apiStub = (name, result) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), 1000);
  });
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
