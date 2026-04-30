param(
  [string]$Owner = 'wonbadon',
  [string]$RepoName = 'wonbadon.github.io',
  [string]$RemoteName = 'user-site',
  [switch]$SkipPush,
  [switch]$DryRun
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

  throw 'GitHub CLI not found. Install GitHub CLI first.'
}

function Test-GhAuth([string]$ghPath) {
  $null = & $ghPath auth status --hostname github.com 1>$null 2>$null
  return $LASTEXITCODE -eq 0
}

function Test-RepoExists([string]$ghPath, [string]$ownerRepo) {
  $quotedGhPath = '"' + $ghPath + '"'
  cmd /c "$quotedGhPath repo view $ownerRepo >nul 2>nul"
  return $LASTEXITCODE -eq 0
}

function Test-RemoteExists([string]$remoteName) {
  $remoteList = git remote
  return $remoteList -contains $remoteName
}

function Ensure-Remote([string]$remoteName, [string]$remoteUrl) {
  if (Test-RemoteExists $remoteName) {
    git remote set-url $remoteName $remoteUrl
    return
  }

  git remote add $remoteName $remoteUrl
}

$ghPath = Get-GhPath
$ownerRepo = "$Owner/$RepoName"
$remoteUrl = "https://github.com/$ownerRepo.git"

if ($DryRun) {
  Write-Host "gh path: $ghPath"
  Write-Host "owner repo: $ownerRepo"
  Write-Host "remote name: $RemoteName"
  Write-Host "remote url: $remoteUrl"
  exit 0
}

if (-not (Test-GhAuth $ghPath)) {
  throw 'GitHub CLI is not authenticated. Run gh auth login first.'
}

if (-not (Test-RepoExists $ghPath $ownerRepo)) {
  Write-Host "Creating GitHub repository $ownerRepo..."
  $null = & $ghPath repo create $ownerRepo --public
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to create GitHub repository $ownerRepo."
  }
}

Write-Host "Configuring remote $RemoteName..."
Ensure-Remote $RemoteName $remoteUrl
git config sync.secondaryRemote $RemoteName
git config sync.userSiteRepo $ownerRepo

if (-not $SkipPush) {
  Write-Host "Pushing current branch to $RemoteName..."
  git push $RemoteName HEAD
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to push current branch to $RemoteName."
  }
}

Write-Host "GitHub user-site bootstrap complete."