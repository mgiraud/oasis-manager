import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2fe0b625 = () => interopDefault(import('../app/pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _7ea4d568 = () => interopDefault(import('../app/pages/admin/blog-article/index.vue' /* webpackChunkName: "pages/admin/blog-article/index" */))
const _5c242fb9 = () => interopDefault(import('../app/pages/admin/contact/index.vue' /* webpackChunkName: "pages/admin/contact/index" */))
const _773fee3a = () => interopDefault(import('../app/pages/admin/contact-newsletter/index.vue' /* webpackChunkName: "pages/admin/contact-newsletter/index" */))
const _c7cea72a = () => interopDefault(import('../app/pages/admin/gallery/index.vue' /* webpackChunkName: "pages/admin/gallery/index" */))
const _10a524f7 = () => interopDefault(import('../app/pages/admin/member/index.vue' /* webpackChunkName: "pages/admin/member/index" */))
const _3947182e = () => interopDefault(import('../app/pages/admin/member-group/index.vue' /* webpackChunkName: "pages/admin/member-group/index" */))
const _6fb1572c = () => interopDefault(import('../app/pages/admin/page/index.vue' /* webpackChunkName: "pages/admin/page/index" */))
const _6fe34095 = () => interopDefault(import('../app/pages/admin/page-category/index.vue' /* webpackChunkName: "pages/admin/page-category/index" */))
const _39375c16 = () => interopDefault(import('../app/pages/admin/survey-join/index.vue' /* webpackChunkName: "pages/admin/survey-join/index" */))
const _a7223294 = () => interopDefault(import('../app/pages/admin/blog-article/new.vue' /* webpackChunkName: "pages/admin/blog-article/new" */))
const _6bce3177 = () => interopDefault(import('../app/pages/admin/member-group/new.vue' /* webpackChunkName: "pages/admin/member-group/new" */))
const _320bce05 = () => interopDefault(import('../app/pages/admin/member/new.vue' /* webpackChunkName: "pages/admin/member/new" */))
const _0ab83923 = () => interopDefault(import('../app/pages/admin/page-category/new.vue' /* webpackChunkName: "pages/admin/page-category/new" */))
const _3779097a = () => interopDefault(import('../app/pages/admin/page/new.vue' /* webpackChunkName: "pages/admin/page/new" */))
const _ce8ddc60 = () => interopDefault(import('../app/pages/admin/blog-article/_id.vue' /* webpackChunkName: "pages/admin/blog-article/_id" */))
const _483ccc61 = () => interopDefault(import('../app/pages/admin/contact/_id.vue' /* webpackChunkName: "pages/admin/contact/_id" */))
const _58185c91 = () => interopDefault(import('../app/pages/admin/member-group/_id.vue' /* webpackChunkName: "pages/admin/member-group/_id" */))
const _1e55f91f = () => interopDefault(import('../app/pages/admin/member/_id.vue' /* webpackChunkName: "pages/admin/member/_id" */))
const _11fb3786 = () => interopDefault(import('../app/pages/admin/page-category/_id.vue' /* webpackChunkName: "pages/admin/page-category/_id" */))
const _23c33494 = () => interopDefault(import('../app/pages/admin/page/_id.vue' /* webpackChunkName: "pages/admin/page/_id" */))
const _bc0d2804 = () => interopDefault(import('../app/pages/admin/survey-join/_id.vue' /* webpackChunkName: "pages/admin/survey-join/_id" */))
const _8a46f616 = () => interopDefault(import('../app/pages/admin/_.vue' /* webpackChunkName: "pages/admin/_" */))
const _1ae55b3f = () => interopDefault(import('../app/pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _4667f21d = () => interopDefault(import('../app/pages/cahier-des-charges.vue' /* webpackChunkName: "pages/cahier-des-charges" */))
const _18f20ef6 = () => interopDefault(import('../app/pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _6fcdf582 = () => interopDefault(import('../app/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0d1dbb6a = () => interopDefault(import('../app/pages/mentions_legales.vue' /* webpackChunkName: "pages/mentions_legales" */))
const _600bd976 = () => interopDefault(import('../app/pages/survey_join.vue' /* webpackChunkName: "pages/survey_join" */))
const _e524d704 = () => interopDefault(import('../app/pages/blog/_tag.vue' /* webpackChunkName: "pages/blog/_tag" */))
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
      path: "blog-article",
      component: _7ea4d568,
      name: "admin-blog-article"
    }, {
      path: "contact",
      component: _5c242fb9,
      name: "admin-contact"
    }, {
      path: "contact-newsletter",
      component: _773fee3a,
      name: "admin-contact-newsletter"
    }, {
      path: "gallery",
      component: _c7cea72a,
      name: "admin-gallery"
    }, {
      path: "member",
      component: _10a524f7,
      name: "admin-member"
    }, {
      path: "member-group",
      component: _3947182e,
      name: "admin-member-group"
    }, {
      path: "page",
      component: _6fb1572c,
      name: "admin-page"
    }, {
      path: "page-category",
      component: _6fe34095,
      name: "admin-page-category"
    }, {
      path: "survey-join",
      component: _39375c16,
      name: "admin-survey-join"
    }, {
      path: "blog-article/new",
      component: _a7223294,
      name: "admin-blog-article-new"
    }, {
      path: "member-group/new",
      component: _6bce3177,
      name: "admin-member-group-new"
    }, {
      path: "member/new",
      component: _320bce05,
      name: "admin-member-new"
    }, {
      path: "page-category/new",
      component: _0ab83923,
      name: "admin-page-category-new"
    }, {
      path: "page/new",
      component: _3779097a,
      name: "admin-page-new"
    }, {
      path: "blog-article/:id?",
      component: _ce8ddc60,
      name: "admin-blog-article-id"
    }, {
      path: "contact/:id",
      component: _483ccc61,
      name: "admin-contact-id"
    }, {
      path: "member-group/:id",
      component: _58185c91,
      name: "admin-member-group-id"
    }, {
      path: "member/:id",
      component: _1e55f91f,
      name: "admin-member-id"
    }, {
      path: "page-category/:id",
      component: _11fb3786,
      name: "admin-page-category-id"
    }, {
      path: "page/:id",
      component: _23c33494,
      name: "admin-page-id"
    }, {
      path: "survey-join/:id?",
      component: _bc0d2804,
      name: "admin-survey-join-id"
    }, {
      path: "*",
      component: _8a46f616,
      name: "admin-all"
    }]
  }, {
    path: "/blog",
    component: _1ae55b3f,
    name: "blog"
  }, {
    path: "/cahier-des-charges",
    component: _4667f21d,
    name: "cahier-des-charges"
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
    path: "/blog/:tag",
    component: _e524d704,
    name: "blog-tag"
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
