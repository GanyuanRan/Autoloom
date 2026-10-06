# Website

This directory owns the bilingual Autoloom and Aegis website theme and media. Public documentation and policies remain in the repository root and `docs/`; the build projects them into `.generated/`.

Run commands from the repository root:

```sh
pnpm site:dev
pnpm check
node node_modules/vitepress/bin/vitepress.js preview website --port 5174
```

`pnpm check` tests release validation and document projection, builds with fixture release data, and verifies the generated outputs. Restart the preview server after rebuilding so it serves the current assets. These checks do not verify browser layout or interaction.

For theme changes, inspect Chinese and English Autoloom and Aegis pages at desktop, tablet, and 320–390px mobile widths. Check the full page for overflow and visible links. The homepage screenshot tabs share one panel: Left/Right cycle through stages; Home/End select the first/last; Tab moves from the selected stage to the screenshot panel. Its centered play button starts the real task video in place, with native controls and no anchor navigation; selecting a screenshot tab pauses the video and restores the image. The two demo players pause each other. Verify visible focus, stage labels and images, demo playback, and the background pause control. With reduced motion enabled, the background remains still and screenshot transitions stop.
