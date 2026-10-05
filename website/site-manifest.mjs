/** Public Markdown sources projected into stable website routes. */
export const sitePages = [
  { source: 'docs/README.zh-CN.md', route: 'docs/index.md', locale: 'zh', title: '使用文档' },
  { source: 'docs/getting-started.zh-CN.md', route: 'docs/getting-started.md', locale: 'zh', title: '开始使用' },
  { source: 'docs/model-providers.zh-CN.md', route: 'docs/model-providers.md', locale: 'zh', title: '模型服务' },
  { source: 'docs/permissions-and-sandbox.zh-CN.md', route: 'docs/permissions-and-sandbox.md', locale: 'zh', title: '权限与沙箱' },
  { source: 'docs/local-and-ssh-projects.zh-CN.md', route: 'docs/local-and-ssh-projects.md', locale: 'zh', title: '本地与 SSH 项目' },
  { source: 'docs/sessions-backup-and-recovery.zh-CN.md', route: 'docs/sessions-backup-and-recovery.md', locale: 'zh', title: '会话、备份与恢复' },
  { source: 'docs/updates-and-rollback.zh-CN.md', route: 'docs/updates-and-rollback.md', locale: 'zh', title: '更新与回退' },
  { source: 'docs/troubleshooting.zh-CN.md', route: 'docs/troubleshooting.md', locale: 'zh', title: '故障排查' },
  { source: 'CHANGELOG.zh-CN.md', route: 'releases/index.md', locale: 'zh', title: '版本记录' },
  { source: 'SECURITY.zh-CN.md', route: 'security/index.md', locale: 'zh', title: '安全' },
  { source: 'DATA_AND_PRIVACY.zh-CN.md', route: 'privacy/index.md', locale: 'zh', title: '数据与隐私' },
  { source: 'LICENSE.md', route: 'license/index.md', locale: 'zh', title: '许可' },
  { source: 'docs/README.md', route: 'en/docs/index.md', locale: 'en', title: 'Documentation' },
  { source: 'docs/getting-started.md', route: 'en/docs/getting-started.md', locale: 'en', title: 'Getting started' },
  { source: 'docs/model-providers.md', route: 'en/docs/model-providers.md', locale: 'en', title: 'Model providers' },
  { source: 'docs/permissions-and-sandbox.md', route: 'en/docs/permissions-and-sandbox.md', locale: 'en', title: 'Permissions and sandbox' },
  { source: 'docs/local-and-ssh-projects.md', route: 'en/docs/local-and-ssh-projects.md', locale: 'en', title: 'Local and SSH projects' },
  { source: 'docs/sessions-backup-and-recovery.md', route: 'en/docs/sessions-backup-and-recovery.md', locale: 'en', title: 'Sessions, backup, and recovery' },
  { source: 'docs/updates-and-rollback.md', route: 'en/docs/updates-and-rollback.md', locale: 'en', title: 'Updates and rollback' },
  { source: 'docs/troubleshooting.md', route: 'en/docs/troubleshooting.md', locale: 'en', title: 'Troubleshooting' },
  { source: 'CHANGELOG.md', route: 'en/releases/index.md', locale: 'en', title: 'Releases' },
  { source: 'SECURITY.md', route: 'en/security/index.md', locale: 'en', title: 'Security' },
  { source: 'DATA_AND_PRIVACY.md', route: 'en/privacy/index.md', locale: 'en', title: 'Data and privacy' },
  { source: 'LICENSE.md', route: 'en/license/index.md', locale: 'en', title: 'License' },
]

/** Convert a manifest route into the clean public URL VitePress serves. */
export function routeLink(route) {
  return `/${route.replace(/(?:index)?\.md$/, '')}`
}
