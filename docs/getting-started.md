# Getting started

English | [中文](getting-started.zh-CN.md)

Autoloom currently ships as a Windows x64 Alpha. Use it first on a project that is backed up or under version control.

## 1. Download and verify

Open [GitHub Releases](https://github.com/GanyuanRan/Autoloom/releases), choose the newest release, and download `Autoloom-<version>-win-x64.exe` plus `SHA256SUMS`.

In PowerShell, run:

```powershell
Get-FileHash -Algorithm SHA256 "C:\path\to\Autoloom-<version>-win-x64.exe"
```

Compare the result with the installer entry in `SHA256SUMS`. The current Alpha installer is unsigned, so Windows may show an unknown-publisher or SmartScreen prompt. Confirm that the file came from this repository and that its hash matches; do not disable Windows security features.

## 2. Install and configure a model

Run the installer and open Autoloom from its shortcut. Go to **Settings → Models**, add a provider or account, save its credential, and select a default model. The client is free; the provider you select controls model availability, billing, and its handling of request data.

See [Model providers](model-providers.md) for API keys, subscription accounts, and custom endpoints.

## 3. Add a project

Choose **Add workspace** and select a local project directory. Start with a small task whose expected result you can check, such as a reproducible bug with a focused test command.

Autoloom's default permission preset is **Workspace write**. It can change files inside the selected project, protects Autoloom-owned `.autoloom` records, and asks before a requested operation needs broader access. Review the path, command, and reason before approving. See [Permissions and sandbox](permissions-and-sandbox.md).

## 4. Review the result

Inspect the changed files, diff, command output, and checks that actually ran. A completed task or recorded Work result preserves what happened; it is not by itself proof that the change is correct.

Reopen the same Session to continue interrupted work. Use the Session header's export action when you need a portable diagnostic copy, and inspect that ZIP before sharing because it can include project content and attachments.

## 5. Keep a recoverable copy

Project-owned records live under the hidden `.autoloom` directory in the project, while global settings and diagnostics live under `%USERPROFILE%\.autoloom` by default. Keep the project under version control or another backup system, and read [Sessions, backup, and recovery](sessions-backup-and-recovery.md) before an Alpha upgrade.

To use a Linux project over SSH, continue with [Local and SSH projects](local-and-ssh-projects.md).
