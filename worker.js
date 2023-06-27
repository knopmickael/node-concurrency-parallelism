const { workerData, isMainThread, parentPort } = require("worker_threads");
const { factorial, log, threadMessage } = require("./utils");
const { input } = workerData;

// parentPort.on("message", (message) => {
//   log(`Message received at worker: ${message}`);
// });

factorial(input)
  .then((result) => {
    parentPort.postMessage(
      `[${threadMessage(isMainThread)}] Factorial of ${
        workerData.input
      }: ${result}`
    );
  })
  .catch((err) => {
    throw Error(err ? err : `The function at broke for some reason.`);
  });
