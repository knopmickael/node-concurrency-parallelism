module.exports = {
  log: console.log,
  err: console.error,
  threadMessage: function (isMainThread) {
    return isMainThread ? "MAIN" : "WORKER";
  },
  factorial: async function (length) {
    let value = 1;
    for (let index = 1; index <= length; index++) {
      value = value * index;
    }
    return value;
  },
};
