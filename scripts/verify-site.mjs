import { access, readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const output = resolve(root, 'website/.dist')
const release = JSON.parse(await readFile(resolve(root, 'website/.generated/release.json'), 'utf8'))
const required = [
  'index.html', 'en/index.html', 'docs/index.html', 'en/docs/index.html',
  'releases/index.html', 'en/releases/index.html', 'security/index.html',
  'privacy/index.html', 'license/index.html', 'robots.txt', 'sitemap.xml',
  'media/autoloom-demo-zh.mp4', 'media/autoloom-demo-en.mp4',
  'media/governance-impact-zh.png', 'media/governance-impact-en.png',
]
for (const path of required) await access(resolve(output, path))

const files = []
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) await walk(path)
    else files.push(path)
  }
}
await walk(output)
const searchable = files.filter(path => /\.(?:html|js|json|xml|txt)$/.test(path))
const text = (await Promise.all(searchable.map(path => readFile(path, 'utf8')))).join('\n')
if (!text.includes('https://autoloom.codes')) throw new Error('Built site has no canonical autoloom.codes identity.')
if (!text.includes(release.installer.name)) throw new Error('Built site has no validated installer URL.')
if (text.includes('api.github.com/repos/GanyuanRan/Autoloom/releases')) throw new Error('Built browser assets contain a GitHub Releases API request.')
try {
  await access(resolve(output, 'CNAME'))
  throw new Error('CNAME must remain absent until the production-domain stage.')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
console.log(`Verified ${required.length} required outputs across ${files.length} built files.`)
