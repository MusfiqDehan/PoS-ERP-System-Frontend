# Running Sortorium on Windows with Docker + WSL2 (Live Reload)

This guide gets the **Sortorium** Next.js front-end running on a **Windows** machine using
**Docker** inside **WSL2**, with **instant live reload** — you edit a file in your IDE and the
website updates automatically in the browser, **with no need to rebuild or restart the container**.

It is written so you can follow it top-to-bottom and **avoid the bugs that were hit during initial
setup** (Docker credential errors, IDE "JSX" errors, a corrupted `.git`, and thousands of fake
"modified" files). Each of those has a fix or prevention built into the steps below.

> TL;DR: **Put the project inside the WSL2 Linux filesystem (`~/projects/...`), not in
> `C:\` / `/mnt/c`.** Then `docker compose up`. That single decision prevents most of the pain.

---

## 0. Why the project MUST live inside WSL (read this first)

Do **NOT** keep the project under `C:\Users\...` or open it from `/mnt/c/...` in WSL.

Running from the Windows filesystem (`/mnt/c`) through Docker causes:

- **Extremely slow file watching / HMR** (cross-OS filesystem is slow).
- **CRLF line-ending corruption** → git shows *every* file as "modified".
- **Permission / ownership churn** → git shows fake changes and can corrupt `.git`.
- **OneDrive / antivirus** can silently delete or lock git pack files → a broken repository.

Keeping the repo on the **native Linux filesystem** (e.g. `/home/<you>/projects/geekpos-frontend`)
makes the bind mount Linux→Linux, so file watching, permissions, and line endings all behave.

---

## 1. Prerequisites (install once)

1. **Windows 10 (21H2+) or Windows 11.**
2. **WSL2** with a Linux distro (Ubuntu recommended).
   Open **PowerShell as Administrator** and run:
   ```powershell
   wsl --install -d Ubuntu
   ```
   Reboot if prompted, then open **Ubuntu** from the Start menu and create your Linux user.
   Confirm you are on **WSL version 2**:
   ```powershell
   wsl -l -v
   ```
   The `VERSION` column must say `2`. If it says `1`, run:
   ```powershell
   wsl --set-version Ubuntu 2
   ```
3. **Docker Desktop for Windows** — install from docker.com, then:
   - Open **Docker Desktop → Settings → General** → ensure **"Use the WSL 2 based engine"** is ON.
   - **Settings → Resources → WSL Integration** → toggle **ON** for your distro (e.g. Ubuntu).
   - Click **Apply & Restart**.

You do **not** need to install Node.js on Windows. Docker provides Node inside the container.

---

## 2. Get the project onto the WSL Linux filesystem

Open your **Ubuntu (WSL)** terminal (not PowerShell) and clone into your Linux home:

```bash
mkdir -p ~/projects
cd ~/projects
git clone https://github.com/GeekSSort/geekpos_frontend.git geekpos-frontend
cd geekpos-frontend
```

> Tip: To open this folder in your IDE, from the WSL terminal run `cursor .` (or `code .`).
> The path should look like `/home/<you>/projects/geekpos-frontend` — **never** `/mnt/c/...`.

---

## 3. One-time Git setup (prevents fake "modified" files)

Run these **inside the project folder** so git doesn't flag permission/line-ending noise:

```bash
# Don't track the Unix executable bit (Docker can flip it and create fake "modified" files)
git config core.filemode false

# Keep line endings as LF (this is a Linux/Docker project)
git config core.autocrlf false
```

Also tell your editor to save files as **LF**. Create/update `.vscode/settings.json`:

```json
{
  "files.eol": "\n"
}
```

---

## 4. Fix the Docker credential error (do this if the build fails)

If `docker compose up --build` fails with:

```
failed to solve: error getting credentials - err: exit status 1
```

…it's because Docker is configured to use the Windows credential helper, which can't run inside
WSL. Fix it by editing `~/.docker/config.json` **in WSL**:

```bash
cat ~/.docker/config.json
```

If it contains `"credsStore": "desktop.exe"` (or similar), replace the file contents with:

```json
{}
```

(You only need a real `credsStore` if you log in to a **private** image registry. Pulling public
images like `node:20-alpine` does not.)

If WSL ever throws `accept4 failed` / interop errors, reset it from **PowerShell**:

```powershell
wsl --shutdown
```

then reopen Ubuntu.

---

## 5. Start the app

From the project folder in WSL:

```bash
# First time, or after dependency/Dockerfile changes — builds the image:
docker compose up --build
```

Wait for the log line similar to:

```
✓ Ready in ... ready - started server on 0.0.0.0:3000
```

Then open the site in your **Windows browser**:

👉 **http://localhost:3000**

To stop the app: press **Ctrl+C**, then (optionally) `docker compose down`.

On subsequent days you usually **don't** need `--build`:

```bash
docker compose up
```

---

## 6. Live reload — edit and see changes instantly (no rebuild!)

This is the whole point of the setup. Once the container is running:

1. Edit any file under `src/` in your IDE (e.g. a component, style, or page).
2. **Save.**
3. The browser at `http://localhost:3000` updates automatically (Hot Module Reload).

**You do NOT rebuild or restart the container for normal code changes.** This works because
`docker-compose.yml` bind-mounts your project into the container (`.:/app`) and Next.js watches
for file changes.

### When DO you need to rebuild?

Only for things baked into the image or read at startup:

| Change you made | What to run |
|---|---|
| Edited a component / page / style / JSON (anything in `src/`) | Nothing — just save (live reload) |
| Added/removed an npm dependency (`package.json`) | `docker compose up --build` |
| Changed the `Dockerfile` | `docker compose up --build` |
| Changed `docker-compose.yml` | `docker compose up` (recreates container) |
| Changed env vars | `docker compose up` (recreates container) |

---

## 7. How it works (so the magic isn't mysterious)

`docker-compose.yml` sets up three things that make this safe and fast:

```yaml
volumes:
  - .:/app                          # your live source is mounted into the container
  - /app/.git                       # shadow .git so the container can't corrupt your repo
  - node_modules:/app/node_modules  # deps live in a volume (installed in the image, not your host)
  - next_cache:/app/.next           # persist the dev build cache for faster restarts
```

- **`.:/app`** — local edits appear instantly inside the container → live reload.
- **`/app/.git`** — an empty in-container folder hides your real `.git`, so the container's root
  user can never touch or corrupt your git history. (This was a real bug that this prevents.)
- **`node_modules` volume** — the container uses the dependencies installed during `docker build`,
  and your host `node_modules` never shadows them. This is also why you don't need Node on Windows.

---

## 8. Optional: make your IDE (TypeScript) happy

Because `node_modules` lives in a Docker volume, your **host** may not have it, so the IDE can show
errors like `JSX element implicitly has type 'any' ... JSX.IntrinsicElements`. This is **only an
editor IntelliSense issue** — the app still runs fine in Docker.

To fix IntelliSense, install dependencies on the host too:

```bash
# If you have Linux Node/npm in WSL:
npm ci

# Or, if you have Bun installed in WSL:
bun install
```

Then in your IDE run **"TypeScript: Restart TS Server"** (Ctrl+Shift+P).

> Don't have Node in WSL? Install it once with nvm:
> ```bash
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
> source ~/.bashrc
> nvm install 20
> ```

---

## 9. Troubleshooting (the exact issues hit during setup)

**`error getting credentials - err: exit status 1` during build**
→ See [Step 4](#4-fix-the-docker-credential-error-do-this-if-the-build-fails). Set
`~/.docker/config.json` to `{}`.

**IDE shows `JSX.IntrinsicElements` / `ts(7026)` on every file**
→ Host `node_modules` is empty. See [Step 8](#8-optional-make-your-ide-typescript-happy), then
restart the TS Server.

**Source Control / Git Graph shows nothing, or `fatal: unable to read tree ...`**
→ Your `.git` is corrupted (often from running on `/mnt/c` or a container writing to it). Recover
from the remote without losing local edits:
```bash
cd ~/projects
git clone https://github.com/GeekSSort/geekpos_frontend.git geekpos-fresh
mv geekpos-frontend/.git geekpos-frontend/.git.broken   # backup
mv geekpos-fresh/.git    geekpos-frontend/.git
rm -rf geekpos-fresh
cd geekpos-frontend && git status
```
The `/app/.git` shadow volume now in `docker-compose.yml` prevents this from recurring.

**Thousands of files show as "modified" but you didn't change them**
→ Permission (executable bit) or CRLF/LF line-ending noise. Apply [Step 3](#3-one-time-git-setup-prevents-fake-modified-files). To clean existing CRLF differences:
```bash
git config core.filemode false
# convert only line-ending-only files back to LF:
for f in $(git diff --name-only); do
  [ -f "$f" ] && [ -z "$(git diff -w -- "$f")" ] && sed -i 's/\r$//' "$f"
done
```

**Edits aren't live-reloading**
→ Confirm the project is on the WSL filesystem (`~/...`, not `/mnt/c`). If you must use a Windows
path, enable polling by adding to the `environment:` block in `docker-compose.yml`:
```yaml
- WATCHPACK_POLLING=1000
- CHOKIDAR_USEPOLLING=true
```

**Port 3000 already in use**
→ Stop the other process, or change the host port mapping in `docker-compose.yml`
(`"3001:3000"`) and open `http://localhost:3001`.

---

## 10. Quick command reference

```bash
docker compose up --build   # build image + start (first run / after dep or Dockerfile changes)
docker compose up           # start (normal day-to-day)
docker compose up -d        # start in background (detached)
docker compose logs -f      # follow logs
docker compose down         # stop & remove the container
docker compose down -v      # also remove the node_modules / .next volumes (forces clean reinstall)
docker compose build --no-cache   # rebuild from scratch if the image seems stale
```

Open the app at **http://localhost:3000**.
