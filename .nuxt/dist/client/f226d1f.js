(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{622:function(e,r,t){"use strict";var n={props:{breadcrumb:{type:Array,default:function(){return[]}}}},l=t(31),c=t(40),o=t.n(c),d=t(553),component=Object(l.a)(n,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-row",e._l(e.breadcrumb,(function(r,n){return t("span",{key:r.id+r.name},[0===n&&e.breadcrumb.length>1?t("nuxt-link",{attrs:{to:"/admin/gallery/"+r.id}},[e._v(e._s(r.name))]):0===n&&1===e.breadcrumb.length?t("span",[e._v(e._s(r.name))]):n>0&&e.breadcrumb.length-1>n?t("nuxt-link",{attrs:{to:"/admin/gallery/folders/"+r.id}},[e._v(e._s(r.name))]):t("span",[e._v(e._s(r.name))]),e._v(" "),n<e.breadcrumb.length-1?t("span",[e._v(" > ")]):e._e()],1)})),0)}),[],!1,null,null,null);r.a=component.exports;o()(component,{VRow:d.a})},748:function(e,r,t){"use strict";t.r(r);t(9),t(8),t(7),t(5),t(13);var n=t(0),l=t(10),c=(t(63),t(65));function o(object,e){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),r.push.apply(r,t)}return r}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(r){Object(n.a)(e,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(source,r))}))}return e}var m={components:{ItemBreadcrumb:t(622).a},layout:"Admin",middleware:"authenticated",fetchOnServer:!1,validate:function(e){return Object(l.a)(regeneratorRuntime.mark((function r(){var t;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t=e.store,!(null!==t.state.gallery.galleries)){r.next=4;break}return r.abrupt("return",!0);case 4:return r.next=6,t.dispatch("gallery/fetchAll");case 6:return r.abrupt("return",!0);case 7:case"end":return r.stop()}}),r)})))()},fetch:function(e){return Object(l.a)(regeneratorRuntime.mark((function r(){var t,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.store,n=e.params,r.next=3,t.dispatch("gallery/setSelectedItemFromGalleryId",n.id);case 3:return r.next=5,t.dispatch("gallery/getMediaObjectForGalleryItemId",t.state.gallery.selectedGalleryItem.id);case 5:case"end":return r.stop()}}),r)})))()},computed:d(d({},Object(c.c)("gallery",["getMediaObjectsForSelectedGalleryItem"])),Object(c.e)("gallery",["selectedGalleryItem"]))},f=t(31),y=t(40),v=t.n(y),O=t(551),_=t(557),w=t(159),h=t(553),component=Object(f.a)(m,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-row",[t("v-container",[e.selectedGalleryItem?t("ItemBreadcrumb",{attrs:{breadcrumb:e.selectedGalleryItem.breadcrumb}}):e._e(),e._v(" "),t("v-row",e._l(e.getMediaObjectsForSelectedGalleryItem,(function(r){return t("v-col",{key:r["@id"]},[e._v("\n        "+e._s(r["@id"])+"\n        "),t("v-img",{attrs:{src:r.contentUrl}})],1)})),1),e._v(" "),t("v-row",e._l(e.selectedGalleryItem.children,(function(r){return t("v-col",{key:r["@id"]},[t("nuxt-link",{attrs:{to:"folders/"+r.id}},[e._v("\n          "+e._s(r.name)+"\n        ")])],1)})),1),e._v(" "),t("v-row",[t("AdminGalleryFileUploadForm")],1)],1)],1)}),[],!1,null,null,null);r.default=component.exports;v()(component,{VCol:O.a,VContainer:_.a,VImg:w.a,VRow:h.a})}}]);