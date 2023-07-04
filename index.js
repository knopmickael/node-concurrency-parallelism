const { isMainThread, Worker, threadId } = require("worker_threads");
const { log, err, threadMessage, factorial } = require("./utils");
let input = parseInt(process.argv[2]);
let pool = process.argv[3];

if (!input) {
  err("ERROR: Missing input");
  return;
}

if (pool && pool !== "true") {
  err("ERROR: Pool needs to be true or omitted");
  return;
}

console.log(threadId)

if (input > 100) {
  if (pool) {
    return;
  }
  let index = 1;
  // for (index; index <= 4; index++) {
    const id = `w${index}`;
    const worker = new Worker(`./worker.js`, { workerData: { id, input } });
    worker.on("online", () => {
      log(`Worker ${id} started`);
      // worker.postMessage(input);
    });
    worker.on("message", (msg) => {
      log(`Message from thread: ${msg}`);
      if (msg === "Encerrar thread") worker.terminate();
    });
    worker.on("error", (msg) => {
      log(`Error: ${msg}`);
    });
    worker.on("exit", () => {
      log(`Worker ${id} finished`);
    });
  // }
} else {
  factorial(input)
    .then((result) => {
      log(`[${threadMessage(isMainThread)}] Factorial of ${input}: ${result}`);
    })
    .catch((err) => {
      throw Error(err ? err : `The function broke for some reason.`);
    });
}
