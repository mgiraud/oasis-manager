(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{611:function(e,t,r){"use strict";var n={props:{breadcrumb:{type:Array,default:function(){return[]}}}},l=r(30),c=r(40),o=r.n(c),d=r(550),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",e._l(e.breadcrumb,(function(t,n){return r("span",{key:t.id+t.name},[0===n&&e.breadcrumb.length>1?r("nuxt-link",{attrs:{to:"/admin/gallery/"+t.id}},[e._v(e._s(t.name))]):0===n&&1===e.breadcrumb.length?r("span",[e._v(e._s(t.name))]):n>0&&e.breadcrumb.length-1>n?r("nuxt-link",{attrs:{to:"/admin/gallery/folders/"+t.id}},[e._v(e._s(t.name))]):r("span",[e._v(e._s(t.name))]),e._v(" "),n<e.breadcrumb.length-1?r("span",[e._v(" > ")]):e._e()],1)})),0)}),[],!1,null,null,null);t.a=component.exports;o()(component,{VRow:d.a})},707:function(e,t,r){"use strict";r.r(t);r(9),r(8),r(6),r(5),r(13);var n=r(0),l=r(10),c=(r(63),r(65));function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={components:{ItemBreadcrumb:r(611).a},layout:"Admin",middleware:"authenticated",fetchOnServer:!1,fetch:function(e){return Object(l.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.store,n=e.params,t.next=3,r.dispatch("gallery/setSelectedItemId",n.id);case 3:if(!r.state.gallery.selectedGalleryItem){t.next=6;break}return t.next=6,r.dispatch("gallery/getMediaObjectForGalleryItemId",r.state.gallery.selectedGalleryItem.id);case 6:case"end":return t.stop()}}),t)})))()},computed:d(d({},Object(c.c)("gallery",["getMediaObjectsForSelectedGalleryItem"])),Object(c.e)("gallery",["selectedGalleryItem"]))},y=r(30),f=r(40),v=r.n(f),O=r(548),_=r(554),j=r(159),w=r(550),component=Object(y.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[e.selectedGalleryItem?r("ItemBreadcrumb",{attrs:{breadcrumb:e.selectedGalleryItem.breadcrumb}}):e._e(),e._v(" "),r("v-row",e._l(e.getMediaObjectsForSelectedGalleryItem,(function(t){return r("v-col",{key:t["@id"]},[e._v("\n      "+e._s(t["@id"])+"\n      "),r("v-img",{attrs:{src:t.contentUrl}})],1)})),1),e._v(" "),r("v-row",e._l(e.selectedGalleryItem.children,(function(t){return r("v-col",{key:t["@id"]},[r("nuxt-link",{attrs:{to:"/admin/gallery/folders/"+t.id}},[e._v("\n        "+e._s(t.name)+"\n      ")])],1)})),1)],1)}),[],!1,null,null,null);t.default=component.exports;v()(component,{VCol:O.a,VContainer:_.a,VImg:j.a,VRow:w.a})}}]);