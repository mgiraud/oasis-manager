import FormKitPlugin from '@formkit/tailwindcss'
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'app/',
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'https://127.0.0.1:8000/api'
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@formkit/nuxt'],
  formkit: {
    configFile: './app/config/formkit.config',
  },
  tailwindcss: {
    config: {
      content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/config/**/*.ts",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
      ],
      plugins: [
        FormKitPlugin
      ],
      theme: {
        extend: {
          colors: {
            'primary-dark': '#06705e',
            primary: '#84DCC6',
            secondary: '#FFA69E',
            accent: '#FF686B',
            info: '#A5FFD6'
          },
          fontFamily: {
            marker: ['"Permanent Marker"', 'serif'],
            sans: ['Helvetica'],
          },
        }
      }
    },
  },
  typescript: {
    strict: true
  },
  app: {
    head: {
      titleTemplate: '%s - Les transalpins',
      htmlAttrs: {
        prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'title', content: 'Projet d\'habitat groupé participatif vers la région grenobloise' },
        { name: 'description', content: 'Projet d\'habitat groupé participatif sobre, convivial et écologique situé vers la région grenobloise' },
        { hid: 'og:locale', property: 'og:locale', content: 'fr_FR' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Les Transalpins' },
        { hid: 'og:title', property: 'og:title', content: 'Projet d\'habitat groupé participatif vers la région grenobloise' },
        { hid: 'og:description', property: 'og:description', content: 'Projet d\'habitat groupé participatif sobre, convivial et écologique situé vers la région grenobloise' },
        { hid: 'og:url', property: 'og:url', content: 'https://www.lestransalpins.org' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image', property: 'og:image', content: 'https://www.lestransalpins.org/images/vercors.jpg' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: 'Illustration : Les hauts plateaux du vercors | les Transalpins' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:domain', name: 'twitter:domain', content: 'https://www.lestransalpins.org' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Projet d\'habitat groupé participatif vers la région grenobloise' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Projet d\'habitat groupé participatif sobre, convivial et écologique situé vers la région grenobloise' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://www.lestransalpins.org/images/vercors.jpg' },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Illustration : Les hauts plateaux du vercors | les Transalpins' }
      ],
      link: [
        { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Permanent+Marker' },
        { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Amatic+SC' },
        { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Caveat' }
      ]
    },
  },
})
