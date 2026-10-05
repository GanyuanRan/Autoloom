<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createGovernanceField } from './governance-field.mjs'

const props = defineProps({
  locale: { type: String, required: true },
  variant: { type: String, required: true },
})
const canvas = ref(null)
const paused = ref(false)
const reduced = ref(false)
let dispose = () => {}
let updatePlayback = () => {}

function togglePlayback() {
  paused.value = !paused.value
  updatePlayback()
}

onMounted(() => {
  const element = canvas.value
  const host = element.parentElement.parentElement
  const field = createGovernanceField(element, props.variant)
  const preference = matchMedia('(prefers-reduced-motion: reduce)')
  let visible = false

  updatePlayback = () => field.setRunning(visible && !document.hidden && !paused.value && !reduced.value)
  const updatePreference = () => {
    reduced.value = preference.matches
    updatePlayback()
  }
  const resize = new ResizeObserver(() => field.resize())
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    updatePlayback()
  })
  const pointer = event => field.setPointer(event.clientX / innerWidth - 0.5, event.clientY / innerHeight - 0.5)
  const resetPointer = () => field.setPointer(0, 0)
  updatePreference()
  resize.observe(host)
  visibility.observe(host)
  document.addEventListener('visibilitychange', updatePlayback)
  preference.addEventListener('change', updatePreference)
  host.addEventListener('pointermove', pointer, { passive: true })
  host.addEventListener('pointerleave', resetPointer)
  dispose = () => {
    resize.disconnect()
    visibility.disconnect()
    document.removeEventListener('visibilitychange', updatePlayback)
    preference.removeEventListener('change', updatePreference)
    host.removeEventListener('pointermove', pointer)
    host.removeEventListener('pointerleave', resetPointer)
    field.dispose()
  }
})

onBeforeUnmount(() => dispose())
</script>

<template>
  <div class="governance-backdrop" :class="`governance-backdrop-${variant}`">
    <canvas ref="canvas" aria-hidden="true" />
    <div class="governance-backdrop-shade" aria-hidden="true" />
    <button v-if="!reduced" class="governance-motion-control" type="button"
      :aria-label="locale === 'en' ? (paused ? 'Play background animation' : 'Pause background animation') : (paused ? '播放背景动画' : '暂停背景动画')"
      :title="locale === 'en' ? (paused ? 'Play background animation' : 'Pause background animation') : (paused ? '播放背景动画' : '暂停背景动画')"
      :aria-pressed="paused" @click="togglePlayback">
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path v-if="paused" d="M5 3 L12 8 L5 13 Z" fill="currentColor" />
        <path v-else d="M5 3 V13 M11 3 V13" stroke="currentColor" stroke-width="2" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.governance-backdrop {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.governance-backdrop canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.governance-backdrop-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(3, 7, 17, 0.72) 0%, rgba(3, 7, 17, 0.44) 28%, transparent 58%),
    linear-gradient(0deg, rgba(3, 7, 17, 0.28), transparent 20%, transparent 78%, rgba(3, 7, 17, 0.24));
}
.governance-motion-control {
  position: absolute;
  right: 28px;
  bottom: 20px;
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid rgba(149, 189, 226, 0.28);
  border-radius: 50%;
  color: #b4c8e1;
  background: rgba(4, 11, 27, 0.5);
  cursor: pointer;
  pointer-events: auto;
}
.governance-motion-control:hover { color: #fff; border-color: rgba(139, 209, 255, 0.6); }
.governance-motion-control:focus-visible { outline: 2px solid #48c7ff; outline-offset: 4px; }
@media (max-width: 820px) {
  .governance-backdrop-shade {
    background: linear-gradient(90deg, rgba(3, 7, 17, 0.52), rgba(3, 7, 17, 0.12));
  }
  .governance-motion-control { right: 18px; bottom: 14px; }
}
</style>
