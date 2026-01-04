import DefaultTheme from 'vitepress/theme'
import './custom.css'
import NewsletterForm from './components/NewsletterForm.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NewsletterForm', NewsletterForm)
  }
}
