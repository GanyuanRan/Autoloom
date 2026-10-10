# Session、备份与恢复

[English](sessions-backup-and-recovery.md) | 中文

Session 是持久化的任务记录，可能包含对话历史、模型请求上下文、工具调用与结果、命令输出、文件片段、任务状态和附件引用。重新打开 Session 后会恢复这些历史，以便继续中断的任务。

## 记录保存位置

有项目目录的 Session 会把压缩日志保存在项目隐藏的 `.autoloom\sessions` 目录下。Work、治理数据等其他项目记录也位于 `.autoloom` 中。Autoloom 运行期间请勿手动修改这些文件。

全局 Autoloom 数据目录默认为 `%USERPROFILE%\.autoloom`，其中保存设置、API Key 引用、缓存、诊断和项目发现记录。没有项目目录的 Session 保存在其中的 `sessions` 目录下。共享运行时默认把图片附件字节保存在 `%USERPROFILE%\.dsh\attachments`；高级用户设置 `DSH_HOME` 后会改变该根目录。

SSH 项目的 `.autoloom` 目录及 Session 日志位于远端 Linux 主机，全局模型设置和凭据仍保存在 Windows 电脑上。

## 导出一个 Session

使用 Session 标题栏中的导出操作。Autoloom 会打开 Windows **另存为**对话框，并写出一个 ZIP，其中包含：

- 所选 Session 解码后的日志；
- 它的子 Session；
- 这些日志引用的图片附件。

导出文件用于诊断和检查，并不是完整的项目备份：它不包含普通项目文件，也不包含 Windows 凭据管理器记录。导出内容可能暴露项目内容、提示词、路径和命令输出，分享前请先检查并脱敏。

## Beta 更新前备份

先完成或停止活动任务并关闭 Autoloom，然后完整复制：

1. 每个重要项目目录，包括隐藏的 `.autoloom` 目录。
2. 如需保留设置、API Key 引用、日志、缓存和项目发现记录，复制 `%USERPROFILE%\.autoloom`。
3. 如需保留本机图片附件，复制 `%USERPROFILE%\.dsh\attachments`。
4. SSH 项目对应的远端项目目录和远端 `~/.dsh/attachments` 存储。

凭据备份应加密并限制访问。Windows 凭据管理器中的不透明授权记录不属于上述文件副本；切换 Windows 账户或电脑后，通常需要重新登录供应商。

版本控制提交可以保护源文件，但通常不包含隐藏的 Autoloom 任务记录。完整恢复方案需要同时覆盖两者。

## 中断或损坏后的处理

普通进程中断后，请重新打开同一项目与 Session。Autoloom 的 Session 存储可以修复未写完整的末尾，同时保留已经完整写入的记录；被中断的工具调用可能标记为尚未开始或结果未知。再次执行不可重复的命令前，请先检查文件系统与外部系统中是否已经产生影响。

如果 Session 无法加载，请勿删除或改写 `.autoloom` 文件。关闭 Autoloom，复制受影响的项目和全局数据目录，收集 `%USERPROFILE%\.autoloom\logs\desktop.log` 后再报告问题。Session 仍能打开时，导出文件也很有帮助。

Beta 阶段的数据格式可能发生不向后兼容的变化。新版本无法使用旧记录时，请按照该 Release 的迁移说明操作；旧版本拒绝新版本写入的数据时，请恢复为旧版本保留的备份，或重新安装最新版。
