# Data and privacy

English | [中文](DATA_AND_PRIVACY.zh-CN.md)

This page describes the current packaged Autoloom Desktop behavior. Provider services, SSH hosts, websites opened in Preview, and GitHub have their own terms and privacy practices.

## Data stored on your computer

The default Autoloom data directory is `%USERPROFILE%\.autoloom`. An advanced `AUTOLOOM_HOME` launch override can select another directory. This directory contains settings, API-key references, caches, logs, and the catalog used to discover project-owned Sessions.

Each local project may contain a hidden `.autoloom` directory with Session logs, Work records, governance decisions, and derived indexes. Session logs can contain prompts, assistant responses, tool arguments and results, command output, file contents or excerpts, local paths, and attachment references. The shared attachment store keeps image bytes under `%USERPROFILE%\.dsh\attachments` by default; an advanced `DSH_HOME` override changes that root. These records are needed to resume and inspect work.

API keys saved through **Settings → Models** are stored in `%USERPROFILE%\.autoloom\.credentials.yaml` by default. Opaque provider grants, such as supported subscription or OAuth records, are stored in Windows Credential Manager under `com.autoloom.desktop`; the file-side index contains only the record key and kind. Credentials are not returned to the Renderer. Code running as the same Windows user may still be able to access user-owned files or call the same credential APIs, so the operating-system account remains part of the trust boundary.

Startup diagnostics are appended to `%USERPROFILE%\.autoloom\logs\desktop.log`. Values of launch environment variables whose names end in `_API_KEY` or `_TOKEN` are redacted from these diagnostics, but logs can still contain paths, provider errors, and other project-related context.

## Data sent to external services

When you run a task, Autoloom sends the assembled model request to the provider and endpoint selected in **Settings → Models**. Depending on the task and conversation, that request can include your instructions, system instructions, retained conversation history, tool results, selected file content, and attached images. The provider's own data-use and retention terms apply.

When the agent uses web search, the search query is sent to the configured search provider and returned sources become part of the Session. Opening a web Preview contacts the address you chose from a separate, nonpersistent browser guest session. The guest blocks popups, downloads, and permission requests; opening a link in your system browser transfers handling to that browser.

Autoloom refreshes public model metadata from `models.dev` and may retrieve provider compatibility metadata from this public GitHub repository. With automatic updates enabled, which is the default, the Desktop checks this repository's GitHub Releases feed and downloads a newer installer in the background. You can turn automatic downloads off under **Settings → General** and check manually instead.

The current packaged Autoloom composition disables Session telemetry. It does not automatically upload Session logs or message ratings and notes to an Autoloom telemetry collector. This does not prevent the provider traffic, update checks, catalog refreshes, SSH connections, or user-requested web access described above.

## Local and SSH projects

For a local project, project files, Shell execution, Session logs, and Work records stay on the Windows computer unless a selected provider request, web operation, or action you request sends content elsewhere.

For an SSH project, project files, Shell execution, Session logs, Work records, and image attachments stay on the remote Linux host. Remote attachments use the remote user's `~/.dsh/attachments` by default. Model providers, credentials, settings, and model dispatch stay on the Windows computer. Model requests cross an authenticated loopback bridge, but credential values are not copied to the remote host. See [Local and SSH projects](docs/local-and-ssh-projects.md).

## Export, backup, and deletion

A Session export contains the selected Session log, descendant sub-Sessions, and referenced image attachments. Inspect and redact it before sharing. Backing up a project requires its hidden `.autoloom` directory as well as the ordinary project files; global settings and diagnostics live in the Autoloom data directory, while the default image store is `%USERPROFILE%\.dsh\attachments`. Windows Credential Manager records are separate and are not included in a file backup or Session export.

Autoloom does not currently provide one command that erases every local and remote record. To remove data, close Autoloom, back up anything you need, then remove the relevant project `.autoloom` data and the desired files under the Autoloom data directory. Remove provider accounts through the application first; local sign-out removes the local grant but does not revoke it at the provider. Use the provider's account controls when revocation is required.

See [Sessions, backup, and recovery](docs/sessions-backup-and-recovery.md) before moving or deleting data.
