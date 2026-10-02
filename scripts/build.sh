#!/usr/bin/env bash
# Rebuilds the Fumadocs site (static export) from all synced content.
# Run on the server by the deploy workflow and the sync-docs reusable workflow.
set -euo pipefail

REPO_DIR="/home/trickfire/docs"

echo "[trickfire-docs] Build started at $(date)"

cd "$REPO_DIR"

# reset instead of pull: the build step regenerates files (e.g. next-env.d.ts)
# that can drift from what's committed, which would make a plain pull abort
git fetch origin main
git reset --hard origin/main
git clean -fd
pnpm install --frozen-lockfile
pnpm site:build

sudo cp "$REPO_DIR/scripts/nginx.conf" /etc/nginx/sites-available/trickfire-docs
sudo nginx -t
sudo nginx -s reload

echo "[trickfire-docs] Build complete at $(date)"
echo "[trickfire-docs] Output: $REPO_DIR/out/"
