import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve, sep } from 'node:path'
import { sitePages, routeLink } from '../website/site-manifest.mjs'

const repositoryUrl = 'https://github.com/GanyuanRan/Autoloom'

function normalize(path) {
  return path.replaceAll('\\', '/')
}

export function validateManifest(pages, root) {
  const sources = new Set()
  const routes = new Set()
  for (const page of pages) {
    const sourceKey = `${page.locale}:${page.source}`
    if (sources.has(sourceKey)) throw new Error(`Duplicate source mapping: ${sourceKey}`)
    if (routes.has(page.route)) throw new Error(`Duplicate website route: ${page.route}`)
    sources.add(sourceKey)
    routes.add(page.route)
    const sourcePath = resolve(root, page.source)
    if (relative(root, sourcePath).startsWith('..')) throw new Error(`Source escapes repository: ${page.source}`)
  }
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

/** Rewrite repository-relative Markdown links to their stable site routes. */
export async function rewriteLinks(markdown, page, pages, root) {
  const mapped = new Map(pages.map(candidate => [normalize(candidate.source), routeLink(candidate.route)]))
  const matches = [...markdown.matchAll(/(!?\[[^\]]*\])\(([^)\s]+)(?:\s+"[^"]*")?\)/g)]
  let output = markdown
  for (const match of matches.reverse()) {
    const [whole, label, rawTarget] = match
    if (rawTarget.startsWith('#') || /^[a-z][a-z+.-]*:/i.test(rawTarget)) continue
    const fragmentIndex = rawTarget.search(/[?#]/)
    const pathPart = fragmentIndex === -1 ? rawTarget : rawTarget.slice(0, fragmentIndex)
    const suffix = fragmentIndex === -1 ? '' : rawTarget.slice(fragmentIndex)
    const target = normalize(relative(root, resolve(root, dirname(page.source), decodeURIComponent(pathPart))))
    let replacement = mapped.get(target)
    if (replacement === undefined) {
      if (!(await exists(resolve(root, target)))) throw new Error(`Missing link target ${rawTarget} in ${page.source}.`)
      const image = label.startsWith('![')
      replacement = image
        ? `https://raw.githubusercontent.com/GanyuanRan/Autoloom/main/${target}`
        : `${repositoryUrl}/blob/main/${target}`
    }
    const start = match.index
    output = output.slice(0, start) + `${label}(${replacement}${suffix})` + output.slice(start + whole.length)
  }
  return output
}

function frontmatter(page) {
  return `---\ntitle: ${JSON.stringify(page.title)}\neditLink: false\nlastUpdated: true\n---\n\n`
}

/** Project canonical public Markdown and generated home wrappers into VitePress input. */
export async function projectSite({ root, release }) {
  validateManifest(sitePages, root)
  const websiteRoot = resolve(root, 'website')
  const generated = resolve(websiteRoot, '.generated')
  if (!generated.startsWith(websiteRoot + sep)) throw new Error('Generated site path must stay inside website/.')
  await rm(generated, { recursive: true, force: true })
  await mkdir(resolve(generated, 'en'), { recursive: true })
  await writeFile(resolve(generated, 'index.md'), '---\nlayout: false\ntitle: Autoloom\n---\n\n<AutoloomHome locale="zh" />\n', 'utf8')
  await writeFile(resolve(generated, 'en/index.md'), '---\nlayout: false\ntitle: Autoloom\n---\n\n<AutoloomHome locale="en" />\n', 'utf8')
  await writeFile(resolve(generated, 'release.json'), JSON.stringify(release, null, 2) + '\n', 'utf8')

  for (const page of sitePages) {
    const source = resolve(root, page.source)
    if (!(await exists(source))) throw new Error(`Website source does not exist: ${page.source}`)
    const target = resolve(generated, page.route)
    await mkdir(dirname(target), { recursive: true })
    const markdown = await rewriteLinks(await readFile(source, 'utf8'), page, sitePages, root)
    await writeFile(target, frontmatter(page) + markdown.replace(/^---[\s\S]*?---\s*/, ''), 'utf8')
  }
}
