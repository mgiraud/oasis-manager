require('dotenv').config()

export default {
  srcDir: 'app/',
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api'
  },
  plugins: [
    '~/plugins/repository',
    '~/plugins/filters/capitalize'
  ],
  modules: [
    '@nuxtjs/universal-storage'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    ['@nuxtjs/vuetify', {
      icons: {
        iconfont: 'mdiSvg'
      },
      theme: {
        themes: {
          light: {
            primary: '#84DCC6',
            secondary: '#FFA69E',
            accent: '#FF686B',
            info: '#A5FFD6'
            // success: '#4CAF50',
            // warning: '#FFC107'
          },
          dark: {
            primary: '#4CAF50',
            secondary: '#FFFFFF'
          }
        }
      }
    }]
  ],
  storage: {
    cookie: {
      prefix: 'oasis-manager-',
      path: '/'
    },
    localStorage: {
      prefix: 'oasis-manager-'
    }
  },
  eslint: {
    fix: true,
    baseConfig: {
      extends: ['@nuxtjs']
    }
  }
}
