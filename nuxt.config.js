import redirectSSL from 'redirect-ssl'
require('dotenv').config()

const REMIX_ICONS = {
  complete: 'ri-check-line',
  cancel: 'ri-close-circle-line',
  close: 'ri-close-line',
  delete: 'ri-delete-bin-line', // delete (e.g. v-chip close)
  clear: 'ri-close-line',
  success: 'ri-checkbox-circle-line',
  info: 'ri-information-line',
  warning: 'ri-error-warning-line',
  error: 'ri-alert-line',
  prev: 'ri-arrow-drop-left-line',
  next: 'ri-arrow-drop-right-line',
  checkboxOn: 'ri-checkbox-line',
  checkboxOff: 'ri-checkbox-blank-line',
  checkboxIndeterminate: 'ri-checkbox-indeterminate-line',
  delimiter: 'ri-checkbox-blank-circle-line', // for carousel
  sort: 'ri-arrow-drop-up-fill',
  expand: 'ri-arrow-drop-down-fill',
  menu: 'ri-menu-line',
  subgroup: 'ri-arrow-down-s-fill',
  dropdown: 'ri-arrow-down-s-fill',
  radioOn: 'ri-radio-button-line',
  radioOff: 'ri-checkbox-blank-circle-line',
  edit: 'ri-edit-line',
  ratingEmpty: 'ri-star-line',
  ratingFull: 'ri-star-fill',
  ratingHalf: 'ri-star-half-line',
  loading: 'ri-loader-2-line',
  first: 'ri-arrow-left-line',
  last: 'ri-arrow-right-line',
  unfold: 'ri-menu-unfold-line',
  file: 'ri-attachment-line',
  plus: 'ri-add-line',
  minus: 'ri-subtract-line'
}

export default {
  srcDir: 'app/',
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api'
  },
  plugins: [
    '~/plugins/repository',
    '~/plugins/filters/capitalize',
    '~/plugins/auth.ts'
  ],
  buildModules: [
    ['@nuxt/typescript-build', {}],
    ['@nuxtjs/vuetify', {
      icons: {
        values: REMIX_ICONS
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
  ],
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production'
    })
  ]
}
