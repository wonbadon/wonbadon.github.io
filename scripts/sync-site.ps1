param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$MessageParts
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

function Get-GhPath {
  $candidates = @(
    (Get-Command gh.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -ErrorAction SilentlyContinue),
    'C:\Program Files\GitHub CLI\gh.exe'
  ) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

  foreach ($candidate in $candidates) {
    if (Test-Path $candidate) {
      return $candidate
    }
  }

  return $null
}

function Test-GhAuth([string]$ghPath) {
  if ([string]::IsNullOrWhiteSpace($ghPath)) {
    return $false
  }

  $null = & $ghPath auth status --hostname github.com 1>$null 2>$null
  return $LASTEXITCODE -eq 0
}

function Ensure-GitIdentity {
  $currentName = git config --get user.name
  $currentEmail = git config --get user.email

  if (-not [string]::IsNullOrWhiteSpace($currentName) -and -not [string]::IsNullOrWhiteSpace($currentEmail)) {
    return
  }

  $ghPath = Get-GhPath
  if (-not (Test-GhAuth $ghPath)) {
    throw 'Git user.name / user.email are not configured, and GitHub CLI is not authenticated.'
  }

  $login = (& $ghPath api user --jq .login 2>$null).Trim()
  $userId = (& $ghPath api user --jq .id 2>$null).Trim()

  if ([string]::IsNullOrWhiteSpace($currentName)) {
    git config user.name $login
    if ($LASTEXITCODE -ne 0) {
      throw 'Failed to configure git user.name.'
    }
  }

  if ([string]::IsNullOrWhiteSpace($currentEmail)) {
    $noreplyEmail = if ([string]::IsNullOrWhiteSpace($userId)) {
      "$login@users.noreply.github.com"
    } else {
      "$userId+$login@users.noreply.github.com"
    }

    git config user.email $noreplyEmail
    if ($LASTEXITCODE -ne 0) {
      throw 'Failed to configure git user.email.'
    }
  }
}

function Ensure-SecondaryRemote {
  $configuredRemote = git config --get sync.secondaryRemote
  if (-not [string]::IsNullOrWhiteSpace($configuredRemote)) {
    return $configuredRemote.Trim()
  }

  $ghPath = Get-GhPath
  if (-not (Test-GhAuth $ghPath)) {
    return $null
  }

  $ownerRepo = git config --get sync.userSiteRepo
  if ([string]::IsNullOrWhiteSpace($ownerRepo)) {
    $ownerRepo = 'wonbadon/wonbadon.github.io'
  }

  Write-Host "Bootstrapping secondary remote for $ownerRepo..."
  $null = powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'bootstrap-user-site.ps1') -Owner ($ownerRepo.Split('/')[0]) -RepoName ($ownerRepo.Split('/')[1]) -RemoteName 'user-site' -SkipPush
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to bootstrap secondary remote for $ownerRepo."
  }

  return ((git config --get sync.secondaryRemote).Trim())
}

$Message = ($MessageParts -join ' ').Trim()
$secondaryRemote = Ensure-SecondaryRemote

if ([string]::IsNullOrWhiteSpace($Message)) {
  $Message = "Sync site " + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
}

$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
  Write-Host 'No changes to sync.'
  exit 0
}

Write-Host 'Running production build...'
npm run build
if ($LASTEXITCODE -ne 0) {
  throw 'Production build failed.'
}

Write-Host 'Staging changes...'
git add -A
if ($LASTEXITCODE -ne 0) {
  throw 'git add failed.'
}

Ensure-GitIdentity

Write-Host 'Creating commit...'
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
  throw 'git commit failed.'
}

Write-Host 'Pushing to GitHub...'
git push origin HEAD
if ($LASTEXITCODE -ne 0) {
  throw 'git push origin failed.'
}

if (-not [string]::IsNullOrWhiteSpace($secondaryRemote)) {
  Write-Host "Pushing mirror to $secondaryRemote..."
  git push $secondaryRemote HEAD
  if ($LASTEXITCODE -ne 0) {
    throw "git push $secondaryRemote failed."
  }
}

Write-Host 'Push complete. GitHub Pages deployment will start automatically.'