import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'
import { projectSite, validateManifest } from '../scripts/project-site.mjs'
import { selectRelease } from '../scripts/release-data.mjs'
import { sitePages } from '../website/site-manifest.mjs'

const root = resolve(import.meta.dirname, '..')
const releases = JSON.parse(await readFile(resolve(root, 'tests/fixtures/releases.valid.json'), 'utf8'))

test('manifest sources and routes are unique', () => {
  assert.doesNotThrow(() => validateManifest(sitePages, root))
  assert.throws(() => validateManifest([...sitePages, { ...sitePages[0] }], root), /Duplicate source mapping/)
  assert.throws(() => validateManifest([...sitePages, { ...sitePages[0], source: 'README.md' }], root), /Duplicate website route/)
})

test('projects bilingual canonical Markdown and rewrites counterpart links', async () => {
  await projectSite({ root, release: selectRelease(releases) })
  const chinese = await readFile(resolve(root, 'website/.generated/docs/index.md'), 'utf8')
  const english = await readFile(resolve(root, 'website/.generated/en/docs/index.md'), 'utf8')
  assert.match(chinese, /\]\(\/en\/docs\/\)/)
  assert.match(english, /\]\(\/docs\/\)/)
  assert.doesNotMatch(chinese, /\.zh-CN\.md/)
  assert.match(await readFile(resolve(root, 'website/.generated/release.json'), 'utf8'), /0\.1\.0-alpha\.10/)
})
