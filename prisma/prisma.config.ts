import { defineConfig } from "prisma";
import { SqliteAdapter } from "@prisma/adapter-sqlite";
import { Pool } from "@prisma/adapter-pool";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  adapter: new Pool({
    adapter: new SqliteAdapter({
      url: process.env.DATABASE_URL!,
    }),
  }),
});
