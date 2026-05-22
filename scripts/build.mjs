import { spawnSync } from "node:child_process";
import path from "node:path";

process.env.DATABASE_URL ||= "postgresql://postgres:postgres@localhost:5432/fighterplayz_ecosystem";

const binExt = process.platform === "win32" ? ".cmd" : "";
const binDir = path.join(process.cwd(), "node_modules", ".bin");

function run(command, args) {
  const result = spawnSync(path.join(binDir, `${command}${binExt}`), args, {
    stdio: "inherit",
    shell: false,
    env: process.env
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("prisma", ["generate"]);
run("next", ["build"]);
