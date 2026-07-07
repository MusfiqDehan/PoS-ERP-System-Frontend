#!/usr/bin/env bash
# Blue-green zero-downtime production deploy for Sortorium frontend.
# Run on the VPS from the repository root (VPS_DEPLOY_PATH).
set -euo pipefail

IMAGE_TAG="${IMAGE_TAG:-latest}"
LIVE_CONTAINER="sortorium-frontend"
CANDIDATE_CONTAINER="sortorium-frontend-candidate"
COMPOSE=(docker compose -f docker-compose.prod.yml)
COMPOSE_DEPLOY=(docker compose -f docker-compose.prod.yml -f docker-compose.deploy.yml)
SMOKE_URL="${SMOKE_URL:-https://sortorium.com/}"
HEALTH_TIMEOUT_SECONDS="${HEALTH_TIMEOUT_SECONDS:-180}"
DRAINED=0

log() { printf '[deploy] %s\n' "$*"; }
die() { printf '[deploy] ERROR: %s\n' "$*" >&2; exit 1; }

cleanup_candidate() {
  log "Removing candidate container (if any)..."
  IMAGE_TAG="$IMAGE_TAG" "${COMPOSE_DEPLOY[@]}" rm -sf frontend_candidate >/dev/null 2>&1 || true
  docker rm -f "$CANDIDATE_CONTAINER" >/dev/null 2>&1 || true
}

on_error() {
  local exit_code=$?
  if [[ "$DRAINED" -eq 0 ]]; then
    log "Deploy failed before live drain — live container should still be serving."
    cleanup_candidate
  else
    log "Deploy failed after live drain — investigate canonical frontend immediately."
  fi
  exit "$exit_code"
}
trap on_error ERR

wait_container_healthy() {
  local name=$1
  local deadline=$((SECONDS + HEALTH_TIMEOUT_SECONDS))
  log "Waiting for $name to become healthy..."
  while (( SECONDS < deadline )); do
    local status
    status="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$name" 2>/dev/null || echo missing)"
    if [[ "$status" == "healthy" ]]; then
      log "$name is healthy."
      return 0
    fi
    if [[ "$status" == "missing" ]]; then
      die "Container $name not found."
    fi
    sleep 5
  done
  die "Timed out waiting for $name to become healthy."
}

smoke_check_candidate() {
  log "Candidate container smoke check: $CANDIDATE_CONTAINER"
  local response
  response="$(docker exec "$CANDIDATE_CONTAINER" wget -S -O - http://127.0.0.1:80/ 2>&1)" \
    || die "Failed to fetch / inside candidate container"
  if echo "$response" | grep -qi 'location:.*signin'; then
    die "Candidate root still redirects to /signin — check nginx.conf in the image"
  fi
  if ! echo "$response" | grep -qE 'HTTP/[0-9.]+ 200'; then
    die "Candidate root did not return HTTP 200"
  fi
}

smoke_check_external() {
  log "HTTPS smoke check: $SMOKE_URL"
  local headers status
  headers="$(curl -sSI --max-redirs 0 --retry 5 --retry-delay 3 --retry-all-errors "$SMOKE_URL")" \
    || die "HTTPS smoke check failed (no response)"
  status="$(echo "$headers" | awk 'toupper($0) ~ /^HTTP/ { print $2; exit }')"
  if [[ "$status" != "200" ]]; then
    if echo "$headers" | grep -qi '^location:.*signin'; then
      die "Root URL redirects to /signin (HTTP $status)"
    fi
    die "Root URL returned HTTP $status (expected 200)"
  fi
}

export IMAGE_TAG

finalize_deploy_tree() {
  # CI syncs this directory via rsync (see .github/workflows/production.yml).
  # rsync excludes .git/, so an old clone leaves HEAD behind while files on disk
  # match GitHub — git status then shows thousands of phantom changes.
  if [[ -d .git ]]; then
    log "Removing stale .git metadata (deploy tree is rsync-managed, not git-managed)."
    rm -rf .git
  fi
  printf '%s\n' "${IMAGE_TAG}" > .deploy-revision
}

finalize_deploy_tree

log "Phase 1: build frontend image (tag=$IMAGE_TAG) while live serves..."
IMAGE_TAG="$IMAGE_TAG" "${COMPOSE[@]}" build frontend

log "Phase 2: start frontend candidate alongside live..."
IMAGE_TAG="$IMAGE_TAG" "${COMPOSE_DEPLOY[@]}" up -d --no-deps frontend_candidate

log "Phase 3: wait for candidate health..."
wait_container_healthy "$CANDIDATE_CONTAINER"

log "Phase 4: candidate smoke check (direct — live still in Traefik pool)..."
smoke_check_candidate

log "Phase 5: graceful drain of live frontend..."
DRAINED=1
docker stop -t 30 "$LIVE_CONTAINER"

log "Phase 6: promote canonical frontend with image tag $IMAGE_TAG..."
IMAGE_TAG="$IMAGE_TAG" "${COMPOSE[@]}" up -d --no-deps frontend

log "Phase 7: wait for canonical frontend..."
wait_container_healthy "$LIVE_CONTAINER"

log "Phase 8: remove candidate..."
cleanup_candidate

log "Phase 8.5: let Traefik discover the new container labels..."
sleep 10

log "Phase 9: final external smoke check..."
smoke_check_external

trap - ERR
log "Frontend deploy complete (image tag=$IMAGE_TAG)."
