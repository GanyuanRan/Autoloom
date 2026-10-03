# Security policy

English | [中文](SECURITY.zh-CN.md)

## Supported versions

Autoloom is in Alpha. Security fixes are provided for the newest published Alpha release. If it is safe to do so, confirm the issue on that release before reporting it; reports that affect an older release are still useful when an upgrade is not possible.

## Report a vulnerability privately

Use [GitHub private vulnerability reporting](https://github.com/GanyuanRan/Autoloom/security/advisories/new). Please do not open a public Issue for a vulnerability before we have had a chance to investigate it.

Include the affected Autoloom version, Windows version, whether the project is local or connected over SSH, the security impact, reproduction steps, and the smallest safe proof of concept. State whether the issue can expose credentials, escape a permission or sandbox restriction, modify files outside the selected project, cross the local/SSH trust split, or compromise the installer or updater.

Do not include live API keys, access tokens, private SSH keys, personal data, or an unredacted project or Session export. We may ask for additional evidence through the private advisory.

We will use the advisory to coordinate investigation and disclosure. Alpha releases do not currently carry a response-time or fix-time guarantee.

## Download integrity

Download installers only from this repository's [Releases](https://github.com/GanyuanRan/Autoloom/releases). Each release includes `SHA256SUMS`; compare it with `Get-FileHash -Algorithm SHA256 <installer-path>` before installing. The current Alpha installer is unsigned, so Windows may show an unknown-publisher or SmartScreen prompt.

Security behavior and known limits are described in [Permissions and sandbox](docs/permissions-and-sandbox.md), [Data and privacy](DATA_AND_PRIVACY.md), and the applicable Release notes.
