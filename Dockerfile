# syntax=docker/dockerfile:1.7

# Stage: development — live-reload dev server for compose.dev.
# bun is the package manager, but `ng` must run on real Node (the Angular CLI
# rejects bun's emulated Node version), so we install on node:26-alpine with
# the bun binary copied in.
FROM node:26.10-alpine AS development
COPY --from=oven/bun:1.4.2-alpine /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 4200

HEALTHCHECK --interval=15s --timeout=3s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4200/ >/dev/null 2>&1 || exit 1

CMD ["bun", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200"]

# Stage: build the Angular production bundle with bun-installed deps.
FROM node:26.10-alpine AS build
COPY --from=oven/bun:1.4.2-alpine /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Stage: production — serve the static bundle with nginx.
FROM nginx:1.29-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular20-demo/browser /usr/share/nginx/html

# nginx's unprivileged uid is 101; match it rather than running as root.
RUN chown -R 101:101 /usr/share/nginx/html /var/cache/nginx /var/log/nginx \
  && touch /var/run/nginx.pid && chown 101:101 /var/run/nginx.pid
USER 101:101

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
