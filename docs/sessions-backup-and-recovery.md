# Sessions, backup, and recovery

English | [中文](sessions-backup-and-recovery.zh-CN.md)

A Session is a durable task record. It can contain conversation history, model request context, tool calls and results, command output, file excerpts, task state, and attachment references. Reopening a Session restores that history so interrupted work can continue.

## Where records live

For a project-backed Session, the compressed Session log is stored below the project's hidden `.autoloom\sessions` directory. Other project-owned Autoloom records, including Work and governance data, also live below `.autoloom`. Do not edit these files while Autoloom is running.

The global Autoloom data directory is `%USERPROFILE%\.autoloom` by default. It holds settings, API-key references, caches, diagnostics, and project discovery records. Sessions without a project directory are stored below its `sessions` directory. The shared runtime stores image attachment bytes under `%USERPROFILE%\.dsh\attachments` by default; an advanced `DSH_HOME` override changes that root.

For an SSH project, the project `.autoloom` directory and its Session logs are on the remote Linux host. Global model settings and credentials remain on the Windows computer.

## Export one Session

Use the export action in the Session header. Autoloom opens a Windows **Save As** dialog and writes a ZIP containing:

- the selected Session's decoded log;
- descendant sub-Sessions;
- image attachments referenced by those logs.

The export is intended for diagnostics and inspection. It is not a complete project backup, does not contain ordinary project files, and does not contain Windows Credential Manager records. It may expose project content, prompts, paths, and command output; inspect and redact it before sharing.

## Back up before an Alpha update

Finish or stop active tasks, close Autoloom, and make a consistent copy of:

1. Each important project directory, including its hidden `.autoloom` directory.
2. `%USERPROFILE%\.autoloom` if you want to preserve settings, API-key references, logs, caches, and project discovery records.
3. `%USERPROFILE%\.dsh\attachments` when you need to preserve locally stored image attachments.
4. The corresponding remote project directories and remote `~/.dsh/attachments` stores for SSH projects.

Keep credential backups encrypted and access-controlled. Opaque grants in Windows Credential Manager are not part of the file copy; expect to sign in again if you move to another Windows account or computer.

Version-control commits protect source files but usually do not include hidden Autoloom task records. A complete project recovery plan needs both.

## Interrupted or damaged work

After an ordinary process interruption, reopen the same project and Session. Autoloom's Session store can repair an incomplete final write while preserving complete records; an interrupted tool call may be marked as not started or as having an unknown outcome. Verify filesystem and external side effects before retrying a non-idempotent command.

If a Session cannot load, do not delete or rewrite its `.autoloom` files. Close Autoloom, copy the affected project and global data directory, collect `%USERPROFILE%\.autoloom\logs\desktop.log`, and report the problem. A Session export is useful when the Session still opens.

Alpha data formats can change without backward compatibility. If a newer version cannot use old records, follow that Release's migration instructions. If an older version rejects data written by a newer version, restore the backup made for that older version or reinstall the latest version.
