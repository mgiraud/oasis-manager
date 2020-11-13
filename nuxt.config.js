require('dotenv').config()

export default {
    srcDir: 'app/',
    env: {
        apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000',
        apiBasePath: '/api'
    },
    plugins: [
        '@plugins/vuetify'
    ],
    modules: [
        '@nuxtjs/universal-storage',
    ],
    components: {
        dirs: [
            '~/components',
            {
                path: '~/components/admin/',
                prefix: 'Admin'
            },
            {
                path: '~/components/admin/media',
                prefix: 'AdminMedia'
            }
        ]
    },
    storage: {
        cookie: {
            prefix: 'oasis-manager-',
        },
        localStorage: {
            prefix: 'oasis-manager-'
        },
    }
}
