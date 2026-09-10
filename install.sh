#!/usr/bin/env bash
# install.sh — one-command installer for the Glass skin (DSH local plugin).
# Usage:  ./install.sh /path/to/dsh
#         ./install.sh                 (prompts, or set DSH_ROOT)
#         GH_PROXY=http://127.0.0.1:7890 ./install.sh   (only needed to reach GitHub)
# What it does (idempotent — safe to re-run):
#   1. place the plugin at <dsh-root>/.dsh/plugins/@deepseek-ai/dsh-client-ui-glass
#   2. symlink <dsh-root>/.dsh/profiles/node_modules/@deepseek-ai/dsh-client-ui-glass -> plugins dir
#   3. register "ui-glass" in <dsh-root>/.dsh/profiles/web/cordis.patch.yml
# Run from a clone of this repo it uses the local files; otherwise it downloads
# the latest release zip from GitHub.
set -euo pipefail

REPO_SLUG="wen-yifeng/dsh-client-ui-glass"
PLUGIN_REL="plugins/@deepseek-ai/dsh-client-ui-glass"
LINK_REL="profiles/node_modules/@deepseek-ai/dsh-client-ui-glass"
PATCH_REL="profiles/web/cordis.patch.yml"

DSH_ROOT="${1:-${DSH_ROOT:-}}"
if [ -z "$DSH_ROOT" ]; then
  read -r -p "Path to your dsh root (the folder that contains .dsh): " DSH_ROOT
fi
DSH_ROOT="$(cd "$DSH_ROOT" && pwd)"
[ -d "$DSH_ROOT/.dsh/profiles" ] || { echo "No .dsh/profiles under $DSH_ROOT — launch DSH once first, then pass its root." >&2; exit 1; }

here="$(cd "$(dirname "$0")" && pwd)"
target="$DSH_ROOT/$PLUGIN_REL"
staging="$(mktemp -d)"

# 1. Place the plugin files (local clone preferred, release zip as fallback).
if [ -f "$here/lib/client.js" ]; then
  echo "[1/3] Installing from local copy: $here"
  mkdir -p "$staging"
  (cd "$here" && tar --exclude=./.git --exclude=./node_modules -cf - .) | tar -xf - -C "$staging"
  source_dir="$staging"
else
  echo "[1/3] Downloading latest release zip from github.com/$REPO_SLUG"
  curl_flags=(-fsSL --retry 3)
  [ -n "${GH_PROXY:-}" ] && curl_flags+=(-x "$GH_PROXY")
  asset_url="$(curl "${curl_flags[@]}" "https://api.github.com/repos/$REPO_SLUG/releases/latest" \
    | grep -o '"browser_download_url": *"[^"]*dsh-client-ui-glass-[^"]*\.zip"' \
    | head -1 | sed 's/.*"\(https[^"]*\)"/\1/')"
  [ -n "$asset_url" ] || { echo "No zip asset found on the latest release — run from a clone of the repo instead." >&2; exit 1; }
  curl "${curl_flags[@]}" -o "$staging/glass.zip" "$asset_url"
  mkdir -p "$staging/unzip"
  unzip -q "$staging/glass.zip" -d "$staging/unzip"
  source_dir="$staging/unzip/dsh-client-ui-glass"
fi

# Idempotent refresh: drop the old copy (symlinks removed as links only).
if [ -L "$target" ]; then rm "$target"; elif [ -d "$target" ]; then rm -rf "$target"; fi
mkdir -p "$(dirname "$target")"
mv "$source_dir" "$target"
rm -rf "$staging"
echo "      plugin placed at $target"

# 2. Symlink into the profile's node_modules (the loader resolves the package there).
link="$DSH_ROOT/$LINK_REL"
mkdir -p "$(dirname "$link")"
[ -L "$link" ] && rm "$link"
[ -e "$link" ] && rm -rf "$link"
ln -sfn "$target" "$link"
echo "[2/3] linked $link -> $target"

# 3. Register in the web profile patch layer (create or append, skip when present).
patch="$DSH_ROOT/$PATCH_REL"
mkdir -p "$(dirname "$patch")"
if [ -f "$patch" ] && grep -q 'id:[[:space:]]*ui-glass' "$patch"; then
  echo "[3/3] $PATCH_REL already registers ui-glass"
else
  printf '\n- insert:\n    - id: ui-glass\n      name: %s\n' "'@deepseek-ai/dsh-client-ui-glass'" >> "$patch"
  echo "[3/3] registered ui-glass in $patch"
fi

echo
echo "Done. Restart DSH Web, then look for Settings -> General -> Glass mode."
