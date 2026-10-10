# 开始使用

[English](getting-started.md) | 中文

Autoloom 目前提供 Windows x64 Beta 版本。第一次使用时，请选择已经备份或纳入版本控制的项目。

## 1. 下载并校验

打开 [GitHub Releases](https://github.com/GanyuanRan/Autoloom/releases)，选择最新版本，下载 `Autoloom-<版本>-win-x64.exe` 和 `SHA256SUMS`。

在 PowerShell 中运行：

```powershell
Get-FileHash -Algorithm SHA256 "C:\安装包路径\Autoloom-<版本>-win-x64.exe"
```

把结果与 `SHA256SUMS` 中对应安装包的记录比较。当前 Beta 安装包尚未签名，因此 Windows 可能显示未知发布者或 SmartScreen 提示。请确认文件来自本仓库且哈希一致，不要关闭 Windows 安全功能。

## 2. 安装并配置模型

运行安装包，然后从快捷方式打开 Autoloom。进入**设置 → 模型**，添加供应商或账户，保存凭据并选择默认模型。客户端免费使用；模型是否可用、如何计费以及如何处理请求数据，取决于你选择的供应商。

API Key、订阅账户和自定义接口的配置方法见[模型供应商](model-providers.zh-CN.md)。

## 3. 添加项目

选择**添加工作区**并指定本地项目目录。建议先使用结果容易核对的小任务，例如带有明确复现方式和测试命令的缺陷修复。

Autoloom 默认使用**工作区写入**权限：可以修改所选项目内的文件，保护由 Autoloom 管理的 `.autoloom` 记录，并在操作需要更大范围时询问。批准前请核对路径、命令和申请理由。详见[权限与沙箱](permissions-and-sandbox.zh-CN.md)。

## 4. 检查结果

查看实际修改的文件、代码差异、命令输出和真正执行过的检查。任务显示完成或记录了 Work 结果，只说明过程与结果已保存，本身并不能证明改动正确。

任务中断后可重新打开同一个 Session 继续。需要提供诊断资料时，可使用 Session 标题栏中的导出操作；ZIP 可能包含项目内容和附件，分享前请先检查。

## 5. 保留可恢复副本

项目记录位于项目内隐藏的 `.autoloom` 目录，全局设置与诊断默认位于 `%USERPROFILE%\.autoloom`。请使用版本控制或其他方式备份项目，并在 Beta 升级前阅读 [Session、备份与恢复](sessions-backup-and-recovery.zh-CN.md)。

如需通过 SSH 使用 Linux 项目，请继续阅读[本地与 SSH 项目](local-and-ssh-projects.zh-CN.md)。
