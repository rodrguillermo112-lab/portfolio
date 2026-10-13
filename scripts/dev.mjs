// The documented Next.js custom-server API keeps development in one process.
// This also runs in restricted Windows environments that disallow IPC forks.
import { createServer } from "node:http";
import next from "next";

const hostname = "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const app = next({ dev: true, webpack: true, hostname, port });
await app.prepare();
const handle = app.getRequestHandler();
const server = createServer((request, response) => {
  void handle(request, response);
});
server.listen(port, hostname, () => {
  console.log(`Portfolio ready: http://${hostname}:${port}`);
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
const close = () => {
  server.close();
  void app.close().then(() => process.exit(0));
};
process.on("SIGINT", close);
process.on("SIGTERM", close);
