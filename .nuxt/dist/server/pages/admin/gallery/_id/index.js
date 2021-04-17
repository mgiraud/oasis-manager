exports.ids = [4];
exports.modules = {

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/admin/gallery/ItemBreadcrumb.vue?vue&type=template&id=63021800&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-row',_vm._l((_vm.breadcrumb),function(step,index){return _c('span',{key:step.id + step.name},[(index === 0 && _vm.breadcrumb.length > 1)?_c('nuxt-link',{attrs:{"to":("/admin/gallery/" + (step.id))}},[_vm._v(_vm._s(step.name))]):(index === 0 && _vm.breadcrumb.length === 1)?_c('span',[_vm._v(_vm._s(step.name))]):(index > 0 && _vm.breadcrumb.length - 1 > index)?_c('nuxt-link',{attrs:{"to":("/admin/gallery/folders/" + (step.id))}},[_vm._v(_vm._s(step.name))]):_c('span',[_vm._v(_vm._s(step.name))]),_vm._v(" "),(index < _vm.breadcrumb.length - 1)?_c('span',[_vm._v(" > ")]):_vm._e()],1)}),0)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/admin/gallery/ItemBreadcrumb.vue?vue&type=template&id=63021800&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./app/components/admin/gallery/ItemBreadcrumb.vue?vue&type=script&lang=js&
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
/* harmony default export */ var ItemBreadcrumbvue_type_script_lang_js_ = ({
  props: {
    breadcrumb: {
      type: Array,
      default: () => []
    }
  }
});
// CONCATENATED MODULE: ./app/components/admin/gallery/ItemBreadcrumb.vue?vue&type=script&lang=js&
 /* harmony default export */ var gallery_ItemBreadcrumbvue_type_script_lang_js_ = (ItemBreadcrumbvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(233);

// CONCATENATED MODULE: ./app/components/admin/gallery/ItemBreadcrumb.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  gallery_ItemBreadcrumbvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "51313570"
  
)

/* harmony default export */ var ItemBreadcrumb = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */


installComponents_default()(component, {VRow: VRow["a" /* default */]})


/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/gallery/_id/index.vue?vue&type=template&id=983f6cec&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-row',[_c('v-container',[(_vm.selectedGalleryItem)?_c('ItemBreadcrumb',{attrs:{"breadcrumb":_vm.selectedGalleryItem.breadcrumb}}):_vm._e(),_vm._v(" "),_c('v-row',_vm._l((_vm.getMediaObjectsForSelectedGalleryItem),function(mediaObject){return _c('v-col',{key:mediaObject['@id']},[_vm._v("\n        "+_vm._s(mediaObject['@id'])+"\n        "),_c('v-img',{attrs:{"src":mediaObject.contentUrl}})],1)}),1),_vm._v(" "),_c('v-row',_vm._l((_vm.selectedGalleryItem.children),function(child){return _c('v-col',{key:child['@id']},[_c('nuxt-link',{attrs:{"to":("folders/" + (child.id))}},[_vm._v("\n          "+_vm._s(child.name)+"\n        ")])],1)}),1),_vm._v(" "),_c('v-row',[_c('AdminGalleryFileUploadForm')],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/admin/gallery/_id/index.vue?vue&type=template&id=983f6cec&

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(41);

// EXTERNAL MODULE: ./app/components/admin/gallery/ItemBreadcrumb.vue + 4 modules
var ItemBreadcrumb = __webpack_require__(329);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/gallery/_id/index.vue?vue&type=script&lang=js&
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
//
//
//
//
//
//
//
//
//


/* harmony default export */ var _idvue_type_script_lang_js_ = ({
  components: {
    ItemBreadcrumb: ItemBreadcrumb["a" /* default */]
  },
  layout: 'Admin',
  middleware: 'authenticated',
  fetchOnServer: false,

  async validate({
    store
  }) {
    const hasGalleries = store.state.gallery.galleries !== null;

    if (hasGalleries) {
      return true;
    }

    await store.dispatch('gallery/fetchAll');
    return true;
  },

  async fetch({
    store,
    params
  }) {
    await store.dispatch('gallery/setSelectedItemFromGalleryId', params.id);
    await store.dispatch('gallery/getMediaObjectForGalleryItemId', store.state.gallery.selectedGalleryItem.id);
  },

  computed: { ...Object(external_vuex_["mapGetters"])('gallery', ['getMediaObjectsForSelectedGalleryItem' // -> this.someGetter
    ]),
    ...Object(external_vuex_["mapState"])('gallery', ['selectedGalleryItem'])
  }
});
// CONCATENATED MODULE: ./app/pages/admin/gallery/_id/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var gallery_idvue_type_script_lang_js_ = (_idvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(232);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(235);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js + 2 modules
var VImg = __webpack_require__(56);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(233);

// CONCATENATED MODULE: ./app/pages/admin/gallery/_id/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  gallery_idvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "779f371e"
  
)

/* harmony default export */ var _id = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */





installComponents_default()(component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VImg: VImg["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=index.js.map