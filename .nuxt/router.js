import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1dbbc172 = () => interopDefault(import('../app/pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _74cd64fb = () => interopDefault(import('../app/pages/admin/blog-article/index.vue' /* webpackChunkName: "pages/admin/blog-article/index" */))
const _39621f74 = () => interopDefault(import('../app/pages/admin/contact/index.vue' /* webpackChunkName: "pages/admin/contact/index" */))
const _77d55e36 = () => interopDefault(import('../app/pages/admin/contact-newsletter/index.vue' /* webpackChunkName: "pages/admin/contact-newsletter/index" */))
const _23436cf8 = () => interopDefault(import('../app/pages/admin/gallery/index.vue' /* webpackChunkName: "pages/admin/gallery/index" */))
const _36099eca = () => interopDefault(import('../app/pages/admin/member/index.vue' /* webpackChunkName: "pages/admin/member/index" */))
const _4cf5f908 = () => interopDefault(import('../app/pages/admin/member-group/index.vue' /* webpackChunkName: "pages/admin/member-group/index" */))
const _64ffac82 = () => interopDefault(import('../app/pages/admin/page/index.vue' /* webpackChunkName: "pages/admin/page/index" */))
const _3ecca362 = () => interopDefault(import('../app/pages/admin/page-category/index.vue' /* webpackChunkName: "pages/admin/page-category/index" */))
const _9675e3ba = () => interopDefault(import('../app/pages/admin/survey-join/index.vue' /* webpackChunkName: "pages/admin/survey-join/index" */))
const _348c3f09 = () => interopDefault(import('../app/pages/admin/blog-article/new.vue' /* webpackChunkName: "pages/admin/blog-article/new" */))
const _1828ec6c = () => interopDefault(import('../app/pages/admin/member-group/new.vue' /* webpackChunkName: "pages/admin/member-group/new" */))
const _e04abed0 = () => interopDefault(import('../app/pages/admin/member/new.vue' /* webpackChunkName: "pages/admin/member/new" */))
const _f37429a0 = () => interopDefault(import('../app/pages/admin/page-category/new.vue' /* webpackChunkName: "pages/admin/page-category/new" */))
const _51f164cd = () => interopDefault(import('../app/pages/admin/page/new.vue' /* webpackChunkName: "pages/admin/page/new" */))
const _20d66a23 = () => interopDefault(import('../app/pages/admin/blog-article/_id.vue' /* webpackChunkName: "pages/admin/blog-article/_id" */))
const _b76f67a4 = () => interopDefault(import('../app/pages/admin/contact/_id.vue' /* webpackChunkName: "pages/admin/contact/_id" */))
const _3f949638 = () => interopDefault(import('../app/pages/admin/member-group/_id.vue' /* webpackChunkName: "pages/admin/member-group/_id" */))
const _7c24cbb2 = () => interopDefault(import('../app/pages/admin/member/_id.vue' /* webpackChunkName: "pages/admin/member/_id" */))
const _7290164a = () => interopDefault(import('../app/pages/admin/page-category/_id.vue' /* webpackChunkName: "pages/admin/page-category/_id" */))
const _3e3b8fe7 = () => interopDefault(import('../app/pages/admin/page/_id.vue' /* webpackChunkName: "pages/admin/page/_id" */))
const _09763d4b = () => interopDefault(import('../app/pages/admin/survey-join/_id.vue' /* webpackChunkName: "pages/admin/survey-join/_id" */))
const _c3bc1dfc = () => interopDefault(import('../app/pages/admin/_.vue' /* webpackChunkName: "pages/admin/_" */))
const _32c34fdc = () => interopDefault(import('../app/pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _6bcc6bf0 = () => interopDefault(import('../app/pages/cahier-des-charges.vue' /* webpackChunkName: "pages/cahier-des-charges" */))
const _079109fa = () => interopDefault(import('../app/pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _9417dee8 = () => interopDefault(import('../app/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _573ff4de = () => interopDefault(import('../app/pages/mentions_legales.vue' /* webpackChunkName: "pages/mentions_legales" */))
const _7b60b0d2 = () => interopDefault(import('../app/pages/survey_join.vue' /* webpackChunkName: "pages/survey_join" */))
const _95ef9d6a = () => interopDefault(import('../app/pages/blog/_tag.vue' /* webpackChunkName: "pages/blog/_tag" */))
const _27672516 = () => interopDefault(import('../app/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _2badf402 = () => interopDefault(import('../app/pages/_.vue' /* webpackChunkName: "pages/_" */))

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
    component: _1dbbc172,
    name: "admin",
    children: [{
      path: "blog-article",
      component: _74cd64fb,
      name: "admin-blog-article"
    }, {
      path: "contact",
      component: _39621f74,
      name: "admin-contact"
    }, {
      path: "contact-newsletter",
      component: _77d55e36,
      name: "admin-contact-newsletter"
    }, {
      path: "gallery",
      component: _23436cf8,
      name: "admin-gallery"
    }, {
      path: "member",
      component: _36099eca,
      name: "admin-member"
    }, {
      path: "member-group",
      component: _4cf5f908,
      name: "admin-member-group"
    }, {
      path: "page",
      component: _64ffac82,
      name: "admin-page"
    }, {
      path: "page-category",
      component: _3ecca362,
      name: "admin-page-category"
    }, {
      path: "survey-join",
      component: _9675e3ba,
      name: "admin-survey-join"
    }, {
      path: "blog-article/new",
      component: _348c3f09,
      name: "admin-blog-article-new"
    }, {
      path: "member-group/new",
      component: _1828ec6c,
      name: "admin-member-group-new"
    }, {
      path: "member/new",
      component: _e04abed0,
      name: "admin-member-new"
    }, {
      path: "page-category/new",
      component: _f37429a0,
      name: "admin-page-category-new"
    }, {
      path: "page/new",
      component: _51f164cd,
      name: "admin-page-new"
    }, {
      path: "blog-article/:id?",
      component: _20d66a23,
      name: "admin-blog-article-id"
    }, {
      path: "contact/:id",
      component: _b76f67a4,
      name: "admin-contact-id"
    }, {
      path: "member-group/:id",
      component: _3f949638,
      name: "admin-member-group-id"
    }, {
      path: "member/:id",
      component: _7c24cbb2,
      name: "admin-member-id"
    }, {
      path: "page-category/:id",
      component: _7290164a,
      name: "admin-page-category-id"
    }, {
      path: "page/:id",
      component: _3e3b8fe7,
      name: "admin-page-id"
    }, {
      path: "survey-join/:id?",
      component: _09763d4b,
      name: "admin-survey-join-id"
    }, {
      path: "*",
      component: _c3bc1dfc,
      name: "admin-all"
    }]
  }, {
    path: "/blog",
    component: _32c34fdc,
    name: "blog"
  }, {
    path: "/cahier-des-charges",
    component: _6bcc6bf0,
    name: "cahier-des-charges"
  }, {
    path: "/contact",
    component: _079109fa,
    name: "contact"
  }, {
    path: "/login",
    component: _9417dee8,
    name: "login"
  }, {
    path: "/mentions_legales",
    component: _573ff4de,
    name: "mentions_legales"
  }, {
    path: "/survey_join",
    component: _7b60b0d2,
    name: "survey_join"
  }, {
    path: "/blog/:tag",
    component: _95ef9d6a,
    name: "blog-tag"
  }, {
    path: "/",
    component: _27672516,
    name: "index"
  }, {
    path: "/*",
    component: _2badf402,
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
