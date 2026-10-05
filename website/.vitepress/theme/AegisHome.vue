<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { aegisContent } from './aegis-content.mjs'
import { homeContent } from './home-content.mjs'
import SiteFooter from './SiteFooter.vue'
import SiteHeader from './SiteHeader.vue'

const props = defineProps({ locale: { type: String, required: true } })
const { theme } = useData()
const copy = computed(() => aegisContent[props.locale])
const siteCopy = computed(() => homeContent[props.locale])
const release = computed(() => theme.value.release)
const prefix = computed(() => props.locale === 'en' ? '/en' : '')
const link = path => withBase(`${prefix.value}${path}`)
const repository = 'https://github.com/GanyuanRan/Aegis'
const install = `${repository}#quick-install`
</script>

<template>
  <div class="al-site ag-site">
    <a class="al-skip" href="#main">{{ locale === 'en' ? 'Skip to content' : '跳至正文' }}</a>
    <SiteHeader :locale="locale" :copy="siteCopy" :download-url="release.installer.url" :language-href="locale === 'en' ? '/aegis/' : '/en/aegis/'" active="aegis" />

    <main id="main">
      <section id="product" class="ag-hero">
        <div class="ag-hero-copy">
          <p class="al-eyebrow">{{ copy.hero.eyebrow }}</p>
          <h1><span>{{ copy.hero.title[0] }}</span><span class="al-gradient-text">{{ copy.hero.title[1] }}</span><span class="al-gradient-text">{{ copy.hero.title[2] }}</span></h1>
          <p class="ag-hero-body">{{ copy.hero.body }}</p>
          <p class="ag-hero-practical">{{ copy.hero.practical }}</p>
          <div class="ag-actions"><a class="al-primary-button" :href="repository">{{ copy.hero.github }}</a><a class="al-secondary-button al-secondary-button-light" :href="install">{{ copy.hero.install }}</a></div>
          <p class="ag-meta">{{ copy.hero.meta }}</p>
        </div>
        <div class="ag-hero-system" aria-hidden="true">
          <div class="ag-core"><span>A</span><strong>AEGIS</strong><small>Governance Engineering</small></div>
          <ol><li v-for="([number, label]) in copy.hero.flow" :key="number"><span>{{ number }}</span><strong>{{ label }}</strong></li></ol>
        </div>
      </section>

      <section id="governance" class="al-section ag-value-section">
        <div class="al-section-heading"><p class="al-kicker">{{ copy.value.kicker }}</p><h2>{{ copy.value.title }}</h2><p>{{ copy.value.body }}</p></div>
        <div class="ag-value-grid"><article v-for="([title, body], index) in copy.value.items" :key="title"><span>0{{ index + 1 }}</span><h3>{{ title }}</h3><p>{{ body }}</p></article></div>
      </section>

      <section class="al-section ag-methods-section">
        <div class="al-section-heading al-centered"><p class="al-kicker">{{ copy.methods.kicker }}</p><h2>{{ copy.methods.title }}</h2><p>{{ copy.methods.body }}</p></div>
        <div class="ag-method-grid"><article v-for="([title, body], index) in copy.methods.items" :key="title"><span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ title }}</h3><p>{{ body }}</p></article></div>
      </section>

      <section class="al-section ag-hosts-section">
        <div class="ag-hosts-copy"><p class="al-kicker">{{ copy.hosts.kicker }}</p><h2>{{ copy.hosts.title }}</h2><p>{{ copy.hosts.body }}</p><a class="al-secondary-button" :href="`${repository}#supported-hosts`">{{ copy.hosts.matrix }}</a></div>
        <ul class="ag-host-cloud"><li v-for="host in copy.hosts.hosts" :key="host">{{ host }}</li></ul>
      </section>

      <section class="al-section ag-evidence-section">
        <div class="ag-evidence-card"><p class="al-kicker">{{ copy.evidence.kicker }}</p><h2>{{ copy.evidence.title }}</h2><p>{{ copy.evidence.body }}</p><div class="ag-actions"><a class="al-primary-button" :href="`${repository}#measured-agentic-benchmark`">{{ copy.evidence.benchmark }}</a><a class="al-secondary-button al-secondary-button-light" :href="repository">{{ copy.evidence.source }}</a></div></div>
        <div class="ag-evidence-visual" aria-hidden="true"><span>baseline</span><span>method</span><span>action</span><span>evidence</span><i /></div>
      </section>

      <section class="al-section ag-relationship-section">
        <div class="al-section-heading al-centered"><p class="al-kicker">{{ copy.relationship.kicker }}</p><h2>{{ copy.relationship.title }}</h2></div>
        <div class="ag-relationship-grid">
          <article><span>{{ copy.relationship.aegis.label }}</span><h3>{{ copy.relationship.aegis.title }}</h3><p>{{ copy.relationship.aegis.body }}</p><a class="al-secondary-button" :href="repository">GitHub</a></article>
          <article class="ag-autoloom-card"><span>{{ copy.relationship.autoloom.label }}</span><h3>{{ copy.relationship.autoloom.title }}</h3><p>{{ copy.relationship.autoloom.body }}</p><a class="al-primary-button al-blue-button" :href="link('/')">{{ copy.relationship.autoloomCta }}</a></article>
        </div>
      </section>

      <section class="al-section ag-boundaries-section">
        <div class="al-section-heading"><h2>{{ copy.boundaries.title }}</h2></div>
        <dl><template v-for="([term, description]) in copy.boundaries.items" :key="term"><div><dt>{{ term }}</dt><dd>{{ description }}</dd></div></template></dl>
      </section>

      <section class="al-final-cta"><h2>{{ copy.final.title }}</h2><div><a class="al-primary-button" :href="repository">{{ copy.final.github }}</a><a class="al-secondary-button al-secondary-button-light" :href="install">{{ copy.final.install }}</a></div></section>
    </main>

    <SiteFooter :locale="locale" :copy="siteCopy" />
  </div>
</template>
