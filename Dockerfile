# Stage 1: Install dependencies
# Use Debian-based image instead of Alpine to avoid OpenSSL compatibility issues with Prisma
FROM node:20-bookworm AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-bookworm AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:/data/dev.db"

# Create data directory and move the existing dev.db from prisma folder to /data
# (prisma/dev.db is already here because we did COPY . . earlier)
RUN mkdir -p /data && \
    cp /app/prisma/dev.db /data/dev.db && \
    npx prisma generate && \
    npx prisma migrate deploy
RUN npm run build

# Stage 3: Runner
FROM node:20-bookworm AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:/data/dev.db"

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy all node_modules from builder (prisma CLI needs all files)
COPY --from=builder /app/node_modules ./node_modules
# Still copy prisma schema
COPY --from=builder /app/prisma ./prisma

# Data directory for SQLite
RUN mkdir -p /data && chown nextjs:nodejs /data

# Entrypoint script
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./docker-entrypoint.sh"]
