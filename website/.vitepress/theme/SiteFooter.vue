<script setup>
import { withBase } from 'vitepress'

const props = defineProps({
  locale: { type: String, required: true },
  copy: { type: Object, required: true },
})

const prefix = props.locale === 'en' ? '/en' : ''
const link = path => withBase(`${prefix}${path}`)
</script>

<template>
  <footer class="al-footer">
    <div class="al-brand"><img :src="withBase('/media/autoloom-logo.png')" alt="" width="28" height="28"><span>Autoloom</span></div>
    <p>{{ copy.footer.truth }}</p>
    <nav>
      <a :href="link('/aegis/')">Aegis</a>
      <a :href="link('/docs/')">{{ copy.nav.docs }}</a>
      <a :href="link('/releases/')">{{ copy.nav.releases }}</a>
      <a :href="link('/security/')">{{ copy.footer.security }}</a>
      <a :href="link('/privacy/')">{{ copy.footer.privacy }}</a>
      <a :href="link('/license/')">{{ copy.footer.license }}</a>
      <a href="https://github.com/GanyuanRan/Autoloom">GitHub</a>
    </nav>
    <small>autoloom.codes</small>
  </footer>
</template>
