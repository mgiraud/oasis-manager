exports.ids = [1];
exports.modules = {

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(343);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("f189ec0e", content, true, context)
};

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/ImagePreview.vue?vue&type=template&id=3814f22d&
var ImagePreviewvue_type_template_id_3814f22d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.images.length > 1)?_vm._ssrNode("<section>","</section>",[_c('v-carousel',{attrs:{"height":_vm.size}},_vm._l((_vm.images),function(image,i){return _c('v-carousel-item',{key:i,attrs:{"reverse-transition":"fade-transition","transition":"fade-transition"}},[_c('v-img',{attrs:{"src":image.contentUrl,"contain":"","max-height":_vm.size}})],1)}),1)],1):_vm._e(),_vm._ssrNode(" "),(_vm.images.length === 1)?_vm._ssrNode("<section>","</section>",[_c('v-img',{attrs:{"src":_vm.images[0].contentUrl,"contain":"","max-height":_vm.size}})],1):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/ImagePreview.vue?vue&type=template&id=3814f22d&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/ImagePreview.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let ImagePreviewvue_type_script_lang_ts_ImagePreview = class ImagePreview extends external_nuxt_property_decorator_["Vue"] {
  constructor() {
    super(...arguments);
    this.size = '250px';
  }

  get images() {
    return this.mediaObjects.filter(mediaObject => mediaObject.isImage);
  }

};

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Array,
  required: true
})], ImagePreviewvue_type_script_lang_ts_ImagePreview.prototype, "mediaObjects", void 0);

ImagePreviewvue_type_script_lang_ts_ImagePreview = __decorate([external_nuxt_property_decorator_["Component"]], ImagePreviewvue_type_script_lang_ts_ImagePreview);
/* harmony default export */ var ImagePreviewvue_type_script_lang_ts_ = (ImagePreviewvue_type_script_lang_ts_ImagePreview);
// CONCATENATED MODULE: ./app/components/util/ImagePreview.vue?vue&type=script&lang=ts&
 /* harmony default export */ var util_ImagePreviewvue_type_script_lang_ts_ = (ImagePreviewvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VCarousel/VCarousel.sass
var VCarousel = __webpack_require__(340);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VWindow/VWindow.js
var VWindow = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/index.js
var VBtn = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/index.js
var VIcon = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressLinear/index.js + 1 modules
var VProgressLinear = __webpack_require__(85);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VItemGroup/VItemGroup.js
var VItemGroup = __webpack_require__(20);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/button-group/index.js
// Extensions

/* @vue/component */

/* harmony default export */ var button_group = (VItemGroup["a" /* BaseItemGroup */].extend({
  name: 'button-group',

  provide() {
    return {
      btnToggle: this
    };
  },

  computed: {
    classes() {
      return VItemGroup["a" /* BaseItemGroup */].options.computed.classes.call(this);
    }

  },
  methods: {
    // Isn't being passed down through types
    genData: VItemGroup["a" /* BaseItemGroup */].options.methods.genData
  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var console = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VCarousel/VCarousel.js
// Styles
 // Extensions

 // Components



 // Mixins
// TODO: Move this into core components v2.0

 // Utilities



/* harmony default export */ var VCarousel_VCarousel = (VWindow["a" /* default */].extend({
  name: 'v-carousel',
  props: {
    continuous: {
      type: Boolean,
      default: true
    },
    cycle: Boolean,
    delimiterIcon: {
      type: String,
      default: '$delimiter'
    },
    height: {
      type: [Number, String],
      default: 500
    },
    hideDelimiters: Boolean,
    hideDelimiterBackground: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: value => value > 0
    },
    mandatory: {
      type: Boolean,
      default: true
    },
    progress: Boolean,
    progressColor: String,
    showArrows: {
      type: Boolean,
      default: true
    },
    verticalDelimiters: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      internalHeight: this.height,
      slideTimeout: undefined
    };
  },

  computed: {
    classes() {
      return { ...VWindow["a" /* default */].options.computed.classes.call(this),
        'v-carousel': true,
        'v-carousel--hide-delimiter-background': this.hideDelimiterBackground,
        'v-carousel--vertical-delimiters': this.isVertical
      };
    },

    isDark() {
      return this.dark || !this.light;
    },

    isVertical() {
      return this.verticalDelimiters != null;
    }

  },
  watch: {
    internalValue: 'restartTimeout',
    interval: 'restartTimeout',

    height(val, oldVal) {
      if (val === oldVal || !val) return;
      this.internalHeight = val;
    },

    cycle(val) {
      if (val) {
        this.restartTimeout();
      } else {
        clearTimeout(this.slideTimeout);
        this.slideTimeout = undefined;
      }
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('hide-controls')) {
      Object(console["a" /* breaking */])('hide-controls', ':show-arrows="false"', this);
    }
  },

  mounted() {
    this.startTimeout();
  },

  methods: {
    genControlIcons() {
      if (this.isVertical) return null;
      return VWindow["a" /* default */].options.methods.genControlIcons.call(this);
    },

    genDelimiters() {
      return this.$createElement('div', {
        staticClass: 'v-carousel__controls',
        style: {
          left: this.verticalDelimiters === 'left' && this.isVertical ? 0 : 'auto',
          right: this.verticalDelimiters === 'right' ? 0 : 'auto'
        }
      }, [this.genItems()]);
    },

    genItems() {
      const length = this.items.length;
      const children = [];

      for (let i = 0; i < length; i++) {
        const child = this.$createElement(VBtn["a" /* default */], {
          staticClass: 'v-carousel__controls__item',
          attrs: {
            'aria-label': this.$vuetify.lang.t('$vuetify.carousel.ariaLabel.delimiter', i + 1, length)
          },
          props: {
            icon: true,
            small: true,
            value: this.getValue(this.items[i], i)
          }
        }, [this.$createElement(VIcon["a" /* default */], {
          props: {
            size: 18
          }
        }, this.delimiterIcon)]);
        children.push(child);
      }

      return this.$createElement(button_group, {
        props: {
          value: this.internalValue,
          mandatory: this.mandatory
        },
        on: {
          change: val => {
            this.internalValue = val;
          }
        }
      }, children);
    },

    genProgress() {
      return this.$createElement(VProgressLinear["a" /* default */], {
        staticClass: 'v-carousel__progress',
        props: {
          color: this.progressColor,
          value: (this.internalIndex + 1) / this.items.length * 100
        }
      });
    },

    restartTimeout() {
      this.slideTimeout && clearTimeout(this.slideTimeout);
      this.slideTimeout = undefined;
      window.requestAnimationFrame(this.startTimeout);
    },

    startTimeout() {
      if (!this.cycle) return;
      this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000);
    }

  },

  render(h) {
    const render = VWindow["a" /* default */].options.render.call(this, h);
    render.data.style = `height: ${Object(helpers["h" /* convertToUnit */])(this.height)};`;
    /* istanbul ignore else */

    if (!this.hideDelimiters) {
      render.children.push(this.genDelimiters());
    }
    /* istanbul ignore else */


    if (this.progress || this.progressColor) {
      render.children.push(this.genProgress());
    }

    return render;
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/bootable/index.js
var bootable = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/groupable/index.js
var groupable = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/directives/touch/index.js
var touch = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VWindow/VWindowItem.js
// Mixins

 // Directives

 // Utilities



const baseMixins = Object(mixins["a" /* default */])(bootable["a" /* default */], Object(groupable["a" /* factory */])('windowGroup', 'v-window-item', 'v-window'));
/* harmony default export */ var VWindowItem = (baseMixins.extend().extend().extend({
  name: 'v-window-item',
  directives: {
    Touch: touch["a" /* default */]
  },
  props: {
    disabled: Boolean,
    reverseTransition: {
      type: [Boolean, String],
      default: undefined
    },
    transition: {
      type: [Boolean, String],
      default: undefined
    },
    value: {
      required: false
    }
  },

  data() {
    return {
      isActive: false,
      inTransition: false
    };
  },

  computed: {
    classes() {
      return this.groupClasses;
    },

    computedTransition() {
      if (!this.windowGroup.internalReverse) {
        return typeof this.transition !== 'undefined' ? this.transition || '' : this.windowGroup.computedTransition;
      }

      return typeof this.reverseTransition !== 'undefined' ? this.reverseTransition || '' : this.windowGroup.computedTransition;
    }

  },
  methods: {
    genDefaultSlot() {
      return this.$slots.default;
    },

    genWindowItem() {
      return this.$createElement('div', {
        staticClass: 'v-window-item',
        class: this.classes,
        directives: [{
          name: 'show',
          value: this.isActive
        }],
        on: this.$listeners
      }, this.genDefaultSlot());
    },

    onAfterTransition() {
      if (!this.inTransition) {
        return;
      } // Finalize transition state.


      this.inTransition = false;

      if (this.windowGroup.transitionCount > 0) {
        this.windowGroup.transitionCount--; // Remove container height if we are out of transition.

        if (this.windowGroup.transitionCount === 0) {
          this.windowGroup.transitionHeight = undefined;
        }
      }
    },

    onBeforeTransition() {
      if (this.inTransition) {
        return;
      } // Initialize transition state here.


      this.inTransition = true;

      if (this.windowGroup.transitionCount === 0) {
        // Set initial height for height transition.
        this.windowGroup.transitionHeight = Object(helpers["h" /* convertToUnit */])(this.windowGroup.$el.clientHeight);
      }

      this.windowGroup.transitionCount++;
    },

    onTransitionCancelled() {
      this.onAfterTransition(); // This should have the same path as normal transition end.
    },

    onEnter(el) {
      if (!this.inTransition) {
        return;
      }

      this.$nextTick(() => {
        // Do not set height if no transition or cancelled.
        if (!this.computedTransition || !this.inTransition) {
          return;
        } // Set transition target height.


        this.windowGroup.transitionHeight = Object(helpers["h" /* convertToUnit */])(el.clientHeight);
      });
    }

  },

  render(h) {
    return h('transition', {
      props: {
        name: this.computedTransition
      },
      on: {
        // Handlers for enter windows.
        beforeEnter: this.onBeforeTransition,
        afterEnter: this.onAfterTransition,
        enterCancelled: this.onTransitionCancelled,
        // Handlers for leave windows.
        beforeLeave: this.onBeforeTransition,
        afterLeave: this.onAfterTransition,
        leaveCancelled: this.onTransitionCancelled,
        // Enter handler for height transition.
        enter: this.onEnter
      }
    }, this.showLazyContent(() => [this.genWindowItem()]));
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js + 2 modules
var VImg = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/routable/index.js
var routable = __webpack_require__(17);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VCarousel/VCarouselItem.js
// Extensions
 // Components

 // Utilities



 // Types

const VCarouselItem_baseMixins = Object(mixins["a" /* default */])(VWindowItem, routable["a" /* default */]);
/* @vue/component */

/* harmony default export */ var VCarouselItem = (VCarouselItem_baseMixins.extend({
  name: 'v-carousel-item',
  inheritAttrs: false,
  methods: {
    genDefaultSlot() {
      return [this.$createElement(VImg["a" /* default */], {
        staticClass: 'v-carousel__item',
        props: { ...this.$attrs,
          height: this.windowGroup.internalHeight
        },
        on: this.$listeners,
        scopedSlots: {
          placeholder: this.$scopedSlots.placeholder
        }
      }, Object(helpers["t" /* getSlot */])(this))];
    },

    genWindowItem() {
      const {
        tag,
        data
      } = this.generateRouteLink();
      data.staticClass = 'v-window-item';
      data.directives.push({
        name: 'show',
        value: this.isActive
      });
      return this.$createElement(tag, data, this.genDefaultSlot());
    }

  }
}));
// CONCATENATED MODULE: ./app/components/util/ImagePreview.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  util_ImagePreviewvue_type_script_lang_ts_,
  ImagePreviewvue_type_template_id_3814f22d_render,
  staticRenderFns,
  false,
  null,
  null,
  "29882735"
  
)

/* harmony default export */ var util_ImagePreview = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VCarousel: VCarousel_VCarousel,VCarouselItem: VCarouselItem,VImg: VImg["a" /* default */]})


/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(341);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(5).default("2d62e390", content, true)

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-carousel{overflow:hidden;position:relative;width:100%}.v-carousel__controls{align-items:center;background:rgba(0,0,0,.3);bottom:0;display:flex;height:50px;justify-content:center;list-style-type:none;position:absolute;width:100%;z-index:1}.v-carousel__controls>.v-item-group{flex:0 1 auto}.v-carousel__controls__item{margin:0 8px}.v-carousel__controls__item .v-icon{opacity:.5}.v-carousel__controls__item--active .v-icon{opacity:1;vertical-align:middle}.v-carousel__controls__item:hover{background:none}.v-carousel__controls__item:hover .v-icon{opacity:.8}.v-carousel__progress{margin:0;position:absolute;bottom:0;left:0;right:0}.v-carousel .v-window-item{display:block;height:inherit;text-decoration:none}.v-carousel--hide-delimiter-background .v-carousel__controls{background:transparent}.v-carousel--vertical-delimiters .v-carousel__controls{height:100%!important;width:50px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_1f8253fc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(325);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_1f8253fc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_1f8253fc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_1f8253fc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PageModel_vue_vue_type_style_index_0_id_1f8253fc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".page-title[data-v-1f8253fc]{font-family:\"Permanent Marker\",serif}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/page/PageModel.vue?vue&type=template&id=1f8253fc&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-card-title',{staticClass:"primary--text text--darken-4 page-title"},[_vm._v("\n    "+_vm._s(_vm._f("capitalize")(_vm.page.title))+"\n  ")]),_vm._ssrNode(" "),_c('v-card-text',{domProps:{"innerHTML":_vm._s(_vm.page.content)}}),_vm._ssrNode(" "),(_vm.page.mediaNode)?_c('image-preview',{attrs:{"media-objects":_vm.page.mediaNode.mediaObjects}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/page/PageModel.vue?vue&type=template&id=1f8253fc&scoped=true&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// EXTERNAL MODULE: ./app/components/util/ImagePreview.vue + 8 modules
var ImagePreview = __webpack_require__(335);

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

PageModelvue_type_script_lang_ts_PageModel = __decorate([Object(external_nuxt_property_decorator_["Component"])({
  components: {
    ImagePreview: ImagePreview["a" /* default */]
  }
})], PageModelvue_type_script_lang_ts_PageModel);
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
  
  var style0 = __webpack_require__(342)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  page_PageModelvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "1f8253fc",
  "703ecfe2"
  
)

/* harmony default export */ var page_PageModel = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */



installComponents_default()(component, {VCardText: VCard["b" /* VCardText */],VCardTitle: VCard["c" /* VCardTitle */]})


/***/ }),

/***/ 403:
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
var PageModel = __webpack_require__(345);

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
    PageModel: PageModel["a" /* default */],
    Error404: _404
  }
})], _vue_type_script_lang_ts_BackUpVue);
/* harmony default export */ var _vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_BackUpVue);
// CONCATENATED MODULE: ./app/pages/_.vue?vue&type=script&lang=ts&
 /* harmony default export */ var pages_vue_type_script_lang_ts_ = (_vue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(69);

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