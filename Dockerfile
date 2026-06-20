# Development image for the Sortorium Next.js front-end.
# This is tuned for a live-reload workflow (bind mount + file watching),
# NOT for production builds.

FROM node:20-alpine

# Next.js / sharp and some native deps are happier with libc compat on alpine.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies first so this layer is cached unless the lockfile changes.
# Only package manifests are copied here; the rest of the source comes via the
# bind mount at runtime (see docker-compose.yml).
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source. At runtime the bind mount overlays this with your
# live local files, but copying here keeps the image runnable on its own too.
COPY . .

# Next.js dev server port.
EXPOSE 3000

# Default command (overridden by docker-compose for dev). Bind to 0.0.0.0 so the
# server is reachable from the host, not just from inside the container.
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
