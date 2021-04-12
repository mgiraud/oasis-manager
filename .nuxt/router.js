import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2fe0b625 = () => interopDefault(import('../app/pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _c7cea72a = () => interopDefault(import('../app/pages/admin/gallery/index.vue' /* webpackChunkName: "pages/admin/gallery/index" */))
const _10a524f7 = () => interopDefault(import('../app/pages/admin/member/index.vue' /* webpackChunkName: "pages/admin/member/index" */))
const _c3bc6344 = () => interopDefault(import('../app/pages/admin/memberGroup/index.vue' /* webpackChunkName: "pages/admin/memberGroup/index" */))
const _6fb1572c = () => interopDefault(import('../app/pages/admin/page/index.vue' /* webpackChunkName: "pages/admin/page/index" */))
const _154189ca = () => interopDefault(import('../app/pages/admin/pageCategory/index.vue' /* webpackChunkName: "pages/admin/pageCategory/index" */))
const _320bce05 = () => interopDefault(import('../app/pages/admin/member/new.vue' /* webpackChunkName: "pages/admin/member/new" */))
const _4da1a52c = () => interopDefault(import('../app/pages/admin/memberGroup/new.vue' /* webpackChunkName: "pages/admin/memberGroup/new" */))
const _3779097a = () => interopDefault(import('../app/pages/admin/page/new.vue' /* webpackChunkName: "pages/admin/page/new" */))
const _22114b98 = () => interopDefault(import('../app/pages/admin/pageCategory/new.vue' /* webpackChunkName: "pages/admin/pageCategory/new" */))
const _45affbe8 = () => interopDefault(import('../app/pages/admin/gallery/folders/_id/index.vue' /* webpackChunkName: "pages/admin/gallery/folders/_id/index" */))
const _76c0cc54 = () => interopDefault(import('../app/pages/admin/gallery/_id/index.vue' /* webpackChunkName: "pages/admin/gallery/_id/index" */))
const _1e55f91f = () => interopDefault(import('../app/pages/admin/member/_id.vue' /* webpackChunkName: "pages/admin/member/_id" */))
const _39ebd046 = () => interopDefault(import('../app/pages/admin/memberGroup/_id.vue' /* webpackChunkName: "pages/admin/memberGroup/_id" */))
const _23c33494 = () => interopDefault(import('../app/pages/admin/page/_id.vue' /* webpackChunkName: "pages/admin/page/_id" */))
const _0e5b76b2 = () => interopDefault(import('../app/pages/admin/pageCategory/_id.vue' /* webpackChunkName: "pages/admin/pageCategory/_id" */))
const _8a46f616 = () => interopDefault(import('../app/pages/admin/_.vue' /* webpackChunkName: "pages/admin/_" */))
const _18f20ef6 = () => interopDefault(import('../app/pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _6fcdf582 = () => interopDefault(import('../app/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0d1dbb6a = () => interopDefault(import('../app/pages/mentions_legales.vue' /* webpackChunkName: "pages/mentions_legales" */))
const _600bd976 = () => interopDefault(import('../app/pages/survey_join.vue' /* webpackChunkName: "pages/survey_join" */))
const _031d3bb0 = () => interopDefault(import('../app/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _3d173a35 = () => interopDefault(import('../app/pages/_.vue' /* webpackChunkName: "pages/_" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _2fe0b625,
    name: "admin",
    children: [{
      path: "gallery",
      component: _c7cea72a,
      name: "admin-gallery"
    }, {
      path: "member",
      component: _10a524f7,
      name: "admin-member"
    }, {
      path: "memberGroup",
      component: _c3bc6344,
      name: "admin-memberGroup"
    }, {
      path: "page",
      component: _6fb1572c,
      name: "admin-page"
    }, {
      path: "pageCategory",
      component: _154189ca,
      name: "admin-pageCategory"
    }, {
      path: "member/new",
      component: _320bce05,
      name: "admin-member-new"
    }, {
      path: "memberGroup/new",
      component: _4da1a52c,
      name: "admin-memberGroup-new"
    }, {
      path: "page/new",
      component: _3779097a,
      name: "admin-page-new"
    }, {
      path: "pageCategory/new",
      component: _22114b98,
      name: "admin-pageCategory-new"
    }, {
      path: "gallery/folders/:id",
      component: _45affbe8,
      name: "admin-gallery-folders-id"
    }, {
      path: "gallery/:id",
      component: _76c0cc54,
      name: "admin-gallery-id"
    }, {
      path: "member/:id",
      component: _1e55f91f,
      name: "admin-member-id"
    }, {
      path: "memberGroup/:id",
      component: _39ebd046,
      name: "admin-memberGroup-id"
    }, {
      path: "page/:id",
      component: _23c33494,
      name: "admin-page-id"
    }, {
      path: "pageCategory/:id",
      component: _0e5b76b2,
      name: "admin-pageCategory-id"
    }, {
      path: "*",
      component: _8a46f616,
      name: "admin-all"
    }]
  }, {
    path: "/contact",
    component: _18f20ef6,
    name: "contact"
  }, {
    path: "/login",
    component: _6fcdf582,
    name: "login"
  }, {
    path: "/mentions_legales",
    component: _0d1dbb6a,
    name: "mentions_legales"
  }, {
    path: "/survey_join",
    component: _600bd976,
    name: "survey_join"
  }, {
    path: "/",
    component: _031d3bb0,
    name: "index"
  }, {
    path: "/*",
    component: _3d173a35,
    name: "all"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
