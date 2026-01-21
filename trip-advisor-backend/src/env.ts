import { config } from "dotenv";
import { z } from "zod";

config();

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z
    .string()
    .default("8787")
    .transform((v: string) => parseInt(v, 10)),
  CORS_ORIGIN: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  DATABASE_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  const message = parsed.error.errors
    .map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`)
    .join(", ");
  throw new Error(`Invalid environment configuration: ${message}`);
}

export const env = parsed.data;
