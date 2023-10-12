import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:5173",
];
export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  REFRESH_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SESSION_SECRET_KEY,
} = process.env;
export const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } =
  process.env;
