require('dotenv').config()

export default {
  srcDir: 'app/',
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api'
  },
  plugins: [
    '~/plugins/repository'
  ],
  modules: [
    '@nuxtjs/universal-storage'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    ['@nuxtjs/vuetify', {
      icons: {
        iconfont: 'mdiSvg'
      }
    }]
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
      },
      {
        path: '~/components/page',
        prefix: 'Page'
      },
      {
        path: '~/components/page/menu',
        prefix: 'PageMenu'
      },
      {
        path: '~/components/admin/page',
        prefix: 'AdminPage'
      },
      {
        path: '~/components/error',
        prefix: 'Error'
      },
      {
        path: '~/components/form',
        prefix: 'Form'
      },
      {
        path: '~/components/util',
        prefix: 'Util'
      },
      {
        path: '~/components/table',
        prefix: 'Table'
      }
    ]
  },
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
