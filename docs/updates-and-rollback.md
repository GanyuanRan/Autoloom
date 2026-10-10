# Updates and rollback

English | [中文](updates-and-rollback.zh-CN.md)

The installed Windows client checks this repository's public Beta release feed. Automatic checking and downloading are enabled by default and can be changed under **Settings → General**.

Alpha 13 can discover Beta 1 directly and install it with one explicit restart. Earlier Alpha clients must first install Alpha 13 or manually install Beta. Beta clients receive newer Beta or stable releases and exclude Alpha releases.

## Install an update

An available release downloads in the background as a complete installer. Autoloom verifies the downloaded installer before offering **Restart to update**. Installation starts only when you choose that action; closing the application normally does not install a pending update.

Finish or stop active model, tool, project, and background work first. During update preparation Autoloom pauses new work, flushes Sessions, closes local and SSH Hosts, installs the verified package, and reopens the application. Settings, Sessions, and projects are stored outside the application installation directory and are preserved by the installer.

Users of an older extracted ZIP build must install the first installer-based release manually.

## Manual update or repair

If automatic download fails:

1. Back up important projects and task records.
2. Download the desired installer and `SHA256SUMS` from [GitHub Releases](https://github.com/GanyuanRan/Autoloom/releases).
3. Verify the SHA-256 value.
4. Close Autoloom and run the installer.

Use the same steps to repair a damaged installation. Do not delete `%USERPROFILE%\.autoloom` or project `.autoloom` directories as part of an application reinstall.

## Roll back

Autoloom does not currently provide an in-app rollback button. Beta data formats may change, and an older client can reject settings or Session data written by a newer client.

Before updating, keep a backup associated with the installed version. To attempt a rollback, close Autoloom, download the older installer from its Release, verify its checksum, and read that Release's compatibility notes. If the older client rejects current data, restore the matching pre-update project and Autoloom data backup. If no matching backup exists, reinstall the newest release rather than modifying stored records by hand.

Installing an older binary does not roll back changes the agent made to project files or external systems. Use your project's version control and service-specific recovery procedures for those changes.

## Authenticity and Beta limits

The current Beta installer has no Windows code signature, so Windows may show an unknown-publisher or SmartScreen prompt. Only use installers from this repository and verify `SHA256SUMS`. Each Release documents its changes and validation scope; installation or interface checks do not imply that every real-provider workflow passed end to end.
