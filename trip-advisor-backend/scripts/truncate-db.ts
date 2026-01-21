import { Pool } from "pg"
import { env } from "../src/env"

async function main() {
  const pool = new Pool({ connectionString: env.DATABASE_URL })
  const target = ["reviews", "places", "session", "account", "verification", "jwks", "user"]
  const res = await pool.query<{ tablename: string }>(
    "SELECT tablename FROM pg_tables WHERE schemaname = $1",
    ["public"],
  )
  const existing = res.rows.map((r) => r.tablename).filter((t) => target.includes(t))
  if (existing.length > 0) {
    const list = existing.map((t) => (t === "user" ? '"user"' : t)).join(",")
    await pool.query(`TRUNCATE TABLE ${list} CASCADE;`)
  }
  await pool.end()
  process.stdout.write("done\n")
}

main().catch((e) => {
  process.stderr.write(String(e) + "\n")
  process.exit(1)
})
