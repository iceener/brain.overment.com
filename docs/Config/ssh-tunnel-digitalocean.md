# SSH Tunnel to DigitalOcean VPS

Reverse SSH tunnel exposing localhost:8080 via a custom domain.

## Setup

**LaunchAgent:** `~/Library/LaunchAgents/com.<name>.ssh-tunnel.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.<name>.ssh-tunnel</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/ssh</string>
        <string>-R</string>
        <string>8080:localhost:8080</string>
        <string><user>@<VPS_IP></string>
        <string>-o</string>
        <string>ServerAliveInterval=60</string>
        <string>-o</string>
        <string>ExitOnForwardFailure=yes</string>
        <string>-N</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

## Troubleshooting: Tunnel Hung / Port Stuck

**Symptom:** `launchctl list | grep ssh` shows exit code 255, tunnel won't restart.

**Cause:** Mac disconnected (sleep/network) but VPS didn't know — port 8080 stays bound to dead session.

**Fix:**

1. Kill stale port on VPS:
   ```bash
   ssh <user>@<VPS_IP> "lsof -i :8080 -t | xargs kill -9"
   ```

2. Restart tunnel:
   ```bash
   launchctl start com.<name>.ssh-tunnel
   ```

## Prevention

Add to VPS `/etc/ssh/sshd_config`:

```
ClientAliveInterval 30
ClientAliveCountMax 2
```

Then `systemctl restart sshd`. Server will detect dead clients within ~60s and auto-release port.

## Useful Commands

```bash
# Check tunnel status
launchctl list | grep ssh

# Manual tunnel with debug
ssh -R 8080:localhost:8080 <user>@<VPS_IP> -o ServerAliveInterval=60 -o ExitOnForwardFailure=yes -N -v

# Force restart
launchctl kickstart -k gui/$(id -u)/com.<name>.ssh-tunnel
```
