(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{572:function(e,t,r){"use strict";r(8),r(7),r(5),r(13);var n=r(0),c=(r(24),r(9),r(55),r(272),r(51),r(27),r(45),r(34),r(63),r(212),r(2)),l=r(56),o=r(1);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m=["sm","md","lg","xl"],y=m.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),O=m.reduce((function(e,t){return e["offset"+Object(o.F)(t)]={type:[String,Number],default:null},e}),{}),v=m.reduce((function(e,t){return e["order"+Object(o.F)(t)]={type:[String,Number],default:null},e}),{}),j={col:Object.keys(y),offset:Object.keys(O),order:Object.keys(v)};function w(e,t,r){var n=e;if(null!=r&&!1!==r){if(t){var c=t.replace(e,"");n+="-".concat(c)}return"col"!==e||""!==r&&!0!==r?(n+="-".concat(r)).toLowerCase():n.toLowerCase()}}var h=new Map;t.a=c.default.extend({name:"v-col",functional:!0,props:d(d(d(d({cols:{type:[Boolean,String,Number],default:!1}},y),{},{offset:{type:[String,Number],default:null}},O),{},{order:{type:[String,Number],default:null}},v),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var r=t.props,data=t.data,c=t.children,o=(t.parent,"");for(var f in r)o+=String(r[f]);var d=h.get(o);return d||function(){var e,t;for(t in d=[],j)j[t].forEach((function(e){var n=r[e],c=w(t,e,n);c&&d.push(c)}));var c=d.some((function(e){return e.startsWith("col-")}));d.push((e={col:!c||!r.cols},Object(n.a)(e,"col-".concat(r.cols),r.cols),Object(n.a)(e,"offset-".concat(r.offset),r.offset),Object(n.a)(e,"order-".concat(r.order),r.order),Object(n.a)(e,"align-self-".concat(r.alignSelf),r.alignSelf),e)),h.set(o,d)}(),e(r.tag,Object(l.a)(data,{class:d}),c)}})},616:function(e,t,r){"use strict";var n={props:{breadcrumb:{type:Array,default:function(){return[]}}}},c=r(30),l=r(40),o=r.n(l),f=r(549),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",e._l(e.breadcrumb,(function(t,n){return r("span",{key:t.id+t.name},[0===n&&e.breadcrumb.length>1?r("nuxt-link",{attrs:{to:"/admin/gallery/"+t.id}},[e._v(e._s(t.name))]):0===n&&1===e.breadcrumb.length?r("span",[e._v(e._s(t.name))]):n>0&&e.breadcrumb.length-1>n?r("nuxt-link",{attrs:{to:"/admin/gallery/folders/"+t.id}},[e._v(e._s(t.name))]):r("span",[e._v(e._s(t.name))]),e._v(" "),n<e.breadcrumb.length-1?r("span",[e._v(" > ")]):e._e()],1)})),0)}),[],!1,null,null,null);t.a=component.exports;o()(component,{VRow:f.a})},707:function(e,t,r){"use strict";r.r(t);r(9),r(8),r(7),r(5),r(13);var n=r(0),c=r(10),l=(r(62),r(65));function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={components:{ItemBreadcrumb:r(616).a},layout:"Admin",middleware:"authenticated",fetchOnServer:!1,fetch:function(e){return Object(c.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.store,n=e.params,t.next=3,r.dispatch("gallery/setSelectedItemId",n.id);case 3:if(!r.state.gallery.selectedGalleryItem){t.next=6;break}return t.next=6,r.dispatch("gallery/getMediaObjectForGalleryItemId",r.state.gallery.selectedGalleryItem.id);case 6:case"end":return t.stop()}}),t)})))()},computed:f(f({},Object(l.c)("gallery",["getMediaObjectsForSelectedGalleryItem"])),Object(l.e)("gallery",["selectedGalleryItem"]))},m=r(30),y=r(40),O=r.n(y),v=r(572),j=r(553),w=r(158),h=r(549),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[e.selectedGalleryItem?r("ItemBreadcrumb",{attrs:{breadcrumb:e.selectedGalleryItem.breadcrumb}}):e._e(),e._v(" "),r("v-row",e._l(e.getMediaObjectsForSelectedGalleryItem,(function(t){return r("v-col",{key:t["@id"]},[e._v("\n      "+e._s(t["@id"])+"\n      "),r("v-img",{attrs:{src:t.contentUrl}})],1)})),1),e._v(" "),r("v-row",e._l(e.selectedGalleryItem.children,(function(t){return r("v-col",{key:t["@id"]},[r("nuxt-link",{attrs:{to:"/admin/gallery/folders/"+t.id}},[e._v("\n        "+e._s(t.name)+"\n      ")])],1)})),1)],1)}),[],!1,null,null,null);t.default=component.exports;O()(component,{VCol:v.a,VContainer:j.a,VImg:w.a,VRow:h.a})}}]);