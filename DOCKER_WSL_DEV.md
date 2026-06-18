# Docker + WSL2 Live-Reload Dev Guide

A step-by-step guide to run this Next.js project inside a Docker container with
**instant live reload**, using the **WSL2 Linux filesystem** for fast compile
times, and editing the code through **Cursor's WSL remote**.

> **Why this setup?**
> Running the dev server in Docker keeps everyone's environment identical.
> Putting the code on the WSL2 (Linux) filesystem — instead of a Windows path
> like `C:\Users\...` or a OneDrive folder — makes file I/O near-native, so
> Webpack compiles in seconds instead of minutes. Editing through Cursor's WSL
> remote means your edits land in the exact folder the container watches, so
> hot reload "just works".

---

## What you get

- Edit code locally in Cursor → changes appear in the browser automatically.
- A Docker **bind mount** maps your project into the container at `/app`.
- An **anonymous/named volume** keeps the container's `node_modules` isolated
  from the host.
- The Next.js dev server runs in **watch mode** on **port 3000**.
- A persistent `.next` cache so cold starts get faster after the first run.

---

## Prerequisites

1. **Docker Desktop** installed and running (with the **WSL 2 based engine**).
2. **WSL2** with a Linux distro (e.g. Ubuntu). To install:
   ```powershell
   # Run in PowerShell as Administrator, then reboot:
   wsl --install -d Ubuntu
   ```
3. **Cursor** with the **WSL** extension (Cursor will prompt to install it the
   first time you connect).

---

## One-time setup

### Step 1 — Enable Docker's WSL integration

Without this, `docker` commands inside WSL fail with errors like
`error getting credentials - err: exit status 1`.

1. Open **Docker Desktop → Settings (gear) → Resources → WSL Integration**.
2. Turn on **"Enable integration with my default WSL distro"**.
3. Toggle **ON** the switch for your distro (e.g. **Ubuntu**).
4. Click **Apply & Restart**.
5. In PowerShell, restart WSL so it picks up the change:
   ```powershell
   wsl --shutdown
   ```
6. Reopen the Ubuntu terminal and verify Docker works inside WSL:
   ```bash
   docker run --rm hello-world
   ```
   You should see "Hello from Docker!".

### Step 2 — Move the project into the WSL2 filesystem

Editing/compiling from a Windows path (`/mnt/c/...`) or a OneDrive folder is
slow because every file read crosses the Windows↔Linux boundary. Copy the
project into the Linux home directory instead.

Open the **Ubuntu (WSL)** terminal and run:

```bash
mkdir -p ~/projects

# Copy the working files (skip folders that are large or rebuilt anyway).
rsync -a \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='out' \
  --exclude='.git' \
  "/mnt/c/Users/<YOUR_WINDOWS_USER>/path/to/geekpos-frontend/" \
  ~/projects/geekpos-frontend/

cd ~/projects/geekpos-frontend
```

> Replace `/mnt/c/Users/<YOUR_WINDOWS_USER>/path/to/geekpos-frontend` with your
> real Windows path. Example: `/mnt/c/Users/user/OneDrive/Desktop/geekpos-frontend`.

#### Copy the Git history (`.git`)

`rsync` can fail on large Git pack files over `/mnt/c` with
`Cannot allocate memory`. Use `tar` instead, which reads sequentially:

```bash
cd "/mnt/c/Users/<YOUR_WINDOWS_USER>/path/to/geekpos-frontend"
tar cf - .git | (cd ~/projects/geekpos-frontend && tar xf -)

cd ~/projects/geekpos-frontend
git status   # confirm the repo and your branch are intact
```

**If `tar` also fails** (OneDrive may store files as cloud-only placeholders),
either:

- In Windows, right-click the project folder → **"Always keep on this device"**,
  wait for sync, then retry the `tar` command; **or**
- Get a fresh `.git` from the remote:
  ```bash
  cd ~/projects
  git clone <YOUR_REMOTE_URL> _gittmp
  mv _gittmp/.git ~/projects/geekpos-frontend/.git
  rm -rf _gittmp
  cd ~/projects/geekpos-frontend
  git status
  ```

> ⚠️ **From now on, the WSL copy (`~/projects/geekpos-frontend`) is your source
> of truth.** Stop editing the old Windows/OneDrive copy or you'll end up with
> two diverging versions.

---

## Running the dev server

From `~/projects/geekpos-frontend` in the WSL terminal:

```bash
# First run (builds the image: installs dependencies inside the container)
docker compose up --build

# Subsequent runs (no dependency changes)
docker compose up
```

Wait for:

```
✓ Ready in ...s
- Local:   http://localhost:3000
```

Open **http://localhost:3000** in your browser.

> The **first** visit to each page compiles on demand and may take a while.
> This is a **one-time** cost per page — after it's compiled, edits hot-reload
> quickly, and the `.next` cache persists across restarts.

---

## Editing with live reload (Cursor + WSL)

To make sure your edits land in the folder Docker watches, open the **WSL copy**
in Cursor — not the Windows copy.

**Option A — from the WSL terminal:**

```bash
cd ~/projects/geekpos-frontend
cursor .
```

This opens a new Cursor window connected to WSL. The bottom-left corner shows
**"WSL: Ubuntu"**.

**Option B — from the Cursor UI:**

1. `Ctrl+Shift+P` → **"WSL: Open Folder in WSL…"** (install the WSL extension if
   prompted).
2. Open `/home/<your-user>/projects/geekpos-frontend`.

### Test it

1. Edit a file, e.g. `src/components/pages/signin/SignInFormHeader.tsx`.
2. Save.
3. The Docker logs show a quick recompile and the browser updates automatically.

---

## Everyday commands

```bash
docker compose up            # start
docker compose up -d         # start in background (detached)
docker compose logs -f web   # follow logs when detached
docker compose down          # stop and remove the container
docker compose exec web sh   # open a shell inside the container
```

## Adding or updating dependencies

`node_modules` lives **inside the container** (in a volume), so installing on the
host isn't enough. Do one of:

```bash
# Install inside the running container (takes effect immediately)
docker compose exec web npm install <package>

# OR rebuild the image so it re-runs the install from the lockfile
docker compose up --build
```

---

## How the config files work

### `Dockerfile`
- Based on `node:20-alpine`.
- Copies `package.json` + `package-lock.json` and runs `npm ci` (cached layer).
- Exposes port `3000`.
- Default command runs `next dev` bound to `0.0.0.0`.

### `docker-compose.yml`
- `volumes`:
  - `.:/app` — **bind mount** of your project into the container.
  - `node_modules:/app/node_modules` — keeps the container's dependencies,
    prevents the host from shadowing them.
  - `next_cache:/app/.next` — persists the dev build cache across restarts.
- `ports: ["3000:3000"]` — maps the dev server to your host.
- `command: npm run dev -- -H 0.0.0.0 -p 3000` — starts the dev server in watch
  mode, reachable from the host.
- `environment`:
  - `NODE_OPTIONS=--max-old-space-size=4096` — more heap for big route compiles.
  - On the WSL2 native filesystem, **polling is off** (native file events work).
    If you ever run from a Windows/OneDrive path, re-enable polling:
    `WATCHPACK_POLLING=1000` and `CHOKIDAR_USEPOLLING=true`.

### `next.config.ts`
- `experimental.optimizePackageImports` — tree-shakes large UI/icon libraries
  (antd, primereact, Tabler/Feather icons, ApexCharts) so fewer modules compile
  per route.

---

## Troubleshooting

### Live edits don't show in the browser
You're almost certainly editing the **wrong copy**. Make sure Cursor is open on
the **WSL** folder (`~/projects/geekpos-frontend`, status bar shows "WSL: Ubuntu"),
not the Windows/OneDrive path. The container only watches the WSL copy.

### `error getting credentials - err: exit status 1`
Docker's WSL integration isn't enabled (see **Step 1**). If it persists, reset
the Docker config inside WSL:
```bash
mkdir -p ~/.docker
echo '{}' > ~/.docker/config.json
```

### `rsync: Cannot allocate memory (12)` on `.git` pack files
A WSL bug reading large memory-mapped files over `/mnt/c`. Use the `tar` method
or fresh clone shown in **Step 2**.

### Compiles are still slow
- Confirm the project is under `~/projects/...` (Linux FS), **not** `/mnt/c/...`.
- Each page compiles once on first visit — warm up your main pages, then edits
  are fast.
- Give WSL2 more resources. Create `C:\Users\<YOUR_WINDOWS_USER>\.wslconfig`:
  ```ini
  [wsl2]
  memory=8GB
  processors=4
  ```
  Then `wsl --shutdown` in PowerShell and restart.

### Port 3000 already in use
Stop whatever uses it, or change the host port in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"   # browse http://localhost:3001
```

### `⚠ Specified "rewrites" will not automatically work with "output: export"`
Harmless in development — it only affects static export (`next build`).

---

## Quick reference

| Task | Command (in `~/projects/geekpos-frontend`) |
|------|--------------------------------------------|
| Start dev server | `docker compose up` |
| Rebuild after dep change | `docker compose up --build` |
| Stop | `docker compose down` |
| Logs | `docker compose logs -f web` |
| Shell in container | `docker compose exec web sh` |
| Open in Cursor (WSL) | `cursor .` |
| App URL | http://localhost:3000 |
