# CI/CD Pipeline — Full Implementation Guide

This document explains the **Continuous Integration (CI)** and **Continuous Deployment (CD)**
pipeline for this Next.js app, end to end. It is written so that **anyone can reproduce it from
scratch** — on this repo or a new one.

- **CI** (`.github/workflows/ci.yml`): on every push/PR, install → type-check → unit tests → build.
- **CD** (`.github/workflows/deploy.yml`): on every push to `main`, build a production Docker image →
  push it to the GitHub Container Registry (GHCR) → SSH into the VPS → pull & restart the container.

Result: **push to `main` → app is live on the server automatically.**

---

## 1. Architecture at a glance

```
   ┌─────────────┐   git push main    ┌──────────────────────── GitHub Actions ────────────────────────┐
   │  Developer  │ ─────────────────▶ │                                                                 │
   └─────────────┘                    │  CI (ci.yml)                                                    │
                                       │   install → typecheck → test → build  (gate)                    │
                                       │                                                                 │
                                       │  CD (deploy.yml)                                                │
                                       │   ┌── build-image ──────────────┐   ┌── deploy ──────────────┐  │
                                       │   │ docker build -f             │   │ ssh → docker login     │  │
                                       │   │   Dockerfile.prod           │──▶│ docker compose pull    │  │
                                       │   │ push → ghcr.io/<repo>:latest│   │ docker compose up -d   │  │
                                       │   └─────────────────────────────┘   └───────────┬────────────┘  │
                                       └──────────────────────────────────────────────────┼─────────────┘
                                                                                           ▼
                                                                                 ┌──────────────────┐
                                                                                 │   VPS (Docker)   │
                                                                                 │ container :3001  │
                                                                                 └──────────────────┘
```

**Why build the image in CI and not on the server / laptop?**
GitHub's hosted runners have plenty of RAM. A Next.js production build of a large app can exceed the
memory of a small VPS or a default WSL setup and get OOM-killed. Building in CI removes that risk and
keeps deploys fast (the server only *pulls* a finished image).

---

## 2. Prerequisites

| Requirement | Notes |
|---|---|
| GitHub repository | The pipeline uses the built-in `GITHUB_TOKEN` and GHCR (no extra registry account needed). |
| A Linux VPS with Docker | Any provider (Contabo, DigitalOcean, …). Install Docker: `curl -fsSL https://get.docker.com \| sh`. The Docker Compose plugin is included. |
| SSH access to the VPS | Host/IP, username, and password (or, better, an SSH key — see [§9](#9-hardening-recommended-next-steps)). |
| Node.js 20 + npm scripts | `package.json` must define `typecheck`, `test`, and `build` scripts (see [§4](#4-ci-cijyml)). |
| `output: "standalone"` in `next.config.ts` | Required so the Docker image can run a self-contained Node server. See [§6](#6-nextjs-standalone-output). |

---

## 3. Files involved

| File | Purpose |
|---|---|
| `.github/workflows/ci.yml` | CI: validate every change (typecheck, tests, build). |
| `.github/workflows/deploy.yml` | CD: build image → push to GHCR → deploy to VPS. |
| `Dockerfile.prod` | Multi-stage production image (Next.js standalone). |
| `Dockerfile` | Dev image (live-reload). **Not** used by CD. |
| `next.config.ts` | Must set `output: "standalone"`. |
| `package.json` | Defines `typecheck` / `test` / `build` scripts. |

---

## 4. CI (`ci.yml`)

Runs on **push to `main`** and on **every pull request**. It is the quality gate.

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  build:
    name: Install & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci          # clean install strictly from package-lock.json
      - run: npm run typecheck # tsc --noEmit  (fast, fails on type errors)
      - run: npm run test      # Vitest + React Testing Library
      - run: npm run build     # production build catches bundling errors
```

The matching `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

**Order matters:** type-check and tests run *before* the expensive build so failures surface fast.

---

## 5. CD (`deploy.yml`)

Runs on **push to `main`** (and can be triggered manually via *workflow_dispatch*). Two jobs:

### Job 1 — `build-image`: build & publish to GHCR

```yaml
jobs:
  build-image:
    name: Build & Push (GHCR)
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write            # needed to push to GHCR
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}   # built-in, no PAT needed
      - id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }} # auto-lowercased for GHCR
          tags: |
            type=raw,value=latest,enable={{is_default_branch}}
            type=sha,format=long
      - uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile.prod
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max            # layer cache → faster rebuilds
```

Produces two tags: `ghcr.io/<owner>/<repo>:latest` and `…:sha-<commit>`.

### Job 2 — `deploy`: ship it to the VPS

```yaml
  deploy:
    name: Deploy to VPS
    needs: build-image                # only runs if the image built & pushed
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: read                  # to pull the image during deploy
    steps:
      - id: img
        run: echo "image=ghcr.io/${GITHUB_REPOSITORY,,}:latest" >> "$GITHUB_OUTPUT"
      - uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          password: ${{ secrets.VPS_PASSWORD }}
          envs: IMAGE,GHCR_USER,GHCR_TOKEN
          script: |
            set -e
            APP_DIR=/opt/apps/sortorium-frontend
            mkdir -p "$APP_DIR"
            cd "$APP_DIR"
            cat > docker-compose.yml <<COMPOSE
            services:
              frontend:
                image: ${IMAGE}
                container_name: sortorium-frontend
                restart: unless-stopped
                ports:
                  - "3001:3000"          # host:container
            COMPOSE
            echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
            docker compose pull
            docker compose up -d
            docker image prune -f
        env:
          IMAGE: ${{ steps.img.outputs.image }}
          GHCR_USER: ${{ github.actor }}
          GHCR_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Key points**
- The compose file is written **on the server** into a fixed directory (`/opt/apps/<app>`), so the
  deployment is reproducible and easy to inspect/manage there.
- `${IMAGE}` is expanded on the server from the env var passed via `envs:`.
- `GITHUB_TOKEN` is valid for the duration of the run — enough to `docker login` + pull on the VPS.
- The container listens on **3000 internally**, mapped to **3001 on the host** (host `:3000` was already
  in use on this server — change the left number to whatever host port you want).

---

## 6. Next.js standalone output

`Dockerfile.prod` relies on Next.js producing a self-contained server. In `next.config.ts`:

```ts
const nextConfig = {
  output: "standalone", // emits .next/standalone/server.js (run with `node server.js`)
  // ...
};
```

Without this, there is no `server.js` to run in the container.

### `Dockerfile.prod` (multi-stage)

```dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
# standalone bundles server.js + a trimmed node_modules; static/ and public/ are copied separately
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 7. One-time setup (step by step)

### 7.1 Add repository secrets
GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|---|---|
| `VPS_HOST` | server IP or hostname |
| `VPS_USER` | SSH user (e.g. `root`) |
| `VPS_PASSWORD` | SSH password |

> No registry secret is needed — GHCR uses the built-in `GITHUB_TOKEN`.

### 7.2 Allow Actions to write packages
Repo → **Settings → Actions → General → Workflow permissions → Read and write permissions**.

### 7.3 Prepare the server
```bash
# install Docker (includes the compose plugin)
curl -fsSL https://get.docker.com | sh
docker --version

# open the host port you mapped (example: 3001)
ufw allow 3001/tcp 2>/dev/null || true
# also open it in your provider's firewall/security group if applicable
```

### 7.4 Make the GHCR package pullable
The first successful `build-image` run creates the package (private by default). The `deploy` job pulls
it with `GITHUB_TOKEN`, which works for packages linked to the same repo. If a pull ever fails with
`denied`/`unauthorized`, either:
- make the package **Public** (GHCR package → *Package settings* → *Change visibility*), **or**
- create a PAT with `read:packages`, add it as a secret, and use it for `docker login` on the VPS.

### 7.5 Push to `main`
```bash
git push origin main
```
Watch **GitHub → Actions**. When both workflows are green, the app is live at `http://<server-ip>:3001`.

---

## 8. Operating the deployment (on the server)

```bash
cd /opt/apps/sortorium-frontend
docker compose ps          # status
docker compose logs -f     # live logs
docker compose pull && docker compose up -d   # manual update to latest
docker compose down        # stop & remove
```

---

## 9. Hardening (recommended next steps)

1. **SSH keys instead of a password.** Generate a keypair, add the public key to the server's
   `~/.ssh/authorized_keys`, store the private key as secret `VPS_SSH_KEY`, and replace
   `password:` with `key: ${{ secrets.VPS_SSH_KEY }}` in the `appleboy/ssh-action` step.
2. **Reverse proxy + HTTPS.** Put Nginx (or Caddy/Traefik) in front of port 3001, point a domain at the
   server, and terminate TLS (Let's Encrypt) so users hit `https://yourdomain` instead of `:3001`.
3. **Branch protection.** Repo → Settings → Branches → require the **CI** check to pass before merging to
   `main`.
4. **Pin the deployed tag.** Deploy `…:sha-<commit>` instead of `:latest` for traceable, rollback-able
   releases.

---

## 10. Troubleshooting (real issues hit while building this)

| Symptom | Cause | Fix |
|---|---|---|
| Local `next build` prints **`Killed`** and dies mid-compile; WSL/SSH connection also drops | Out-of-memory (OOM killer); the build also kills the agent/server process | Give the machine more RAM + swap. For **WSL**, create `C:\Users\<you>\.wslconfig` with `[wsl2]` `memory=6GB` / `swap=12GB`, then `wsl --shutdown`. (In CI this never happens — runners have enough RAM.) |
| Build fails: **`Error occurred prerendering page … jQuery requires a window with a document`** | A jQuery-based library (e.g. `react-bootstrap-daterangepicker`) is imported at module load and evaluated during server prerender | Load it **browser-only**: `const X = dynamic(() => import("lib"), { ssr: false })` via `next/dynamic`. Component must be a client component (`"use client"`). |
| Deploy fails: **`Bind for 0.0.0.0:3000 failed: port is already allocated`** | The host port is already used by another process/container | Map a different host port in the compose file (e.g. `"3001:3000"`). |
| Deploy fails on `docker pull`: **`denied` / `unauthorized`** | GHCR package not readable by the token | Make the package public, or use a `read:packages` PAT (see [§7.4](#74-make-the-ghcr-package-pullable)). |
| Deploy fails at SSH connect/auth | Root password login disabled, wrong secret, or firewall | Verify `VPS_HOST/USER/PASSWORD` secrets; check `sshd_config` (`PermitRootLogin`, `PasswordAuthentication`); switch to SSH keys ([§9](#9-hardening-recommended-next-steps)). |
| `npm ci` fails: **lockfile out of sync** | `package.json` and `package-lock.json` disagree | Run `npm install` locally, commit the updated `package-lock.json`. |

---

## 11. Adapting this to another project

Change these and you're done:
- **App directory / container name** in `deploy.yml` (`/opt/apps/<app>`, `container_name`).
- **Host port** mapping (`"<hostPort>:3000"`).
- **Image name** is automatic from `${{ github.repository }}` (lowercased).
- Ensure `next.config.ts` has `output: "standalone"` and `package.json` has `typecheck`/`test`/`build`.
- Add the three `VPS_*` secrets and prep the server (Docker + open port).
```
