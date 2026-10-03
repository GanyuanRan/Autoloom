# 故障排查

[English](troubleshooting.md) | 中文

先记录 Autoloom 版本、Windows 版本、项目位于本机还是 SSH 远端、准确的操作步骤以及完整可见错误。启动诊断默认位于 `%USERPROFILE%\.autoloom\logs\desktop.log`。

## 安装包被拦截或显示未知发布者

当前 Alpha 安装包尚未签名。请确认文件来自本仓库的 [Releases](https://github.com/GanyuanRan/Autoloom/releases)，并核对 SHA-256 与 `SHA256SUMS` 一致。不要使用第三方镜像提供的副本，也不要关闭 Windows 安全功能。

## Autoloom 无法启动

在 `desktop.log` 中查找最早出现的启动错误。缺少原生 keyring、Windows 凭据管理器不可用、设置或凭据文件格式错误、存在旧版明文授权记录时，程序可能主动停止启动，而不会退回到安全性更低的存储方式。

修改文件前请关闭 Autoloom 并复制 `%USERPROFILE%\.autoloom`。不要公开提交该目录，其中可能包含 API Key、路径和项目相关诊断信息。

## 无法选择模型

打开**设置 → 模型**，确认至少保存了一个供应商并选择默认模型。如果 Session 使用的供应商后来被删除，请为该 Session 选择其他模型。详见[模型供应商](model-providers.zh-CN.md)。

遇到认证、额度、接口或图片错误时，可以保留供应商错误码，但分享前必须移除密钥。

## 命令被拒绝

检查 Session 的权限预设。**只读**会阻止文件修改；**工作区写入**把修改限制在所选项目内，并保护 `.autoloom`。操作确实需要更大范围时，请检查具体授权请求，不要默认把整个 Session 切换为**完全访问**。

如果错误提示沙箱不可用，说明平台无法落实所选策略，因此拒绝了命令。用相同配置重新启动不会把这次拒绝变成受限执行，应按照错误信息修复缺少的沙箱条件。详见[权限与沙箱](permissions-and-sandbox.zh-CN.md)。

## 找不到 Session 或项目

确认原项目目录仍可访问，并检查移动或备份时是否遗漏了隐藏的 `.autoloom` 目录。对于 SSH 项目，请重新连接原主机与原路径；远端离线时，Autoloom 不会改用同名本地目录。

请勿手工创建或修改 Session 日志，恢复前先备份受影响的数据。详见 [Session、备份与恢复](sessions-backup-and-recovery.zh-CN.md)。

## 更新下载或重启失败

先完成或停止活动任务，然后重试更新。仍然失败时，从 Releases 手动下载安装包，核对校验和，关闭 Autoloom 后运行。设置和 Session 应继续保存在安装目录之外。详见[更新与回退](updates-and-rollback.zh-CN.md)。

## SSH 连接失败

先在 PowerShell 中运行 `ssh <别名>`，解决主机密钥、密钥文件、agent、网络或账户问题。随后确认远端为 Linux x64，安装了 Node.js 22.19 或更高版本，主目录可写，并在需要受限执行时安装了 Bubblewrap。Autoloom 从 `%USERPROFILE%\.ssh\config` 及可读 `Include` 文件读取明确的 `Host` 项，具体连接参数仍由 OpenSSH 处理。

## 报告问题

普通缺陷请提交公开 [Issue](https://github.com/GanyuanRan/Autoloom/issues)。请附上版本、系统信息、本地或 SSH 场景、复现步骤、预期与实际结果，以及尽可能小且已脱敏的日志片段或 Session 导出。请移除 API Key、访问令牌、个人信息、私有仓库内容和私有主机信息。

安全漏洞请使用[安全策略](../SECURITY.zh-CN.md)中的私密报告入口。
