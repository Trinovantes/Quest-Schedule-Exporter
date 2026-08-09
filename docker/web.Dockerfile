# -----------------------------------------------------------------------------
FROM node:24-alpine AS builder
# -----------------------------------------------------------------------------

# Set up pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack use pnpm@latest-11 && \
    corepack enable pnpm

WORKDIR /app

COPY tsconfig.json              ./
COPY package.json               ./
COPY pnpm-workspace.yaml        ./
COPY pnpm-lock.yaml             ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install \
        --frozen-lockfile

COPY build/                     ./build/
COPY src/                       ./src/

RUN \
    --mount=type=secret,id=GIT_HASH \
    NODE_ENV=production \
    pnpm build

# -----------------------------------------------------------------------------
FROM caddy:2-alpine
LABEL org.opencontainers.image.source=https://github.com/Trinovantes/Quest-Schedule-Exporter
# -----------------------------------------------------------------------------

WORKDIR /app

COPY --from=builder /app/dist/          /app/dist/
COPY ./docker/web.Caddyfile             /etc/caddy/Caddyfile
