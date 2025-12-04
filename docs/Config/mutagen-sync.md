# Mutagen Sync Setup for Alice AI + Obsidian

## Problem

SSHFS is too slow for real-time Obsidian sync. Every file operation requires a network round-trip, causing massive delays when working with many small files.

## Solution

**Mutagen**: A bidirectional file sync tool that works over SSH. You edit local files at native speed; a background daemon handles synchronization.

---

## Setup Steps (Completed)

### 1. SSH Passwordless Authentication

**Why:** Mutagen must reconnect automatically without manual password entry.

**What we did:**

- Generated SSH key pair (already existed): `~/.ssh/id_rsa`
- Copied public key to VPS: `ssh-copy-id alice@138.68.111.47`
- Fixed permissions on VPS (SSH rejected keys due to world-writable home):

```
  chmod 755 /home/alice  chmod 700 /home/alice/.ssh  chmod 600 /home/alice/.ssh/authorized_keys  
```

- Verified: `ssh alice@138.68.111.47 "echo Success"` (no password prompt)

### 2. Mutagen Installation

**Local (macOS):**

```
brew install mutagen-io/mutagen/mutagen
```

**Remote:** Agent auto-installs on first connection (no manual setup needed).

### 3. Created Sync Session

```
mutagen sync create \
    --name=alice-knowledge \
    --sync-mode=two-way-safe \
    ~/vps_knowledge \
    alice@138.68.111.47:/home/alice/ai-runner/_work/alice-ai/alice-ai/knowledge
```

**Parameters:**

- `--name`: Human-readable identifier
- `--sync-mode=two-way-safe`: Bidirectional sync with conflict detection (never overwrites without warning)
- Local path: `~/vps_knowledge`
- Remote path: `/home/alice/ai-runner/_work/alice-ai/alice-ai/knowledge`

### 4. Resolved Initial Conflict

**Issue:** `.obsidian/workspace.json` existed on both sides with different content.

**Resolution:**

- Deleted remote version: `ssh alice@138.68.111.47 "rm /home/alice/ai-runner/_work/alice-ai/alice-ai/knowledge/.obsidian/workspace.json"`
- Flushed local copy to remote: `mutagen sync flush alice-knowledge`

---

## Current Configuration

### Session Details

- **Name:** `alice-knowledge`
- **Mode:** Two-way safe (conflict-preserving)
- **Local:** `~/vps_knowledge`
- **Remote:** `alice@138.68.111.47:/home/alice/ai-runner/_work/alice-ai/alice-ai/knowledge`
- **Status:** Active, watching for changes
- **Sync Latency:** 1-2 seconds

### File Counts (as of setup)

- 68 directories
- 204 files (~13 MB)
- 0 symbolic links

---

## Daily Usage

### Obsidian

Point vault to `~/vps_knowledge`. Work normally. Changes sync automatically to VPS.

### AI Agent Access

Agent reads/writes to `/home/alice/ai-runner/_work/alice-ai/alice-ai/knowledge` on VPS. Changes appear locally within seconds.

### Monitoring

```
mutagen sync list                    # Check statusmutagen sync monitor                 # Watch live changesmutagen sync flush alice-knowledge   # Force immediate sync
```

### After System Reboot

If Mutagen daemon stops:

```
mutagen daemon start
```

Session resumes automatically.

---

## Optional: Ignore Obsidian UI State

To prevent `.obsidian/workspace.json` conflicts (recommended):

```
mutagen sync terminate alice-knowledgemutagen sync create \
    --name=alice-knowledge \
    --sync-mode=two-way-safe \
    --ignore=".obsidian/workspace.json" \
    ~/vps_knowledge \
    alice@138.68.111.47:/home/alice/ai-runner/_work/alice-ai/alice-ai/knowledge
```

---

## Key Constraints & Risks

1. **Conflict Handling:** If both you and the AI modify the same file simultaneously, Mutagen creates conflict copies (filename with hash suffix). Resolve manually.
2. **Atomic Writes:** Ensure AI agent writes atomically (write to temp file → rename) to avoid partial-file syncs.
3. **Network Dependency:** If SSH connection drops, sync pauses until reconnected (auto-reconnects via passwordless auth).
4. **No Version Control:** Mutagen is not Git. Consider using Obsidian Git plugin as backup for critical notes.

---

## Troubleshooting

**Sync stuck:**

```
mutagen sync reset alice-knowledge
```

**Connection issues:**

```
mutagen daemon stopmutagen daemon start
```

**Check logs:**

```
mutagen daemon logs
```

