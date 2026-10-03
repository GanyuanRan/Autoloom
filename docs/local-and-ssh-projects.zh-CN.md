# 本地与 SSH 项目

[English](local-and-ssh-projects.md) | 中文

本地项目与 SSH 项目使用相同的工作区、Session、文件、差异、命令日志和预览界面，但实际执行位置和数据保存位置不同。

## 本地项目

选择**添加工作区**并指定 Windows 目录。本机 Host 负责项目访问、Shell 执行、Session、Work 记录、模型派发、凭据和设置。

移除工作区条目不会删除项目目录或其中的 `.autoloom` 记录。请使用版本控制或其他方式备份项目。

## SSH 环境要求

受支持的远端环境为 Linux x64，并需要：

- Windows 能够通过 OpenSSH 正常连接；
- Node.js `22.x`，版本不低于 `22.19`；
- 远端账户具有可写的主目录；
- 执行受限命令或保护 Autoloom 项目记录时安装 Bubblewrap。

服务器不需要预先安装 Autoloom。Windows 安装包会为连接发送匹配且经过哈希校验的远端运行时。

## 配置与连接

在 `%USERPROFILE%\.ssh\config` 中定义明确的主机别名，例如：

```sshconfig
Host build-box
  HostName 203.0.113.10
  User developer
  IdentityFile ~/.ssh/id_ed25519
```

先在终端中核对主机密钥并验证连接：

```powershell
ssh build-box
```

在**设置 → 模型**中选择本机默认模型，然后使用**添加工作区 → 连接 SSH 服务器**。Autoloom 会列出用户配置及可读 `Include` 文件中的明确 `Host` 项；具体地址与认证设置由系统 OpenSSH 解析，别名出现在列表中并不代表网络已经连通。

## 执行与数据分别位于哪里

| 职责 | 本地项目 | SSH 项目 |
| --- | --- | --- |
| 项目文件与 Shell | Windows 电脑 | 远端 Linux 主机 |
| Session、Work 和项目 `.autoloom` | Windows 项目目录 | 远端项目目录 |
| 图片附件字节 | 默认位于 Windows `%USERPROFILE%\.dsh\attachments` | 默认位于远端 `~/.dsh/attachments` |
| 模型供应商、凭据与设置 | Windows 电脑 | Windows 电脑 |
| 模型请求派发 | Windows 电脑 | Windows 电脑，通过经过认证的本机回环桥接 |

凭据值不会复制到远端。连接中断时，项目操作会直接失败，不会改为访问同名的本地目录。断开连接后，远端项目文件和 Session 日志仍保留在远端主机。

项目网页预览在 Windows 电脑上渲染。SSH 项目中的远端服务需要通过应用内明确的 SSH 回环转发打开；普通本地预览中的 `localhost` 指 Windows 电脑。

移除已保存的 SSH 项目或书签不会删除远端目录。备份远端项目时，请把远端 `.autoloom` 目录与其他项目文件一起保留；需要保留图片时，也要保存远端附件目录。详见 [Session、备份与恢复](sessions-backup-and-recovery.zh-CN.md)。
