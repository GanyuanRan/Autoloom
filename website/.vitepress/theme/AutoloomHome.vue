<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { homeContent } from './home-content.mjs'

const props = defineProps({ locale: { type: String, required: true } })
const { theme } = useData()
const copy = computed(() => homeContent[props.locale])
const release = computed(() => theme.value.release)
const prefix = computed(() => props.locale === 'en' ? '/en' : '')
const link = path => withBase(`${prefix.value}${path}`)
const media = name => withBase(`/media/${name}`)
const localized = (zhName, enName) => media(props.locale === 'en' ? enName : zhName)
const formatBytes = bytes => `${(bytes / 1024 / 1024).toFixed(0)} MB`
const current = computed(() => ({
  impact: localized('governance-impact-zh.png', 'governance-impact-en.png'),
  trajectory: localized('trajectory-zh.png', 'trajectory-en.png'),
  record: localized('governance-record-zh.png', 'governance-record-en.png'),
  result: localized('result-zh.png', 'result-en.png'),
  video: localized('autoloom-demo-zh.mp4', 'autoloom-demo-en.mp4'),
  poster: localized('autoloom-demo-zh-poster.jpg', 'autoloom-demo-en-poster.jpg'),
}))
</script>

<template>
  <div class="al-site">
    <a class="al-skip" href="#main">{{ locale === 'en' ? 'Skip to content' : '跳至正文' }}</a>
    <header class="al-header">
      <a class="al-brand" :href="link('/')" aria-label="Autoloom">
        <img :src="media('autoloom-logo.png')" alt="" width="34" height="34">
        <span>Autoloom</span>
      </a>
      <nav :aria-label="locale === 'en' ? 'Main navigation' : '主导航'">
        <a href="#product">{{ copy.nav.product }}</a>
        <a href="#governance">{{ copy.nav.governance }}</a>
        <a :href="link('/docs/')">{{ copy.nav.docs }}</a>
        <a :href="link('/releases/')">{{ copy.nav.releases }}</a>
      </nav>
      <div class="al-header-actions">
        <a :href="locale === 'en' ? withBase('/') : withBase('/en/')">{{ copy.nav.language }}</a>
        <a class="al-github" href="https://github.com/GanyuanRan/Autoloom" aria-label="GitHub">GitHub</a>
        <a class="al-header-download" :href="release.installer.url">{{ copy.nav.download }}</a>
      </div>
    </header>

    <main id="main">
      <section id="product" class="al-hero">
        <div class="al-hero-glow" aria-hidden="true" />
        <div class="al-hero-copy">
          <p class="al-eyebrow">{{ copy.hero.eyebrow }}</p>
          <h1><span>{{ copy.hero.title[0] }}</span><span>{{ copy.hero.title[1] }}</span><span class="al-gradient-text">{{ copy.hero.title[2] }}</span></h1>
          <p class="al-definition">{{ copy.hero.definition }}</p>
          <p class="al-practical">{{ copy.hero.practical }}</p>
          <a class="al-primary-button" :href="release.installer.url"><span class="al-windows" aria-hidden="true">⊞</span>{{ copy.hero.download }}</a>
          <p class="al-release-meta">{{ copy.hero.platform }} · v{{ release.version }} · {{ formatBytes(release.installer.bytes) }}</p>
        </div>

        <div class="al-product-stage">
          <div class="al-stage-line" aria-hidden="true" />
          <figure class="al-stage-card al-stage-impact">
            <figcaption>{{ copy.hero.stages[0] }}</figcaption>
            <img :src="current.impact" :alt="copy.alt.impact">
          </figure>
          <figure class="al-stage-card al-stage-trajectory">
            <figcaption>{{ copy.hero.stages[1] }}</figcaption>
            <img :src="current.trajectory" :alt="copy.alt.trajectory">
            <a class="al-play" href="#demo" :aria-label="copy.hero.demo"><span aria-hidden="true">▶</span><small>{{ copy.hero.demo }}</small></a>
          </figure>
          <figure class="al-stage-card al-stage-record">
            <figcaption>{{ copy.hero.stages[2] }}</figcaption>
            <img :src="current.record" :alt="copy.alt.record">
          </figure>
          <ol class="al-loop">
            <li v-for="([title, body], index) in copy.loop" :key="title"><span class="al-loop-icon">{{ index + 1 }}</span><span><strong>{{ title }}</strong><small>{{ body }}</small></span></li>
          </ol>
        </div>
      </section>

      <section id="governance" class="al-section al-definition-section">
        <div class="al-section-heading al-centered"><p class="al-kicker">{{ copy.definition.kicker }}</p><h2>{{ copy.definition.title }}</h2><p>{{ copy.definition.body }}</p></div>
        <ol class="al-definition-steps">
          <li v-for="([number, title, body]) in copy.definition.steps" :key="number"><span>{{ number }}</span><strong>{{ title }}</strong><p>{{ body }}</p></li>
        </ol>
        <figure class="al-wide-product"><img :src="current.impact" :alt="copy.alt.impact"></figure>
      </section>

      <section class="al-section al-engineering-section">
        <div class="al-section-heading"><h2>{{ copy.engineering.title }}</h2></div>
        <div class="al-engineering-grid"><article v-for="([title, body], index) in copy.engineering.items" :key="title"><span>0{{ index + 1 }}</span><h3>{{ title }}</h3><p>{{ body }}</p></article></div>
        <p class="al-section-note">{{ copy.engineering.note }}</p>
      </section>

      <section class="al-section al-method-section">
        <div class="al-section-heading"><h2>{{ copy.methods.title }}</h2></div>
        <div class="al-method-layout">
          <blockquote><p>{{ copy.methods.finding }}</p><p>{{ copy.methods.effect }}</p></blockquote>
          <div class="al-method-list"><article v-for="([title, body]) in copy.methods.items" :key="title"><span class="al-method-dot" /><div><h3>{{ title }}</h3><p>{{ body }}</p></div></article></div>
        </div>
      </section>

      <section class="al-section al-evidence-section">
        <div class="al-section-heading"><h2>{{ copy.evidence.title }}</h2><p>{{ copy.evidence.body }}</p></div>
        <ol class="al-evidence-flow"><li v-for="([title, body], index) in copy.evidence.items" :key="title"><span>0{{ index + 1 }}</span><h3>{{ title }}</h3><p>{{ body }}</p></li></ol>
      </section>

      <section class="al-section al-product-proof">
        <div class="al-section-heading"><h2>{{ copy.trajectory.title }}</h2><p>{{ copy.trajectory.body }}</p></div>
        <figure class="al-proof-frame"><img :src="current.trajectory" :alt="copy.alt.trajectory"><figcaption><span v-for="label in copy.trajectory.labels" :key="label">{{ label }}</span></figcaption></figure>
      </section>

      <section class="al-section al-product-proof al-record-proof">
        <div class="al-section-heading"><h2>{{ copy.record.title }}</h2><p>{{ copy.record.body }}</p></div>
        <figure class="al-proof-frame"><img :src="current.record" :alt="copy.alt.record"></figure>
        <p class="al-record-flow">{{ copy.record.flow }}</p><p class="al-honest-note">{{ copy.record.note }}</p>
      </section>

      <section id="demo" class="al-section al-demo-section">
        <div class="al-section-heading al-centered"><h2>{{ copy.demo.title }}</h2></div>
        <video class="al-demo-video" controls playsinline preload="metadata" :poster="current.poster"><source :src="current.video" type="video/mp4"></video>
        <ol class="al-demo-flow"><li v-for="(step, index) in copy.demo.flow" :key="step"><span>{{ index + 1 }}</span>{{ step }}</li></ol>
        <div class="al-demo-facts"><strong>{{ copy.demo.label }}</strong><span v-for="fact in copy.demo.facts" :key="fact">{{ fact }}</span></div>
      </section>

      <section class="al-section al-boundary-section">
        <div><div class="al-section-heading"><h2>{{ copy.boundaries.title }}</h2></div><dl class="al-boundary-list"><template v-for="([term, description]) in copy.boundaries.items" :key="term"><dt>{{ term }}</dt><dd>{{ description }}</dd></template></dl></div>
        <div class="al-start-card"><h2>{{ copy.start.title }}</h2><ol><li v-for="(step, index) in copy.start.steps" :key="step"><span>{{ index + 1 }}</span>{{ step }}</li></ol><p>{{ copy.start.cost }}</p><div><a class="al-primary-button al-blue-button" :href="release.installer.url">{{ copy.hero.download }}</a><a class="al-secondary-button" :href="link('/docs/getting-started')"><span>{{ copy.start.guide }}</span><span class="al-button-arrow" aria-hidden="true">→</span></a></div></div>
      </section>

      <section class="al-section al-faq-section"><div class="al-section-heading"><h2>{{ copy.faq.title }}</h2></div><div class="al-faq"><details v-for="([question, answer], index) in copy.faq.items" :key="question" :open="index === 1"><summary>{{ question }}</summary><p>{{ answer }}</p></details></div></section>

      <section class="al-final-cta"><h2>{{ copy.final.title }}</h2><div><a class="al-primary-button" :href="release.installer.url">{{ copy.hero.download }}</a><a class="al-secondary-button al-secondary-button-light" :href="link('/docs/')"><span>{{ copy.final.docs }}</span><span class="al-button-arrow" aria-hidden="true">→</span></a></div></section>
    </main>

    <footer class="al-footer"><div class="al-brand"><img :src="media('autoloom-logo.png')" alt="" width="28" height="28"><span>Autoloom</span></div><p>{{ copy.footer.truth }}</p><nav><a :href="link('/docs/')">{{ copy.nav.docs }}</a><a :href="link('/releases/')">{{ copy.nav.releases }}</a><a :href="link('/security/')">{{ copy.footer.security }}</a><a :href="link('/privacy/')">{{ copy.footer.privacy }}</a><a :href="link('/license/')">{{ copy.footer.license }}</a><a href="https://github.com/GanyuanRan/Autoloom">GitHub</a></nav><small>autoloom.codes</small></footer>
  </div>
</template>
