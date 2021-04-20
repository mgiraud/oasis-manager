exports.ids = [2];
exports.modules = {

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin.vue?vue&type=template&id=44d697a7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('Nuxt')],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/admin.vue?vue&type=template&id=44d697a7&

// EXTERNAL MODULE: external "vue-property-decorator"
var external_vue_property_decorator_ = __webpack_require__(35);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let adminvue_type_script_lang_ts_AdminLayout = class AdminLayout extends external_vue_property_decorator_["Vue"] {};
adminvue_type_script_lang_ts_AdminLayout = __decorate([Object(external_vue_property_decorator_["Component"])({
  layout: 'Admin',
  middleware: ['isAdmin']
})], adminvue_type_script_lang_ts_AdminLayout);
/* harmony default export */ var adminvue_type_script_lang_ts_ = (adminvue_type_script_lang_ts_AdminLayout);
// CONCATENATED MODULE: ./app/pages/admin.vue?vue&type=script&lang=ts&
 /* harmony default export */ var pages_adminvue_type_script_lang_ts_ = (adminvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(239);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(237);

// CONCATENATED MODULE: ./app/pages/admin.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_adminvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "5f5d8180"
  
)

/* harmony default export */ var admin = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=admin.js.map