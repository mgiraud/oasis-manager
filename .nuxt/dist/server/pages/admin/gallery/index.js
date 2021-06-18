exports.ids = [10];
exports.modules = {

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _delayable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(245);
/* harmony import */ var _toggleable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
// Mixins

 // Utilities




const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_delayable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], _toggleable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'activatable',
  props: {
    activator: {
      default: null,
      validator: val => {
        return ['string', 'object'].includes(typeof val);
      }
    },
    disabled: Boolean,
    internalActivator: Boolean,
    openOnHover: Boolean,
    openOnFocus: Boolean
  },
  data: () => ({
    // Do not use this directly, call getActivator() instead
    activatorElement: null,
    activatorNode: [],
    events: ['click', 'mouseenter', 'mouseleave', 'focus'],
    listeners: {}
  }),
  watch: {
    activator: 'resetActivator',
    openOnFocus: 'resetActivator',
    openOnHover: 'resetActivator'
  },

  mounted() {
    const slotType = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* getSlotType */ "u"])(this, 'activator', true);

    if (slotType && ['v-slot', 'normal'].includes(slotType)) {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_4__[/* consoleError */ "b"])(`The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`, this);
    }

    this.addActivatorEvents();
  },

  beforeDestroy() {
    this.removeActivatorEvents();
  },

  methods: {
    addActivatorEvents() {
      if (!this.activator || this.disabled || !this.getActivator()) return;
      this.listeners = this.genActivatorListeners();
      const keys = Object.keys(this.listeners);

      for (const key of keys) {
        this.getActivator().addEventListener(key, this.listeners[key]);
      }
    },

    genActivator() {
      const node = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* getSlot */ "t"])(this, 'activator', Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes()
      })) || [];
      this.activatorNode = node;
      return node;
    },

    genActivatorAttributes() {
      return {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive)
      };
    },

    genActivatorListeners() {
      if (this.disabled) return {};
      const listeners = {};

      if (this.openOnHover) {
        listeners.mouseenter = e => {
          this.getActivator(e);
          this.runDelay('open');
        };

        listeners.mouseleave = e => {
          this.getActivator(e);
          this.runDelay('close');
        };
      } else {
        listeners.click = e => {
          const activator = this.getActivator(e);
          if (activator) activator.focus();
          e.stopPropagation();
          this.isActive = !this.isActive;
        };
      }

      if (this.openOnFocus) {
        listeners.focus = e => {
          this.getActivator(e);
          e.stopPropagation();
          this.isActive = !this.isActive;
        };
      }

      return listeners;
    },

    getActivator(e) {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement;
      let activator = null;

      if (this.activator) {
        const target = this.internalActivator ? this.$el : document;

        if (typeof this.activator === 'string') {
          // Selector
          activator = target.querySelector(this.activator);
        } else if (this.activator.$el) {
          // Component (ref)
          activator = this.activator.$el;
        } else {
          // HTMLElement | Element
          activator = this.activator;
        }
      } else if (this.activatorNode.length === 1 || this.activatorNode.length && !e) {
        // Use the contents of the activator slot
        // There's either only one element in it or we
        // don't have a click event to use as a last resort
        const vm = this.activatorNode[0].componentInstance;

        if (vm && vm.$options.mixins && //                         Activatable is indirectly used via Menuable
        vm.$options.mixins.some(m => m.options && ['activatable', 'menuable'].includes(m.options.name))) {
          // Activator is actually another activatible component, use its activator (#8846)
          activator = vm.getActivator();
        } else {
          activator = this.activatorNode[0].elm;
        }
      } else if (e) {
        // Activated by a click or focus event
        activator = e.currentTarget || e.target;
      }

      this.activatorElement = activator;
      return this.activatorElement;
    },

    getContentSlot() {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* getSlot */ "t"])(this, 'default', this.getValueProxy(), true);
    },

    getValueProxy() {
      const self = this;
      return {
        get value() {
          return self.isActive;
        },

        set value(isActive) {
          self.isActive = isActive;
        }

      };
    },

    removeActivatorEvents() {
      if (!this.activator || !this.activatorElement) return;
      const keys = Object.keys(this.listeners);

      for (const key of keys) {
        this.activatorElement.removeEventListener(key, this.listeners[key]);
      }

      this.listeners = {};
    },

    resetActivator() {
      this.removeActivatorEvents();
      this.activatorElement = null;
      this.getActivator();
      this.addActivatorEvents();
    }

  }
}));

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
  name: 'delayable',
  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    openTimeout: undefined,
    closeTimeout: undefined
  }),
  methods: {
    /**
     * Clear any pending delay timers from executing
     */
    clearDelay() {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);
    },

    /**
     * Runs callback after a specified delay
     */
    runDelay(type, cb) {
      this.clearDelay();
      const delay = parseInt(this[`${type}Delay`], 10);
      this[`${type}Timeout`] = setTimeout(cb || (() => {
        this.isActive = {
          open: true,
          close: false
        }[type];
      }), delay);
    }

  }
}));

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _bootable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
// Mixins
 // Utilities





function validateAttachTarget(val) {
  const type = typeof val;
  if (type === 'boolean' || type === 'string') return true;
  return val.nodeType === Node.ELEMENT_NODE;
}
/* @vue/component */


/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_bootable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]).extend({
  name: 'detachable',
  props: {
    attach: {
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    activatorNode: null,
    hasDetached: false
  }),
  watch: {
    attach() {
      this.hasDetached = false;
      this.initDetach();
    },

    hasContent() {
      this.$nextTick(this.initDetach);
    }

  },

  beforeMount() {
    this.$nextTick(() => {
      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
        activator.forEach(node => {
          if (!node.elm) return;
          if (!this.$el.parentNode) return;
          const target = this.$el === this.$el.parentNode.firstChild ? this.$el : this.$el.nextSibling;
          this.$el.parentNode.insertBefore(node.elm, target);
        });
      }
    });
  },

  mounted() {
    this.hasContent && this.initDetach();
  },

  deactivated() {
    this.isActive = false;
  },

  beforeDestroy() {
    // IE11 Fix
    try {
      if (this.$refs.content && this.$refs.content.parentNode) {
        this.$refs.content.parentNode.removeChild(this.$refs.content);
      }

      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
        activator.forEach(node => {
          node.elm && node.elm.parentNode && node.elm.parentNode.removeChild(node.elm);
        });
      }
    } catch (e) {
      console.log(e);
    }
    /* eslint-disable-line no-console */

  },

  methods: {
    getScopeIdAttrs() {
      const scopeId = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getObjectValueByPath */ "q"])(this.$vnode, 'context.$options._scopeId');
      return scopeId && {
        [scopeId]: ''
      };
    },

    initDetach() {
      if (this._isDestroyed || !this.$refs.content || this.hasDetached || // Leave menu in place if attached
      // and dev has not changed target
      this.attach === '' || // If used as a boolean prop (<v-menu attach>)
      this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
      this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) return;
      let target;

      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('[data-app]');
      } else if (typeof this.attach === 'string') {
        // CSS selector
        target = document.querySelector(this.attach);
      } else {
        // DOM Element
        target = this.attach;
      }

      if (!target) {
        Object(_util_console__WEBPACK_IMPORTED_MODULE_3__[/* consoleWarn */ "c"])(`Unable to locate target ${this.attach || '[data-app]'}`, this);
        return;
      }

      target.appendChild(this.$refs.content);
      this.hasDetached = true;
    }

  }
}));

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
  name: 'stackable',

  data() {
    return {
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0,
      isActive: false
    };
  },

  computed: {
    activeZIndex() {
      if (typeof window === 'undefined') return 0;
      const content = this.stackElement || this.$refs.content; // Return current zindex if not active

      const index = !this.isActive ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getZIndex */ "v"])(content) : this.getMaxZIndex(this.stackExclude || [content]) + 2;
      if (index == null) return index; // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)

      return parseInt(index);
    }

  },
  methods: {
    getMaxZIndex(exclude = []) {
      const base = this.$el; // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater

      const zis = [this.stackMinZIndex, Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getZIndex */ "v"])(base)]; // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      // https://github.com/vuetifyjs/vuetify/issues/2146

      const activeElements = [...document.getElementsByClassName('v-menu__content--active'), ...document.getElementsByClassName('v-dialog__content--active')]; // Get z-index for all active dialogs

      for (let index = 0; index < activeElements.length; index++) {
        if (!exclude.includes(activeElements[index])) {
          zis.push(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getZIndex */ "v"])(activeElements[index]));
        }
      }

      return Math.max(...zis);
    }

  }
}));

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'returnable',
  props: {
    returnValue: null
  },
  data: () => ({
    isActive: false,
    originalValue: null
  }),
  watch: {
    isActive(val) {
      if (val) {
        this.originalValue = this.returnValue;
      } else {
        this.$emit('update:return-value', this.originalValue);
      }
    }

  },
  methods: {
    save(value) {
      this.originalValue = value;
      setTimeout(() => {
        this.isActive = false;
      });
    }

  }
}));

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(255);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(5).default("2065bca8", content, true)

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-dialog{border-radius:4px;margin:24px;overflow-y:auto;pointer-events:auto;transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog>*{width:100%}.v-dialog>.v-card>.v-card__title{font-size:1.25rem;font-weight:500;letter-spacing:.0125em;padding:16px 24px 10px}.v-dialog>.v-card>.v-card__subtitle,.v-dialog>.v-card>.v-card__text{padding:0 24px 20px}.v-dialog>.v-card>.v-card__actions{padding:8px 16px}.v-dialog__content{align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6;outline:none}.v-dialog__container{display:none}.v-dialog__container--attached{display:inline}.v-dialog--animated{-webkit-animation-duration:.15s;animation-duration:.15s;-webkit-animation-name:animate-dialog;animation-name:animate-dialog;-webkit-animation-timing-function:cubic-bezier(.25,.8,.25,1);animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}.v-dialog--fullscreen>.v-card{min-height:100%;min-width:100%;margin:0!important;padding:0!important}.v-dialog--scrollable,.v-dialog--scrollable>form{display:flex}.v-dialog--scrollable>.v-card,.v-dialog--scrollable>form>.v-card{display:flex;flex:1 1 100%;flex-direction:column;max-height:100%;max-width:100%}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title,.v-dialog--scrollable>form>.v-card>.v-card__actions,.v-dialog--scrollable>form>.v-card>.v-card__title{flex:0 0 auto}.v-dialog--scrollable>.v-card>.v-card__text,.v-dialog--scrollable>form>.v-card>.v-card__text{-webkit-backface-visibility:hidden;backface-visibility:hidden;flex:1 1 auto;overflow-y:auto}@-webkit-keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}@keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/ConfirmDelete.vue?vue&type=template&id=525f6b6b&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"persistent":"","width":"300"},model:{value:(_vm.show),callback:function ($$v) {_vm.show=$$v},expression:"show"}},[_c('v-card',[_c('v-card-text',[_vm._v("Are you sure you want to delete this item?")]),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"error darken-1"},on:{"click":_vm.handleDelete}},[_vm._v("\n        Delete\n      ")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"secondary darken-1","text":""},on:{"click":function($event){$event.stopPropagation();_vm.show = false}}},[_vm._v("\n        Cancel\n      ")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/ConfirmDelete.vue?vue&type=template&id=525f6b6b&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/ConfirmDelete.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let ConfirmDeletevue_type_script_lang_ts_ConfirmDelete = class ConfirmDelete extends external_nuxt_property_decorator_["Vue"] {
  get show() {
    return this.visible;
  }

  set show(value) {
    if (!value) {
      this.$emit('close');
    }
  }

};

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  default: () => {}
})], ConfirmDeletevue_type_script_lang_ts_ConfirmDelete.prototype, "handleDelete", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Boolean,
  default: true,
  required: false
})], ConfirmDeletevue_type_script_lang_ts_ConfirmDelete.prototype, "visible", void 0);

ConfirmDeletevue_type_script_lang_ts_ConfirmDelete = __decorate([Object(external_nuxt_property_decorator_["Component"])({
  name: 'ConfirmDelete'
})], ConfirmDeletevue_type_script_lang_ts_ConfirmDelete);
/* harmony default export */ var ConfirmDeletevue_type_script_lang_ts_ = (ConfirmDeletevue_type_script_lang_ts_ConfirmDelete);
// CONCATENATED MODULE: ./app/components/util/ConfirmDelete.vue?vue&type=script&lang=ts&
 /* harmony default export */ var util_ConfirmDeletevue_type_script_lang_ts_ = (ConfirmDeletevue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(57);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(279);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(242);

// CONCATENATED MODULE: ./app/components/util/ConfirmDelete.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  util_ConfirmDeletevue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "4b80d673"
  
)

/* harmony default export */ var util_ConfirmDelete = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */







installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["b" /* VCardText */],VDialog: VDialog["a" /* default */],VSpacer: VSpacer["a" /* default */]})


/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _positionable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _stackable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(247);
/* harmony import */ var _activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(244);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
// Mixins


 // Utilities


 // Types

const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_stackable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _positionable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], _activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend().extend({
  name: 'menuable',
  props: {
    allowOverflow: Boolean,
    light: Boolean,
    dark: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: [Number, String],
    nudgeBottom: {
      type: [Number, String],
      default: 0
    },
    nudgeLeft: {
      type: [Number, String],
      default: 0
    },
    nudgeRight: {
      type: [Number, String],
      default: 0
    },
    nudgeTop: {
      type: [Number, String],
      default: 0
    },
    nudgeWidth: {
      type: [Number, String],
      default: 0
    },
    offsetOverflow: Boolean,
    openOnClick: Boolean,
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    zIndex: {
      type: [Number, String],
      default: null
    }
  },
  data: () => ({
    absoluteX: 0,
    absoluteY: 0,
    activatedBy: null,
    activatorFixed: false,
    dimensions: {
      activator: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
        offsetLeft: 0
      },
      content: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0
      }
    },
    hasJustFocused: false,
    hasWindow: false,
    inputActivator: false,
    isContentActive: false,
    pageWidth: 0,
    pageYOffset: 0,
    stackClass: 'v-menu__content--active',
    stackMinZIndex: 6
  }),
  computed: {
    computedLeft() {
      const a = this.dimensions.activator;
      const c = this.dimensions.content;
      const activatorLeft = (this.attach !== false ? a.offsetLeft : a.left) || 0;
      const minWidth = Math.max(a.width, c.width);
      let left = 0;
      left += this.left ? activatorLeft - (minWidth - a.width) : activatorLeft;

      if (this.offsetX) {
        const maxWidth = isNaN(Number(this.maxWidth)) ? a.width : Math.min(a.width, Number(this.maxWidth));
        left += this.left ? -maxWidth : a.width;
      }

      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
      if (this.nudgeRight) left += parseInt(this.nudgeRight);
      return left;
    },

    computedTop() {
      const a = this.dimensions.activator;
      const c = this.dimensions.content;
      let top = 0;
      if (this.top) top += a.height - c.height;
      if (this.attach !== false) top += a.offsetTop;else top += a.top + this.pageYOffset;
      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= parseInt(this.nudgeTop);
      if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
      return top;
    },

    hasActivator() {
      return !!this.$slots.activator || !!this.$scopedSlots.activator || !!this.activator || !!this.inputActivator;
    }

  },
  watch: {
    disabled(val) {
      val && this.callDeactivate();
    },

    isActive(val) {
      if (this.disabled) return;
      val ? this.callActivate() : this.callDeactivate();
    },

    positionX: 'updateDimensions',
    positionY: 'updateDimensions'
  },

  beforeMount() {
    this.hasWindow = typeof window !== 'undefined';
  },

  methods: {
    absolutePosition() {
      return {
        offsetTop: 0,
        offsetLeft: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      };
    },

    activate() {},

    calcLeft(menuWidth) {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__[/* convertToUnit */ "h"])(this.attach !== false ? this.computedLeft : this.calcXOverflow(this.computedLeft, menuWidth));
    },

    calcTop() {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__[/* convertToUnit */ "h"])(this.attach !== false ? this.computedTop : this.calcYOverflow(this.computedTop));
    },

    calcXOverflow(left, menuWidth) {
      const xOverflow = left + menuWidth - this.pageWidth + 12;

      if ((!this.left || this.right) && xOverflow > 0) {
        left = Math.max(left - xOverflow, 0);
      } else {
        left = Math.max(left, 12);
      }

      return left + this.getOffsetLeft();
    },

    calcYOverflow(top) {
      const documentHeight = this.getInnerHeight();
      const toTop = this.pageYOffset + documentHeight;
      const activator = this.dimensions.activator;
      const contentHeight = this.dimensions.content.height;
      const totalHeight = top + contentHeight;
      const isOverflowing = toTop < totalHeight; // If overflowing bottom and offset
      // TODO: set 'bottom' position instead of 'top'

      if (isOverflowing && this.offsetOverflow && // If we don't have enough room to offset
      // the overflow, don't offset
      activator.top > contentHeight) {
        top = this.pageYOffset + (activator.top - contentHeight); // If overflowing bottom
      } else if (isOverflowing && !this.allowOverflow) {
        top = toTop - contentHeight - 12; // If overflowing top
      } else if (top < this.pageYOffset && !this.allowOverflow) {
        top = this.pageYOffset + 12;
      }

      return top < 12 ? 12 : top;
    },

    callActivate() {
      if (!this.hasWindow) return;
      this.activate();
    },

    callDeactivate() {
      this.isContentActive = false;
      this.deactivate();
    },

    checkForPageYOffset() {
      if (this.hasWindow) {
        this.pageYOffset = this.activatorFixed ? 0 : this.getOffsetTop();
      }
    },

    checkActivatorFixed() {
      if (this.attach !== false) return;
      let el = this.getActivator();

      while (el) {
        if (window.getComputedStyle(el).position === 'fixed') {
          this.activatorFixed = true;
          return;
        }

        el = el.offsetParent;
      }

      this.activatorFixed = false;
    },

    deactivate() {},

    genActivatorListeners() {
      const listeners = _activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].options.methods.genActivatorListeners.call(this);
      const onClick = listeners.click;

      listeners.click = e => {
        if (this.openOnClick) {
          onClick && onClick(e);
        }

        this.absoluteX = e.clientX;
        this.absoluteY = e.clientY;
      };

      return listeners;
    },

    getInnerHeight() {
      if (!this.hasWindow) return 0;
      return window.innerHeight || document.documentElement.clientHeight;
    },

    getOffsetLeft() {
      if (!this.hasWindow) return 0;
      return window.pageXOffset || document.documentElement.scrollLeft;
    },

    getOffsetTop() {
      if (!this.hasWindow) return 0;
      return window.pageYOffset || document.documentElement.scrollTop;
    },

    getRoundedBoundedClientRect(el) {
      const rect = el.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        bottom: Math.round(rect.bottom),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    },

    measure(el) {
      if (!el || !this.hasWindow) return null;
      const rect = this.getRoundedBoundedClientRect(el); // Account for activator margin

      if (this.attach !== false) {
        const style = window.getComputedStyle(el);
        rect.left = parseInt(style.marginLeft);
        rect.top = parseInt(style.marginTop);
      }

      return rect;
    },

    sneakPeek(cb) {
      requestAnimationFrame(() => {
        const el = this.$refs.content;

        if (!el || el.style.display !== 'none') {
          cb();
          return;
        }

        el.style.display = 'inline-block';
        cb();
        el.style.display = 'none';
      });
    },

    startTransition() {
      return new Promise(resolve => requestAnimationFrame(() => {
        this.isContentActive = this.hasJustFocused = this.isActive;
        resolve();
      }));
    },

    updateDimensions() {
      this.hasWindow = typeof window !== 'undefined';
      this.checkActivatorFixed();
      this.checkForPageYOffset();
      this.pageWidth = document.documentElement.clientWidth;
      const dimensions = {
        activator: { ...this.dimensions.activator
        },
        content: { ...this.dimensions.content
        }
      }; // Activator should already be shown

      if (!this.hasActivator || this.absolute) {
        dimensions.activator = this.absolutePosition();
      } else {
        const activator = this.getActivator();
        if (!activator) return;
        dimensions.activator = this.measure(activator);
        dimensions.activator.offsetLeft = activator.offsetLeft;

        if (this.attach !== false) {
          // account for css padding causing things to not line up
          // this is mostly for v-autocomplete, hopefully it won't break anything
          dimensions.activator.offsetTop = activator.offsetTop;
        } else {
          dimensions.activator.offsetTop = 0;
        }
      } // Display and hide to get dimensions


      this.sneakPeek(() => {
        this.$refs.content && (dimensions.content = this.measure(this.$refs.content));
        this.dimensions = dimensions;
      });
    }

  }
}));

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/form/Toolbar.vue?vue&type=template&id=2f61bd33&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-toolbar',{attrs:{"flat":"","bottom":""}},[_vm._t("left"),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('div',[(_vm.handleBack)?_c('v-btn',{attrs:{"loading":_vm.isLoading,"color":"primary"},on:{"click":_vm.goBack}},[_vm._v("\n      Retour\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleEdit)?_c('v-btn',{attrs:{"loading":_vm.isLoading,"color":"primary"},on:{"click":_vm.editItem}},[_vm._v("\n      Editer\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleSubmit)?_c('v-btn',{attrs:{"loading":_vm.isLoading,"color":"primary"},on:{"click":_vm.submitItem}},[_vm._v("\n      Envoyer\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleReset)?_c('v-btn',{staticClass:"ml-sm-2",on:{"click":_vm.resetItem}},[_vm._v("\n      Reinitialiser\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleDelete)?_c('v-btn',{staticClass:"ml-sm-2",attrs:{"color":"error"},on:{"click":function($event){_vm.confirmDelete = true}}},[_vm._v("\n      Supprimer\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleAdd)?_c('v-btn',{attrs:{"color":"primary","rounded":""},on:{"click":_vm.addItem}},[_c('v-icon',[_vm._v("ri-add-line")])],1):_vm._e()],1),_vm._v(" "),(_vm.handleDelete)?_c('ConfirmDelete',{attrs:{"visible":_vm.confirmDelete,"handle-delete":_vm.handleDelete},on:{"close":function($event){_vm.confirmDelete = false}}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/form/Toolbar.vue?vue&type=template&id=2f61bd33&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// EXTERNAL MODULE: ./app/components/util/ConfirmDelete.vue + 4 modules
var ConfirmDelete = __webpack_require__(256);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/form/Toolbar.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let Toolbarvue_type_script_lang_ts_Toolbar = class Toolbar extends external_nuxt_property_decorator_["Vue"] {
  constructor() {
    super(...arguments);
    this.confirmDelete = false;
  }

  goBack() {
    if (this.handleBack) {
      this.handleBack();
    }
  }

  addItem() {
    if (this.handleAdd) {
      this.handleAdd();
    }
  }

  editItem() {
    if (this.handleEdit) {
      this.handleEdit();
    }
  }

  submitItem() {
    if (this.handleSubmit) {
      this.handleSubmit();
    }
  }

  resetItem() {
    if (this.handleReset) {
      this.handleReset();
    }
  }

};

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  default: null
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "handleBack", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  default: null
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "handleEdit", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  default: null
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "handleSubmit", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  default: null
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "handleReset", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  default: null
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "handleDelete", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  default: null
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "handleAdd", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: String,
  default: '',
  required: false
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "title", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Boolean,
  default: false,
  required: false
})], Toolbarvue_type_script_lang_ts_Toolbar.prototype, "isLoading", void 0);

Toolbarvue_type_script_lang_ts_Toolbar = __decorate([Object(external_nuxt_property_decorator_["Component"])({
  name: 'Toolbar',
  components: {
    ConfirmDelete: ConfirmDelete["a" /* default */]
  }
})], Toolbarvue_type_script_lang_ts_Toolbar);
/* harmony default export */ var Toolbarvue_type_script_lang_ts_ = (Toolbarvue_type_script_lang_ts_Toolbar);
// CONCATENATED MODULE: ./app/components/form/Toolbar.vue?vue&type=script&lang=ts&
 /* harmony default export */ var form_Toolbarvue_type_script_lang_ts_ = (Toolbarvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VToolbar/VToolbar.js
var VToolbar = __webpack_require__(18);

// CONCATENATED MODULE: ./app/components/form/Toolbar.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  form_Toolbarvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "309e0725"
  
)

/* harmony default export */ var form_Toolbar = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */





installComponents_default()(component, {VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */],VSpacer: VSpacer["a" /* default */],VToolbar: VToolbar["a" /* default */]})


/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(254);
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(280);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(244);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75);
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(246);
/* harmony import */ var _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(80);
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(248);
/* harmony import */ var _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(247);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19);
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(0);
// Styles
 // Components

 // Mixins







 // Directives

 // Helpers




const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(_mixins_activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'v-dialog',
  directives: {
    ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]
  },
  props: {
    dark: Boolean,
    disabled: Boolean,
    fullscreen: Boolean,
    light: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'none'
    },
    noClickAnimation: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    persistent: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    }
  },

  data() {
    return {
      activatedBy: null,
      animate: false,
      animateTimeout: -1,
      isActive: !!this.value,
      stackMinZIndex: 200,
      previousActiveElement: null
    };
  },

  computed: {
    classes() {
      return {
        [`v-dialog ${this.contentClass}`.trim()]: true,
        'v-dialog--active': this.isActive,
        'v-dialog--persistent': this.persistent,
        'v-dialog--fullscreen': this.fullscreen,
        'v-dialog--scrollable': this.scrollable,
        'v-dialog--animated': this.animate
      };
    },

    contentClasses() {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive
      };
    },

    hasActivator() {
      return Boolean(!!this.$slots.activator || !!this.$scopedSlots.activator);
    }

  },
  watch: {
    isActive(val) {
      if (val) {
        this.show();
        this.hideScroll();
      } else {
        var _this$previousActiveE;

        this.removeOverlay();
        this.unbind();
        (_this$previousActiveE = this.previousActiveElement) == null ? void 0 : _this$previousActiveE.focus();
      }
    },

    fullscreen(val) {
      if (!this.isActive) return;

      if (val) {
        this.hideScroll();
        this.removeOverlay(false);
      } else {
        this.showScroll();
        this.genOverlay();
      }
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('full-width')) {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_11__[/* removed */ "e"])('full-width', this);
    }
  },

  beforeMount() {
    this.$nextTick(() => {
      this.isBooted = this.isActive;
      this.isActive && this.show();
    });
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') this.unbind();
  },

  methods: {
    animateClick() {
      this.animate = false; // Needed for when clicking very fast
      // outside of the dialog

      this.$nextTick(() => {
        this.animate = true;
        window.clearTimeout(this.animateTimeout);
        this.animateTimeout = window.setTimeout(() => this.animate = false, 150);
      });
    },

    closeConditional(e) {
      const target = e.target; // Ignore the click if the dialog is closed or destroyed,
      // if it was on an element inside the content,
      // if it was dragged onto the overlay (#6969),
      // or if this isn't the topmost dialog (#9907)

      return !(this._isDestroyed || !this.isActive || this.$refs.content.contains(target) || this.overlay && target && !this.overlay.$el.contains(target)) && this.activeZIndex >= this.getMaxZIndex();
    },

    hideScroll() {
      if (this.fullscreen) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].options.methods.hideScroll.call(this);
      }
    },

    show() {
      !this.fullscreen && !this.hideOverlay && this.genOverlay(); // Double nextTick to wait for lazy content to be generated

      this.$nextTick(() => {
        this.$nextTick(() => {
          this.previousActiveElement = document.activeElement;
          this.$refs.content.focus();
          this.bind();
        });
      });
    },

    bind() {
      window.addEventListener('focusin', this.onFocusin);
    },

    unbind() {
      window.removeEventListener('focusin', this.onFocusin);
    },

    onClickOutside(e) {
      this.$emit('click:outside', e);

      if (this.persistent) {
        this.noClickAnimation || this.animateClick();
      } else {
        this.isActive = false;
      }
    },

    onKeydown(e) {
      if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* keyCodes */ "y"].esc && !this.getOpenDependents().length) {
        if (!this.persistent) {
          this.isActive = false;
          const activator = this.getActivator();
          this.$nextTick(() => activator && activator.focus());
        } else if (!this.noClickAnimation) {
          this.animateClick();
        }
      }

      this.$emit('keydown', e);
    },

    // On focus change, wrap focus to stay inside the dialog
    // https://github.com/vuetifyjs/vuetify/issues/6892
    onFocusin(e) {
      if (!e || !this.retainFocus) return;
      const target = e.target;

      if (!!target && // It isn't the document or the dialog body
      ![document, this.$refs.content].includes(target) && // It isn't inside the dialog body
      !this.$refs.content.contains(target) && // We're the topmost dialog
      this.activeZIndex >= this.getMaxZIndex() && // It isn't inside a dependent element (like a menu)
      !this.getOpenDependentElements().some(el => el.contains(target)) // So we must have focused something outside the dialog and its children
      ) {
          // Find and focus the first available element inside the dialog
          const focusable = this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const el = [...focusable].find(el => !el.hasAttribute('disabled'));
          el && el.focus();
        }
    },

    genContent() {
      return this.showLazyContent(() => [this.$createElement(_VThemeProvider__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        props: {
          root: true,
          light: this.light,
          dark: this.dark
        }
      }, [this.$createElement('div', {
        class: this.contentClasses,
        attrs: {
          role: 'document',
          tabindex: this.isActive ? 0 : undefined,
          ...this.getScopeIdAttrs()
        },
        on: {
          keydown: this.onKeydown
        },
        style: {
          zIndex: this.activeZIndex
        },
        ref: 'content'
      }, [this.genTransition()])])]);
    },

    genTransition() {
      const content = this.genInnerContent();
      if (!this.transition) return content;
      return this.$createElement('transition', {
        props: {
          name: this.transition,
          origin: this.origin,
          appear: true
        }
      }, [content]);
    },

    genInnerContent() {
      const data = {
        class: this.classes,
        ref: 'dialog',
        directives: [{
          name: 'click-outside',
          value: {
            handler: this.onClickOutside,
            closeConditional: this.closeConditional,
            include: this.getOpenDependentElements
          }
        }, {
          name: 'show',
          value: this.isActive
        }],
        style: {
          transformOrigin: this.origin
        }
      };

      if (!this.fullscreen) {
        data.style = { ...data.style,
          maxWidth: this.maxWidth === 'none' ? undefined : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* convertToUnit */ "h"])(this.maxWidth),
          width: this.width === 'auto' ? undefined : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* convertToUnit */ "h"])(this.width)
        };
      }

      return this.$createElement('div', data, this.getContentSlot());
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-dialog__container',
      class: {
        'v-dialog__container--attached': this.attach === '' || this.attach === true || this.attach === 'attach'
      },
      attrs: {
        role: 'dialog'
      }
    }, [this.genActivator(), this.genContent()]);
  }

}));

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
// Mixins

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (_mixins_themeable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].extend({
  name: 'v-theme-provider',
  props: {
    root: Boolean
  },
  computed: {
    isDark() {
      return this.root ? this.rootIsDark : _mixins_themeable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].options.computed.isDark.call(this);
    }

  },

  render() {
    /* istanbul ignore next */
    return this.$slots.default && this.$slots.default.find(node => !node.isComment && node.text !== ' ');
  }

}));

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(311);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("da236990", content, true, context)
};

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(315);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("06a73677", content, true, context)
};

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(317);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("776dacce", content, true, context)
};

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_6dfede82_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(296);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_6dfede82_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_6dfede82_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_6dfede82_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_6dfede82_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".file-navigator-breadcrumb-container[data-v-6dfede82]{display:inline-block;cursor:pointer}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(313);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(5).default("dc0628f2", content, true)

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_5202e82a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_5202e82a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_5202e82a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_5202e82a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_5202e82a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".context-menu[data-v-5202e82a]{top:0;left:0;margin:0;padding:0;display:none;position:fixed;z-index:1000000}.context-menu--active[data-v-5202e82a]{display:block}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_6f80d915_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(298);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_6f80d915_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_6f80d915_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_6f80d915_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_6f80d915_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "h3.navigator-title[data-v-6f80d915]{display:inline-block;cursor:pointer}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(319);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(5).default("811c37a6", content, true)

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".theme--light.v-treeview{color:rgba(0,0,0,.87)}.theme--light.v-treeview--hoverable .v-treeview-node__root:hover:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root:hover:before{opacity:.04}.theme--light.v-treeview--hoverable .v-treeview-node__root--active:before,.theme--light.v-treeview--hoverable .v-treeview-node__root--active:hover:before,.theme--light.v-treeview--hoverable .v-treeview-node__root:focus:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:hover:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root:focus:before{opacity:.12}.theme--light.v-treeview--hoverable .v-treeview-node__root--active:focus:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:focus:before{opacity:.16}.theme--light.v-treeview .v-treeview-node__root.v-treeview-node--active:before,.theme--light.v-treeview .v-treeview-node__root.v-treeview-node--active:hover:before{opacity:.12}.theme--light.v-treeview .v-treeview-node__root.v-treeview-node--active:focus:before{opacity:.16}.theme--light.v-treeview .v-treeview-node--disabled>.v-treeview-node__root>.v-treeview-node__content{color:rgba(0,0,0,.38)!important}.theme--dark.v-treeview{color:#fff}.theme--dark.v-treeview--hoverable .v-treeview-node__root:hover:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root:hover:before{opacity:.08}.theme--dark.v-treeview--hoverable .v-treeview-node__root--active:before,.theme--dark.v-treeview--hoverable .v-treeview-node__root--active:hover:before,.theme--dark.v-treeview--hoverable .v-treeview-node__root:focus:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:hover:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root:focus:before{opacity:.24}.theme--dark.v-treeview--hoverable .v-treeview-node__root--active:focus:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:focus:before{opacity:.32}.theme--dark.v-treeview .v-treeview-node__root.v-treeview-node--active:before,.theme--dark.v-treeview .v-treeview-node__root.v-treeview-node--active:hover:before{opacity:.24}.theme--dark.v-treeview .v-treeview-node__root.v-treeview-node--active:focus:before{opacity:.32}.theme--dark.v-treeview .v-treeview-node--disabled>.v-treeview-node__root>.v-treeview-node__content{color:hsla(0,0%,100%,.5)!important}.v-treeview-node.v-treeview-node--shaped .v-treeview-node__root,.v-treeview-node.v-treeview-node--shaped .v-treeview-node__root:before{border-bottom-right-radius:24px!important;border-top-right-radius:24px!important}.v-treeview-node.v-treeview-node--shaped .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview-node.v-treeview-node--rounded .v-treeview-node__root,.v-treeview-node.v-treeview-node--rounded .v-treeview-node__root:before{border-radius:24px!important}.v-treeview-node.v-treeview-node--rounded .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview-node--click>.v-treeview-node__root,.v-treeview-node--click>.v-treeview-node__root>.v-treeview-node__content>*{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-treeview-node.v-treeview-node--active .v-treeview-node__content .v-icon{color:inherit}.v-treeview-node__root{display:flex;align-items:center;min-height:48px;padding-left:8px;padding-right:8px;position:relative}.v-treeview-node__root:before{background-color:currentColor;bottom:0;content:\"\";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-treeview-node__root:after{content:\"\";font-size:0;min-height:inherit}.v-treeview-node__children{transition:all .2s cubic-bezier(0,0,.2,1)}.v-treeview--dense .v-treeview-node__root{min-height:40px}.v-treeview--dense.v-treeview-node--shaped .v-treeview-node__root,.v-treeview--dense.v-treeview-node--shaped .v-treeview-node__root:before{border-bottom-right-radius:20px!important;border-top-right-radius:20px!important}.v-treeview--dense.v-treeview-node--shaped .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview--dense.v-treeview-node--rounded .v-treeview-node__root,.v-treeview--dense.v-treeview-node--rounded .v-treeview-node__root:before{border-radius:20px!important}.v-treeview--dense.v-treeview-node--rounded .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview-node__checkbox{width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-application--is-ltr .v-treeview-node__checkbox{margin-left:6px}.v-application--is-rtl .v-treeview-node__checkbox{margin-right:6px}.v-treeview-node__toggle{width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-treeview-node__toggle--loading{-webkit-animation:progress-circular-rotate 1s linear infinite;animation:progress-circular-rotate 1s linear infinite}.v-application--is-ltr .v-treeview-node__toggle{transform:rotate(-90deg)}.v-application--is-ltr .v-treeview-node__toggle--open{transform:none}.v-application--is-rtl .v-treeview-node__toggle{transform:rotate(90deg)}.v-application--is-rtl .v-treeview-node__toggle--open{transform:none}.v-treeview-node__prepend{min-width:24px}.v-application--is-ltr .v-treeview-node__prepend{margin-right:6px}.v-application--is-rtl .v-treeview-node__prepend{margin-left:6px}.v-treeview-node__append{min-width:24px}.v-application--is-ltr .v-treeview-node__append{margin-left:6px}.v-application--is-rtl .v-treeview-node__append{margin-right:6px}.v-treeview-node__level{width:24px}.v-treeview-node__label{flex:1;font-size:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.v-treeview-node__content{align-items:center;display:flex;flex-basis:0%;flex-grow:1;flex-shrink:0;min-width:0}.v-treeview-node__content .v-btn{flex-grow:0!important;flex-shrink:1!important}.v-application--is-ltr .v-treeview-node__content{margin-left:6px}.v-application--is-rtl .v-treeview-node__content{margin-right:6px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/FileManager.vue?vue&type=template&id=36120ba7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"cols":_vm.detailsPanel ? 8 : 12}},[_c('v-container',[(_vm.showSelection)?_c('v-row',[_c('v-col',[_c('file-selection',{attrs:{"thumbnails":_vm.thumbnails,"links":_vm.links,"remove-link":_vm.removeLink,"remove-thumbnail":_vm.removeThumbnail}})],1)],1):_vm._e(),_vm._v(" "),_c('v-row',[_c('v-col',[_c('file-navigator',{ref:"file-navigator",attrs:{"select-click-handler":_vm.selectMediaObject,"current-media-node":_vm.currentMediaNode,"edit-click-handler":_vm.editMediaObject,"show-selection":_vm.showSelection},on:{"update:currentMediaNode":function($event){_vm.currentMediaNode=$event},"update:current-media-node":function($event){_vm.currentMediaNode=$event}}})],1)],1),_vm._v(" "),(_vm.currentMediaNode)?_c('v-row',[_c('v-col',[_c('file-uploader',{attrs:{"handle-upload":_vm.handleUpload}})],1)],1):_vm._e()],1)],1),_vm._v(" "),(_vm.detailsPanel)?_c('v-col',[_c('v-container',[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',[_c('file-details',{attrs:{"media-object":_vm.selectedMediaObject}})],1)],1)],1)],1):_vm._e()],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/FileManager.vue?vue&type=template&id=36120ba7&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_selection/FileSelection.vue?vue&type=template&id=5ed1d26e&
var FileSelectionvue_type_template_id_5ed1d26e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('h3',[_vm._v("Fichiers sélectionnés")])])],1),_vm._v(" "),(_vm.thumbnails.length + _vm.links.length === 0)?_c('v-row',[_c('v-col',[_c('p',[_vm._v("Tu peux téleverser un fichier ou utiliser le navigateur pour sélectionner les fichiers à insérer")])])],1):_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',[_c('v-container',[_c('v-row',{attrs:{"no-gutters":""}},_vm._l((_vm.thumbnails),function(thumbnail,i){return _c('v-col',{key:i,attrs:{"cols":"4","align-self":"center"}},[_c('v-card',[_c('v-img',{attrs:{"src":thumbnail.src,"max-height":"200","contain":""}}),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{staticClass:"btn-remove-thumbnail",attrs:{"fab":"","dark":"","x-small":"","color":"error"},on:{"click":function($event){return _vm.removeThumbnail(i)}}},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("\n                    ri-close-line\n                  ")])],1)],1)],1)],1)}),1),_vm._v(" "),_c('v-row',_vm._l((_vm.links),function(link,i){return _c('v-col',{key:i},[_c('span',[_vm._v(_vm._s(link.name)),_c('v-btn',{staticClass:"btn-remove-thumbnail",attrs:{"fab":"","dark":"","x-small":"","color":"error"},on:{"click":function($event){return _vm.removeLink(i)}}},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("\n                ri-close-line\n              ")])],1)],1)])}),1)],1)],1)],1)],1)}
var FileSelectionvue_type_template_id_5ed1d26e_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_selection/FileSelection.vue?vue&type=template&id=5ed1d26e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_selection/FileSelection.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let FileSelectionvue_type_script_lang_ts_FileSelection = class FileSelection extends external_nuxt_property_decorator_["Vue"] {};

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Array,
  required: true
})], FileSelectionvue_type_script_lang_ts_FileSelection.prototype, "thumbnails", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Array,
  required: true
})], FileSelectionvue_type_script_lang_ts_FileSelection.prototype, "links", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileSelectionvue_type_script_lang_ts_FileSelection.prototype, "removeThumbnail", void 0);

__decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileSelectionvue_type_script_lang_ts_FileSelection.prototype, "removeLink", void 0);

FileSelectionvue_type_script_lang_ts_FileSelection = __decorate([external_nuxt_property_decorator_["Component"]], FileSelectionvue_type_script_lang_ts_FileSelection);
/* harmony default export */ var FileSelectionvue_type_script_lang_ts_ = (FileSelectionvue_type_script_lang_ts_FileSelection);
// CONCATENATED MODULE: ./app/components/file_manager/file_selection/FileSelection.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_selection_FileSelectionvue_type_script_lang_ts_ = (FileSelectionvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(57);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(240);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(243);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js + 2 modules
var VImg = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(241);

// CONCATENATED MODULE: ./app/components/file_manager/file_selection/FileSelection.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  file_selection_FileSelectionvue_type_script_lang_ts_,
  FileSelectionvue_type_template_id_5ed1d26e_render,
  FileSelectionvue_type_template_id_5ed1d26e_staticRenderFns,
  false,
  null,
  null,
  "001c81ec"
  
)

/* harmony default export */ var file_selection_FileSelection = (component.exports);

/* vuetify-loader */









installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VIcon: VIcon["a" /* default */],VImg: VImg["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_uploader/FileUploader.vue?vue&type=template&id=ce43a298&
var FileUploadervue_type_template_id_ce43a298_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('input',{ref:"fileSelection",staticStyle:{"display":"none"},attrs:{"id":"fileElem","type":"file","multiple":"","accept":"image/*"},on:{"change":_vm.onFileChange}}),_c('v-btn',{on:{"click":_vm.openFileSelection}},[_vm._v("\n        Sélectionner des fichiers à téléverser\n      ")])],1)],1)],1)}
var FileUploadervue_type_template_id_ce43a298_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_uploader/FileUploader.vue?vue&type=template&id=ce43a298&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_uploader/FileUploader.vue?vue&type=script&lang=ts&
var FileUploadervue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let FileUploadervue_type_script_lang_ts_FileUploader = class FileUploader extends external_nuxt_property_decorator_["Vue"] {
  openFileSelection() {
    this.$refs.fileSelection.click();
  }

  onFileChange() {
    const files = this.$refs.fileSelection.files;

    if (files) {
      this.handleUpload(files);
    }
  }

};

FileUploadervue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileUploadervue_type_script_lang_ts_FileUploader.prototype, "handleUpload", void 0);

FileUploadervue_type_script_lang_ts_FileUploader = FileUploadervue_type_script_lang_ts_decorate([external_nuxt_property_decorator_["Component"]], FileUploadervue_type_script_lang_ts_FileUploader);
/* harmony default export */ var FileUploadervue_type_script_lang_ts_ = (FileUploadervue_type_script_lang_ts_FileUploader);
// CONCATENATED MODULE: ./app/components/file_manager/file_uploader/FileUploader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_uploader_FileUploadervue_type_script_lang_ts_ = (FileUploadervue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file_manager/file_uploader/FileUploader.vue





/* normalize component */

var FileUploader_component = Object(componentNormalizer["a" /* default */])(
  file_uploader_FileUploadervue_type_script_lang_ts_,
  FileUploadervue_type_template_id_ce43a298_render,
  FileUploadervue_type_template_id_ce43a298_staticRenderFns,
  false,
  null,
  null,
  "63901930"
  
)

/* harmony default export */ var file_uploader_FileUploader = (FileUploader_component.exports);

/* vuetify-loader */





installComponents_default()(FileUploader_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigator.vue?vue&type=template&id=6f80d915&scoped=true&
var FileNavigatorvue_type_template_id_6f80d915_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('h3',{staticClass:"navigator-title",on:{"click":_vm.handleRootClick}},[_c('v-btn',{attrs:{"rounded":"","depressed":"","small":""}},[_vm._v("\n          Navigateur de fichier\n        ")])],1),_vm._v(" "),_c('file-navigator-bread-crumb',{attrs:{"media-node":_vm.currentMediaNode,"media-node-click-handler":_vm.handleMediaNodeClick}})],1)],1),_vm._v(" "),(_vm.currentMediaNode)?_c('v-row',{on:{"contextmenu":function($event){$event.preventDefault();return _vm.onRightClick($event)}}},[_c('v-col',{attrs:{"cols":"12"}},[_c('h4',[_vm._v("Dossiers")])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12"}},[(_vm.currentMediaNode.children.length > 0)?_c('file-navigator-folders',{attrs:{"media-node":_vm.currentMediaNode,"handle-click":_vm.handleMediaNodeClick}}):_c('p',[_vm._v("\n        Aucun dossier\n      ")])],1)],1):_vm._e(),_vm._v(" "),(_vm.currentMediaNode && _vm.currentMediaNode.mediaObjects.length > 0)?_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('h4',[_vm._v("Fichiers")])]),_vm._v(" "),_c('v-col',[_c('file-navigator-files',{attrs:{"select-click-handler":_vm.selectClickHandler,"edit-click-handler":_vm.editClickHandler,"media-node":_vm.currentMediaNode}})],1)],1):_vm._e(),_vm._v(" "),(!_vm.currentMediaNode)?_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('h4',[_vm._v("Sélectionner un dossier")])]),_vm._v(" "),_vm._l((_vm.rootMediaNodes),function(node){return _c('v-col',{key:node['@id'],attrs:{"cols":"3"}},[_c('v-btn',{on:{"click":function($event){return _vm.handleMediaNodeClick(node['@id'])}}},[_vm._v("\n        "+_vm._s(node.name)+"\n      ")])],1)})],2):_vm._e(),_vm._v(" "),_c('file-navigator-context-menu',{ref:"file-navigator-context-menu",attrs:{"media-node":_vm.currentMediaNode}})],1)}
var FileNavigatorvue_type_template_id_6f80d915_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigator.vue?vue&type=template&id=6f80d915&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=template&id=6dfede82&scoped=true&
var FileNavigatorBreadCrumbvue_type_template_id_6dfede82_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.mediaNode)?_c('div',{staticClass:"file-navigator-breadcrumb-container"},_vm._l((_vm.mediaNode.breadcrumb),function(crumb){return _vm._ssrNode("<span data-v-6dfede82>","</span>",[_vm._ssrNode(" "),_c('v-icon',[_vm._v("ri-arrow-right-s-line")]),_vm._ssrNode(" "),_c('v-btn',{attrs:{"rounded":"","depressed":"","small":""}},[_vm._v(_vm._s(crumb.name))])],2)}),0):_vm._e()}
var FileNavigatorBreadCrumbvue_type_template_id_6dfede82_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=template&id=6dfede82&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=script&lang=ts&
var FileNavigatorBreadCrumbvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let FileNavigatorBreadCrumbvue_type_script_lang_ts_FileNavigatorBreadCrumbItems = class FileNavigatorBreadCrumbItems extends external_nuxt_property_decorator_["Vue"] {
  constructor() {
    super(...arguments);
    this.name = 'file-navigator-bread-crumb-items';
  }

  handleCrumbClick(crumb) {
    this.mediaNodeClickHandler(crumb['@id']);
  }

};

FileNavigatorBreadCrumbvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: false,
  default: null
})], FileNavigatorBreadCrumbvue_type_script_lang_ts_FileNavigatorBreadCrumbItems.prototype, "mediaNode", void 0);

FileNavigatorBreadCrumbvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileNavigatorBreadCrumbvue_type_script_lang_ts_FileNavigatorBreadCrumbItems.prototype, "mediaNodeClickHandler", void 0);

FileNavigatorBreadCrumbvue_type_script_lang_ts_FileNavigatorBreadCrumbItems = FileNavigatorBreadCrumbvue_type_script_lang_ts_decorate([external_nuxt_property_decorator_["Component"]], FileNavigatorBreadCrumbvue_type_script_lang_ts_FileNavigatorBreadCrumbItems);
/* harmony default export */ var FileNavigatorBreadCrumbvue_type_script_lang_ts_ = (FileNavigatorBreadCrumbvue_type_script_lang_ts_FileNavigatorBreadCrumbItems);
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorBreadCrumbvue_type_script_lang_ts_ = (FileNavigatorBreadCrumbvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorBreadCrumb.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(310)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var FileNavigatorBreadCrumb_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorBreadCrumbvue_type_script_lang_ts_,
  FileNavigatorBreadCrumbvue_type_template_id_6dfede82_scoped_true_render,
  FileNavigatorBreadCrumbvue_type_template_id_6dfede82_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "6dfede82",
  "8c28c23a"
  
)

/* harmony default export */ var FileNavigatorBreadCrumb = (FileNavigatorBreadCrumb_component.exports);

/* vuetify-loader */



installComponents_default()(FileNavigatorBreadCrumb_component, {VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorFolders.vue?vue&type=template&id=2ea5896f&
var FileNavigatorFoldersvue_type_template_id_2ea5896f_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',_vm._l((_vm.mediaNode.children),function(child){return _c('v-col',{key:child['@id']},[_c('v-btn',{on:{"click":function($event){return _vm.handleClick(child['@id'])}}},[_vm._v("\n        "+_vm._s(child.name)+"\n      ")])],1)}),1)],1)}
var FileNavigatorFoldersvue_type_template_id_2ea5896f_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorFolders.vue?vue&type=template&id=2ea5896f&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorFolders.vue?vue&type=script&lang=ts&
var FileNavigatorFoldersvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let FileNavigatorFoldersvue_type_script_lang_ts_FileNavigatorFolders = class FileNavigatorFolders extends external_nuxt_property_decorator_["Vue"] {
  constructor() {
    super(...arguments);
    this.name = 'file-navigator-bread-crumb-items';
    this.childItem = null;
  }

  getMediaNode(value) {
    return value;
  }

};

FileNavigatorFoldersvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: true
})], FileNavigatorFoldersvue_type_script_lang_ts_FileNavigatorFolders.prototype, "mediaNode", void 0);

FileNavigatorFoldersvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileNavigatorFoldersvue_type_script_lang_ts_FileNavigatorFolders.prototype, "handleClick", void 0);

FileNavigatorFoldersvue_type_script_lang_ts_FileNavigatorFolders = FileNavigatorFoldersvue_type_script_lang_ts_decorate([external_nuxt_property_decorator_["Component"]], FileNavigatorFoldersvue_type_script_lang_ts_FileNavigatorFolders);
/* harmony default export */ var FileNavigatorFoldersvue_type_script_lang_ts_ = (FileNavigatorFoldersvue_type_script_lang_ts_FileNavigatorFolders);
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorFolders.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorFoldersvue_type_script_lang_ts_ = (FileNavigatorFoldersvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorFolders.vue





/* normalize component */

var FileNavigatorFolders_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorFoldersvue_type_script_lang_ts_,
  FileNavigatorFoldersvue_type_template_id_2ea5896f_render,
  FileNavigatorFoldersvue_type_template_id_2ea5896f_staticRenderFns,
  false,
  null,
  null,
  "6fa56cf5"
  
)

/* harmony default export */ var file_navigator_FileNavigatorFolders = (FileNavigatorFolders_component.exports);

/* vuetify-loader */





installComponents_default()(FileNavigatorFolders_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorFiles.vue?vue&type=template&id=39f58680&scoped=true&
var FileNavigatorFilesvue_type_template_id_39f58680_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',_vm._l((_vm.mediaObjects),function(item){return _c('v-col',{key:item['@id'],attrs:{"cols":"12","md":"6","lg":"3"}},[_c('v-card',[(item.isImage)?_c('v-img',{staticClass:"file-navigator-object",attrs:{"src":item.contentUrl,"max-height":"300","contain":""}}):_c('span',{staticClass:"file-navigator-object"},[_vm._v(_vm._s(item.filePath))]),_vm._v(" "),_c('v-card-title',[(item.customName)?_c('span',[_vm._v(_vm._s(item.customName))]):_c('small',[_vm._v("Titre non défini")])]),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),(_vm.selectionEnabled)?_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"icon":""},on:{"click":function($event){return _vm.selectClickHandler(item)}}},'v-btn',attrs,false),on),[_c('v-icon',[_vm._v("ri-arrow-left-up-line")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Sélectionner l'image")])]):_vm._e(),_vm._v(" "),_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"icon":""},on:{"click":function($event){return _vm.editClickHandler(item)}}},'v-btn',attrs,false),on),[_c('v-icon',[_vm._v("ri-pencil-line")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editer les propriétés de l'image")])])],1)],1)],1)}),1)],1)}
var FileNavigatorFilesvue_type_template_id_39f58680_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorFiles.vue?vue&type=template&id=39f58680&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorFiles.vue?vue&type=script&lang=ts&
var FileNavigatorFilesvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const mediaObjectModule = Object(external_nuxt_property_decorator_["namespace"])('media_object');
let FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles = class FileNavigatorFiles extends external_nuxt_property_decorator_["Vue"] {
  loadObjects() {
    if (this.mediaNode !== null) {
      this.fetchMediaObjects({
        mediaNodes: this.mediaNode['@id']
      });
    }
  }

  mounted() {
    this.loadObjects();
  }

  onMediaNodeChange(mediaNode) {
    this.loadObjects();
  }

};

FileNavigatorFilesvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: true
})], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles.prototype, "mediaNode", void 0);

FileNavigatorFilesvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles.prototype, "selectClickHandler", void 0);

FileNavigatorFilesvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles.prototype, "editClickHandler", void 0);

FileNavigatorFilesvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Inject"])()], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles.prototype, "selectionEnabled", void 0);

FileNavigatorFilesvue_type_script_lang_ts_decorate([mediaObjectModule.Action('fetchAll')], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles.prototype, "fetchMediaObjects", void 0);

FileNavigatorFilesvue_type_script_lang_ts_decorate([mediaObjectModule.Getter('list')], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles.prototype, "mediaObjects", void 0);

FileNavigatorFilesvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Watch"])('mediaNode')], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles.prototype, "onMediaNodeChange", null);

FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles = FileNavigatorFilesvue_type_script_lang_ts_decorate([external_nuxt_property_decorator_["Component"]], FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles);
/* harmony default export */ var FileNavigatorFilesvue_type_script_lang_ts_ = (FileNavigatorFilesvue_type_script_lang_ts_FileNavigatorFiles);
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorFiles.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorFilesvue_type_script_lang_ts_ = (FileNavigatorFilesvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTooltip/VTooltip.js
var VTooltip = __webpack_require__(350);

// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorFiles.vue



function FileNavigatorFiles_injectStyles (context) {
  
  
}

/* normalize component */

var FileNavigatorFiles_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorFilesvue_type_script_lang_ts_,
  FileNavigatorFilesvue_type_template_id_39f58680_scoped_true_render,
  FileNavigatorFilesvue_type_template_id_39f58680_scoped_true_staticRenderFns,
  false,
  FileNavigatorFiles_injectStyles,
  "39f58680",
  "64d7f2a7"
  
)

/* harmony default export */ var file_navigator_FileNavigatorFiles = (FileNavigatorFiles_component.exports);

/* vuetify-loader */












installComponents_default()(FileNavigatorFiles_component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardTitle: components_VCard["c" /* VCardTitle */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VIcon: VIcon["a" /* default */],VImg: VImg["a" /* default */],VRow: VRow["a" /* default */],VSpacer: VSpacer["a" /* default */],VTooltip: VTooltip["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=template&id=5202e82a&scoped=true&
var FileNavigatorContextMenuvue_type_template_id_5202e82a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"context-menu",attrs:{"id":"file-navigator-context-menu","tile":""}},[_c('v-list',{attrs:{"dense":""}},[_c('v-list-item-group',{attrs:{"color":"primary"}},[(_vm.mediaNode)?_c('v-dialog',{attrs:{"width":"500"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [_c('v-list-item',_vm._g(_vm._b({},'v-list-item',attrs,false),on),[_c('v-list-item-icon',[_c('v-icon',[_vm._v("ri-folder-add-fill")])],1),_vm._v(" "),_c('v-list-item-content',[_vm._v("\n              Nouveau dossier\n            ")])],1)]}}],null,false,4239326002),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-card',[_c('v-card-title',{staticClass:"headline grey lighten-2"},[_vm._v("\n            Ajouter un dossier\n          ")]),_vm._v(" "),_c('v-card-text',[_c('v-form',[_c('v-text-field',{attrs:{"label":"Nom du dossier","required":""},model:{value:(_vm.newFolderName),callback:function ($$v) {_vm.newFolderName=$$v},expression:"newFolderName"}})],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary","text":""},on:{"click":_vm.onFolderCreate}},[_vm._v("\n              Créer le dossier\n            ")])],1)],1)],1):_vm._e()],1)],1)],1)}
var FileNavigatorContextMenuvue_type_template_id_5202e82a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=template&id=5202e82a&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=script&lang=ts&
var FileNavigatorContextMenuvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const mediaNodeModule = Object(external_nuxt_property_decorator_["namespace"])('media_node');
let FileNavigatorContextMenuvue_type_script_lang_ts_FileNavigatorFolders = class FileNavigatorFolders extends external_nuxt_property_decorator_["Vue"] {
  constructor() {
    super(...arguments);
    this.contextMenu = null;
    this.dialog = false;
    this.newFolderName = null;
  }

  showMenu(event) {
    var _a, _b;

    if (!this.contextMenu) {
      return;
    }

    if (this.contextMenu.offsetWidth + event.pageX >= window.innerWidth) {
      this.contextMenu.style.left = event.pageX - this.contextMenu.offsetWidth + 2 + 'px';
    } else {
      this.contextMenu.style.left = event.pageX - 2 + 'px';
    }

    if (((_a = this.contextMenu) === null || _a === void 0 ? void 0 : _a.offsetHeight) + event.pageY >= window.innerHeight) {
      this.contextMenu.style.top = event.pageY - ((_b = this.contextMenu) === null || _b === void 0 ? void 0 : _b.offsetHeight) + 2 + 'px';
    } else {
      this.contextMenu.style.top = event.pageY - 2 + 'px';
    }

    this.contextMenu.classList.add('context-menu--active');
  }

  hideMenu() {
    if (!this.contextMenu) {
      return;
    }

    this.contextMenu.style.left = '0px';
    this.contextMenu.style.top = '0px';
    this.contextMenu.classList.remove('context-menu--active');
  }

  onClick(e) {
    if (!e.target || !this.contextMenu) {
      return;
    }

    if (!this.contextMenu.contains(e.target)) {
      this.hideMenu();
    }
  }

  mounted() {
    this.contextMenu = document.getElementById('file-navigator-context-menu');
    document.addEventListener(document.ontouchstart !== null ? 'click' : 'touchstart', this.onClick, false);
  }

  async onFolderCreate() {
    this.dialog = false;

    if (!this.newFolderName || !this.mediaNode) {
      return;
    }

    await this.create({
      name: this.newFolderName,
      parent: this.mediaNode['@id']
    });
    const parent = this.$parent;
    await parent.refresh();
  }

};

FileNavigatorContextMenuvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: false
})], FileNavigatorContextMenuvue_type_script_lang_ts_FileNavigatorFolders.prototype, "mediaNode", void 0);

FileNavigatorContextMenuvue_type_script_lang_ts_decorate([mediaNodeModule.Action('create')], FileNavigatorContextMenuvue_type_script_lang_ts_FileNavigatorFolders.prototype, "create", void 0);

FileNavigatorContextMenuvue_type_script_lang_ts_FileNavigatorFolders = FileNavigatorContextMenuvue_type_script_lang_ts_decorate([external_nuxt_property_decorator_["Component"]], FileNavigatorContextMenuvue_type_script_lang_ts_FileNavigatorFolders);
/* harmony default export */ var FileNavigatorContextMenuvue_type_script_lang_ts_ = (FileNavigatorContextMenuvue_type_script_lang_ts_FileNavigatorFolders);
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorContextMenuvue_type_script_lang_ts_ = (FileNavigatorContextMenuvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(279);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(211);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VForm/VForm.js
var VForm = __webpack_require__(239);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
var VList = __webpack_require__(64);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItem.js
var VListItem = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 3 modules
var components_VList = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItemGroup.js
var VListItemGroup = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItemIcon.js
var VListItemIcon = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.js + 4 modules
var VTextField = __webpack_require__(210);

// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigatorContextMenu.vue



function FileNavigatorContextMenu_injectStyles (context) {
  
  var style0 = __webpack_require__(314)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var FileNavigatorContextMenu_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorContextMenuvue_type_script_lang_ts_,
  FileNavigatorContextMenuvue_type_template_id_5202e82a_scoped_true_render,
  FileNavigatorContextMenuvue_type_template_id_5202e82a_scoped_true_staticRenderFns,
  false,
  FileNavigatorContextMenu_injectStyles,
  "5202e82a",
  "99d03b44"
  
)

/* harmony default export */ var FileNavigatorContextMenu = (FileNavigatorContextMenu_component.exports);

/* vuetify-loader */

















installComponents_default()(FileNavigatorContextMenu_component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["b" /* VCardText */],VCardTitle: components_VCard["c" /* VCardTitle */],VDialog: VDialog["a" /* default */],VDivider: VDivider["a" /* default */],VForm: VForm["a" /* default */],VIcon: VIcon["a" /* default */],VList: VList["a" /* default */],VListItem: VListItem["a" /* default */],VListItemContent: components_VList["a" /* VListItemContent */],VListItemGroup: VListItemGroup["a" /* default */],VListItemIcon: VListItemIcon["a" /* default */],VSpacer: VSpacer["a" /* default */],VTextField: VTextField["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_navigator/FileNavigator.vue?vue&type=script&lang=ts&
var FileNavigatorvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






const FileNavigatorvue_type_script_lang_ts_mediaNodeModule = Object(external_nuxt_property_decorator_["namespace"])('media_node');
const FileNavigatorvue_type_script_lang_ts_mediaObjectModule = Object(external_nuxt_property_decorator_["namespace"])('media_object');
let FileNavigatorvue_type_script_lang_ts_FileNavigator = class FileNavigator extends external_nuxt_property_decorator_["Vue"] {
  async fetch() {
    return await this.fetchRootMediaNode({
      'exists[parent]': 'false'
    });
  }

  async handleMediaNodeClick(id) {
    this.resetMediaObjects();
    this.$emit('update:current-media-node', await this.fetchMediaNode(id));
  }

  handleRootClick() {
    this.$emit('update:current-media-node', null);
    this.closeDetailPanel();
  }

  async refresh() {
    if (!this.currentMediaNode) {
      return;
    }

    this.$emit('update:current-media-node', await this.fetchMediaNode(this.currentMediaNode['@id']));
    this.$nextTick(() => {
      this.reload();
    });
  }

  reload() {
    const savedMediaNode = this.currentMediaNode;
    this.$emit('update:current-media-node', null);
    this.$nextTick(() => {
      this.$emit('update:current-media-node', savedMediaNode);
    });
  }

  onRightClick(e) {
    const fileNavigatorContextMenu = this.$refs['file-navigator-context-menu'];
    fileNavigatorContextMenu.showMenu(e);
  }

};

FileNavigatorvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: false
})], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "currentMediaNode", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "editClickHandler", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Function,
  required: true
})], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "selectClickHandler", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: String,
  required: false,
  default: null
})], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "rootName", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["InjectReactive"])()], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "closeDetailPanel", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([FileNavigatorvue_type_script_lang_ts_mediaNodeModule.Action('fetchAll')], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "fetchRootMediaNode", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([FileNavigatorvue_type_script_lang_ts_mediaNodeModule.Action('load')], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "fetchMediaNode", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([FileNavigatorvue_type_script_lang_ts_mediaNodeModule.Getter('list')], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "rootMediaNodes", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([FileNavigatorvue_type_script_lang_ts_mediaNodeModule.Getter('find')], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "findMediaGalleriesById", void 0);

FileNavigatorvue_type_script_lang_ts_decorate([FileNavigatorvue_type_script_lang_ts_mediaObjectModule.Action('resetList')], FileNavigatorvue_type_script_lang_ts_FileNavigator.prototype, "resetMediaObjects", void 0);

FileNavigatorvue_type_script_lang_ts_FileNavigator = FileNavigatorvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Component"])({
  components: {
    FileNavigatorBreadCrumb: FileNavigatorBreadCrumb,
    FileNavigatorFolders: file_navigator_FileNavigatorFolders,
    FileNavigatorFiles: file_navigator_FileNavigatorFiles,
    FileNavigatorContextMenu: FileNavigatorContextMenu
  }
})], FileNavigatorvue_type_script_lang_ts_FileNavigator);
/* harmony default export */ var FileNavigatorvue_type_script_lang_ts_ = (FileNavigatorvue_type_script_lang_ts_FileNavigator);
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigator.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorvue_type_script_lang_ts_ = (FileNavigatorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file_manager/file_navigator/FileNavigator.vue



function FileNavigator_injectStyles (context) {
  
  var style0 = __webpack_require__(316)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var FileNavigator_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorvue_type_script_lang_ts_,
  FileNavigatorvue_type_template_id_6f80d915_scoped_true_render,
  FileNavigatorvue_type_template_id_6f80d915_scoped_true_staticRenderFns,
  false,
  FileNavigator_injectStyles,
  "6f80d915",
  "c3a55340"
  
)

/* harmony default export */ var file_navigator_FileNavigator = (FileNavigator_component.exports);

/* vuetify-loader */





installComponents_default()(FileNavigator_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_details/FileDetails.vue?vue&type=template&id=2ee61804&
var FileDetailsvue_type_template_id_2ee61804_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('h3',[_vm._v("\n        Détail du fichier\n        "),_c('v-btn',{attrs:{"rounded":"","right":"","fixed":"","small":"","color":"error"},on:{"click":_vm.closeDetailPanel}},[_c('v-icon',[_vm._v("\n            ri-close-line\n          ")])],1)],1)])],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('file-details-form',{ref:"updateForm",attrs:{"tree":_vm.tree,"values":_vm.item,"errors":_vm.violations}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('Toolbar',{attrs:{"handle-submit":_vm.onSendForm}})],1)],1)],1)}
var FileDetailsvue_type_template_id_2ee61804_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_details/FileDetails.vue?vue&type=template&id=2ee61804&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_details/FileDetailsForm.vue?vue&type=template&id=4831c418&
var FileDetailsFormvue_type_template_id_4831c418_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-form',[_c('v-container',[_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('v-text-field',{attrs:{"label":"Identifiant unique","disabled":""},model:{value:(_vm.item.uniqueId),callback:function ($$v) {_vm.$set(_vm.item, "uniqueId", $$v)},expression:"item.uniqueId"}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('v-text-field',{attrs:{"label":"Nom personnalisé","error-messages":_vm.customNameErrors,"required":""},on:{"input":function($event){return _vm.$v.item.customName.$touch()},"blur":function($event){return _vm.$v.item.customName.$touch()}},model:{value:(_vm.item.customName),callback:function ($$v) {_vm.$set(_vm.item, "customName", $$v)},expression:"item.customName"}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12","md":"12"}},[_c('p',[_vm._v("Appartient aux catégories...")]),_vm._v(" "),(_vm.errors && _vm.errors.mediaNodes)?_c('p',{staticClass:"error--text"},[_vm._v("\n          "+_vm._s(_vm.errors.mediaNodes)+"\n        ")]):_vm._e(),_vm._v(" "),_c('v-treeview',{attrs:{"items":_vm.tree,"selectable":"","rounded":"","hoverable":"","open-all":"","selection-type":"independent","item-key":"@id"},model:{value:(_vm.item.mediaNodes),callback:function ($$v) {_vm.$set(_vm.item, "mediaNodes", $$v)},expression:"item.mediaNodes"}})],1)],1)],1)],1)}
var FileDetailsFormvue_type_template_id_4831c418_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file_manager/file_details/FileDetailsForm.vue?vue&type=template&id=4831c418&

// EXTERNAL MODULE: external "vuelidate/lib/validators"
var validators_ = __webpack_require__(82);

// EXTERNAL MODULE: external "lodash/has"
var has_ = __webpack_require__(48);
var has_default = /*#__PURE__*/__webpack_require__.n(has_);

// EXTERNAL MODULE: external "vuelidate"
var external_vuelidate_ = __webpack_require__(79);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_details/FileDetailsForm.vue?vue&type=script&lang=ts&
var FileDetailsFormvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let FileDetailsFormvue_type_script_lang_ts_FileDetailsForm = class FileDetailsForm extends Object(external_nuxt_property_decorator_["mixins"])(external_vuelidate_["validationMixin"]) {
  get item() {
    return this.values;
  }

  get customNameErrors() {
    const errors = [];

    if (!this.$v.item.customName || !this.$v.item.customName.$dirty) {
      return errors;
    }

    has_default()(this.violations, 'customName') && errors.push(this.violations.customName);
    !this.$v.item.customName.minLength && errors.push('Le nom personnalisé doit faire au moins 3 caractères');
    return errors;
  }

  get mediaNodesErrors() {
    const errors = [];

    if (!this.$v.item.mediaNodes || !this.$v.item.mediaNodes.$dirty) {
      return errors;
    }

    has_default()(this.violations, 'mediaNodes') && errors.push(this.violations.mediaNodes);
    !this.$v.item.mediaNodes.minLength && errors.push('Le fichier doit appartenir a au moins une galerie');
    return errors;
  }

  get violations() {
    return this.errors || {};
  }

};

FileDetailsFormvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: true
})], FileDetailsFormvue_type_script_lang_ts_FileDetailsForm.prototype, "values", void 0);

FileDetailsFormvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  default: () => {}
})], FileDetailsFormvue_type_script_lang_ts_FileDetailsForm.prototype, "errors", void 0);

FileDetailsFormvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Array,
  default: () => []
})], FileDetailsFormvue_type_script_lang_ts_FileDetailsForm.prototype, "tree", void 0);

FileDetailsFormvue_type_script_lang_ts_FileDetailsForm = FileDetailsFormvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Component"])({
  name: 'AdminPageForm',
  validations: {
    item: {
      customName: {
        minLength: Object(validators_["minLength"])(3)
      },
      mediaNodes: {
        minLength: Object(validators_["minLength"])(1)
      }
    }
  }
})], FileDetailsFormvue_type_script_lang_ts_FileDetailsForm);
/* harmony default export */ var FileDetailsFormvue_type_script_lang_ts_ = (FileDetailsFormvue_type_script_lang_ts_FileDetailsForm);
// CONCATENATED MODULE: ./app/components/file_manager/file_details/FileDetailsForm.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_details_FileDetailsFormvue_type_script_lang_ts_ = (FileDetailsFormvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VTreeview/VTreeview.sass
var VTreeview = __webpack_require__(318);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/transitions/index.js + 2 modules
var transitions = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/registrable/index.js
var registrable = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VTreeview/VTreeviewNode.js
// Components

 // Mixins


 // Utils



const baseMixins = Object(mixins["a" /* default */])(colorable["a" /* default */], Object(registrable["a" /* inject */])('treeview'));
const VTreeviewNodeProps = {
  activatable: Boolean,
  activeClass: {
    type: String,
    default: 'v-treeview-node--active'
  },
  color: {
    type: String,
    default: 'primary'
  },
  expandIcon: {
    type: String,
    default: '$subgroup'
  },
  indeterminateIcon: {
    type: String,
    default: '$checkboxIndeterminate'
  },
  itemChildren: {
    type: String,
    default: 'children'
  },
  itemDisabled: {
    type: String,
    default: 'disabled'
  },
  itemKey: {
    type: String,
    default: 'id'
  },
  itemText: {
    type: String,
    default: 'name'
  },
  loadChildren: Function,
  loadingIcon: {
    type: String,
    default: '$loading'
  },
  offIcon: {
    type: String,
    default: '$checkboxOff'
  },
  onIcon: {
    type: String,
    default: '$checkboxOn'
  },
  openOnClick: Boolean,
  rounded: Boolean,
  selectable: Boolean,
  selectedColor: {
    type: String,
    default: 'accent'
  },
  shaped: Boolean,
  transition: Boolean,
  selectionType: {
    type: String,
    default: 'leaf',
    validator: v => ['leaf', 'independent'].includes(v)
  }
};
/* @vue/component */

const VTreeviewNode = baseMixins.extend().extend({
  name: 'v-treeview-node',
  inject: {
    treeview: {
      default: null
    }
  },
  props: {
    level: Number,
    item: {
      type: Object,
      default: () => null
    },
    parentIsDisabled: Boolean,
    ...VTreeviewNodeProps
  },
  data: () => ({
    hasLoaded: false,
    isActive: false,
    isIndeterminate: false,
    isLoading: false,
    isOpen: false,
    isSelected: false
  }),
  computed: {
    disabled() {
      return Object(helpers["q" /* getObjectValueByPath */])(this.item, this.itemDisabled) || this.parentIsDisabled && this.selectionType === 'leaf';
    },

    key() {
      return Object(helpers["q" /* getObjectValueByPath */])(this.item, this.itemKey);
    },

    children() {
      const children = Object(helpers["q" /* getObjectValueByPath */])(this.item, this.itemChildren);
      return children && children.filter(child => !this.treeview.isExcluded(Object(helpers["q" /* getObjectValueByPath */])(child, this.itemKey)));
    },

    text() {
      return Object(helpers["q" /* getObjectValueByPath */])(this.item, this.itemText);
    },

    scopedProps() {
      return {
        item: this.item,
        leaf: !this.children,
        selected: this.isSelected,
        indeterminate: this.isIndeterminate,
        active: this.isActive,
        open: this.isOpen
      };
    },

    computedIcon() {
      if (this.isIndeterminate) return this.indeterminateIcon;else if (this.isSelected) return this.onIcon;else return this.offIcon;
    },

    hasChildren() {
      return !!this.children && (!!this.children.length || !!this.loadChildren);
    }

  },

  created() {
    this.treeview.register(this);
  },

  beforeDestroy() {
    this.treeview.unregister(this);
  },

  methods: {
    checkChildren() {
      return new Promise(resolve => {
        // TODO: Potential issue with always trying
        // to load children if response is empty?
        if (!this.children || this.children.length || !this.loadChildren || this.hasLoaded) return resolve();
        this.isLoading = true;
        resolve(this.loadChildren(this.item));
      }).then(() => {
        this.isLoading = false;
        this.hasLoaded = true;
      });
    },

    open() {
      this.isOpen = !this.isOpen;
      this.treeview.updateOpen(this.key, this.isOpen);
      this.treeview.emitOpen();
    },

    genLabel() {
      const children = [];
      if (this.$scopedSlots.label) children.push(this.$scopedSlots.label(this.scopedProps));else children.push(this.text);
      return this.$createElement('div', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, children);
    },

    genPrependSlot() {
      if (!this.$scopedSlots.prepend) return null;
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__prepend'
      }, this.$scopedSlots.prepend(this.scopedProps));
    },

    genAppendSlot() {
      if (!this.$scopedSlots.append) return null;
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__append'
      }, this.$scopedSlots.append(this.scopedProps));
    },

    genContent() {
      const children = [this.genPrependSlot(), this.genLabel(), this.genAppendSlot()];
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__content'
      }, children);
    },

    genToggle() {
      return this.$createElement(VIcon["a" /* default */], {
        staticClass: 'v-treeview-node__toggle',
        class: {
          'v-treeview-node__toggle--open': this.isOpen,
          'v-treeview-node__toggle--loading': this.isLoading
        },
        slot: 'prepend',
        on: {
          click: e => {
            e.stopPropagation();
            if (this.isLoading) return;
            this.checkChildren().then(() => this.open());
          }
        }
      }, [this.isLoading ? this.loadingIcon : this.expandIcon]);
    },

    genCheckbox() {
      return this.$createElement(VIcon["a" /* default */], {
        staticClass: 'v-treeview-node__checkbox',
        props: {
          color: this.isSelected || this.isIndeterminate ? this.selectedColor : undefined,
          disabled: this.disabled
        },
        on: {
          click: e => {
            e.stopPropagation();
            if (this.isLoading) return;
            this.checkChildren().then(() => {
              // We nextTick here so that items watch in VTreeview has a chance to run first
              this.$nextTick(() => {
                this.isSelected = !this.isSelected;
                this.isIndeterminate = false;
                this.treeview.updateSelected(this.key, this.isSelected);
                this.treeview.emitSelected();
              });
            });
          }
        }
      }, [this.computedIcon]);
    },

    genLevel(level) {
      return Object(helpers["i" /* createRange */])(level).map(() => this.$createElement('div', {
        staticClass: 'v-treeview-node__level'
      }));
    },

    genNode() {
      const children = [this.genContent()];
      if (this.selectable) children.unshift(this.genCheckbox());

      if (this.hasChildren) {
        children.unshift(this.genToggle());
      } else {
        children.unshift(...this.genLevel(1));
      }

      children.unshift(...this.genLevel(this.level));
      return this.$createElement('div', this.setTextColor(this.isActive && this.color, {
        staticClass: 'v-treeview-node__root',
        class: {
          [this.activeClass]: this.isActive
        },
        on: {
          click: () => {
            if (this.openOnClick && this.hasChildren) {
              this.checkChildren().then(this.open);
            } else if (this.activatable && !this.disabled) {
              this.isActive = !this.isActive;
              this.treeview.updateActive(this.key, this.isActive);
              this.treeview.emitActive();
            }
          }
        }
      }), children);
    },

    genChild(item, parentIsDisabled) {
      return this.$createElement(VTreeviewNode, {
        key: Object(helpers["q" /* getObjectValueByPath */])(item, this.itemKey),
        props: {
          activatable: this.activatable,
          activeClass: this.activeClass,
          item,
          selectable: this.selectable,
          selectedColor: this.selectedColor,
          color: this.color,
          expandIcon: this.expandIcon,
          indeterminateIcon: this.indeterminateIcon,
          offIcon: this.offIcon,
          onIcon: this.onIcon,
          loadingIcon: this.loadingIcon,
          itemKey: this.itemKey,
          itemText: this.itemText,
          itemDisabled: this.itemDisabled,
          itemChildren: this.itemChildren,
          loadChildren: this.loadChildren,
          transition: this.transition,
          openOnClick: this.openOnClick,
          rounded: this.rounded,
          shaped: this.shaped,
          level: this.level + 1,
          selectionType: this.selectionType,
          parentIsDisabled
        },
        scopedSlots: this.$scopedSlots
      });
    },

    genChildrenWrapper() {
      if (!this.isOpen || !this.children) return null;
      const children = [this.children.map(c => this.genChild(c, this.disabled))];
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children'
      }, children);
    },

    genTransition() {
      return this.$createElement(transitions["a" /* VExpandTransition */], [this.genChildrenWrapper()]);
    }

  },

  render(h) {
    const children = [this.genNode()];
    if (this.transition) children.push(this.genTransition());else children.push(this.genChildrenWrapper());
    return h('div', {
      staticClass: 'v-treeview-node',
      class: {
        'v-treeview-node--leaf': !this.hasChildren,
        'v-treeview-node--click': this.openOnClick,
        'v-treeview-node--disabled': this.disabled,
        'v-treeview-node--rounded': this.rounded,
        'v-treeview-node--shaped': this.shaped,
        'v-treeview-node--selected': this.isSelected
      },
      attrs: {
        'aria-expanded': String(this.isOpen)
      }
    }, children);
  }

});
/* harmony default export */ var VTreeview_VTreeviewNode = (VTreeviewNode);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js
var themeable = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var console = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VTreeview/util/filterTreeItems.js

function filterTreeItem(item, search, textKey) {
  const text = Object(helpers["q" /* getObjectValueByPath */])(item, textKey);
  return text.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1;
}
function filterTreeItems(filter, item, search, idKey, textKey, childrenKey, excluded) {
  if (filter(item, search, textKey)) {
    return true;
  }

  const children = Object(helpers["q" /* getObjectValueByPath */])(item, childrenKey);

  if (children) {
    let match = false;

    for (let i = 0; i < children.length; i++) {
      if (filterTreeItems(filter, children[i], search, idKey, textKey, childrenKey, excluded)) {
        match = true;
      }
    }

    if (match) return true;
  }

  excluded.add(Object(helpers["q" /* getObjectValueByPath */])(item, idKey));
  return false;
}
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VTreeview/VTreeview.js
// Styles
 // Components

 // Mixins


 // Utils





/* harmony default export */ var VTreeview_VTreeview = (Object(mixins["a" /* default */])(Object(registrable["b" /* provide */])('treeview'), themeable["a" /* default */]
/* @vue/component */
).extend({
  name: 'v-treeview',

  provide() {
    return {
      treeview: this
    };
  },

  props: {
    active: {
      type: Array,
      default: () => []
    },
    dense: Boolean,
    filter: Function,
    hoverable: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    multipleActive: Boolean,
    open: {
      type: Array,
      default: () => []
    },
    openAll: Boolean,
    returnObject: {
      type: Boolean,
      default: false
    },
    search: String,
    value: {
      type: Array,
      default: () => []
    },
    ...VTreeviewNodeProps
  },
  data: () => ({
    level: -1,
    activeCache: new Set(),
    nodes: {},
    openCache: new Set(),
    selectedCache: new Set()
  }),
  computed: {
    excludedItems() {
      const excluded = new Set();
      if (!this.search) return excluded;

      for (let i = 0; i < this.items.length; i++) {
        filterTreeItems(this.filter || filterTreeItem, this.items[i], this.search, this.itemKey, this.itemText, this.itemChildren, excluded);
      }

      return excluded;
    }

  },
  watch: {
    items: {
      handler() {
        const oldKeys = Object.keys(this.nodes).map(k => Object(helpers["q" /* getObjectValueByPath */])(this.nodes[k].item, this.itemKey));
        const newKeys = this.getKeys(this.items);
        const diff = Object(helpers["c" /* arrayDiff */])(newKeys, oldKeys); // We only want to do stuff if items have changed

        if (!diff.length && newKeys.length < oldKeys.length) return; // If nodes are removed we need to clear them from this.nodes

        diff.forEach(k => delete this.nodes[k]);
        const oldSelectedCache = [...this.selectedCache];
        this.selectedCache = new Set();
        this.activeCache = new Set();
        this.openCache = new Set();
        this.buildTree(this.items); // Only emit selected if selection has changed
        // as a result of items changing. This fixes a
        // potential double emit when selecting a node
        // with dynamic children

        if (!Object(helpers["k" /* deepEqual */])(oldSelectedCache, [...this.selectedCache])) this.emitSelected();
      },

      deep: true
    },

    active(value) {
      this.handleNodeCacheWatcher(value, this.activeCache, this.updateActive, this.emitActive);
    },

    value(value) {
      this.handleNodeCacheWatcher(value, this.selectedCache, this.updateSelected, this.emitSelected);
    },

    open(value) {
      this.handleNodeCacheWatcher(value, this.openCache, this.updateOpen, this.emitOpen);
    }

  },

  created() {
    const getValue = key => this.returnObject ? Object(helpers["q" /* getObjectValueByPath */])(key, this.itemKey) : key;

    this.buildTree(this.items);

    for (const value of this.value.map(getValue)) {
      this.updateSelected(value, true, true);
    }

    for (const active of this.active.map(getValue)) {
      this.updateActive(active, true);
    }
  },

  mounted() {
    // Save the developer from themselves
    if (this.$slots.prepend || this.$slots.append) {
      Object(console["c" /* consoleWarn */])('The prepend and append slots require a slot-scope attribute', this);
    }

    if (this.openAll) {
      this.updateAll(true);
    } else {
      this.open.forEach(key => this.updateOpen(this.returnObject ? Object(helpers["q" /* getObjectValueByPath */])(key, this.itemKey) : key, true));
      this.emitOpen();
    }
  },

  methods: {
    /** @public */
    updateAll(value) {
      Object.keys(this.nodes).forEach(key => this.updateOpen(Object(helpers["q" /* getObjectValueByPath */])(this.nodes[key].item, this.itemKey), value));
      this.emitOpen();
    },

    getKeys(items, keys = []) {
      for (let i = 0; i < items.length; i++) {
        const key = Object(helpers["q" /* getObjectValueByPath */])(items[i], this.itemKey);
        keys.push(key);
        const children = Object(helpers["q" /* getObjectValueByPath */])(items[i], this.itemChildren);

        if (children) {
          keys.push(...this.getKeys(children));
        }
      }

      return keys;
    },

    buildTree(items, parent = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const key = Object(helpers["q" /* getObjectValueByPath */])(item, this.itemKey);
        const children = Object(helpers["q" /* getObjectValueByPath */])(item, this.itemChildren, []);
        const oldNode = this.nodes.hasOwnProperty(key) ? this.nodes[key] : {
          isSelected: false,
          isIndeterminate: false,
          isActive: false,
          isOpen: false,
          vnode: null
        };
        const node = {
          vnode: oldNode.vnode,
          parent,
          children: children.map(c => Object(helpers["q" /* getObjectValueByPath */])(c, this.itemKey)),
          item
        };
        this.buildTree(children, key); // This fixed bug with dynamic children resetting selected parent state

        if (!this.nodes.hasOwnProperty(key) && parent !== null && this.nodes.hasOwnProperty(parent)) {
          node.isSelected = this.nodes[parent].isSelected;
        } else {
          node.isSelected = oldNode.isSelected;
          node.isIndeterminate = oldNode.isIndeterminate;
        }

        node.isActive = oldNode.isActive;
        node.isOpen = oldNode.isOpen;
        this.nodes[key] = node;

        if (children.length) {
          const {
            isSelected,
            isIndeterminate
          } = this.calculateState(key, this.nodes);
          node.isSelected = isSelected;
          node.isIndeterminate = isIndeterminate;
        } // Don't forget to rebuild cache


        if (this.nodes[key].isSelected && (this.selectionType === 'independent' || node.children.length === 0)) this.selectedCache.add(key);
        if (this.nodes[key].isActive) this.activeCache.add(key);
        if (this.nodes[key].isOpen) this.openCache.add(key);
        this.updateVnodeState(key);
      }
    },

    calculateState(node, state) {
      const children = state[node].children;
      const counts = children.reduce((counts, child) => {
        counts[0] += +Boolean(state[child].isSelected);
        counts[1] += +Boolean(state[child].isIndeterminate);
        return counts;
      }, [0, 0]);
      const isSelected = !!children.length && counts[0] === children.length;
      const isIndeterminate = !isSelected && (counts[0] > 0 || counts[1] > 0);
      return {
        isSelected,
        isIndeterminate
      };
    },

    emitOpen() {
      this.emitNodeCache('update:open', this.openCache);
    },

    emitSelected() {
      this.emitNodeCache('input', this.selectedCache);
    },

    emitActive() {
      this.emitNodeCache('update:active', this.activeCache);
    },

    emitNodeCache(event, cache) {
      this.$emit(event, this.returnObject ? [...cache].map(key => this.nodes[key].item) : [...cache]);
    },

    handleNodeCacheWatcher(value, cache, updateFn, emitFn) {
      value = this.returnObject ? value.map(v => Object(helpers["q" /* getObjectValueByPath */])(v, this.itemKey)) : value;
      const old = [...cache];
      if (Object(helpers["k" /* deepEqual */])(old, value)) return;
      old.forEach(key => updateFn(key, false));
      value.forEach(key => updateFn(key, true));
      emitFn();
    },

    getDescendants(key, descendants = []) {
      const children = this.nodes[key].children;
      descendants.push(...children);

      for (let i = 0; i < children.length; i++) {
        descendants = this.getDescendants(children[i], descendants);
      }

      return descendants;
    },

    getParents(key) {
      let parent = this.nodes[key].parent;
      const parents = [];

      while (parent !== null) {
        parents.push(parent);
        parent = this.nodes[parent].parent;
      }

      return parents;
    },

    register(node) {
      const key = Object(helpers["q" /* getObjectValueByPath */])(node.item, this.itemKey);
      this.nodes[key].vnode = node;
      this.updateVnodeState(key);
    },

    unregister(node) {
      const key = Object(helpers["q" /* getObjectValueByPath */])(node.item, this.itemKey);
      if (this.nodes[key]) this.nodes[key].vnode = null;
    },

    isParent(key) {
      return this.nodes[key].children && this.nodes[key].children.length;
    },

    updateActive(key, isActive) {
      if (!this.nodes.hasOwnProperty(key)) return;

      if (!this.multipleActive) {
        this.activeCache.forEach(active => {
          this.nodes[active].isActive = false;
          this.updateVnodeState(active);
          this.activeCache.delete(active);
        });
      }

      const node = this.nodes[key];
      if (!node) return;
      if (isActive) this.activeCache.add(key);else this.activeCache.delete(key);
      node.isActive = isActive;
      this.updateVnodeState(key);
    },

    updateSelected(key, isSelected, isForced = false) {
      if (!this.nodes.hasOwnProperty(key)) return;
      const changed = new Map();

      if (this.selectionType !== 'independent') {
        for (const descendant of this.getDescendants(key)) {
          if (!Object(helpers["q" /* getObjectValueByPath */])(this.nodes[descendant].item, this.itemDisabled) || isForced) {
            this.nodes[descendant].isSelected = isSelected;
            this.nodes[descendant].isIndeterminate = false;
            changed.set(descendant, isSelected);
          }
        }

        const calculated = this.calculateState(key, this.nodes);
        this.nodes[key].isSelected = isSelected;
        this.nodes[key].isIndeterminate = calculated.isIndeterminate;
        changed.set(key, isSelected);

        for (const parent of this.getParents(key)) {
          const calculated = this.calculateState(parent, this.nodes);
          this.nodes[parent].isSelected = calculated.isSelected;
          this.nodes[parent].isIndeterminate = calculated.isIndeterminate;
          changed.set(parent, calculated.isSelected);
        }
      } else {
        this.nodes[key].isSelected = isSelected;
        this.nodes[key].isIndeterminate = false;
        changed.set(key, isSelected);
      }

      for (const [key, value] of changed.entries()) {
        this.updateVnodeState(key);
        if (this.selectionType === 'leaf' && this.isParent(key)) continue;
        value === true ? this.selectedCache.add(key) : this.selectedCache.delete(key);
      }
    },

    updateOpen(key, isOpen) {
      if (!this.nodes.hasOwnProperty(key)) return;
      const node = this.nodes[key];
      const children = Object(helpers["q" /* getObjectValueByPath */])(node.item, this.itemChildren);

      if (children && !children.length && node.vnode && !node.vnode.hasLoaded) {
        node.vnode.checkChildren().then(() => this.updateOpen(key, isOpen));
      } else if (children && children.length) {
        node.isOpen = isOpen;
        node.isOpen ? this.openCache.add(key) : this.openCache.delete(key);
        this.updateVnodeState(key);
      }
    },

    updateVnodeState(key) {
      const node = this.nodes[key];

      if (node && node.vnode) {
        node.vnode.isSelected = node.isSelected;
        node.vnode.isIndeterminate = node.isIndeterminate;
        node.vnode.isActive = node.isActive;
        node.vnode.isOpen = node.isOpen;
      }
    },

    isExcluded(key) {
      return !!this.search && this.excludedItems.has(key);
    }

  },

  render(h) {
    const children = this.items.length ? this.items.filter(item => {
      return !this.isExcluded(Object(helpers["q" /* getObjectValueByPath */])(item, this.itemKey));
    }).map(item => {
      const genChild = VTreeview_VTreeviewNode.options.methods.genChild.bind(this);
      return genChild(item, Object(helpers["q" /* getObjectValueByPath */])(item, this.itemDisabled));
    })
    /* istanbul ignore next */
    : this.$slots.default; // TODO: remove type annotation with TS 3.2

    return h('div', {
      staticClass: 'v-treeview',
      class: {
        'v-treeview--hoverable': this.hoverable,
        'v-treeview--dense': this.dense,
        ...this.themeClasses
      }
    }, children);
  }

}));
// CONCATENATED MODULE: ./app/components/file_manager/file_details/FileDetailsForm.vue





/* normalize component */

var FileDetailsForm_component = Object(componentNormalizer["a" /* default */])(
  file_details_FileDetailsFormvue_type_script_lang_ts_,
  FileDetailsFormvue_type_template_id_4831c418_render,
  FileDetailsFormvue_type_template_id_4831c418_staticRenderFns,
  false,
  null,
  null,
  "2efa801a"
  
)

/* harmony default export */ var file_details_FileDetailsForm = (FileDetailsForm_component.exports);

/* vuetify-loader */







installComponents_default()(FileDetailsForm_component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VForm: VForm["a" /* default */],VRow: VRow["a" /* default */],VTextField: VTextField["a" /* default */],VTreeview: VTreeview_VTreeview})

// EXTERNAL MODULE: ./app/components/form/Toolbar.vue + 4 modules
var Toolbar = __webpack_require__(261);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/file_details/FileDetails.vue?vue&type=script&lang=ts&
var FileDetailsvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const FileDetailsvue_type_script_lang_ts_mediaNodeModule = Object(external_nuxt_property_decorator_["namespace"])('media_node');
const FileDetailsvue_type_script_lang_ts_mediaObjectModule = Object(external_nuxt_property_decorator_["namespace"])('media_object');
let FileDetailsvue_type_script_lang_ts_FileDetails = class FileDetails extends external_nuxt_property_decorator_["Vue"] {
  constructor() {
    super(...arguments);
    this.item = { ...this.mediaObject
    };
  }

  onRetrieved(val) {
    this.item = { ...val
    };
  }

  async fetch() {
    if (this.tree.length === 0) {
      await this.fetchTree(this.$getRepository('media_nodes'));
    }
  }

  onSendForm() {
    const updateForm = this.$refs.updateForm;
    updateForm.$v.$touch();

    if (!updateForm.$v.$invalid) {
      this.update(updateForm.$v.item.$model);
    }
  }

};

FileDetailsvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Object,
  required: true
})], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "mediaObject", void 0);

FileDetailsvue_type_script_lang_ts_decorate([FileDetailsvue_type_script_lang_ts_mediaNodeModule.Getter('tree')], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "tree", void 0);

FileDetailsvue_type_script_lang_ts_decorate([FileDetailsvue_type_script_lang_ts_mediaNodeModule.Action('fetchTree')], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "fetchTree", void 0);

FileDetailsvue_type_script_lang_ts_decorate([FileDetailsvue_type_script_lang_ts_mediaNodeModule.State('treeIds')], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "allTreeIds", void 0);

FileDetailsvue_type_script_lang_ts_decorate([FileDetailsvue_type_script_lang_ts_mediaObjectModule.Action('update')], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "update", void 0);

FileDetailsvue_type_script_lang_ts_decorate([FileDetailsvue_type_script_lang_ts_mediaObjectModule.State('violations')], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "violations", void 0);

FileDetailsvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["InjectReactive"])()], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "closeDetailPanel", void 0);

FileDetailsvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Watch"])('mediaObject')], FileDetailsvue_type_script_lang_ts_FileDetails.prototype, "onRetrieved", null);

FileDetailsvue_type_script_lang_ts_FileDetails = FileDetailsvue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Component"])({
  components: {
    Toolbar: Toolbar["a" /* default */],
    FileDetailsForm: file_details_FileDetailsForm
  }
})], FileDetailsvue_type_script_lang_ts_FileDetails);
/* harmony default export */ var FileDetailsvue_type_script_lang_ts_ = (FileDetailsvue_type_script_lang_ts_FileDetails);
// CONCATENATED MODULE: ./app/components/file_manager/file_details/FileDetails.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_details_FileDetailsvue_type_script_lang_ts_ = (FileDetailsvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file_manager/file_details/FileDetails.vue





/* normalize component */

var FileDetails_component = Object(componentNormalizer["a" /* default */])(
  file_details_FileDetailsvue_type_script_lang_ts_,
  FileDetailsvue_type_template_id_2ee61804_render,
  FileDetailsvue_type_template_id_2ee61804_staticRenderFns,
  false,
  null,
  null,
  "a75fdf94"
  
)

/* harmony default export */ var file_details_FileDetails = (FileDetails_component.exports);

/* vuetify-loader */






installComponents_default()(FileDetails_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VIcon: VIcon["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file_manager/FileManager.vue?vue&type=script&lang=ts&
var FileManagervue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let FileManagervue_type_script_lang_ts_FileManager = class FileManager extends external_nuxt_property_decorator_["Vue"] {
  constructor() {
    super(...arguments);
    this.selectionEnabled = this.showSelection;
    this.currentMediaNode = null;
    this.thumbnails = [];
    this.links = [];
    this.detailsPanel = false;
    this.selectedMediaObject = null;
  }

  closeDetailPanel() {
    this.detailsPanel = false;
    this.selectedMediaObject = null;
  }

  reset() {
    this.thumbnails = [];
    this.links = [];
  }

  selectMediaObject(mediaObject) {
    if (mediaObject.isImage) {
      this.selectImage(mediaObject);
    } else {
      this.selectLink(mediaObject);
    }
  }

  selectImage(res) {
    this.thumbnails.push({
      src: res.contentUrl
    });
  }

  selectLink(res) {
    this.links.push({
      src: res.contentUrl,
      name: res.filePath
    });
  }

  removeThumbnail(index) {
    this.thumbnails.splice(index, 1);
  }

  removeLink(index) {
    this.links.splice(index, 1);
  }

  handleUpload(files) {
    if (!this.currentMediaNode) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]; // const reader = new FileReader()
      // reader.onload = (e) => {
      //   this.thumbnails.push({
      //     src: e.target.result
      //   })
      // }
      // reader.readAsDataURL(file)

      const formData = new FormData();
      formData.append('file', file);
      formData.append('mediaNodeId', this.currentMediaNode.id.toString());
      this.$getRepository('media_objects').$post('/api/media_objects', {
        method: 'POST',
        body: formData
      }).then(res => {
        if (res.isImage) {
          this.selectImage(res);
        } else {
          this.selectLink(res);
        }

        this.$refs['file-navigator'].refresh();
      });
    }
  }

  editMediaObject(mediaObject) {
    this.detailsPanel = true;
    this.selectedMediaObject = mediaObject;
  }

};

FileManagervue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Prop"])({
  type: Boolean,
  default: true
})], FileManagervue_type_script_lang_ts_FileManager.prototype, "showSelection", void 0);

FileManagervue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Provide"])()], FileManagervue_type_script_lang_ts_FileManager.prototype, "selectionEnabled", void 0);

FileManagervue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["ProvideReactive"])()], FileManagervue_type_script_lang_ts_FileManager.prototype, "closeDetailPanel", null);

FileManagervue_type_script_lang_ts_FileManager = FileManagervue_type_script_lang_ts_decorate([Object(external_nuxt_property_decorator_["Component"])({
  components: {
    FileSelection: file_selection_FileSelection,
    FileUploader: file_uploader_FileUploader,
    FileNavigator: file_navigator_FileNavigator,
    FileDetails: file_details_FileDetails
  }
})], FileManagervue_type_script_lang_ts_FileManager);
/* harmony default export */ var FileManagervue_type_script_lang_ts_ = (FileManagervue_type_script_lang_ts_FileManager);
// CONCATENATED MODULE: ./app/components/file_manager/FileManager.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_manager_FileManagervue_type_script_lang_ts_ = (FileManagervue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file_manager/FileManager.vue





/* normalize component */

var FileManager_component = Object(componentNormalizer["a" /* default */])(
  file_manager_FileManagervue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "5d7f4061"
  
)

/* harmony default export */ var file_manager_FileManager = __webpack_exports__["a"] = (FileManager_component.exports);

/* vuetify-loader */




installComponents_default()(FileManager_component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(312);
/* harmony import */ var _src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(244);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(245);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75);
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(246);
/* harmony import */ var _mixins_menuable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(260);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(19);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(0);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2);
 // Mixins







 // Helpers




/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_dependent__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_detachable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_menuable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]).extend({
  name: 'v-tooltip',
  props: {
    closeDelay: {
      type: [Number, String],
      default: 0
    },
    disabled: Boolean,
    fixed: {
      type: Boolean,
      default: true
    },
    openDelay: {
      type: [Number, String],
      default: 0
    },
    openOnHover: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'span'
    },
    transition: String
  },
  data: () => ({
    calculatedMinWidth: 0,
    closeDependents: false
  }),
  computed: {
    calculatedLeft() {
      const {
        activator,
        content
      } = this.dimensions;
      const unknown = !this.bottom && !this.left && !this.top && !this.right;
      const activatorLeft = this.attach !== false ? activator.offsetLeft : activator.left;
      let left = 0;

      if (this.top || this.bottom || unknown) {
        left = activatorLeft + activator.width / 2 - content.width / 2;
      } else if (this.left || this.right) {
        left = activatorLeft + (this.right ? activator.width : -content.width) + (this.right ? 10 : -10);
      }

      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
      if (this.nudgeRight) left += parseInt(this.nudgeRight);
      return `${this.calcXOverflow(left, this.dimensions.content.width)}px`;
    },

    calculatedTop() {
      const {
        activator,
        content
      } = this.dimensions;
      const activatorTop = this.attach !== false ? activator.offsetTop : activator.top;
      let top = 0;

      if (this.top || this.bottom) {
        top = activatorTop + (this.bottom ? activator.height : -content.height) + (this.bottom ? 10 : -10);
      } else if (this.left || this.right) {
        top = activatorTop + activator.height / 2 - content.height / 2;
      }

      if (this.nudgeTop) top -= parseInt(this.nudgeTop);
      if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
      return `${this.calcYOverflow(top + this.pageYOffset)}px`;
    },

    classes() {
      return {
        'v-tooltip--top': this.top,
        'v-tooltip--right': this.right,
        'v-tooltip--bottom': this.bottom,
        'v-tooltip--left': this.left,
        'v-tooltip--attached': this.attach === '' || this.attach === true || this.attach === 'attach'
      };
    },

    computedTransition() {
      if (this.transition) return this.transition;
      return this.isActive ? 'scale-transition' : 'fade-transition';
    },

    offsetY() {
      return this.top || this.bottom;
    },

    offsetX() {
      return this.left || this.right;
    },

    styles() {
      return {
        left: this.calculatedLeft,
        maxWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_8__[/* convertToUnit */ "h"])(this.maxWidth),
        minWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_8__[/* convertToUnit */ "h"])(this.minWidth),
        opacity: this.isActive ? 0.9 : 0,
        top: this.calculatedTop,
        zIndex: this.zIndex || this.activeZIndex
      };
    }

  },

  beforeMount() {
    this.$nextTick(() => {
      this.value && this.callActivate();
    });
  },

  mounted() {
    if (Object(_util_helpers__WEBPACK_IMPORTED_MODULE_8__[/* getSlotType */ "u"])(this, 'activator', true) === 'v-slot') {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_9__[/* consoleError */ "b"])(`v-tooltip's activator slot must be bound, try '<template #activator="data"><v-btn v-on="data.on>'`, this);
    }
  },

  methods: {
    activate() {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions(); // Start the transition

      requestAnimationFrame(this.startTransition);
    },

    deactivate() {
      this.runDelay('close');
    },

    genActivatorListeners() {
      const listeners = _mixins_activatable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.methods.genActivatorListeners.call(this);

      listeners.focus = e => {
        this.getActivator(e);
        this.runDelay('open');
      };

      listeners.blur = e => {
        this.getActivator(e);
        this.runDelay('close');
      };

      listeners.keydown = e => {
        if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_8__[/* keyCodes */ "y"].esc) {
          this.getActivator(e);
          this.runDelay('close');
        }
      };

      return listeners;
    },

    genActivatorAttributes() {
      return {
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive)
      };
    },

    genTransition() {
      const content = this.genContent();
      if (!this.computedTransition) return content;
      return this.$createElement('transition', {
        props: {
          name: this.computedTransition
        }
      }, [content]);
    },

    genContent() {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-tooltip__content',
        class: {
          [this.contentClass]: true,
          menuable__content__active: this.isActive,
          'v-tooltip__content--fixed': this.activatorFixed
        },
        style: this.styles,
        attrs: this.getScopeIdAttrs(),
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        ref: 'content'
      }), this.getContentSlot());
    }

  },

  render(h) {
    return h(this.tag, {
      staticClass: 'v-tooltip',
      class: this.classes
    }, [this.showLazyContent(() => [this.genTransition()]), this.genActivator()]);
  }

}));

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/gallery/index.vue?vue&type=template&id=2bc88a37&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('file-manager',{attrs:{"show-selection":false}})],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/admin/gallery/index.vue?vue&type=template&id=2bc88a37&

// EXTERNAL MODULE: external "nuxt-property-decorator"
var external_nuxt_property_decorator_ = __webpack_require__(7);

// EXTERNAL MODULE: ./app/components/file_manager/FileManager.vue + 52 modules
var FileManager = __webpack_require__(322);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/gallery/index.vue?vue&type=script&lang=ts&
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let galleryvue_type_script_lang_ts_AdminGallery = class AdminGallery extends external_nuxt_property_decorator_["Vue"] {};
galleryvue_type_script_lang_ts_AdminGallery = __decorate([Object(external_nuxt_property_decorator_["Component"])({
  components: {
    FileManager: FileManager["a" /* default */]
  },
  layout: 'Admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_ACCESS_GALLERIES']
  }
})], galleryvue_type_script_lang_ts_AdminGallery);
/* harmony default export */ var galleryvue_type_script_lang_ts_ = (galleryvue_type_script_lang_ts_AdminGallery);
// CONCATENATED MODULE: ./app/pages/admin/gallery/index.vue?vue&type=script&lang=ts&
 /* harmony default export */ var admin_galleryvue_type_script_lang_ts_ = (galleryvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(12);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(240);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(243);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(241);

// CONCATENATED MODULE: ./app/pages/admin/gallery/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  admin_galleryvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "1e5606f4"
  
)

/* harmony default export */ var gallery = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=index.js.map