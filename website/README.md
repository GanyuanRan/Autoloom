# Website

This directory owns the bilingual Autoloom and Aegis website theme and media. Public documentation and policies remain in the repository root and `docs/`; the build projects them into `.generated/`.

Run commands from the repository root:

```sh
pnpm site:dev
pnpm check
node node_modules/vitepress/bin/vitepress.js preview website --port 5174
```

`pnpm check` tests release validation and document projection, builds with fixture release data, and verifies the generated outputs. Restart the preview server after rebuilding so it serves the current assets. These checks do not verify browser layout or interaction.

For theme changes, inspect Chinese and English Autoloom and Aegis pages at desktop, tablet, and 320–390px mobile widths. Check the full page for overflow and visible links. The homepage screenshot tabs share one panel: Left/Right cycle through stages; Home/End select the first/last; Tab moves from the selected stage to the screenshot panel. Its centered play button starts the real task video in place, with native controls and no anchor navigation; selecting a screenshot tab pauses the video and restores the image. The hero owns the only demo player; the relationship card's demo button brings it into view and starts playback. The `#demo` link opens at the top of the homepage; `#demo-results` points to the lower task steps and results. Verify visible focus, stage labels and images, demo playback, and the background pause control. With reduced motion enabled, the background remains still and screenshot transitions stop.

## Deployment

[Deploy website](../.github/workflows/pages.yml) builds and deploys `main` after [Refresh release index](../.github/workflows/changelog.yml) completes successfully, including runs that leave the index files unchanged. Failed or cancelled index refreshes do not deploy. Relevant pushes to `main` and manual runs on `main` also deploy; the `github-pages` environment permits only that branch.

Release events belong to the index refresh workflow. Its `GITHUB_TOKEN` push does not trigger another push workflow; Pages uses the refresh completion event and builds trusted `main` source rather than the release tag or an upstream artifact.
