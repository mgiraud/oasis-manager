(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{526:function(e,t,n){"use strict";var r=n(5),o=Object(r.b)({props:{handleDelete:{type:Function,default:function(){}},visible:{type:Boolean,default:!0}},setup:function(e,t){var n=t.emit;return{setVisible:function(e){n("close")},show:Object(r.a)((function(){return e.visible}))}}}),l=n(32),c=n(41),f=n.n(c),d=n(126),v=n(209),m=n(168),h=n(572),y=n(520),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[n("v-card",[n("v-card-text",[e._v("Are you sure you want to delete this item?")]),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"error darken-1"},on:{click:e.handleDelete}},[e._v("\n        Delete\n      ")]),e._v(" "),n("v-btn",{attrs:{color:"secondary darken-1",text:""},on:{click:function(t){return t.stopPropagation(),e.setVisible(!1)}}},[e._v("\n        Cancel\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports;f()(component,{VBtn:d.a,VCard:v.a,VCardActions:m.a,VCardText:m.b,VDialog:h.a,VSpacer:y.a})},533:function(e,t,n){"use strict";var r=n(5),o=n(38);t.a=function(e){return Object(r.k)({canEdit:function(){return o.a.hasPermission(e.editRole)},canDelete:function(){return o.a.hasPermission(e.deleteRole)},canViewList:function(){return o.a.hasPermission(e.listRole)}})}},548:function(e,t,n){"use strict";n(11),n(9),n(8),n(12),n(13),n(37),n(26),n(30),n(61),n(50),n(45);var r=n(1),o=(n(583),n(5)),l=n(584),c=n.n(l),f=n(98);function d(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,o=e},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw o}}}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=function(e,t){var n=Object(o.t)(),r=Object(o.m)([]),l={sortBy:[],sortDesc:[],page:1,itemsPerPage:15,totalItems:0};t&&Object.assign(l,t);var v=l,m={};Object(o.u)((function(){return e.getState().deleted}),(function(e){e&&f.a.showMessage("".concat(e["@id"]," deleted."))})),Object(o.u)((function(){return e.getState().error}),(function(e){e&&f.a.showError(e)})),Object(o.u)((function(){return e.getState().totalItems}),(function(e){v.totalItems=e}));var y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.page,r=t.itemsPerPage,o=t.sortBy,l=t.sortDesc,f=t.totalItems,d=h({},m);r&&r>0&&(d=h(h({},d),{},{itemsPerPage:r,page:n})),e.prepareResetList(),c()(o)||c()(l)||(d["order[".concat(o[0],"]")]=l[0]?"desc":"asc"),Object.assign(v,{sortBy:o,sortDesc:l,itemsPerPage:r,totalItems:f}),e.fetchAll(d)},O=function(){y(v)},_=function(t){var r=e.getEditLocation(t);r&&n.push(r)};return Object(o.k)({selected:r,filterOptions:v,filters:m,resetFilter:function(){var e,t=d(Object.getOwnPropertyNames(m));try{for(t.s();!(e=t.n()).done;){var n=e.value;m[n]=null}}catch(e){t.e(e)}finally{t.f()}O()},addHandler:function(){var t=e.getAddLocation();t&&n.push(t)},editHandler:_,showHandler:function(e){_(e)},deleteHandler:function(t){e.del(t).then((function(){return y(v)}))},onUpdateOptions:y,onSendFilter:O,state:e.getState(),items:e.list})}},549:function(e,t,n){"use strict";var r=n(5),o=Object(r.b)({props:{handleReset:{type:Function,required:!0},handleFilter:{type:Function,required:!0}},setup:function(e){return{onFilter:function(){e.handleFilter()},onCancel:function(){e.handleReset()}}}}),l=n(32),c=n(41),f=n.n(c),d=n(126),v=n(168),m=n(203),h=n(664),y=n(40),O=n(520),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",{attrs:{transition:"slide-y-transition","close-on-content-click":!1,"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"white"}},"v-btn",o,!1),r),[e._v("\n      Filtres\n      "),n("v-icon",{attrs:{right:""}},[e._v("\n        ri-filter-line\n      ")])],1)]}}])},[e._v(" "),n("v-sheet",[n("v-card-title",[e._v("Filtres")]),e._v(" "),e._t("filter"),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:e.onFilter}},[e._v("\n        Filtrer\n      ")]),e._v(" "),n("v-btn",{staticClass:"ml-2",attrs:{color:"primary",text:""},on:{click:e.onCancel}},[e._v("\n        Remise à zéro\n      ")])],1)],2)],1)}),[],!1,null,null,null);t.a=component.exports;f()(component,{VBtn:d.a,VCardActions:v.a,VCardTitle:v.c,VIcon:m.a,VMenu:h.a,VSheet:y.a,VSpacer:O.a})},557:function(e,t,n){"use strict";var r=n(5),o=n(526),l=Object(r.b)({components:{ConfirmDelete:o.a},props:{handleShow:{type:Function,default:null},handleEdit:{type:Function,default:null},handleDelete:{type:Function,default:null}},setup:function(){return{confirmDelete:Object(r.m)(!1)}}}),c=n(32),f=n(41),d=n.n(f),v=n(126),m=n(203),h=n(519),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-row",{attrs:{justify:"center"}},[e.handleShow?n("v-btn",{attrs:{elevation:"0",tile:"",color:"info"},on:{click:e.handleShow}},[n("v-icon",[e._v("\n        ri-eye-line\n      ")])],1):e._e(),e._v(" "),e.handleEdit?n("v-btn",{attrs:{elevation:"0",tile:"",color:"primary"},on:{click:e.handleEdit}},[n("v-icon",[e._v("\n        ri-edit-line\n      ")])],1):e._e(),e._v(" "),e.handleDelete?n("v-btn",{attrs:{elevation:"0",tile:"",color:"accent"},on:{click:function(t){e.confirmDelete=!0}}},[n("v-icon",[e._v("\n        ri-delete-bin-line\n      ")])],1):e._e()],1),e._v(" "),e.handleDelete?n("ConfirmDelete",{attrs:{visible:e.confirmDelete,"handle-delete":e.handleDelete},on:{close:function(t){e.confirmDelete=!1}}}):e._e()],1)}),[],!1,null,null,null);t.a=component.exports;d()(component,{VBtn:v.a,VIcon:m.a,VRow:h.a})},561:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));n(49);var r=n(18),o=n(21),l=n(28),c=n(25),f=n(15);n(26),n(58),n(59);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var v=new(function(e){Object(l.a)(n,e);var t=d(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).listRole="USER_CAN_ACCESS_PAGE_CATEGORIES",e.editRole="USER_CAN_EDIT_PAGE_CATEGORIES",e.deleteRole="USER_CAN_DELETE_PAGE_CATEGORIES",e}return Object(o.a)(n,[{key:"getAddLocation",value:function(){return{name:"admin-page-category-new"}}},{key:"getEditLocation",value:function(e){return{name:"admin-page-category-id",params:{id:e.id.toString()}}}},{key:"getListLocation",value:function(){return{name:"admin-page-category"}}}]),n}(n(76).a))("page_categories")},663:function(e,t,n){"use strict";var r=n(5),o=Object(r.b)({props:{label:{type:String,default:function(){return""}},value:{type:String,default:function(){return null}}},setup:function(e,t){var n=t.emit,o=Object(r.m)(e.value),l=Object(r.m)(!1);return{date:o,showMenu:l,handleInput:function(){l.value=!1,n("input",o.value)}}}}),l=n(32),c=n(41),f=n.n(c),d=n(718),v=n(664),m=n(501),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-text-field",e._g({attrs:{label:e.label,"prepend-icon":"ri-calendar-2-line",readonly:""},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}},r))]}}]),model:{value:e.showMenu,callback:function(t){e.showMenu=t},expression:"showMenu"}},[e._v(" "),n("v-date-picker",{on:{input:e.handleInput},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1)}),[],!1,null,null,null);t.a=component.exports;f()(component,{VDatePicker:d.a,VMenu:v.a,VTextField:m.a})},729:function(e,t,n){"use strict";n.r(t);n(11),n(9),n(8),n(12),n(13);var r=n(1),o=n(10),l=(n(60),n(5)),c=n(557),f=(n(26),n(45),n(663)),d=n(561),v=Object(l.b)({components:{DateType:f.a},props:{values:{type:Object,required:!0}},setup:function(e){var t=Object(l.a)((function(){return e.values}));return Object(l.u)(e.values,(function(data){console.log(data)}),{deep:!0}),d.a.setContext(Object(l.q)()),Object(l.r)(Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.fetchSelectItems();case 2:case"end":return e.stop()}}),e)})))),{pageState:d.a.getState(),item:t}}}),m=n(32),h=n(41),y=n.n(h),O=n(649),_=n(517),j=n(756),w=n(523),x=n(519),P=n(501),component=Object(m.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[n("v-checkbox",{attrs:{label:"Visible dans le menu"},model:{value:e.item.showInMenu,callback:function(t){e.$set(e.item,"showInMenu",t)},expression:"item.showInMenu"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[n("v-checkbox",{attrs:{label:"Est publié"},model:{value:e.item.isPublished,callback:function(t){e.$set(e.item,"isPublished",t)},expression:"item.isPublished"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[n("DateType",{attrs:{label:"Créé avant le"},model:{value:e.item["createdAt[before]"],callback:function(t){e.$set(e.item,"createdAt[before]",t)},expression:"item['createdAt[before]']"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[n("DateType",{attrs:{label:"Créé après le"},model:{value:e.item["createdAt[after]"],callback:function(t){e.$set(e.item,"createdAt[after]",t)},expression:"item['createdAt[after]']"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[e.pageState.selectItems?n("v-combobox",{attrs:{items:e.pageState.selectItems,"no-data-text":"Aucune catégorie",label:"Dans la catégorie...","item-text":"name","item-value":"@id",clearable:""},model:{value:e.item.category,callback:function(t){e.$set(e.item,"category",t)},expression:"item.category"}}):e._e()],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[n("v-text-field",{attrs:{label:"Le titre contient...",type:"text"},model:{value:e.item.title,callback:function(t){e.$set(e.item,"title",t)},expression:"item.title"}})],1)],1)],1)}),[],!1,null,null,null),k=component.exports;y()(component,{VCheckbox:O.a,VCol:_.a,VCombobox:j.a,VContainer:w.a,VRow:x.a,VTextField:P.a});var S=n(549),E=n(533),A=n(27),C=n(548);function D(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function V(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?D(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):D(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var R=[{text:"Title",value:"title"},{text:"Url",value:"url"},{text:"Catégorie",value:"category"},{text:"est publié",value:"isPublished"},{text:"est visible dans le menu",value:"showInMenu"},{text:"Actions",value:"actions",sortable:!1}],F=Object(l.b)({components:{ActionCell:c.a,PageFilter:k,FormFilter:S.a},layout:"admin",middleware:"hasPermissions",setup:function(){return A.a.setContext(Object(l.q)()),Object(l.r)(Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.fetchAll();case 2:case"end":return e.stop()}}),e)})))),V(V(V({},Object(l.p)(Object(C.a)(A.a))),Object(l.p)(Object(E.a)(A.a))),{},{headers:R})},head:function(){return{title:"Administration - Liste des pages"}},meta:{permissions:["USER_CAN_ACCESS_PAGES"]}}),I=n(126),T=n(723),$=n(520),L=n(54),M=n(215),B=Object(m.a)(F,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.items,"items-per-page":e.filterOptions.itemsPerPage,loading:e.state.isLoading,"loading-text":"Loading...",options:e.filterOptions,"server-items-length":e.state.totalItems,"item-key":"@id","show-select":""},on:{"update:itemsPerPage":function(t){return e.$set(e.filterOptions,"itemsPerPage",t)},"update:items-per-page":function(t){return e.$set(e.filterOptions,"itemsPerPage",t)},"update:options":[function(t){e.filterOptions=t},e.onUpdateOptions]},scopedSlots:e._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-toolbar-title",[e._v("Page")]),e._v(" "),n("v-spacer"),e._v(" "),n("FormFilter",{attrs:{"handle-filter":e.onSendFilter,"handle-reset":e.resetFilter}},[n("PageFilter",{ref:"filterForm",attrs:{slot:"filter",values:e.filters},slot:"filter"})],1),e._v(" "),n("v-btn",{staticClass:"ml-2",attrs:{color:"primary",dark:""},on:{click:e.addHandler}},[e._v("\n          New Item\n        ")])],1)]},proxy:!0},{key:"item.category",fn:function(t){var r=t.item;return r&&r.category?[n("nuxt-link",{attrs:{to:{name:"admin-page-category-id",params:{id:r.category.id}}}},[e._v("\n        "+e._s(r.category.name)+"\n      ")])]:void 0}},{key:"item.actions",fn:function(t){return n("ActionCell",{attrs:{"handle-edit":e.canEdit?function(){return e.editHandler(t.item)}:null,"handle-delete":e.canDelete?function(){return e.deleteHandler(t.item)}:null}})}}],null,!0),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)}),[],!1,null,null,null);t.default=B.exports;y()(B,{VBtn:I.a,VContainer:w.a,VDataTable:T.a,VSpacer:$.a,VToolbar:L.a,VToolbarTitle:M.a})}}]);