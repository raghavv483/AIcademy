import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/_configs/Schema.ts",

  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});