# 数据与隐私

[English](DATA_AND_PRIVACY.md) | 中文

本页说明当前 Autoloom Desktop 安装版的行为。模型供应商、SSH 主机、在预览中打开的网站以及 GitHub 各自适用其服务条款与隐私规则。

## 保存在本机的数据

Autoloom 默认数据目录为 `%USERPROFILE%\.autoloom`。高级用户可在启动时通过 `AUTOLOOM_HOME` 指定其他目录。该目录保存设置、API Key 引用、缓存、日志，以及用于发现项目 Session 的目录信息。

每个本地项目可能包含隐藏的 `.autoloom` 目录，其中保存 Session 日志、Work 记录、治理决定和可重建的索引。Session 日志可能包含提示词、助手回复、工具参数与结果、命令输出、文件内容或片段、本机路径和附件引用。共享附件存储默认把图片字节保存在 `%USERPROFILE%\.dsh\attachments`；高级用户设置 `DSH_HOME` 后会改变该根目录。这些记录用于恢复和检查任务。

通过**设置 → 模型**保存的 API Key 默认写入 `%USERPROFILE%\.autoloom\.credentials.yaml`。受支持的订阅或 OAuth 等不透明授权记录存放在 Windows 凭据管理器的 `com.autoloom.desktop` 项下，文件侧索引只保存记录名称与类型。凭据值不会返回给 Renderer。同一 Windows 用户身份下运行的代码仍可能读取用户文件或调用相同的凭据接口，因此操作系统账户本身仍属于信任范围。

启动诊断会追加到 `%USERPROFILE%\.autoloom\logs\desktop.log`。名称以 `_API_KEY` 或 `_TOKEN` 结尾的启动环境变量值会被遮盖，但日志仍可能包含路径、供应商错误和其他与项目有关的上下文。

## 发送到外部服务的数据

执行任务时，Autoloom 会把组装后的模型请求发送到**设置 → 模型**中选定的供应商与接口。根据任务和对话，请求可能包含用户指令、系统指令、保留的对话历史、工具结果、选中的文件内容以及图片附件。数据使用与留存规则以对应供应商为准。

默认网页搜索只向 Parallel 公共 MCP 服务发送查询；临时故障或限流时，可能向 Exa 发送同一查询一次。匿名服务有有限额度。Fake-IP 网页读取的 HTTPS DNS 会向 Cloudflare 或 Google 发送目标域名与记录类型，不发送完整页面 URL 或对话；随后直接请求已验证的公网地址。

当 Agent 使用联网搜索时，搜索词会发送给所配置的搜索服务，返回来源会写入 Session。打开网页预览时，Autoloom 会从独立、非持久化的浏览会话访问你选择的地址；该会话会阻止弹窗、下载和权限请求。选择在系统浏览器中打开后，后续访问由该浏览器处理。

Autoloom 会从 `models.dev` 刷新公开模型资料，并可能从本 GitHub 公开仓库读取供应商兼容性元数据。自动更新默认开启，Desktop 会检查本仓库的 GitHub Releases 并在后台下载新安装包；你可以在**设置 → 通用**关闭自动下载，改为手动检查。

当前 Autoloom 安装版组合已关闭 Session 遥测，不会自动把 Session 日志或消息评分、备注上传到 Autoloom 遥测收集端。这不影响上述模型供应商请求、更新检查、模型目录刷新、SSH 连接及用户发起的网页访问。

## 本地项目与 SSH 项目

对于本地项目，项目文件、Shell 执行、Session 日志和 Work 记录保存在 Windows 电脑上；只有选中的模型请求、联网操作或你主动要求的操作可能把相关内容发送到其他位置。

对于 SSH 项目，项目文件、Shell 执行、Session 日志、Work 记录和图片附件保存在远端 Linux 主机；远端附件默认位于远端用户的 `~/.dsh/attachments`。模型供应商、凭据、设置和模型派发仍由 Windows 电脑负责。模型请求通过经过认证的本机回环桥接传递，凭据值不会复制到远端。详见[本地与 SSH 项目](docs/local-and-ssh-projects.zh-CN.md)。

## 导出、备份与删除

Session 导出文件包含所选 Session 的日志、其子 Session 以及引用的图片附件，分享前请先检查并脱敏。备份项目时需要同时保留隐藏的 `.autoloom` 目录和普通项目文件；全局设置与诊断位于 Autoloom 数据目录，默认图片存储位于 `%USERPROFILE%\.dsh\attachments`。Windows 凭据管理器中的记录独立保存，不会进入文件备份或 Session 导出。

Autoloom 目前没有一个可以同时清除本机和远端全部记录的命令。需要删除数据时，请先关闭 Autoloom 并备份仍需保留的内容，再删除对应项目的 `.autoloom` 数据及 Autoloom 数据目录中的目标文件。请先在应用内移除供应商账户；本地退出只会删除本地授权记录，不会在供应商侧撤销授权，如需撤销请使用供应商的账户控制页面。

移动或删除数据前，请先阅读 [Session、备份与恢复](docs/sessions-backup-and-recovery.zh-CN.md)。
