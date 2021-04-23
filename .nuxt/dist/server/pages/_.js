exports.ids = [1];
exports.modules = {

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/page/Template.vue?vue&type=template&id=31d1a6a0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-card-title',{staticClass:"primary--text text--darken-4"},[_vm._v("\n    "+_vm._s(_vm._f("capitalize")(_vm.page.title))+"\n  ")]),_vm._ssrNode(" "),_c('v-card-text',{domProps:{"innerHTML":_vm._s(_vm.page.content)}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/page/Template.vue?vue&type=template&id=31d1a6a0&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/page/Template.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let Templatevue_type_script_lang_ts_Tempate = class Tempate extends external_nuxt_property_decorator_["Vue"] {};

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: true
})], Templatevue_type_script_lang_ts_Tempate.prototype, "page", void 0);

Templatevue_type_script_lang_ts_Tempate = __decorate([external_nuxt_property_decorator_["Component"]], Templatevue_type_script_lang_ts_Tempate);
/* harmony default export */ var Templatevue_type_script_lang_ts_ = (Templatevue_type_script_lang_ts_Tempate);
// CONCATENATED MODULE: ./app/components/page/Template.vue?vue&type=script&lang=ts&
 /* harmony default export */ var page_Templatevue_type_script_lang_ts_ = (Templatevue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var VCard = __webpack_require__(58);

// CONCATENATED MODULE: ./app/components/page/Template.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  page_Templatevue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "751b31d5"
  
)

/* harmony default export */ var Template = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */



installComponents_default()(component, {VCardText: VCard["b" /* VCardText */],VCardTitle: VCard["c" /* VCardTitle */]})


/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/_.vue?vue&type=template&id=fce2bb72&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"fill-height ma-md-10",attrs:{"elevation":"5"}},[_c('v-container',{attrs:{"fluid":""}},[_c('v-row',[_c('v-col',[(_vm.page)?_c('Template',{attrs:{"page":_vm.page}}):_c('Error404')],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/_.vue?vue&type=template&id=fce2bb72&

// EXTERNAL MODULE: external "vue-property-decorator"
var external_vue_property_decorator_ = __webpack_require__(35);

// EXTERNAL MODULE: external "vuex-class"
var external_vuex_class_ = __webpack_require__(60);

// EXTERNAL MODULE: ./app/components/page/Template.vue + 4 modules
var Template = __webpack_require__(334);

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
var VMain = __webpack_require__(238);

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
  "1b9fac6c"
  
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
    Template: Template["a" /* default */],
    Error404: _404
  }
})], _vue_type_script_lang_ts_BackUpVue);
/* harmony default export */ var _vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_BackUpVue);
// CONCATENATED MODULE: ./app/pages/_.vue?vue&type=script&lang=ts&
 /* harmony default export */ var pages_vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(240);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(243);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(241);

// CONCATENATED MODULE: ./app/pages/_.vue





/* normalize component */

var _component = Object(componentNormalizer["a" /* default */])(
  pages_vue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "435deb10"
  
)

/* harmony default export */ var _ = __webpack_exports__["default"] = (_component.exports);

/* vuetify-loader */





installComponents_default()(_component, {VCard: VCard["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=_.js.map