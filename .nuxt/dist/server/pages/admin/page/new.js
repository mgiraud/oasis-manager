exports.ids = [22];
exports.modules = {

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _VDivider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(204);


/* harmony default export */ __webpack_exports__["a"] = (_VDivider__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _delayable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(238);
/* harmony import */ var _toggleable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
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
      var _activator; // If we've already fetched the activator, re-use


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
      } // The activator should only be a valid element (Ignore comments and text nodes)


      this.activatorElement = ((_activator = activator) == null ? void 0 : _activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
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

/***/ 238:
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

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _bootable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
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

/***/ 240:
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

/***/ 241:
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

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ defaultMenuProps; });

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VTextField/VTextField.sass
var VTextField = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VSelect/VSelect.sass
var VSelect = __webpack_require__(261);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VChip/index.js
var VChip = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VMenu/index.js
var VMenu = __webpack_require__(252);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCheckbox/VSimpleCheckbox.js
var VSimpleCheckbox = __webpack_require__(246);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/index.js
var VDivider = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VSubheader/VSubheader.sass
var VSubheader = __webpack_require__(265);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js
var themeable = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VSubheader/VSubheader.js
// Styles
 // Mixins



/* harmony default export */ var VSubheader_VSubheader = (Object(mixins["a" /* default */])(themeable["a" /* default */]
/* @vue/component */
).extend({
  name: 'v-subheader',
  props: {
    inset: Boolean
  },

  render(h) {
    return h('div', {
      staticClass: 'v-subheader',
      class: {
        'v-subheader--inset': this.inset,
        ...this.themeClasses
      },
      attrs: this.$attrs,
      on: this.$listeners
    }, this.$slots.default);
  }

}));
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VSubheader/index.js


/* harmony default export */ var components_VSubheader = (VSubheader_VSubheader);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItem.js
var VListItem = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItemAction.js
var VListItemAction = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 3 modules
var VList = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
var VList_VList = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/directives/ripple/index.js
var ripple = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VSelect/VSelectList.js
// Components



 // Directives

 // Mixins


 // Helpers

 // Types


/* @vue/component */

/* harmony default export */ var VSelectList = (Object(mixins["a" /* default */])(colorable["a" /* default */], themeable["a" /* default */]).extend({
  name: 'v-select-list',
  // https://github.com/vuejs/vue/issues/6872
  directives: {
    ripple: ripple["a" /* default */]
  },
  props: {
    action: Boolean,
    dense: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemDisabled: {
      type: [String, Array, Function],
      default: 'disabled'
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    },
    noDataText: String,
    noFilter: Boolean,
    searchInput: null,
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    parsedItems() {
      return this.selectedItems.map(item => this.getValue(item));
    },

    tileActiveClass() {
      return Object.keys(this.setTextColor(this.color).class || {}).join(' ');
    },

    staticNoDataTile() {
      const tile = {
        attrs: {
          role: undefined
        },
        on: {
          mousedown: e => e.preventDefault()
        }
      };
      return this.$createElement(VListItem["a" /* default */], tile, [this.genTileContent(this.noDataText)]);
    }

  },
  methods: {
    genAction(item, inputValue) {
      return this.$createElement(VListItemAction["a" /* default */], [this.$createElement(VSimpleCheckbox["a" /* default */], {
        props: {
          color: this.color,
          value: inputValue,
          ripple: false
        },
        on: {
          input: () => this.$emit('select', item)
        }
      })]);
    },

    genDivider(props) {
      return this.$createElement(VDivider["a" /* default */], {
        props
      });
    },

    genFilteredText(text) {
      text = text || '';
      if (!this.searchInput || this.noFilter) return Object(helpers["m" /* escapeHTML */])(text);
      const {
        start,
        middle,
        end
      } = this.getMaskedCharacters(text);
      return `${Object(helpers["m" /* escapeHTML */])(start)}${this.genHighlight(middle)}${Object(helpers["m" /* escapeHTML */])(end)}`;
    },

    genHeader(props) {
      return this.$createElement(components_VSubheader, {
        props
      }, props.header);
    },

    genHighlight(text) {
      return `<span class="v-list-item__mask">${Object(helpers["m" /* escapeHTML */])(text)}</span>`;
    },

    getMaskedCharacters(text) {
      const searchInput = (this.searchInput || '').toString().toLocaleLowerCase();
      const index = text.toLocaleLowerCase().indexOf(searchInput);
      if (index < 0) return {
        start: text,
        middle: '',
        end: ''
      };
      const start = text.slice(0, index);
      const middle = text.slice(index, index + searchInput.length);
      const end = text.slice(index + searchInput.length);
      return {
        start,
        middle,
        end
      };
    },

    genTile({
      item,
      index,
      disabled = null,
      value = false
    }) {
      if (!value) value = this.hasItem(item);

      if (item === Object(item)) {
        disabled = disabled !== null ? disabled : this.getDisabled(item);
      }

      const tile = {
        attrs: {
          // Default behavior in list does not
          // contain aria-selected by default
          'aria-selected': String(value),
          id: `list-item-${this._uid}-${index}`,
          role: 'option'
        },
        on: {
          mousedown: e => {
            // Prevent onBlur from being called
            e.preventDefault();
          },
          click: () => disabled || this.$emit('select', item)
        },
        props: {
          activeClass: this.tileActiveClass,
          disabled,
          ripple: true,
          inputValue: value
        }
      };

      if (!this.$scopedSlots.item) {
        return this.$createElement(VListItem["a" /* default */], tile, [this.action && !this.hideSelected && this.items.length > 0 ? this.genAction(item, value) : null, this.genTileContent(item, index)]);
      }

      const parent = this;
      const scopedSlot = this.$scopedSlots.item({
        parent,
        item,
        attrs: { ...tile.attrs,
          ...tile.props
        },
        on: tile.on
      });
      return this.needsTile(scopedSlot) ? this.$createElement(VListItem["a" /* default */], tile, scopedSlot) : scopedSlot;
    },

    genTileContent(item, index = 0) {
      const innerHTML = this.genFilteredText(this.getText(item));
      return this.$createElement(VList["a" /* VListItemContent */], [this.$createElement(VList["b" /* VListItemTitle */], {
        domProps: {
          innerHTML
        }
      })]);
    },

    hasItem(item) {
      return this.parsedItems.indexOf(this.getValue(item)) > -1;
    },

    needsTile(slot) {
      return slot.length !== 1 || slot[0].componentOptions == null || slot[0].componentOptions.Ctor.options.name !== 'v-list-item';
    },

    getDisabled(item) {
      return Boolean(Object(helpers["s" /* getPropertyFromItem */])(item, this.itemDisabled, false));
    },

    getText(item) {
      return String(Object(helpers["s" /* getPropertyFromItem */])(item, this.itemText, item));
    },

    getValue(item) {
      return Object(helpers["s" /* getPropertyFromItem */])(item, this.itemValue, this.getText(item));
    }

  },

  render() {
    const children = [];
    const itemsLength = this.items.length;

    for (let index = 0; index < itemsLength; index++) {
      const item = this.items[index];
      if (this.hideSelected && this.hasItem(item)) continue;
      if (item == null) children.push(this.genTile({
        item,
        index
      }));else if (item.header) children.push(this.genHeader(item));else if (item.divider) children.push(this.genDivider(item));else children.push(this.genTile({
        item,
        index
      }));
    }

    children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile);
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item']);
    this.$slots['append-item'] && children.push(this.$slots['append-item']);
    return this.$createElement(VList_VList["a" /* default */], {
      staticClass: 'v-select-list',
      class: this.themeClasses,
      attrs: {
        role: 'listbox',
        tabindex: -1
      },
      props: {
        dense: this.dense
      }
    }, children);
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VInput/index.js + 3 modules
var VInput = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.js + 3 modules
var VTextField_VTextField = __webpack_require__(203);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/comparable/index.js
var comparable = __webpack_require__(243);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/dependent/index.js
var dependent = __webpack_require__(81);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(1);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/filterable/index.js

/* @vue/component */

/* harmony default export */ var filterable = (external_vue_default.a.extend({
  name: 'filterable',
  props: {
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    }
  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/directives/click-outside/index.js
var click_outside = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mergeData.js
var mergeData = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var console = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VSelect/VSelect.js
// Styles

 // Components



 // Extensions


 // Mixins



 // Directives

 // Utilities



 // Types


const defaultMenuProps = {
  closeOnClick: false,
  closeOnContentClick: false,
  disableKeys: true,
  openOnClick: false,
  maxHeight: 304
}; // Types

const baseMixins = Object(mixins["a" /* default */])(VTextField_VTextField["a" /* default */], comparable["a" /* default */], dependent["a" /* default */], filterable);
/* @vue/component */

/* harmony default export */ var VSelect_VSelect = __webpack_exports__["a"] = (baseMixins.extend().extend({
  name: 'v-select',
  directives: {
    ClickOutside: click_outside["a" /* default */]
  },
  props: {
    appendIcon: {
      type: String,
      default: '$dropdown'
    },
    attach: {
      type: null,
      default: false
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    deletableChips: Boolean,
    disableLookup: Boolean,
    eager: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemColor: {
      type: String,
      default: 'primary'
    },
    itemDisabled: {
      type: [String, Array, Function],
      default: 'disabled'
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => defaultMenuProps
    },
    multiple: Boolean,
    openOnClear: Boolean,
    returnObject: Boolean,
    smallChips: Boolean
  },

  data() {
    return {
      cachedItems: this.cacheItems ? this.items : [],
      menuIsBooted: false,
      isMenuActive: false,
      lastItem: 20,
      // As long as a value is defined, show it
      // Otherwise, check if multiple
      // to determine which default to provide
      lazyValue: this.value !== undefined ? this.value : this.multiple ? [] : undefined,
      selectedIndex: -1,
      selectedItems: [],
      keyboardLookupPrefix: '',
      keyboardLookupLastTime: 0
    };
  },

  computed: {
    /* All items that the select has */
    allItems() {
      return this.filterDuplicates(this.cachedItems.concat(this.items));
    },

    classes() {
      return { ...VTextField_VTextField["a" /* default */].options.computed.classes.call(this),
        'v-select': true,
        'v-select--chips': this.hasChips,
        'v-select--chips--small': this.smallChips,
        'v-select--is-menu-active': this.isMenuActive,
        'v-select--is-multi': this.multiple
      };
    },

    /* Used by other components to overwrite */
    computedItems() {
      return this.allItems;
    },

    computedOwns() {
      return `list-${this._uid}`;
    },

    computedCounterValue() {
      const value = this.multiple ? this.selectedItems : (this.getText(this.selectedItems[0]) || '').toString();

      if (typeof this.counterValue === 'function') {
        return this.counterValue(value);
      }

      return value.length;
    },

    directives() {
      return this.isFocused ? [{
        name: 'click-outside',
        value: {
          handler: this.blur,
          closeConditional: this.closeConditional,
          include: () => this.getOpenDependentElements()
        }
      }] : undefined;
    },

    dynamicHeight() {
      return 'auto';
    },

    hasChips() {
      return this.chips || this.smallChips;
    },

    hasSlot() {
      return Boolean(this.hasChips || this.$scopedSlots.selection);
    },

    isDirty() {
      return this.selectedItems.length > 0;
    },

    listData() {
      const scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
      const attrs = scopeId ? {
        [scopeId]: true
      } : {};
      return {
        attrs: { ...attrs,
          id: this.computedOwns
        },
        props: {
          action: this.multiple,
          color: this.itemColor,
          dense: this.dense,
          hideSelected: this.hideSelected,
          items: this.virtualizedItems,
          itemDisabled: this.itemDisabled,
          itemText: this.itemText,
          itemValue: this.itemValue,
          noDataText: this.$vuetify.lang.t(this.noDataText),
          selectedItems: this.selectedItems
        },
        on: {
          select: this.selectItem
        },
        scopedSlots: {
          item: this.$scopedSlots.item
        }
      };
    },

    staticList() {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        Object(console["b" /* consoleError */])('assert: staticList should not be called if slots are used');
      }

      return this.$createElement(VSelectList, this.listData);
    },

    virtualizedItems() {
      return this.$_menuProps.auto ? this.computedItems : this.computedItems.slice(0, this.lastItem);
    },

    menuCanShow: () => true,

    $_menuProps() {
      let normalisedProps = typeof this.menuProps === 'string' ? this.menuProps.split(',') : this.menuProps;

      if (Array.isArray(normalisedProps)) {
        normalisedProps = normalisedProps.reduce((acc, p) => {
          acc[p.trim()] = true;
          return acc;
        }, {});
      }

      return { ...defaultMenuProps,
        eager: this.eager,
        value: this.menuCanShow && this.isMenuActive,
        nudgeBottom: normalisedProps.offsetY ? 1 : 0,
        ...normalisedProps
      };
    }

  },
  watch: {
    internalValue(val) {
      this.initialValue = val;
      this.setSelectedItems();
    },

    isMenuActive(val) {
      window.setTimeout(() => this.onMenuActiveChange(val));
    },

    items: {
      immediate: true,

      handler(val) {
        if (this.cacheItems) {
          // Breaks vue-test-utils if
          // this isn't calculated
          // on the next tick
          this.$nextTick(() => {
            this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
          });
        }

        this.setSelectedItems();
      }

    }
  },
  methods: {
    /** @public */
    blur(e) {
      VTextField_VTextField["a" /* default */].options.methods.blur.call(this, e);
      this.isMenuActive = false;
      this.isFocused = false;
      this.selectedIndex = -1;
      this.setMenuIndex(-1);
    },

    /** @public */
    activateMenu() {
      if (!this.isInteractive || this.isMenuActive) return;
      this.isMenuActive = true;
    },

    clearableCallback() {
      this.setValue(this.multiple ? [] : null);
      this.setMenuIndex(-1);
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus());
      if (this.openOnClear) this.isMenuActive = true;
    },

    closeConditional(e) {
      if (!this.isMenuActive) return true;
      return !this._isDestroyed && ( // Click originates from outside the menu content
      // Multiple selects don't close when an item is clicked
      !this.getContent() || !this.getContent().contains(e.target)) && // Click originates from outside the element
      this.$el && !this.$el.contains(e.target) && e.target !== this.$el;
    },

    filterDuplicates(arr) {
      const uniqueValues = new Map();

      for (let index = 0; index < arr.length; ++index) {
        const item = arr[index]; // Do not deduplicate headers or dividers (#12517)

        if (item.header || item.divider) {
          uniqueValues.set(item, item);
          continue;
        }

        const val = this.getValue(item); // TODO: comparator

        !uniqueValues.has(val) && uniqueValues.set(val, item);
      }

      return Array.from(uniqueValues.values());
    },

    findExistingIndex(item) {
      const itemValue = this.getValue(item);
      return (this.internalValue || []).findIndex(i => this.valueComparator(this.getValue(i), itemValue));
    },

    getContent() {
      return this.$refs.menu && this.$refs.menu.$refs.content;
    },

    genChipSelection(item, index) {
      const isDisabled = this.isDisabled || this.getDisabled(item);
      const isInteractive = !isDisabled && this.isInteractive;
      return this.$createElement(VChip["a" /* default */], {
        staticClass: 'v-chip--select',
        attrs: {
          tabindex: -1
        },
        props: {
          close: this.deletableChips && isInteractive,
          disabled: isDisabled,
          inputValue: index === this.selectedIndex,
          small: this.smallChips
        },
        on: {
          click: e => {
            if (!isInteractive) return;
            e.stopPropagation();
            this.selectedIndex = index;
          },
          'click:close': () => this.onChipInput(item)
        },
        key: JSON.stringify(this.getValue(item))
      }, this.getText(item));
    },

    genCommaSelection(item, index, last) {
      const color = index === this.selectedIndex && this.computedColor;
      const isDisabled = this.isDisabled || this.getDisabled(item);
      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-select__selection v-select__selection--comma',
        class: {
          'v-select__selection--disabled': isDisabled
        },
        key: JSON.stringify(this.getValue(item))
      }), `${this.getText(item)}${last ? '' : ', '}`);
    },

    genDefaultSlot() {
      const selections = this.genSelections();
      const input = this.genInput(); // If the return is an empty array
      // push the input

      if (Array.isArray(selections)) {
        selections.push(input); // Otherwise push it into children
      } else {
        selections.children = selections.children || [];
        selections.children.push(input);
      }

      return [this.genFieldset(), this.$createElement('div', {
        staticClass: 'v-select__slot',
        directives: this.directives
      }, [this.genLabel(), this.prefix ? this.genAffix('prefix') : null, selections, this.suffix ? this.genAffix('suffix') : null, this.genClearIcon(), this.genIconSlot(), this.genHiddenInput()]), this.genMenu(), this.genProgress()];
    },

    genIcon(type, cb, extraData) {
      const icon = VInput["a" /* default */].options.methods.genIcon.call(this, type, cb, extraData);

      if (type === 'append') {
        // Don't allow the dropdown icon to be focused
        icon.children[0].data = Object(mergeData["a" /* default */])(icon.children[0].data, {
          attrs: {
            tabindex: icon.children[0].componentOptions.listeners && '-1',
            'aria-hidden': 'true',
            'aria-label': undefined
          }
        });
      }

      return icon;
    },

    genInput() {
      const input = VTextField_VTextField["a" /* default */].options.methods.genInput.call(this);
      delete input.data.attrs.name;
      input.data = Object(mergeData["a" /* default */])(input.data, {
        domProps: {
          value: null
        },
        attrs: {
          readonly: true,
          type: 'text',
          'aria-readonly': String(this.isReadonly),
          'aria-activedescendant': Object(helpers["q" /* getObjectValueByPath */])(this.$refs.menu, 'activeTile.id'),
          autocomplete: Object(helpers["q" /* getObjectValueByPath */])(input.data, 'attrs.autocomplete', 'off'),
          placeholder: !this.isDirty && (this.persistentPlaceholder || this.isFocused || !this.hasLabel) ? this.placeholder : undefined
        },
        on: {
          keypress: this.onKeyPress
        }
      });
      return input;
    },

    genHiddenInput() {
      return this.$createElement('input', {
        domProps: {
          value: this.lazyValue
        },
        attrs: {
          type: 'hidden',
          name: this.attrs$.name
        }
      });
    },

    genInputSlot() {
      const render = VTextField_VTextField["a" /* default */].options.methods.genInputSlot.call(this);
      render.data.attrs = { ...render.data.attrs,
        role: 'button',
        'aria-haspopup': 'listbox',
        'aria-expanded': String(this.isMenuActive),
        'aria-owns': this.computedOwns
      };
      return render;
    },

    genList() {
      // If there's no slots, we can use a cached VNode to improve performance
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        return this.genListWithSlot();
      } else {
        return this.staticList;
      }
    },

    genListWithSlot() {
      const slots = ['prepend-item', 'no-data', 'append-item'].filter(slotName => this.$slots[slotName]).map(slotName => this.$createElement('template', {
        slot: slotName
      }, this.$slots[slotName])); // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object

      return this.$createElement(VSelectList, { ...this.listData
      }, slots);
    },

    genMenu() {
      const props = this.$_menuProps;
      props.activator = this.$refs['input-slot']; // Attach to root el so that
      // menu covers prepend/append icons

      if ( // TODO: make this a computed property or helper or something
      this.attach === '' || // If used as a boolean prop (<v-menu attach>)
      this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
      this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) {
          props.attach = this.$el;
        } else {
        props.attach = this.attach;
      }

      return this.$createElement(VMenu["a" /* default */], {
        attrs: {
          role: undefined
        },
        props,
        on: {
          input: val => {
            this.isMenuActive = val;
            this.isFocused = val;
          },
          scroll: this.onScroll
        },
        ref: 'menu'
      }, [this.genList()]);
    },

    genSelections() {
      let length = this.selectedItems.length;
      const children = new Array(length);
      let genSelection;

      if (this.$scopedSlots.selection) {
        genSelection = this.genSlotSelection;
      } else if (this.hasChips) {
        genSelection = this.genChipSelection;
      } else {
        genSelection = this.genCommaSelection;
      }

      while (length--) {
        children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1);
      }

      return this.$createElement('div', {
        staticClass: 'v-select__selections'
      }, children);
    },

    genSlotSelection(item, index) {
      return this.$scopedSlots.selection({
        attrs: {
          class: 'v-chip--select'
        },
        parent: this,
        item,
        index,
        select: e => {
          e.stopPropagation();
          this.selectedIndex = index;
        },
        selected: index === this.selectedIndex,
        disabled: !this.isInteractive
      });
    },

    getMenuIndex() {
      return this.$refs.menu ? this.$refs.menu.listIndex : -1;
    },

    getDisabled(item) {
      return Object(helpers["s" /* getPropertyFromItem */])(item, this.itemDisabled, false);
    },

    getText(item) {
      return Object(helpers["s" /* getPropertyFromItem */])(item, this.itemText, item);
    },

    getValue(item) {
      return Object(helpers["s" /* getPropertyFromItem */])(item, this.itemValue, this.getText(item));
    },

    onBlur(e) {
      e && this.$emit('blur', e);
    },

    onChipInput(item) {
      if (this.multiple) this.selectItem(item);else this.setValue(null); // If all items have been deleted,
      // open `v-menu`

      if (this.selectedItems.length === 0) {
        this.isMenuActive = true;
      } else {
        this.isMenuActive = false;
      }

      this.selectedIndex = -1;
    },

    onClick(e) {
      if (!this.isInteractive) return;

      if (!this.isAppendInner(e.target)) {
        this.isMenuActive = true;
      }

      if (!this.isFocused) {
        this.isFocused = true;
        this.$emit('focus');
      }

      this.$emit('click', e);
    },

    onEscDown(e) {
      e.preventDefault();

      if (this.isMenuActive) {
        e.stopPropagation();
        this.isMenuActive = false;
      }
    },

    onKeyPress(e) {
      if (this.multiple || !this.isInteractive || this.disableLookup) return;
      const KEYBOARD_LOOKUP_THRESHOLD = 1000; // milliseconds

      const now = performance.now();

      if (now - this.keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        this.keyboardLookupPrefix = '';
      }

      this.keyboardLookupPrefix += e.key.toLowerCase();
      this.keyboardLookupLastTime = now;
      const index = this.allItems.findIndex(item => {
        const text = (this.getText(item) || '').toString();
        return text.toLowerCase().startsWith(this.keyboardLookupPrefix);
      });
      const item = this.allItems[index];

      if (index !== -1) {
        this.lastItem = Math.max(this.lastItem, index + 5);
        this.setValue(this.returnObject ? item : this.getValue(item));
        this.$nextTick(() => this.$refs.menu.getTiles());
        setTimeout(() => this.setMenuIndex(index));
      }
    },

    onKeyDown(e) {
      if (this.isReadonly && e.keyCode !== helpers["y" /* keyCodes */].tab) return;
      const keyCode = e.keyCode;
      const menu = this.$refs.menu;
      this.$emit('keydown', e);
      if (!menu) return; // If menu is active, allow default
      // listIndex change from menu

      if (this.isMenuActive && keyCode !== helpers["y" /* keyCodes */].tab) {
        this.$nextTick(() => {
          menu.changeListIndex(e);
          this.$emit('update:list-index', menu.listIndex);
        });
      } // If enter, space, open menu


      if ([helpers["y" /* keyCodes */].enter, helpers["y" /* keyCodes */].space].includes(keyCode)) this.activateMenu(); // If menu is not active, up/down/home/end can do
      // one of 2 things. If multiple, opens the
      // menu, if not, will cycle through all
      // available options

      if (!this.isMenuActive && [helpers["y" /* keyCodes */].up, helpers["y" /* keyCodes */].down, helpers["y" /* keyCodes */].home, helpers["y" /* keyCodes */].end].includes(keyCode)) return this.onUpDown(e); // If escape deactivate the menu

      if (keyCode === helpers["y" /* keyCodes */].esc) return this.onEscDown(e); // If tab - select item or close menu

      if (keyCode === helpers["y" /* keyCodes */].tab) return this.onTabDown(e); // If space preventDefault

      if (keyCode === helpers["y" /* keyCodes */].space) return this.onSpaceDown(e);
    },

    onMenuActiveChange(val) {
      // If menu is closing and mulitple
      // or menuIndex is already set
      // skip menu index recalculation
      if (this.multiple && !val || this.getMenuIndex() > -1) return;
      const menu = this.$refs.menu;
      if (!menu || !this.isDirty) return; // When menu opens, set index of first active item

      this.$refs.menu.getTiles();

      for (let i = 0; i < menu.tiles.length; i++) {
        if (menu.tiles[i].getAttribute('aria-selected') === 'true') {
          this.setMenuIndex(i);
          break;
        }
      }
    },

    onMouseUp(e) {
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (this.hasMouseDown && e.which !== 3 && this.isInteractive) {
        // If append inner is present
        // and the target is itself
        // or inside, toggle menu
        if (this.isAppendInner(e.target)) {
          this.$nextTick(() => this.isMenuActive = !this.isMenuActive);
        }
      }

      VTextField_VTextField["a" /* default */].options.methods.onMouseUp.call(this, e);
    },

    onScroll() {
      if (!this.isMenuActive) {
        requestAnimationFrame(() => this.getContent().scrollTop = 0);
      } else {
        if (this.lastItem > this.computedItems.length) return;
        const showMoreItems = this.getContent().scrollHeight - (this.getContent().scrollTop + this.getContent().clientHeight) < 200;

        if (showMoreItems) {
          this.lastItem += 20;
        }
      }
    },

    onSpaceDown(e) {
      e.preventDefault();
    },

    onTabDown(e) {
      const menu = this.$refs.menu;
      if (!menu) return;
      const activeTile = menu.activeTile; // An item that is selected by
      // menu-index should toggled

      if (!this.multiple && activeTile && this.isMenuActive) {
        e.preventDefault();
        e.stopPropagation();
        activeTile.click();
      } else {
        // If we make it here,
        // the user has no selected indexes
        // and is probably tabbing out
        this.blur(e);
      }
    },

    onUpDown(e) {
      const menu = this.$refs.menu;
      if (!menu) return;
      e.preventDefault(); // Multiple selects do not cycle their value
      // when pressing up or down, instead activate
      // the menu

      if (this.multiple) return this.activateMenu();
      const keyCode = e.keyCode; // Cycle through available values to achieve
      // select native behavior

      menu.isBooted = true;
      window.requestAnimationFrame(() => {
        menu.getTiles();
        if (!menu.hasClickableTiles) return this.activateMenu();

        switch (keyCode) {
          case helpers["y" /* keyCodes */].up:
            menu.prevTile();
            break;

          case helpers["y" /* keyCodes */].down:
            menu.nextTile();
            break;

          case helpers["y" /* keyCodes */].home:
            menu.firstTile();
            break;

          case helpers["y" /* keyCodes */].end:
            menu.lastTile();
            break;
        }

        this.selectItem(this.allItems[this.getMenuIndex()]);
      });
    },

    selectItem(item) {
      if (!this.multiple) {
        this.setValue(this.returnObject ? item : this.getValue(item));
        this.isMenuActive = false;
      } else {
        const internalValue = (this.internalValue || []).slice();
        const i = this.findExistingIndex(item);
        i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item);
        this.setValue(internalValue.map(i => {
          return this.returnObject ? i : this.getValue(i);
        })); // When selecting multiple
        // adjust menu after each
        // selection

        this.$nextTick(() => {
          this.$refs.menu && this.$refs.menu.updateDimensions();
        });
        const listIndex = this.getMenuIndex();
        this.setMenuIndex(-1); // There is no item to re-highlight
        // when selections are hidden

        if (this.hideSelected) return;
        this.$nextTick(() => this.setMenuIndex(listIndex));
      }
    },

    setMenuIndex(index) {
      this.$refs.menu && (this.$refs.menu.listIndex = index);
    },

    setSelectedItems() {
      const selectedItems = [];
      const values = !this.multiple || !Array.isArray(this.internalValue) ? [this.internalValue] : this.internalValue;

      for (const value of values) {
        const index = this.allItems.findIndex(v => this.valueComparator(this.getValue(v), this.getValue(value)));

        if (index > -1) {
          selectedItems.push(this.allItems[index]);
        }
      }

      this.selectedItems = selectedItems;
    },

    setValue(value) {
      if (!this.valueComparator(value, this.internalValue)) {
        this.internalValue = value;
        this.$emit('change', value);
      }
    },

    isAppendInner(target) {
      // return true if append inner is present
      // and the target is itself or inside
      const appendInner = this.$refs['append-inner'];
      return appendInner && (appendInner === target || appendInner.contains(target));
    }

  }
}));

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'comparable',
  props: {
    valueComparator: {
      type: Function,
      default: _util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* deepEqual */ "k"]
    }
  }
}));

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VChip_VChip_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(255);
/* harmony import */ var _src_components_VChip_VChip_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VChip_VChip_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21);
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19);
/* harmony import */ var _mixins_sizeable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(52);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5);
// Styles

 // Components


 // Mixins






 // Utilities


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_sizeable__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], _mixins_routable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_5__[/* factory */ "a"])('chipGroup'), Object(_mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__[/* factory */ "b"])('inputValue')).extend({
  name: 'v-chip',
  props: {
    active: {
      type: Boolean,
      default: true
    },
    activeClass: {
      type: String,

      default() {
        if (!this.chipGroup) return '';
        return this.chipGroup.activeClass;
      }

    },
    close: Boolean,
    closeIcon: {
      type: String,
      default: '$delete'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    disabled: Boolean,
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$complete'
    },
    label: Boolean,
    link: Boolean,
    outlined: Boolean,
    pill: Boolean,
    tag: {
      type: String,
      default: 'span'
    },
    textColor: String,
    value: null
  },
  data: () => ({
    proxyClass: 'v-chip--active'
  }),
  computed: {
    classes() {
      return {
        'v-chip': true,
        ..._mixins_routable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].options.computed.classes.call(this),
        'v-chip--clickable': this.isClickable,
        'v-chip--disabled': this.disabled,
        'v-chip--draggable': this.draggable,
        'v-chip--label': this.label,
        'v-chip--link': this.isLink,
        'v-chip--no-color': !this.color,
        'v-chip--outlined': this.outlined,
        'v-chip--pill': this.pill,
        'v-chip--removable': this.hasClose,
        ...this.themeClasses,
        ...this.sizeableClasses,
        ...this.groupClasses
      };
    },

    hasClose() {
      return Boolean(this.close);
    },

    isClickable() {
      return Boolean(_mixins_routable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].options.computed.isClickable.call(this) || this.chipGroup);
    }

  },

  created() {
    const breakingProps = [['outline', 'outlined'], ['selected', 'input-value'], ['value', 'active'], ['@input', '@active.sync']];
    /* istanbul ignore next */

    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) Object(_util_console__WEBPACK_IMPORTED_MODULE_10__[/* breaking */ "a"])(original, replacement, this);
    });
  },

  methods: {
    click(e) {
      this.$emit('click', e);
      this.chipGroup && this.toggle();
    },

    genFilter() {
      const children = [];

      if (this.isActive) {
        children.push(this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
          staticClass: 'v-chip__filter',
          props: {
            left: true
          }
        }, this.filterIcon));
      }

      return this.$createElement(_transitions__WEBPACK_IMPORTED_MODULE_2__[/* VExpandXTransition */ "b"], children);
    },

    genClose() {
      return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
        staticClass: 'v-chip__close',
        props: {
          right: true,
          size: 18
        },
        attrs: {
          'aria-label': this.$vuetify.lang.t(this.closeLabel)
        },
        on: {
          click: e => {
            e.stopPropagation();
            e.preventDefault();
            this.$emit('click:close');
            this.$emit('update:active', false);
          }
        }
      }, this.closeIcon);
    },

    genContent() {
      return this.$createElement('span', {
        staticClass: 'v-chip__content'
      }, [this.filter && this.genFilter(), this.$slots.default, this.hasClose && this.genClose()]);
    }

  },

  render(h) {
    const children = [this.genContent()];
    let {
      tag,
      data
    } = this.generateRouteLink();
    data.attrs = { ...data.attrs,
      draggable: this.draggable ? 'true' : undefined,
      tabindex: this.chipGroup && !this.disabled ? 0 : data.attrs.tabindex
    };
    data.directives.push({
      name: 'show',
      value: this.active
    });
    data = this.setBackgroundColor(this.color, data);
    const color = this.textColor || this.outlined && this.color;
    return h(tag, this.setTextColor(color, data), children);
  }

}));

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VMenu_VMenu_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(259);
/* harmony import */ var _src_components_VMenu_VMenu_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VMenu_VMenu_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(275);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(237);
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(238);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81);
/* harmony import */ var _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(254);
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(241);
/* harmony import */ var _mixins_roundable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8);
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(82);
/* harmony import */ var _directives_resize__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(31);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(0);
// Styles
 // Components

 // Mixins








 // Directives


 // Utilities




const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(_mixins_dependent__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _mixins_roundable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'v-menu',
  directives: {
    ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],
    Resize: _directives_resize__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]
  },

  provide() {
    return {
      isInMenu: true,
      // Pass theme through to default slot
      theme: this.theme
    };
  },

  props: {
    auto: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    disableKeys: Boolean,
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    offsetX: Boolean,
    offsetY: Boolean,
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: Boolean,
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'v-menu-transition'
    }
  },

  data() {
    return {
      calculatedTopAuto: 0,
      defaultOffset: 8,
      hasJustFocused: false,
      listIndex: -1,
      resizeTimeout: 0,
      selectedIndex: null,
      tiles: []
    };
  },

  computed: {
    activeTile() {
      return this.tiles[this.listIndex];
    },

    calculatedLeft() {
      const menuWidth = Math.max(this.dimensions.content.width, parseFloat(this.calculatedMinWidth));
      if (!this.auto) return this.calcLeft(menuWidth) || '0';
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* convertToUnit */ "h"])(this.calcXOverflow(this.calcLeftAuto(), menuWidth)) || '0';
    },

    calculatedMaxHeight() {
      const height = this.auto ? '200px' : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* convertToUnit */ "h"])(this.maxHeight);
      return height || '0';
    },

    calculatedMaxWidth() {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* convertToUnit */ "h"])(this.maxWidth) || '0';
    },

    calculatedMinWidth() {
      if (this.minWidth) {
        return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* convertToUnit */ "h"])(this.minWidth) || '0';
      }

      const minWidth = Math.min(this.dimensions.activator.width + Number(this.nudgeWidth) + (this.auto ? 16 : 0), Math.max(this.pageWidth - 24, 0));
      const calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth)) ? minWidth : parseInt(this.calculatedMaxWidth);
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* convertToUnit */ "h"])(Math.min(calculatedMaxWidth, minWidth)) || '0';
    },

    calculatedTop() {
      const top = !this.auto ? this.calcTop() : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* convertToUnit */ "h"])(this.calcYOverflow(this.calculatedTopAuto));
      return top || '0';
    },

    hasClickableTiles() {
      return Boolean(this.tiles.find(tile => tile.tabIndex > -1));
    },

    styles() {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex
      };
    }

  },
  watch: {
    isActive(val) {
      if (!val) this.listIndex = -1;
    },

    isContentActive(val) {
      this.hasJustFocused = val;
    },

    listIndex(next, prev) {
      if (next in this.tiles) {
        const tile = this.tiles[next];
        tile.classList.add('v-list-item--highlighted');
        this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight;
      }

      prev in this.tiles && this.tiles[prev].classList.remove('v-list-item--highlighted');
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('full-width')) {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_13__[/* removed */ "e"])('full-width', this);
    }
  },

  mounted() {
    this.isActive && this.callActivate();
  },

  methods: {
    activate() {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions(); // Start the transition

      requestAnimationFrame(() => {
        // Once transitioning, calculate scroll and top position
        this.startTransition().then(() => {
          if (this.$refs.content) {
            this.calculatedTopAuto = this.calcTopAuto();
            this.auto && (this.$refs.content.scrollTop = this.calcScrollPosition());
          }
        });
      });
    },

    calcScrollPosition() {
      const $el = this.$refs.content;
      const activeTile = $el.querySelector('.v-list-item--active');
      const maxScrollTop = $el.scrollHeight - $el.offsetHeight;
      return activeTile ? Math.min(maxScrollTop, Math.max(0, activeTile.offsetTop - $el.offsetHeight / 2 + activeTile.offsetHeight / 2)) : $el.scrollTop;
    },

    calcLeftAuto() {
      return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
    },

    calcTopAuto() {
      const $el = this.$refs.content;
      const activeTile = $el.querySelector('.v-list-item--active');

      if (!activeTile) {
        this.selectedIndex = null;
      }

      if (this.offsetY || !activeTile) {
        return this.computedTop;
      }

      this.selectedIndex = Array.from(this.tiles).indexOf(activeTile);
      const tileDistanceFromMenuTop = activeTile.offsetTop - this.calcScrollPosition();
      const firstTileOffsetTop = $el.querySelector('.v-list-item').offsetTop;
      return this.computedTop - tileDistanceFromMenuTop - firstTileOffsetTop - 1;
    },

    changeListIndex(e) {
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles();

      if (!this.isActive || !this.hasClickableTiles) {
        return;
      } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].tab) {
        this.isActive = false;
        return;
      } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].down) {
        this.nextTile();
      } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].up) {
        this.prevTile();
      } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].end) {
        this.lastTile();
      } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].home) {
        this.firstTile();
      } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].enter && this.listIndex !== -1) {
        this.tiles[this.listIndex].click();
      } else {
        return;
      } // One of the conditions was met, prevent default action (#2988)


      e.preventDefault();
    },

    closeConditional(e) {
      const target = e.target;
      return this.isActive && !this._isDestroyed && this.closeOnClick && !this.$refs.content.contains(target);
    },

    genActivatorAttributes() {
      const attributes = _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].options.methods.genActivatorAttributes.call(this);

      if (this.activeTile && this.activeTile.id) {
        return { ...attributes,
          'aria-activedescendant': this.activeTile.id
        };
      }

      return attributes;
    },

    genActivatorListeners() {
      const listeners = _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].options.methods.genActivatorListeners.call(this);

      if (!this.disableKeys) {
        listeners.keydown = this.onKeyDown;
      }

      return listeners;
    },

    genTransition() {
      const content = this.genContent();
      if (!this.transition) return content;
      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, [content]);
    },

    genDirectives() {
      const directives = [{
        name: 'show',
        value: this.isContentActive
      }]; // Do not add click outside for hover menu

      if (!this.openOnHover && this.closeOnClick) {
        directives.push({
          name: 'click-outside',
          value: {
            handler: () => {
              this.isActive = false;
            },
            closeConditional: this.closeConditional,
            include: () => [this.$el, ...this.getOpenDependentElements()]
          }
        });
      }

      return directives;
    },

    genContent() {
      const options = {
        attrs: { ...this.getScopeIdAttrs(),
          role: 'role' in this.$attrs ? this.$attrs.role : 'menu'
        },
        staticClass: 'v-menu__content',
        class: { ...this.rootThemeClasses,
          ...this.roundedClasses,
          'v-menu__content--auto': this.auto,
          'v-menu__content--fixed': this.activatorFixed,
          menuable__content__active: this.isActive,
          [this.contentClass.trim()]: true
        },
        style: this.styles,
        directives: this.genDirectives(),
        ref: 'content',
        on: {
          click: e => {
            const target = e.target;
            if (target.getAttribute('disabled')) return;
            if (this.closeOnContentClick) this.isActive = false;
          },
          keydown: this.onKeyDown
        }
      };

      if (this.$listeners.scroll) {
        options.on = options.on || {};
        options.on.scroll = this.$listeners.scroll;
      }

      if (!this.disabled && this.openOnHover) {
        options.on = options.on || {};
        options.on.mouseenter = this.mouseEnterHandler;
      }

      if (this.openOnHover) {
        options.on = options.on || {};
        options.on.mouseleave = this.mouseLeaveHandler;
      }

      return this.$createElement('div', options, this.getContentSlot());
    },

    getTiles() {
      if (!this.$refs.content) return;
      this.tiles = Array.from(this.$refs.content.querySelectorAll('.v-list-item'));
    },

    mouseEnterHandler() {
      this.runDelay('open', () => {
        if (this.hasJustFocused) return;
        this.hasJustFocused = true;
      });
    },

    mouseLeaveHandler(e) {
      // Prevent accidental re-activation
      this.runDelay('close', () => {
        if (this.$refs.content.contains(e.relatedTarget)) return;
        requestAnimationFrame(() => {
          this.isActive = false;
          this.callDeactivate();
        });
      });
    },

    nextTile() {
      const tile = this.tiles[this.listIndex + 1];

      if (!tile) {
        if (!this.tiles.length) return;
        this.listIndex = -1;
        this.nextTile();
        return;
      }

      this.listIndex++;
      if (tile.tabIndex === -1) this.nextTile();
    },

    prevTile() {
      const tile = this.tiles[this.listIndex - 1];

      if (!tile) {
        if (!this.tiles.length) return;
        this.listIndex = this.tiles.length;
        this.prevTile();
        return;
      }

      this.listIndex--;
      if (tile.tabIndex === -1) this.prevTile();
    },

    lastTile() {
      const tile = this.tiles[this.tiles.length - 1];
      if (!tile) return;
      this.listIndex = this.tiles.length - 1;
      if (tile.tabIndex === -1) this.prevTile();
    },

    firstTile() {
      const tile = this.tiles[0];
      if (!tile) return;
      this.listIndex = 0;
      if (tile.tabIndex === -1) this.nextTile();
    },

    onKeyDown(e) {
      if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].esc) {
        // Wait for dependent elements to close first
        setTimeout(() => {
          this.isActive = false;
        });
        const activator = this.getActivator();
        this.$nextTick(() => activator && activator.focus());
      } else if (!this.isActive && [_util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].up, _util_helpers__WEBPACK_IMPORTED_MODULE_14__[/* keyCodes */ "y"].down].includes(e.keyCode)) {
        this.isActive = true;
      } // Allow for isActive watcher to generate tile list


      this.$nextTick(() => this.changeListIndex(e));
    },

    onResize() {
      if (!this.isActive) return; // Account for screen resize
      // and orientation change
      // eslint-disable-next-line no-unused-expressions

      this.$refs.content.offsetWidth;
      this.updateDimensions(); // When resizing to a smaller width
      // content width is evaluated before
      // the new activator width has been
      // set, causing it to not size properly
      // hacky but will revisit in the future

      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = window.setTimeout(this.updateDimensions, 100);
    }

  },

  render(h) {
    const data = {
      staticClass: 'v-menu',
      class: {
        'v-menu--attached': this.attach === '' || this.attach === true || this.attach === 'attach'
      },
      directives: [{
        arg: '500',
        name: 'resize',
        value: this.onResize
      }]
    };
    return h('div', data, [!this.activator && this.genActivator(), this.showLazyContent(() => [this.$createElement(_VThemeProvider__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
      props: {
        root: true,
        light: this.light,
        dark: this.dark
      }
    }, [this.genTransition()])])]);
  }

}));

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VCheckbox_VSimpleCheckbox_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(263);
/* harmony import */ var _src_components_VCheckbox_VSimpleCheckbox_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VCheckbox_VSimpleCheckbox_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);



 // Mixins


 // Utilities



/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_2___default.a.extend({
  name: 'v-simple-checkbox',
  functional: true,
  directives: {
    ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
  },
  props: { ..._mixins_colorable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].options.props,
    ..._mixins_themeable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].options.props,
    disabled: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    value: Boolean,
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate'
    },
    onIcon: {
      type: String,
      default: '$checkboxOn'
    },
    offIcon: {
      type: String,
      default: '$checkboxOff'
    }
  },

  render(h, {
    props,
    data,
    listeners
  }) {
    const children = [];
    let icon = props.offIcon;
    if (props.indeterminate) icon = props.indeterminateIcon;else if (props.value) icon = props.onIcon;
    children.push(h(_VIcon__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_colorable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].options.methods.setTextColor(props.value && props.color, {
      props: {
        disabled: props.disabled,
        dark: props.dark,
        light: props.light
      }
    }), icon));

    if (props.ripple && !props.disabled) {
      const ripple = h('div', _mixins_colorable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].options.methods.setTextColor(props.color, {
        staticClass: 'v-input--selection-controls__ripple',
        directives: [{
          name: 'ripple',
          value: {
            center: true
          }
        }]
      }));
      children.push(ripple);
    }

    return h('div', Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(data, {
      class: {
        'v-simple-checkbox': true,
        'v-simple-checkbox--disabled': props.disabled
      },
      on: {
        click: e => {
          e.stopPropagation();

          if (data.on && data.on.input && !props.disabled) {
            Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* wrapInArray */ "H"])(data.on.input).forEach(f => f(!props.value));
          }
        }
      }
    }), [h('div', {
      staticClass: 'v-input--selection-controls__input'
    }, children)]);
  }

}));

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(249);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("2065bca8", content, true)

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-dialog{border-radius:4px;margin:24px;overflow-y:auto;pointer-events:auto;transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog>*{width:100%}.v-dialog>.v-card>.v-card__title{font-size:1.25rem;font-weight:500;letter-spacing:.0125em;padding:16px 24px 10px}.v-dialog>.v-card>.v-card__subtitle,.v-dialog>.v-card>.v-card__text{padding:0 24px 20px}.v-dialog>.v-card>.v-card__actions{padding:8px 16px}.v-dialog__content{align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6;outline:none}.v-dialog__container{display:none}.v-dialog__container--attached{display:inline}.v-dialog--animated{-webkit-animation-duration:.15s;animation-duration:.15s;-webkit-animation-name:animate-dialog;animation-name:animate-dialog;-webkit-animation-timing-function:cubic-bezier(.25,.8,.25,1);animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}.v-dialog--fullscreen>.v-card{min-height:100%;min-width:100%;margin:0!important;padding:0!important}.v-dialog--scrollable,.v-dialog--scrollable>form{display:flex}.v-dialog--scrollable>.v-card,.v-dialog--scrollable>form>.v-card{display:flex;flex:1 1 100%;flex-direction:column;max-height:100%;max-width:100%}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title,.v-dialog--scrollable>form>.v-card>.v-card__actions,.v-dialog--scrollable>form>.v-card>.v-card__title{flex:0 0 auto}.v-dialog--scrollable>.v-card>.v-card__text,.v-dialog--scrollable>form>.v-card>.v-card__text{-webkit-backface-visibility:hidden;backface-visibility:hidden;flex:1 1 auto;overflow-y:auto}@-webkit-keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}@keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/ConfirmDelete.vue?vue&type=template&id=19ce7ef1&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"persistent":"","width":"300"},model:{value:(_vm.show),callback:function ($$v) {_vm.show=$$v},expression:"show"}},[_c('v-card',[_c('v-card-text',[_vm._v("Are you sure you want to delete this item?")]),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"error darken-1"},on:{"click":_vm.handleDelete}},[_vm._v("\n        Delete\n      ")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"secondary darken-1","text":""},on:{"click":function($event){$event.stopPropagation();return _vm.setVisible(false)}}},[_vm._v("\n        Cancel\n      ")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/ConfirmDelete.vue?vue&type=template&id=19ce7ef1&

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/ConfirmDelete.vue?vue&type=script&lang=ts&

/* harmony default export */ var ConfirmDeletevue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    handleDelete: {
      type: Function,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: true
    }
  },

  setup(props, {
    emit
  }) {
    const setVisible = show => {
      emit('close');
    };

    const show = Object(runtime["a" /* computed */])(() => props.visible);
    return {
      setVisible,
      show
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/ConfirmDelete.vue?vue&type=script&lang=ts&
 /* harmony default export */ var util_ConfirmDeletevue_type_script_lang_ts_ = (ConfirmDeletevue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(13);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(276);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(235);

// CONCATENATED MODULE: ./app/components/util/ConfirmDelete.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  util_ConfirmDeletevue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "32d78dca"
  
)

/* harmony default export */ var ConfirmDelete = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */







installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["b" /* VCardText */],VDialog: VDialog["a" /* default */],VSpacer: VSpacer["a" /* default */]})


/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _VChip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(244);


/* harmony default export */ __webpack_exports__["a"] = (_VChip__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _VMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(245);


/* harmony default export */ __webpack_exports__["a"] = (_VMenu__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _positionable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _stackable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(240);
/* harmony import */ var _activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(237);
/* harmony import */ var _detachable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(239);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
// Mixins



 // Utilities



const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(_stackable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _positionable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], _activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _detachable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
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
    activatorNode: [],
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
    relativeYOffset: 0,
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
    },

    absoluteYOffset() {
      return this.pageYOffset - this.relativeYOffset;
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

    if (this.hasWindow) {
      window.addEventListener('resize', this.updateDimensions, false);
    }
  },

  beforeDestroy() {
    if (this.hasWindow) {
      window.removeEventListener('resize', this.updateDimensions, false);
    }
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
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* convertToUnit */ "h"])(this.attach !== false ? this.computedLeft : this.calcXOverflow(this.computedLeft, menuWidth));
    },

    calcTop() {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* convertToUnit */ "h"])(this.attach !== false ? this.computedTop : this.calcYOverflow(this.computedTop));
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
      const toTop = this.absoluteYOffset + documentHeight;
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
      } else if (top < this.absoluteYOffset && !this.allowOverflow) {
        top = this.absoluteYOffset + 12;
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
        if (this.$refs.content) {
          if (this.$refs.content.offsetParent) {
            const offsetRect = this.getRoundedBoundedClientRect(this.$refs.content.offsetParent);
            this.relativeYOffset = window.pageYOffset + offsetRect.top;
            dimensions.activator.top -= this.relativeYOffset;
            dimensions.activator.left -= window.pageXOffset + offsetRect.left;
          }

          dimensions.content = this.measure(this.$refs.content);
        }

        this.dimensions = dimensions;
      });
    }

  }
}));

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(256);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("197fcea4", content, true)

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-chip:not(.v-chip--outlined).accent,.v-chip:not(.v-chip--outlined).error,.v-chip:not(.v-chip--outlined).info,.v-chip:not(.v-chip--outlined).primary,.v-chip:not(.v-chip--outlined).secondary,.v-chip:not(.v-chip--outlined).success,.v-chip:not(.v-chip--outlined).warning{color:#fff}.theme--light.v-chip{border-color:rgba(0,0,0,.12);color:rgba(0,0,0,.87)}.theme--light.v-chip:not(.v-chip--active){background:#e0e0e0}.theme--light.v-chip:hover:before{opacity:.04}.theme--light.v-chip--active:before,.theme--light.v-chip--active:hover:before,.theme--light.v-chip:focus:before{opacity:.12}.theme--light.v-chip--active:focus:before{opacity:.16}.theme--dark.v-chip{border-color:hsla(0,0%,100%,.12);color:#fff}.theme--dark.v-chip:not(.v-chip--active){background:#555}.theme--dark.v-chip:hover:before{opacity:.08}.theme--dark.v-chip--active:before,.theme--dark.v-chip--active:hover:before,.theme--dark.v-chip:focus:before{opacity:.24}.theme--dark.v-chip--active:focus:before{opacity:.32}.v-chip{align-items:center;cursor:default;display:inline-flex;line-height:20px;max-width:100%;outline:none;overflow:hidden;padding:0 12px;position:relative;text-decoration:none;transition-duration:.28s;transition-property:box-shadow,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);vertical-align:middle;white-space:nowrap}.v-chip:before{background-color:currentColor;bottom:0;border-radius:inherit;content:\"\";left:0;opacity:0;position:absolute;pointer-events:none;right:0;top:0}.v-chip .v-avatar{height:24px!important;min-width:24px!important;width:24px!important}.v-chip .v-icon{font-size:24px}.v-application--is-ltr .v-chip .v-avatar--left,.v-application--is-ltr .v-chip .v-icon--left{margin-left:-6px;margin-right:6px}.v-application--is-ltr .v-chip .v-avatar--right,.v-application--is-ltr .v-chip .v-icon--right,.v-application--is-rtl .v-chip .v-avatar--left,.v-application--is-rtl .v-chip .v-icon--left{margin-left:6px;margin-right:-6px}.v-application--is-rtl .v-chip .v-avatar--right,.v-application--is-rtl .v-chip .v-icon--right{margin-left:-6px;margin-right:6px}.v-chip:not(.v-chip--no-color) .v-icon{color:inherit}.v-chip .v-chip__close.v-icon{font-size:18px;max-height:18px;max-width:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-application--is-ltr .v-chip .v-chip__close.v-icon.v-icon--right{margin-right:-4px}.v-application--is-rtl .v-chip .v-chip__close.v-icon.v-icon--right{margin-left:-4px}.v-chip .v-chip__close.v-icon:active,.v-chip .v-chip__close.v-icon:focus,.v-chip .v-chip__close.v-icon:hover{opacity:.72}.v-chip .v-chip__content{align-items:center;display:inline-flex;height:100%;max-width:100%}.v-chip--active .v-icon{color:inherit}.v-chip--link:before{transition:opacity .3s cubic-bezier(.25,.8,.5,1)}.v-chip--link:focus:before{opacity:.32}.v-chip--clickable{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-chip--clickable:active{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-chip--disabled{opacity:.4;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-chip__filter{max-width:24px}.v-chip__filter.v-icon{color:inherit}.v-chip__filter.expand-x-transition-enter,.v-chip__filter.expand-x-transition-leave-active{margin:0}.v-chip--pill .v-chip__filter{margin-right:0 16px 0 0}.v-chip--pill .v-avatar{height:32px!important;width:32px!important}.v-application--is-ltr .v-chip--pill .v-avatar--left{margin-left:-12px}.v-application--is-ltr .v-chip--pill .v-avatar--right,.v-application--is-rtl .v-chip--pill .v-avatar--left{margin-right:-12px}.v-application--is-rtl .v-chip--pill .v-avatar--right{margin-left:-12px}.v-chip--label{border-radius:4px!important}.v-chip.v-chip--outlined{border-width:thin;border-style:solid}.v-chip.v-chip--outlined.v-chip--active:before{opacity:.08}.v-chip.v-chip--outlined .v-icon{color:inherit}.v-chip.v-chip--outlined.v-chip.v-chip{background-color:transparent!important}.v-chip.v-chip--selected{background:transparent}.v-chip.v-chip--selected:after{opacity:.28}.v-chip.v-size--x-small{border-radius:8px;font-size:10px;height:16px}.v-chip.v-size--x-small .v-icon{font-size:10px;height:10px;width:10px}.v-chip.v-size--small{border-radius:12px;font-size:12px;height:24px}.v-chip.v-size--small .v-icon{font-size:12px;height:12px;width:12px}.v-chip.v-size--default{border-radius:16px;font-size:14px;height:32px}.v-chip.v-size--default .v-icon{font-size:14px;height:14px;width:14px}.v-chip.v-size--large{border-radius:27px;font-size:16px;height:54px}.v-chip.v-size--large .v-icon{font-size:16px;height:16px;width:16px}.v-chip.v-size--x-large{border-radius:33px;font-size:18px;height:66px}.v-chip.v-size--x-large .v-icon{font-size:18px;height:18px;width:18px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/form/Toolbar.vue?vue&type=template&id=1e407a02&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-toolbar',{attrs:{"flat":"","bottom":""}},[_vm._t("left"),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('div',[(_vm.handleBack)?_c('v-btn',{attrs:{"loading":_vm.isLoading,"color":"primary"},on:{"click":_vm.goBack}},[_vm._v("\n      Retour\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleEdit)?_c('v-btn',{attrs:{"loading":_vm.isLoading,"color":"primary"},on:{"click":_vm.editItem}},[_vm._v("\n      Editer\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleSubmit)?_c('v-btn',{attrs:{"loading":_vm.isLoading,"color":"primary"},on:{"click":_vm.submitItem}},[_vm._v("\n      Envoyer\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleReset)?_c('v-btn',{staticClass:"ml-sm-2",on:{"click":_vm.resetItem}},[_vm._v("\n      Reinitialiser\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleDelete)?_c('v-btn',{staticClass:"ml-sm-2",attrs:{"color":"error"},on:{"click":function($event){_vm.confirmDelete = true}}},[_vm._v("\n      Supprimer\n    ")]):_vm._e(),_vm._v(" "),(_vm.handleAdd)?_c('v-btn',{attrs:{"color":"primary","rounded":""},on:{"click":_vm.addItem}},[_c('v-icon',[_vm._v("ri-add-line")])],1):_vm._e()],1),_vm._v(" "),(_vm.handleDelete)?_c('ConfirmDelete',{attrs:{"visible":_vm.confirmDelete,"handle-delete":_vm.handleDelete},on:{"close":function($event){_vm.confirmDelete = false}}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/form/Toolbar.vue?vue&type=template&id=1e407a02&

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(3);

// EXTERNAL MODULE: ./app/components/util/ConfirmDelete.vue + 4 modules
var ConfirmDelete = __webpack_require__(250);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/form/Toolbar.vue?vue&type=script&lang=ts&


/* harmony default export */ var Toolbarvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    ConfirmDelete: ConfirmDelete["a" /* default */]
  },
  props: {
    handleBack: {
      type: Function,
      default: null
    },
    handleEdit: {
      type: Function,
      default: null
    },
    handleSubmit: {
      type: Function,
      default: null
    },
    handleReset: {
      type: Function,
      default: null
    },
    handleDelete: {
      type: Function,
      default: null
    },
    handleAdd: {
      type: Function,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const confirmDelete = Object(runtime["m" /* ref */])(false);

    const goBack = () => {
      if (props.handleBack) {
        // @ts-ignore
        props.handleBack();
      }
    };

    const addItem = () => {
      if (props.handleAdd) {
        // @ts-ignore
        props.handleAdd();
      }
    };

    const editItem = () => {
      if (props.handleEdit) {
        // @ts-ignore
        props.handleEdit();
      }
    };

    const submitItem = () => {
      if (props.handleSubmit) {
        // @ts-ignore
        props.handleSubmit();
      }
    };

    const resetItem = () => {
      if (props.handleReset) {
        // @ts-ignore
        props.handleReset();
      }
    };

    return {
      confirmDelete,
      goBack,
      addItem,
      editItem,
      submitItem,
      resetItem
    };
  }

}));
// CONCATENATED MODULE: ./app/components/form/Toolbar.vue?vue&type=script&lang=ts&
 /* harmony default export */ var form_Toolbarvue_type_script_lang_ts_ = (Toolbarvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(13);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(235);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VToolbar/VToolbar.js
var VToolbar = __webpack_require__(20);

// CONCATENATED MODULE: ./app/components/form/Toolbar.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  form_Toolbarvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "a06a6888"
  
)

/* harmony default export */ var Toolbar = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */





installComponents_default()(component, {VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */],VSpacer: VSpacer["a" /* default */],VToolbar: VToolbar["a" /* default */]})


/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(277);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("50788f08", content, true)

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(260);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("1f651591", content, true)

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-menu{display:none}.v-menu--attached{display:inline}.v-menu__content{position:absolute;display:inline-block;max-width:80%;overflow-y:auto;overflow-x:hidden;contain:content;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);border-radius:4px}.v-menu__content--active{pointer-events:none}.v-menu__content--auto .v-list-item{transition-property:transform,opacity;transition-duration:.3s;transition-timing-function:cubic-bezier(.25,.8,.25,1)}.v-menu__content--fixed{position:fixed}.v-menu__content>.card{contain:content;-webkit-backface-visibility:hidden;backface-visibility:hidden}.v-menu>.v-menu__content{max-width:none}.v-menu-transition-enter .v-list-item{min-width:0;pointer-events:none}.v-menu-transition-enter-to .v-list-item{transition-delay:.1s}.v-menu-transition-leave-active,.v-menu-transition-leave-to{pointer-events:none}.v-menu-transition-enter,.v-menu-transition-leave-to{opacity:0}.v-menu-transition-enter-active,.v-menu-transition-leave-active{transition:all .3s cubic-bezier(.25,.8,.25,1)}.v-menu-transition-enter.v-menu__content--auto{transition:none!important}.v-menu-transition-enter.v-menu__content--auto .v-list-item{opacity:0;transform:translateY(-15px)}.v-menu-transition-enter.v-menu__content--auto .v-list-item--active{opacity:1;transform:none!important;pointer-events:auto}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(262);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("3f1da7f4", content, true)

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".theme--light.v-select .v-select__selections{color:rgba(0,0,0,.87);min-height:10px}.theme--light.v-select.v-input--is-disabled .v-select__selections,.theme--light.v-select .v-select__selection--disabled{color:rgba(0,0,0,.38)}.theme--light.v-select.v-text-field--solo-inverted.v-input--is-focused .v-select__selections{color:#fff}.theme--dark.v-select .v-select__selections{color:#fff;min-height:10px}.theme--dark.v-select.v-input--is-disabled .v-select__selections,.theme--dark.v-select .v-select__selection--disabled{color:hsla(0,0%,100%,.5)}.theme--dark.v-select.v-text-field--solo-inverted.v-input--is-focused .v-select__selections{color:rgba(0,0,0,.87)}.v-select{position:relative}.v-select:not(.v-select--is-multi).v-text-field--single-line .v-select__selections{flex-wrap:nowrap}.v-select>.v-input__control>.v-input__slot{cursor:pointer}.v-select .v-chip{flex:0 1 auto;margin:4px}.v-select .v-chip--selected:after{opacity:.22}.v-select .fade-transition-leave-active{position:absolute;left:0}.v-select.v-input--is-dirty ::-moz-placeholder{color:transparent!important}.v-select.v-input--is-dirty :-ms-input-placeholder{color:transparent!important}.v-select.v-input--is-dirty ::placeholder{color:transparent!important}.v-select:not(.v-input--is-dirty):not(.v-input--is-focused) .v-text-field__prefix{line-height:20px;top:7px;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-select.v-text-field--enclosed:not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__selections{padding-top:20px}.v-select.v-text-field--outlined:not(.v-text-field--single-line) .v-select__selections{padding:8px 0}.v-select.v-text-field--outlined:not(.v-text-field--single-line).v-input--dense .v-select__selections{padding:4px 0}.v-select.v-text-field input{flex:1 1;min-width:0;pointer-events:none;position:relative}.v-select.v-text-field:not(.v-text-field--single-line) input{margin-top:0}.v-select.v-select--is-menu-active .v-input__icon--append .v-icon{transform:rotate(180deg)}.v-select.v-select--chips input{margin:0}.v-select.v-select--chips .v-select__selections{min-height:42px}.v-select.v-select--chips.v-input--dense .v-select__selections{min-height:40px}.v-select.v-select--chips .v-chip--select.v-chip--active:before{opacity:.2}.v-select.v-select--chips.v-select--chips--small .v-select__selections{min-height:26px}.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box .v-select__selections,.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections{min-height:68px}.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box.v-input--dense .v-select__selections,.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed.v-input--dense .v-select__selections{min-height:40px}.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box.v-select--chips--small .v-select__selections,.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed.v-select--chips--small .v-select__selections{min-height:26px}.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box.v-select--chips--small.v-input--dense .v-select__selections,.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed.v-select--chips--small.v-input--dense .v-select__selections{min-height:38px}.v-select.v-text-field--reverse .v-select__selections,.v-select.v-text-field--reverse .v-select__slot{flex-direction:row-reverse}.v-select__selections{align-items:center;display:flex;flex:1 1;flex-wrap:wrap;line-height:18px;max-width:100%;min-width:0}.v-select__selection{max-width:90%}.v-select__selection--comma{margin:7px 4px 7px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.v-select.v-input--dense .v-select__selection--comma{margin:5px 4px 3px 0}.v-select.v-input--dense .v-chip{margin:0 4px}.v-select__slot{position:relative;align-items:center;display:flex;max-width:100%;min-width:0;width:100%}.v-select:not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{align-self:flex-end}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(264);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("5c37caa6", content, true)

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-simple-checkbox{align-self:center;line-height:normal;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-simple-checkbox .v-icon{cursor:pointer}.v-simple-checkbox--disabled{cursor:default}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(266);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("e8b41e5e", content, true)

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".theme--light.v-subheader{color:rgba(0,0,0,.6)}.theme--dark.v-subheader{color:hsla(0,0%,100%,.7)}.v-subheader{align-items:center;display:flex;height:48px;font-size:.875rem;font-weight:400;padding:0 16px}.v-subheader--inset{margin-left:56px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
// Directives
 // Types


/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
  name: 'rippleable',
  directives: {
    ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]
  },
  props: {
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  methods: {
    genRipple(data = {}) {
      if (!this.ripple) return null;
      data.staticClass = 'v-input--selection-controls__ripple';
      data.directives = data.directives || [];
      data.directives.push({
        name: 'ripple',
        value: {
          center: true
        }
      });
      return this.$createElement('div', data);
    }

  }
}));

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Loading.vue?vue&type=template&id=e0a13a10&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-center"},[_c('v-overlay',{attrs:{"value":_vm.visible}},[_c('v-progress-circular',{attrs:{"indeterminate":"","size":"64"}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Loading.vue?vue&type=template&id=e0a13a10&

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Loading.vue?vue&type=script&lang=ts&

/* harmony default export */ var Loadingvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
}));
// CONCATENATED MODULE: ./app/components/util/Loading.vue?vue&type=script&lang=ts&
 /* harmony default export */ var util_Loadingvue_type_script_lang_ts_ = (Loadingvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(13);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VOverlay/VOverlay.js
var VOverlay = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
var VProgressCircular = __webpack_require__(64);

// CONCATENATED MODULE: ./app/components/util/Loading.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  util_Loadingvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "4f434f3b"
  
)

/* harmony default export */ var Loading = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */



installComponents_default()(component, {VOverlay: VOverlay["a" /* default */],VProgressCircular: VProgressCircular["a" /* default */]})


/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(271);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("2e2bc7da", content, true)

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".theme--light.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:hsla(0,0%,100%,.3)!important}.v-input--selection-controls{margin-top:16px;padding-top:4px}.v-input--selection-controls>.v-input__append-outer,.v-input--selection-controls>.v-input__prepend-outer{margin-top:0;margin-bottom:0}.v-input--selection-controls:not(.v-input--hide-details)>.v-input__slot{margin-bottom:12px}.v-input--selection-controls .v-input__slot,.v-input--selection-controls .v-radio{cursor:pointer}.v-input--selection-controls .v-input__slot>.v-label,.v-input--selection-controls .v-radio>.v-label{align-items:center;display:inline-flex;flex:1 1 auto;height:auto}.v-input--selection-controls__input{color:inherit;display:inline-flex;flex:0 0 auto;height:24px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);transition-property:transform;width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__input .v-icon{width:100%}.v-application--is-ltr .v-input--selection-controls__input{margin-right:8px}.v-application--is-rtl .v-input--selection-controls__input{margin-left:8px}.v-input--selection-controls__input input[role=checkbox],.v-input--selection-controls__input input[role=radio],.v-input--selection-controls__input input[role=switch]{position:absolute;opacity:0;width:100%;height:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__input+.v-label{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__ripple{border-radius:50%;cursor:pointer;height:34px;position:absolute;transition:inherit;width:34px;left:-12px;top:calc(50% - 24px);margin:7px}.v-input--selection-controls__ripple:before{border-radius:inherit;bottom:0;content:\"\";position:absolute;opacity:.2;left:0;right:0;top:0;transform-origin:center center;transform:scale(.2);transition:inherit}.v-input--selection-controls__ripple>.v-ripple__container{transform:scale(1.2)}.v-input--selection-controls.v-input--dense .v-input--selection-controls__ripple{width:28px;height:28px;left:-9px}.v-input--selection-controls.v-input--dense:not(.v-input--switch) .v-input--selection-controls__ripple{top:calc(50% - 21px)}.v-input--selection-controls.v-input{flex:0 1 auto}.v-input--selection-controls.v-input--is-focused .v-input--selection-controls__ripple:before,.v-input--selection-controls .v-radio--is-focused .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2)}.v-input--selection-controls__input:hover .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2);transition:none}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return prevent; });
/* harmony import */ var _components_VInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _rippleable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(267);
/* harmony import */ var _comparable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(243);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
// Components
 // Mixins


 // Utilities


function prevent(e) {
  e.preventDefault();
}
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_components_VInput__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], _rippleable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _comparable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]).extend({
  name: 'selectable',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    id: String,
    inputValue: null,
    falseValue: null,
    trueValue: null,
    multiple: {
      type: Boolean,
      default: null
    },
    label: String
  },

  data() {
    return {
      hasColor: this.inputValue,
      lazyValue: this.inputValue
    };
  },

  computed: {
    computedColor() {
      if (!this.isActive) return undefined;
      if (this.color) return this.color;
      if (this.isDark && !this.appIsDark) return 'white';
      return 'primary';
    },

    isMultiple() {
      return this.multiple === true || this.multiple === null && Array.isArray(this.internalValue);
    },

    isActive() {
      const value = this.value;
      const input = this.internalValue;

      if (this.isMultiple) {
        if (!Array.isArray(input)) return false;
        return input.some(item => this.valueComparator(item, value));
      }

      if (this.trueValue === undefined || this.falseValue === undefined) {
        return value ? this.valueComparator(value, input) : Boolean(input);
      }

      return this.valueComparator(input, this.trueValue);
    },

    isDirty() {
      return this.isActive;
    },

    rippleState() {
      return !this.isDisabled && !this.validationState ? undefined : this.validationState;
    }

  },
  watch: {
    inputValue(val) {
      this.lazyValue = val;
      this.hasColor = val;
    }

  },
  methods: {
    genLabel() {
      const label = _components_VInput__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].options.methods.genLabel.call(this);
      if (!label) return label;
      label.data.on = {
        // Label shouldn't cause the input to focus
        click: prevent
      };
      return label;
    },

    genInput(type, attrs) {
      return this.$createElement('input', {
        attrs: Object.assign({
          'aria-checked': this.isActive.toString(),
          disabled: this.isDisabled,
          id: this.computedId,
          role: type,
          type
        }, attrs),
        domProps: {
          value: this.value,
          checked: this.isActive
        },
        on: {
          blur: this.onBlur,
          change: this.onChange,
          focus: this.onFocus,
          keydown: this.onKeydown,
          click: prevent
        },
        ref: 'input'
      });
    },

    onBlur() {
      this.isFocused = false;
    },

    onClick(e) {
      this.onChange();
      this.$emit('click', e);
    },

    onChange() {
      if (!this.isInteractive) return;
      const value = this.value;
      let input = this.internalValue;

      if (this.isMultiple) {
        if (!Array.isArray(input)) {
          input = [];
        }

        const length = input.length;
        input = input.filter(item => !this.valueComparator(item, value));

        if (input.length === length) {
          input.push(value);
        }
      } else if (this.trueValue !== undefined && this.falseValue !== undefined) {
        input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
      } else if (value) {
        input = this.valueComparator(input, value) ? null : value;
      } else {
        input = !input;
      }

      this.validate(true, input);
      this.internalValue = input;
      this.hasColor = input;
    },

    onFocus() {
      this.isFocused = true;
    },

    /** @abstract */
    onKeydown(e) {}

  }
}));

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mediaNodeStore; });
/* harmony import */ var _nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _custom_store_AbstractStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);



class MediaNodeStore extends _custom_store_AbstractStore__WEBPACK_IMPORTED_MODULE_1__[/* PersistentApiStore */ "a"] {
  constructor() {
    super(...arguments);
    this.deleteRole = 'USER_CAN_DELETE_GALLERIES';
    this.editRole = 'USER_CAN_EDIT_GALLERIES';
    this.listRole = 'USER_CAN_ACCESS_GALLERIES';
    this.tree = Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__[/* computed */ "a"])(() => {
      const tree = [];
      this.state.allTreeIds.forEach(id => {
        const node = this.findTree(id);
        tree.push({
          '@id': node['@id'],
          children: node.children,
          name: node.name
        });
        return tree;
      });
      return tree;
    });
    this.rootNodes = Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__[/* computed */ "a"])(() => this.list.value.filter(mediaNode => !mediaNode.parent));
  }

  getAdditionalData() {
    return {
      allTreeIds: [],
      treeById: {},
      treeError: '',
      treeIsLoading: false,
      resetTree: false
    };
  }

  getAddLocation() {
    return null;
  }

  getEditLocation(item) {
    return null;
  }

  getIdentifierFromUrlParam(param) {
    return '';
  }

  getListLocation() {
    return null;
  }

  toggleTreeLoading() {
    this.state.treeIsLoading = !this.state.treeIsLoading;
  }

  resetTree() {
    Object.assign(this.state, {
      allTreeIds: [],
      treeById: {},
      treeError: '',
      treeIsLoading: false,
      resetTree: false
    });
  }

  addTreeItem(item) {
    this.state.treeById[item['@id']] = item;

    if (this.state.allTreeIds.includes(item['@id'])) {
      return;
    }

    this.state.allTreeIds.push(item['@id']);
  }

  handleTreeError(e) {
    this.state.treeError = e.message;
  }

  async fetchTree() {
    this.toggleTreeLoading();

    try {
      const retrieved = await this.context.$getRepository(this.storeName).validateAndDecodeResponse('media_nodes/tree');

      if (this.state.resetTree) {
        this.resetTree();
      }

      retrieved['hydra:member'].forEach(item => {
        this.addTreeItem(item);
      });
      this.toggleTreeLoading();
      return retrieved;
    } catch (e) {
      this.handleTreeError(e);
    }
  }

  findTree(id) {
    return this.state.treeById[id];
  }

}

const mediaNodeStore = new MediaNodeStore('media_nodes');

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
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

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(248);
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(275);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(237);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(81);
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(239);
/* harmony import */ var _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(85);
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(241);
/* harmony import */ var _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(240);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(82);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5);
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

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input{pointer-events:inherit}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(316);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("6e6fa1de", content, true, context)
};

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(320);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("3f082308", content, true, context)
};

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(322);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("570f4478", content, true, context)
};

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _custom_store_NotificationStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);



const itemCreate = (store, options = {
  admin: true
}) => {
  const router = Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__[/* useRouter */ "u"])();
  const createForm = Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__[/* ref */ "m"])(null);

  const onCreated = item => {
    if (item === null) {
      return;
    }

    _custom_store_NotificationStore__WEBPACK_IMPORTED_MODULE_1__[/* notificationStore */ "a"].showMessage(store.getCreateMessage(item));
    const location = options.admin ? store.getEditLocation(item) : store.getEditFrontLocation(item);

    if (location) {
      router.push(location);
    }
  };

  Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__[/* watch */ "v"])(() => store.getState().created, created => {
    if (!created) {
      return;
    }

    onCreated(created);
  });
  Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__[/* watch */ "v"])(() => store.getState().error, message => {
    message && _custom_store_NotificationStore__WEBPACK_IMPORTED_MODULE_1__[/* notificationStore */ "a"].showError(message);
  });

  const onSendForm = () => {
    if (!createForm.value) {
      return;
    }

    createForm.value.v$.$touch();

    if (!createForm.value.v$.$invalid) {
      if (options.dataCallback) {
        // @ts-ignore
        createForm.value.item = options.dataCallback(createForm.value.item);
      } // @ts-ignore


      store.create(createForm.value.item);
    }
  };

  const resetForm = item => {
    if (!createForm.value) {
      return;
    }

    createForm.value.v$.$reset();
    item.value = {};
  };

  return Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_0__[/* reactive */ "k"])({
    createForm,
    onCreated,
    onSendForm,
    resetForm,
    state: store.getState()
  });
};

/* harmony default export */ __webpack_exports__["a"] = (itemCreate);

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(295);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("5c8fbe94", content, true)

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-textarea textarea{align-self:stretch;flex:1 1 auto;line-height:1.75rem;max-width:100%;min-height:32px;outline:none;padding:0;width:100%}.v-textarea .v-text-field__prefix,.v-textarea .v-text-field__suffix{padding-top:2px;align-self:start}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea{margin-top:10px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense textarea{margin-top:6px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-outer{align-self:flex-start;margin-top:8px}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:12px}.v-application--is-ltr .v-textarea.v-text-field--solo .v-input__append-inner{padding-left:12px}.v-application--is-rtl .v-textarea.v-text-field--solo .v-input__append-inner{padding-right:12px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-textarea.v-text-field--enclosed .v-text-field__slot{align-self:stretch}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-left:-12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-left:12px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pageCategoryStore; });
/* harmony import */ var _custom_store_AbstractStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);


class PageCategoryStore extends _custom_store_AbstractStore__WEBPACK_IMPORTED_MODULE_0__[/* PersistentApiStore */ "a"] {
  constructor() {
    super(...arguments);
    this.listRole = 'USER_CAN_ACCESS_PAGE_CATEGORIES';
    this.editRole = 'USER_CAN_EDIT_PAGE_CATEGORIES';
    this.deleteRole = 'USER_CAN_DELETE_PAGE_CATEGORIES';
  }

  getAddLocation() {
    return {
      name: 'admin-page-category-new'
    };
  }

  getEditLocation(item) {
    return {
      name: 'admin-page-category-id',
      params: {
        id: item.id.toString()
      }
    };
  }

  getListLocation() {
    return {
      name: 'admin-page-category'
    };
  }

}

const pageCategoryStore = new PageCategoryStore('page_categories');

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(333);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("5cc24a03", content, true, context)
};

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(335);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("3c754c33", content, true, context)
};

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(304);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("beda1088", content, true)

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".theme--light.v-input--switch .v-input--switch__thumb{color:#fff}.theme--light.v-input--switch .v-input--switch__track{color:rgba(0,0,0,.38)}.theme--light.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__thumb{color:#fafafa!important}.theme--light.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__track{color:rgba(0,0,0,.12)!important}.theme--dark.v-input--switch .v-input--switch__thumb{color:#bdbdbd}.theme--dark.v-input--switch .v-input--switch__track{color:hsla(0,0%,100%,.3)}.theme--dark.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__thumb{color:#424242!important}.theme--dark.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__track{color:hsla(0,0%,100%,.1)!important}.v-input--switch__thumb,.v-input--switch__track{background-color:currentColor;pointer-events:none;transition:inherit}.v-input--switch__track{border-radius:8px;width:36px;height:14px;left:2px;position:absolute;opacity:.6;right:2px;top:calc(50% - 7px)}.v-input--switch__thumb{border-radius:50%;top:calc(50% - 10px);height:20px;position:relative;width:20px;display:flex;justify-content:center;align-items:center;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-input--switch .v-input--selection-controls__input{width:38px}.v-input--switch .v-input--selection-controls__ripple{top:calc(50% - 24px)}.v-input--switch.v-input--dense .v-input--switch__thumb{width:18px;height:18px}.v-input--switch.v-input--dense .v-input--switch__track{height:12px;width:32px}.v-input--switch.v-input--dense.v-input--switch--inset .v-input--switch__track{height:22px;width:44px;top:calc(50% - 12px);left:-3px}.v-input--switch.v-input--dense .v-input--selection-controls__ripple{top:calc(50% - 22px)}.v-input--switch.v-input--is-dirty.v-input--is-disabled{opacity:.6}.v-application--is-ltr .v-input--switch .v-input--selection-controls__ripple{left:-14px}.v-application--is-ltr .v-input--switch.v-input--dense .v-input--selection-controls__ripple{left:-12px}.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--switch__thumb{transform:translate(20px)}.v-application--is-rtl .v-input--switch .v-input--selection-controls__ripple{right:-14px}.v-application--is-rtl .v-input--switch.v-input--dense .v-input--selection-controls__ripple{right:-12px}.v-application--is-rtl .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-rtl .v-input--switch.v-input--is-dirty .v-input--switch__thumb{transform:translate(-20px)}.v-input--switch:not(.v-input--switch--flat):not(.v-input--switch--inset) .v-input--switch__thumb{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.v-input--switch--inset .v-input--selection-controls__input,.v-input--switch--inset .v-input--switch__track{width:48px}.v-input--switch--inset .v-input--switch__track{border-radius:14px;height:28px;left:-4px;opacity:.32;top:calc(50% - 14px)}.v-application--is-ltr .v-input--switch--inset .v-input--selection-controls__ripple,.v-application--is-ltr .v-input--switch--inset .v-input--switch__thumb{transform:translate(0)!important}.v-application--is-rtl .v-input--switch--inset .v-input--selection-controls__ripple,.v-application--is-rtl .v-input--switch--inset .v-input--switch__thumb{transform:translate(-6px)!important}.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb{transform:translate(20px)!important}.v-application--is-rtl .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-rtl .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb{transform:translate(-26px)!important}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VAutocomplete/VAutocomplete.sass
var VAutocomplete = __webpack_require__(258);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSelect/VSelect.js + 4 modules
var VSelect = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.js + 3 modules
var VTextField = __webpack_require__(203);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mergeData.js
var mergeData = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VAutocomplete/VAutocomplete.js
// Styles
 // Extensions


 // Utilities



const defaultMenuProps = { ...VSelect["b" /* defaultMenuProps */],
  offsetY: true,
  offsetOverflow: true,
  transition: false
};
/* @vue/component */

/* harmony default export */ var VAutocomplete_VAutocomplete = (VSelect["a" /* default */].extend({
  name: 'v-autocomplete',
  props: {
    allowOverflow: {
      type: Boolean,
      default: true
    },
    autoSelectFirst: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1;
      }
    },
    hideNoData: Boolean,
    menuProps: {
      type: VSelect["a" /* default */].options.props.menuProps.type,
      default: () => defaultMenuProps
    },
    noFilter: Boolean,
    searchInput: {
      type: String
    }
  },

  data() {
    return {
      lazySearch: this.searchInput
    };
  },

  computed: {
    classes() {
      return { ...VSelect["a" /* default */].options.computed.classes.call(this),
        'v-autocomplete': true,
        'v-autocomplete--is-selecting-index': this.selectedIndex > -1
      };
    },

    computedItems() {
      return this.filteredItems;
    },

    selectedValues() {
      return this.selectedItems.map(item => this.getValue(item));
    },

    hasDisplayedItems() {
      return this.hideSelected ? this.filteredItems.some(item => !this.hasItem(item)) : this.filteredItems.length > 0;
    },

    currentRange() {
      if (this.selectedItem == null) return 0;
      return String(this.getText(this.selectedItem)).length;
    },

    filteredItems() {
      if (!this.isSearching || this.noFilter || this.internalSearch == null) return this.allItems;
      return this.allItems.filter(item => {
        const value = Object(helpers["s" /* getPropertyFromItem */])(item, this.itemText);
        const text = value != null ? String(value) : '';
        return this.filter(item, String(this.internalSearch), text);
      });
    },

    internalSearch: {
      get() {
        return this.lazySearch;
      },

      set(val) {
        // emit update event only when the new
        // search value is different from previous
        if (this.lazySearch !== val) {
          this.lazySearch = val;
          this.$emit('update:search-input', val);
        }
      }

    },

    isAnyValueAllowed() {
      return false;
    },

    isDirty() {
      return this.searchIsDirty || this.selectedItems.length > 0;
    },

    isSearching() {
      return this.multiple && this.searchIsDirty || this.searchIsDirty && this.internalSearch !== this.getText(this.selectedItem);
    },

    menuCanShow() {
      if (!this.isFocused) return false;
      return this.hasDisplayedItems || !this.hideNoData;
    },

    $_menuProps() {
      const props = VSelect["a" /* default */].options.computed.$_menuProps.call(this);
      props.contentClass = `v-autocomplete__content ${props.contentClass || ''}`.trim();
      return { ...defaultMenuProps,
        ...props
      };
    },

    searchIsDirty() {
      return this.internalSearch != null && this.internalSearch !== '';
    },

    selectedItem() {
      if (this.multiple) return null;
      return this.selectedItems.find(i => {
        return this.valueComparator(this.getValue(i), this.getValue(this.internalValue));
      });
    },

    listData() {
      const data = VSelect["a" /* default */].options.computed.listData.call(this);
      data.props = { ...data.props,
        items: this.virtualizedItems,
        noFilter: this.noFilter || !this.isSearching || !this.filteredItems.length,
        searchInput: this.internalSearch
      };
      return data;
    }

  },
  watch: {
    filteredItems: 'onFilteredItemsChanged',
    internalValue: 'setSearch',

    isFocused(val) {
      if (val) {
        document.addEventListener('copy', this.onCopy);
        this.$refs.input && this.$refs.input.select();
      } else {
        document.removeEventListener('copy', this.onCopy);
        this.$refs.input && this.$refs.input.blur();
        this.updateSelf();
      }
    },

    isMenuActive(val) {
      if (val || !this.hasSlot) return;
      this.lazySearch = null;
    },

    items(val, oldVal) {
      // If we are focused, the menu
      // is not active, hide no data is enabled,
      // and items change
      // User is probably async loading
      // items, try to activate the menu
      if (!(oldVal && oldVal.length) && this.hideNoData && this.isFocused && !this.isMenuActive && val.length) this.activateMenu();
    },

    searchInput(val) {
      this.lazySearch = val;
    },

    internalSearch: 'onInternalSearchChanged',
    itemText: 'updateSelf'
  },

  created() {
    this.setSearch();
  },

  destroyed() {
    document.removeEventListener('copy', this.onCopy);
  },

  methods: {
    onFilteredItemsChanged(val, oldVal) {
      // TODO: How is the watcher triggered
      // for duplicate items? no idea
      if (val === oldVal) return;
      this.setMenuIndex(-1);
      this.$nextTick(() => {
        if (!this.internalSearch || val.length !== 1 && !this.autoSelectFirst) return;
        this.$refs.menu.getTiles();
        this.setMenuIndex(0);
      });
    },

    onInternalSearchChanged() {
      this.updateMenuDimensions();
    },

    updateMenuDimensions() {
      // Type from menuable is not making it through
      this.isMenuActive && this.$refs.menu && this.$refs.menu.updateDimensions();
    },

    changeSelectedIndex(keyCode) {
      // Do not allow changing of selectedIndex
      // when search is dirty
      if (this.searchIsDirty) return;

      if (this.multiple && keyCode === helpers["y" /* keyCodes */].left) {
        if (this.selectedIndex === -1) {
          this.selectedIndex = this.selectedItems.length - 1;
        } else {
          this.selectedIndex--;
        }
      } else if (this.multiple && keyCode === helpers["y" /* keyCodes */].right) {
        if (this.selectedIndex >= this.selectedItems.length - 1) {
          this.selectedIndex = -1;
        } else {
          this.selectedIndex++;
        }
      } else if (keyCode === helpers["y" /* keyCodes */].backspace || keyCode === helpers["y" /* keyCodes */].delete) {
        this.deleteCurrentItem();
      }
    },

    deleteCurrentItem() {
      const curIndex = this.selectedIndex;
      const curItem = this.selectedItems[curIndex]; // Do nothing if input or item is disabled

      if (!this.isInteractive || this.getDisabled(curItem)) return;
      const lastIndex = this.selectedItems.length - 1; // Select the last item if
      // there is no selection

      if (this.selectedIndex === -1 && lastIndex !== 0) {
        this.selectedIndex = lastIndex;
        return;
      }

      const length = this.selectedItems.length;
      const nextIndex = curIndex !== length - 1 ? curIndex : curIndex - 1;
      const nextItem = this.selectedItems[nextIndex];

      if (!nextItem) {
        this.setValue(this.multiple ? [] : null);
      } else {
        this.selectItem(curItem);
      }

      this.selectedIndex = nextIndex;
    },

    clearableCallback() {
      this.internalSearch = null;
      VSelect["a" /* default */].options.methods.clearableCallback.call(this);
    },

    genInput() {
      const input = VTextField["a" /* default */].options.methods.genInput.call(this);
      input.data = Object(mergeData["a" /* default */])(input.data, {
        attrs: {
          'aria-activedescendant': Object(helpers["q" /* getObjectValueByPath */])(this.$refs.menu, 'activeTile.id'),
          autocomplete: Object(helpers["q" /* getObjectValueByPath */])(input.data, 'attrs.autocomplete', 'off')
        },
        domProps: {
          value: this.internalSearch
        }
      });
      return input;
    },

    genInputSlot() {
      const slot = VSelect["a" /* default */].options.methods.genInputSlot.call(this);
      slot.data.attrs.role = 'combobox';
      return slot;
    },

    genSelections() {
      return this.hasSlot || this.multiple ? VSelect["a" /* default */].options.methods.genSelections.call(this) : [];
    },

    onClick(e) {
      if (!this.isInteractive) return;
      this.selectedIndex > -1 ? this.selectedIndex = -1 : this.onFocus();
      if (!this.isAppendInner(e.target)) this.activateMenu();
    },

    onInput(e) {
      if (this.selectedIndex > -1 || !e.target) return;
      const target = e.target;
      const value = target.value; // If typing and menu is not currently active

      if (target.value) this.activateMenu();
      this.internalSearch = value;
      this.badInput = target.validity && target.validity.badInput;
    },

    onKeyDown(e) {
      const keyCode = e.keyCode;

      if (e.ctrlKey || ![helpers["y" /* keyCodes */].home, helpers["y" /* keyCodes */].end].includes(keyCode)) {
        VSelect["a" /* default */].options.methods.onKeyDown.call(this, e);
      } // The ordering is important here
      // allows new value to be updated
      // and then moves the index to the
      // proper location


      this.changeSelectedIndex(keyCode);
    },

    onSpaceDown(e) {},

    onTabDown(e) {
      VSelect["a" /* default */].options.methods.onTabDown.call(this, e);
      this.updateSelf();
    },

    onUpDown(e) {
      // Prevent screen from scrolling
      e.preventDefault(); // For autocomplete / combobox, cycling
      // interfers with native up/down behavior
      // instead activate the menu

      this.activateMenu();
    },

    selectItem(item) {
      VSelect["a" /* default */].options.methods.selectItem.call(this, item);
      this.setSearch();
    },

    setSelectedItems() {
      VSelect["a" /* default */].options.methods.setSelectedItems.call(this); // #4273 Don't replace if searching
      // #4403 Don't replace if focused

      if (!this.isFocused) this.setSearch();
    },

    setSearch() {
      // Wait for nextTick so selectedItem
      // has had time to update
      this.$nextTick(() => {
        if (!this.multiple || !this.internalSearch || !this.isMenuActive) {
          this.internalSearch = !this.selectedItems.length || this.multiple || this.hasSlot ? null : this.getText(this.selectedItem);
        }
      });
    },

    updateSelf() {
      if (!this.searchIsDirty && !this.internalValue) return;

      if (!this.valueComparator(this.internalSearch, this.getValue(this.internalValue))) {
        this.setSearch();
      }
    },

    hasItem(item) {
      return this.selectedValues.indexOf(this.getValue(item)) > -1;
    },

    onCopy(event) {
      var _event$clipboardData, _event$clipboardData2;

      if (this.selectedIndex === -1) return;
      const currentItem = this.selectedItems[this.selectedIndex];
      const currentItemText = this.getText(currentItem);
      (_event$clipboardData = event.clipboardData) == null ? void 0 : _event$clipboardData.setData('text/plain', currentItemText);
      (_event$clipboardData2 = event.clipboardData) == null ? void 0 : _event$clipboardData2.setData('text/vnd.vuetify.autocomplete.item+plain', currentItemText);
      event.preventDefault();
    }

  }
}));
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VCombobox/VCombobox.js
// Styles
 // Extensions


 // Utils


/* @vue/component */

/* harmony default export */ var VCombobox = __webpack_exports__["a"] = (VAutocomplete_VAutocomplete.extend({
  name: 'v-combobox',
  props: {
    delimiters: {
      type: Array,
      default: () => []
    },
    returnObject: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    editingIndex: -1
  }),
  computed: {
    computedCounterValue() {
      return this.multiple ? this.selectedItems.length : (this.internalSearch || '').toString().length;
    },

    hasSlot() {
      return VSelect["a" /* default */].options.computed.hasSlot.call(this) || this.multiple;
    },

    isAnyValueAllowed() {
      return true;
    },

    menuCanShow() {
      if (!this.isFocused) return false;
      return this.hasDisplayedItems || !!this.$slots['no-data'] && !this.hideNoData;
    },

    searchIsDirty() {
      return this.internalSearch != null;
    }

  },
  methods: {
    onInternalSearchChanged(val) {
      if (val && this.multiple && this.delimiters.length) {
        const delimiter = this.delimiters.find(d => val.endsWith(d));

        if (delimiter != null) {
          this.internalSearch = val.slice(0, val.length - delimiter.length);
          this.updateTags();
        }
      }

      this.updateMenuDimensions();
    },

    genInput() {
      const input = VAutocomplete_VAutocomplete.options.methods.genInput.call(this);
      delete input.data.attrs.name;
      input.data.on.paste = this.onPaste;
      return input;
    },

    genChipSelection(item, index) {
      const chip = VSelect["a" /* default */].options.methods.genChipSelection.call(this, item, index); // Allow user to update an existing value

      if (this.multiple) {
        chip.componentOptions.listeners = { ...chip.componentOptions.listeners,
          dblclick: () => {
            this.editingIndex = index;
            this.internalSearch = this.getText(item);
            this.selectedIndex = -1;
          }
        };
      }

      return chip;
    },

    onChipInput(item) {
      VSelect["a" /* default */].options.methods.onChipInput.call(this, item);
      this.editingIndex = -1;
    },

    // Requires a manual definition
    // to overwrite removal in v-autocomplete
    onEnterDown(e) {
      e.preventDefault(); // If has menu index, let v-select-list handle

      if (this.getMenuIndex() > -1) return;
      this.$nextTick(this.updateSelf);
    },

    onFilteredItemsChanged(val, oldVal) {
      if (!this.autoSelectFirst) return;
      VAutocomplete_VAutocomplete.options.methods.onFilteredItemsChanged.call(this, val, oldVal);
    },

    onKeyDown(e) {
      const keyCode = e.keyCode;

      if (e.ctrlKey || ![helpers["y" /* keyCodes */].home, helpers["y" /* keyCodes */].end].includes(keyCode)) {
        VSelect["a" /* default */].options.methods.onKeyDown.call(this, e);
      } // If user is at selection index of 0
      // create a new tag


      if (this.multiple && keyCode === helpers["y" /* keyCodes */].left && this.$refs.input.selectionStart === 0) {
        this.updateSelf();
      } else if (keyCode === helpers["y" /* keyCodes */].enter) {
        this.onEnterDown(e);
      } // The ordering is important here
      // allows new value to be updated
      // and then moves the index to the
      // proper location


      this.changeSelectedIndex(keyCode);
    },

    onTabDown(e) {
      // When adding tags, if searching and
      // there is not a filtered options,
      // add the value to the tags list
      if (this.multiple && this.internalSearch && this.getMenuIndex() === -1) {
        e.preventDefault();
        e.stopPropagation();
        return this.updateTags();
      }

      VAutocomplete_VAutocomplete.options.methods.onTabDown.call(this, e);
    },

    selectItem(item) {
      // Currently only supports items:<string[]>
      if (this.editingIndex > -1) {
        this.updateEditing();
      } else {
        VAutocomplete_VAutocomplete.options.methods.selectItem.call(this, item); // if selected item contains search value,
        // remove the search string

        if (this.internalSearch && this.multiple && this.getText(item).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())) {
          this.internalSearch = null;
        }
      }
    },

    setSelectedItems() {
      if (this.internalValue == null || this.internalValue === '') {
        this.selectedItems = [];
      } else {
        this.selectedItems = this.multiple ? this.internalValue : [this.internalValue];
      }
    },

    setValue(value) {
      var _value;

      VSelect["a" /* default */].options.methods.setValue.call(this, (_value = value) != null ? _value : this.internalSearch);
    },

    updateEditing() {
      const value = this.internalValue.slice();
      value[this.editingIndex] = this.internalSearch;
      this.setValue(value);
      this.editingIndex = -1;
    },

    updateCombobox() {
      // If search is not dirty, do nothing
      if (!this.searchIsDirty) return; // The internal search is not matching
      // the internal value, update the input

      if (this.internalSearch !== this.getText(this.internalValue)) this.setValue(); // Reset search if using slot to avoid a double input

      const isUsingSlot = Boolean(this.$scopedSlots.selection) || this.hasChips;
      if (isUsingSlot) this.internalSearch = null;
    },

    updateSelf() {
      this.multiple ? this.updateTags() : this.updateCombobox();
    },

    updateTags() {
      const menuIndex = this.getMenuIndex(); // If the user is not searching
      // and no menu item is selected
      // or if the search is empty
      // do nothing

      if (menuIndex < 0 && !this.searchIsDirty || !this.internalSearch) return;

      if (this.editingIndex > -1) {
        return this.updateEditing();
      }

      const index = this.selectedItems.findIndex(item => this.internalSearch === this.getText(item)); // If the duplicate item is an object,
      // copy it, so that it can be added again later

      const itemToSelect = index > -1 && typeof this.selectedItems[index] === 'object' ? Object.assign({}, this.selectedItems[index]) : this.internalSearch; // If it already exists, do nothing
      // this might need to change to bring
      // the duplicated item to the last entered

      if (index > -1) {
        const internalValue = this.internalValue.slice();
        internalValue.splice(index, 1);
        this.setValue(internalValue);
      } // If menu index is greater than 1
      // the selection is handled elsewhere
      // TODO: find out where


      if (menuIndex > -1) return this.internalSearch = null;
      this.selectItem(itemToSelect);
      this.internalSearch = null;
    },

    onPaste(event) {
      var _event$clipboardData;

      if (!this.multiple || this.searchIsDirty) return;
      const pastedItemText = (_event$clipboardData = event.clipboardData) == null ? void 0 : _event$clipboardData.getData('text/vnd.vuetify.autocomplete.item+plain');

      if (pastedItemText && this.findExistingIndex(pastedItemText) === -1) {
        event.preventDefault();
        VSelect["a" /* default */].options.methods.selectItem.call(this, pastedItemText);
      }
    },

    clearableCallback() {
      this.editingIndex = -1;
      VAutocomplete_VAutocomplete.options.methods.clearableCallback.call(this);
    }

  }
}));

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_2693157e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(289);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_2693157e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_2693157e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_2693157e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorBreadCrumb_vue_vue_type_style_index_0_id_2693157e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".file-navigator-breadcrumb-container[data-v-2693157e]{display:inline-block;cursor:pointer}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(318);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("dc0628f2", content, true)

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_2d92cf33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(290);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_2d92cf33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_2d92cf33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_2d92cf33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigatorContextMenu_vue_vue_type_style_index_0_id_2d92cf33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".context-menu[data-v-2d92cf33]{top:0;left:0;margin:0;padding:0;display:none;position:fixed;z-index:1000000}.context-menu--active[data-v-2d92cf33]{display:block}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_ee76563c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(291);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_ee76563c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_ee76563c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_ee76563c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileNavigator_vue_vue_type_style_index_0_id_ee76563c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "h3.navigator-title[data-v-ee76563c]{display:inline-block;cursor:pointer}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(324);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(7).default("811c37a6", content, true)

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".theme--light.v-treeview{color:rgba(0,0,0,.87)}.theme--light.v-treeview--hoverable .v-treeview-node__root:hover:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root:hover:before{opacity:.04}.theme--light.v-treeview--hoverable .v-treeview-node__root--active:before,.theme--light.v-treeview--hoverable .v-treeview-node__root--active:hover:before,.theme--light.v-treeview--hoverable .v-treeview-node__root:focus:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:hover:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root:focus:before{opacity:.12}.theme--light.v-treeview--hoverable .v-treeview-node__root--active:focus:before,.theme--light.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:focus:before{opacity:.16}.theme--light.v-treeview .v-treeview-node__root.v-treeview-node--active:before,.theme--light.v-treeview .v-treeview-node__root.v-treeview-node--active:hover:before{opacity:.12}.theme--light.v-treeview .v-treeview-node__root.v-treeview-node--active:focus:before{opacity:.16}.theme--light.v-treeview .v-treeview-node--disabled>.v-treeview-node__root>.v-treeview-node__content{color:rgba(0,0,0,.38)!important}.theme--dark.v-treeview{color:#fff}.theme--dark.v-treeview--hoverable .v-treeview-node__root:hover:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root:hover:before{opacity:.08}.theme--dark.v-treeview--hoverable .v-treeview-node__root--active:before,.theme--dark.v-treeview--hoverable .v-treeview-node__root--active:hover:before,.theme--dark.v-treeview--hoverable .v-treeview-node__root:focus:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:hover:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root:focus:before{opacity:.24}.theme--dark.v-treeview--hoverable .v-treeview-node__root--active:focus:before,.theme--dark.v-treeview .v-treeview-node--click>.v-treeview-node__root--active:focus:before{opacity:.32}.theme--dark.v-treeview .v-treeview-node__root.v-treeview-node--active:before,.theme--dark.v-treeview .v-treeview-node__root.v-treeview-node--active:hover:before{opacity:.24}.theme--dark.v-treeview .v-treeview-node__root.v-treeview-node--active:focus:before{opacity:.32}.theme--dark.v-treeview .v-treeview-node--disabled>.v-treeview-node__root>.v-treeview-node__content{color:hsla(0,0%,100%,.5)!important}.v-treeview-node.v-treeview-node--shaped .v-treeview-node__root,.v-treeview-node.v-treeview-node--shaped .v-treeview-node__root:before{border-bottom-right-radius:24px!important;border-top-right-radius:24px!important}.v-treeview-node.v-treeview-node--shaped .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview-node.v-treeview-node--rounded .v-treeview-node__root,.v-treeview-node.v-treeview-node--rounded .v-treeview-node__root:before{border-radius:24px!important}.v-treeview-node.v-treeview-node--rounded .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview-node--click>.v-treeview-node__root,.v-treeview-node--click>.v-treeview-node__root>.v-treeview-node__content>*{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-treeview-node.v-treeview-node--active .v-treeview-node__content .v-icon{color:inherit}.v-treeview-node__root{display:flex;align-items:center;min-height:48px;padding-left:8px;padding-right:8px;position:relative}.v-treeview-node__root:before{background-color:currentColor;bottom:0;content:\"\";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-treeview-node__root:after{content:\"\";font-size:0;min-height:inherit}.v-treeview-node__children{transition:all .2s cubic-bezier(0,0,.2,1)}.v-treeview--dense .v-treeview-node__root{min-height:40px}.v-treeview--dense.v-treeview-node--shaped .v-treeview-node__root,.v-treeview--dense.v-treeview-node--shaped .v-treeview-node__root:before{border-bottom-right-radius:20px!important;border-top-right-radius:20px!important}.v-treeview--dense.v-treeview-node--shaped .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview--dense.v-treeview-node--rounded .v-treeview-node__root,.v-treeview--dense.v-treeview-node--rounded .v-treeview-node__root:before{border-radius:20px!important}.v-treeview--dense.v-treeview-node--rounded .v-treeview-node__root{margin-top:8px;margin-bottom:8px}.v-treeview-node__checkbox{width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-application--is-ltr .v-treeview-node__checkbox{margin-left:6px}.v-application--is-rtl .v-treeview-node__checkbox{margin-right:6px}.v-treeview-node__toggle{width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-treeview-node__toggle--loading{-webkit-animation:progress-circular-rotate 1s linear infinite;animation:progress-circular-rotate 1s linear infinite}.v-application--is-ltr .v-treeview-node__toggle{transform:rotate(-90deg)}.v-application--is-ltr .v-treeview-node__toggle--open{transform:none}.v-application--is-rtl .v-treeview-node__toggle{transform:rotate(90deg)}.v-application--is-rtl .v-treeview-node__toggle--open{transform:none}.v-treeview-node__prepend{min-width:24px}.v-application--is-ltr .v-treeview-node__prepend{margin-right:6px}.v-application--is-rtl .v-treeview-node__prepend{margin-left:6px}.v-treeview-node__append{min-width:24px}.v-application--is-ltr .v-treeview-node__append{margin-left:6px}.v-application--is-rtl .v-treeview-node__append{margin-right:6px}.v-treeview-node__level{width:24px}.v-treeview-node__label{flex:1;font-size:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.v-treeview-node__content{align-items:center;display:flex;flex-basis:0%;flex-grow:1;flex-shrink:0;min-width:0}.v-treeview-node__content .v-btn{flex-grow:0!important;flex-shrink:1!important}.v-application--is-ltr .v-treeview-node__content{margin-left:6px}.v-application--is-rtl .v-treeview-node__content{margin-right:6px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/FileManager.vue?vue&type=template&id=70698858&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"cols":_vm.detailsPanel ? 8 : 12}},[_c('v-container',[(_vm.showSelection)?_c('v-row',[_c('v-col',[_c('file-selection',{attrs:{"thumbnails":_vm.thumbnails,"links":_vm.links,"remove-link":_vm.removeLink,"remove-thumbnail":_vm.removeThumbnail}})],1)],1):_vm._e(),_vm._v(" "),_c('v-row',[_c('v-col',[_c('file-navigator',{ref:"fileNavigator",attrs:{"select-click-handler":_vm.selectMediaObject,"current-media-node":_vm.currentMediaNode,"edit-click-handler":_vm.editMediaObject,"show-selection":_vm.showSelection},on:{"update:currentMediaNode":function($event){_vm.currentMediaNode=$event},"update:current-media-node":function($event){_vm.currentMediaNode=$event}}})],1)],1),_vm._v(" "),(_vm.currentMediaNode)?_c('v-row',[_c('v-col',[_c('file-uploader',{attrs:{"handle-upload":_vm.handleUpload}})],1)],1):_vm._e()],1)],1),_vm._v(" "),(_vm.detailsPanel)?_c('v-col',[_c('v-container',[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',[_c('file-details',{attrs:{"media-object":_vm.selectedMediaObject}})],1)],1)],1)],1):_vm._e()],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/FileManager.vue?vue&type=template&id=70698858&

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_selection/FileSelection.vue?vue&type=template&id=6f954c69&
var FileSelectionvue_type_template_id_6f954c69_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('h3',[_vm._v("Fichiers sélectionnés")])])],1),_vm._v(" "),(_vm.thumbnails.length + _vm.links.length === 0)?_c('v-row',[_c('v-col',[_c('p',[_vm._v("\n        Tu peux téleverser un fichier ou utiliser le navigateur pour sélectionner les fichiers à\n        insérer\n      ")])])],1):_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',[_c('v-container',[_c('v-row',{attrs:{"no-gutters":""}},_vm._l((_vm.thumbnails),function(thumbnail,i){return _c('v-col',{key:i,attrs:{"cols":"4","align-self":"center"}},[_c('v-card',[_c('v-img',{attrs:{"src":thumbnail.src,"max-height":"200","contain":""}}),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{staticClass:"btn-remove-thumbnail",attrs:{"fab":"","dark":"","x-small":"","color":"error"},on:{"click":function($event){return _vm.removeThumbnail(i)}}},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("\n                    ri-close-line\n                  ")])],1)],1)],1)],1)}),1),_vm._v(" "),_c('v-row',_vm._l((_vm.links),function(link,i){return _c('v-col',{key:i},[_c('span',[_vm._v(_vm._s(link.name)),_c('v-btn',{staticClass:"btn-remove-thumbnail",attrs:{"fab":"","dark":"","x-small":"","color":"error"},on:{"click":function($event){return _vm.removeLink(i)}}},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("\n                ri-close-line\n              ")])],1)],1)])}),1)],1)],1)],1)],1)}
var FileSelectionvue_type_template_id_6f954c69_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_selection/FileSelection.vue?vue&type=template&id=6f954c69&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_selection/FileSelection.vue?vue&type=script&lang=ts&

/* harmony default export */ var FileSelectionvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    thumbnails: {
      type: Array,
      required: true
    },
    links: {
      type: Array,
      required: true
    },
    removeThumbnail: {
      type: Function,
      required: true
    },
    removeLink: {
      type: Function,
      required: true
    }
  }
}));
// CONCATENATED MODULE: ./app/components/file-manager/file_selection/FileSelection.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_selection_FileSelectionvue_type_script_lang_ts_ = (FileSelectionvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(13);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js + 2 modules
var VImg = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(234);

// CONCATENATED MODULE: ./app/components/file-manager/file_selection/FileSelection.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  file_selection_FileSelectionvue_type_script_lang_ts_,
  FileSelectionvue_type_template_id_6f954c69_render,
  FileSelectionvue_type_template_id_6f954c69_staticRenderFns,
  false,
  null,
  null,
  "fb8760be"
  
)

/* harmony default export */ var FileSelection = (component.exports);

/* vuetify-loader */









installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VIcon: VIcon["a" /* default */],VImg: VImg["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_uploader/FileUploader.vue?vue&type=template&id=442163ab&
var FileUploadervue_type_template_id_442163ab_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('input',{ref:"fileSelection",staticStyle:{"display":"none"},attrs:{"id":"fileElem","type":"file","multiple":"","accept":"image/*"},on:{"change":_vm.onFileChange}}),_vm._v(" "),_c('v-btn',{on:{"click":_vm.openFileSelection}},[_vm._v("\n        Sélectionner des fichiers à téléverser\n      ")])],1)],1)],1)}
var FileUploadervue_type_template_id_442163ab_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_uploader/FileUploader.vue?vue&type=template&id=442163ab&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_uploader/FileUploader.vue?vue&type=script&lang=ts&

/* harmony default export */ var FileUploadervue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    handleUpload: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const fileSelection = Object(runtime["m" /* ref */])(null);

    const openFileSelection = () => {
      var _a;

      (_a = fileSelection.value) === null || _a === void 0 ? void 0 : _a.click();
    };

    const onFileChange = () => {
      var _a;

      const files = (_a = fileSelection.value) === null || _a === void 0 ? void 0 : _a.files;

      if (files) {
        // @ts-ignore
        props.handleUpload(files);
      }
    };

    return {
      fileSelection,
      openFileSelection,
      onFileChange
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/file_uploader/FileUploader.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_uploader_FileUploadervue_type_script_lang_ts_ = (FileUploadervue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file-manager/file_uploader/FileUploader.vue





/* normalize component */

var FileUploader_component = Object(componentNormalizer["a" /* default */])(
  file_uploader_FileUploadervue_type_script_lang_ts_,
  FileUploadervue_type_template_id_442163ab_render,
  FileUploadervue_type_template_id_442163ab_staticRenderFns,
  false,
  null,
  null,
  "064bbdbf"
  
)

/* harmony default export */ var FileUploader = (FileUploader_component.exports);

/* vuetify-loader */





installComponents_default()(FileUploader_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigator.vue?vue&type=template&id=ee76563c&scoped=true&
var FileNavigatorvue_type_template_id_ee76563c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('h3',{staticClass:"navigator-title",on:{"click":_vm.handleRootClick}},[_c('v-btn',{attrs:{"rounded":"","depressed":"","small":""}},[_vm._v("\n          Navigateur de fichier\n        ")])],1),_vm._v(" "),_c('file-navigator-bread-crumb',{attrs:{"media-node":_vm.currentMediaNode,"media-node-click-handler":_vm.handleMediaNodeClick}})],1)],1),_vm._v(" "),(_vm.currentMediaNode)?_c('v-row',{on:{"contextmenu":function($event){$event.preventDefault();return _vm.onRightClick.apply(null, arguments)}}},[_c('v-col',{attrs:{"cols":"12"}},[_c('h4',[_vm._v("Dossiers")])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12"}},[(_vm.currentMediaNode.children.length > 0)?_c('file-navigator-folders',{attrs:{"media-node":_vm.currentMediaNode,"handle-click":_vm.handleMediaNodeClick}}):_c('p',[_vm._v("\n        Aucun dossier\n      ")])],1)],1):_vm._e(),_vm._v(" "),(_vm.currentMediaNode && _vm.currentMediaNode.mediaObjects.length > 0)?_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('h4',[_vm._v("Fichiers")])]),_vm._v(" "),_c('v-col',[_c('file-navigator-files',{attrs:{"select-click-handler":_vm.selectClickHandler,"edit-click-handler":_vm.editClickHandler,"media-node":_vm.currentMediaNode}})],1)],1):_vm._e(),_vm._v(" "),(!_vm.currentMediaNode)?_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('h4',[_vm._v("Sélectionner un dossier")])]),_vm._v(" "),_vm._l((_vm.rootMediaNodes),function(node){return _c('v-col',{key:node['@id'],attrs:{"cols":"3"}},[_c('v-btn',{on:{"click":function($event){return _vm.handleMediaNodeClick(node['@id'])}}},[_vm._v("\n        "+_vm._s(node.name)+"\n      ")])],1)})],2):_vm._e(),_vm._v(" "),_c('file-navigator-context-menu',{ref:"fileNavigatorContextMenu",attrs:{"media-node":_vm.currentMediaNode,"refresh":_vm.refresh}})],1)}
var FileNavigatorvue_type_template_id_ee76563c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigator.vue?vue&type=template&id=ee76563c&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=template&id=2693157e&scoped=true&
var FileNavigatorBreadCrumbvue_type_template_id_2693157e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.mediaNode)?_c('div',{staticClass:"file-navigator-breadcrumb-container"},_vm._l((_vm.mediaNode.breadcrumb),function(crumb){return _vm._ssrNode("<span data-v-2693157e>","</span>",[_vm._ssrNode(" "),_c('v-icon',[_vm._v("ri-arrow-right-s-line")]),_vm._ssrNode(" "),_c('v-btn',{attrs:{"rounded":"","depressed":"","small":""}},[_vm._v(_vm._s(crumb.name))])],2)}),0):_vm._e()}
var FileNavigatorBreadCrumbvue_type_template_id_2693157e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=template&id=2693157e&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=script&lang=ts&

/* harmony default export */ var FileNavigatorBreadCrumbvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    mediaNode: {
      type: Object,
      default: null
    },
    mediaNodeClickHandler: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const handleCrumbClick = crumb => {
      // @ts-ignore
      props.mediaNodeClickHandler(crumb['@id']);
    };

    return {
      handleCrumbClick
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorBreadCrumb.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorBreadCrumbvue_type_script_lang_ts_ = (FileNavigatorBreadCrumbvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorBreadCrumb.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(315)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var FileNavigatorBreadCrumb_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorBreadCrumbvue_type_script_lang_ts_,
  FileNavigatorBreadCrumbvue_type_template_id_2693157e_scoped_true_render,
  FileNavigatorBreadCrumbvue_type_template_id_2693157e_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "2693157e",
  "41b0c28c"
  
)

/* harmony default export */ var FileNavigatorBreadCrumb = (FileNavigatorBreadCrumb_component.exports);

/* vuetify-loader */



installComponents_default()(FileNavigatorBreadCrumb_component, {VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorFolders.vue?vue&type=template&id=6a5b4db7&
var FileNavigatorFoldersvue_type_template_id_6a5b4db7_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',_vm._l((_vm.mediaNode.children),function(child){return _c('v-col',{key:child['@id']},[_c('v-btn',{on:{"click":function($event){return _vm.handleClick(child['@id'])}}},[_vm._v("\n        "+_vm._s(child.name)+"\n      ")])],1)}),1)],1)}
var FileNavigatorFoldersvue_type_template_id_6a5b4db7_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorFolders.vue?vue&type=template&id=6a5b4db7&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorFolders.vue?vue&type=script&lang=ts&

/* harmony default export */ var FileNavigatorFoldersvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    mediaNode: {
      type: Object,
      required: true
    },
    handleClick: {
      type: Function,
      required: true
    }
  }
}));
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorFolders.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorFoldersvue_type_script_lang_ts_ = (FileNavigatorFoldersvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorFolders.vue





/* normalize component */

var FileNavigatorFolders_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorFoldersvue_type_script_lang_ts_,
  FileNavigatorFoldersvue_type_template_id_6a5b4db7_render,
  FileNavigatorFoldersvue_type_template_id_6a5b4db7_staticRenderFns,
  false,
  null,
  null,
  "d5ab5704"
  
)

/* harmony default export */ var FileNavigatorFolders = (FileNavigatorFolders_component.exports);

/* vuetify-loader */





installComponents_default()(FileNavigatorFolders_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorFiles.vue?vue&type=template&id=053613ff&
var FileNavigatorFilesvue_type_template_id_053613ff_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',_vm._l((_vm.mediaObjects),function(item){return _c('v-col',{key:item['@id'],attrs:{"cols":"12","md":"6","lg":"3"}},[_c('v-card',[(item.isImage)?_c('v-img',{staticClass:"file-navigator-object",attrs:{"src":item.contentUrl,"max-height":"300","contain":""}}):_c('span',{staticClass:"file-navigator-object"},[_vm._v(_vm._s(item.filePath))]),_vm._v(" "),_c('v-card-title',[(item.customName)?_c('span',[_vm._v(_vm._s(item.customName))]):_c('small',[_vm._v("Titre non défini")])]),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),(_vm.selectionEnabled)?_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"icon":""},on:{"click":function($event){return _vm.selectClickHandler(item)}}},'v-btn',attrs,false),on),[_c('v-icon',[_vm._v("ri-arrow-left-up-line")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Sélectionner l'image")])]):_vm._e(),_vm._v(" "),_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"icon":""},on:{"click":function($event){return _vm.editClickHandler(item)}}},'v-btn',attrs,false),on),[_c('v-icon',[_vm._v("ri-pencil-line")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editer les propriétés de l'image")])])],1)],1)],1)}),1)],1)}
var FileNavigatorFilesvue_type_template_id_053613ff_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorFiles.vue?vue&type=template&id=053613ff&

// EXTERNAL MODULE: ./app/custom-store/AbstractStore.ts
var AbstractStore = __webpack_require__(29);

// CONCATENATED MODULE: ./app/custom-store/MediaObjectStore.ts


class MediaObjectStore_MediaObjectStore extends AbstractStore["a" /* PersistentApiStore */] {
  constructor() {
    super(...arguments);
    this.deleteRole = 'USER_CAN_DELETE_MEDIA_OBJECTS';
    this.uploadRole = 'USER_CAN_UPLOAD_MEDIA_OBJECTS';
    this.editRole = 'USER_CAN_EDIT_MEDIA_OBJECTS';
    this.listRole = 'USER_CAN_ACCESS_GALLERIES';
  }

  getAddLocation() {
    return null;
  }

  getEditLocation(item) {
    return null;
  }

  getIdentifierFromUrlParam(param) {
    return '';
  }

  getListLocation() {
    return null;
  }

}

const mediaObjectStore = new MediaObjectStore_MediaObjectStore('media_objects');
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorFiles.vue?vue&type=script&lang=ts&


/* harmony default export */ var FileNavigatorFilesvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    mediaNode: {
      type: Object,
      required: true
    },
    selectClickHandler: {
      type: Function,
      required: true
    },
    editClickHandler: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const context = Object(runtime["r" /* useContext */])();
    const selectionEnabled = Object(runtime["e" /* inject */])('selectionEnabled');
    mediaObjectStore.setContext(context);

    const loadObjects = () => {
      if (props.mediaNode) {
        mediaObjectStore.fetchAll({
          mediaNodes: props.mediaNode['@id']
        });
      }
    };

    Object(runtime["h" /* onMounted */])(() => {
      loadObjects();
    });
    Object(runtime["v" /* watch */])(() => props.mediaNode, mediaNode => {
      loadObjects();
    });
    return {
      selectionEnabled,
      mediaObjects: mediaObjectStore.list,
      loadObjects
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorFiles.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorFilesvue_type_script_lang_ts_ = (FileNavigatorFilesvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(235);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTooltip/VTooltip.js
var VTooltip = __webpack_require__(358);

// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorFiles.vue





/* normalize component */

var FileNavigatorFiles_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorFilesvue_type_script_lang_ts_,
  FileNavigatorFilesvue_type_template_id_053613ff_render,
  FileNavigatorFilesvue_type_template_id_053613ff_staticRenderFns,
  false,
  null,
  null,
  "7c532870"
  
)

/* harmony default export */ var FileNavigatorFiles = (FileNavigatorFiles_component.exports);

/* vuetify-loader */












installComponents_default()(FileNavigatorFiles_component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardTitle: components_VCard["c" /* VCardTitle */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VIcon: VIcon["a" /* default */],VImg: VImg["a" /* default */],VRow: VRow["a" /* default */],VSpacer: VSpacer["a" /* default */],VTooltip: VTooltip["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=template&id=2d92cf33&scoped=true&
var FileNavigatorContextMenuvue_type_template_id_2d92cf33_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"context-menu",attrs:{"id":"fileNavigatorContextMenu","tile":""}},[_c('v-list',{attrs:{"dense":""}},[_c('v-list-item-group',{attrs:{"color":"primary"}},[(_vm.mediaNode)?_c('v-dialog',{attrs:{"width":"500"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [_c('v-list-item',_vm._g(_vm._b({},'v-list-item',attrs,false),on),[_c('v-list-item-icon',[_c('v-icon',[_vm._v("ri-folder-add-fill")])],1),_vm._v(" "),_c('v-list-item-content',[_vm._v("\n              Nouveau dossier\n            ")])],1)]}}],null,false,4239326002),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-card',[_c('v-card-title',{staticClass:"headline grey lighten-2"},[_vm._v("\n            Ajouter un dossier\n          ")]),_vm._v(" "),_c('v-card-text',[_c('v-form',[_c('v-text-field',{attrs:{"label":"Nom du dossier","required":""},model:{value:(_vm.newFolderName),callback:function ($$v) {_vm.newFolderName=$$v},expression:"newFolderName"}})],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary","text":""},on:{"click":_vm.onFolderCreate}},[_vm._v("\n              Créer le dossier\n            ")])],1)],1)],1):_vm._e()],1)],1)],1)}
var FileNavigatorContextMenuvue_type_template_id_2d92cf33_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=template&id=2d92cf33&scoped=true&

// EXTERNAL MODULE: ./app/custom-store/MediaNodeStore.ts
var MediaNodeStore = __webpack_require__(274);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=script&lang=ts&


/* harmony default export */ var FileNavigatorContextMenuvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    mediaNode: {
      type: Object,
      default: null
    },
    refresh: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const context = Object(runtime["r" /* useContext */])();
    const contextMenu = Object(runtime["m" /* ref */])(null);
    const dialog = Object(runtime["m" /* ref */])(false);
    const newFolderName = Object(runtime["m" /* ref */])(null);
    MediaNodeStore["a" /* mediaNodeStore */].setContext(context);
    Object(runtime["h" /* onMounted */])(() => {
      contextMenu.value = document.getElementById('fileNavigatorContextMenu');
      document.addEventListener(document.ontouchstart !== null ? 'click' : 'touchstart', onClick, false);
    });

    const showMenu = event => {
      if (!contextMenu.value) {
        return;
      }

      if (contextMenu.value.offsetWidth + event.pageX >= window.innerWidth) {
        contextMenu.value.style.left = event.pageX - contextMenu.value.offsetWidth + 2 + 'px';
      } else {
        contextMenu.value.style.left = event.pageX - 2 + 'px';
      }

      if (contextMenu.value.offsetHeight + event.pageY >= window.innerHeight) {
        contextMenu.value.style.top = event.pageY - contextMenu.value.offsetHeight + 2 + 'px';
      } else {
        contextMenu.value.style.top = event.pageY - 2 + 'px';
      }

      contextMenu.value.classList.add('context-menu--active');
    };

    const hideMenu = () => {
      if (!contextMenu.value) {
        return;
      }

      contextMenu.value.style.left = '0px';
      contextMenu.value.style.top = '0px';
      contextMenu.value.classList.remove('context-menu--active');
    };

    const onClick = e => {
      if (!e.target || !contextMenu.value) {
        return;
      }

      if (!contextMenu.value.contains(e.target)) {
        hideMenu();
      }
    };

    const onFolderCreate = async () => {
      dialog.value = false;

      if (!newFolderName || !props.mediaNode) {
        return;
      }

      await MediaNodeStore["a" /* mediaNodeStore */].create({
        name: newFolderName.value,
        parent: props.mediaNode['@id']
      }); // @ts-ignore

      await props.refresh();
    };

    return {
      newFolderName,
      dialog,
      onFolderCreate,
      showMenu
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorContextMenu.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorContextMenuvue_type_script_lang_ts_ = (FileNavigatorContextMenuvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(276);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(204);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VForm/VForm.js
var VForm = __webpack_require__(232);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
var VList = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItem.js
var VListItem = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 3 modules
var components_VList = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItemGroup.js
var VListItemGroup = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItemIcon.js
var VListItemIcon = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.js + 3 modules
var VTextField = __webpack_require__(203);

// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigatorContextMenu.vue



function FileNavigatorContextMenu_injectStyles (context) {
  
  var style0 = __webpack_require__(319)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var FileNavigatorContextMenu_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorContextMenuvue_type_script_lang_ts_,
  FileNavigatorContextMenuvue_type_template_id_2d92cf33_scoped_true_render,
  FileNavigatorContextMenuvue_type_template_id_2d92cf33_scoped_true_staticRenderFns,
  false,
  FileNavigatorContextMenu_injectStyles,
  "2d92cf33",
  "355bdd67"
  
)

/* harmony default export */ var FileNavigatorContextMenu = (FileNavigatorContextMenu_component.exports);

/* vuetify-loader */

















installComponents_default()(FileNavigatorContextMenu_component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["b" /* VCardText */],VCardTitle: components_VCard["c" /* VCardTitle */],VDialog: VDialog["a" /* default */],VDivider: VDivider["a" /* default */],VForm: VForm["a" /* default */],VIcon: VIcon["a" /* default */],VList: VList["a" /* default */],VListItem: VListItem["a" /* default */],VListItemContent: components_VList["a" /* VListItemContent */],VListItemGroup: VListItemGroup["a" /* default */],VListItemIcon: VListItemIcon["a" /* default */],VSpacer: VSpacer["a" /* default */],VTextField: VTextField["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_navigator/FileNavigator.vue?vue&type=script&lang=ts&







/* harmony default export */ var FileNavigatorvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    FileNavigatorBreadCrumb: FileNavigatorBreadCrumb,
    FileNavigatorFolders: FileNavigatorFolders,
    FileNavigatorFiles: FileNavigatorFiles,
    FileNavigatorContextMenu: FileNavigatorContextMenu
  },
  props: {
    editClickHandler: {
      type: Function,
      required: true
    },
    selectClickHandler: {
      type: Function,
      required: true
    },
    currentMediaNode: {
      type: Object,
      default: null
    },
    rootName: {
      type: String,
      default: null
    }
  },

  setup(props, {
    emit
  }) {
    const context = Object(runtime["r" /* useContext */])();
    MediaNodeStore["a" /* mediaNodeStore */].setContext(context);
    mediaObjectStore.setContext(context);
    const closeDetailPanel = Object(runtime["e" /* inject */])('closeDetailPanel');
    const fileNavigatorContextMenu = Object(runtime["m" /* ref */])(null);
    Object(runtime["s" /* useFetch */])(() => {
      MediaNodeStore["a" /* mediaNodeStore */].fetchAll({
        'exists[parent]': 'false'
      });
    });

    const handleMediaNodeClick = async id => {
      mediaObjectStore.resetList();
      emit('update:current-media-node', await MediaNodeStore["a" /* mediaNodeStore */].load(id));
    };

    const handleRootClick = () => {
      emit('update:current-media-node', undefined);
      closeDetailPanel && closeDetailPanel();
    };

    const refresh = async () => {
      if (!props.currentMediaNode) {
        return;
      }

      emit('update:current-media-node', await MediaNodeStore["a" /* mediaNodeStore */].load(props.currentMediaNode['@id']));
      Object(runtime["f" /* nextTick */])(() => {
        reload();
      });
    };

    const reload = () => {
      const savedMediaNode = props.currentMediaNode;
      emit('update:current-media-node', undefined);
      Object(runtime["f" /* nextTick */])(() => {
        emit('update:current-media-node', savedMediaNode);
      });
    };

    const onRightClick = e => {
      var _a; // @ts-ignore


      (_a = fileNavigatorContextMenu.value) === null || _a === void 0 ? void 0 : _a.showMenu(e);
    };

    return {
      closeDetailPanel,
      fileNavigatorContextMenu,
      rootMediaNodes: MediaNodeStore["a" /* mediaNodeStore */].rootNodes,
      handleMediaNodeClick,
      handleRootClick,
      refresh,
      reload,
      onRightClick
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigator.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_navigator_FileNavigatorvue_type_script_lang_ts_ = (FileNavigatorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file-manager/file_navigator/FileNavigator.vue



function FileNavigator_injectStyles (context) {
  
  var style0 = __webpack_require__(321)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var FileNavigator_component = Object(componentNormalizer["a" /* default */])(
  file_navigator_FileNavigatorvue_type_script_lang_ts_,
  FileNavigatorvue_type_template_id_ee76563c_scoped_true_render,
  FileNavigatorvue_type_template_id_ee76563c_scoped_true_staticRenderFns,
  false,
  FileNavigator_injectStyles,
  "ee76563c",
  "2077e6f7"
  
)

/* harmony default export */ var FileNavigator = (FileNavigator_component.exports);

/* vuetify-loader */





installComponents_default()(FileNavigator_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_details/FileDetails.vue?vue&type=template&id=0412e084&
var FileDetailsvue_type_template_id_0412e084_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('h3',[_vm._v("\n        Détail du fichier\n        "),_c('v-btn',{attrs:{"rounded":"","right":"","fixed":"","small":"","color":"error"},on:{"click":_vm.closeDetailPanel}},[_c('v-icon',[_vm._v("\n            ri-close-line\n          ")])],1)],1)])],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('file-details-form',{ref:"updateForm",attrs:{"tree":_vm.tree,"values":_vm.item,"errors":_vm.state.violations}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('Toolbar',{attrs:{"handle-submit":_vm.onSendForm}})],1)],1)],1)}
var FileDetailsvue_type_template_id_0412e084_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_details/FileDetails.vue?vue&type=template&id=0412e084&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_details/FileDetailsForm.vue?vue&type=template&id=2ada912e&
var FileDetailsFormvue_type_template_id_2ada912e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-form',[_c('v-container',[_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('v-text-field',{attrs:{"label":"Identifiant unique","disabled":""},model:{value:(_vm.item.uniqueId),callback:function ($$v) {_vm.$set(_vm.item, "uniqueId", $$v)},expression:"item.uniqueId"}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('v-text-field',{attrs:{"label":"Nom personnalisé","error-messages":_vm.customNameErrors,"required":""},on:{"input":function($event){return _vm.v$.customName.$touch()},"blur":function($event){return _vm.v$.customName.$touch()}},model:{value:(_vm.item.customName),callback:function ($$v) {_vm.$set(_vm.item, "customName", $$v)},expression:"item.customName"}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12","md":"12"}},[_c('p',[_vm._v("Appartient aux catégories...")]),_vm._v(" "),(_vm.errors && _vm.errors.mediaNodes)?_c('p',{staticClass:"error--text"},[_vm._v("\n          "+_vm._s(_vm.errors.mediaNodes)+"\n        ")]):_vm._e(),_vm._v(" "),_c('v-treeview',{attrs:{"items":_vm.tree,"selectable":"","rounded":"","hoverable":"","open-all":"","selection-type":"independent","item-key":"@id"},model:{value:(_vm.item.mediaNodes),callback:function ($$v) {_vm.$set(_vm.item, "mediaNodes", $$v)},expression:"item.mediaNodes"}})],1)],1)],1)],1)}
var FileDetailsFormvue_type_template_id_2ada912e_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/file-manager/file_details/FileDetailsForm.vue?vue&type=template&id=2ada912e&

// EXTERNAL MODULE: external "@vuelidate/core"
var core_ = __webpack_require__(86);
var core_default = /*#__PURE__*/__webpack_require__.n(core_);

// EXTERNAL MODULE: external "@vuelidate/validators"
var validators_ = __webpack_require__(87);

// EXTERNAL MODULE: external "lodash/has"
var has_ = __webpack_require__(53);
var has_default = /*#__PURE__*/__webpack_require__.n(has_);

// EXTERNAL MODULE: ./app/custom-store/SecurityStore.ts
var SecurityStore = __webpack_require__(14);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_details/FileDetailsForm.vue?vue&type=script&lang=ts&





/* harmony default export */ var FileDetailsFormvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    values: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      default: () => {}
    },
    tree: {
      type: Array,
      default: () => []
    }
  },

  setup(props) {
    const item = Object(runtime["a" /* computed */])(() => props.values);
    const validation = Object(runtime["a" /* computed */])(() => ({
      customName: {
        minLength: Object(validators_["minLength"])(3)
      },
      mediaNodes: {
        minLength: Object(validators_["minLength"])(1)
      }
    }));
    const v$ = core_default()(validation, item);
    const violations = Object(runtime["a" /* computed */])(() => props.errors);
    const customNameErrors = Object(runtime["a" /* computed */])(() => {
      const errors = [];

      if (!v$.value.customName || !v$.value.customName.$dirty) {
        return errors;
      }

      has_default()(violations.value, 'customName') && errors.push(violations.value.customName);
      v$.value.customName.minLength.$invalid && errors.push('Le nom personnalisé doit faire au moins 3 caractères');
      return errors;
    });
    const mediaNodesErrors = Object(runtime["a" /* computed */])(() => {
      const errors = [];

      if (!v$.value.mediaNodes || !v$.value.mediaNodes.$dirty) {
        return errors;
      }

      has_default()(violations.value, 'mediaNodes') && errors.push(violations.value.mediaNodes);
      v$.value.mediaNodes.minLength.$invalid && errors.push('Le fichier doit appartenir a au moins une galerie');
      return errors;
    });
    return {
      item,
      v$,
      customNameErrors,
      mediaNodesErrors,
      state: SecurityStore["a" /* securityStore */].getState()
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/file_details/FileDetailsForm.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_details_FileDetailsFormvue_type_script_lang_ts_ = (FileDetailsFormvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VTreeview/VTreeview.sass
var VTreeview = __webpack_require__(323);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/transitions/index.js + 2 modules
var transitions = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/registrable/index.js
var registrable = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(4);

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
var themeable = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var console = __webpack_require__(5);

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
// CONCATENATED MODULE: ./app/components/file-manager/file_details/FileDetailsForm.vue





/* normalize component */

var FileDetailsForm_component = Object(componentNormalizer["a" /* default */])(
  file_details_FileDetailsFormvue_type_script_lang_ts_,
  FileDetailsFormvue_type_template_id_2ada912e_render,
  FileDetailsFormvue_type_template_id_2ada912e_staticRenderFns,
  false,
  null,
  null,
  "9d75de9e"
  
)

/* harmony default export */ var FileDetailsForm = (FileDetailsForm_component.exports);

/* vuetify-loader */







installComponents_default()(FileDetailsForm_component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VForm: VForm["a" /* default */],VRow: VRow["a" /* default */],VTextField: VTextField["a" /* default */],VTreeview: VTreeview_VTreeview})

// EXTERNAL MODULE: ./app/custom-store/NotificationStore.ts
var NotificationStore = __webpack_require__(38);

// EXTERNAL MODULE: ./app/components/form/Toolbar.vue + 4 modules
var Toolbar = __webpack_require__(257);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/file_details/FileDetails.vue?vue&type=script&lang=ts&






/* harmony default export */ var FileDetailsvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    Toolbar: Toolbar["a" /* default */],
    FileDetailsForm: FileDetailsForm
  },
  props: {
    mediaObject: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const context = Object(runtime["r" /* useContext */])();
    MediaNodeStore["a" /* mediaNodeStore */].setContext(context);
    mediaObjectStore.setContext(context);
    const closeDetailPanel = Object(runtime["e" /* inject */])('closeDetailPanel');
    const item = Object(runtime["a" /* computed */])(() => props.mediaObject);
    const updateForm = Object(runtime["m" /* ref */])(null);
    Object(runtime["s" /* useFetch */])(async () => {
      if (MediaNodeStore["a" /* mediaNodeStore */].tree.value.length === 0) {
        await MediaNodeStore["a" /* mediaNodeStore */].fetchTree();
      }
    });

    const onSendForm = () => {
      if (!updateForm.value) {
        return;
      }

      updateForm.value.v$.$touch();

      if (!updateForm.value.v$.$invalid) {
        mediaObjectStore.update(item.value);
      }
    };

    Object(runtime["v" /* watch */])(() => mediaObjectStore.getState().updated, created => {
      if (!created) {
        return;
      }

      NotificationStore["a" /* notificationStore */].showMessage('Fichier mis à jour');
    });
    return {
      item,
      state: mediaObjectStore.getState(),
      tree: MediaNodeStore["a" /* mediaNodeStore */].tree,
      closeDetailPanel,
      updateForm,
      onSendForm
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/file_details/FileDetails.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_details_FileDetailsvue_type_script_lang_ts_ = (FileDetailsvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file-manager/file_details/FileDetails.vue





/* normalize component */

var FileDetails_component = Object(componentNormalizer["a" /* default */])(
  file_details_FileDetailsvue_type_script_lang_ts_,
  FileDetailsvue_type_template_id_0412e084_render,
  FileDetailsvue_type_template_id_0412e084_staticRenderFns,
  false,
  null,
  null,
  "0a9ef766"
  
)

/* harmony default export */ var FileDetails = (FileDetails_component.exports);

/* vuetify-loader */






installComponents_default()(FileDetails_component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VIcon: VIcon["a" /* default */],VRow: VRow["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/file-manager/FileManager.vue?vue&type=script&lang=ts&





/* harmony default export */ var FileManagervue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    FileSelection: FileSelection,
    FileUploader: FileUploader,
    FileNavigator: FileNavigator,
    FileDetails: FileDetails
  },
  props: {
    showSelection: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    const detailsPanel = Object(runtime["m" /* ref */])(false);
    const selectedMediaObject = Object(runtime["m" /* ref */])(null);
    const links = Object(runtime["m" /* ref */])([]);
    const thumbnails = Object(runtime["m" /* ref */])([]);
    const currentMediaNode = Object(runtime["m" /* ref */])(null);
    const fileNavigator = Object(runtime["m" /* ref */])(null);
    const context = Object(runtime["r" /* useContext */])();
    Object(runtime["j" /* provide */])('closeDetailPanel', () => {
      detailsPanel.value = false;
      selectedMediaObject.value = null;
    });
    Object(runtime["j" /* provide */])('selectionEnabled', props.showSelection);

    const reset = () => {
      thumbnails.value = [];
      links.value = [];
    };

    const selectMediaObject = mediaObject => {
      if (mediaObject.isImage) {
        selectImage(mediaObject);
      } else {
        selectLink(mediaObject);
      }
    };

    const selectImage = res => {
      thumbnails.value.push({
        src: res.contentUrl
      });
    };

    const selectLink = res => {
      links.value.push({
        src: res.contentUrl,
        name: res.filePath
      });
    };

    const removeThumbnail = index => {
      thumbnails.value.splice(index, 1);
    };

    const removeLink = index => {
      links.value.splice(index, 1);
    };

    const handleUpload = files => {
      if (!currentMediaNode.value) {
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
        formData.append('mediaNodeId', currentMediaNode.value.id.toString());
        context.$getRepository('media_objects').$post('/api/media_objects', {
          method: 'POST',
          body: formData
        }).then(res => {
          var _a;

          if (res.isImage) {
            selectImage(res);
          } else {
            selectLink(res);
          } // @ts-ignore


          (_a = fileNavigator.value) === null || _a === void 0 ? void 0 : _a.refresh();
        });
      }
    };

    const editMediaObject = mediaObject => {
      detailsPanel.value = true;
      selectedMediaObject.value = mediaObject;
    };

    return {
      detailsPanel,
      selectedMediaObject,
      links,
      thumbnails,
      currentMediaNode,
      fileNavigator,
      selectMediaObject,
      reset,
      removeThumbnail,
      removeLink,
      handleUpload,
      editMediaObject
    };
  }

}));
// CONCATENATED MODULE: ./app/components/file-manager/FileManager.vue?vue&type=script&lang=ts&
 /* harmony default export */ var file_manager_FileManagervue_type_script_lang_ts_ = (FileManagervue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/file-manager/FileManager.vue





/* normalize component */

var FileManager_component = Object(componentNormalizer["a" /* default */])(
  file_manager_FileManagervue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "42a0f2ea"
  
)

/* harmony default export */ var FileManager = __webpack_exports__["a"] = (FileManager_component.exports);

/* vuetify-loader */




installComponents_default()(FileManager_component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VRow: VRow["a" /* default */]})


/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResizableImageNode_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(301);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResizableImageNode_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResizableImageNode_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResizableImageNode_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResizableImageNode_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".img-container{position:relative;display:inline-block;line-height:0}.img-container.is-active{border:1px dashed grey}.handle{position:absolute;bottom:0;right:0;width:10px;height:10px;border:3px solid #000;border-top:none;border-left:none;cursor:nwse-resize}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_540f87af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(302);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_540f87af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_540f87af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_540f87af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_540f87af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".editor__content[data-v-540f87af]  .ProseMirror{min-height:100px;border:1px solid #212121;padding:10px}.editor__content[data-v-540f87af]  .ProseMirror p{margin-bottom:0}.editor__content[data-v-540f87af]  .ProseMirror a{color:#68cef8}.v-toolbar[data-v-540f87af]  .v-toolbar__content{flex-wrap:wrap}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor.vue?vue&type=template&id=540f87af&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div class=\"editor\" data-v-540f87af>","</div>",[(_vm.editor)?_c('v-toolbar',{attrs:{"flat":"","dark":""}},[_c('editor-btn',{attrs:{"label":"Gras","btn-class":{ 'grey darken-3': _vm.editor.isActive('bold') },"click-handler":function () { return _vm.editor.chain().focus().toggleBold().run(); },"icon":"ri-bold"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Italique","btn-class":{ 'grey darken-3': _vm.editor.isActive('italic') },"click-handler":function () { return _vm.editor.chain().focus().toggleItalic().run(); },"icon":"ri-italic"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Barrer","btn-class":{ 'grey darken-3': _vm.editor.isActive('strike') },"click-handler":function () { return _vm.editor.chain().focus().toggleStrike().run(); },"icon":"ri-strikethrough"}}),_vm._v(" "),_c('text-color-btn',{attrs:{"editor":_vm.editor}}),_vm._v(" "),_c('text-background-color-btn',{attrs:{"editor":_vm.editor}}),_vm._v(" "),_c('font-family-btn',{attrs:{"editor":_vm.editor}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Supprimer le style de la sélection","click-handler":function () { return _vm.editor.chain().focus().unsetAllMarks().run(); },"icon":"ri-format-clear"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Supprimer le style du bloc","click-handler":function () { return _vm.editor.chain().focus().clearNodes().run(); },"icon":"ri-eraser-line"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Paragraphe","btn-class":{ 'grey darken-3': _vm.editor.isActive('paragraph') },"click-handler":function () { return _vm.editor.chain().focus().setParagraph().run(); },"icon":"ri-paragraph"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Taille xxl","btn-class":{ 'grey darken-3': _vm.editor.isActive('heading', { level: 1 }) },"click-handler":function () { return _vm.editor.chain().focus().toggleHeading({ level: 1 }).run(); },"icon":"ri-h-1"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Taille xl","btn-class":{ 'grey darken-3': _vm.editor.isActive('heading', { level: 2 }) },"click-handler":function () { return _vm.editor.chain().focus().toggleHeading({ level: 2 }).run(); },"icon":"ri-h-2"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Taille l","btn-class":{ 'grey darken-3': _vm.editor.isActive('heading', { level: 3 }) },"click-handler":function () { return _vm.editor.chain().focus().toggleHeading({ level: 3 }).run(); },"icon":"ri-h-3"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Taille m","btn-class":{ 'grey darken-3': _vm.editor.isActive('heading', { level: 4 }) },"click-handler":function () { return _vm.editor.chain().focus().toggleHeading({ level: 4 }).run(); },"icon":"ri-h-4"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Taille s","btn-class":{ 'grey darken-3': _vm.editor.isActive('heading', { level: 5 }) },"click-handler":function () { return _vm.editor.chain().focus().toggleHeading({ level: 5 }).run(); },"icon":"ri-h-5"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Taille xs","btn-class":{ 'grey darken-3': _vm.editor.isActive('heading', { level: 6 }) },"click-handler":function () { return _vm.editor.chain().focus().toggleHeading({ level: 6 }).run(); },"icon":"ri-h-6"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Liste","btn-class":{ 'grey darken-3': _vm.editor.isActive('bulletList') },"click-handler":function () { return _vm.editor.chain().focus().toggleBulletList().run(); },"icon":"ri-list-unordered"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Liste numérotée","btn-class":{ 'grey darken-3': _vm.editor.isActive('orderedList') },"click-handler":function () { return _vm.editor.chain().focus().toggleOrderedList().run(); },"icon":"ri-list-ordered"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Bloc de code","btn-class":{ 'grey darken-3': _vm.editor.isActive('codeBlock') },"click-handler":function () { return _vm.editor.chain().focus().toggleCodeBlock().run(); },"icon":"ri-code-line"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Citation","btn-class":{ 'grey darken-3': _vm.editor.isActive('blockquote') },"click-handler":function () { return _vm.editor.chain().focus().toggleCodeBlock().run(); },"icon":"ri-double-quotes-l"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Séparateur horizontal","click-handler":function () { return _vm.editor.chain().focus().setHorizontalRule().run(); },"icon":"ri-separator"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Undo","click-handler":function () { return _vm.editor.chain().focus().undo().run(); },"icon":"ri-arrow-go-back-line"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Redo","click-handler":function () { return _vm.editor.chain().focus().redo().run(); },"icon":"ri-arrow-go-forward-line"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Aligner à gauche","btn-class":{ 'grey darken-3': _vm.editor.isActive({ textAlign: 'left' }) },"click-handler":function () { return _vm.editor.chain().focus().setTextAlign('left').run(); },"icon":"ri-align-left"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Centrer","btn-class":{ 'grey darken-3': _vm.editor.isActive({ textAlign: 'center' }) },"click-handler":function () { return _vm.editor.chain().focus().setTextAlign('center').run(); },"icon":"ri-align-center"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Aligner à droite","btn-class":{ 'grey darken-3': _vm.editor.isActive({ textAlign: 'right' }) },"click-handler":function () { return _vm.editor.chain().focus().setTextAlign('right').run(); },"icon":"ri-align-right"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Justifier","btn-class":{ 'grey darken-3': _vm.editor.isActive({ textAlign: 'justify' }) },"click-handler":function () { return _vm.editor.chain().focus().setTextAlign('justify').run(); },"icon":"ri-align-justify"}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Ajouter une image","btn-class":null,"click-handler":_vm.addImage,"icon":"ri-image-line"}}),_vm._v(" "),_c('file-upload-btn',{attrs:{"editor":_vm.editor}}),_vm._v(" "),_c('editor-btn',{attrs:{"label":"Ajouter un lien","click-handler":_vm.setLink,"btn-class":{ 'is-active': _vm.editor.isActive('link') },"icon":"ri-link"}}),_vm._v(" "),(_vm.editor.isActive('link'))?_c('editor-btn',{attrs:{"label":"Supprimer le lien","icon":"ri-link-unlink","click-handler":function () { return _vm.editor.chain().focus().unsetLink().run(); }}}):_vm._e(),_vm._v(" "),_vm._t("supplemental_btns")],2):_vm._e(),_vm._ssrNode(" "),_c('editor-content',{staticClass:"editor__content",attrs:{"editor":_vm.editor}})],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"actions\" data-v-540f87af>","</div>",[_c('v-btn',{staticClass:"v-icon",on:{"click":_vm.clearContent}},[_vm._v("\n      Clear Content\n    ")])],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Editor.vue?vue&type=template&id=540f87af&scoped=true&

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(3);

// EXTERNAL MODULE: external "@tiptap/vue-2"
var vue_2_ = __webpack_require__(207);

// EXTERNAL MODULE: external "@tiptap/starter-kit"
var starter_kit_ = __webpack_require__(212);
var starter_kit_default = /*#__PURE__*/__webpack_require__.n(starter_kit_);

// EXTERNAL MODULE: external "@tiptap/extension-text-align"
var extension_text_align_ = __webpack_require__(213);
var extension_text_align_default = /*#__PURE__*/__webpack_require__.n(extension_text_align_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/EditorBtn.vue?vue&type=template&id=b026d774&
var EditorBtnvue_type_template_id_b026d774_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({class:_vm.btnClass,attrs:{"small":""},on:{"click":_vm.clickHandler}},'v-btn',attrs,false),on),[_c('v-icon',[_vm._v(_vm._s(_vm.icon))])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label))])])}
var EditorBtnvue_type_template_id_b026d774_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Editor/EditorBtn.vue?vue&type=template&id=b026d774&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/EditorBtn.vue?vue&type=script&lang=ts&

/* harmony default export */ var EditorBtnvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    btnClass: {
      type: Object,
      default: null
    },
    clickHandler: {
      type: Function,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}));
// CONCATENATED MODULE: ./app/components/util/Editor/EditorBtn.vue?vue&type=script&lang=ts&
 /* harmony default export */ var Editor_EditorBtnvue_type_script_lang_ts_ = (EditorBtnvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(13);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTooltip/VTooltip.js
var VTooltip = __webpack_require__(358);

// CONCATENATED MODULE: ./app/components/util/Editor/EditorBtn.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Editor_EditorBtnvue_type_script_lang_ts_,
  EditorBtnvue_type_template_id_b026d774_render,
  EditorBtnvue_type_template_id_b026d774_staticRenderFns,
  false,
  null,
  null,
  "ba125c04"
  
)

/* harmony default export */ var EditorBtn = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */],VTooltip: VTooltip["a" /* default */]})

// EXTERNAL MODULE: external "@tiptap/extension-gapcursor"
var extension_gapcursor_ = __webpack_require__(214);
var extension_gapcursor_default = /*#__PURE__*/__webpack_require__.n(extension_gapcursor_);

// EXTERNAL MODULE: external "@tiptap/extension-typography"
var extension_typography_ = __webpack_require__(215);
var extension_typography_default = /*#__PURE__*/__webpack_require__.n(extension_typography_);

// EXTERNAL MODULE: external "@tiptap/extension-table"
var extension_table_ = __webpack_require__(216);
var extension_table_default = /*#__PURE__*/__webpack_require__.n(extension_table_);

// EXTERNAL MODULE: external "@tiptap/extension-table-row"
var extension_table_row_ = __webpack_require__(217);
var extension_table_row_default = /*#__PURE__*/__webpack_require__.n(extension_table_row_);

// EXTERNAL MODULE: external "@tiptap/extension-table-cell"
var extension_table_cell_ = __webpack_require__(218);
var extension_table_cell_default = /*#__PURE__*/__webpack_require__.n(extension_table_cell_);

// EXTERNAL MODULE: external "@tiptap/extension-table-header"
var extension_table_header_ = __webpack_require__(219);
var extension_table_header_default = /*#__PURE__*/__webpack_require__.n(extension_table_header_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/FileUploadBtn.vue?vue&type=template&id=66992713&
var FileUploadBtnvue_type_template_id_66992713_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"width":"90%"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onDropdown = ref.on;
var attrsDropdown = ref.attrs;
return [_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onTooltip = ref.on;
var attrsTooltip = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"small":""}},'v-btn',Object.assign({}, attrsDropdown, attrsTooltip),false),Object.assign({}, onDropdown, onTooltip)),[_c('v-icon',[_vm._v("ri-file-transfer-line")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Téléverser un fichier")])])]}}]),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-card',[_c('v-card-title',{staticClass:"headline grey lighten-2"},[_vm._v("\n      Téléverser un fichier\n    ")]),_vm._v(" "),_c('v-card-text',[_c('file-manager',{ref:"fileManager"})],1),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary","text":""},on:{"click":function($event){$event.preventDefault();return _vm.injectFilesAndCloseDialog.apply(null, arguments)}}},[_vm._v("\n        Insérer\n      ")])],1)],1)],1)}
var FileUploadBtnvue_type_template_id_66992713_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Editor/FileUploadBtn.vue?vue&type=template&id=66992713&

// EXTERNAL MODULE: ./app/components/file-manager/FileManager.vue + 53 modules
var FileManager = __webpack_require__(327);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/FileUploadBtn.vue?vue&type=script&lang=ts&


/* harmony default export */ var FileUploadBtnvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    FileManager: FileManager["a" /* default */]
  },
  props: {
    editor: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const dialog = Object(runtime["m" /* ref */])(false);
    const fileManager = Object(runtime["m" /* ref */])(null);

    const injectFilesAndCloseDialog = () => {
      var _a, _b; // @ts-ignore


      (_a = fileManager.value) === null || _a === void 0 ? void 0 : _a.thumbnails.forEach(thumbnail => {
        var _a;

        (_a = props.editor) === null || _a === void 0 ? void 0 : _a.chain().focus().setImage({
          src: thumbnail.src
        }).run();
      }); // @ts-ignore

      (_b = fileManager.value) === null || _b === void 0 ? void 0 : _b.links.forEach(link => {
        var _a, _b, _c;

        const node = (_a = props.editor) === null || _a === void 0 ? void 0 : _a.schema.text(link.name, [props === null || props === void 0 ? void 0 : props.editor.schema.marks.link.create({
          href: link.src
        })]); // @ts-ignore

        (_b = props.editor) === null || _b === void 0 ? void 0 : _b.view.dispatch((_c = props.editor) === null || _c === void 0 ? void 0 : _c.state.tr.replaceSelectionWith(node, false));
      });
      dialog.value = false;
    };

    Object(runtime["v" /* watch */])(dialog, () => {
      Object(runtime["f" /* nextTick */])(() => {
        var _a; // @ts-ignore


        (_a = fileManager.value) === null || _a === void 0 ? void 0 : _a.reset();
      });
    });
    return {
      dialog,
      injectFilesAndCloseDialog,
      fileManager
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/Editor/FileUploadBtn.vue?vue&type=script&lang=ts&
 /* harmony default export */ var Editor_FileUploadBtnvue_type_script_lang_ts_ = (FileUploadBtnvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(276);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(235);

// CONCATENATED MODULE: ./app/components/util/Editor/FileUploadBtn.vue





/* normalize component */

var FileUploadBtn_component = Object(componentNormalizer["a" /* default */])(
  Editor_FileUploadBtnvue_type_script_lang_ts_,
  FileUploadBtnvue_type_template_id_66992713_render,
  FileUploadBtnvue_type_template_id_66992713_staticRenderFns,
  false,
  null,
  null,
  "52bee74e"
  
)

/* harmony default export */ var FileUploadBtn = (FileUploadBtn_component.exports);

/* vuetify-loader */










installComponents_default()(FileUploadBtn_component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["b" /* VCardText */],VCardTitle: components_VCard["c" /* VCardTitle */],VDialog: VDialog["a" /* default */],VIcon: VIcon["a" /* default */],VSpacer: VSpacer["a" /* default */],VTooltip: VTooltip["a" /* default */]})

// EXTERNAL MODULE: external "@tiptap/extension-link"
var extension_link_ = __webpack_require__(220);
var extension_link_default = /*#__PURE__*/__webpack_require__.n(extension_link_);

// EXTERNAL MODULE: external "@tiptap/extension-text-style"
var extension_text_style_ = __webpack_require__(221);
var extension_text_style_default = /*#__PURE__*/__webpack_require__.n(extension_text_style_);

// EXTERNAL MODULE: external "@tiptap/extension-text"
var extension_text_ = __webpack_require__(222);
var extension_text_default = /*#__PURE__*/__webpack_require__.n(extension_text_);

// EXTERNAL MODULE: external "@tiptap/extension-font-family"
var extension_font_family_ = __webpack_require__(223);
var extension_font_family_default = /*#__PURE__*/__webpack_require__.n(extension_font_family_);

// EXTERNAL MODULE: external "@tiptap/extension-image"
var extension_image_ = __webpack_require__(224);
var extension_image_default = /*#__PURE__*/__webpack_require__.n(extension_image_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/resizable-image/ResizableImageNode.vue?vue&type=template&id=a14acb48&
var ResizableImageNodevue_type_template_id_a14acb48_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('node-view-wrapper',{style:({ display: _vm.nodeDisplay })},[_c('div',{ref:"imgContainer",staticClass:"img-container",class:{'is-active': _vm.isActive},style:({width: _vm.node.attrs.width}),attrs:{"draggable":"true","contenteditable":"false","data-drag-handle":""}},[_c('img',{staticStyle:{"width":"100%"},attrs:{"src":_vm.node.attrs.src,"alt":_vm.node.attrs.title},on:{"click":function($event){_vm.isActive = !_vm.isActive}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"handle",on:{"mousedown":function($event){$event.preventDefault();return _vm.handleMouseDown($event)}}})])])}
var ResizableImageNodevue_type_template_id_a14acb48_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Editor/resizable-image/ResizableImageNode.vue?vue&type=template&id=a14acb48&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/resizable-image/ResizableImageNode.vue?vue&type=script&lang=ts&


/* harmony default export */ var ResizableImageNodevue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    NodeViewWrapper: vue_2_["NodeViewWrapper"]
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    extension: {
      type: Object,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const isActive = Object(runtime["m" /* ref */])(false); // const imgContainer = ref(null) as Ref<HTMLElement | null>

    const nodeDisplay = Object(runtime["a" /* computed */])(() => {
      if (props.extension.options.inline) {
        return 'inline-block';
      }

      return 'block';
    });

    const handleMouseDown = e => {
      // @ts-ignore
      const startWidth = parseFloat(props.node.attrs.width.match(/(.+)px/)[1]);
      const startPosX = e.x;

      const onMouseMove = e => {
        const diffInPx = startPosX - e.pageX;
        const width = `${startWidth - diffInPx}px`; // @ts-ignore

        props.updateAttributes({
          width
        });
      };

      const onMouseUp = e => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    return {
      isActive,
      nodeDisplay,
      handleMouseDown
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/Editor/resizable-image/ResizableImageNode.vue?vue&type=script&lang=ts&
 /* harmony default export */ var resizable_image_ResizableImageNodevue_type_script_lang_ts_ = (ResizableImageNodevue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/util/Editor/resizable-image/ResizableImageNode.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(332)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var ResizableImageNode_component = Object(componentNormalizer["a" /* default */])(
  resizable_image_ResizableImageNodevue_type_script_lang_ts_,
  ResizableImageNodevue_type_template_id_a14acb48_render,
  ResizableImageNodevue_type_template_id_a14acb48_staticRenderFns,
  false,
  injectStyles,
  null,
  "ebc0ca2e"
  
)

/* harmony default export */ var ResizableImageNode = (ResizableImageNode_component.exports);
// CONCATENATED MODULE: ./app/components/util/Editor/resizable-image/resizableImage.ts
// 1. Import the extension


 // 2. Overwrite the keyboard shortcuts

const ResizableImage = extension_image_default.a.extend({
  draggable: true,

  addNodeView() {
    return Object(vue_2_["VueNodeViewRenderer"])(ResizableImageNode);
  },

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: '400px'
      }
    };
  }

});
/* harmony default export */ var resizableImage = (ResizableImage);
// EXTERNAL MODULE: external "@tiptap/core"
var core_ = __webpack_require__(211);

// CONCATENATED MODULE: ./app/components/util/Editor/text-color/text-color.ts

/* harmony default export */ var text_color = (core_["Extension"].create({
  name: 'text-color',

  addGlobalAttributes() {
    return [{
      types: ['heading', 'paragraph', 'textStyle'],
      attributes: {
        color: {
          default: null,

          renderHTML(attributes) {
            if (!attributes.color) {
              return {};
            }

            return {
              class: `${attributes.color}--text`,
              'data-color': attributes.color
            };
          },

          parseHTML(element) {
            return {
              color: element.getAttribute('data-color')
            };
          }

        }
      }
    }];
  },

  addCommands() {
    return {
      setColor: color => ({
        chain
      }) => {
        return chain().setMark('textStyle', {
          color
        }).run();
      },
      removeColor: () => ({
        chain
      }) => {
        return chain().setMark('textStyle', {
          color: null
        }).run();
      }
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/Editor/text-background-color/text-background-color.ts

/* harmony default export */ var text_background_color = (core_["Extension"].create({
  name: 'text-background-color',

  addGlobalAttributes() {
    return [{
      types: ['heading', 'paragraph', 'textStyle'],
      attributes: {
        backGroundColor: {
          default: null,

          renderHTML(attributes) {
            if (!attributes.backGroundColor) {
              return {};
            }

            return {
              class: `${attributes.backGroundColor}`,
              'data-background-color': attributes.backGroundColor
            };
          },

          parseHTML(element) {
            return {
              backGroundColor: element.getAttribute('data-background-color')
            };
          }

        }
      }
    }];
  },

  addCommands() {
    return {
      setBackgroundColor: backGroundColor => ({
        chain
      }) => {
        return chain().setMark('textStyle', {
          backGroundColor
        }).run();
      },
      removeBackgroundColor: () => ({
        chain
      }) => {
        return chain().setMark('textStyle', {
          backGroundColor: null
        }).run();
      }
    };
  }

}));
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/TextColorBtn.vue?vue&type=template&id=1d6518e6&
var TextColorBtnvue_type_template_id_1d6518e6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"width":"300"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onDropdown = ref.on;
var attrsDropdown = ref.attrs;
return [_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onTooltip = ref.on;
var attrsTooltip = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"small":""}},'v-btn',Object.assign({}, attrsDropdown, attrsTooltip),false),Object.assign({}, onDropdown, onTooltip)),[_c('v-icon',[_vm._v("ri-font-color")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Couleur du texte")])])]}}]),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-list',[_vm._l((_vm.colors),function(color,index){return _c('v-list-item',{key:index,on:{"click":function($event){return _vm.chooseColor(color)}}},[_c('v-list-item-title',{class:color.text + '--text'},[_vm._v("\n        "+_vm._s(color.name)+"\n      ")])],1)}),_vm._v(" "),_c('v-list-item',{on:{"click":_vm.removeColor}},[_c('v-list-item-title',[_vm._v("Aucune couleur")])],1)],2)],1)}
var TextColorBtnvue_type_template_id_1d6518e6_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Editor/TextColorBtn.vue?vue&type=template&id=1d6518e6&

// CONCATENATED MODULE: ./app/components/util/Editor/colors.ts
const editorColors = [{
  name: 'Titre',
  text: 'text--darken-4 primary',
  background: 'darken-4 primary'
}, {
  name: 'Primaire',
  text: 'primary',
  background: 'primary'
}, {
  name: 'Info',
  text: 'info',
  background: 'info'
}, {
  name: 'Erreur',
  text: 'error',
  background: 'error'
}, {
  name: 'Accent',
  text: 'accent',
  background: 'accent'
}, {
  name: 'Secondaire',
  text: 'text--darken-1 secondary',
  background: 'darken-1 secondary'
}, {
  name: 'Light secondaire',
  text: 'text--lighten-3 secondary',
  background: 'lighten-3 secondary'
}, {
  name: 'Noir',
  text: 'black',
  background: 'black'
}, {
  name: 'Blanc',
  text: 'white',
  background: 'white'
}];
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/TextColorBtn.vue?vue&type=script&lang=ts&


/* harmony default export */ var TextColorBtnvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    editor: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const dialog = Object(runtime["m" /* ref */])(false);
    const colors = editorColors;

    const chooseColor = color => {
      var _a;

      (_a = props.editor) === null || _a === void 0 ? void 0 : _a.chain().focus().setColor(color.text).run();
      dialog.value = false;
    };

    const removeColor = () => {
      var _a;

      (_a = props.editor) === null || _a === void 0 ? void 0 : _a.chain().focus().removeColor().run();
      dialog.value = false;
    };

    return {
      dialog,
      colors,
      chooseColor,
      removeColor
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/Editor/TextColorBtn.vue?vue&type=script&lang=ts&
 /* harmony default export */ var Editor_TextColorBtnvue_type_script_lang_ts_ = (TextColorBtnvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
var VList = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItem.js
var VListItem = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 3 modules
var components_VList = __webpack_require__(17);

// CONCATENATED MODULE: ./app/components/util/Editor/TextColorBtn.vue





/* normalize component */

var TextColorBtn_component = Object(componentNormalizer["a" /* default */])(
  Editor_TextColorBtnvue_type_script_lang_ts_,
  TextColorBtnvue_type_template_id_1d6518e6_render,
  TextColorBtnvue_type_template_id_1d6518e6_staticRenderFns,
  false,
  null,
  null,
  "0d7a3172"
  
)

/* harmony default export */ var TextColorBtn = (TextColorBtn_component.exports);

/* vuetify-loader */








installComponents_default()(TextColorBtn_component, {VBtn: VBtn["a" /* default */],VDialog: VDialog["a" /* default */],VIcon: VIcon["a" /* default */],VList: VList["a" /* default */],VListItem: VListItem["a" /* default */],VListItemTitle: components_VList["b" /* VListItemTitle */],VTooltip: VTooltip["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/TextBackgroundColorBtn.vue?vue&type=template&id=3494873a&
var TextBackgroundColorBtnvue_type_template_id_3494873a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"width":"300"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onDropdown = ref.on;
var attrsDropdown = ref.attrs;
return [_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onTooltip = ref.on;
var attrsTooltip = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"small":""}},'v-btn',Object.assign({}, attrsDropdown, attrsTooltip),false),Object.assign({}, onDropdown, onTooltip)),[_c('v-icon',[_vm._v("ri-paint-fill")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Couleur de fond")])])]}}]),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-list',[_vm._l((_vm.colors),function(color,index){return _c('v-list-item',{key:index,class:color.background,on:{"click":function($event){return _vm.chooseBackgroundColor(color)}}},[_c('v-list-item-title',[_vm._v(_vm._s(color.name))])],1)}),_vm._v(" "),_c('v-list-item',{on:{"click":_vm.removeBackgroundColor}},[_c('v-list-item-title',[_vm._v("Aucune couleur")])],1)],2)],1)}
var TextBackgroundColorBtnvue_type_template_id_3494873a_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Editor/TextBackgroundColorBtn.vue?vue&type=template&id=3494873a&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/TextBackgroundColorBtn.vue?vue&type=script&lang=ts&


/* harmony default export */ var TextBackgroundColorBtnvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    editor: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const dialog = Object(runtime["m" /* ref */])(false);
    const colors = editorColors;

    const chooseBackgroundColor = backgroundColor => {
      var _a;

      (_a = props.editor) === null || _a === void 0 ? void 0 : _a.chain().focus().setBackgroundColor(backgroundColor.background).run();
      dialog.value = false;
    };

    const removeBackgroundColor = () => {
      var _a;

      (_a = props.editor) === null || _a === void 0 ? void 0 : _a.chain().focus().removeBackgroundColor().run();
      dialog.value = false;
    };

    return {
      dialog,
      colors,
      chooseBackgroundColor,
      removeBackgroundColor
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/Editor/TextBackgroundColorBtn.vue?vue&type=script&lang=ts&
 /* harmony default export */ var Editor_TextBackgroundColorBtnvue_type_script_lang_ts_ = (TextBackgroundColorBtnvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/util/Editor/TextBackgroundColorBtn.vue





/* normalize component */

var TextBackgroundColorBtn_component = Object(componentNormalizer["a" /* default */])(
  Editor_TextBackgroundColorBtnvue_type_script_lang_ts_,
  TextBackgroundColorBtnvue_type_template_id_3494873a_render,
  TextBackgroundColorBtnvue_type_template_id_3494873a_staticRenderFns,
  false,
  null,
  null,
  "a65a9fd6"
  
)

/* harmony default export */ var TextBackgroundColorBtn = (TextBackgroundColorBtn_component.exports);

/* vuetify-loader */








installComponents_default()(TextBackgroundColorBtn_component, {VBtn: VBtn["a" /* default */],VDialog: VDialog["a" /* default */],VIcon: VIcon["a" /* default */],VList: VList["a" /* default */],VListItem: VListItem["a" /* default */],VListItemTitle: components_VList["b" /* VListItemTitle */],VTooltip: VTooltip["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/FontFamilyBtn.vue?vue&type=template&id=5b62f818&
var FontFamilyBtnvue_type_template_id_5b62f818_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"width":"300"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onDropdown = ref.on;
var attrsDropdown = ref.attrs;
return [_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onTooltip = ref.on;
var attrsTooltip = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"small":""}},'v-btn',Object.assign({}, attrsDropdown, attrsTooltip),false),Object.assign({}, onDropdown, onTooltip)),[_c('v-icon',[_vm._v("ri-font-size")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Police de caractère")])])]}}]),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-list',[_vm._l((_vm.fonts),function(font,index){return _c('v-list-item',{key:index,on:{"click":function($event){return _vm.selectFontFamily(font)}}},[_c('v-list-item-title',{style:('font-family: ' + font)},[_vm._v("\n        "+_vm._s(font)+"\n      ")])],1)}),_vm._v(" "),_c('v-list-item',{on:{"click":_vm.removeFontFamily}},[_c('v-list-item-title',[_vm._v("Par défaut")])],1)],2)],1)}
var FontFamilyBtnvue_type_template_id_5b62f818_staticRenderFns = []


// CONCATENATED MODULE: ./app/components/util/Editor/FontFamilyBtn.vue?vue&type=template&id=5b62f818&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor/FontFamilyBtn.vue?vue&type=script&lang=ts&

const fonts = ['Permanent Marker', 'Amatic SC', 'Caveat', 'Helvetica'];
/* harmony default export */ var FontFamilyBtnvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  props: {
    editor: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const dialog = Object(runtime["m" /* ref */])(false);

    const selectFontFamily = font => {
      var _a;

      (_a = props.editor) === null || _a === void 0 ? void 0 : _a.chain().focus().setFontFamily(font).run();
      dialog.value = false;
    };

    const removeFontFamily = () => {
      var _a;

      (_a = props.editor) === null || _a === void 0 ? void 0 : _a.chain().focus().unsetFontFamily().run();
      dialog.value = false;
    };

    return {
      dialog,
      fonts,
      selectFontFamily,
      removeFontFamily
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/Editor/FontFamilyBtn.vue?vue&type=script&lang=ts&
 /* harmony default export */ var Editor_FontFamilyBtnvue_type_script_lang_ts_ = (FontFamilyBtnvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./app/components/util/Editor/FontFamilyBtn.vue





/* normalize component */

var FontFamilyBtn_component = Object(componentNormalizer["a" /* default */])(
  Editor_FontFamilyBtnvue_type_script_lang_ts_,
  FontFamilyBtnvue_type_template_id_5b62f818_render,
  FontFamilyBtnvue_type_template_id_5b62f818_staticRenderFns,
  false,
  null,
  null,
  "4341a6d0"
  
)

/* harmony default export */ var FontFamilyBtn = (FontFamilyBtn_component.exports);

/* vuetify-loader */








installComponents_default()(FontFamilyBtn_component, {VBtn: VBtn["a" /* default */],VDialog: VDialog["a" /* default */],VIcon: VIcon["a" /* default */],VList: VList["a" /* default */],VListItem: VListItem["a" /* default */],VListItemTitle: components_VList["b" /* VListItemTitle */],VTooltip: VTooltip["a" /* default */]})

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/util/Editor.vue?vue&type=script&lang=ts&
 // import the component and the necessary extensions






















/* harmony default export */ var Editorvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    FileUploadBtn: FileUploadBtn,
    EditorContent: vue_2_["EditorContent"],
    EditorBtn: EditorBtn,
    TextColorBtn: TextColorBtn,
    TextBackgroundColorBtn: TextBackgroundColorBtn,
    FontFamilyBtn: FontFamilyBtn
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },

  setup(props, {
    emit
  }) {
    const editor = Object(runtime["m" /* ref */])(null);
    const {
      value
    } = Object(runtime["q" /* toRefs */])(props);
    Object(runtime["h" /* onMounted */])(() => {
      editor.value = new vue_2_["Editor"]({
        content: value.value,
        extensions: [starter_kit_default.a, extension_text_align_default.a, extension_gapcursor_default.a, extension_typography_default.a, extension_table_default.a.configure({
          resizable: true
        }), extension_table_row_default.a, extension_table_header_default.a, extension_table_cell_default.a, resizableImage.configure({
          inline: true
        }), extension_link_default.a.configure({
          openOnClick: true
        }), extension_text_style_default.a, text_color, text_background_color, extension_text_default.a, extension_font_family_default.a],
        onUpdate: () => {
          var _a;

          emit('input', (_a = editor.value) === null || _a === void 0 ? void 0 : _a.getHTML());
        }
      });
    });
    Object(runtime["g" /* onBeforeUnmount */])(() => {
      var _a;

      (_a = editor.value) === null || _a === void 0 ? void 0 : _a.destroy();
    });

    const clearContent = () => {
      setContent('');
    };

    const addImage = () => {
      var _a;

      const url = window.prompt('URL');

      if (url) {
        (_a = editor.value) === null || _a === void 0 ? void 0 : _a.chain().focus().setImage({
          src: url
        }).run();
      }
    };

    const setLink = () => {
      var _a;

      const url = window.prompt('URL');

      if (url) {
        (_a = editor.value) === null || _a === void 0 ? void 0 : _a.chain().focus().setLink({
          href: url
        }).run();
      }
    };

    const setContent = content => {
      var _a;

      (_a = editor.value) === null || _a === void 0 ? void 0 : _a.commands.setContent(content, false);
    };

    Object(runtime["v" /* watch */])(value, newValue => {
      var _a;

      const isSame = ((_a = editor.value) === null || _a === void 0 ? void 0 : _a.getHTML()) === newValue;

      if (isSame) {
        return;
      }

      setContent(newValue || '');
    });
    return {
      editor,
      clearContent,
      setLink,
      addImage,
      setContent
    };
  }

}));
// CONCATENATED MODULE: ./app/components/util/Editor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var util_Editorvue_type_script_lang_ts_ = (Editorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VToolbar/VToolbar.js
var VToolbar = __webpack_require__(20);

// CONCATENATED MODULE: ./app/components/util/Editor.vue



function Editor_injectStyles (context) {
  
  var style0 = __webpack_require__(334)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Editor_component = Object(componentNormalizer["a" /* default */])(
  util_Editorvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  Editor_injectStyles,
  "540f87af",
  "f5b95984"
  
)

/* harmony default export */ var Editor = __webpack_exports__["a"] = (Editor_component.exports);

/* vuetify-loader */



installComponents_default()(Editor_component, {VBtn: VBtn["a" /* default */],VToolbar: VToolbar["a" /* default */]})


/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VTextarea_VTextarea_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);
/* harmony import */ var _src_components_VTextarea_VTextarea_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VTextarea_VTextarea_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(203);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
// Styles
 // Extensions

 // Utilities


const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'v-textarea',
  props: {
    autoGrow: Boolean,
    noResize: Boolean,
    rowHeight: {
      type: [Number, String],
      default: 24,
      validator: v => !isNaN(parseFloat(v))
    },
    rows: {
      type: [Number, String],
      default: 5,
      validator: v => !isNaN(parseInt(v, 10))
    }
  },
  computed: {
    classes() {
      return {
        'v-textarea': true,
        'v-textarea--auto-grow': this.autoGrow,
        'v-textarea--no-resize': this.noResizeHandle,
        ..._VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.computed.classes.call(this)
      };
    },

    noResizeHandle() {
      return this.noResize || this.autoGrow;
    }

  },
  watch: {
    lazyValue() {
      this.autoGrow && this.$nextTick(this.calculateInputHeight);
    },

    rowHeight() {
      this.autoGrow && this.$nextTick(this.calculateInputHeight);
    }

  },

  mounted() {
    setTimeout(() => {
      this.autoGrow && this.calculateInputHeight();
    }, 0);
  },

  methods: {
    calculateInputHeight() {
      const input = this.$refs.input;
      if (!input) return;
      input.style.height = '0';
      const height = input.scrollHeight;
      const minHeight = parseInt(this.rows, 10) * parseFloat(this.rowHeight); // This has to be done ASAP, waiting for Vue
      // to update the DOM causes ugly layout jumping

      input.style.height = Math.max(minHeight, height) + 'px';
    },

    genInput() {
      const input = _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.methods.genInput.call(this);
      input.tag = 'textarea';
      delete input.data.attrs.type;
      input.data.attrs.rows = this.rows;
      return input;
    },

    onInput(e) {
      _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.methods.onInput.call(this, e);
      this.autoGrow && this.calculateInputHeight();
    },

    onKeyDown(e) {
      // Prevents closing of a
      // dialog when pressing
      // enter
      if (this.isFocused && e.keyCode === 13) {
        e.stopPropagation();
      }

      this.$emit('keydown', e);
    }

  }
}));

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pageLogStore; });
/* harmony import */ var _custom_store_AbstractStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);


class PageLogStore extends _custom_store_AbstractStore__WEBPACK_IMPORTED_MODULE_0__[/* PersistentApiStore */ "a"] {
  constructor() {
    super(...arguments);
    this.deleteRole = '';
    this.editRole = '';
    this.listRole = '';
  }

  getAddLocation() {
    return null;
  }

  getEditLocation(item) {
    return null;
  }

  getListLocation() {
    return null;
  }

  getIdentifierFromUrlParam(param) {
    return `api/page_logs/${decodeURIComponent(param)}`;
  }

}

const pageLogStore = new PageLogStore('page_logs');

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_styles_components_selection_controls_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(270);
/* harmony import */ var _src_styles_components_selection_controls_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_styles_components_selection_controls_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_components_VSwitch_VSwitch_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(303);
/* harmony import */ var _src_components_VSwitch_VSwitch_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_components_VSwitch_VSwitch_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_selectable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(272);
/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40);
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(36);
/* harmony import */ var _VProgressCircular_VProgressCircular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);
// Styles

 // Mixins


 // Directives

 // Components


 // Helpers


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (_mixins_selectable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].extend({
  name: 'v-switch',
  directives: {
    Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]
  },
  props: {
    inset: Boolean,
    loading: {
      type: [Boolean, String],
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return { ..._VInput__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].options.computed.classes.call(this),
        'v-input--selection-controls v-input--switch': true,
        'v-input--switch--flat': this.flat,
        'v-input--switch--inset': this.inset
      };
    },

    attrs() {
      return {
        'aria-checked': String(this.isActive),
        'aria-disabled': String(this.isDisabled),
        role: 'switch'
      };
    },

    // Do not return undefined if disabled,
    // according to spec, should still show
    // a color when disabled and active
    validationState() {
      if (this.hasError && this.shouldValidate) return 'error';
      if (this.hasSuccess) return 'success';
      if (this.hasColor !== null) return this.computedColor;
      return undefined;
    },

    switchData() {
      return this.setTextColor(this.loading ? undefined : this.validationState, {
        class: this.themeClasses
      });
    }

  },
  methods: {
    genDefaultSlot() {
      return [this.genSwitch(), this.genLabel()];
    },

    genSwitch() {
      const {
        title,
        ...switchAttrs
      } = this.attrs$;
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [this.genInput('checkbox', { ...this.attrs,
        ...switchAttrs
      }), this.genRipple(this.setTextColor(this.validationState, {
        directives: [{
          name: 'touch',
          value: {
            left: this.onSwipeLeft,
            right: this.onSwipeRight
          }
        }]
      })), this.$createElement('div', {
        staticClass: 'v-input--switch__track',
        ...this.switchData
      }), this.$createElement('div', {
        staticClass: 'v-input--switch__thumb',
        ...this.switchData
      }, [this.genProgress()])]);
    },

    genProgress() {
      return this.$createElement(_transitions__WEBPACK_IMPORTED_MODULE_5__[/* VFabTransition */ "c"], {}, [this.loading === false ? null : this.$slots.progress || this.$createElement(_VProgressCircular_VProgressCircular__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
        props: {
          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
          size: 16,
          width: 2,
          indeterminate: true
        }
      })]);
    },

    onSwipeLeft() {
      if (this.isActive) this.onChange();
    },

    onSwipeRight() {
      if (!this.isActive) this.onChange();
    },

    onKeydown(e) {
      if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* keyCodes */ "y"].left && this.isActive || e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* keyCodes */ "y"].right && !this.isActive) this.onChange();
    }

  }
}));

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(375);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("137cef03", content, true, context)
};

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(317);
/* harmony import */ var _src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(237);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(238);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81);
/* harmony import */ var _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(254);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4);
 // Mixins






 // Helpers




/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_dependent__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]).extend({
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
        maxWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "h"])(this.maxWidth),
        minWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "h"])(this.minWidth),
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
    if (Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* getSlotType */ "u"])(this, 'activator', true) === 'v-slot') {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_8__[/* consoleError */ "b"])(`v-tooltip's activator slot must be bound, try '<template #activator="data"><v-btn v-on="data.on>'`, this);
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
        if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* keyCodes */ "y"].esc) {
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

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(347);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".editor-has-error{border:1px solid red}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/components/admin/page/Form.vue?vue&type=template&id=6f6e3e59&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-form',[_c('v-container',[_c('v-row',[_c('v-col',{attrs:{"cols":"12","md":"6"}},[_c('v-text-field',{attrs:{"label":"Titre","error-messages":_vm.titleErrors,"required":""},on:{"input":function($event){return _vm.v$.title.$touch()},"blur":function($event){return _vm.v$.title.$touch()}},model:{value:(_vm.item.title),callback:function ($$v) {_vm.$set(_vm.item, "title", $$v)},expression:"item.title"}})],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[_c('v-text-field',{attrs:{"label":"Url","error-messages":_vm.urlErrors,"required":""},on:{"input":function($event){return _vm.v$.url.$touch()},"blur":function($event){return _vm.v$.url.$touch()}},model:{value:(_vm.item.url),callback:function ($$v) {_vm.$set(_vm.item, "url", $$v)},expression:"item.url"}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12","md":"6"}},[_c('v-switch',{attrs:{"label":"Publier","input-value":"true"},model:{value:(_vm.item.isPublished),callback:function ($$v) {_vm.$set(_vm.item, "isPublished", $$v)},expression:"item.isPublished"}})],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[_c('v-switch',{attrs:{"label":"Ajouter au menu","input-value":"true"},model:{value:(_vm.item.showInMenu),callback:function ($$v) {_vm.$set(_vm.item, "showInMenu", $$v)},expression:"item.showInMenu"}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12","sm":"6","md":"6"}},[(_vm.pageCategoryState.selectItems)?_c('v-combobox',{attrs:{"items":_vm.pageCategoryState.selectItems,"no-data-text":"Aucune catégorie n'a ce nom","label":"Catégorie de la page","item-text":"name","item-value":"@id","return-object":false,"clearable":""},model:{value:(_vm.item.category),callback:function ($$v) {_vm.$set(_vm.item, "category", $$v)},expression:"item.category"}}):_vm._e()],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","sm":"6","md":"6"}},[(_vm.mediaNodeState.selectItems)?_c('v-combobox',{attrs:{"items":_vm.mediaNodeState.selectItems,"no-data-text":"Aucun galerie n'a ce nom","label":"Lier une galerie à cette page","item-text":"name","item-value":"@id","return-object":false,"clearable":""},model:{value:(_vm.item.mediaNode),callback:function ($$v) {_vm.$set(_vm.item, "mediaNode", $$v)},expression:"item.mediaNode"}}):_vm._e()],1)],1),_vm._v(" "),(_vm.contentErrors)?_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('ul',_vm._l((_vm.contentErrors),function(error,i){return _c('li',{key:i,staticClass:"error--text"},[_vm._v("\n            "+_vm._s(error)+"\n          ")])}),0)])],1):_vm._e(),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12"}},[_c('ClientOnly',[(_vm.item.content !== undefined)?_c('Editor',{ref:"editor",class:{'editor-has-error': _vm.contentErrors.length > 0},scopedSlots:_vm._u([{key:"supplemental_btns",fn:function(){return [_c('v-dialog',{attrs:{"width":"90%"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onDropdown = ref.on;
var attrsDropdown = ref.attrs;
return [_c('v-tooltip',{attrs:{"top":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var onTooltip = ref.on;
var attrsTooltip = ref.attrs;
return [_c('v-btn',_vm._g(_vm._b({attrs:{"small":""}},'v-btn',Object.assign({}, attrsDropdown, attrsTooltip),false),Object.assign({}, onDropdown, onTooltip)),[_c('v-icon',[_vm._v("ri-download-cloud-line")])],1)]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Charger une ancienne version")])])]}}],null,false,650426681),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-card',[_c('v-card-title',{staticClass:"headline grey lighten-2"},[_vm._v("\n                    Sélectionner une version de la page\n                  ")]),_vm._v(" "),_c('v-card-text',[_c('v-select',{attrs:{"items":_vm.pageLogs,"item-text":function (item) {
                        return ("#" + (item.id) + " " + (_vm.formatDate(item.updatedAt)) + " - " + (item.draft ? 'Automatique' : ("Manuelle par " + (item.updatedBy.nickname))))
                      },"item-value":"@id","label":"Choisissez une version"},model:{value:(_vm.selectedLog),callback:function ($$v) {_vm.selectedLog=$$v},expression:"selectedLog"}}),_vm._v(" "),(_vm.selectedLog && _vm.findLog(_vm.selectedLog))?_c('v-textarea',{domProps:{"innerHTML":_vm._s(_vm.findLog(_vm.selectedLog).originalContent)}}):_vm._e()],1),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary","text":""},on:{"click":function($event){$event.preventDefault();return _vm.setContent.apply(null, arguments)}}},[_vm._v("\n                      Récupérer la version sélectionnée\n                    ")])],1)],1)],1)]},proxy:true}],null,false,524316236),model:{value:(_vm.item.content),callback:function ($$v) {_vm.$set(_vm.item, "content", $$v)},expression:"item.content"}}):_vm._e()],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/components/admin/page/Form.vue?vue&type=template&id=6f6e3e59&

// EXTERNAL MODULE: external "@vuelidate/validators"
var validators_ = __webpack_require__(87);

// EXTERNAL MODULE: external "date-fns"
var external_date_fns_ = __webpack_require__(208);

// EXTERNAL MODULE: external "date-fns/locale"
var locale_ = __webpack_require__(209);

// EXTERNAL MODULE: external "lodash/has"
var has_ = __webpack_require__(53);
var has_default = /*#__PURE__*/__webpack_require__.n(has_);

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(3);

// EXTERNAL MODULE: external "@vuelidate/core"
var core_ = __webpack_require__(86);
var core_default = /*#__PURE__*/__webpack_require__.n(core_);

// EXTERNAL MODULE: ./app/components/util/Editor.vue + 38 modules
var Editor = __webpack_require__(336);

// EXTERNAL MODULE: ./app/custom-store/MediaNodeStore.ts
var MediaNodeStore = __webpack_require__(274);

// EXTERNAL MODULE: ./app/custom-store/PageCategoryStore.ts
var PageCategoryStore = __webpack_require__(300);

// EXTERNAL MODULE: ./app/custom-store/PageLogStore.ts
var PageLogStore = __webpack_require__(340);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/components/admin/page/Form.vue?vue&type=script&lang=ts&











const slug = value => !!value.match(/^[a-zA-Z0-9-]*$/);

/* harmony default export */ var Formvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    Editor: Editor["a" /* default */]
  },
  props: {
    pageLogs: {
      type: Array,
      required: true
    },
    values: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      default: () => {}
    }
  },

  setup(props) {
    const context = Object(runtime["r" /* useContext */])();
    MediaNodeStore["a" /* mediaNodeStore */].setContext(context);
    PageCategoryStore["a" /* pageCategoryStore */].setContext(context);
    PageLogStore["a" /* pageLogStore */].setContext(context);
    const dialog = Object(runtime["m" /* ref */])(false);
    const selectedLog = Object(runtime["m" /* ref */])(null);
    const editor = Object(runtime["m" /* ref */])(null);
    const item = Object(runtime["a" /* computed */])(() => props.values);
    const validation = Object(runtime["a" /* computed */])(() => ({
      title: {
        required: validators_["required"],
        minLength: Object(validators_["minLength"])(4)
      },
      content: {
        required: validators_["required"],
        minLength: Object(validators_["minLength"])(1)
      },
      url: {
        required: validators_["required"],
        minLength: Object(validators_["minLength"])(2),
        slug
      }
    }));
    const v$ = core_default()(validation, item);
    const violations = Object(runtime["a" /* computed */])(() => {
      return props.errors;
    });
    const titleErrors = Object(runtime["a" /* computed */])(() => {
      const errors = [];

      if (!v$.value.title || !v$.value.title.$dirty) {
        return errors;
      }

      has_default()(violations.value, 'title') && errors.push(violations.value.title);
      v$.value.title.required.$invalid && errors.push('Le titre est obligatoire');
      v$.value.title.minLength.$invalid && errors.push('Le titre doit faire au moins 4 caractères');
      return errors;
    });
    const urlErrors = Object(runtime["a" /* computed */])(() => {
      const errors = [];

      if (!v$.value.url || !v$.value.url.$dirty) {
        return errors;
      }

      has_default()(violations.value, 'url') && errors.push(violations.value.url);
      v$.value.url.minLength.$invalid && errors.push('Le titre doit faire au moins 2 caractères');
      v$.value.url.slug.$invalid && errors.push('L\'url doit contenir seulement des chiffres, des lettres et le tiret du haut -');
      return errors;
    });
    const contentErrors = Object(runtime["a" /* computed */])(() => {
      const errors = [];

      if (!v$.value.content || !v$.value.content.$dirty) {
        return errors;
      }

      has_default()(violations.value, 'url') && errors.push(violations.value.content);
      v$.value.content.$invalid && errors.push('Le titre doit faire au moins 2 caractères');
      return errors;
    });
    Object(runtime["h" /* onMounted */])(() => {
      PageCategoryStore["a" /* pageCategoryStore */].fetchSelectItems();
      MediaNodeStore["a" /* mediaNodeStore */].fetchSelectItems();
    });

    const setContent = () => {
      if (selectedLog.value && PageLogStore["a" /* pageLogStore */].find(selectedLog.value) && editor.value) {
        const selectedLogObj = PageLogStore["a" /* pageLogStore */].find(selectedLog.value);

        if (selectedLogObj) {
          // @ts-ignore
          editor.value.setContent(selectedLogObj.originalContent);
        }

        dialog.value = false;
      }
    };

    const formatDate = rawDate => {
      return Object(external_date_fns_["formatRelative"])(Object(external_date_fns_["parseISO"])(rawDate), new Date(), {
        locale: locale_["fr"]
      });
    };

    return {
      item,
      titleErrors,
      urlErrors,
      contentErrors,
      formatDate,
      dialog,
      setContent,
      selectedLog,
      v$,
      mediaNodeState: MediaNodeStore["a" /* mediaNodeStore */].getState(),
      pageCategoryState: PageCategoryStore["a" /* pageCategoryStore */].getState(),
      findLog: PageLogStore["a" /* pageLogStore */].find,
      editor
    };
  }

}));
// CONCATENATED MODULE: ./app/components/admin/page/Form.vue?vue&type=script&lang=ts&
 /* harmony default export */ var page_Formvue_type_script_lang_ts_ = (Formvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(13);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCombobox/VCombobox.js + 1 modules
var VCombobox = __webpack_require__(309);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js + 1 modules
var VContainer = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(276);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VForm/VForm.js
var VForm = __webpack_require__(232);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(234);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSelect/VSelect.js + 4 modules
var VSelect = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(235);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSwitch/VSwitch.js
var VSwitch = __webpack_require__(346);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.js + 3 modules
var VTextField = __webpack_require__(203);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextarea/VTextarea.js
var VTextarea = __webpack_require__(339);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTooltip/VTooltip.js
var VTooltip = __webpack_require__(358);

// CONCATENATED MODULE: ./app/components/admin/page/Form.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(374)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  page_Formvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "168b81a8"
  
)

/* harmony default export */ var Form = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */



















installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["b" /* VCardText */],VCardTitle: components_VCard["c" /* VCardTitle */],VCol: VCol["a" /* default */],VCombobox: VCombobox["a" /* default */],VContainer: VContainer["a" /* default */],VDialog: VDialog["a" /* default */],VForm: VForm["a" /* default */],VIcon: VIcon["a" /* default */],VRow: VRow["a" /* default */],VSelect: VSelect["a" /* default */],VSpacer: VSpacer["a" /* default */],VSwitch: VSwitch["a" /* default */],VTextField: VTextField["a" /* default */],VTextarea: VTextarea["a" /* default */],VTooltip: VTooltip["a" /* default */]})


/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/page/new.vue?vue&type=template&id=20afd21d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Form',{ref:"createForm",attrs:{"values":_vm.item,"errors":_vm.state.violations,"page-logs":[]}}),_vm._ssrNode(" "),_c('Toolbar',{attrs:{"handle-submit":_vm.onSendForm,"handle-reset":_vm.resetForm}}),_vm._ssrNode(" "),_c('Loading',{attrs:{"visible":_vm.state.isLoading}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./app/pages/admin/page/new.vue?vue&type=template&id=20afd21d&

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(3);

// EXTERNAL MODULE: ./app/components/util/Loading.vue + 4 modules
var Loading = __webpack_require__(268);

// EXTERNAL MODULE: ./app/components/form/Toolbar.vue + 4 modules
var Toolbar = __webpack_require__(257);

// EXTERNAL MODULE: ./app/components/admin/page/Form.vue + 4 modules
var Form = __webpack_require__(384);

// EXTERNAL MODULE: ./app/composable/ItemCreate.ts
var ItemCreate = __webpack_require__(293);

// EXTERNAL MODULE: ./app/custom-store/PageStore.ts
var PageStore = __webpack_require__(10);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/vue-loader/lib??vue-loader-options!./app/pages/admin/page/new.vue?vue&type=script&lang=ts&






/* harmony default export */ var newvue_type_script_lang_ts_ = (Object(runtime["b" /* defineComponent */])({
  components: {
    Loading: Loading["a" /* default */],
    Toolbar: Toolbar["a" /* default */],
    Form: Form["a" /* default */]
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  },

  setup() {
    const item = Object(runtime["k" /* reactive */])({
      content: '',
      showInMenu: false,
      isPublished: false
    });
    PageStore["a" /* pageStore */].setContext(Object(runtime["r" /* useContext */])());
    return {
      item,
      ...Object(runtime["q" /* toRefs */])(Object(ItemCreate["a" /* default */])(PageStore["a" /* pageStore */]))
    };
  },

  head() {
    return {
      title: 'Ajout d\'une page'
    };
  }

}));
// CONCATENATED MODULE: ./app/pages/admin/page/new.vue?vue&type=script&lang=ts&
 /* harmony default export */ var page_newvue_type_script_lang_ts_ = (newvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(11);

// CONCATENATED MODULE: ./app/pages/admin/page/new.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  page_newvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "79642f48"
  
)

/* harmony default export */ var page_new = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=new.js.map