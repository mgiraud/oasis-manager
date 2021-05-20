exports.ids = [1];
exports.modules = {

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(339);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("47100f64", content, true, context)
};

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_271f25df_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(312);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_271f25df_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_271f25df_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_271f25df_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_271f25df_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".page-title[data-v-271f25df]{font-family:\"Permanent Marker\"}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/page/PageModel.vue?vue&type=template&id=271f25df&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-card-title',{staticClass:"primary--text text--darken-4 page-title"},[_vm._v("\n    "+_vm._s(_vm._f("capitalize")(_vm.page.title))+"\n  ")]),_vm._ssrNode(" "),_c('v-card-text',{domProps:{"innerHTML":_vm._s(_vm.page.content)}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/page/PageModel.vue?vue&type=template&id=271f25df&scoped=true&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/page/PageModel.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let PageModelvue_type_script_lang_ts_PageModel = class PageModel extends external_nuxt_property_decorator_["Vue"] {};

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: true
})], PageModelvue_type_script_lang_ts_PageModel.prototype, "page", void 0);

PageModelvue_type_script_lang_ts_PageModel = __decorate([external_nuxt_property_decorator_["Component"]], PageModelvue_type_script_lang_ts_PageModel);
/* harmony default export */ var PageModelvue_type_script_lang_ts_ = (PageModelvue_type_script_lang_ts_PageModel);
// CONCATENATED MODULE: ./app/components/page/PageModel.vue?vue&type=script&lang=ts&
 /* harmony default export */ var page_PageModelvue_type_script_lang_ts_ = (PageModelvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var VCard = __webpack_require__(57);

// CONCATENATED MODULE: ./app/components/page/PageModel.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(338)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  page_PageModelvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "271f25df",
  "6910b7f7"
  
)

/* harmony default export */ var page_PageModel = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */



installComponents_default()(component, {VCardText: VCard["b" /* VCardText */],VCardTitle: VCard["c" /* VCardTitle */]})


/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/_.vue?vue&type=template&id=112b2dd3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"fill-height ma-md-10",attrs:{"elevation":"5"}},[_c('v-container',{attrs:{"fluid":""}},[_c('v-row',[_c('v-col',[(_vm.page)?_c('PageModel',{attrs:{"page":_vm.page}}):_c('Error404')],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/_.vue?vue&type=template&id=112b2dd3&

// EXTERNAL MODULE: external "vue-property-decorator"
var external_vue_property_decorator_ = __webpack_require__(35);

// EXTERNAL MODULE: external "vuex-class"
var external_vuex_class_ = __webpack_require__(59);

// EXTERNAL MODULE: ./app/components/page/PageModel.vue + 4 modules
var PageModel = __webpack_require__(341);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/error/404.vue?vue&type=template&id=25d59706&
var _404vue_type_template_id_25d59706_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-main',[_vm._v("\n  404\n")])}
var _404vue_type_template_id_25d59706_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/error/404.vue?vue&type=template&id=25d59706&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VMain/VMain.js
var VMain = __webpack_require__(236);

// CONCATENATED MODULE: ./app/components/error/404.vue

var script = {}


/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  _404vue_type_template_id_25d59706_render,
  _404vue_type_template_id_25d59706_staticRenderFns,
  false,
  null,
  null,
  "4f853b84"
  
)

/* harmony default export */ var _404 = (component.exports);

/* vuetify-loader */


installComponents_default()(component, {VMain: VMain["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/_.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const pageModule = Object(external_vuex_class_["namespace"])('page');
let _vue_type_script_lang_ts_BackUpVue = class BackUpVue extends external_vue_property_decorator_["Vue"] {
  head() {
    return {
      title: this.page ? this.page.title : 'Le vide intersidédral'
    };
  }

  get page() {
    if (this.url !== null) {
      return this.find('/api/pages/' + decodeURIComponent(this.url));
    }
  }

  get url() {
    return this.$route.params ? this.$route.params.pathMatch : null;
  }

};

__decorate([pageModule.Getter('find')], _vue_type_script_lang_ts_BackUpVue.prototype, "find", void 0);

_vue_type_script_lang_ts_BackUpVue = __decorate([Object(external_vue_property_decorator_["Component"])({
  components: {
    PageModel: PageModel["a" /* default */],
    Error404: _404
  }
})], _vue_type_script_lang_ts_BackUpVue);
/* harmony default export */ var _vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_BackUpVue);
// CONCATENATED MODULE: ./app/pages/_.vue?vue&type=script&lang=ts&
 /* harmony default export */ var pages_vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(238);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(241);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(239);

// CONCATENATED MODULE: ./app/pages/_.vue





/* normalize component */

var _component = Object(componentNormalizer["a" /* default */])(
  pages_vue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "7f25b4f8"
  
)

/* harmony default export */ var _ = __webpack_exports__["default"] = (_component.exports);

/* vuetify-loader */





installComponents_default()(_component, {VCard: VCard["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=_.js.map