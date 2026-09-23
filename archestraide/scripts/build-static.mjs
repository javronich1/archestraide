import { existsSync, renameSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const api = path.join(root, "app/api");
const backup = path.join(root, ".api-static-backup");
if (existsSync(backup)) {
  throw new Error("A previous build left .api-static-backup; restore it to app/api before retrying.");
}
const hasApi = existsSync(api);
if (hasApi) renameSync(api, backup);
try {
  const result = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build"], {
    cwd: root,
    env: { ...process.env, STATIC_EXPORT: "true", NEXT_TELEMETRY_DISABLED: "1" },
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  if (hasApi) renameSync(backup, api);
}
