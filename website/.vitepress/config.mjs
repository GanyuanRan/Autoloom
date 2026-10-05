import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

const base = process.env.SITE_BASE ?? '/'
const origin = 'https://autoloom.codes'
const release = JSON.parse(readFileSync(resolve(import.meta.dirname, '../.generated/release.json'), 'utf8'))

const zhSidebar = [
  { text: '开始', items: [{ text: '文档首页', link: '/docs/' }, { text: '开始使用', link: '/docs/getting-started' }, { text: '模型服务', link: '/docs/model-providers' }] },
  { text: '项目与安全', items: [{ text: '权限与沙箱', link: '/docs/permissions-and-sandbox' }, { text: '本地与 SSH 项目', link: '/docs/local-and-ssh-projects' }, { text: '会话、备份与恢复', link: '/docs/sessions-backup-and-recovery' }] },
  { text: '维护', items: [{ text: '更新与回退', link: '/docs/updates-and-rollback' }, { text: '故障排查', link: '/docs/troubleshooting' }] },
]
const enSidebar = [
  { text: 'Start', items: [{ text: 'Documentation', link: '/en/docs/' }, { text: 'Getting started', link: '/en/docs/getting-started' }, { text: 'Model providers', link: '/en/docs/model-providers' }] },
  { text: 'Projects and safety', items: [{ text: 'Permissions and sandbox', link: '/en/docs/permissions-and-sandbox' }, { text: 'Local and SSH projects', link: '/en/docs/local-and-ssh-projects' }, { text: 'Sessions, backup, and recovery', link: '/en/docs/sessions-backup-and-recovery' }] },
  { text: 'Maintenance', items: [{ text: 'Updates and rollback', link: '/en/docs/updates-and-rollback' }, { text: 'Troubleshooting', link: '/en/docs/troubleshooting' }] },
]

function routePath(relativePath) {
  const path = relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
  return `/${path}`
}

function counterpart(relativePath) {
  return relativePath.startsWith('en/') ? relativePath.slice(3) : `en/${relativePath}`
}

export default defineConfig({
  title: 'Autoloom',
  description: 'Governance Engineering for Coding Agents',
  lang: 'zh-CN',
  base,
  cleanUrls: true,
  lastUpdated: true,
  srcDir: '.generated',
  outDir: '.dist',
  cacheDir: '.vitepress/cache',
  vite: { publicDir: resolve(import.meta.dirname, '../public') },
  sitemap: { hostname: origin },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}media/autoloom-logo.png` }],
    ['meta', { name: 'theme-color', content: '#071026' }],
  ],
  transformHead({ pageData }) {
    const route = routePath(pageData.relativePath)
    const alternate = routePath(counterpart(pageData.relativePath))
    const aegis = pageData.relativePath === 'aegis/index.md' || pageData.relativePath === 'en/aegis/index.md'
    const zh = pageData.relativePath.startsWith('en/') ? alternate : route
    const en = pageData.relativePath.startsWith('en/') ? route : alternate
    const image = aegis
      ? 'https://raw.githubusercontent.com/GanyuanRan/Aegis/main/assets/aegis-hero.png'
      : `${origin}/media/autoloom-demo-${pageData.relativePath.startsWith('en/') ? 'en' : 'zh'}-poster.jpg`
    const entries = [
      ['link', { rel: 'canonical', href: `${origin}${route}` }],
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: `${origin}${zh}` }],
      ['link', { rel: 'alternate', hreflang: 'en', href: `${origin}${en}` }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: `${origin}${zh}` }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'Autoloom' }],
      ['meta', { property: 'og:title', content: pageData.title || 'Autoloom' }],
      ['meta', { property: 'og:url', content: `${origin}${route}` }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ]
    if (pageData.relativePath === 'index.md' || pageData.relativePath === 'en/index.md') {
      entries.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Autoloom',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows 10, Windows 11',
        softwareVersion: release.version,
        downloadUrl: release.installer.url,
        url: origin,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      })])
    }
    if (aegis) {
      entries.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'Aegis',
        description: pageData.description,
        codeRepository: 'https://github.com/GanyuanRan/Aegis',
        license: 'https://github.com/GanyuanRan/Aegis/blob/main/LICENSE',
        url: `${origin}${route}`,
      })])
    }
    return entries
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Autoloom',
      description: '面向 Coding Agent 的治理工程',
      themeConfig: {
        nav: [{ text: '首页', link: '/' }, { text: 'Aegis', link: '/aegis/' }, { text: '文档', link: '/docs/' }, { text: '版本', link: '/releases/' }, { text: 'English', link: '/en/' }],
        sidebar: { '/docs/': zhSidebar },
        outline: { label: '本页目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后更新' },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观',
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Autoloom',
      description: 'Governance Engineering for Coding Agents',
      themeConfig: {
        nav: [{ text: 'Home', link: '/en/' }, { text: 'Aegis', link: '/en/aegis/' }, { text: 'Docs', link: '/en/docs/' }, { text: 'Releases', link: '/en/releases/' }, { text: '中文', link: '/' }],
        sidebar: { '/en/docs/': enSidebar },
        outline: { label: 'On this page' },
      },
    },
  },
  themeConfig: {
    release,
    logo: '/media/autoloom-logo.png',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/GanyuanRan/Autoloom' }],
  },
})
