<script setup>
import { withBase } from 'vitepress'

const props = defineProps({
  locale: { type: String, required: true },
  copy: { type: Object, required: true },
  downloadUrl: { type: String, required: true },
  languageHref: { type: String, required: true },
  home: { type: Boolean, default: false },
  active: { type: String, default: '' },
})

const prefix = props.locale === 'en' ? '/en' : ''
const link = path => withBase(`${prefix}${path}`)
const homeLink = anchor => props.home ? anchor : `${link('/')}${anchor}`
</script>

<template>
  <header class="al-header">
    <a class="al-brand" :href="link('/')" aria-label="Autoloom">
      <img :src="withBase('/media/autoloom-logo.png')" alt="" width="34" height="34">
      <span>Autoloom</span>
    </a>
    <nav :aria-label="locale === 'en' ? 'Main navigation' : '主导航'">
      <a :href="homeLink('#product')">{{ copy.nav.product }}</a>
      <a :href="homeLink('#governance')">{{ copy.nav.governance }}</a>
      <a :href="link('/aegis/')" :aria-current="active === 'aegis' ? 'page' : undefined">{{ copy.nav.aegis }}</a>
      <a :href="link('/docs/')">{{ copy.nav.docs }}</a>
      <a :href="link('/releases/')">{{ copy.nav.releases }}</a>
    </nav>
    <div class="al-header-actions">
      <a :href="withBase(languageHref)">{{ copy.nav.language }}</a>
      <a class="al-github" href="https://github.com/GanyuanRan/Autoloom" aria-label="GitHub">GitHub</a>
      <a class="al-header-download" :href="downloadUrl">{{ copy.nav.download }}</a>
    </div>
  </header>
</template>
