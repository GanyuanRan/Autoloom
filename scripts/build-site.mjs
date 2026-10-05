import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadReleaseData } from './release-data.mjs'
import { projectSite } from './project-site.mjs'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const args = process.argv.slice(2)
const fixtureIndex = args.indexOf('--fixture')
const fixture = fixtureIndex === -1 ? undefined : resolve(root, args[fixtureIndex + 1])
const dev = args.includes('--dev')
const release = await loadReleaseData(fixture)
await projectSite({ root, release })

const command = process.execPath
const vitepressArgs = [resolve(root, 'node_modules/vitepress/bin/vitepress.js'), dev ? 'dev' : 'build', 'website']
if (dev) vitepressArgs.push('--host', '127.0.0.1', '--port', '5173')
const result = spawnSync(command, vitepressArgs, { cwd: root, env: process.env, stdio: 'inherit' })
if (result.error) throw result.error
process.exitCode = result.status ?? 1
