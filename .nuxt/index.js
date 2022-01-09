import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_plugin_a891266e from 'nuxt_plugin_plugin_a891266e' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_plugin_10c5166d from 'nuxt_plugin_plugin_10c5166d' // Source: ./composition-api/plugin.mjs (mode: 'all')
import nuxt_plugin_repository_02bac980 from 'nuxt_plugin_repository_02bac980' // Source: ../app/plugins/repository (mode: 'all')
import nuxt_plugin_capitalize_f5d14914 from 'nuxt_plugin_capitalize_f5d14914' // Source: ../app/plugins/filters/capitalize (mode: 'all')
import nuxt_plugin_auth_7f755f62 from 'nuxt_plugin_auth_7f755f62' // Source: ../app/plugins/auth.ts (mode: 'all')
import nuxt_plugin_meta_6fe9a8bf from 'nuxt_plugin_meta_6fe9a8bf' // Source: ./composition-api/meta.mjs (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"%s - Les transalpins","htmlAttrs":{"prefix":"og: https:\u002F\u002Fogp.me\u002Fns#"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"title","content":"Projet d'habitat groupé participatif vers la région grenobloise"},{"name":"description","content":"Projet d'habitat groupé participatif sobre, convivial et écologique situé vers la région grenobloise"},{"hid":"og:locale","property":"og:locale","content":"fr_FR"},{"hid":"og:site_name","property":"og:site_name","content":"Les Transalpins"},{"hid":"og:title","property":"og:title","content":"Projet d'habitat groupé participatif vers la région grenobloise"},{"hid":"og:description","property":"og:description","content":"Projet d'habitat groupé participatif sobre, convivial et écologique situé vers la région grenobloise"},{"hid":"og:url","property":"og:url","content":"https:\u002F\u002Fwww.lestransalpins.org"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Fwww.lestransalpins.org\u002Fimages\u002Fvercors.jpg"},{"hid":"og:image:alt","property":"og:image:alt","content":"Illustration : Les hauts plateaux du vercors | les Transalpins"},{"hid":"twitter:card","name":"twitter:card","content":"summary"},{"hid":"twitter:domain","name":"twitter:domain","content":"https:\u002F\u002Fwww.lestransalpins.org"},{"hid":"twitter:title","name":"twitter:title","content":"Projet d'habitat groupé participatif vers la région grenobloise"},{"hid":"twitter:description","name":"twitter:description","content":"Projet d'habitat groupé participatif sobre, convivial et écologique situé vers la région grenobloise"},{"hid":"twitter:image","name":"twitter:image","content":"https:\u002F\u002Fwww.lestransalpins.org\u002Fimages\u002Fvercors.jpg"},{"hid":"twitter:image:alt","name":"twitter:image:alt","content":"Illustration : Les hauts plateaux du vercors | les Transalpins"}],"link":[{"rel":"stylesheet","href":"\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Permanent+Marker"},{"rel":"stylesheet","href":"\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Amatic+SC"},{"rel":"stylesheet","href":"\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Caveat"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Helvetica:100,300,400,500,700,900&display=swap"}],"style":[],"script":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_a891266e === 'function') {
    await nuxt_plugin_plugin_a891266e(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_10c5166d === 'function') {
    await nuxt_plugin_plugin_10c5166d(app.context, inject)
  }

  if (typeof nuxt_plugin_repository_02bac980 === 'function') {
    await nuxt_plugin_repository_02bac980(app.context, inject)
  }

  if (typeof nuxt_plugin_capitalize_f5d14914 === 'function') {
    await nuxt_plugin_capitalize_f5d14914(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_7f755f62 === 'function') {
    await nuxt_plugin_auth_7f755f62(app.context, inject)
  }

  if (typeof nuxt_plugin_meta_6fe9a8bf === 'function') {
    await nuxt_plugin_meta_6fe9a8bf(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    const { route } = router.resolve(app.context.route.fullPath)
    // Ignore 404s rather than blindly replacing URL
    if (!route.matched.length && process.client) {
      return resolve()
    }
    router.replace(route, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
