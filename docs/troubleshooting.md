# Troubleshooting

English | [中文](troubleshooting.zh-CN.md)

Start by recording the Autoloom version, Windows version, whether the project is local or SSH, the exact action, and the full visible error. Startup diagnostics are stored in `%USERPROFILE%\.autoloom\logs\desktop.log` by default.

## The installer is blocked or shows an unknown publisher

The current Beta installer is unsigned. Confirm that it came from this repository's [Releases](https://github.com/GanyuanRan/Autoloom/releases) and that its SHA-256 matches `SHA256SUMS`. Do not download a copy from a third-party mirror or disable Windows security features.

## Autoloom does not start

Check `desktop.log` for the first startup failure. A missing native keyring, unavailable Windows Credential Manager, malformed settings or credential file, or a legacy plaintext grant can intentionally stop startup rather than fall back to a weaker storage path.

Before changing files, close Autoloom and copy `%USERPROFILE%\.autoloom`. Do not post that directory publicly: it can contain API keys, paths, and project-related diagnostics.

## No model can be selected

Open **Settings → Models**, confirm that at least one provider has been saved, and select a default model. If a Session used a provider that was later removed, choose another model for that Session. See [Model providers](model-providers.md).

For authentication, quota, endpoint, or image errors, preserve the provider's error code but remove secrets before sharing it.

## A command is denied

Check the Session's permission preset. **Read only** blocks file modification, while **Workspace write** confines modifications to the selected project and protects `.autoloom`. If a broader operation is required, review the approval request rather than switching the whole Session to **Danger full access** by default.

If the message says the sandbox is unavailable, the platform could not enforce the selected policy and refused the command. Restarting with the same configuration will not turn that refusal into a confined run; fix the named sandbox requirement. See [Permissions and sandbox](permissions-and-sandbox.md).

## A Session or project is missing

Confirm that the original project directory is available and that its hidden `.autoloom` directory was not omitted from a move or backup. For SSH projects, reconnect the original host and path; Autoloom does not substitute a same-named local directory when the remote host is offline.

Do not create or edit Session log files manually. Back up the affected data before attempting recovery. See [Sessions, backup, and recovery](sessions-backup-and-recovery.md).

## A task requests an unavailable historical baseline

Use Beta 1 or later and resume the task. A Work retains the baseline revision that applied when it started; a later baseline advance does not require you to recover that older document or waive result recording. Missing context remains explicit, and the Agent reviews the current requirements and asks only when a material task decision needs your input. A recorded result is not proof that verification or requirement acceptance passed. Do not manually change Work bindings or protected `.autoloom` records.

## Update download or restart fails

Finish or stop active work and retry the update. If it still fails, download the installer manually from Releases, verify its checksum, close Autoloom, and run it. Settings and Sessions should remain outside the installation directory. See [Updates and rollback](updates-and-rollback.md).

## SSH connection fails

Run `ssh <alias>` in PowerShell first and resolve host-key, key, agent, network, or account errors there. Then confirm that the remote host is Linux x64, has Node.js 22.19 or later and a writable home directory, and has Bubblewrap when restricted execution is needed. Autoloom reads literal `Host` entries from `%USERPROFILE%\.ssh\config` and readable `Include` files; OpenSSH still owns the connection details.

## Report a problem

Open a public [Issue](https://github.com/GanyuanRan/Autoloom/issues) for ordinary bugs. Include the version, system information, local or SSH context, reproduction steps, expected and actual results, and the smallest useful redacted log excerpt or Session export. Remove API keys, access tokens, personal information, private repository content, and private host details.

Report a security vulnerability through the private path in the [Security policy](../SECURITY.md).
