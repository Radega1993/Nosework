# syntax=docker/dockerfile:1
# Next.js 15 + better-sqlite3 (binario nativo): imagen base glibc (Debian).
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-bookworm-slim AS deps
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:${NODE_VERSION}-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# URL pública en build (canonicals, OG, etc.); sobreescribible en compose con build-arg
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
RUN npm run build

FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# SQLite en volumen (persistencia entre reinicios)
ENV SQLITE_DATABASE_PATH=/data/database.db

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

RUN mkdir -p /data && chown nextjs:nodejs /data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Módulo nativo no siempre queda completo en el trace de standalone
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
