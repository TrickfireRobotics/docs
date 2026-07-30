---
title: Server Setup
---

This project is ran on our Debian server, but this setup should work on any Debian-based server.

### 1. Install system dependencies

This project requires `rsync` for syncing the documentation from repos, and `nginx` for routing, and then `node` for running the framework.

```bash
sudo apt update
sudo apt install -y git curl rsync nginx
```

Use the NodeSource repo for Node.js 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

You can verify the correct version matches what this project requires:

```bash
node --version   # v22.x.x
```

Then we need the `pnpm` package manager:

```bash
npm install -g pnpm
```

### 2. Clone the repo

```bash
git clone https://github.com/TrickfireRobotics/docs.git /home/trickfire/docs
cd /home/trickfire/docs
```

### 3. Install dependencies and build

```bash
pnpm install --frozen-lockfile
pnpm site:build
```

The first build takes 1–2 minutes. Subsequent builds are faster due to pnpm's cache.

### 4. Configure `nginx`

The `sites-available`/`sites-enabled` directories are not created automatically on all distros. Create them if missing, then copy the config and enable it:

```bash
sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
sudo cp /home/trickfire/docs/scripts/nginx.conf /etc/nginx/sites-available/trickfire-docs
sudo ln -s /etc/nginx/sites-available/trickfire-docs /etc/nginx/sites-enabled/trickfire-docs
```

Make sure `/etc/nginx/nginx.conf` includes the `sites-enabled` directory inside its `http {}` block. Check with:

```bash
grep -n "sites-enabled" /etc/nginx/nginx.conf
```

If nothing is returned, add this line inside the `http {}` block:

```nginx
include /etc/nginx/sites-enabled/*;
```

nginx runs as `www-data` and cannot traverse `/home/trickfire` by default. Grant execute permission:

```bash
sudo chmod o+x /home/trickfire
```

Then test and reload:

```bash
sudo nginx -t
sudo nginx -s reload
```

The config serves `out/` on `localhost:80`. The Cloudflare tunnel (set up next) is what exposes this to the internet, `nginx` itself only listens on localhost.

### 5. Verify the server

```bash
curl -I http://localhost/
# HTTP/1.1 200 OK
```

## Updating the server

The `scripts/build.sh` script handles updates automatically. To run it manually:

```bash
bash /home/trickfire/docs/scripts/build.sh
```

This pulls the latest framework code, updates dependencies if the lockfile changed, and rebuilds the site. Content in `content/` is untouched (it's gitignored).
