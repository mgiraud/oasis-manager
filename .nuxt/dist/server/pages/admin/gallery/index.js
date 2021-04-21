exports.ids = [9];
exports.modules = {

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/gallery/index.vue?vue&type=template&id=c3f20ace&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',_vm._l((_vm.galleries),function(gallery){return _c('div',{key:gallery.id},[_c('nuxt-link',{attrs:{"to":("/admin/gallery/" + (gallery.id))}},[_vm._v("\n        "+_vm._s(gallery.name)+"\n      ")])],1)}),0),_vm._v(" "),_c('v-row',[(!!_vm.$route.params.id)?_c('nuxt-child'):_vm._e()],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/admin/gallery/index.vue?vue&type=template&id=c3f20ace&

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(41);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/gallery/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var galleryvue_type_script_lang_js_ = ({
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_GALLERIES']
  },

  async fetch({
    store
  }) {
    await store.dispatch('gallery/fetchAll');
  },

  computed: { ...Object(external_vuex_["mapGetters"])('gallery', {
      galleries: 'list'
    })
  }
});
// CONCATENATED MODULE: ./app/pages/admin/gallery/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var admin_galleryvue_type_script_lang_js_ = (galleryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(239);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(237);

// CONCATENATED MODULE: ./app/pages/admin/gallery/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  admin_galleryvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "1e5606f4"
  
)

/* harmony default export */ var gallery = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */



installComponents_default()(component, {VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=index.js.map