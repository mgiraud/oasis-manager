import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default context => {
    const vuetify = new Vuetify({
        theme: {
            dark: false
        },
        icons: {
            iconfont: 'mdiSvg',
        },
    })
    context.app.vuetify = vuetify
    context.$vuetify = vuetify.framework
}