import { defineConfig } from "prisma";

export default defineConfig({
  schema: "prisma/schema.prisma",
  adapter: {
    provider: "sqlite",
    url: "file:./prisma/dev.db",
  },
});
