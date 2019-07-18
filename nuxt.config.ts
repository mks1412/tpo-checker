import NuxtConfiguration from '@nuxt/config'
import { Configuration as WebpackConfiguration } from 'webpack'
import { SiteConfig } from './site.config'

require('dotenv').config()

const config: NuxtConfiguration = {
  mode: 'spa',

  srcDir: './src',

  head: {
    title: `${SiteConfig.title} | ${SiteConfig.catchCopy}`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"'
      },
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
   ** Environment Variables
   */
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY!,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN!,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL!,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET!,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID!
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/environments.ts', '@/plugins/vue-croppa.ts'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/dotenv', '@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/style-resources'],
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
    scss: ['@/assets/scss/helpers/*.scss']
  }
}

export default config
