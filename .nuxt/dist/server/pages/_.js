exports.ids = [1];
exports.modules = {

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);



 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];
const ALIGNMENT = ['start', 'end', 'center'];

function makeProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* upperFirst */ "F"])(val)] = def();
    return props;
  }, {});
}

const alignValidator = str => [...ALIGNMENT, 'baseline', 'stretch'].includes(str);

const alignProps = makeProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));

const justifyValidator = str => [...ALIGNMENT, 'space-between', 'space-around'].includes(str);

const justifyProps = makeProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));

const alignContentValidator = str => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str);

const alignContentProps = makeProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content'
};

function breakpointClass(type, prop, val) {
  let className = classMap[type];

  if (val == null) {
    return undefined;
  }

  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // .align-items-sm-center


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
  name: 'v-row',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps
  },

  render(h, {
    props,
    data,
    children
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `align`, `justify`, `alignContent` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      classList.push({
        'no-gutters': props.noGutters,
        'row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(data, {
      staticClass: 'row',
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);



 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['offset' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* upperFirst */ "F"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['order' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* upperFirst */ "F"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};

function breakpointClass(type, prop, val) {
  let className = type;

  if (val == null || val === false) {
    return undefined;
  }

  if (prop) {
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
  name: 'v-col',
  functional: true,
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: str => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  render(h, {
    props,
    data,
    children,
    parent
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `col`, `offset`, `order` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      const hasColClasses = classList.some(className => className.startsWith('col-'));
      classList.push({
        // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
        col: !hasColClasses || !props.cols,
        [`col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(data, {
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/_.vue?vue&type=template&id=783721e6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"fill-height ma-md-10",attrs:{"elevation":"5"}},[_c('v-container',{attrs:{"fluid":""}},[_c('v-row',[_c('v-col',[(_vm.page)?_c('Template',{attrs:{"page":_vm.page}}):_c('Error404')],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/_.vue?vue&type=template&id=783721e6&

// EXTERNAL MODULE: external "vue-property-decorator"
var external_vue_property_decorator_ = __webpack_require__(35);

// EXTERNAL MODULE: external "vuex-class"
var external_vuex_class_ = __webpack_require__(58);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/page/Template.vue?vue&type=template&id=31d1a6a0&
var Templatevue_type_template_id_31d1a6a0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-card-title',{staticClass:"primary--text text--darken-4"},[_vm._v("\n    "+_vm._s(_vm._f("capitalize")(_vm.page.title))+"\n  ")]),_vm._ssrNode(" "),_c('v-card-text',{domProps:{"innerHTML":_vm._s(_vm.page.content)}})],2)}
var Templatevue_type_template_id_31d1a6a0_staticRenderFns = []


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
var componentNormalizer = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var VCard = __webpack_require__(56);

// CONCATENATED MODULE: ./app/components/page/Template.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  page_Templatevue_type_script_lang_ts_,
  Templatevue_type_template_id_31d1a6a0_render,
  Templatevue_type_template_id_31d1a6a0_staticRenderFns,
  false,
  null,
  null,
  "0ef374ed"
  
)

/* harmony default export */ var Template = (component.exports);

/* vuetify-loader */



installComponents_default()(component, {VCardText: VCard["b" /* VCardText */],VCardTitle: VCard["c" /* VCardTitle */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/error/404.vue?vue&type=template&id=25d59706&
var _404vue_type_template_id_25d59706_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-main',[_vm._v("\n  404\n")])}
var _404vue_type_template_id_25d59706_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/error/404.vue?vue&type=template&id=25d59706&

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VMain/VMain.js
var VMain = __webpack_require__(229);

// CONCATENATED MODULE: ./app/components/error/404.vue

var script = {}


/* normalize component */

var _404_component = Object(componentNormalizer["a" /* default */])(
  script,
  _404vue_type_template_id_25d59706_render,
  _404vue_type_template_id_25d59706_staticRenderFns,
  false,
  null,
  null,
  "4f853b84"
  
)

/* harmony default export */ var _404 = (_404_component.exports);

/* vuetify-loader */


installComponents_default()(_404_component, {VMain: VMain["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/_.vue?vue&type=script&lang=ts&
var _vue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const pageModule = Object(external_vuex_class_["namespace"])('page');
let _vue_type_script_lang_ts_BackUpVue = class BackUpVue extends external_vue_property_decorator_["Vue"] {
  get page() {
    if (this.url !== null) {
      return this.find('/api/pages/' + decodeURIComponent(this.url));
    }
  }

  get url() {
    return this.$route.params ? this.$route.params.pathMatch : null;
  }

};

_vue_type_script_lang_ts_decorate([pageModule.Getter('find')], _vue_type_script_lang_ts_BackUpVue.prototype, "find", void 0);

_vue_type_script_lang_ts_BackUpVue = _vue_type_script_lang_ts_decorate([Object(external_vue_property_decorator_["Component"])({
  components: {
    Template: Template,
    Error404: _404
  }
})], _vue_type_script_lang_ts_BackUpVue);
/* harmony default export */ var _vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_BackUpVue);
// CONCATENATED MODULE: ./app/pages/_.vue?vue&type=script&lang=ts&
 /* harmony default export */ var pages_vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard_VCard = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(232);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(249);

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





installComponents_default()(_component, {VCard: VCard_VCard["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=_.js.map