---
title: Cloudflare Tunnel
---

A Cloudflare tunnel replaces the need for an open inbound port or a TLS certificate. The `cloudflared` daemon on the server opens an outbound connection to Cloudflare's network, and Cloudflare forwards HTTPS traffic from `docs.trickfirerobotics.com` through that connection to nginx on `localhost:80`.

### 1. Install cloudflared

```bash
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/cloudflare-main.gpg

echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] \
  https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" \
  | sudo tee /etc/apt/sources.list.d/cloudflared.list

sudo apt update
sudo apt install -y cloudflared
```

Verify:

```bash
cloudflared --version
```

### 2. Authenticate with Cloudflare

```bash
cloudflared tunnel login
```

This opens a browser URL. Log in and select the `trickfirerobotics.com` zone. A certificate is saved to `~/.cloudflared/cert.pem`.

### 3. Create the tunnel

```bash
cloudflared tunnel create trickfire-docs
```

This creates a tunnel and saves a credentials file at `~/.cloudflared/<tunnel-id>.json`. Note the tunnel ID in the output - you'll need it in the next step.

### 4. Write the tunnel config

Create `/etc/cloudflared/trickfire-docs.yml` (named after the tunnel, not the generic `config.yml`, so it coexists with other tunnels on the same server):

```yaml
tunnel: <tunnel-id>
credentials-file: /home/trickfire/.cloudflared/<tunnel-id>.json

ingress:
    - hostname: docs.trickfirerobotics.com
      service: http://localhost:80
    - service: http_status:404
```

Replace `<tunnel-id>` with the UUID from step 3.

### 5. Add the DNS record

```bash
cloudflared tunnel route dns trickfire-docs docs.trickfirerobotics.com
```

This creates a `CNAME` record in Cloudflare pointing `docs.trickfirerobotics.com` → `<tunnel-id>.cfargotunnel.com`. Cloudflare automatically sets the record to proxied (orange cloud).

Verify in the Cloudflare dashboard under **DNS → Records**.

### 6. Run as a systemd service

`cloudflared service install` always creates a unit named `cloudflared.service` regardless of any `--config` flag. To get a named service that can coexist with other tunnels, write the unit file manually:

```bash
sudo tee /etc/systemd/system/cloudflared-trickfire-docs.service << 'EOF'
[Unit]
Description=cloudflared - trickfire-docs
After=network-online.target
Wants=network-online.target

[Service]
TimeoutStartSec=15
Type=notify
ExecStart=/usr/bin/cloudflared --no-autoupdate --config /etc/cloudflared/trickfire-docs.yml tunnel run
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now cloudflared-trickfire-docs
```

Check status:

```bash
sudo systemctl status cloudflared-trickfire-docs
```

The tunnel starts automatically on boot. Cloudflare will reconnect automatically if the server restarts.

### 7. Verify end-to-end

```bash
curl -I https://docs.trickfirerobotics.com
# HTTP/2 200
```

You should see `HTTP/2 200` and Cloudflare response headers (`cf-ray`, `server: cloudflare`).

## nginx config for tunnel

When using a Cloudflare tunnel, nginx only needs to handle plain HTTP on localhost. TLS termination is done by Cloudflare, so no certificate is needed. The config in `scripts/nginx.conf` is already written for this setup.

Key points in the nginx config:

- Listens only on `127.0.0.1:80` - not reachable from outside
- No SSL directives
- `try_files` for Next.js static export routing (falls back to `<uri>.html`, then `index.html`)
- Immutable cache headers for hashed JS/CSS assets

## Troubleshooting

**Tunnel shows as unhealthy in Cloudflare dashboard:**

```bash
sudo journalctl -u cloudflared-trickfire-docs -f
```

Common causes: server can't reach `cloudflare.com`, or credentials file path is wrong.

**Site loads but returns 502:**
Check nginx is running and the build directory exists:

```bash
sudo systemctl status nginx
ls /home/trickfire/docs/out/index.html
```

**DNS not resolving:**
DNS propagation can take a few minutes. The `cloudflared tunnel route dns` command should update it instantly in Cloudflare, but local resolvers may cache the old value.
