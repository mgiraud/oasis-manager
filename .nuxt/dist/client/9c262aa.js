(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{590:function(t,e,n){"use strict";n(35);var r=n(11),c=n(20),o=n(18),l=n(7),f=n(14),d=(n(5),n(21));function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var c=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(o.a)(this,n)}}var h=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},y=function(t){Object(c.a)(n,t);var e=v(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return n}(d.Vue);h([Object(d.Prop)({type:Object,required:!0})],y.prototype,"page",void 0);var O=y=h([d.Component],y),j=n(30),R=n(40),m=n.n(R),_=n(161),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-card-title",{staticClass:"primary--text text--darken-4"},[t._v("\n    "+t._s(t._f("capitalize")(t.page.title))+"\n  ")]),t._v(" "),n("v-card-text",{domProps:{innerHTML:t._s(t.page.content)}})],1)}),[],!1,null,null,null);e.a=component.exports;m()(component,{VCardText:_.b,VCardTitle:_.c})},700:function(t,e,n){"use strict";n.r(e);n(35);var r=n(11),c=n(19),o=n(20),l=n(18),f=n(7),d=n(14),v=(n(5),n(75),n(92)),h=n(135),y=n(590),O=n(30),j=n(40),R=n.n(j),m=n(544),component=Object(O.a)({},(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-main",[t._v("\n  404\n")])}),[],!1,null,null,null),_=component.exports;function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}R()(component,{VMain:m.a});var C=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},x=Object(h.namespace)("page"),V=function(t){Object(o.a)(n,t);var e=w(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"page",get:function(){if(null!==this.url)return this.find("/api/pages/"+decodeURIComponent(this.url))}},{key:"url",get:function(){return this.$route.params?this.$route.params.pathMatch:null}}]),n}(v.Vue);C([x.Getter("find")],V.prototype,"find",void 0);var P=V=C([Object(v.Component)({components:{Template:y.a,Error404:_}})],V),k=n(204),E=n(548),T=n(554),$=n(550),B=Object(O.a)(P,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"fill-height ma-md-10",attrs:{elevation:"5"}},[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",[t.page?n("Template",{attrs:{page:t.page}}):n("Error404")],1)],1)],1)],1)}),[],!1,null,null,null);e.default=B.exports;R()(B,{VCard:k.a,VCol:E.a,VContainer:T.a,VRow:$.a})}}]);