const { workerData, parentPort } = require("worker_threads");
const { url } = workerData;

switch (url) {
  case "/heavy":
    let counter = 0;
    for (let index = 0; index < 1 * 10000 * 10000 * 50; index++) {
      counter++;
    }
    parentPort.postMessage(`Counter: ${counter}!`);
    break;
  case "/hello-world":
    parentPort.postMessage("Hello world...");
    break;
}
