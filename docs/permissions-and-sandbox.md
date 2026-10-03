# Permissions and sandbox

English | [中文](permissions-and-sandbox.zh-CN.md)

Autoloom pins one permission preset to each Session. Changing the default affects future Sessions; an existing Session keeps its recorded preset unless you change that Session.

| Preset | File effects | Approval policy |
| --- | --- | --- |
| **Read only** | Sandboxed operations cannot modify files in the standing mode. | Ask when an operation needs broader access. |
| **Workspace write** | Sandboxed operations can modify files under the Session's selected project. This is the default. | Ask when an operation needs broader access. |
| **Danger full access** | The file sandbox does not restrict modifications. | Do not ask for tool escalation. |

The file sandbox governs file effects. It is not a general network firewall or a complete restriction on every process behavior. Read an approval request as a concrete change in authority for the stated operation, not as proof that the command or result is safe.

## Workspace write

Workspace write uses the Session's fixed project directory as its writable root. Autoloom-owned `.autoloom` records remain protected from ordinary file and Shell tools even though they are inside the project. Some operating-system temporary locations may also be writable for tool execution.

On Windows, confined commands use a restricted-token and ACL runner. If the platform sandbox cannot enforce the requested policy, the command fails instead of silently running without confinement.

## Approval prompts

Before approving, check:

1. The exact command or tool action.
2. The paths and external systems it can affect.
3. Why the task needs access beyond the current preset.
4. Whether a narrower path or operation would meet the same goal.

An approval applies to the operation presented by the application. It does not validate the code being run, guarantee a correct result, or replace review of the resulting diff and command output.

## Choosing a preset

Use **Read only** for investigation, review, or planning that should not modify the project. Use **Workspace write** for ordinary implementation in a backed-up project. Reserve **Danger full access** for work that truly needs files outside the project and whose commands you have reviewed; it removes the file-modification restriction and the normal escalation prompt.

SSH projects enforce their file policy on the remote Linux host. Restricted commands require a usable Linux sandbox backend, and Autoloom's protected project records require Bubblewrap. If the backend is unavailable, the remote command is refused. See [Local and SSH projects](local-and-ssh-projects.md).
