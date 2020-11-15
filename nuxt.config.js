require('dotenv').config()

export default {
  srcDir: 'app/',
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000',
    apiBasePath: '/api'
  },
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/repository'
  ],
  modules: [
    '@nuxtjs/universal-storage'
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  components: {
    dirs: [
      '~/components',
      {
        path: '~/components/admin/',
        prefix: 'Admin'
      },
      {
        path: '~/components/admin/gallery',
        prefix: 'AdminGallery'
      }
    ]
  },
  storage: {
    cookie: {
      prefix: 'oasis-manager-'
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
