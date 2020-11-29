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
        path: '~/components/layout',
        prefix: 'Layout'
      },
      {
        path: '~/components/admin/memberGroup',
        prefix: 'AdminMemberGroup'
      },
      {
        path: '~/components/admin/member',
        prefix: 'AdminMember'
      },
      {
        path: '~/components/admin/pageCategory',
        prefix: 'AdminPageCategory'
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
