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
    '@nuxt/typescript-build',
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
  typescript: {
    typeCheck: {
      eslint: {
        files: 'app/**/*.{ts,js,vue}'
      }
    }
  },
  css: [
    'remixicon/fonts/remixicon.css'
  ]
}
