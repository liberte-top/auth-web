# Build stage
FROM node:20-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build

# Runtime stage
FROM node:20-bookworm-slim
WORKDIR /app
RUN corepack enable \
    && apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=6666

# No EXPOSE: do not publish ports by default
CMD ["node", "build"]
