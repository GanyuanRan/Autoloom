# Local and SSH projects

English | [中文](local-and-ssh-projects.zh-CN.md)

Autoloom uses the same workspace, Session, file, diff, command-log, and preview interfaces for local and SSH projects. The execution location and stored data differ.

## Local projects

Choose **Add workspace** and select a Windows directory. The Windows Host owns project access, Shell execution, Sessions, Work records, model dispatch, credentials, and settings.

Removing a workspace entry does not delete the project directory or its `.autoloom` records. Keep the project under version control or another backup system.

## SSH requirements

The supported remote environment is Linux x64 with:

- a working OpenSSH connection from Windows;
- Node.js `22.x`, version `22.19` or later;
- a writable home directory for the remote account;
- Bubblewrap when confined commands or protected Autoloom project records are used.

Autoloom itself does not need to be installed on the server. The Windows package sends a matching, hash-verified remote runtime for the connection.

## Configure and connect

Define a literal host alias in `%USERPROFILE%\.ssh\config`, for example:

```sshconfig
Host build-box
  HostName 203.0.113.10
  User developer
  IdentityFile ~/.ssh/id_ed25519
```

Verify the host key and connection in a terminal first:

```powershell
ssh build-box
```

Select a local default model in **Settings → Models**, then choose **Add workspace → Connect to SSH server**. Autoloom lists literal `Host` entries from your user configuration and readable `Include` files. System OpenSSH resolves the selected alias and its authentication settings; listing an alias does not test whether it is reachable.

## Where execution and data live

| Responsibility | Local project | SSH project |
| --- | --- | --- |
| Project files and Shell | Windows computer | Remote Linux host |
| Sessions, Work, and project `.autoloom` | Windows project | Remote project |
| Image attachment bytes | Windows `%USERPROFILE%\.dsh\attachments` by default | Remote `~/.dsh/attachments` by default |
| Model providers, credentials, settings | Windows computer | Windows computer |
| Model request dispatch | Windows computer | Windows computer through an authenticated loopback bridge |

Credential values are not copied to the remote host. When the connection is lost, project operations fail instead of falling back to a same-named local directory. Remote project files and Session logs remain on the remote host after disconnecting.

Project web previews are rendered on the Windows computer. For an SSH project, a remote service must be opened through the application's explicit SSH loopback forwarding; `localhost` in an ordinary local preview refers to the Windows computer.

Removing a saved SSH project or bookmark does not delete the remote directory. Back up the remote `.autoloom` directory together with the rest of the remote project, and preserve the remote attachment store when its images matter. See [Sessions, backup, and recovery](sessions-backup-and-recovery.md).
