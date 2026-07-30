#!/bin/bash
# Tests the CLI in a clean project with no trickfire-docs installation -
# simulates npx trickfire-docs usage.

set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Building docs-framework package..."
pnpm install
pnpm framework:build

PACKAGE_ROOT="$(pwd)"
CLI_BIN="$PACKAGE_ROOT/dist-cli/cli.js"

echo "==> Creating example project..."
rm -rf .framework-test || true
mkdir .framework-test
cd .framework-test
echo '{"name": "framework-test", "version": "1.0.0", "type": "module"}' >package.json

echo "==> Initializing docs using init command..."
node "$CLI_BIN" init

echo "==> Running trickfire-docs dev..."
node "$CLI_BIN" dev
