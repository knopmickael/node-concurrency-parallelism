const { workerData, isMainThread, parentPort } = require("worker_threads");
const { factorial, log, threadMessage } = require("./utils");
const { input } = workerData;

// parentPort.on("message", (message) => {
//   log(`Message received at worker: ${message}`);
// });

while(true) {}

// factorial(input)
//   .then((result) => {
//     parentPort.postMessage(
//       `[${threadMessage(isMainThread)}] Factorial of ${
//         workerData.input
//       }: ${result}`
//     );
//   })
//   .then(() => {
//     // parentPort.postMessage("Encerrar thread");
//     // let i = 0;
//     // setInterval(() => {
//     //   log(i++)
//     // }, 1000);
//   })
//   .catch((err) => {
//     throw Error(err ? err : `The function at broke for some reason.`);
//   });
