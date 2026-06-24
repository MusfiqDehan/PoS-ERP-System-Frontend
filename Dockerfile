# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:25.9.0-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# NEXT_PUBLIC_* vars are baked into the bundle at build time
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_WS_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_PUBLIC_DOMAIN=$NEXT_PUBLIC_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_WS_BASE_URL=$NEXT_PUBLIC_WS_BASE_URL
ENV NODE_ENV=production

COPY . .
RUN npm run build

# ── Stage 2: serve with nginx ────────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
