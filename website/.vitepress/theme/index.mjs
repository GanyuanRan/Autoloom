import DefaultTheme from 'vitepress/theme'
import AutoloomHome from './AutoloomHome.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AutoloomHome', AutoloomHome)
  },
}
