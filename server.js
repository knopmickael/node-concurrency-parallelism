const http = require("http");
const { Worker } = require("worker_threads");

const multiThreadServer = http.createServer((req, res) => {
  const worker = new Worker(`./api-w1.js`, {
    workerData: { url: req.url },
  });

  worker.on("online", () => {
    console.log("Started thread");
  });
  worker.on("message", (message) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(message);
  });
  worker.on("exit", () => {
    console.log("Finished thread");
  });
});

multiThreadServer.listen(3000, () => {
  console.log("Worker threads at 3000");
});

const singleThreadServer = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  switch (req.url) {
    case "/heavy":
      let counter = 0;
      for (let index = 0; index < 1 * 10000 * 10000 * 50; index++) {
        counter++;
      }
      res.end(`Counter: ${counter}!`);
      break;
    case "/hello-world":
      res.end("Hello world...");
      break;
  }
});

singleThreadServer.listen(3001, () => {
  console.log("Only main thread at 3001");
});
