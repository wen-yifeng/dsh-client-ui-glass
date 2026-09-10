# install.ps1 — one-command installer for the Glass skin (DSH local plugin).
# Usage:  .\install.ps1 -DshRoot C:\path\to\dsh
#         .\install.ps1            (prompts for the dsh root, or set $env:DSH_ROOT)
#         .\install.ps1 -Proxy http://127.0.0.1:7890   (only needed to reach GitHub)
# What it does (idempotent — safe to re-run):
#   1. place the plugin at <dsh-root>\.dsh\plugins\@deepseek-ai\dsh-client-ui-glass
#   2. junction <dsh-root>\.dsh\profiles\node_modules\@deepseek-ai\dsh-client-ui-glass -> plugins dir
#   3. register "ui-glass" in <dsh-root>\.dsh\profiles\web\cordis.patch.yml
# Run from a clone of this repo it uses the local files; otherwise it downloads
# the latest release zip from GitHub.
param(
  [string]$DshRoot = $(if ($env:DSH_ROOT) { $env:DSH_ROOT } else { '' }),
  [string]$Proxy = ''
)

$ErrorActionPreference = 'Stop'
try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch { }

$RepoSlug = 'wen-yifeng/dsh-client-ui-glass'
$PluginRel = 'plugins\@deepseek-ai\dsh-client-ui-glass'
$LinkRel = 'profiles\node_modules\@deepseek-ai\dsh-client-ui-glass'
$PatchRel = 'profiles\web\cordis.patch.yml'
$PatchBlock = @"

- insert:
    - id: ui-glass
      name: '@deepseek-ai/dsh-client-ui-glass'
"@

if (-not $DshRoot) { $DshRoot = Read-Host 'Path to your dsh root (the folder that contains .dsh)' }
$DshRoot = (Resolve-Path $DshRoot -ErrorAction Stop).Path
if (-not (Test-Path (Join-Path $DshRoot '.dsh\profiles'))) {
  throw "No .dsh\profiles under $DshRoot — launch DSH once first, then pass its root directory via -DshRoot."
}

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$target = Join-Path $DshRoot $PluginRel
$staging = Join-Path $env:TEMP ("dsh-client-ui-glass-" + [guid]::NewGuid().ToString('N').Substring(0, 8))

# 1. Place the plugin files (local clone preferred, release zip as fallback).
if (Test-Path (Join-Path $here 'lib\client.js')) {
  Write-Host "[1/3] Installing from local copy: $here"
  New-Item -ItemType Directory -Path $staging -Force | Out-Null
  robocopy $here $staging /E /XD .git node_modules /NFL /NDL /NJH /NJS | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy failed with code $LASTEXITCODE" }
  $source = $staging
} else {
  Write-Host "[1/3] Downloading latest release zip from github.com/$RepoSlug"
  $headers = @{ 'User-Agent' = 'dsh-client-ui-glass-installer' }
  $invoke = { param($url, $out) if ($Proxy) { Invoke-WebRequest -Uri $url -OutFile $out -Headers $headers -Proxy $Proxy -UseBasicParsing } else { Invoke-WebRequest -Uri $url -OutFile $out -Headers $headers -UseBasicParsing } }
  $release = if ($Proxy) { Invoke-RestMethod "https://api.github.com/repos/$RepoSlug/releases/latest" -Headers $headers -Proxy $Proxy } else { Invoke-RestMethod "https://api.github.com/repos/$RepoSlug/releases/latest" -Headers $headers }
  $asset = $release.assets | Where-Object { $_.name -like 'dsh-client-ui-glass-*.zip' } | Select-Object -First 1
  if (-not $asset) { throw "No zip asset found on the latest release — run from a clone of the repo instead." }
  $zip = Join-Path $env:TEMP $asset.name
  & $invoke $asset.browser_download_url $zip
  Expand-Archive -Path $zip -DestinationPath $staging -Force
  Remove-Item $zip -Force
  $source = Join-Path $staging 'dsh-client-ui-glass'
}

# Idempotent refresh: drop the old copy (junctions are removed as links only).
if (Test-Path $target) {
  if ((Get-Item $target -Force).LinkType) { cmd /c rmdir "$target" | Out-Null }
  else { Remove-Item $target -Recurse -Force }
}
New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
Move-Item $source $target
if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
Write-Host "      plugin placed at $target"

# 2. Junction into the profile's node_modules (the loader resolves the package there).
$link = Join-Path $DshRoot $LinkRel
New-Item -ItemType Directory -Path (Split-Path -Parent $link) -Force | Out-Null
if (Test-Path $link) {
  if ((Get-Item $link -Force).LinkType) { cmd /c rmdir "$link" | Out-Null }
  else { Remove-Item $link -Recurse -Force }
}
New-Item -ItemType Junction -Path $link -Target $target | Out-Null
Write-Host "[2/3] linked $link -> $target"

# 3. Register in the web profile patch layer (create or append, skip when present).
$patch = Join-Path $DshRoot $PatchRel
New-Item -ItemType Directory -Path (Split-Path -Parent $patch) -Force | Out-Null
if ((Test-Path $patch) -and ((Get-Content $patch -Raw -ErrorAction SilentlyContinue) -match 'id:\s*ui-glass')) {
  Write-Host "[3/3] $PatchRel already registers ui-glass"
} elseif (Test-Path $patch) {
  [System.IO.File]::AppendAllText($patch, $PatchBlock, [System.Text.UTF8Encoding]::new($false))
  Write-Host "[3/3] appended ui-glass to $patch"
} else {
  [System.IO.File]::WriteAllText($patch, $PatchBlock.TrimStart() + "`n", [System.Text.UTF8Encoding]::new($false))
  Write-Host "[3/3] created $patch"
}

Write-Host ''
Write-Host 'Done. Restart DSH Web, then look for Settings -> General -> Glass mode.'
