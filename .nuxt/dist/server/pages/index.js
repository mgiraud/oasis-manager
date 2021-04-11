exports.ids = [20];
exports.modules = {

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/page/Template.vue?vue&type=template&id=31d1a6a0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-card-title',{staticClass:"primary--text text--darken-4"},[_vm._v("\n    "+_vm._s(_vm._f("capitalize")(_vm.page.title))+"\n  ")]),_vm._ssrNode(" "),_c('v-card-text',{domProps:{"innerHTML":_vm._s(_vm.page.content)}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/page/Template.vue?vue&type=template&id=31d1a6a0&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(8);

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
var VCard = __webpack_require__(57);

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

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/index.vue?vue&type=template&id=feb794de&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('v-card',[_c('v-card-title',[_vm._v("Bienvenue chez les transalpins !")]),_vm._v(" "),(_vm.page)?_c('Template',{attrs:{"page":_vm.page}}):_c('v-card-text',[_vm._v("\n          Tu peux retrouver sur ce site toutes les informations relatives au projet de création d'un habitat partagé\n        ")])],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/index.vue?vue&type=template&id=feb794de&

// EXTERNAL MODULE: external "vue-property-decorator"
var external_vue_property_decorator_ = __webpack_require__(35);

// EXTERNAL MODULE: external "vuex-class"
var external_vuex_class_ = __webpack_require__(59);

// EXTERNAL MODULE: ./app/components/page/Template.vue + 4 modules
var Template = __webpack_require__(300);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/index.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const securityModule = Object(external_vuex_class_["namespace"])('security');
const pageModule = Object(external_vuex_class_["namespace"])('page');
let pagesvue_type_script_lang_ts_IndexVue = class IndexVue extends external_vue_property_decorator_["Vue"] {
  get page() {
    return this.find('/api/pages/home');
  }

};

__decorate([securityModule.Action('logout')], pagesvue_type_script_lang_ts_IndexVue.prototype, "logout", void 0);

__decorate([pageModule.Getter('find')], pagesvue_type_script_lang_ts_IndexVue.prototype, "find", void 0);

pagesvue_type_script_lang_ts_IndexVue = __decorate([Object(external_vue_property_decorator_["Component"])({
  components: {
    Template: Template["a" /* default */]
  }
})], pagesvue_type_script_lang_ts_IndexVue);
/* harmony default export */ var pagesvue_type_script_lang_ts_ = (pagesvue_type_script_lang_ts_IndexVue);
// CONCATENATED MODULE: ./app/pages/index.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_pagesvue_type_script_lang_ts_ = (pagesvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(57);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(232);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(235);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(233);

// CONCATENATED MODULE: ./app/pages/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_pagesvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "2dee2d83"
  
)

/* harmony default export */ var pages = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */







installComponents_default()(component, {VCard: VCard["a" /* default */],VCardText: components_VCard["b" /* VCardText */],VCardTitle: components_VCard["c" /* VCardTitle */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=index.js.map