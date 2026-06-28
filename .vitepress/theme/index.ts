import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'

// Keep the GitHub-star button from the legacy site (Gitter is dropped).
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () =>
        h('iframe', {
          class: 'gh-star-button',
          src: 'https://ghbtns.com/github-btn.html?user=CMB2&repo=CMB2&type=star&count=true',
          frameborder: '0',
          scrolling: '0',
          width: '110',
          height: '20',
          title: 'Star CMB2 on GitHub',
          loading: 'lazy',
        }),
    })
  },
}
