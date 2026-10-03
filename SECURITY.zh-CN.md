# 安全策略

[English](SECURITY.md) | 中文

## 支持范围

Autoloom 目前处于 Alpha 阶段，安全修复面向最新发布的 Alpha 版本。在操作安全的前提下，请先在最新版确认问题；如果无法升级，旧版本中的问题同样可以报告。

## 私下报告漏洞

请使用 [GitHub 私密漏洞报告](https://github.com/GanyuanRan/Autoloom/security/advisories/new)。在我们有机会调查之前，请不要通过公开 Issue 披露漏洞。

报告中请注明 Autoloom 版本、Windows 版本、项目位于本机还是通过 SSH 连接、安全影响、复现步骤，以及尽可能小且安全的验证方法。请说明问题是否可能泄露凭据、绕过权限或沙箱限制、修改所选项目之外的文件、跨越本机与 SSH 远端的信任分工，或破坏安装包与更新流程。

请勿提交仍然有效的 API Key、访问令牌、SSH 私钥、个人信息，或未经脱敏的项目与 Session 导出文件。需要更多资料时，我们会通过私密公告与你沟通。

我们会通过该公告协调调查与披露。Alpha 阶段暂不承诺固定的响应或修复时限。

## 下载完整性

请只从本仓库的 [Releases](https://github.com/GanyuanRan/Autoloom/releases) 下载安装包。每个版本都提供 `SHA256SUMS`，安装前可用 `Get-FileHash -Algorithm SHA256 <安装包路径>` 核对。当前 Alpha 安装包尚未签名，因此 Windows 可能显示未知发布者或 SmartScreen 提示。

安全行为与已知限制见[权限与沙箱](docs/permissions-and-sandbox.zh-CN.md)、[数据与隐私](DATA_AND_PRIVACY.zh-CN.md)及对应版本的 Release 说明。
