import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import footer from './configs/footer'

const base = '/'

export default defineConfig({
  title: 'much-more-design',
  description: '',
  appearance: false,
  base,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/much-more-icon.svg'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/much-more-icon.svg',
    nav,
    sidebar,
    footer
  }
})
