import { bold, yellow } from "https://deno.land/std@0.152.0/fmt/colors.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import ApiRouter from "./routes/api.js";
const app = new Application();
app.use(oakCors({
  origin: '*',
}))
app.use(ApiRouter.routes())
app.use(ApiRouter.allowedMethods())
app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: " + yellow(serverType)));
});

await app.listen({ hostname: "127.0.0.1", port: 8000 });
console.log(bold("Finished."));