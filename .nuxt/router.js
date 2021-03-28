import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6bbf6b4d = () => interopDefault(import('../app/pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _304188da = () => interopDefault(import('../app/pages/admin/gallery/index.vue' /* webpackChunkName: "pages/admin/gallery/index" */))
const _b087de62 = () => interopDefault(import('../app/pages/admin/member/index.vue' /* webpackChunkName: "pages/admin/member/index" */))
const _783c8986 = () => interopDefault(import('../app/pages/admin/memberGroup/index.vue' /* webpackChunkName: "pages/admin/memberGroup/index" */))
const _ea7d4df8 = () => interopDefault(import('../app/pages/admin/page/index.vue' /* webpackChunkName: "pages/admin/page/index" */))
const _7e7e33a2 = () => interopDefault(import('../app/pages/admin/pageCategory/index.vue' /* webpackChunkName: "pages/admin/pageCategory/index" */))
const _4d1bcfdd = () => interopDefault(import('../app/pages/admin/member/new.vue' /* webpackChunkName: "pages/admin/member/new" */))
const _7bfdeb58 = () => interopDefault(import('../app/pages/admin/memberGroup/new.vue' /* webpackChunkName: "pages/admin/memberGroup/new" */))
const _e460bd5c = () => interopDefault(import('../app/pages/admin/page/new.vue' /* webpackChunkName: "pages/admin/page/new" */))
const _399e8b70 = () => interopDefault(import('../app/pages/admin/pageCategory/new.vue' /* webpackChunkName: "pages/admin/pageCategory/new" */))
const _25091534 = () => interopDefault(import('../app/pages/admin/gallery/folders/_id/index.vue' /* webpackChunkName: "pages/admin/gallery/folders/_id/index" */))
const _c28b5604 = () => interopDefault(import('../app/pages/admin/gallery/_id/index.vue' /* webpackChunkName: "pages/admin/gallery/_id/index" */))
const _3965faf7 = () => interopDefault(import('../app/pages/admin/member/_id.vue' /* webpackChunkName: "pages/admin/member/_id" */))
const _a3699524 = () => interopDefault(import('../app/pages/admin/memberGroup/_id.vue' /* webpackChunkName: "pages/admin/memberGroup/_id" */))
const _7a19cc6c = () => interopDefault(import('../app/pages/admin/page/_id.vue' /* webpackChunkName: "pages/admin/page/_id" */))
const _25e8b68a = () => interopDefault(import('../app/pages/admin/pageCategory/_id.vue' /* webpackChunkName: "pages/admin/pageCategory/_id" */))
const _79e2901d = () => interopDefault(import('../app/pages/admin/_.vue' /* webpackChunkName: "pages/admin/_" */))
const _500fcbc4 = () => interopDefault(import('../app/pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _03f7ba67 = () => interopDefault(import('../app/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _14812423 = () => interopDefault(import('../app/pages/mentions_legales.vue' /* webpackChunkName: "pages/mentions_legales" */))
const _39364a6d = () => interopDefault(import('../app/pages/survey_join.vue' /* webpackChunkName: "pages/survey_join" */))
const _3a501750 = () => interopDefault(import('../app/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _0faec35d = () => interopDefault(import('../app/pages/_.vue' /* webpackChunkName: "pages/_" */))

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
    component: _6bbf6b4d,
    name: "admin",
    children: [{
      path: "gallery",
      component: _304188da,
      name: "admin-gallery"
    }, {
      path: "member",
      component: _b087de62,
      name: "admin-member"
    }, {
      path: "memberGroup",
      component: _783c8986,
      name: "admin-memberGroup"
    }, {
      path: "page",
      component: _ea7d4df8,
      name: "admin-page"
    }, {
      path: "pageCategory",
      component: _7e7e33a2,
      name: "admin-pageCategory"
    }, {
      path: "member/new",
      component: _4d1bcfdd,
      name: "admin-member-new"
    }, {
      path: "memberGroup/new",
      component: _7bfdeb58,
      name: "admin-memberGroup-new"
    }, {
      path: "page/new",
      component: _e460bd5c,
      name: "admin-page-new"
    }, {
      path: "pageCategory/new",
      component: _399e8b70,
      name: "admin-pageCategory-new"
    }, {
      path: "gallery/folders/:id",
      component: _25091534,
      name: "admin-gallery-folders-id"
    }, {
      path: "gallery/:id",
      component: _c28b5604,
      name: "admin-gallery-id"
    }, {
      path: "member/:id",
      component: _3965faf7,
      name: "admin-member-id"
    }, {
      path: "memberGroup/:id",
      component: _a3699524,
      name: "admin-memberGroup-id"
    }, {
      path: "page/:id",
      component: _7a19cc6c,
      name: "admin-page-id"
    }, {
      path: "pageCategory/:id",
      component: _25e8b68a,
      name: "admin-pageCategory-id"
    }, {
      path: "*",
      component: _79e2901d,
      name: "admin-all"
    }]
  }, {
    path: "/contact",
    component: _500fcbc4,
    name: "contact"
  }, {
    path: "/login",
    component: _03f7ba67,
    name: "login"
  }, {
    path: "/mentions_legales",
    component: _14812423,
    name: "mentions_legales"
  }, {
    path: "/survey_join",
    component: _39364a6d,
    name: "survey_join"
  }, {
    path: "/",
    component: _3a501750,
    name: "index"
  }, {
    path: "/*",
    component: _0faec35d,
    name: "all"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
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
