(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{559:function(e,t,n){"use strict";n(35);var r=n(11),o=n(21),c=n(19),l=n(18),h=n(6),f=n(14),d=(n(5),n(20));function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var v=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},y=function(e){Object(c.a)(n,e);var t=m(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"show",get:function(){return this.visible},set:function(e){e||this.$emit("close")}}]),n}(d.Vue);v([Object(d.Prop)({type:Function,default:function(){}})],y.prototype,"handleDelete",void 0),v([Object(d.Prop)({type:Boolean,default:!0,required:!1})],y.prototype,"visible",void 0);var O=y=v([Object(d.Component)({name:"ConfirmDelete"})],y),I=n(31),x=n(40),j=n.n(x),S=n(121),D=n(205),P=n(161),w=n(608),_=n(554),component=Object(I.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[n("v-card",[n("v-card-text",[e._v("Are you sure you want to delete this item?")]),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"error darken-1"},on:{click:e.handleDelete}},[e._v("\n        Delete\n      ")]),e._v(" "),n("v-btn",{attrs:{color:"secondary darken-1",text:""},on:{click:function(t){t.stopPropagation(),e.show=!1}}},[e._v("\n        Cancel\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports;j()(component,{VBtn:S.a,VCard:D.a,VCardActions:P.a,VCardText:P.b,VDialog:w.a,VSpacer:_.a})},564:function(e,t,n){var content=n(577);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(16).default)("50788f08",content,!0,{sourceMap:!1})},571:function(e,t,n){"use strict";n(9),n(8),n(5),n(13);var r=n(0),o=(n(43),n(7),n(75),n(52),n(34),n(564),n(566)),c=n(536),l=n(46),h=n(1);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m=d(d({},o.b),{},{offsetY:!0,offsetOverflow:!0,transition:!1});t.a=o.a.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(e,t,n){return n.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:o.a.options.props.menuProps.type,default:function(){return m}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return d(d({},o.a.options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var e=this;return this.selectedItems.map((function(t){return e.getValue(t)}))},hasDisplayedItems:function(){var e=this;return this.hideSelected?this.filteredItems.some((function(t){return!e.hasItem(t)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var e=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(t){var n=Object(h.r)(t,e.itemText),text=null!=n?String(n):"";return e.filter(t,String(e.internalSearch),text)}))},internalSearch:{get:function(){return this.lazySearch},set:function(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var e=o.a.options.computed.$_menuProps.call(this);return e.contentClass="v-autocomplete__content ".concat(e.contentClass||"").trim(),d(d({},m),e)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var e=this;return this.multiple?null:this.selectedItems.find((function(i){return e.valueComparator(e.getValue(i),e.getValue(e.internalValue))}))},listData:function(){var data=o.a.options.computed.listData.call(this);return data.props=d(d({},data.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.blur(),this.updateSelf())},isMenuActive:function(e){!e&&this.hasSlot&&(this.lazySearch=null)},items:function(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput:function(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(e,t){var n=this;e!==t&&(this.setMenuIndex(-1),this.$nextTick((function(){n.internalSearch&&(1===e.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(e){this.searchIsDirty||(this.multiple&&e===h.x.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===h.x.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==h.x.backspace&&e!==h.x.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var e=this.selectedIndex,t=this.selectedItems[e];if(this.isInteractive&&!this.getDisabled(t)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var r=e!==this.selectedItems.length-1?e:e-1;this.selectedItems[r]?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=r}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=null,o.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=c.a.options.methods.genInput.call(this);return input.data=Object(l.a)(input.data,{attrs:{"aria-activedescendant":Object(h.p)(this.$refs.menu,"activeTile.id"),autocomplete:Object(h.p)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=o.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?o.a.options.methods.genSelections.call(this):[]},onClick:function(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput:function(e){if(!(this.selectedIndex>-1)&&e.target){var t=e.target,n=t.value;t.value&&this.activateMenu(),this.internalSearch=n,this.badInput=t.validity&&t.validity.badInput}},onKeyDown:function(e){var t=e.keyCode;!e.ctrlKey&&[h.x.home,h.x.end].includes(t)||o.a.options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown:function(e){},onTabDown:function(e){o.a.options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown:function(e){e.preventDefault(),this.activateMenu()},selectItem:function(e){o.a.options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems:function(){o.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var e=this;this.$nextTick((function(){e.multiple&&e.internalSearch&&e.isMenuActive||(e.internalSearch=!e.selectedItems.length||e.multiple||e.hasSlot?null:e.getText(e.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy:function(e){var t,n;if(-1!==this.selectedIndex){var r=this.selectedItems[this.selectedIndex],o=this.getText(r);null==(t=e.clipboardData)||t.setData("text/plain",o),null==(n=e.clipboardData)||n.setData("text/vnd.vuetify.autocomplete.item+plain",o),e.preventDefault()}}}})},577:function(e,t,n){var r=n(15)(!1);r.push([e.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input{pointer-events:inherit}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""]),e.exports=r},578:function(e,t,n){"use strict";n(35),n(9),n(8),n(7),n(13);var r=n(0),o=n(11),c=n(21),l=n(19),h=n(18),f=n(6),d=n(14),m=(n(5),n(53),n(20)),v=n(596),y=n.n(v),O=n(212);function I(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function x(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?I(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):I(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var S=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},D=Object(m.namespace)("security"),P=function(e){Object(l.a)(n,e);var t=j(n);function n(){var e;return Object(o.a)(this,n),(e=t.apply(this,arguments)).options={sortBy:[],sortDesc:[],page:1,itemsPerPage:15,totalItems:0},e.filters={},e}return Object(c.a)(n,[{key:"onDeletedItem",value:function(e){this.showMessage("".concat(e["@id"]," deleted."))}},{key:"onError",value:function(e){e&&this.showError(e)}},{key:"onItems",value:function(){this.options.totalItems=this.totalItems}},{key:"onUpdateOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.page,n=e.itemsPerPage,r=e.sortBy,o=e.sortDesc,c=e.totalItems,l=x({},this.filters);n&&n>0&&(l=x(x({},l),{},{itemsPerPage:n,page:t})),y()(r)||y()(o)||(l["order[".concat(r[0],"]")]=o[0]?"desc":"asc"),this.resetList(!0),Object.assign(this.options,{sortBy:r,sortDesc:o,itemsPerPage:n,totalItems:c}),this.fetchAll(l)}},{key:"onSendFilter",value:function(){this.resetList(!0)}},{key:"resetFilter",value:function(){this.filters={},this.onSendFilter()}},{key:"addHandler",value:function(){this.$router.push({name:"".concat(this.$options.servicePrefix,"-new")})}},{key:"showHandler",value:function(e){this.$router.push({name:"".concat(this.$options.servicePrefix,"-id"),params:{id:e["@id"]}})}},{key:"editHandler",value:function(e){var t=this.$options.resourcePrefix?e["@id"].replace(this.$options.resourcePrefix,""):e["@id"];this.$router.push({name:"".concat(this.$options.servicePrefix,"-id"),params:{id:t}})}},{key:"deleteHandler",value:function(e){}}]),n}(Object(m.mixins)(O.a));S([D.Getter("hasPermission")],P.prototype,"hasPermission",void 0),S([Object(m.Watch)("deletedItem")],P.prototype,"onDeletedItem",null),S([Object(m.Watch)("error")],P.prototype,"onError",null),S([Object(m.Watch)("items")],P.prototype,"onItems",null),P=S([m.Component],P),t.a=P},581:function(e,t,n){"use strict";n(35);var r=n(11),o=n(19),c=n(18),l=n(6),h=n(14),f=(n(5),n(20)),d=n(559);function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(l.a)(e);if(t){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var v=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},y=function(e){Object(o.a)(n,e);var t=m(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).confirmDelete=!1,e}return n}(f.Vue);v([Object(f.Prop)({type:Function,required:!1,default:null})],y.prototype,"handleShow",void 0),v([Object(f.Prop)({type:Function,required:!1,default:null})],y.prototype,"handleEdit",void 0),v([Object(f.Prop)({type:Function,required:!1,default:null})],y.prototype,"handleDelete",void 0);var O=y=v([Object(f.Component)({components:{ConfirmDelete:d.a}})],y),I=n(31),x=n(40),j=n.n(x),S=n(121),D=n(199),P=n(553),component=Object(I.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-row",{attrs:{justify:"center"}},[e.handleShow?n("v-btn",{attrs:{elevation:"0",tile:"",color:"info"},on:{click:e.handleShow}},[n("v-icon",[e._v("\n        ri-eye-line\n      ")])],1):e._e(),e._v(" "),e.handleEdit?n("v-btn",{attrs:{elevation:"0",tile:"",color:"primary"},on:{click:e.handleEdit}},[n("v-icon",[e._v("\n        ri-edit-line\n      ")])],1):e._e(),e._v(" "),e.handleDelete?n("v-btn",{attrs:{elevation:"0",tile:"",color:"accent"},on:{click:function(t){e.confirmDelete=!0}}},[n("v-icon",[e._v("\n        ri-delete-bin-line\n      ")])],1):e._e()],1),e._v(" "),e.handleDelete?n("ConfirmDelete",{attrs:{visible:e.confirmDelete,"handle-delete":e.handleDelete},on:{close:function(t){e.confirmDelete=!1}}}):e._e()],1)}),[],!1,null,null,null);t.a=component.exports;j()(component,{VBtn:S.a,VIcon:D.a,VRow:P.a})},582:function(e,t,n){"use strict";n(35);var r=n(11),o=n(21),c=n(19),l=n(18),h=n(6),f=n(14),d=(n(5),n(20));function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var v=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},y=function(e){Object(c.a)(n,e);var t=m(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"onFilter",value:function(){this.handleFilter()}},{key:"onCancel",value:function(){this.handleReset()}}]),n}(d.Vue);v([Object(d.Prop)({type:Function,required:!0})],y.prototype,"handleReset",void 0),v([Object(d.Prop)({type:Function,required:!0})],y.prototype,"handleFilter",void 0);var O=y=v([d.Component],y),I=n(31),x=n(40),j=n.n(x),S=n(121),D=n(161),P=n(199),w=n(626),_=n(39),C=n(554),component=Object(I.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",{attrs:{transition:"slide-y-transition","close-on-content-click":!1,"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"white"}},"v-btn",o,!1),r),[e._v("\n      Filter "),n("v-icon",{attrs:{right:""}},[e._v("\n        ri-filter-line\n      ")])],1)]}}])},[e._v(" "),n("v-sheet",[n("v-card-title",[e._v("Filters")]),e._v(" "),e._t("filter"),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:e.onFilter}},[e._v("\n        Filter\n      ")]),e._v(" "),n("v-btn",{staticClass:"ml-2",attrs:{color:"primary",text:""},on:{click:e.onCancel}},[e._v("\n        Cancel\n      ")])],1)],2)],1)}),[],!1,null,null,null);t.a=component.exports;j()(component,{VBtn:S.a,VCardActions:D.a,VCardTitle:D.c,VIcon:P.a,VMenu:w.a,VSheet:_.a,VSpacer:C.a})},603:function(e,t,n){"use strict";n(9),n(8),n(7),n(5),n(13);var r=n(0),o=(n(27),n(61),n(62),n(75),n(162),n(36),n(28),n(52),n(34),n(564),n(566)),c=n(571),l=n(1);function h(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=c.a.extend({name:"v-combobox",props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{computedCounterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return o.a.options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)},searchIsDirty:function(){return null!=this.internalSearch}},methods:{onInternalSearchChanged:function(e){if(e&&this.multiple&&this.delimiters.length){var t=this.delimiters.find((function(t){return e.endsWith(t)}));null!=t&&(this.internalSearch=e.slice(0,e.length-t.length),this.updateTags())}this.updateMenuDimensions()},genInput:function(){var input=c.a.options.methods.genInput.call(this);return delete input.data.attrs.name,input.data.on.paste=this.onPaste,input},genChipSelection:function(e,t){var n=this,r=o.a.options.methods.genChipSelection.call(this,e,t);return this.multiple&&(r.componentOptions.listeners=f(f({},r.componentOptions.listeners),{},{dblclick:function(){n.editingIndex=t,n.internalSearch=n.getText(e),n.selectedIndex=-1}})),r},onChipInput:function(e){o.a.options.methods.onChipInput.call(this,e),this.editingIndex=-1},onEnterDown:function(e){e.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onFilteredItemsChanged:function(e,t){this.autoSelectFirst&&c.a.options.methods.onFilteredItemsChanged.call(this,e,t)},onKeyDown:function(e){var t=e.keyCode;!e.ctrlKey&&[l.x.home,l.x.end].includes(t)||o.a.options.methods.onKeyDown.call(this,e),this.multiple&&t===l.x.left&&0===this.$refs.input.selectionStart?this.updateSelf():t===l.x.enter&&this.onEnterDown(e),this.changeSelectedIndex(t)},onTabDown:function(e){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return e.preventDefault(),e.stopPropagation(),this.updateTags();c.a.options.methods.onTabDown.call(this,e)},selectItem:function(e){this.editingIndex>-1?this.updateEditing():(c.a.options.methods.selectItem.call(this,e),this.internalSearch&&this.multiple&&this.getText(e).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(e){var t;o.a.options.methods.setValue.call(this,null!=(t=e)?t:this.internalSearch)},updateEditing:function(){var e=this.internalValue.slice();e[this.editingIndex]=this.internalSearch,this.setValue(e),this.editingIndex=-1},updateCombobox:function(){this.searchIsDirty&&(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),(Boolean(this.$scopedSlots.selection)||this.hasChips)&&(this.internalSearch=null))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var e=this.getMenuIndex();if(!(e<0&&!this.searchIsDirty||!this.internalSearch)){if(this.editingIndex>-1)return this.updateEditing();var t=this.selectedItems.indexOf(this.internalSearch);if(t>-1){var n=this.internalValue.slice();n.splice(t,1),this.setValue(n)}if(e>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null}},onPaste:function(e){var t;if(this.multiple&&!this.searchIsDirty){var n=null==(t=e.clipboardData)?void 0:t.getData("text/vnd.vuetify.autocomplete.item+plain");n&&-1===this.findExistingIndex(n)&&(e.preventDefault(),o.a.options.methods.selectItem.call(this,n))}}}})},727:function(e,t,n){"use strict";n.r(t);n(35);var r=n(10),o=n(11),c=n(21),l=n(19),h=n(18),f=n(6),d=n(14),m=(n(63),n(5),n(7),n(27),n(61),n(62),n(20)),v=n(277),y=n(581),O=n(582);n(44);function I(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var x=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},j=Object(m.namespace)("member_group"),S=function(e){Object(l.a)(n,e);var t=I(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"item",get:function(){return this.values}},{key:"mounted",value:function(){this.groupsGetSelectItems()}}]),n}(m.Vue);x([Object(m.Prop)({type:Object,required:!0})],S.prototype,"values",void 0),x([j.State("selectItems")],S.prototype,"groupsSelectItems",void 0),x([j.Action("fetchSelectItems")],S.prototype,"groupsGetSelectItems",void 0);var D=S=x([m.Component],S),P=n(31),w=n(40),_=n.n(w),C=n(551),R=n(603),k=n(557),V=n(553),F=n(536),component=Object(P.a)(D,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[n("v-text-field",{attrs:{label:"Email du membre",type:"text"},model:{value:e.item.email,callback:function(t){e.$set(e.item,"email",t)},expression:"item.email"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[n("v-text-field",{attrs:{label:"Le pseudo du membre",type:"text"},model:{value:e.item.nickname,callback:function(t){e.$set(e.item,"nickname",t)},expression:"item.nickname"}})],1)],1),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12",md:"6"}},[e.groupsSelectItems?n("v-combobox",{attrs:{items:e.groupsSelectItems,label:"Dans le groupe","item-text":"name","item-value":"name",clearable:""},model:{value:e.item.groups,callback:function(t){e.$set(e.item,"groups",t)},expression:"item.groups"}}):e._e()],1)],1)],1)}),[],!1,null,null,null),E=component.exports;_()(component,{VCol:C.a,VCombobox:R.a,VContainer:k.a,VRow:V.a,VTextField:F.a});var $=n(578),T=n(29);function M(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var A=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},B=Object(m.namespace)("member"),L=function(e){Object(l.a)(h,e);var t,n=M(h);function h(){var e;return Object(o.a)(this,h),(e=n.apply(this,arguments)).selected=[],e.headers=[{text:"Email",value:"email"},{text:"Pseudo",value:"nickname"},{text:"Actions",value:"actions",sortable:!1}],e}return Object(c.a)(h,[{key:"fetch",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.store,e.next=3,n.dispatch("member/fetchAll");case 3:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})},{key:"filteredItems",get:function(){return v.default?this.items:this.items.filter((function(e){return!e.isAdmin}))}},{key:"canEditMember",get:function(){return this.hasPermission("USER_CAN_EDIT_MEMBERS")}},{key:"editItem",value:function(e){this.$router.push({name:"admin-member-id",params:{id:e.id.toString()}})}}]),h}(Object(m.mixins)($.a));A([B.Getter("list")],L.prototype,"items",void 0),A([B.State("deleted")],L.prototype,"deletedItem",void 0),A([B.State("error")],L.prototype,"error",void 0),A([B.State("isLoading")],L.prototype,"isLoading",void 0),A([B.State("totalItems")],L.prototype,"totalItems",void 0),A([B.Mutation(T.MUTATIONS.RESET_LIST)],L.prototype,"resetList",void 0),A([B.Action("fetchAll")],L.prototype,"fetchAll",void 0),A([B.Action("del")],L.prototype,"deleteItem",void 0);var z=L=A([Object(m.Component)({components:{ActionCell:y.a,FormFilter:O.a,MemberFilter:E},servicePrefix:"admin-member",resourcePrefix:"/api/members/",layout:"Admin",middleware:"hasPermissions",fetchOnServer:!1,meta:{permissions:["USER_CAN_ACCESS_MEMBERS"]}})],L),N=n(725),K=n(554),U=n(51),H=n(210),G=Object(P.a)(z,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.filteredItems,"items-per-page":e.options.itemsPerPage,loading:e.isLoading,"loading-text":"Loading...",options:e.options,"server-items-length":e.totalItems,"item-key":"@id","show-select":""},on:{"update:itemsPerPage":function(t){return e.$set(e.options,"itemsPerPage",t)},"update:items-per-page":function(t){return e.$set(e.options,"itemsPerPage",t)},"update:options":[function(t){e.options=t},e.onUpdateOptions]},scopedSlots:e._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-toolbar-title",[e._v("Liste de membres")]),e._v(" "),n("v-spacer"),e._v(" "),n("FormFilter",{attrs:{"handle-filter":e.onSendFilter,"handle-reset":e.resetFilter}},[n("MemberFilter",{ref:"filterForm",attrs:{slot:"filter",values:e.filters},slot:"filter"})],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){return n("ActionCell",{attrs:{"handle-edit":e.canEditMember?function(){return e.editHandler(t.item)}:null}})}}]),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)}),[],!1,null,null,null);t.default=G.exports;_()(G,{VContainer:k.a,VDataTable:N.a,VSpacer:K.a,VToolbar:U.a,VToolbarTitle:H.a})}}]);