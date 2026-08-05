#!/bin/bash
# Tests the CLI in a clean project with no trickfire-docs installation -
# simulates npx trickfire-docs usage.

set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Building docs-cli package..."
pnpm install
pnpm cli:build

PACKAGE_ROOT="$(pwd)"
CLI_BIN="$PACKAGE_ROOT/dist-cli/cli.js"

echo "==> Creating example project..."
rm -rf .cli-test || true
mkdir .cli-test
cd .cli-test
echo '{"name": "cli-test", "version": "1.0.0", "type": "module"}' >package.json

echo "==> Initializing docs using init command..."
node "$CLI_BIN" init

echo "==> Running trickfire-docs dev..."
node "$CLI_BIN" dev
