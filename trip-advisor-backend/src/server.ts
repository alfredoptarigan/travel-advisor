import { serve } from "@hono/node-server";
import app from "./app";
import { env } from "./env";

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info: { port: number }) => {
    console.log(`Server running at http://localhost:${info.port}`);
  },
);
