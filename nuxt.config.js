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
    components: {
        dirs: [
            '~/components',
            {
                path: '~/components/admin/',
                prefix: 'Admin'
            }
        ]
    },
}
