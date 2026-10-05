import { readFile } from 'node:fs/promises'

const repository = 'GanyuanRan/Autoloom'
const installerPattern = /^Autoloom-(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)\-win-x64\.exe$/

function requireHttps(value, field) {
  if (typeof value !== 'string' || !value.startsWith('https://')) {
    throw new Error(`Release ${field} must be an HTTPS URL.`)
  }
  return value
}

/** Select and validate the newest published Autoloom release, including prereleases. */
export function selectRelease(releases) {
  if (!Array.isArray(releases)) throw new Error('GitHub Releases response must be an array.')
  const published = releases
    .filter(release => release !== null && typeof release === 'object' && !release.draft && release.published_at)
    .sort((left, right) => String(right.published_at).localeCompare(String(left.published_at)))
  const release = published[0]
  if (release === undefined) throw new Error('No published Autoloom Release is available.')
  if (!Array.isArray(release.assets)) throw new Error('The selected Release has no asset list.')

  const installers = release.assets.filter(asset => typeof asset?.name === 'string' && installerPattern.test(asset.name))
  if (installers.length !== 1) throw new Error(`Expected exactly one Windows x64 installer, found ${installers.length}.`)
  const checksums = release.assets.filter(asset => asset?.name === 'SHA256SUMS')
  if (checksums.length !== 1) throw new Error(`Expected exactly one SHA256SUMS asset, found ${checksums.length}.`)

  const installer = installers[0]
  const checksum = checksums[0]
  const match = installerPattern.exec(installer.name)
  const version = match?.[1]
  if (version === undefined || release.tag_name !== `v${version}`) {
    throw new Error(`Installer version does not match Release tag ${String(release.tag_name)}.`)
  }
  if (!Number.isSafeInteger(installer.size) || installer.size <= 0) throw new Error('Installer size must be a positive integer.')

  return {
    version,
    tag: release.tag_name,
    name: typeof release.name === 'string' && release.name.length > 0 ? release.name : release.tag_name,
    prerelease: Boolean(release.prerelease),
    publishedAt: new Date(release.published_at).toISOString(),
    releaseUrl: requireHttps(release.html_url, 'page'),
    installer: {
      name: installer.name,
      bytes: installer.size,
      url: requireHttps(installer.browser_download_url, 'installer'),
    },
    checksumUrl: requireHttps(checksum.browser_download_url, 'checksum'),
  }
}

/** Read a fixture or fetch the public repository's Releases. */
export async function loadReleaseData(fixturePath) {
  if (fixturePath !== undefined) {
    return selectRelease(JSON.parse(await readFile(fixturePath, 'utf8')))
  }
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'autoloom-public-site-build',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const response = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=20`, { headers })
  if (!response.ok) throw new Error(`GitHub Releases request failed with HTTP ${response.status}.`)
  return selectRelease(await response.json())
}
