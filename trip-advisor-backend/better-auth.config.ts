import "dotenv/config"
import { betterAuth } from "better-auth"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import * as schema from "./src/db/schema"

const { DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET } = process.env

if (!DATABASE_URL) throw new Error("DATABASE_URL is required")
if (!BETTER_AUTH_URL) throw new Error("BETTER_AUTH_URL is required")
if (!BETTER_AUTH_SECRET) throw new Error("BETTER_AUTH_SECRET is required")

const pool = new Pool({ connectionString: DATABASE_URL })
const db = drizzle(pool)

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true }
})
