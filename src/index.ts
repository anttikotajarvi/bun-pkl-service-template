// Make sure to import config at the start of the process so Pkl can catch error early.
import { AppConfig } from "./config";

import { Elysia, Static, t } from "elysia";


// src/routes/health.ts
export const RootResponseSchema = t.Object({
  ok: t.Boolean(),
  service: t.String(),
  greeting: t.String(),
  ts: t.String(),
});

export type RootResponse = Static<typeof RootResponseSchema>;
const app = new Elysia()
  .get(
    "/",
    (): RootResponse => ({
      ok: true,
      service: AppConfig.service.name,
      greeting: AppConfig.greeting,
      ts: new Date().toISOString(),
    }),
    { response: RootResponseSchema }
  )
  .listen(AppConfig.service.port);

console.log(`Listening on http://0.0.0.0:${AppConfig.service.port}`);

let shuttingDown = false;

async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`\nReceived ${signal}, shutting down...`);

  try {
    app.server?.stop(true); // true = force close connections (supported by Bun's server)
  } catch (e) {
    console.error("Error stopping server:", e);
  }

  // Give logs time to flush; don't hang forever.
  setTimeout(() => process.exit(0), 250).unref();
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));