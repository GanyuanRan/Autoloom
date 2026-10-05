import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { selectRelease } from '../scripts/release-data.mjs'

const fixture = JSON.parse(await readFile(new URL('./fixtures/releases.valid.json', import.meta.url), 'utf8'))
const clone = value => structuredClone(value)

test('selects a validated prerelease and its static download facts', () => {
  const result = selectRelease(fixture)
  assert.equal(result.version, '0.1.0-alpha.10')
  assert.equal(result.installer.name, 'Autoloom-0.1.0-alpha.10-win-x64.exe')
  assert.match(result.checksumUrl, /SHA256SUMS$/)
  assert.equal(result.prerelease, true)
})

test('skips drafts and selects the newest published release', () => {
  const releases = clone(fixture)
  releases.unshift({ ...clone(releases[0]), draft: true, tag_name: 'v9.0.0', published_at: '2030-01-01T00:00:00Z' })
  assert.equal(selectRelease(releases).version, '0.1.0-alpha.10')
})

test('rejects an absent or ambiguous installer', () => {
  const missing = clone(fixture)
  missing[0].assets = missing[0].assets.filter(asset => !asset.name.endsWith('.exe'))
  assert.throws(() => selectRelease(missing), /exactly one Windows x64 installer, found 0/)
  const duplicate = clone(fixture)
  duplicate[0].assets.push({ ...duplicate[0].assets[0], name: 'Autoloom-0.1.0-alpha.10.1-win-x64.exe' })
  assert.throws(() => selectRelease(duplicate), /exactly one Windows x64 installer, found 2/)
})

test('rejects a missing checksum and a tag mismatch', () => {
  const missingChecksum = clone(fixture)
  missingChecksum[0].assets = missingChecksum[0].assets.filter(asset => asset.name !== 'SHA256SUMS')
  assert.throws(() => selectRelease(missingChecksum), /exactly one SHA256SUMS asset, found 0/)
  const mismatch = clone(fixture)
  mismatch[0].tag_name = 'v0.1.0-alpha.9'
  assert.throws(() => selectRelease(mismatch), /does not match Release tag/)
})

test('rejects a response with no published release', () => {
  const drafts = clone(fixture)
  drafts[0].draft = true
  assert.throws(() => selectRelease(drafts), /No published Autoloom Release/)
})
