import NuxtConfiguration from '@nuxt/config'
import { Configuration as WebpackConfiguration } from 'webpack'
import { SiteConfig } from './site.config'

const config: NuxtConfiguration = {
  mode: 'universal',

  srcDir: './src',

  head: {
    title: `${SiteConfig.title} | ${SiteConfig.catchCopy}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: SiteConfig.color },
      { hid: 'description', name: 'description', content: SiteConfig.description },
      { hid: 'og:site_name', property: 'og:site_name', content: SiteConfig.title },
      { hid: 'og:host', property: 'og:host', content: SiteConfig.url },
      { hid: 'og:type', property: 'og:type', content: SiteConfig.ogType },
      { hid: 'og:locale', property: 'og:locale', content: SiteConfig.ogLocale },
      { hid: 'og:title', property: 'og:title', content: SiteConfig.title },
      { hid: 'og:desc', property: 'og:description', content: SiteConfig.description },
      { hid: 'og:url', property: 'og:url', content: SiteConfig.url },
      { hid: 'og:image', property: 'og:image', content: `${SiteConfig.url}/${SiteConfig.ogImage}` },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter:image', property: 'twitter:image', content: `${SiteConfig.url}/${SiteConfig.ogImage}` },
      { hid: 'twitter:desc', property: 'twitter:description', content: SiteConfig.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: SiteConfig.color },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/style-resources'],
  devModules: ['@nuxtjs/tailwindcss'],
  /*
   ** Build configuration
   */
  build: {
    devtools: true,
    extend(
      config: WebpackConfiguration,
      ctx: {
        isDev: boolean
        isClient: boolean
        isServer: boolean
        loaders: any
      }
    ): void {
      if (ctx.isDev && ctx.isClient) {
        if (config.module) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
      }
    }
  },

  axios: {},

  tailwindcss: {
    configPath: '@@/tailwind.config.js'
  },

  styleResources: {
    scss: ['@/assets/style/helpers/*.scss']
  }
}

export default config
