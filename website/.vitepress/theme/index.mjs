import DefaultTheme from 'vitepress/theme'
import AegisHome from './AegisHome.vue'
import AutoloomHome from './AutoloomHome.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AegisHome', AegisHome)
    app.component('AutoloomHome', AutoloomHome)
  },
}
