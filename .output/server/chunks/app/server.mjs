import { v as vue_cjs_prod, s as serverRenderer, r as require$$0 } from '../handlers/renderer.mjs';
import { $fetch } from 'ohmyfetch';
import { hasProtocol, isEqual } from 'ufo';
import { defineStore, storeToRefs, createPinia, setActivePinia } from 'pinia/dist/pinia.mjs';
import { defineRule, configure, useField, Field, Form } from 'vee-validate';
import { getContext, executeAsync } from 'unctx';
import { localize, setLocale } from '@vee-validate/i18n';
import AllRules from '@vee-validate/rules';
import { formatRelative, parseISO, format } from 'date-fns';
import fr$1 from 'date-fns/locale/fr/index.js';
import { VueNodeViewRenderer, NodeViewWrapper, Editor, EditorContent } from '@tiptap/vue-3';
import Starterkit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link$1 from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Image } from '@tiptap/extension-image';
import { Extension } from '@tiptap/core';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'h3';
import 'unenv/runtime/mock/proxy';
import 'stream';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'redirect-ssl';

function u$3(r,n,...a){if(r in n){let e=n[r];return typeof e=="function"?e(...a):e}let t=new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,u$3),t}

var m$1=(t=>(t[t.None=0]="None",t[t.RenderStrategy=1]="RenderStrategy",t[t.Static=2]="Static",t))(m$1||{}),h$2=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(h$2||{});function k({visible:n=!0,features:r=0,...e}){var t;if(n||r&2&&e.props.static)return a$2(e);if(r&1){let i=(t=e.props.unmount)==null||t?0:1;return u$3(i,{[0](){return null},[1](){return a$2({...e,props:{...e.props,hidden:!0,style:{display:"none"}}})}})}return a$2(e)}function a$2({props:n,attrs:r,slots:e,slot:t,name:i}){var u;let{as:p,...s}=R$2(n,["unmount","static"]),o=(u=e.default)==null?void 0:u.call(e,t);if(p==="template"){if(Object.keys(s).length>0||Object.keys(r).length>0){let[d,...c]=o!=null?o:[];if(!b$2(d)||c.length>0)throw new Error(['Passing props on "template"!',"",`The current component <${i} /> is rendering a "template".`,"However we need to passthrough the following props:",Object.keys(s).concat(Object.keys(r)).map(l=>`  - ${l}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',"Render a single element as the child so that we can forward the props onto that element."].map(l=>`  - ${l}`).join(`
`)].join(`
`));return vue_cjs_prod.cloneVNode(d,s)}return Array.isArray(o)&&o.length===1?o[0]:o}return vue_cjs_prod.h(p,s,o)}function O(n){let r=Object.assign({},n);for(let e in r)r[e]===void 0&&delete r[e];return r}function R$2(n,r=[]){let e=Object.assign({},n);for(let t of r)t in e&&delete e[t];return e}function b$2(n){return n==null?!1:typeof n.type=="string"||typeof n.type=="object"||typeof n.type=="function"}

let e$3=0;function n$1(){return ++e$3}function t$1(){return n$1()}

var o=(r=>(r.Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r))(o||{});

function f$2(r){throw new Error("Unexpected object: "+r)}var a$1=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(a$1||{});function x$1(r,n){let t=n.resolveItems();if(t.length<=0)return null;let l=n.resolveActiveIndex(),s=l!=null?l:-1,d=(()=>{switch(r.focus){case 0:return t.findIndex(e=>!n.resolveDisabled(e));case 1:{let e=t.slice().reverse().findIndex((i,c,u)=>s!==-1&&u.length-c-1>=s?!1:!n.resolveDisabled(i));return e===-1?e:t.length-1-e}case 2:return t.findIndex((e,i)=>i<=s?!1:!n.resolveDisabled(e));case 3:{let e=t.slice().reverse().findIndex(i=>!n.resolveDisabled(i));return e===-1?e:t.length-1-e}case 4:return t.findIndex(e=>n.resolveId(e)===r.id);case 5:return null;default:f$2(r);}})();return d===-1?l:d}

function t(l){return l==null||l.value==null?null:"$el"in l.value?l.value.$el:l.value}

let n=Symbol("Context");var l$3=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(l$3||{});function f$1(){return p$3()!==null}function p$3(){return vue_cjs_prod.inject(n,null)}function c$2(o){vue_cjs_prod.provide(n,o);}

function r$3(t,e){if(t)return t;let n=e!=null?e:"button";if(typeof n=="string"&&n.toLowerCase()==="button")return "button"}function b$1(t$1,e){let n=vue_cjs_prod.ref(r$3(t$1.value.type,t$1.value.as));return vue_cjs_prod.onMounted(()=>{n.value=r$3(t$1.value.type,t$1.value.as);}),vue_cjs_prod.watchEffect(()=>{var o;n.value||!t(e)||t(e)instanceof HTMLButtonElement&&!((o=t(e))!=null&&o.hasAttribute("type"))&&(n.value="button");}),n}

function e$2(n){return null;}

function p$2({container:e,accept:t,walk:d,enabled:o}){vue_cjs_prod.watchEffect(()=>{let r=e.value;if(!r||o!==void 0&&!o.value)return;let l=e$2();if(!l)return;let c=Object.assign(f=>t(f),{acceptNode:t}),n=l.createTreeWalker(r,NodeFilter.SHOW_ELEMENT,c,!1);for(;n.nextNode();)d(n.currentNode);});}

let c$1=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var p$1=(n=>(n[n.First=1]="First",n[n.Previous=2]="Previous",n[n.Next=4]="Next",n[n.Last=8]="Last",n[n.WrapAround=16]="WrapAround",n[n.NoScroll=32]="NoScroll",n))(p$1||{}),L$2=(o=>(o[o.Error=0]="Error",o[o.Overflow=1]="Overflow",o[o.Success=2]="Success",o[o.Underflow=3]="Underflow",o))(L$2||{}),N$1=(t=>(t[t.Previous=-1]="Previous",t[t.Next=1]="Next",t))(N$1||{});function T$1(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(c$1))}var b=(t=>(t[t.Strict=0]="Strict",t[t.Loose=1]="Loose",t))(b||{});function F$2(e){e==null||e.focus({preventScroll:!0});}let M=["textarea","input"].join(",");function h$1(e){var r,t;return (t=(r=e==null?void 0:e.matches)==null?void 0:r.call(e,M))!=null?t:!1}function v$1(e,r=t=>t){return e.slice().sort((t,l)=>{let o=r(t),a=r(l);if(o===null||a===null)return 0;let n=o.compareDocumentPosition(a);return n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function H$1(e,r){var d;let t=(d=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e==null?void 0:e.ownerDocument)!=null?d:document,l=Array.isArray(e)?v$1(e):T$1(e),o=t.activeElement,a=(()=>{if(r&5)return 1;if(r&10)return -1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),n=(()=>{if(r&1)return 0;if(r&2)return Math.max(0,l.indexOf(o))-1;if(r&4)return Math.max(0,l.indexOf(o))+1;if(r&8)return l.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),m=r&32?{preventScroll:!0}:{},f=0,i=l.length,u;do{if(f>=i||f+i<=0)return 0;let s=n+f;if(r&16)s=(s+i)%i;else {if(s<0)return 3;if(s>=i)return 1}u=l[s],u==null||u.focus(m),f+=a;}while(u!==t.activeElement);return u.hasAttribute("tabindex")||u.setAttribute("tabindex","0"),r&6&&h$1(u)&&u.select(),2}

var p=(n=>(n[n.None=1]="None",n[n.IgnoreScrollbars=2]="IgnoreScrollbars",n))(p||{});function g$4(i,l,n=1){}

let l$2=vue_cjs_prod.defineComponent({name:"VisuallyHidden",props:{as:{type:[Object,String],default:"div"}},setup(e,{slots:r,attrs:i}){return ()=>k({props:{...e,...{style:{position:"absolute",width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",display:"none"}}},slot:{},attrs:i,slots:r,name:"VisuallyHidden"})}});

function e$1(n={},r=null,t=[]){for(let[i,o]of Object.entries(n))f(t,s$2(r,i),o);return t}function s$2(n,r){return n?n+"["+r+"]":r}function f(n,r,t){if(Array.isArray(t))for(let[i,o]of t.entries())f(n,s$2(r,i.toString()),o);else t instanceof Date?n.push([r,t.toISOString()]):typeof t=="boolean"?n.push([r,t?"1":"0"]):typeof t=="string"?n.push([r,t]):typeof t=="number"?n.push([r,`${t}`]):t==null?n.push([r,""]):e$1(t,r,n);}

function r$2(n,e,d,o){}

var g$3=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(g$3||{});function W$1(r,f=vue_cjs_prod.ref(30),i=vue_cjs_prod.ref({})){var H,R;let a=vue_cjs_prod.ref(null),o$1=vue_cjs_prod.ref(null),v={value:!1},e=vue_cjs_prod.computed(()=>Boolean(f.value&16)),M=vue_cjs_prod.computed(()=>Boolean(f.value&2)),s=vue_cjs_prod.computed(()=>e$2());return vue_cjs_prod.onMounted(()=>{vue_cjs_prod.watch(e,(t,l)=>{var u;t!==l&&(!e.value||(v.value=!0,a.value||(a.value=(u=s.value)==null?void 0:u.activeElement)));},{immediate:!0}),vue_cjs_prod.watch(e,(t,l,u)=>{t!==l&&(!e.value||u(()=>{v.value!==!1&&(v.value=!1,F$2(a.value),a.value=null);}));},{immediate:!0}),vue_cjs_prod.watch([r,i,i.value.initialFocus,M],(t$1,l)=>{var p,F;if(t$1.every((b,h)=>(l==null?void 0:l[h])===b)||!M.value)return;let u=r.value;if(!u)return;let n=t(i.value.initialFocus),m=(p=s.value)==null?void 0:p.activeElement;if(n){if(n===m){o$1.value=m;return}}else if(u.contains(m)){o$1.value=m;return}n?F$2(n):H$1(u,p$1.First)===L$2.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o$1.value=(F=s.value)==null?void 0:F.activeElement;},{immediate:!0});}),r$2((H=s.value)==null?void 0:H.defaultView),r$2((R=s.value)==null?void 0:R.defaultView),a}

let l$1="body > *",i$1=new Set,r$1=new Map;function u$2(t){t.setAttribute("aria-hidden","true"),t.inert=!0;}function s$1(t){let n=r$1.get(t);!n||(n["aria-hidden"]===null?t.removeAttribute("aria-hidden"):t.setAttribute("aria-hidden",n["aria-hidden"]),t.inert=n.inert);}function g$2(t,n=vue_cjs_prod.ref(!0)){vue_cjs_prod.watchEffect(d=>{if(!n.value||!t.value)return;let a=t.value,o=e$2();if(!!o){i$1.add(a);for(let e of r$1.keys())e.contains(a)&&(s$1(e),r$1.delete(e));o.querySelectorAll(l$1).forEach(e=>{if(e instanceof HTMLElement){for(let f of i$1)if(e.contains(f))return;i$1.size===1&&(r$1.set(e,{"aria-hidden":e.getAttribute("aria-hidden"),inert:e.inert}),u$2(e));}}),d(()=>{if(i$1.delete(a),i$1.size>0)o.querySelectorAll(l$1).forEach(e=>{if(e instanceof HTMLElement&&!r$1.has(e)){for(let f of i$1)if(e.contains(f))return;r$1.set(e,{"aria-hidden":e.getAttribute("aria-hidden"),inert:e.inert}),u$2(e);}});else for(let e of r$1.keys())s$1(e),r$1.delete(e);});}});}

let e=Symbol("ForcePortalRootContext");function u$1(){return vue_cjs_prod.inject(e,!1)}let P$3=vue_cjs_prod.defineComponent({name:"ForcePortalRoot",props:{as:{type:[Object,String],default:"template"},force:{type:Boolean,default:!1}},setup(o,{slots:t,attrs:r}){return vue_cjs_prod.provide(e,o.force),()=>{let{force:f,...n}=o;return k({props:n,slot:{},slots:t,attrs:r,name:"ForcePortalRoot"})}}});

function v(r){let t=e$2();if(!t)throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${r}`);let l=t.getElementById("headlessui-portal-root");if(l)return l;let e=t.createElement("div");return e.setAttribute("id","headlessui-portal-root"),t.body.appendChild(e)}let R$1=vue_cjs_prod.defineComponent({name:"Portal",props:{as:{type:[Object,String],default:"div"}},setup(r,{slots:t,attrs:l}){let e=vue_cjs_prod.ref(null),p=vue_cjs_prod.computed(()=>e$2()),n=u$1(),u=vue_cjs_prod.inject(g$1,null),o=vue_cjs_prod.ref(n===!0||u==null?v(e.value):u.resolveTarget());return vue_cjs_prod.watchEffect(()=>{n||u!=null&&(o.value=u.resolveTarget());}),vue_cjs_prod.onUnmounted(()=>{var i,m;let a=(i=p.value)==null?void 0:i.getElementById("headlessui-portal-root");!a||o.value===a&&o.value.children.length<=0&&((m=o.value.parentElement)==null||m.removeChild(o.value));}),()=>{if(o.value===null)return null;let a={ref:e};return vue_cjs_prod.h(vue_cjs_prod.Teleport,{to:o.value},k({props:{...r,...a},slot:{},attrs:l,slots:t,name:"Portal"}))}}}),g$1=Symbol("PortalGroupContext"),L$1=vue_cjs_prod.defineComponent({name:"PortalGroup",props:{as:{type:[Object,String],default:"template"},target:{type:Object,default:null}},setup(r,{attrs:t,slots:l}){let e=vue_cjs_prod.reactive({resolveTarget(){return r.target}});return vue_cjs_prod.provide(g$1,e),()=>{let{target:p,...n}=r;return k({props:n,slot:{},attrs:t,slots:l,name:"PortalGroup"})}}});

let i=Symbol("StackContext");var c=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(c||{});function a(){return vue_cjs_prod.inject(i,()=>{})}function s({type:n,element:o,onUpdate:e}){let m=a();function t(...r){e==null||e(...r),m(...r);}vue_cjs_prod.onMounted(()=>{t(0,n,o),vue_cjs_prod.onUnmounted(()=>{t(1,n,o);});}),vue_cjs_prod.provide(i,t);}

let u=Symbol("DescriptionContext");function h(){let n=vue_cjs_prod.inject(u,null);if(n===null)throw new Error("Missing parent");return n}function P$2({slot:n=vue_cjs_prod.ref({}),name:o="Description",props:s={}}={}){let e=vue_cjs_prod.ref([]);function t(r){return e.value.push(r),()=>{let i=e.value.indexOf(r);i!==-1&&e.value.splice(i,1);}}return vue_cjs_prod.provide(u,{register:t,slot:n,name:o,props:s}),vue_cjs_prod.computed(()=>e.value.length>0?e.value.join(" "):void 0)}let S=vue_cjs_prod.defineComponent({name:"Description",props:{as:{type:[Object,String],default:"p"}},setup(n,{attrs:o,slots:s}){let e=h(),t=`headlessui-description-${t$1()}`;return vue_cjs_prod.onMounted(()=>vue_cjs_prod.onUnmounted(e.register(t))),()=>{let{name:r="Description",slot:i=vue_cjs_prod.ref({}),props:c={}}=e,l=n,d={...Object.entries(c).reduce((f,[a,g])=>Object.assign(f,{[a]:vue_cjs_prod.unref(g)}),{}),id:t};return k({props:{...l,...d},slot:i.value,attrs:o,slots:s,name:r})}}});

var fe$2=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(fe$2||{});let x=Symbol("DialogContext");function P$1(o){let r=vue_cjs_prod.inject(x,null);if(r===null){let e=new Error(`<${o} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(e,P$1),e}return r}let T="DC8F892D-2EBD-447C-A4C8-A03058436FF4",Me=vue_cjs_prod.defineComponent({name:"Dialog",inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},open:{type:[Boolean,String],default:T},initialFocus:{type:Object,default:null}},emits:{close:o=>!0},setup(o$1,{emit:r,attrs:e,slots:i,expose:s$1}){var M;let p$1=vue_cjs_prod.ref(0),a=p$3(),m=vue_cjs_prod.computed(()=>o$1.open===T&&a!==null?u$3(a.value,{[l$3.Open]:!0,[l$3.Closed]:!1}):o$1.open),S=vue_cjs_prod.ref(new Set),d=vue_cjs_prod.ref(null),k$1=vue_cjs_prod.computed(()=>e$2());if(s$1({el:d,$el:d}),!(o$1.open!==T||a!==null))throw new Error("You forgot to provide an `open` prop to the `Dialog`.");if(typeof m.value!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${m.value===T?void 0:o$1.open}`);let c$1=vue_cjs_prod.computed(()=>m.value?0:1),I=vue_cjs_prod.computed(()=>c$1.value===0),R=vue_cjs_prod.computed(()=>p$1.value>1),_=vue_cjs_prod.inject(x,null)!==null,N=vue_cjs_prod.computed(()=>R.value?"parent":"leaf"),U=W$1(d,vue_cjs_prod.computed(()=>I.value?u$3(N.value,{parent:g$3.RestoreFocus,leaf:g$3.All&~g$3.FocusLock}):g$3.None),vue_cjs_prod.computed(()=>({initialFocus:vue_cjs_prod.ref(o$1.initialFocus),containers:S})));g$2(d,vue_cjs_prod.computed(()=>R.value?I.value:!1)),s({type:"Dialog",element:d,onUpdate:(t,l,n)=>{if(l==="Dialog")return u$3(t,{[c.Add](){S.value.add(n),p$1.value+=1;},[c.Remove](){S.value.delete(n),p$1.value-=1;}})}});let V=P$2({name:"DialogDescription",slot:vue_cjs_prod.computed(()=>({open:m.value}))}),Y=`headlessui-dialog-${t$1()}`,C=vue_cjs_prod.ref(null),v={titleId:C,panelRef:vue_cjs_prod.ref(null),dialogState:c$1,setTitleId(t){C.value!==t&&(C.value=t);},close(){r("close",!1);}};vue_cjs_prod.provide(x,v),g$4(()=>{var l,n,g;return [...Array.from((n=(l=k$1.value)==null?void 0:l.querySelectorAll("body > *"))!=null?n:[]).filter(u=>!(!(u instanceof HTMLElement)||u.contains(U.value)||v.panelRef.value&&u.contains(v.panelRef.value))),(g=v.panelRef.value)!=null?g:d.value]},(t,l)=>{c$1.value===0&&(R.value||(v.close(),vue_cjs_prod.nextTick(()=>l==null?void 0:l.focus())));},p.IgnoreScrollbars),r$2((M=k$1.value)==null?void 0:M.defaultView),vue_cjs_prod.watchEffect(t=>{var B;if(c$1.value!==0||_)return;let l=k$1.value;if(!l)return;let n=l==null?void 0:l.documentElement,g=(B=l.defaultView)!=null?B:window,u=n.style.overflow,G=n.style.paddingRight,z=g.innerWidth-n.clientWidth;n.style.overflow="hidden",n.style.paddingRight=`${z}px`,t(()=>{n.style.overflow=u,n.style.paddingRight=G;});}),vue_cjs_prod.watchEffect(t$1=>{if(c$1.value!==0)return;let l=t(d);if(!l)return;let n=new IntersectionObserver(g=>{for(let u of g)u.boundingClientRect.x===0&&u.boundingClientRect.y===0&&u.boundingClientRect.width===0&&u.boundingClientRect.height===0&&v.close();});n.observe(l),t$1(()=>n.disconnect());});function q(t){t.stopPropagation();}return ()=>{let t={...e,ref:d,id:Y,role:"dialog","aria-modal":c$1.value===0?!0:void 0,"aria-labelledby":C.value,"aria-describedby":V.value,onClick:q},{open:l,initialFocus:n,...g}=o$1,u={open:c$1.value===0};return vue_cjs_prod.h(P$3,{force:!0},()=>vue_cjs_prod.h(R$1,()=>vue_cjs_prod.h(L$1,{target:d.value},()=>vue_cjs_prod.h(P$3,{force:!1},()=>k({props:{...g,...t},slot:u,attrs:e,slots:i,visible:c$1.value===0,features:m$1.RenderStrategy|m$1.Static,name:"Dialog"})))))}}});vue_cjs_prod.defineComponent({name:"DialogOverlay",props:{as:{type:[Object,String],default:"div"}},setup(o,{attrs:r,slots:e}){let i=P$1("DialogOverlay"),s=`headlessui-dialog-overlay-${t$1()}`;function p(a){a.target===a.currentTarget&&(a.preventDefault(),a.stopPropagation(),i.close());}return ()=>k({props:{...o,...{id:s,"aria-hidden":!0,onClick:p}},slot:{open:i.dialogState.value===0},attrs:r,slots:e,name:"DialogOverlay"})}});vue_cjs_prod.defineComponent({name:"DialogBackdrop",props:{as:{type:[Object,String],default:"div"}},inheritAttrs:!1,setup(o,{attrs:r,slots:e,expose:i}){let s=P$1("DialogBackdrop"),p=`headlessui-dialog-backdrop-${t$1()}`,a=vue_cjs_prod.ref(null);return i({el:a,$el:a}),vue_cjs_prod.onMounted(()=>{if(s.panelRef.value===null)throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.")}),()=>{let m=o,S={id:p,ref:a,"aria-hidden":!0};return vue_cjs_prod.h(P$3,{force:!0},()=>vue_cjs_prod.h(R$1,()=>k({props:{...r,...m,...S},slot:{open:s.dialogState.value===0},attrs:r,slots:e,name:"DialogBackdrop"})))}}});let je=vue_cjs_prod.defineComponent({name:"DialogPanel",props:{as:{type:[Object,String],default:"div"}},setup(o,{attrs:r,slots:e}){let i=P$1("DialogPanel"),s=`headlessui-dialog-panel-${t$1()}`;return ()=>{let p={id:s,ref:i.panelRef};return k({props:{...o,...p},slot:{open:i.dialogState.value===0},attrs:r,slots:e,name:"DialogPanel"})}}}),Ae=vue_cjs_prod.defineComponent({name:"DialogTitle",props:{as:{type:[Object,String],default:"h2"}},setup(o,{attrs:r,slots:e}){let i=P$1("DialogTitle"),s=`headlessui-dialog-title-${t$1()}`;return vue_cjs_prod.onMounted(()=>{i.setTitleId(s),vue_cjs_prod.onUnmounted(()=>i.setTitleId(null));}),()=>k({props:{...o,...{id:s}},slot:{open:i.dialogState.value===0},attrs:r,slots:e,name:"DialogTitle"})}}),Le=S;

var ae$2=(n=>(n[n.Open=0]="Open",n[n.Closed=1]="Closed",n))(ae$2||{}),le$1=(n=>(n[n.Single=0]="Single",n[n.Multi=1]="Multi",n))(le$1||{}),ne=(n=>(n[n.Pointer=0]="Pointer",n[n.Other=1]="Other",n))(ne||{});function ue$2(o){requestAnimationFrame(()=>requestAnimationFrame(o));}let N=Symbol("ListboxContext");function P(o){let x=vue_cjs_prod.inject(N,null);if(x===null){let n=new Error(`<${o} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,P),n}return x}let De=vue_cjs_prod.defineComponent({name:"Listbox",emits:{"update:modelValue":o=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},horizontal:{type:[Boolean],default:!1},modelValue:{type:[Object,String,Number,Boolean]},name:{type:String,optional:!0},multiple:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(o,{slots:x,attrs:n,emit:S}){let e=vue_cjs_prod.ref(1),p=vue_cjs_prod.ref(null),d=vue_cjs_prod.ref(null),m=vue_cjs_prod.ref(null),r=vue_cjs_prod.ref([]),O$1=vue_cjs_prod.ref(""),t$1=vue_cjs_prod.ref(null),a=vue_cjs_prod.ref(1);function D(i=l=>l){let l=t$1.value!==null?r.value[t$1.value]:null,u=v$1(i(r.value.slice()),R=>t(R.dataRef.domRef)),f=l?u.indexOf(l):null;return f===-1&&(f=null),{options:u,activeOptionIndex:f}}let L=vue_cjs_prod.computed(()=>o.modelValue),T=vue_cjs_prod.computed(()=>o.multiple?1:0),s={listboxState:e,value:L,mode:T,orientation:vue_cjs_prod.computed(()=>o.horizontal?"horizontal":"vertical"),labelRef:p,buttonRef:d,optionsRef:m,disabled:vue_cjs_prod.computed(()=>o.disabled),options:r,searchQuery:O$1,activeOptionIndex:t$1,activationTrigger:a,closeListbox(){o.disabled||e.value!==1&&(e.value=1,t$1.value=null);},openListbox(){o.disabled||e.value!==0&&(e.value=0);},goToOption(i,l,u){if(o.disabled||e.value===1)return;let f=D(),R=x$1(i===a$1.Specific?{focus:a$1.Specific,id:l}:{focus:i},{resolveItems:()=>f.options,resolveActiveIndex:()=>f.activeOptionIndex,resolveId:h=>h.id,resolveDisabled:h=>h.dataRef.disabled});O$1.value="",t$1.value=R,a.value=u!=null?u:1,r.value=f.options;},search(i){if(o.disabled||e.value===1)return;let u=O$1.value!==""?0:1;O$1.value+=i.toLowerCase();let R=(t$1.value!==null?r.value.slice(t$1.value+u).concat(r.value.slice(0,t$1.value+u)):r.value).find(V=>V.dataRef.textValue.startsWith(O$1.value)&&!V.dataRef.disabled),h=R?r.value.indexOf(R):-1;h===-1||h===t$1.value||(t$1.value=h,a.value=1);},clearSearch(){o.disabled||e.value!==1&&O$1.value!==""&&(O$1.value="");},registerOption(i,l){let u=D(f=>[...f,{id:i,dataRef:l}]);r.value=u.options,t$1.value=u.activeOptionIndex;},unregisterOption(i){let l=D(u=>{let f=u.findIndex(R=>R.id===i);return f!==-1&&u.splice(f,1),u});r.value=l.options,t$1.value=l.activeOptionIndex,a.value=1;},select(i){o.disabled||S("update:modelValue",u$3(T.value,{[0]:()=>i,[1]:()=>{let l=vue_cjs_prod.toRaw(s.value.value).slice(),u=vue_cjs_prod.toRaw(i),f=l.indexOf(u);return f===-1?l.push(u):l.splice(f,1),l}}));}};return vue_cjs_prod.provide(N,s),c$2(vue_cjs_prod.computed(()=>u$3(e.value,{[0]:l$3.Open,[1]:l$3.Closed}))),()=>{let{name:i,modelValue:l,disabled:u,...f}=o,R={open:e.value===0,disabled:u};return vue_cjs_prod.h(vue_cjs_prod.Fragment,[...i!=null&&l!=null?e$1({[i]:l}).map(([h,V])=>vue_cjs_prod.h(l$2,O({key:h,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:h,value:V}))):[],k({props:{...n,...R$2(f,["onUpdate:modelValue","horizontal","multiple"])},slot:R,slots:x,attrs:n,name:"Listbox"})])}}});vue_cjs_prod.defineComponent({name:"ListboxLabel",props:{as:{type:[Object,String],default:"label"}},setup(o,{attrs:x,slots:n}){let S=P("ListboxLabel"),e=`headlessui-listbox-label-${t$1()}`;function p(){var d;(d=t(S.buttonRef))==null||d.focus({preventScroll:!0});}return ()=>{let d={open:S.listboxState.value===0,disabled:S.disabled.value},m={id:e,ref:S.labelRef,onClick:p};return k({props:{...o,...m},slot:d,attrs:x,slots:n,name:"ListboxLabel"})}}});let we$1=vue_cjs_prod.defineComponent({name:"ListboxButton",props:{as:{type:[Object,String],default:"button"}},setup(o$1,{attrs:x,slots:n,expose:S}){let e=P("ListboxButton"),p=`headlessui-listbox-button-${t$1()}`;S({el:e.buttonRef,$el:e.buttonRef});function d(t$1){switch(t$1.key){case o.Space:case o.Enter:case o.ArrowDown:t$1.preventDefault(),e.openListbox(),vue_cjs_prod.nextTick(()=>{var a;(a=t(e.optionsRef))==null||a.focus({preventScroll:!0}),e.value.value||e.goToOption(a$1.First);});break;case o.ArrowUp:t$1.preventDefault(),e.openListbox(),vue_cjs_prod.nextTick(()=>{var a;(a=t(e.optionsRef))==null||a.focus({preventScroll:!0}),e.value.value||e.goToOption(a$1.Last);});break}}function m(t){switch(t.key){case o.Space:t.preventDefault();break}}function r(t$1){e.disabled.value||(e.listboxState.value===0?(e.closeListbox(),vue_cjs_prod.nextTick(()=>{var a;return (a=t(e.buttonRef))==null?void 0:a.focus({preventScroll:!0})})):(t$1.preventDefault(),e.openListbox(),ue$2(()=>{var a;return (a=t(e.optionsRef))==null?void 0:a.focus({preventScroll:!0})})));}let O=b$1(vue_cjs_prod.computed(()=>({as:o$1.as,type:x.type})),e.buttonRef);return ()=>{var D,L;let t$1={open:e.listboxState.value===0,disabled:e.disabled.value},a={ref:e.buttonRef,id:p,type:O.value,"aria-haspopup":!0,"aria-controls":(D=t(e.optionsRef))==null?void 0:D.id,"aria-expanded":e.disabled.value?void 0:e.listboxState.value===0,"aria-labelledby":e.labelRef.value?[(L=t(e.labelRef))==null?void 0:L.id,p].join(" "):void 0,disabled:e.disabled.value===!0?!0:void 0,onKeydown:d,onKeyup:m,onClick:r};return k({props:{...o$1,...a},slot:t$1,attrs:x,slots:n,name:"ListboxButton"})}}}),ke=vue_cjs_prod.defineComponent({name:"ListboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0}},setup(o$1,{attrs:x,slots:n,expose:S}){let e=P("ListboxOptions"),p=`headlessui-listbox-options-${t$1()}`,d=vue_cjs_prod.ref(null);S({el:e.optionsRef,$el:e.optionsRef});function m(t$1){switch(d.value&&clearTimeout(d.value),t$1.key){case o.Space:if(e.searchQuery.value!=="")return t$1.preventDefault(),t$1.stopPropagation(),e.search(t$1.key);case o.Enter:if(t$1.preventDefault(),t$1.stopPropagation(),e.activeOptionIndex.value!==null){let a=e.options.value[e.activeOptionIndex.value];e.select(a.dataRef.value);}e.mode.value===0&&(e.closeListbox(),vue_cjs_prod.nextTick(()=>{var a;return (a=t(e.buttonRef))==null?void 0:a.focus({preventScroll:!0})}));break;case u$3(e.orientation.value,{vertical:o.ArrowDown,horizontal:o.ArrowRight}):return t$1.preventDefault(),t$1.stopPropagation(),e.goToOption(a$1.Next);case u$3(e.orientation.value,{vertical:o.ArrowUp,horizontal:o.ArrowLeft}):return t$1.preventDefault(),t$1.stopPropagation(),e.goToOption(a$1.Previous);case o.Home:case o.PageUp:return t$1.preventDefault(),t$1.stopPropagation(),e.goToOption(a$1.First);case o.End:case o.PageDown:return t$1.preventDefault(),t$1.stopPropagation(),e.goToOption(a$1.Last);case o.Escape:t$1.preventDefault(),t$1.stopPropagation(),e.closeListbox(),vue_cjs_prod.nextTick(()=>{var a;return (a=t(e.buttonRef))==null?void 0:a.focus({preventScroll:!0})});break;case o.Tab:t$1.preventDefault(),t$1.stopPropagation();break;default:t$1.key.length===1&&(e.search(t$1.key),d.value=setTimeout(()=>e.clearSearch(),350));break}}let r=p$3(),O=vue_cjs_prod.computed(()=>r!==null?r.value===l$3.Open:e.listboxState.value===0);return ()=>{var L,T,s,i;let t$1={open:e.listboxState.value===0},a={"aria-activedescendant":e.activeOptionIndex.value===null||(L=e.options.value[e.activeOptionIndex.value])==null?void 0:L.id,"aria-multiselectable":e.mode.value===1?!0:void 0,"aria-labelledby":(i=(T=t(e.labelRef))==null?void 0:T.id)!=null?i:(s=t(e.buttonRef))==null?void 0:s.id,"aria-orientation":e.orientation.value,id:p,onKeydown:m,role:"listbox",tabIndex:0,ref:e.optionsRef};return k({props:{...o$1,...a},slot:t$1,attrs:x,slots:n,features:m$1.RenderStrategy|m$1.Static,visible:O.value,name:"ListboxOptions"})}}}),Ce=vue_cjs_prod.defineComponent({name:"ListboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1}},setup(o,{slots:x,attrs:n,expose:S}){let e=P("ListboxOption"),p=`headlessui-listbox-option-${t$1()}`,d=vue_cjs_prod.ref(null);S({el:d,$el:d});let m=vue_cjs_prod.computed(()=>e.activeOptionIndex.value!==null?e.options.value[e.activeOptionIndex.value].id===p:!1),r=vue_cjs_prod.computed(()=>u$3(e.mode.value,{[0]:()=>vue_cjs_prod.toRaw(e.value.value)===vue_cjs_prod.toRaw(o.value),[1]:()=>vue_cjs_prod.toRaw(e.value.value).includes(vue_cjs_prod.toRaw(o.value))})),O=vue_cjs_prod.computed(()=>u$3(e.mode.value,{[1]:()=>{var i;let s=vue_cjs_prod.toRaw(e.value.value);return ((i=e.options.value.find(l=>s.includes(l.dataRef.value)))==null?void 0:i.id)===p},[0]:()=>r.value})),t$2=vue_cjs_prod.computed(()=>({disabled:o.disabled,value:o.value,textValue:"",domRef:d}));vue_cjs_prod.onMounted(()=>{var i,l;let s=(l=(i=t(d))==null?void 0:i.textContent)==null?void 0:l.toLowerCase().trim();s!==void 0&&(t$2.value.textValue=s);}),vue_cjs_prod.onMounted(()=>e.registerOption(p,t$2)),vue_cjs_prod.onUnmounted(()=>e.unregisterOption(p)),vue_cjs_prod.onMounted(()=>{vue_cjs_prod.watch([e.listboxState,r],()=>{e.listboxState.value===0&&(!r.value||u$3(e.mode.value,{[1]:()=>{O.value&&e.goToOption(a$1.Specific,p);},[0]:()=>{e.goToOption(a$1.Specific,p);}}));},{immediate:!0});}),vue_cjs_prod.watchEffect(()=>{e.listboxState.value===0&&(!m.value||e.activationTrigger.value!==0&&vue_cjs_prod.nextTick(()=>{var s,i;return (i=(s=t(d))==null?void 0:s.scrollIntoView)==null?void 0:i.call(s,{block:"nearest"})}));});function a(s){if(o.disabled)return s.preventDefault();e.select(o.value),e.mode.value===0&&(e.closeListbox(),vue_cjs_prod.nextTick(()=>{var i;return (i=t(e.buttonRef))==null?void 0:i.focus({preventScroll:!0})}));}function D(){if(o.disabled)return e.goToOption(a$1.Nothing);e.goToOption(a$1.Specific,p);}function L(){o.disabled||m.value||e.goToOption(a$1.Specific,p,0);}function T(){o.disabled||!m.value||e.goToOption(a$1.Nothing);}return ()=>{let{disabled:s}=o,i={active:m.value,selected:r.value,disabled:s},l={id:p,ref:d,role:"option",tabIndex:s===!0?void 0:-1,"aria-disabled":s===!0?!0:void 0,"aria-selected":r.value===!0?r.value:void 0,disabled:void 0,onClick:a,onFocus:D,onPointermove:L,onMousemove:L,onPointerleave:T,onMouseleave:T};return k({props:{...R$2(o,["value","disabled"]),...l},slot:i,attrs:n,slots:x,name:"ListboxOption"})}}});

var W=(i=>(i[i.Open=0]="Open",i[i.Closed=1]="Closed",i))(W||{}),J=(i=>(i[i.Pointer=0]="Pointer",i[i.Other=1]="Other",i))(J||{});function z(o){requestAnimationFrame(()=>requestAnimationFrame(o));}let E=Symbol("MenuContext");function D(o){let S=vue_cjs_prod.inject(E,null);if(S===null){let i=new Error(`<${o} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(i,D),i}return S}let fe$1=vue_cjs_prod.defineComponent({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(o,{slots:S,attrs:i}){let v=vue_cjs_prod.ref(1),e=vue_cjs_prod.ref(null),p=vue_cjs_prod.ref(null),r=vue_cjs_prod.ref([]),f=vue_cjs_prod.ref(""),d=vue_cjs_prod.ref(null),I=vue_cjs_prod.ref(1);function l(u=n=>n){let n=d.value!==null?r.value[d.value]:null,a=v$1(u(r.value.slice()),R=>t(R.dataRef.domRef)),s=n?a.indexOf(n):null;return s===-1&&(s=null),{items:a,activeItemIndex:s}}let t$1={menuState:v,buttonRef:e,itemsRef:p,items:r,searchQuery:f,activeItemIndex:d,activationTrigger:I,closeMenu:()=>{v.value=1,d.value=null;},openMenu:()=>v.value=0,goToItem(u,n,a){let s=l(),R=x$1(u===a$1.Specific?{focus:a$1.Specific,id:n}:{focus:u},{resolveItems:()=>s.items,resolveActiveIndex:()=>s.activeItemIndex,resolveId:M=>M.id,resolveDisabled:M=>M.dataRef.disabled});f.value="",d.value=R,I.value=a!=null?a:1,r.value=s.items;},search(u){let a=f.value!==""?0:1;f.value+=u.toLowerCase();let R=(d.value!==null?r.value.slice(d.value+a).concat(r.value.slice(0,d.value+a)):r.value).find(k=>k.dataRef.textValue.startsWith(f.value)&&!k.dataRef.disabled),M=R?r.value.indexOf(R):-1;M===-1||M===d.value||(d.value=M,I.value=1);},clearSearch(){f.value="";},registerItem(u,n){let a=l(s=>[...s,{id:u,dataRef:n}]);r.value=a.items,d.value=a.activeItemIndex,I.value=1;},unregisterItem(u){let n=l(a=>{let s=a.findIndex(R=>R.id===u);return s!==-1&&a.splice(s,1),a});r.value=n.items,d.value=n.activeItemIndex,I.value=1;}};return vue_cjs_prod.provide(E,t$1),c$2(vue_cjs_prod.computed(()=>u$3(v.value,{[0]:l$3.Open,[1]:l$3.Closed}))),()=>{let u={open:v.value===0};return k({props:o,slot:u,slots:S,attrs:i,name:"Menu"})}}}),me=vue_cjs_prod.defineComponent({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"}},setup(o$1,{attrs:S,slots:i,expose:v}){let e=D("MenuButton"),p=`headlessui-menu-button-${t$1()}`;v({el:e.buttonRef,$el:e.buttonRef});function r(l){switch(l.key){case o.Space:case o.Enter:case o.ArrowDown:l.preventDefault(),l.stopPropagation(),e.openMenu(),vue_cjs_prod.nextTick(()=>{var t$1;(t$1=t(e.itemsRef))==null||t$1.focus({preventScroll:!0}),e.goToItem(a$1.First);});break;case o.ArrowUp:l.preventDefault(),l.stopPropagation(),e.openMenu(),vue_cjs_prod.nextTick(()=>{var t$1;(t$1=t(e.itemsRef))==null||t$1.focus({preventScroll:!0}),e.goToItem(a$1.Last);});break}}function f(l){switch(l.key){case o.Space:l.preventDefault();break}}function d(l){o$1.disabled||(e.menuState.value===0?(e.closeMenu(),vue_cjs_prod.nextTick(()=>{var t$1;return (t$1=t(e.buttonRef))==null?void 0:t$1.focus({preventScroll:!0})})):(l.preventDefault(),l.stopPropagation(),e.openMenu(),z(()=>{var t$1;return (t$1=t(e.itemsRef))==null?void 0:t$1.focus({preventScroll:!0})})));}let I=b$1(vue_cjs_prod.computed(()=>({as:o$1.as,type:S.type})),e.buttonRef);return ()=>{var u;let l={open:e.menuState.value===0},t$1={ref:e.buttonRef,id:p,type:I.value,"aria-haspopup":!0,"aria-controls":(u=t(e.itemsRef))==null?void 0:u.id,"aria-expanded":o$1.disabled?void 0:e.menuState.value===0,onKeydown:r,onKeyup:f,onClick:d};return k({props:{...o$1,...t$1},slot:l,attrs:S,slots:i,name:"MenuButton"})}}}),pe$1=vue_cjs_prod.defineComponent({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0}},setup(o$1,{attrs:S,slots:i,expose:v}){let e=D("MenuItems"),p=`headlessui-menu-items-${t$1()}`,r=vue_cjs_prod.ref(null);v({el:e.itemsRef,$el:e.itemsRef}),p$2({container:vue_cjs_prod.computed(()=>t(e.itemsRef)),enabled:vue_cjs_prod.computed(()=>e.menuState.value===0),accept(t){return t.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:t.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(t){t.setAttribute("role","none");}});function f(t$1){var u;switch(r.value&&clearTimeout(r.value),t$1.key){case o.Space:if(e.searchQuery.value!=="")return t$1.preventDefault(),t$1.stopPropagation(),e.search(t$1.key);case o.Enter:if(t$1.preventDefault(),t$1.stopPropagation(),e.activeItemIndex.value!==null){let a=e.items.value[e.activeItemIndex.value];(u=t(a.dataRef.domRef))==null||u.click();}e.closeMenu(),vue_cjs_prod.nextTick(()=>{var n;return (n=t(e.buttonRef))==null?void 0:n.focus({preventScroll:!0})});break;case o.ArrowDown:return t$1.preventDefault(),t$1.stopPropagation(),e.goToItem(a$1.Next);case o.ArrowUp:return t$1.preventDefault(),t$1.stopPropagation(),e.goToItem(a$1.Previous);case o.Home:case o.PageUp:return t$1.preventDefault(),t$1.stopPropagation(),e.goToItem(a$1.First);case o.End:case o.PageDown:return t$1.preventDefault(),t$1.stopPropagation(),e.goToItem(a$1.Last);case o.Escape:t$1.preventDefault(),t$1.stopPropagation(),e.closeMenu(),vue_cjs_prod.nextTick(()=>{var n;return (n=t(e.buttonRef))==null?void 0:n.focus({preventScroll:!0})});break;case o.Tab:t$1.preventDefault(),t$1.stopPropagation();break;default:t$1.key.length===1&&(e.search(t$1.key),r.value=setTimeout(()=>e.clearSearch(),350));break}}function d(t){switch(t.key){case o.Space:t.preventDefault();break}}let I=p$3(),l=vue_cjs_prod.computed(()=>I!==null?I.value===l$3.Open:e.menuState.value===0);return ()=>{var a,s;let t$1={open:e.menuState.value===0},u={"aria-activedescendant":e.activeItemIndex.value===null||(a=e.items.value[e.activeItemIndex.value])==null?void 0:a.id,"aria-labelledby":(s=t(e.buttonRef))==null?void 0:s.id,id:p,onKeydown:f,onKeyup:d,role:"menu",tabIndex:0,ref:e.itemsRef};return k({props:{...o$1,...u},slot:t$1,attrs:S,slots:i,features:m$1.RenderStrategy|m$1.Static,visible:l.value,name:"MenuItems"})}}}),ve=vue_cjs_prod.defineComponent({name:"MenuItem",props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1}},setup(o,{slots:S,attrs:i,expose:v}){let e=D("MenuItem"),p=`headlessui-menu-item-${t$1()}`,r=vue_cjs_prod.ref(null);v({el:r,$el:r});let f=vue_cjs_prod.computed(()=>e.activeItemIndex.value!==null?e.items.value[e.activeItemIndex.value].id===p:!1),d=vue_cjs_prod.computed(()=>({disabled:o.disabled,textValue:"",domRef:r}));vue_cjs_prod.onMounted(()=>{var a,s;let n=(s=(a=t(r))==null?void 0:a.textContent)==null?void 0:s.toLowerCase().trim();n!==void 0&&(d.value.textValue=n);}),vue_cjs_prod.onMounted(()=>e.registerItem(p,d)),vue_cjs_prod.onUnmounted(()=>e.unregisterItem(p)),vue_cjs_prod.watchEffect(()=>{e.menuState.value===0&&(!f.value||e.activationTrigger.value!==0&&vue_cjs_prod.nextTick(()=>{var n,a;return (a=(n=t(r))==null?void 0:n.scrollIntoView)==null?void 0:a.call(n,{block:"nearest"})}));});function I(n){if(o.disabled)return n.preventDefault();e.closeMenu(),vue_cjs_prod.nextTick(()=>{var a;return (a=t(e.buttonRef))==null?void 0:a.focus({preventScroll:!0})});}function l(){if(o.disabled)return e.goToItem(a$1.Nothing);e.goToItem(a$1.Specific,p);}function t$2(){o.disabled||f.value||e.goToItem(a$1.Specific,p,0);}function u(){o.disabled||!f.value||e.goToItem(a$1.Nothing);}return ()=>{let{disabled:n}=o,a={active:f.value,disabled:n};return k({props:{...o,...{id:p,ref:r,role:"menuitem",tabIndex:n===!0?void 0:-1,"aria-disabled":n===!0?!0:void 0,onClick:I,onFocus:l,onPointermove:t$2,onMousemove:t$2,onPointerleave:u,onMouseleave:u}},slot:a,attrs:i,slots:S,name:"MenuItem"})}}});

var ae$1=(f=>(f[f.Open=0]="Open",f[f.Closed=1]="Closed",f))(ae$1||{});let Q=Symbol("PopoverContext");function H(c){let m=vue_cjs_prod.inject(Q,null);if(m===null){let f=new Error(`<${c} /> is missing a parent <${pe.name} /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(f,H),f}return m}let X=Symbol("PopoverGroupContext");function Y(){return vue_cjs_prod.inject(X,null)}let Z=Symbol("PopoverPanelContext");function ue$1(){return vue_cjs_prod.inject(Z,null)}let pe=vue_cjs_prod.defineComponent({name:"Popover",props:{as:{type:[Object,String],default:"div"}},setup(c,{slots:m,attrs:f,expose:y}){var g;let e=`headlessui-popover-button-${t$1()}`,t$2=`headlessui-popover-panel-${t$1()}`,p=vue_cjs_prod.ref(null);y({el:p,$el:p});let a=vue_cjs_prod.ref(1),P=vue_cjs_prod.ref(null),d=vue_cjs_prod.ref(null),S=vue_cjs_prod.computed(()=>e$2()),r={popoverState:a,buttonId:e,panelId:t$2,panel:d,button:P,togglePopover(){a.value=u$3(a.value,{[0]:1,[1]:0});},closePopover(){a.value!==1&&(a.value=1);},close(s){r.closePopover();let o=(()=>s?s instanceof HTMLElement?s:s.value instanceof HTMLElement?t(s):t(r.button):t(r.button))();o==null||o.focus();}};vue_cjs_prod.provide(Q,r),c$2(vue_cjs_prod.computed(()=>u$3(a.value,{[0]:l$3.Open,[1]:l$3.Closed})));let l={buttonId:e,panelId:t$2,close(){r.closePopover();}},u=Y(),i=u==null?void 0:u.registerPopover;return vue_cjs_prod.watchEffect(()=>i==null?void 0:i(l)),r$2((g=S.value)==null?void 0:g.defaultView),()=>{let s={open:a.value===0,close:r.close};return k({props:{...c,ref:p},slot:s,slots:m,attrs:f,name:"Popover"})}}}),xe=vue_cjs_prod.defineComponent({name:"PopoverButton",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1}},setup(c,{attrs:m,slots:f,expose:y}){var s;let e=H("PopoverButton"),t$1=vue_cjs_prod.computed(()=>e$2(e.button));y({el:e.button,$el:e.button});let p=Y(),a=p==null?void 0:p.closeOthers,P=ue$1(),d=P===null?!1:P===e.panelId;vue_cjs_prod.ref(null);let r=vue_cjs_prod.ref();r$2((s=t$1.value)==null?void 0:s.defaultView);let l=vue_cjs_prod.ref(null);d||vue_cjs_prod.watchEffect(()=>{e.button.value=l.value;});let u=b$1(vue_cjs_prod.computed(()=>({as:c.as,type:m.type})),l);function i(o$1){var v,b,x,h,R,F,A,N;if(d){if(e.popoverState.value===1)return;switch(o$1.key){case o.Space:case o.Enter:o$1.preventDefault(),(b=(v=o$1.target).click)==null||b.call(v),e.closePopover(),(x=t(e.button))==null||x.focus();break}}else switch(o$1.key){case o.Space:case o.Enter:o$1.preventDefault(),o$1.stopPropagation(),e.popoverState.value===1&&(a==null||a(e.buttonId)),e.togglePopover();break;case o.Escape:if(e.popoverState.value!==0)return a==null?void 0:a(e.buttonId);if(!t(e.button)||((h=t$1.value)==null?void 0:h.activeElement)&&!((R=t(e.button))!=null&&R.contains(t$1.value.activeElement)))return;o$1.preventDefault(),o$1.stopPropagation(),e.closePopover();break;case o.Tab:if(e.popoverState.value!==0||!e.panel||!e.button)return;if(o$1.shiftKey){if(!r.value||(F=t(e.button))!=null&&F.contains(r.value)||(A=t(e.panel))!=null&&A.contains(r.value))return;let q=T$1((N=t$1.value)==null?void 0:N.body),_=q.indexOf(r.value);if(q.indexOf(t(e.button))>_)return;o$1.preventDefault(),o$1.stopPropagation(),H$1(t(e.panel),p$1.Last);}else o$1.preventDefault(),o$1.stopPropagation(),H$1(t(e.panel),p$1.First);break}}function O(o$1){var v,b,x;if(!d&&(o$1.key===o.Space&&o$1.preventDefault(),e.popoverState.value===0&&!!e.panel&&!!e.button))switch(o$1.key){case o.Tab:if(!r.value||(v=t(e.button))!=null&&v.contains(r.value)||(b=t(e.panel))!=null&&b.contains(r.value))return;let h=T$1((x=t$1.value)==null?void 0:x.body),R=h.indexOf(r.value);if(h.indexOf(t(e.button))>R)return;o$1.preventDefault(),o$1.stopPropagation(),H$1(t(e.panel),p$1.Last);break}}function g(o){var v,b;c.disabled||(d?(e.closePopover(),(v=t(e.button))==null||v.focus()):(o.preventDefault(),o.stopPropagation(),e.popoverState.value===1&&(a==null||a(e.buttonId)),(b=t(e.button))==null||b.focus(),e.togglePopover()));}return ()=>{let o={open:e.popoverState.value===0},v=d?{ref:l,type:u.value,onKeydown:i,onClick:g}:{ref:l,id:e.buttonId,type:u.value,"aria-expanded":c.disabled?void 0:e.popoverState.value===0,"aria-controls":t(e.panel)?e.panelId:void 0,disabled:c.disabled?!0:void 0,onKeydown:i,onKeyup:O,onClick:g};return k({props:{...c,...v},slot:o,attrs:m,slots:f,name:"PopoverButton"})}}});vue_cjs_prod.defineComponent({name:"PopoverOverlay",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0}},setup(c,{attrs:m,slots:f}){let y=H("PopoverOverlay"),e=`headlessui-popover-overlay-${t$1()}`,t=p$3(),p=vue_cjs_prod.computed(()=>t!==null?t.value===l$3.Open:y.popoverState.value===0);function a(){y.closePopover();}return ()=>{let P={open:y.popoverState.value===0};return k({props:{...c,...{id:e,"aria-hidden":!0,onClick:a}},slot:P,attrs:m,slots:f,features:m$1.RenderStrategy|m$1.Static,visible:p.value,name:"PopoverOverlay"})}}});let we=vue_cjs_prod.defineComponent({name:"PopoverPanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},focus:{type:Boolean,default:!1}},setup(c,{attrs:m,slots:f,expose:y}){var S,r;let{focus:e}=c,t$1=H("PopoverPanel"),p=vue_cjs_prod.computed(()=>e$2(t$1.panel));y({el:t$1.panel,$el:t$1.panel}),vue_cjs_prod.provide(Z,t$1.panelId),vue_cjs_prod.onUnmounted(()=>{t$1.panel.value=null;}),vue_cjs_prod.watchEffect(()=>{var u,i;if(!e||t$1.popoverState.value!==0||!t$1.panel)return;let l=(u=p.value)==null?void 0:u.activeElement;(i=t(t$1.panel))!=null&&i.contains(l)||H$1(t(t$1.panel),p$1.First);}),r$2((S=p.value)==null?void 0:S.defaultView),r$2((r=p.value)==null?void 0:r.defaultView);let a=p$3(),P=vue_cjs_prod.computed(()=>a!==null?a.value===l$3.Open:t$1.popoverState.value===0);function d(l){var u,i;switch(l.key){case o.Escape:if(t$1.popoverState.value!==0||!t(t$1.panel)||p.value&&!((u=t(t$1.panel))!=null&&u.contains(p.value.activeElement)))return;l.preventDefault(),l.stopPropagation(),t$1.closePopover(),(i=t(t$1.button))==null||i.focus();break}}return ()=>{let l={open:t$1.popoverState.value===0,close:t$1.close},u={ref:t$1.panel,id:t$1.panelId,onKeydown:d};return k({props:{...c,...u},slot:l,attrs:m,slots:f,features:m$1.RenderStrategy|m$1.Static,visible:P.value,name:"PopoverPanel"})}}});vue_cjs_prod.defineComponent({name:"PopoverGroup",props:{as:{type:[Object,String],default:"div"}},setup(c,{attrs:m,slots:f,expose:y}){let e=vue_cjs_prod.ref(null),t$1=vue_cjs_prod.ref([]),p=vue_cjs_prod.computed(()=>e$2());y({el:e,$el:e});function a(r){let l=t$1.value.indexOf(r);l!==-1&&t$1.value.splice(l,1);}function P(r){return t$1.value.push(r),()=>{a(r);}}function d(){var u;let r=p.value;if(!r)return !1;let l=r.activeElement;return (u=t(e))!=null&&u.contains(l)?!0:t$1.value.some(i=>{var O,g;return ((O=r.getElementById(i.buttonId))==null?void 0:O.contains(l))||((g=r.getElementById(i.panelId))==null?void 0:g.contains(l))})}function S(r){for(let l of t$1.value)l.buttonId!==r&&l.close();}return vue_cjs_prod.provide(X,{registerPopover:P,unregisterPopover:a,isFocusWithinPopoverGroup:d,closeOthers:S}),()=>k({props:{...c,...{ref:e}},slot:{},attrs:m,slots:f,name:"PopoverGroup"})}});

function l(r){let e={called:!1};return (...t)=>{if(!e.called)return e.called=!0,r(...t)}}

function r(){let i=[],o=[],t={enqueue(e){o.push(e);},requestAnimationFrame(...e){let a=requestAnimationFrame(...e);t.add(()=>cancelAnimationFrame(a));},nextFrame(...e){t.requestAnimationFrame(()=>{t.requestAnimationFrame(...e);});},setTimeout(...e){let a=setTimeout(...e);t.add(()=>clearTimeout(a));},add(e){i.push(e);},dispose(){for(let e of i.splice(0))e();},async workQueue(){for(let e of o.splice(0))await e();}};return t}

function m(e,...t){e&&t.length>0&&e.classList.add(...t);}function d$1(e,...t){e&&t.length>0&&e.classList.remove(...t);}var g=(i=>(i.Finished="finished",i.Cancelled="cancelled",i))(g||{});function F$1(e,t){let i=r();if(!e)return i.dispose;let{transitionDuration:n,transitionDelay:a}=getComputedStyle(e),[l,s]=[n,a].map(o=>{let[u=0]=o.split(",").filter(Boolean).map(r=>r.includes("ms")?parseFloat(r):parseFloat(r)*1e3).sort((r,c)=>c-r);return u});return l!==0?i.setTimeout(()=>t("finished"),l+s):t("finished"),i.add(()=>t("cancelled")),i.dispose}function L(e,t,i,n,a,l$1){let s=r(),o=l$1!==void 0?l(l$1):()=>{};return d$1(e,...a),m(e,...t,...i),s.nextFrame(()=>{d$1(e,...i),m(e,...n),s.add(F$1(e,u=>(d$1(e,...n,...t),m(e,...a),o(u))));}),s.add(()=>d$1(e,...t,...i,...n,...a)),s.add(()=>o("cancelled")),s.dispose}

function d(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let F=Symbol("TransitionContext");var ae=(a=>(a.Visible="visible",a.Hidden="hidden",a))(ae||{});function le(){return vue_cjs_prod.inject(F,null)!==null}function ie(){let e=vue_cjs_prod.inject(F,null);if(e===null)throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");return e}function se(){let e=vue_cjs_prod.inject(R,null);if(e===null)throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");return e}let R=Symbol("NestingContext");function w(e){return "children"in e?w(e.children):e.value.filter(({state:t})=>t==="visible").length>0}function K(e){let t=vue_cjs_prod.ref([]),a=vue_cjs_prod.ref(!1);vue_cjs_prod.onMounted(()=>a.value=!0),vue_cjs_prod.onUnmounted(()=>a.value=!1);function s(r,n=h$2.Hidden){let l=t.value.findIndex(({id:i})=>i===r);l!==-1&&(u$3(n,{[h$2.Unmount](){t.value.splice(l,1);},[h$2.Hidden](){t.value[l].state="hidden";}}),!w(t)&&a.value&&(e==null||e()));}function v(r){let n=t.value.find(({id:l})=>l===r);return n?n.state!=="visible"&&(n.state="visible"):t.value.push({id:r,state:"visible"}),()=>s(r,h$2.Unmount)}return {children:t,register:v,unregister:s}}let _=m$1.RenderStrategy,oe=vue_cjs_prod.defineComponent({props:{as:{type:[Object,String],default:"div"},show:{type:[Boolean],default:null},unmount:{type:[Boolean],default:!0},appear:{type:[Boolean],default:!1},enter:{type:[String],default:""},enterFrom:{type:[String],default:""},enterTo:{type:[String],default:""},entered:{type:[String],default:""},leave:{type:[String],default:""},leaveFrom:{type:[String],default:""},leaveTo:{type:[String],default:""}},emits:{beforeEnter:()=>!0,afterEnter:()=>!0,beforeLeave:()=>!0,afterLeave:()=>!0},setup(e,{emit:t$2,attrs:a,slots:s,expose:v}){if(!le()&&f$1())return ()=>vue_cjs_prod.h(fe,{...e,onBeforeEnter:()=>t$2("beforeEnter"),onAfterEnter:()=>t$2("afterEnter"),onBeforeLeave:()=>t$2("beforeLeave"),onAfterLeave:()=>t$2("afterLeave")},s);let r=vue_cjs_prod.ref(null),n=vue_cjs_prod.ref("visible"),l=vue_cjs_prod.computed(()=>e.unmount?h$2.Unmount:h$2.Hidden);v({el:r,$el:r});let{show:i,appear:x}=ie(),{register:h,unregister:p}=se(),B={value:!0},m=t$1(),c={value:!1},N=K(()=>{c.value||(n.value="hidden",p(m),t$2("afterLeave"));});vue_cjs_prod.onMounted(()=>{let o=h(m);vue_cjs_prod.onUnmounted(o);}),vue_cjs_prod.watchEffect(()=>{if(l.value===h$2.Hidden&&!!m){if(i&&n.value!=="visible"){n.value="visible";return}u$3(n.value,{["hidden"]:()=>p(m),["visible"]:()=>h(m)});}});let k$1=d(e.enter),$=d(e.enterFrom),q=d(e.enterTo),O=d(e.entered),z=d(e.leave),G=d(e.leaveFrom),J=d(e.leaveTo);vue_cjs_prod.onMounted(()=>{vue_cjs_prod.watchEffect(()=>{if(n.value==="visible"){let o=t(r);if(o instanceof Comment&&o.data==="")throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")}});});function Q(o){let S=B.value&&!x.value,u=t(r);!u||!(u instanceof HTMLElement)||S||(c.value=!0,i.value&&t$2("beforeEnter"),i.value||t$2("beforeLeave"),o(i.value?L(u,k$1,$,q,O,C=>{c.value=!1,C===g.Finished&&t$2("afterEnter");}):L(u,z,G,J,O,C=>{c.value=!1,C===g.Finished&&(w(N)||(n.value="hidden",p(m),t$2("afterLeave")));})));}return vue_cjs_prod.onMounted(()=>{vue_cjs_prod.watch([i],(o,S,u)=>{Q(u),B.value=!1;},{immediate:!0});}),vue_cjs_prod.provide(R,N),c$2(vue_cjs_prod.computed(()=>u$3(n.value,{["visible"]:l$3.Open,["hidden"]:l$3.Closed}))),()=>{let{appear:o,show:S,enter:u,enterFrom:C,enterTo:de,entered:ve,leave:pe,leaveFrom:me,leaveTo:Te,...W}=e;return k({props:{...W,...{ref:r}},slot:{},slots:s,attrs:a,features:_,visible:n.value==="visible",name:"TransitionChild"})}}}),ue=oe,fe=vue_cjs_prod.defineComponent({inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},show:{type:[Boolean],default:null},unmount:{type:[Boolean],default:!0},appear:{type:[Boolean],default:!1},enter:{type:[String],default:""},enterFrom:{type:[String],default:""},enterTo:{type:[String],default:""},entered:{type:[String],default:""},leave:{type:[String],default:""},leaveFrom:{type:[String],default:""},leaveTo:{type:[String],default:""}},emits:{beforeEnter:()=>!0,afterEnter:()=>!0,beforeLeave:()=>!0,afterLeave:()=>!0},setup(e,{emit:t,attrs:a,slots:s}){let v=p$3(),r=vue_cjs_prod.computed(()=>e.show===null&&v!==null?u$3(v.value,{[l$3.Open]:!0,[l$3.Closed]:!1}):e.show);vue_cjs_prod.watchEffect(()=>{if(![!0,!1].includes(r.value))throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.')});let n=vue_cjs_prod.ref(r.value?"visible":"hidden"),l=K(()=>{n.value="hidden";}),i=vue_cjs_prod.ref(!0),x={show:r,appear:vue_cjs_prod.computed(()=>e.appear||!i.value)};return vue_cjs_prod.onMounted(()=>{vue_cjs_prod.watchEffect(()=>{i.value=!1,r.value?n.value="visible":w(l)||(n.value="hidden");});}),vue_cjs_prod.provide(R,l),vue_cjs_prod.provide(F,x),()=>{let h=R$2(e,["show","appear","unmount"]),p={unmount:e.unmount};return k({props:{...p,as:"template"},slot:{},slots:{...s,default:()=>[vue_cjs_prod.h(ue,{onBeforeEnter:()=>t("beforeEnter"),onAfterEnter:()=>t("afterEnter"),onBeforeLeave:()=>t("beforeLeave"),onAfterLeave:()=>t("afterLeave"),...a,...p,...h},s.default)]},attrs:{},features:_,visible:n.value==="visible",name:"Transition"})}}});

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
function serialCaller(hooks, args) {
  return hooks.reduce((promise, hookFn) => promise.then(() => hookFn.apply(void 0, args)), Promise.resolve(null));
}
function parallelCaller(hooks, args) {
  return Promise.all(hooks.map((hook) => hook.apply(void 0, args)));
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, fn) {
    if (!name || typeof fn !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let deprecatedHookObj;
    while (this._deprecatedHooks[name]) {
      const deprecatedHook = this._deprecatedHooks[name];
      if (typeof deprecatedHook === "string") {
        deprecatedHookObj = { to: deprecatedHook };
      } else {
        deprecatedHookObj = deprecatedHook;
      }
      name = deprecatedHookObj.to;
    }
    if (deprecatedHookObj) {
      if (!deprecatedHookObj.message) {
        console.warn(`${originalName} hook has been deprecated` + (deprecatedHookObj.to ? `, please use ${deprecatedHookObj.to}` : ""));
      } else {
        console.warn(deprecatedHookObj.message);
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(fn);
    return () => {
      if (fn) {
        this.removeHook(name, fn);
        fn = null;
      }
    };
  }
  hookOnce(name, fn) {
    let _unreg;
    let _fn = (...args) => {
      _unreg();
      _unreg = null;
      _fn = null;
      return fn(...args);
    };
    _unreg = this.hook(name, _fn);
    return _unreg;
  }
  removeHook(name, fn) {
    if (this._hooks[name]) {
      const idx = this._hooks[name].indexOf(fn);
      if (idx !== -1) {
        this._hooks[name].splice(idx, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = deprecated;
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      removeFns.splice(0, removeFns.length).forEach((unreg) => unreg());
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  callHook(name, ...args) {
    return serialCaller(this._hooks[name] || [], args);
  }
  callHookParallel(name, ...args) {
    return parallelCaller(this._hooks[name] || [], args);
  }
  callHookWith(caller, name, ...args) {
    return caller(this._hooks[name] || [], args);
  }
}
function createHooks() {
  return new Hookable();
}
function createMock(name, overrides = {}) {
  const fn = function() {
  };
  fn.prototype.name = name;
  const props = {};
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`);
    },
    enumerate(_target) {
      return [];
    }
  });
}
const mockContext = createMock("mock");
function mock(warning) {
  console.warn(warning);
  return mockContext;
}
const unsupported = /* @__PURE__ */ new Set([
  "store",
  "spa",
  "fetchCounters"
]);
const todo = /* @__PURE__ */ new Set([
  "isHMR",
  "base",
  "payload",
  "from",
  "next",
  "error",
  "redirect",
  "redirected",
  "enablePreview",
  "$preview",
  "beforeNuxtRender",
  "beforeSerialize"
]);
const routerKeys = ["route", "params", "query"];
const staticFlags = {
  isClient: false,
  isServer: true,
  isDev: false,
  isStatic: void 0,
  target: "server",
  modern: false
};
const legacyPlugin = (nuxtApp) => {
  nuxtApp._legacyContext = new Proxy(nuxtApp, {
    get(nuxt, p) {
      if (unsupported.has(p)) {
        return mock(`Accessing ${p} is not supported in Nuxt 3.`);
      }
      if (todo.has(p)) {
        return mock(`Accessing ${p} is not yet supported in Nuxt 3.`);
      }
      if (routerKeys.includes(p)) {
        if (!("$router" in nuxtApp)) {
          return mock("vue-router is not being used in this project.");
        }
        switch (p) {
          case "route":
            return nuxt.$router.currentRoute.value;
          case "params":
          case "query":
            return nuxt.$router.currentRoute.value[p];
        }
      }
      if (p === "$config" || p === "env") {
        return useRuntimeConfig();
      }
      if (p in staticFlags) {
        return staticFlags[p];
      }
      if (p === "ssrContext") {
        return nuxt._legacyContext;
      }
      if (nuxt.ssrContext && p in nuxt.ssrContext) {
        return nuxt.ssrContext[p];
      }
      if (p === "nuxt") {
        return nuxt.payload;
      }
      if (p === "nuxtState") {
        return nuxt.payload.data;
      }
      if (p in nuxtApp.vueApp) {
        return nuxtApp.vueApp[p];
      }
      if (p in nuxtApp) {
        return nuxtApp[p];
      }
      return mock(`Accessing ${p} is not supported in Nuxt3.`);
    }
  });
};
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = __spreadValues({
    provide: void 0,
    globalName: "nuxt",
    payload: vue_cjs_prod.reactive(__spreadValues({
      data: {},
      state: {},
      _errors: {}
    }, { serverRendered: true })),
    isHydrating: false,
    _asyncDataPromises: {}
  }, options);
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  if (nuxtApp.ssrContext) {
    nuxtApp.ssrContext.nuxt = nuxtApp;
  }
  {
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.payload = nuxtApp.payload;
  }
  {
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  let needsLegacyContext = false;
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return () => {
      };
    }
    if (isLegacyPlugin(plugin)) {
      needsLegacyContext = true;
      return (nuxtApp) => plugin(nuxtApp._legacyContext, nuxtApp.provide);
    }
    return plugin;
  });
  if (needsLegacyContext) {
    plugins2.unshift(legacyPlugin);
  }
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function isLegacyPlugin(plugin) {
  return !plugin[NuxtPluginIndicator];
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const vm = vue_cjs_prod.getCurrentInstance();
  if (!vm) {
    const nuxtAppInstance = nuxtAppCtx.use();
    if (!nuxtAppInstance) {
      throw new Error("nuxt instance unavailable");
    }
    return nuxtAppInstance;
  }
  return vm.appContext.app.$nuxt;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var vueRouter_cjs_prod = {};
/*!
  * vue-router v4.0.15
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var vue = require$$0;
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
  const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
  const viewDepthKey = /* @__PURE__ */ PolySymbol("rvd");
  const routerKey = /* @__PURE__ */ PolySymbol("r");
  const routeLocationKey = /* @__PURE__ */ PolySymbol("rl");
  const routerViewLocationKey = /* @__PURE__ */ PolySymbol("rvl");
  function isESModule(obj) {
    return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
  }
  const assign = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop = () => {
  };
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery2, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const searchPos = location2.indexOf("?");
    const hashPos = location2.indexOf("#", searchPos > -1 ? searchPos : 0);
    if (searchPos > -1) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
      query = parseQuery2(searchString);
    }
    if (hashPos > -1) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + (searchString && "?") + searchString + hash,
      path,
      query,
      hash
    };
  }
  function stringifyURL(stringifyQuery2, location2) {
    const query = location2.query ? stringifyQuery2(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery2, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
  }
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key]))
        return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
  }
  function isEquivalentArray(a, b) {
    return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/"))
      return to;
    if (!to)
      return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (position === 1 || segment === ".")
        continue;
      if (segment === "..")
        position--;
      else
        break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
  }
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  const START = "";
  function normalizeBase(base) {
    if (!base) {
      {
        base = "/";
      }
    }
    if (base[0] !== "/" && base[0] !== "#")
      base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  const computeScrollPosition = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
  });
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location2) {
    const { pathname, search, hash } = location2;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/")
        pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    const path = stripBase(pathname, base);
    return path + search + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index2 = listeners.indexOf(callback);
        if (index2 > -1)
          listeners.splice(index2, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      const { history: history2 } = window;
      if (!history2.state)
        return;
      history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
    function destroy() {
      for (const teardown of teardowns)
        teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("beforeunload", beforeUnloadListener);
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history2, location: location2 } = window;
    const currentLocation = {
      value: createCurrentLocation(base, location2)
    };
    const historyState = { value: history2.state };
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history2.length - 1,
        replaced: true,
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace2) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history2[replace2 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        {
          console.error(err);
        }
        location2[replace2 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data) {
      const state = assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data) {
      const currentState = assign({}, historyState.value, history2.state, {
        forward: to,
        scroll: computeScrollPosition()
      });
      changeLocation(currentState.current, currentState, true);
      const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners)
        historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign({
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function createMemoryHistory(base = "") {
    let listeners = [];
    let queue2 = [START];
    let position = 0;
    base = normalizeBase(base);
    function setLocation(location2) {
      position++;
      if (position === queue2.length) {
        queue2.push(location2);
      } else {
        queue2.splice(position);
        queue2.push(location2);
      }
    }
    function triggerListeners(to, from, { direction, delta }) {
      const info = {
        direction,
        delta,
        type: NavigationType.pop
      };
      for (const callback of listeners) {
        callback(to, from, info);
      }
    }
    const routerHistory = {
      location: START,
      state: {},
      base,
      createHref: createHref.bind(null, base),
      replace(to) {
        queue2.splice(position--, 1);
        setLocation(to);
      },
      push(to, data) {
        setLocation(to);
      },
      listen(callback) {
        listeners.push(callback);
        return () => {
          const index2 = listeners.indexOf(callback);
          if (index2 > -1)
            listeners.splice(index2, 1);
        };
      },
      destroy() {
        listeners = [];
        queue2 = [START];
        position = 0;
      },
      go(delta, shouldTrigger = true) {
        const from = this.location;
        const direction = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
        position = Math.max(0, Math.min(position + delta, queue2.length - 1));
        if (shouldTrigger) {
          triggerListeners(this.location, from, {
            direction,
            delta
          });
        }
      }
    };
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => queue2[position]
    });
    return routerHistory;
  }
  function createWebHashHistory(base) {
    base = location.host ? base || location.pathname + location.search : "";
    if (!base.includes("#"))
      base += "#";
    return createWebHistory(base);
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  const NavigationFailureSymbol = /* @__PURE__ */ PolySymbol("nf");
  exports.NavigationFailureType = void 0;
  (function(NavigationFailureType) {
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
  })(exports.NavigationFailureType || (exports.NavigationFailureType = {}));
  const ErrorTypeMessages = {
    [1]({ location: location2, currentLocation }) {
      return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
    },
    [2]({ from, to }) {
      return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
    },
    [4]({ from, to }) {
      return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
    },
    [8]({ from, to }) {
      return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
    },
    [16]({ from, to }) {
      return `Avoided redundant navigation to current location: "${from.fullPath}".`;
    }
  };
  function createRouterError(type, params) {
    {
      return assign(new Error(ErrorTypeMessages[type](params)), {
        type,
        [NavigationFailureSymbol]: true
      }, params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const propertiesToLog = ["params", "query", "hash"];
  function stringifyRoute(to) {
    if (typeof to === "string")
      return to;
    if ("path" in to)
      return to.path;
    const location2 = {};
    for (const key of propertiesToLog) {
      if (key in to)
        location2[key] = to[key];
    }
    return JSON.stringify(location2, null, 2);
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [90];
      if (options.strict && !segment.length)
        pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
        if (token.type === 0) {
          if (!tokenIndex)
            pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += 40;
        } else if (token.type === 1) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re2 !== BASE_PARAM_PATTERN) {
            subSegmentScore += 10;
            try {
              new RegExp(`(${re2})`);
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
          if (!tokenIndex)
            subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional)
            subPattern += "?";
          pattern += subPattern;
          subSegmentScore += 20;
          if (optional)
            subSegmentScore += -8;
          if (repeatable)
            subSegmentScore += -20;
          if (re2 === ".*")
            subSegmentScore += -50;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i = score.length - 1;
      score[i][score[i].length - 1] += 0.7000000000000001;
    }
    if (!options.strict)
      pattern += "/?";
    if (options.end)
      pattern += "$";
    else if (options.strict)
      pattern += "(?:/|$)";
    const re = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse(path) {
      const match = path.match(re);
      const params = {};
      if (!match)
        return null;
      for (let i = 1; i < match.length; i++) {
        const value = match[i] || "";
        const key = keys[i - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/"))
          path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) {
          if (token.type === 0) {
            path += token.value;
          } else if (token.type === 1) {
            const { value, repeatable, optional } = token;
            const param = value in params ? params[value] : "";
            if (Array.isArray(param) && !repeatable)
              throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
            const text = Array.isArray(param) ? param.join("/") : param;
            if (!text) {
              if (optional) {
                if (segment.length < 2 && segments.length > 1) {
                  if (path.endsWith("/"))
                    path = path.slice(0, -1);
                  else
                    avoidDuplicatedSlash = true;
                }
              } else
                throw new Error(`Missing required param "${value}"`);
            }
            path += text;
          }
        }
      }
      return path;
    }
    return {
      re,
      score,
      keys,
      parse,
      stringify
    };
  }
  function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
      const diff = b[i] - a[i];
      if (diff)
        return diff;
      i++;
    }
    if (a.length < b.length) {
      return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
    } else if (a.length > b.length) {
      return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
  }
  function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      const comp = compareScoreArray(aScore[i], bScore[i]);
      if (comp)
        return comp;
      i++;
    }
    return bScore.length - aScore.length;
  }
  const ROOT_TOKEN = {
    type: 0,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path)
      return [[]];
    if (path === "/")
      return [[ROOT_TOKEN]];
    if (!path.startsWith("/")) {
      throw new Error(`Invalid path "${path}"`);
    }
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment)
        tokens.push(segment);
      segment = [];
    }
    let i = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer)
        return;
      if (state === 0) {
        segment.push({
          type: 0,
          value: buffer
        });
      } else if (state === 1 || state === 2 || state === 3) {
        if (segment.length > 1 && (char === "*" || char === "+"))
          crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: 1,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else {
        crash("Invalid state to consume buffer");
      }
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i < path.length) {
      char = path[i++];
      if (char === "\\" && state !== 2) {
        previousState = state;
        state = 4;
        continue;
      }
      switch (state) {
        case 0:
          if (char === "/") {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = 1;
          } else {
            addCharToBuffer();
          }
          break;
        case 4:
          addCharToBuffer();
          state = previousState;
          break;
        case 1:
          if (char === "(") {
            state = 2;
          } else if (VALID_PARAM_RE.test(char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0;
            if (char !== "*" && char !== "?" && char !== "+")
              i--;
          }
          break;
        case 2:
          if (char === ")") {
            if (customRe[customRe.length - 1] == "\\")
              customRe = customRe.slice(0, -1) + char;
            else
              state = 3;
          } else {
            customRe += char;
          }
          break;
        case 3:
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === 2)
      crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign(parser, {
      record,
      parent,
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf)
        parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes2, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions2({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions2(globalOptions, record);
      const normalizedRecords = [
        mainNormalizedRecord
      ];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
        for (const alias of aliases) {
          normalizedRecords.push(assign({}, mainNormalizedRecord, {
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          }));
        }
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher)
            originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher))
            removeRoute(record.name);
        }
        if ("children" in mainNormalizedRecord) {
          const children = mainNormalizedRecord.children;
          for (let i = 0; i < children.length; i++) {
            addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
          }
        }
        originalRecord = originalRecord || matcher;
        insertMatcher(matcher);
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index2 = matchers.indexOf(matcherRef);
        if (index2 > -1) {
          matchers.splice(index2, 1);
          if (matcherRef.record.name)
            matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      let i = 0;
      while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
        i++;
      matchers.splice(i, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher))
        matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location2, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location2 && location2.name) {
        matcher = matcherMap.get(location2.name);
        if (!matcher)
          throw createRouterError(1, {
            location: location2
          });
        name = matcher.record.name;
        params = assign(paramsFromLocation(currentLocation.params, matcher.keys.filter((k) => !k.optional).map((k) => k.name)), location2.params);
        path = matcher.stringify(params);
      } else if ("path" in location2) {
        path = location2.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher)
          throw createRouterError(1, {
            location: location2,
            currentLocation
          });
        name = matcher.record.name;
        params = assign({}, currentLocation.params, location2.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes2.forEach((route) => addRoute(route));
    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
  }
  function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
      if (key in params)
        newParams[key] = params[key];
    }
    return newParams;
  }
  function normalizeRouteRecord(record) {
    return {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: void 0,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in record ? record.components || {} : { default: record.component }
    };
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) {
      propsObject.default = props;
    } else {
      for (const name in record.components)
        propsObject[name] = typeof props === "boolean" ? props : props[name];
    }
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf)
        return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta2, record) => assign(meta2, record.meta), {});
  }
  function mergeOptions2(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
  }
  function isRecordChildOf(record, parent) {
    return parent.children.some((child) => child === record || isRecordChildOf(record, child));
  }
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  function parseQuery(search) {
    const query = {};
    if (search === "" || search === "?")
      return query;
    const hasLeadingIM = search[0] === "?";
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
    for (let i = 0; i < searchParams.length; ++i) {
      const searchParam = searchParams[i].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!Array.isArray(currentValue)) {
          currentValue = query[key] = [currentValue];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  function stringifyQuery(query) {
    let search = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) {
          search += (search.length ? "&" : "") + key;
        }
        continue;
      }
      const values = Array.isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
      values.forEach((value2) => {
        if (value2 !== void 0) {
          search += (search.length ? "&" : "") + key;
          if (value2 != null)
            search += "=" + value2;
        }
      });
    }
    return search;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) {
        normalizedQuery[key] = Array.isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
      }
    }
    return normalizedQuery;
  }
  function useCallbacks() {
    let handlers = [];
    function add2(handler) {
      handlers.push(handler);
      return () => {
        const i = handlers.indexOf(handler);
        if (i > -1)
          handlers.splice(i, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add: add2,
      list: () => handlers,
      reset
    };
  }
  function registerGuard(record, name, guard) {
    const removeFromList = () => {
      record[name].delete(guard);
    };
    vue.onUnmounted(removeFromList);
    vue.onDeactivated(removeFromList);
    vue.onActivated(() => {
      record[name].add(guard);
    });
    record[name].add(guard);
  }
  function onBeforeRouteLeave(leaveGuard) {
    const activeRecord = vue.inject(matchedRouteKey, {}).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "leaveGuards", leaveGuard);
  }
  function onBeforeRouteUpdate(updateGuard) {
    const activeRecord = vue.inject(matchedRouteKey, {}).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "updateGuards", updateGuard);
  }
  function guardToPromiseFn(guard, to, from, record, name) {
    const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
      const next = (valid) => {
        if (valid === false)
          reject(createRouterError(4, {
            from,
            to
          }));
        else if (valid instanceof Error) {
          reject(valid);
        } else if (isRouteLocation(valid)) {
          reject(createRouterError(2, {
            from: to,
            to: valid
          }));
        } else {
          if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function")
            enterCallbackArray.push(valid);
          resolve();
        }
      };
      const guardReturn = guard.call(record && record.instances[name], to, from, next);
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3)
        guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name])
          continue;
        if (isRouteComponent(rawComponent)) {
          const options = rawComponent.__vccOpts || rawComponent;
          const guard = options[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved)
              return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.components[name] = resolvedComponent;
            const options = resolvedComponent.__vccOpts || resolvedComponent;
            const guard = options[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name)();
          }));
        }
      }
    }
    return guards;
  }
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function useLink(props) {
    const router = vue.inject(routerKey);
    const currentRoute = vue.inject(routeLocationKey);
    const route = vue.computed(() => router.resolve(vue.unref(props.to)));
    const activeRecordIndex = vue.computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length)
        return -1;
      const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index2 > -1)
        return index2;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
    });
    const isActive = vue.computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = vue.computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        return router[vue.unref(props.replace) ? "replace" : "push"](vue.unref(props.to)).catch(noop);
      }
      return Promise.resolve();
    }
    return {
      route,
      href: vue.computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  const RouterLinkImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterLink",
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink,
    setup(props, { slots }) {
      const link = vue.reactive(useLink(props));
      const { options } = vue.inject(routerKey);
      const elClass = vue.computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && slots.default(link);
        return props.custom ? children : vue.h("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    if (e.defaultPrevented)
      return;
    if (e.button !== void 0 && e.button !== 0)
      return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target))
        return;
    }
    if (e.preventDefault)
      e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue)
          return false;
      } else {
        if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
          return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: { MODE: 3 },
    setup(props, { attrs, slots }) {
      const injectedRoute = vue.inject(routerViewLocationKey);
      const routeToDisplay = vue.computed(() => props.route || injectedRoute.value);
      const depth = vue.inject(viewDepthKey, 0);
      const matchedRouteRef = vue.computed(() => routeToDisplay.value.matched[depth]);
      vue.provide(viewDepthKey, depth + 1);
      vue.provide(matchedRouteKey, matchedRouteRef);
      vue.provide(routerViewLocationKey, routeToDisplay);
      const viewRef = vue.ref();
      vue.watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
        }
      }, { flush: "post" });
      return () => {
        const route = routeToDisplay.value;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[props.name];
        const currentName = props.name;
        if (!ViewComponent) {
          return normalizeSlot(slots.default, { Component: ViewComponent, route });
        }
        const routePropsOption = matchedRoute.props[props.name];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        const component = vue.h(ViewComponent, assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return normalizeSlot(slots.default, { Component: component, route }) || component;
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot)
      return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = vue.shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
      currentLocation = assign({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
        const href2 = routerHistory.createHref(locationNormalized.fullPath);
        return assign(locationNormalized, matchedRoute2, {
          params: decodeParams(matchedRoute2.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href2
        });
      }
      let matcherLocation;
      if ("path" in rawLocation) {
        matcherLocation = assign({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        const targetParams = assign({}, rawLocation.params);
        for (const key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        matcherLocation = assign({}, rawLocation, {
          params: encodeParams(rawLocation.params)
        });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign({
        fullPath,
        hash,
        query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8, {
          from,
          to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
          newTargetLocation.params = {};
        }
        return assign({
          query: to.query,
          hash: to.hash,
          params: to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve(to);
      const from = currentRoute.value;
      const data = to.state;
      const force = to.force;
      const replace2 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect)
        return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
          state: data,
          force,
          replace: replace2
        }), redirectedFrom || targetLocation);
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16, { to: toLocation, from });
        handleScroll();
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
        if (failure2) {
          if (isNavigationFailure(failure2, 2)) {
            return pushWithRedirect(assign(locationAsObject(failure2.to), {
              state: data,
              force,
              replace: replace2
            }), redirectedFrom || toLocation);
          }
        } else {
          failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
        }
        triggerAfterEach(toLocation, from, failure2);
        return failure2;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) {
        record.leaveGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of to.matched) {
          if (record.beforeEnter && !from.matched.includes(record)) {
            if (Array.isArray(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      for (const guard of afterGuards.list())
        guard(to, from, failure);
    }
    function finalizeNavigation(toLocation, from, isPush, replace2, data) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error)
        return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = {};
      if (isPush) {
        if (replace2 || isFirstNavigation)
          routerHistory.replace(toLocation.fullPath, assign({
            scroll: isFirstNavigation && state && state.scroll
          }, data));
        else
          routerHistory.push(toLocation.fullPath, data);
      }
      currentRoute.value = toLocation;
      handleScroll();
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      if (removeHistoryListener)
        return;
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        const toLocation = resolve(to);
        const shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(error, 4 | 8)) {
            return error;
          }
          if (isNavigationFailure(error, 2)) {
            pushWithRedirect(error.to, toLocation).then((failure) => {
              if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            }).catch(noop);
            return Promise.reject();
          }
          if (info.delta)
            routerHistory.go(-info.delta, false);
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(toLocation, from, false);
          if (failure) {
            if (info.delta) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop);
      });
    }
    let readyHandlers = useCallbacks();
    let errorHandlers = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorHandlers.list();
      if (list.length) {
        list.forEach((handler) => handler(error, to, from));
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
        return Promise.resolve();
      return new Promise((resolve2, reject) => {
        readyHandlers.add([resolve2, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      return Promise.resolve();
    }
    const go = (delta) => routerHistory.go(delta);
    const installedApps = /* @__PURE__ */ new Set();
    const router = {
      currentRoute,
      addRoute,
      removeRoute,
      hasRoute,
      getRoutes,
      resolve,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorHandlers.add,
      isReady,
      install(app) {
        const router2 = this;
        app.component("RouterLink", RouterLink);
        app.component("RouterView", RouterView);
        app.config.globalProperties.$router = router2;
        Object.defineProperty(app.config.globalProperties, "$route", {
          enumerable: true,
          get: () => vue.unref(currentRoute)
        });
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) {
          reactiveRoute[key] = vue.computed(() => currentRoute.value[key]);
        }
        app.provide(routerKey, router2);
        app.provide(routeLocationKey, vue.reactive(reactiveRoute));
        app.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app.unmount;
        installedApps.add(app);
        app.unmount = function() {
          installedApps.delete(app);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    return router;
  }
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i];
      if (recordFrom) {
        if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
          updatingRecords.push(recordFrom);
        else
          leavingRecords.push(recordFrom);
      }
      const recordTo = to.matched[i];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
          enteringRecords.push(recordTo);
        }
      }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
  }
  function useRouter2() {
    return vue.inject(routerKey);
  }
  function useRoute2() {
    return vue.inject(routeLocationKey);
  }
  exports.RouterLink = RouterLink;
  exports.RouterView = RouterView;
  exports.START_LOCATION = START_LOCATION_NORMALIZED;
  exports.createMemoryHistory = createMemoryHistory;
  exports.createRouter = createRouter;
  exports.createRouterMatcher = createRouterMatcher;
  exports.createWebHashHistory = createWebHashHistory;
  exports.createWebHistory = createWebHistory;
  exports.isNavigationFailure = isNavigationFailure;
  exports.matchedRouteKey = matchedRouteKey;
  exports.onBeforeRouteLeave = onBeforeRouteLeave;
  exports.onBeforeRouteUpdate = onBeforeRouteUpdate;
  exports.parseQuery = parseQuery;
  exports.routeLocationKey = routeLocationKey;
  exports.routerKey = routerKey;
  exports.routerViewLocationKey = routerViewLocationKey;
  exports.stringifyQuery = stringifyQuery;
  exports.useLink = useLink;
  exports.useRoute = useRoute2;
  exports.useRouter = useRouter2;
  exports.viewDepthKey = viewDepthKey;
})(vueRouter_cjs_prod);
const wrapInRef = (value) => vue_cjs_prod.isRef(value) ? value : vue_cjs_prod.ref(value);
const getDefault = () => null;
function useAsyncData(key, handler, options = {}) {
  var _a2, _b, _c, _d, _e;
  if (typeof key !== "string") {
    throw new TypeError("asyncData key must be a string");
  }
  if (typeof handler !== "function") {
    throw new TypeError("asyncData handler must be a function");
  }
  options = __spreadValues({ server: true, default: getDefault }, options);
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_b = (_a2 = options.lazy) != null ? _a2 : options.defer) != null ? _b : false;
  options.initialCache = (_c = options.initialCache) != null ? _c : true;
  const nuxt = useNuxtApp();
  const instance = vue_cjs_prod.getCurrentInstance();
  if (instance && !instance._nuxtOnBeforeMountCbs) {
    const cbs = instance._nuxtOnBeforeMountCbs = [];
    if (instance && false) {
      vue_cjs_prod.onBeforeMount(() => {
        cbs.forEach((cb) => {
          cb();
        });
        cbs.splice(0, cbs.length);
      });
      vue_cjs_prod.onUnmounted(() => cbs.splice(0, cbs.length));
    }
  }
  const useInitialCache = () => options.initialCache && nuxt.payload.data[key] !== void 0;
  const asyncData = {
    data: wrapInRef((_d = nuxt.payload.data[key]) != null ? _d : options.default()),
    pending: vue_cjs_prod.ref(!useInitialCache()),
    error: vue_cjs_prod.ref((_e = nuxt.payload._errors[key]) != null ? _e : null)
  };
  asyncData.refresh = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = Promise.resolve(handler(nuxt)).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      asyncData.error.value = error;
      asyncData.data.value = vue_cjs_prod.unref(options.default());
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer) {
    const promise = initialFetch();
    vue_cjs_prod.onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const useState = (key, init) => {
  const nuxt = useNuxtApp();
  const state = vue_cjs_prod.toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (vue_cjs_prod.isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
};
const useError = () => {
  const nuxtApp = useNuxtApp();
  return useState("error", () => nuxtApp.ssrContext.error);
};
const throwError = (_err) => {
  const nuxtApp = useNuxtApp();
  useError();
  const err = typeof _err === "string" ? new Error(_err) : _err;
  nuxtApp.callHook("app:error", err);
  {
    nuxtApp.ssrContext.error = nuxtApp.ssrContext.error || err;
  }
  return err;
};
const MIMES = {
  html: "text/html",
  json: "application/json"
};
const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event, type) {
  if (type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", type);
  }
}
function sendRedirect(event, location2, code2 = 302) {
  event.res.statusCode = code2;
  event.res.setHeader("Location", location2);
  return send(event, "Redirecting to " + location2, MIMES.html);
}
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.statusMessage = "H3Error";
  }
}
function createError(input) {
  var _a2;
  if (input instanceof H3Error) {
    return input;
  }
  const err = new H3Error((_a2 = input.message) != null ? _a2 : input.statusMessage);
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  return err;
}
function useRequestHeaders(include) {
  var _a2, _b;
  const headers = (_b = (_a2 = useNuxtApp().ssrContext) == null ? void 0 : _a2.event.req.headers) != null ? _b : {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  if (isProcessingMiddleware()) {
    return to;
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = router.resolve(to).fullPath || "/";
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 301));
    }
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const checkPropConflicts = (props, main, sub) => {
  };
  return vue_cjs_prod.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue_cjs_prod.computed(() => {
        checkPropConflicts(props, "to", "href");
        return props.to || props.href || "";
      });
      const isExternal = vue_cjs_prod.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a2, _b, _c;
        if (!isExternal.value) {
          return vue_cjs_prod.h(vue_cjs_prod.resolveComponent("RouterLink"), {
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue
          }, slots.default);
        }
        const href = typeof to.value === "object" ? (_b = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        checkPropConflicts(props, "noRel", "rel");
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        return vue_cjs_prod.h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map2[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index2;
  let lastIndex = 0;
  for (index2 = match.index; index2 < str.length; index2++) {
    switch (str.charCodeAt(index2)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index2) {
      html += str.slice(lastIndex, index2);
    }
    lastIndex = index2 + 1;
    html += escaped;
  }
  return lastIndex !== index2 ? html + str.slice(lastIndex, index2) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => val instanceof Date;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject$1;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
var isPromise_1 = shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
function useHead(meta2) {
  const resolvedMeta = isFunction_1(meta2) ? vue_cjs_prod.computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components = {};
function componentsPlugin_08759b39(nuxtApp) {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
}
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    let value = attrs[key];
    if (key === "key" || value === false) {
      continue;
    }
    if (key === "children") {
      el.textContent = value;
    } else {
      el.setAttribute(key, value);
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "htmlAttrs",
  "bodyAttrs"
];
var headObjToTags = (obj) => {
  const tags = [];
  for (const key of Object.keys(obj)) {
    if (obj[key] == null)
      continue;
    if (key === "title") {
      tags.push({ tag: key, props: { children: obj[key] } });
    } else if (key === "base") {
      tags.push({ tag: key, props: __spreadValues2({ key: "default" }, obj[key]) });
    } else if (acceptFields.includes(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          tags.push({ tag: key, props: item });
        });
      } else if (value) {
        tags.push({ tag: key, props: value });
      }
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a2;
  const head = document2.head;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldElements = [];
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_a2 = j == null ? void 0 : j.tagName) == null ? void 0 : _a2.toLowerCase()) === type) {
        oldElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => createElement(tag.tag, tag.props, document2));
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldElements.length; i++) {
      const oldEl = oldElements[i];
      if (isEqualNode(oldEl, newEl)) {
        oldElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldElements.forEach((t) => {
    var _a22;
    return (_a22 = t.parentNode) == null ? void 0 : _a22.removeChild(t);
  });
  newElements.forEach((t) => {
    head.insertBefore(t, headCountEl);
  });
  headCountEl.setAttribute("content", "" + (headCount - oldElements.length + newElements.length));
};
var createHead = () => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(objs.value);
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index2 = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index2 = i;
                  break;
                }
              }
              if (index2 !== -1) {
                deduped.splice(index2, 1);
              }
            }
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}>`;
  }
  return `<${tag.tag}${attrs}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps2(__spreadValues2({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps2(__spreadValues2({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    }
  };
};
function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key]);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function createDefu(merger) {
  return (...args) => args.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = createDefu();
const vueuseHead_297ed1ff = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    vue_cjs_prod.watchEffect(() => {
      head.updateDOM();
    });
  });
  const titleTemplate = vue_cjs_prod.ref();
  nuxtApp._useHead = (_meta) => {
    const meta2 = vue_cjs_prod.ref(_meta);
    if ("titleTemplate" in meta2.value) {
      titleTemplate.value = meta2.value.titleTemplate;
    }
    const headObj = vue_cjs_prod.computed(() => {
      const overrides = { meta: [] };
      if (titleTemplate.value && "title" in meta2.value) {
        overrides.title = typeof titleTemplate.value === "function" ? titleTemplate.value(meta2.value.title) : titleTemplate.value.replace(/%s/g, meta2.value.title);
      }
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => renderHeadToString(head);
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory(__spreadValues(__spreadValues({}, removeUndefinedProps(props)), ctx.attrs), ctx));
  return () => {
    var _a2, _b;
    return renderChild ? (_b = (_a2 = ctx.slots).default) == null ? void 0 : _b.call(_a2) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = vue_cjs_prod.defineComponent({
  name: "Script",
  props: __spreadProps(__spreadValues({}, globalProps), {
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  }),
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const Link = vue_cjs_prod.defineComponent({
  name: "Link",
  props: __spreadProps(__spreadValues({}, globalProps), {
    as: String,
    crossorigin: String,
    disabled: Boolean,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  }),
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = vue_cjs_prod.defineComponent({
  name: "Base",
  props: __spreadProps(__spreadValues({}, globalProps), {
    href: String,
    target: String
  }),
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = vue_cjs_prod.defineComponent({
  name: "Title",
  setup: setupForUseMeta((_, { slots }) => {
    var _a2, _b, _c;
    const title = ((_c = (_b = (_a2 = slots.default) == null ? void 0 : _a2.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = vue_cjs_prod.defineComponent({
  name: "Meta",
  props: __spreadProps(__spreadValues({}, globalProps), {
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  }),
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = vue_cjs_prod.defineComponent({
  name: "Style",
  props: __spreadProps(__spreadValues({}, globalProps), {
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  }),
  setup: setupForUseMeta((props, { slots }) => {
    var _a2, _b, _c;
    const style = __spreadValues({}, props);
    const textContent = (_c = (_b = (_a2 = slots.default) == null ? void 0 : _a2.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = vue_cjs_prod.defineComponent({
  name: "Head",
  setup: (_props, ctx) => () => {
    var _a2, _b;
    return (_b = (_a2 = ctx.slots).default) == null ? void 0 : _b.call(_a2);
  }
});
const Html = vue_cjs_prod.defineComponent({
  name: "Html",
  props: __spreadProps(__spreadValues({}, globalProps), {
    manifest: String,
    version: String,
    xmlns: String
  }),
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = vue_cjs_prod.defineComponent({
  name: "Body",
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const metaConfig = { "globalMeta": { "charset": "utf-8", "viewport": "width=device-width, initial-scale=1", "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "name": "title", "content": "Les Transalpins - Habitat participatif situ\xE9 vers la r\xE9gion grenobloise" }, { "name": "description", "content": "Habitat participatif sobre, convivial, \xE9cologique et interg\xE9n\xE9rationnel situ\xE9 vers la r\xE9gion grenobloise" }, { "hid": "og:locale", "property": "og:locale", "content": "fr_FR" }, { "hid": "og:site_name", "property": "og:site_name", "content": "Les Transalpins" }, { "hid": "og:title", "property": "og:title", "content": "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise" }, { "hid": "og:description", "property": "og:description", "content": "Habitat participatif sobre, convivial, \xE9cologique et interg\xE9n\xE9rationnel situ\xE9 vers la r\xE9gion grenobloise" }, { "hid": "og:url", "property": "og:url", "content": "https://www.lestransalpins.org" }, { "hid": "og:type", "property": "og:type", "content": "website" }, { "hid": "og:image", "property": "og:image", "content": "https://www.lestransalpins.org/images/vercors.jpg" }, { "hid": "og:image:alt", "property": "og:image:alt", "content": "Illustration : Les hauts plateaux du vercors | les Transalpins" }, { "hid": "twitter:card", "name": "twitter:card", "content": "summary" }, { "hid": "twitter:domain", "name": "twitter:domain", "content": "https://www.lestransalpins.org" }, { "hid": "twitter:title", "name": "twitter:title", "content": "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise" }, { "hid": "twitter:description", "name": "twitter:description", "content": "Habitat participatif sobre, convivial, \xE9cologique et interg\xE9n\xE9rationnel situ\xE9 vers la r\xE9gion grenobloise" }, { "hid": "twitter:image", "name": "twitter:image", "content": "https://www.lestransalpins.org/images/vercors.jpg" }, { "hid": "twitter:image:alt", "name": "twitter:image:alt", "content": "Illustration : Les hauts plateaux du vercors | les Transalpins" }], "link": [{ "rel": "stylesheet", "href": "//fonts.googleapis.com/css?family=Permanent+Marker" }, { "rel": "stylesheet", "href": "//fonts.googleapis.com/css?family=Amatic+SC" }, { "rel": "stylesheet", "href": "//fonts.googleapis.com/css?family=Caveat" }], "style": [], "script": [], "titleTemplate": "%s - Les Transalpins", "htmlAttrs": { "prefix": "og: https://ogp.me/ns#" } } };
const metaMixin = {
  created() {
    const instance = vue_cjs_prod.getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? vue_cjs_prod.computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const _4d83301a = defineNuxtPlugin((nuxtApp) => {
  useHead(vue_cjs_prod.markRaw(metaConfig.globalMeta));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a2;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a2 = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a2 : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment$1 = {
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
};
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? vue_cjs_prod.h(component, props === true ? {} : props, slots) : vue_cjs_prod.h(Fragment$1, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = vue_cjs_prod.defineComponent({
  name: "NuxtPage",
  props: {
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props) {
    const nuxtApp = useNuxtApp();
    const isNested = vue_cjs_prod.inject(isNestedKey, false);
    vue_cjs_prod.provide(isNestedKey, true);
    return () => {
      return vue_cjs_prod.h(vueRouter_cjs_prod.RouterView, {}, {
        default: (routeProps) => {
          var _a2;
          return routeProps.Component && _wrapIf(vue_cjs_prod.Transition, (_a2 = routeProps.route.meta.pageTransition) != null ? _a2 : defaultPageTransition, wrapInKeepAlive(routeProps.route.meta.keepalive, isNested && nuxtApp.isHydrating ? vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) : vue_cjs_prod.h(vue_cjs_prod.Suspense, {
            onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
            onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
          }, { default: () => vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) }))).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
var CRUD_MODE = /* @__PURE__ */ ((CRUD_MODE2) => {
  CRUD_MODE2["LIST"] = "LIST";
  CRUD_MODE2["CREATION"] = "CREATION";
  CRUD_MODE2["EDITION"] = "EDITION";
  CRUD_MODE2["DELETION"] = "DELETION";
  CRUD_MODE2["SELECTION"] = "SELECTION";
  return CRUD_MODE2;
})(CRUD_MODE || {});
const crudState = {
  ["LIST"]: {
    isLoading: false,
    allIds: [],
    byId: {},
    totalItems: 0,
    error: "",
    resetList: false,
    view: null
  },
  ["CREATION"]: {
    isLoading: false,
    created: null,
    violations: null,
    error: ""
  },
  ["EDITION"]: {
    isLoading: false,
    edited: null,
    violations: null,
    error: "",
    activeSlug: null,
    retrieved: null
  },
  ["DELETION"]: {
    deleted: null,
    isLoading: false,
    error: ""
  },
  ["SELECTION"]: {
    selectItems: [],
    isLoading: false,
    error: ""
  }
};
const usePageStore = defineStore("page", {
  state: () => {
    return __spreadValues({
      resource: "/pages",
      activeSlug: null
    }, crudState);
  },
  actions: {
    findBySlug(slug) {
      var _a2;
      return (_a2 = this.list.find((page) => page.url === slug)) != null ? _a2 : null;
    },
    setActiveSlug(slug) {
      this.activeSlug = slug;
    }
  },
  getters: {
    findByActiveSlug(state) {
      return this.list.filter((page) => page.category && page.category.slug === state.activeSlug);
    },
    menu() {
      const menu = [];
      this.list.forEach((page) => {
        var _a2;
        if (!page || !page.showInMenu) {
          return;
        }
        if (page.category) {
          if (!page.category.showInMenu) {
            return;
          }
          const categoryItem = menu.find((item) => page.category.slug === item.slug);
          if (!categoryItem) {
            menu.push({
              name: page.category.name,
              slug: page.category.slug,
              url: null,
              children: [{
                name: page.title,
                url: page.url,
                slug: null
              }]
            });
          } else {
            (_a2 = categoryItem.children) == null ? void 0 : _a2.push({
              name: page.title,
              url: page.url,
              slug: null,
              children: []
            });
          }
        } else {
          menu.push({
            name: page.title,
            url: page.url,
            slug: null,
            children: []
          });
        }
      });
      const prependStaticPages = (menu2) => {
        if (menu2.length === 0) {
          return;
        }
        menu2.unshift({
          name: "Blog",
          url: "/blog",
          slug: null,
          children: []
        });
      };
      const appendStaticPages = (menu2) => {
        if (menu2.length === 0) {
          return;
        }
        menu2.push({
          name: "Contacte-nous !",
          url: "/contact",
          slug: null,
          children: []
        });
        menu2.push({
          name: "Rejoindre le groupe fondateur",
          url: "/nous-rejoindre",
          slug: null,
          children: []
        });
      };
      prependStaticPages(menu);
      appendStaticPages(menu);
      return menu;
    }
  }
});
const _sfc_main$1w = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    page: { default: null }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "p-3 rounded-sm flex flex-col w-full md:w-4/5 self-center" }, _attrs))}>`);
      if (__props.page) {
        _push(`<div class="text-3xl text-primary-dark font-marker py-3">${serverRenderer.exports.ssrInterpolate(__props.page.title)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.page) {
        _push(`<div class="js-content">${__props.page.content}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1w = _sfc_main$1w.setup;
_sfc_main$1w.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/front/PageComponent.vue");
  return _sfc_setup$1w ? _sfc_setup$1w(props, ctx) : void 0;
};
const _sfc_main$1v = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    icon: null
  },
  setup(__props) {
    const props = __props;
    const path = `/icons/remixicon.symbol.svg#${props.icon}`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${serverRenderer.exports.ssrRenderAttrs(_attrs)}><use${serverRenderer.exports.ssrRenderAttr("xlink:href", path)}></use></svg>`);
    };
  }
});
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Icon.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const _sfc_main$1u = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaNode: null
  },
  setup(__props) {
    const props = __props;
    const indexToOrder = vue_cjs_prod.ref({});
    const mediaObjects = vue_cjs_prod.computed(() => props.mediaNode.mediaObjects.filter((mediaObject) => mediaObject.original === null).map((mediaObject, index2) => {
      mediaObject.index = index2;
      indexToOrder.value[index2] = index2 + 1;
      return mediaObject;
    }));
    vue_cjs_prod.ref(0);
    mediaObjects.value.length;
    const showTransition = vue_cjs_prod.ref(0);
    const order = vue_cjs_prod.computed(() => (mediaObject) => {
      var _a2;
      return indexToOrder.value[(_a2 = mediaObject.index) != null ? _a2 : 0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (vue_cjs_prod.unref(mediaObjects).length > 0) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "overflow-hidden hidden md:flex flex-no-wrap flex-row bg-white" }, _attrs))}><div class="${serverRenderer.exports.ssrRenderClass([{
          "translate-x-0": !showTransition.value,
          "transition ease-in duration-700 -translate-x-full": showTransition.value
        }, "flex flex-row flex-nowrap h-96 flex-auto bg-primary"])}"><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(mediaObjects), (imageObject) => {
          _push(`<div class="${serverRenderer.exports.ssrRenderClass([`order-${vue_cjs_prod.unref(order)(imageObject)}`, "w-full shrink-0 flex items-center justify-center h-96 group"])}"><img${serverRenderer.exports.ssrRenderAttr("src", imageObject.contentUrl)} class="w-auto object-cover"></div>`);
        });
        _push(`<!--]--></div>`);
        if (vue_cjs_prod.unref(mediaObjects).length > 1) {
          _push(`<div class="cursor-pointer grow-0 w-0 flex z-10 items-center"><div class="w-fit -translate-x-[150%]">`);
          _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
            icon: "ri-arrow-right-s-fill",
            class: "fill-white bg-primary rounded-full h-12 w-12 shadow-xs"
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/front/Page/Carrousel.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const _sfc_main$1t = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pageStore = usePageStore();
    const page = pageStore.findBySlug(route.params.slug[0]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(page) ? vue_cjs_prod.unref(page).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise")}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(page) ? vue_cjs_prod.unref(page).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(page) !== null && vue_cjs_prod.unref(page).mediaNode !== null) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1u, {
          "media-node": vue_cjs_prod.unref(page).mediaNode
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(page)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, {
          page: vue_cjs_prod.unref(page),
          class: "p-3"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1t = _sfc_main$1t.setup;
_sfc_main$1t.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup$1t ? _sfc_setup$1t(props, ctx) : void 0;
};
const meta$n = void 0;
const __nuxt_component_0$1 = vue_cjs_prod.defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots }) {
    const mounted = vue_cjs_prod.ref(false);
    vue_cjs_prod.onMounted(() => {
      mounted.value = true;
    });
    return (props) => {
      var _a2;
      if (mounted.value) {
        return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return vue_cjs_prod.createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
});
const useBlogArticleStore = defineStore("blog_articles", {
  state: () => {
    return __spreadValues({
      resource: "/blog_articles",
      tags: [],
      activeTags: []
    }, crudState);
  },
  actions: {
    findBySlug(slug) {
      return this.list.find((page) => page.url === slug);
    },
    async fetchTags() {
      const data = await this.$nuxt.$apiFetch("/blog_articles/tags").catch(async (e) => {
      });
      if (!data) {
        return;
      }
      this.tags = data["hydra:member"];
    },
    getRandomImage(article) {
      if (!article.mediaNode || article.mediaNode.length === 0) {
        return null;
      }
      const images = article.mediaNode.mediaObjects.filter((mediaObject) => mediaObject.isImage);
      return images[Math.floor(Math.random() * images.length)];
    }
  },
  getters: {
    listWithActiveTags: (state) => {
      const list = state[CRUD_MODE.LIST].allIds.map((id) => state[CRUD_MODE.LIST].byId[id]);
      if (state.activeTags.length === 0) {
        return list;
      } else {
        return list.filter((article) => article.tags.some((tag) => state.activeTags.includes(tag)));
      }
    }
  }
});
const _sfc_main$1s = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    initialTags: null
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const articleStore = useBlogArticleStore();
    const { tags: storeTags } = storeToRefs(articleStore);
    const additionalTags = vue_cjs_prod.ref([]);
    const tags = vue_cjs_prod.computed(() => [
      ...storeTags.value,
      ...additionalTags.value
    ]);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("blog-tags", async () => {
      await articleStore.fetchTags();
    })), await __temp, __restore();
    const selectedTags = vue_cjs_prod.ref(props.initialTags);
    const addTag = (e) => {
      const tag = e.target.value;
      if (tag !== false && !additionalTags.value.includes(tag) && !storeTags.value.includes(tag)) {
        additionalTags.value.push(tag);
        selectedTags.value.push(tag);
      }
      e.target.value = "";
    };
    const {
      value: inputValue
    } = useField("tags", void 0, {
      initialValue: props.initialTags
    });
    vue_cjs_prod.watch(() => selectedTags, (newSelectedTags) => {
      inputValue.value = newSelectedTags.value;
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(De), vue_cjs_prod.mergeProps({
        as: "div",
        modelValue: selectedTags.value,
        "onUpdate:modelValue": ($event) => selectedTags.value = $event,
        multiple: "",
        class: "flex justify-center flex-col"
      }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we$1), { class: "w-full bg-gray-200 p-3" }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${serverRenderer.exports.ssrInterpolate(selectedTags.value.length > 0 ? "Tags: " + selectedTags.value.join(", ") : "S\xE9lectionne des tags")}`);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(selectedTags.value.length > 0 ? "Tags: " + selectedTags.value.join(", ") : "S\xE9lectionne des tags"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ke), { class: "absolute top-0 w-full bg-gray-200 z-10" }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(tags), (tag, i) => {
                    _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ce), {
                      as: "template",
                      key: i,
                      value: tag
                    }, {
                      default: vue_cjs_prod.withCtx(({ active, selected }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<li class="${serverRenderer.exports.ssrRenderClass([{
                            "text-primary-dark": selected,
                            "bg-primary text-white": active && !selected
                          }, "w-full cursor-pointer p-3"])}"${_scopeId3}>${serverRenderer.exports.ssrInterpolate(tag)}</li>`);
                        } else {
                          return [
                            vue_cjs_prod.createVNode("li", {
                              class: [{
                                "text-primary-dark": selected,
                                "bg-primary text-white": active && !selected
                              }, "w-full cursor-pointer p-3"]
                            }, vue_cjs_prod.toDisplayString(tag), 3)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--><li class="p-3 w-full"${_scopeId2}><input type="text p-2 w-full" placeholder="Ajoute un tag (avec entr\xE9e)"${_scopeId2}></li>`);
                } else {
                  return [
                    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(tags), (tag, i) => {
                      return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                        as: "template",
                        key: i,
                        value: tag
                      }, {
                        default: vue_cjs_prod.withCtx(({ active, selected }) => [
                          vue_cjs_prod.createVNode("li", {
                            class: [{
                              "text-primary-dark": selected,
                              "bg-primary text-white": active && !selected
                            }, "w-full cursor-pointer p-3"]
                          }, vue_cjs_prod.toDisplayString(tag), 3)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128)),
                    vue_cjs_prod.createVNode("li", { class: "p-3 w-full" }, [
                      vue_cjs_prod.createVNode("input", {
                        onKeyup: vue_cjs_prod.withKeys(addTag, ["enter"]),
                        type: "text p-2 w-full",
                        placeholder: "Ajoute un tag (avec entr\xE9e)"
                      }, null, 40, ["onKeyup"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(we$1), { class: "w-full bg-gray-200 p-3" }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(selectedTags.value.length > 0 ? "Tags: " + selectedTags.value.join(", ") : "S\xE9lectionne des tags"), 1)
                ]),
                _: 1
              }),
              vue_cjs_prod.createVNode("div", { class: "relative" }, [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { class: "absolute top-0 w-full bg-gray-200 z-10" }, {
                  default: vue_cjs_prod.withCtx(() => [
                    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(tags), (tag, i) => {
                      return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                        as: "template",
                        key: i,
                        value: tag
                      }, {
                        default: vue_cjs_prod.withCtx(({ active, selected }) => [
                          vue_cjs_prod.createVNode("li", {
                            class: [{
                              "text-primary-dark": selected,
                              "bg-primary text-white": active && !selected
                            }, "w-full cursor-pointer p-3"]
                          }, vue_cjs_prod.toDisplayString(tag), 3)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128)),
                    vue_cjs_prod.createVNode("li", { class: "p-3 w-full" }, [
                      vue_cjs_prod.createVNode("input", {
                        onKeyup: vue_cjs_prod.withKeys(addTag, ["enter"]),
                        type: "text p-2 w-full",
                        placeholder: "Ajoute un tag (avec entr\xE9e)"
                      }, null, 40, ["onKeyup"])
                    ])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/blog/FormTags.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const _sfc_main$1r = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    icon: { default: "ri-error-warning-fill" },
    iconClass: { default: "fill-accent h-6 w-6" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "relative flex flex-col items-center group" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
        icon: __props.icon,
        class: __props.iconClass
      }, null, _parent));
      _push(`<div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex min-w-max"><span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-accent shadow-lg">`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span><div class="w-3 h-3 -mt-2 rotate-45 bg-secondary"></div></div></div>`);
    };
  }
});
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Tooltip.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const _sfc_main$1q = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    name: null,
    label: null,
    error: null,
    fieldAttrs: { default: {
      autocomplete: "off",
      validateOnInput: true
    } }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row group py-4 px-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), vue_cjs_prod.mergeProps({ id: __props.name }, { fieldAttrs: __props.fieldAttrs }, {
        type: "checkbox",
        name: __props.name,
        value: true,
        "unchecked-value": false,
        class: "h-5 w-5 mr-2"
      }), null, _parent));
      _push(`<label${serverRenderer.exports.ssrRenderAttr("for", __props.name)}>${serverRenderer.exports.ssrInterpolate(__props.label)} `);
      if (__props.error) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(__props.error)}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.error), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</label></div>`);
    };
  }
});
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/CheckboxField.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const _sfc_main$1p = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    name: null,
    label: null,
    icon: null,
    error: null,
    value: null,
    fieldAttrs: { default: {
      autocomplete: "off",
      validateOnInput: true
    } },
    options: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row group py-4 px-3" }, _attrs))}>`);
      if (__props.icon) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: __props.icon,
          class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!__props.error, "fill-primary": !!__props.value && !__props.error, "fill-gray-500": !__props.value }]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative w-full">`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), vue_cjs_prod.mergeProps({
        as: "select",
        id: __props.name,
        name: __props.name,
        class: "peer w-full outline-none h-8"
      }, __props.fieldAttrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            serverRenderer.exports.ssrRenderList(__props.options, (option) => {
              _push2(`<option${serverRenderer.exports.ssrRenderAttr("value", option.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(option.value === __props.value) ? " selected" : ""}${_scopeId}>${serverRenderer.exports.ssrInterpolate(option.label)}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.options, (option) => {
                return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                  value: option.value,
                  selected: option.value === __props.value
                }, vue_cjs_prod.toDisplayString(option.label), 9, ["value", "selected"]);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<label${serverRenderer.exports.ssrRenderAttr("for", __props.name)} class="${serverRenderer.exports.ssrRenderClass([{ "text-accent": !!__props.error, "text-primary": !!__props.value && !__props.error }, "h-1/2 -translate-y-full pl-0 transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])}">${serverRenderer.exports.ssrInterpolate(__props.label)} `);
      if (__props.error) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(__props.error)}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.error), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</label><div class="${serverRenderer.exports.ssrRenderClass([{
        "border-accent": !!__props.error,
        "border-primary": !!__props.value && !__props.error,
        "border-gray-500": !__props.value,
        "-ml-8 w-[calc(100%_+_2rem)]": !!__props.icon,
        "w-full": !__props.icon
      }, "absolute bottom-0 border-b"])}"></div></div></div>`);
    };
  }
});
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/SelectField.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
function useFieldHelper(props) {
  const isDisabled = props.fieldAttrs && props.fieldAttrs.disabled === "disabled";
  const isRequired = props.fieldAttrs && props.fieldAttrs.required === true;
  const disabledColor = "gray-300";
  const getColor = () => {
    if (isDisabled) {
      return disabledColor;
    }
    if (!props.value) {
      return "gray-500";
    }
    if (!!props.value && !props.error) {
      return "primary";
    }
    if (!!props.error) {
      return "accent";
    }
    return "gray-500";
  };
  return {
    isRequired,
    isDisabled,
    disabledColor,
    getColor
  };
}
const _sfc_main$1o = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    name: null,
    label: null,
    type: { default: "text" },
    icon: null,
    error: null,
    value: null,
    fieldAttrs: { default: {
      autocomplete: "off",
      validateOnInput: true
    } },
    as: { default: "input" }
  },
  setup(__props) {
    const props = __props;
    const { isDisabled, isRequired, disabledColor, getColor } = useFieldHelper(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row group py-4 px-3" }, _attrs))}>`);
      if (__props.icon) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: __props.icon,
          class: ["h-8 w-10 group-focus-within:stroke-2", [`fill-${vue_cjs_prod.unref(getColor)()}`]]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative w-full">`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), vue_cjs_prod.mergeProps({
        as: __props.as,
        id: __props.name,
        name: __props.name,
        type: __props.type,
        class: ["peer w-full outline-none h-full min-h-[32px]", { [`text-${vue_cjs_prod.unref(disabledColor)}`]: vue_cjs_prod.unref(isDisabled) }]
      }, __props.fieldAttrs), null, _parent));
      _push(`<label${serverRenderer.exports.ssrRenderAttr("for", __props.name)} class="${serverRenderer.exports.ssrRenderClass([{ "-top-5 pl-0": !!__props.value, "top-2": !__props.value, [`text-${vue_cjs_prod.unref(getColor)()}`]: true }, "transform transition-all absolute left-0 h-fit flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:-top-4"])}">${serverRenderer.exports.ssrInterpolate(__props.label)} `);
      if (__props.error && (!!__props.value || !vue_cjs_prod.unref(isRequired))) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(__props.error)}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.error), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</label><div class="${serverRenderer.exports.ssrRenderClass([{
        [`border-${vue_cjs_prod.unref(getColor)()}`]: true,
        "-ml-8 w-[calc(100%_+_2rem)]": !!__props.icon,
        "w-full": !__props.icon
      }, "absolute bottom-0 border-b"])}"></div></div></div>`);
    };
  }
});
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/TextField.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const useMediaNodeStore = defineStore("media_nodes", {
  state: () => {
    return __spreadValues({
      resource: "/media_nodes",
      allTreeIds: [],
      treeById: {},
      treeError: "",
      treeIsLoading: false,
      resetTree: false
    }, crudState);
  },
  actions: {
    toggleTreeLoading() {
      this.treeIsLoading = !this.treeIsLoading;
    },
    resetTree() {
      Object.assign(this, {
        allTreeIds: [],
        treeById: {},
        treeError: "",
        treeIsLoading: false,
        resetTree: false
      });
    },
    addTreeItem(item) {
      this.treeById[item["@id"]] = item;
      if (this.allTreeIds.includes(item["@id"])) {
        return;
      }
      this.allTreeIds.push(item["@id"]);
    },
    handleTreeError(e) {
      this.treeError = e.message;
    },
    async fetchTree() {
      this.toggleTreeLoading();
      const retrieved = await this.$nuxt.$apiFetch(`${this.resource}/tree`).catch(async (e) => {
        await this.handleTreeError(e);
      }).finally(() => {
        this.toggleTreeLoading();
      });
      if (!retrieved) {
        return;
      }
      if (this.resetTree) {
        this.resetTree();
      }
      retrieved["hydra:member"].forEach((item) => {
        this.addTreeItem(item);
      });
    }
  },
  getters: {
    findTree: (state) => (id) => state.treeById[id],
    tree(state) {
      const tree = [];
      state.allTreeIds.forEach((id) => {
        const node = this.findTree(id);
        tree.push({
          "@id": node["@id"],
          id: node.id,
          children: node.children,
          name: node.name
        });
        return tree;
      });
      return tree;
    },
    rootNodes: (state) => state.list.value.filter((mediaNode) => !mediaNode.parent)
  }
});
const _sfc_main$1n = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    btnClass: null,
    clickHandler: null,
    iconComponent: null,
    label: null
  },
  setup(__props) {
    const props = __props;
    const mouseOn = vue_cjs_prod.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe), vue_cjs_prod.mergeProps({ class: "relative bg-black inline-flex p-2 flex-auto" }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(xe), null, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                    icon: props.iconComponent,
                    class: [props.btnClass, "h-6 w-6 fill-white"]
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(_sfc_main$1v, {
                      icon: props.iconComponent,
                      class: [props.btnClass, "h-6 w-6 fill-white"],
                      onMouseenter: ($event) => mouseOn.value = true,
                      onMouseleave: ($event) => mouseOn.value = false
                    }, null, 8, ["icon", "class", "onMouseenter", "onMouseleave"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we), {
              class: "absolute z-10 bg-sky-500 w-24 bottom-10 left-2",
              style: mouseOn.value ? null : { display: "none" },
              static: ""
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${serverRenderer.exports.ssrInterpolate(props.label)}`);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(props.label), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(xe), {
                onClick: vue_cjs_prod.withModifiers(props.clickHandler, ["prevent"])
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(_sfc_main$1v, {
                    icon: props.iconComponent,
                    class: [props.btnClass, "h-6 w-6 fill-white"],
                    onMouseenter: ($event) => mouseOn.value = true,
                    onMouseleave: ($event) => mouseOn.value = false
                  }, null, 8, ["icon", "class", "onMouseenter", "onMouseleave"])
                ]),
                _: 1
              }, 8, ["onClick"]),
              vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode(vue_cjs_prod.unref(we), {
                class: "absolute z-10 bg-sky-500 w-24 bottom-10 left-2",
                static: ""
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(props.label), 1)
                ]),
                _: 1
              }, 512), [
                [vue_cjs_prod.vShow, mouseOn.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Editor/EditorBtn.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const useMediaObjectStore = defineStore("media_objects", {
  state: () => {
    return __spreadValues({
      resource: "/media_objects"
    }, crudState);
  },
  actions: {
    async generateThumbnails(mediaObject) {
      return await this.$nuxt.$apiFetch(`${this.resource}/${mediaObject.uniqueId}/thumbnail`, {
        method: "POST",
        body: {}
      }).catch(async (e) => {
        await this.handleError(e);
      });
    }
  }
});
const useNotificationStore = defineStore("notification", {
  state: () => {
    return {
      show: false,
      color: "accent",
      text: "An error occurred",
      subText: "",
      timeout: 5e3
    };
  },
  actions: {
    setShow(show) {
      this.show = show;
    },
    setColor(color) {
      this.color = color;
    },
    setText(text) {
      this.text = text;
    },
    setSubText(subText) {
      this.subText = subText;
    },
    setTimeout(timeout) {
      this.timeout = timeout;
    },
    cleanState() {
      const that = this;
      setTimeout(() => {
        that.setShow(false);
      }, this.timeout);
    },
    showError(error) {
      this.showMessage(error, "accent");
    },
    showMessage(message, color = "primary") {
      this.setShow(true);
      this.setColor(color);
      this.setText(message);
      this.cleanState();
    }
  }
});
const _sfc_main$1m = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    thumbnails: null,
    links: null,
    removeThumbnail: null,
    removeLink: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col" }, _attrs))}><div class="flex-auto"><h3>Fichiers s\xE9lectionn\xE9s</h3></div>`);
      if (__props.thumbnails.length + __props.links.length === 0) {
        _push(`<div class="flex-auto"><p> Tu peux t\xE9leverser un fichier ou utiliser le navigateur pour s\xE9lectionner les fichiers \xE0 ins\xE9rer </p></div>`);
      } else {
        _push(`<div class="flex flex-auto"><div class="flex flex-col"><div class="flex flex-auto"><!--[-->`);
        serverRenderer.exports.ssrRenderList(__props.thumbnails, (thumbnail, i) => {
          _push(`<div class="self-center flex-auto"><div><img${serverRenderer.exports.ssrRenderAttr("src", thumbnail.src)} class="max-h-52"><div><button class="btn-remove-thumbnail bg-error h-6 w-16 rounded-lg">`);
          _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
            icon: "ri-close-line",
            class: "h-6 w-6"
          }, null, _parent));
          _push(`</button></div></div></div>`);
        });
        _push(`<!--]--></div><div class="flex flex-auto"><!--[-->`);
        serverRenderer.exports.ssrRenderList(__props.links, (link, i) => {
          _push(`<div class="flex-auto"><span>${serverRenderer.exports.ssrInterpolate(link.name)} <button class="btn-remove-thumbnail bg-error h-6 w-16 rounded-lg">`);
          _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
            icon: "ri-close-line",
            class: "h-6 w-6"
          }, null, _parent));
          _push(`</button></span></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_selection/FileSelection.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const _sfc_main$1l = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    handleUpload: null
  },
  setup(__props) {
    vue_cjs_prod.ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col mt-6" }, _attrs))}><input id="fileElem" type="file" multiple accept="image/*" style="${serverRenderer.exports.ssrRenderStyle({ "display": "none" })}"><button class="bg-primary text-white py-3 px-6 rounded-md w-fit"> T\xE9l\xE9verser des fichiers </button></div>`);
    };
  }
});
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_uploader/FileUploader.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const _sfc_main$1k = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaNode: { default: null },
    mediaNodeClickHandler: null,
    handleRootClick: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.mediaNode) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row w-full" }, _attrs))}>`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-home-fill",
          class: "h-6 w-6 cursor-pointer fill-primary"
        }, null, _parent));
        _push(`<!--[-->`);
        serverRenderer.exports.ssrRenderList(__props.mediaNode.breadcrumb, (crumb) => {
          _push(`<div class="inline-flex items-center cursor-pointer">\xA0`);
          _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
            icon: "ri-arrow-right-s-line",
            class: "h-6 w-6"
          }, null, _parent));
          _push(`<div class="cursor-pointer text-primary">${serverRenderer.exports.ssrInterpolate(crumb.name)}</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_navigator/FileNavigatorBreadCrumb.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const _sfc_main$1j = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaNode: { default: null },
    handleClick: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row py-3" }, _attrs))}><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.mediaNode.children, (child) => {
        _push(`<div class="w-fit p-3 bg-primary-dark text-white ml-2 first:ml-0 rounded-md hover:bg-primary"><button>${serverRenderer.exports.ssrInterpolate(child.name)}</button></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_navigator/FileNavigatorFolders.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const _sfc_main$1i = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaNode: { default: null },
    selectClickHandler: null,
    editClickHandler: null,
    removeClickHandler: null
  },
  setup(__props) {
    const props = __props;
    const selectionEnabled = vue_cjs_prod.inject("selectionEnabled");
    const mediaObjectStore = useMediaObjectStore();
    const loadObjects = () => {
      if (props.mediaNode) {
        mediaObjectStore.fetchAll({
          mediaNodes: props.mediaNode.id,
          "exists[original]": false
        });
      }
    };
    vue_cjs_prod.onMounted(() => {
      loadObjects();
    });
    vue_cjs_prod.watch(() => props.mediaNode, (mediaNode) => {
      loadObjects();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row flex-wrap gap-1" }, _attrs))}><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(mediaObjectStore).list, (item) => {
        _push(`<div class="flex flex-col"><div>`);
        if (item.isImage) {
          _push(`<img${serverRenderer.exports.ssrRenderAttr("src", item.contentUrl)} class="file-navigator-object max-h-80">`);
        } else {
          _push(`<div class="px-3 py-3 border border-primary">${serverRenderer.exports.ssrInterpolate(item.filePath)}</div>`);
        }
        _push(`</div><div class="bg-gray-100 p-1">`);
        if (item.customName) {
          _push(`<small>${serverRenderer.exports.ssrInterpolate(item.customName)}</small>`);
        } else {
          _push(`<small>Titre non d\xE9fini</small>`);
        }
        _push(`</div><div class="flex flex-row bg-gray-100 pb-1">`);
        if (vue_cjs_prod.unref(selectionEnabled)) {
          _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe), { class: "relative" }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(xe), { class: "rounded-lg text-sm text-white bg-primary hover:bg-primary-dark h-fit w-fit cursor-pointer py-2 px-3 uppercase" }, {
                  default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Ajouter... `);
                    } else {
                      return [
                        vue_cjs_prod.createTextVNode(" Ajouter... ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we), { class: "absolute z-10 bg-primary bottom-10 left-2 text-white rounded-lg" }, {
                  default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="w-full cursor-pointer hover:bg-primary-dark px-3 py-2"${_scopeId2}>Original</div><!--[-->`);
                      serverRenderer.exports.ssrRenderList(item.thumbnails, (thumbnail) => {
                        _push3(`<div class="w-full cursor-pointer hover:bg-primary-dark px-3 py-2"${_scopeId2}>${serverRenderer.exports.ssrInterpolate(thumbnail.size)}</div>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        vue_cjs_prod.createVNode("div", {
                          class: "w-full cursor-pointer hover:bg-primary-dark px-3 py-2",
                          onClick: ($event) => __props.selectClickHandler(item)
                        }, "Original", 8, ["onClick"]),
                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.thumbnails, (thumbnail) => {
                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                            class: "w-full cursor-pointer hover:bg-primary-dark px-3 py-2",
                            onClick: ($event) => __props.selectClickHandler(thumbnail)
                          }, vue_cjs_prod.toDisplayString(thumbnail.size), 9, ["onClick"]);
                        }), 256))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(xe), { class: "rounded-lg text-sm text-white bg-primary hover:bg-primary-dark h-fit w-fit cursor-pointer py-2 px-3 uppercase" }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createTextVNode(" Ajouter... ")
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(we), { class: "absolute z-10 bg-primary bottom-10 left-2 text-white rounded-lg" }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", {
                        class: "w-full cursor-pointer hover:bg-primary-dark px-3 py-2",
                        onClick: ($event) => __props.selectClickHandler(item)
                      }, "Original", 8, ["onClick"]),
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.thumbnails, (thumbnail) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                          class: "w-full cursor-pointer hover:bg-primary-dark px-3 py-2",
                          onClick: ($event) => __props.selectClickHandler(thumbnail)
                        }, vue_cjs_prod.toDisplayString(thumbnail.size), 9, ["onClick"]);
                      }), 256))
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-pencil-line",
          class: "fill-primary hover:fill-primary-dark h-8 w-8 cursor-pointer"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-secondary hover:fill-accent h-8 w-8 cursor-pointer"
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_navigator/FileNavigatorFiles.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const _sfc_main$1h = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaNode: { default: null },
    dialog: { type: Boolean },
    refresh: null
  },
  emits: ["update:dialog"],
  setup(__props, { emit }) {
    const props = __props;
    const show = vue_cjs_prod.computed({
      get() {
        return props.dialog;
      },
      set(value) {
        emit("update:dialog", value);
      }
    });
    const mediaNodeStore = useMediaNodeStore();
    const onFolderCreate = async (data) => {
      var _a2;
      show.value = false;
      if (!data.name) {
        return;
      }
      await mediaNodeStore.create({
        name: data.name,
        parent: (_a2 = props.mediaNode) == null ? void 0 : _a2["@id"]
      });
      await props.refresh();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe), vue_cjs_prod.mergeProps({
        appear: "",
        show: vue_cjs_prod.unref(show),
        as: "template"
      }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Me), {
              as: "div",
              open: vue_cjs_prod.unref(show),
              class: "relative z-10"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ae), { as: "h3" }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Ajouter un dossier`);
                                  } else {
                                    return [
                                      vue_cjs_prod.createTextVNode("Ajouter un dossier")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), {
                                class: "flex flex-row flex-wrap",
                                "validation-schema": { name: "min:3" }
                              }, {
                                default: vue_cjs_prod.withCtx(({ values, errors }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
                                      name: "name",
                                      error: errors.name,
                                      value: values.name,
                                      label: "Nom du dossier",
                                      class: "w-full"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId5}>Cr\xE9er le dossier</button>`);
                                  } else {
                                    return [
                                      vue_cjs_prod.createVNode(_sfc_main$1o, {
                                        name: "name",
                                        error: errors.name,
                                        value: values.name,
                                        label: "Nom du dossier",
                                        class: "w-full"
                                      }, null, 8, ["error", "value"]),
                                      vue_cjs_prod.createVNode("button", {
                                        type: "submit",
                                        class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                                      }, "Cr\xE9er le dossier")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), { as: "h3" }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode("Ajouter un dossier")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Form), {
                                  onSubmit: onFolderCreate,
                                  class: "flex flex-row flex-wrap",
                                  "validation-schema": { name: "min:3" }
                                }, {
                                  default: vue_cjs_prod.withCtx(({ values, errors }) => [
                                    vue_cjs_prod.createVNode(_sfc_main$1o, {
                                      name: "name",
                                      error: errors.name,
                                      value: values.name,
                                      label: "Nom du dossier",
                                      class: "w-full"
                                    }, null, 8, ["error", "value"]),
                                    vue_cjs_prod.createVNode("button", {
                                      type: "submit",
                                      class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                                    }, "Cr\xE9er le dossier")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), { as: "h3" }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode("Ajouter un dossier")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Form), {
                                onSubmit: onFolderCreate,
                                class: "flex flex-row flex-wrap",
                                "validation-schema": { name: "min:3" }
                              }, {
                                default: vue_cjs_prod.withCtx(({ values, errors }) => [
                                  vue_cjs_prod.createVNode(_sfc_main$1o, {
                                    name: "name",
                                    error: errors.name,
                                    value: values.name,
                                    label: "Nom du dossier",
                                    class: "w-full"
                                  }, null, 8, ["error", "value"]),
                                  vue_cjs_prod.createVNode("button", {
                                    type: "submit",
                                    class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                                  }, "Cr\xE9er le dossier")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), { as: "h3" }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode("Ajouter un dossier")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Form), {
                                  onSubmit: onFolderCreate,
                                  class: "flex flex-row flex-wrap",
                                  "validation-schema": { name: "min:3" }
                                }, {
                                  default: vue_cjs_prod.withCtx(({ values, errors }) => [
                                    vue_cjs_prod.createVNode(_sfc_main$1o, {
                                      name: "name",
                                      error: errors.name,
                                      value: values.name,
                                      label: "Nom du dossier",
                                      class: "w-full"
                                    }, null, 8, ["error", "value"]),
                                    vue_cjs_prod.createVNode("button", {
                                      type: "submit",
                                      class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                                    }, "Cr\xE9er le dossier")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Me), {
                as: "div",
                open: vue_cjs_prod.unref(show),
                onClose: ($event) => show.value = false,
                class: "relative z-10"
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), { as: "h3" }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode("Ajouter un dossier")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Form), {
                                onSubmit: onFolderCreate,
                                class: "flex flex-row flex-wrap",
                                "validation-schema": { name: "min:3" }
                              }, {
                                default: vue_cjs_prod.withCtx(({ values, errors }) => [
                                  vue_cjs_prod.createVNode(_sfc_main$1o, {
                                    name: "name",
                                    error: errors.name,
                                    value: values.name,
                                    label: "Nom du dossier",
                                    class: "w-full"
                                  }, null, 8, ["error", "value"]),
                                  vue_cjs_prod.createVNode("button", {
                                    type: "submit",
                                    class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                                  }, "Cr\xE9er le dossier")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["open", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_navigator/FileNavigatorContextMenu.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const _sfc_main$1g = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    editClickHandler: null,
    selectClickHandler: null,
    removeClickHandler: null,
    removeFolderClickHandler: null,
    modelValue: null,
    rootName: { default: null }
  },
  emits: ["update:modelValue"],
  async setup(__props, { expose, emit }) {
    let __temp, __restore;
    const props = __props;
    const folderDialog = vue_cjs_prod.ref(false);
    const currentMediaNode = vue_cjs_prod.computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const mediaNodeStore = useMediaNodeStore();
    const mediaObjectStore = useMediaObjectStore();
    const closeDetailPanel = vue_cjs_prod.inject("closeDetailPanel");
    const { refresh: getRoots } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("root-media-nodes", async () => {
      await mediaNodeStore.fetchAll({
        "exists[parent]": "false"
      });
    })), __temp = await __temp, __restore(), __temp);
    const handleMediaNodeClick = async (id) => {
      mediaObjectStore.resetList();
      await mediaNodeStore.load(id);
      currentMediaNode.value = mediaNodeStore[CRUD_MODE.EDITION].retrieved;
    };
    const handleRootClick = () => {
      currentMediaNode.value = null;
      closeDetailPanel && closeDetailPanel();
    };
    const refresh = async (mediaNode) => {
      if (!currentMediaNode.value || mediaNode === null) {
        getRoots();
      } else {
        if (!!mediaNode) {
          await mediaNodeStore.load(mediaNode.id);
        } else {
          await mediaNodeStore.load(currentMediaNode.value.id);
        }
        currentMediaNode.value = mediaNodeStore[CRUD_MODE.EDITION].retrieved;
      }
    };
    expose({
      refresh
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col" }, _attrs))}><div><h1 class="navigator-title">Navigateur de fichier</h1></div><div class="flex-auto py-2">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1k, {
        "media-node": props.modelValue,
        "media-node-click-handler": handleMediaNodeClick,
        "handle-root-click": handleRootClick
      }, null, _parent));
      _push(`</div>`);
      if (vue_cjs_prod.unref(currentMediaNode)) {
        _push(`<div class="flex-auto flex flex-col"><div class="flex flex-row h-16 items-center gap-x-2"><h2>Dossiers</h2>`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-folder-add-line",
          class: "fill-primary h-8 w-8 cursor-pointer"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-secondary hover:fill-accent h-8 w-8 cursor-pointer"
        }, null, _parent));
        _push(`</div>`);
        if (vue_cjs_prod.unref(currentMediaNode).children.length > 0) {
          _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1j, {
            "media-node": vue_cjs_prod.unref(currentMediaNode),
            "handle-click": handleMediaNodeClick
          }, null, _parent));
        } else {
          _push(`<p> Aucun dossier </p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(currentMediaNode) && vue_cjs_prod.unref(currentMediaNode).mediaObjects.length > 0) {
        _push(`<div class="flex-auto"><div class="py-2"><h2>Fichiers</h2></div><div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1i, {
          "select-click-handler": props.selectClickHandler,
          "edit-click-handler": props.editClickHandler,
          "remove-click-handler": props.removeClickHandler,
          "media-node": vue_cjs_prod.unref(currentMediaNode)
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!vue_cjs_prod.unref(currentMediaNode)) {
        _push(`<div class="flex-auto flex flex-col"><div class="flex flex-row h-16 items-center gap-x-2"><h2>S\xE9lectionner un dossier</h2>`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-folder-add-line",
          class: "fill-primary h-8 w-8 cursor-pointer"
        }, null, _parent));
        _push(`</div><div class="flex flex-row"><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(mediaNodeStore).list, (node) => {
          _push(`<div class="w-fit p-3 bg-primary-dark text-white ml-2 first:ml-0 rounded-md hover:bg-primary cursor-pointer">${serverRenderer.exports.ssrInterpolate(node.name)}</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1h, {
        "media-node": props.modelValue,
        refresh,
        dialog: folderDialog.value,
        "onUpdate:dialog": ($event) => folderDialog.value = $event
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_navigator/FileNavigator.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const _sfc_main$1f = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    item: null,
    level: null,
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    vue_cjs_prod.computed(() => props.context.tree);
    const ids = vue_cjs_prod.computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const isChecked = vue_cjs_prod.computed(() => {
      return ids.value.indexOf(props.item["@id"]) !== -1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FileTreeViewItem = vue_cjs_prod.resolveComponent("FileTreeViewItem", true);
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: `pl-${__props.level * 2}`
      }, _attrs))}><input type="checkbox"${serverRenderer.exports.ssrRenderAttr("value", __props.item["@id"])}${serverRenderer.exports.ssrIncludeBooleanAttr(Array.isArray(vue_cjs_prod.unref(isChecked)) ? serverRenderer.exports.ssrLooseContain(vue_cjs_prod.unref(isChecked), __props.item["@id"]) : vue_cjs_prod.unref(isChecked)) ? " checked" : ""} class="ring-primary text-primary border-0 rounded-md focus:ring-0"> ${serverRenderer.exports.ssrInterpolate(__props.item.name)} `);
      if (__props.item.children.length > 0) {
        _push(`<!--[-->`);
        serverRenderer.exports.ssrRenderList(__props.item.children, (child) => {
          _push(serverRenderer.exports.ssrRenderComponent(_component_FileTreeViewItem, {
            item: child,
            level: __props.level + 1,
            modelValue: vue_cjs_prod.unref(ids),
            "onUpdate:modelValue": ($event) => vue_cjs_prod.isRef(ids) ? ids.value = $event : null
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_details/FileTreeViewItem.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const _sfc_main$1e = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    name: null,
    tree: null,
    value: null
  },
  setup(__props) {
    const props = __props;
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta: meta2
    } = useField(props.name, void 0, {
      initialValue: props.value
    });
    const choices = vue_cjs_prod.ref(props.value ? [...props.value] : []);
    vue_cjs_prod.watch(choices, (newChoices) => {
      inputValue.value = newChoices;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col w-full" }, _attrs))}><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.tree, (item) => {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1f, {
          item,
          level: 1,
          modelValue: choices.value,
          "onUpdate:modelValue": ($event) => choices.value = $event
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_details/FileTreeView.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const _sfc_main$1d = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaObject: null,
    tree: null,
    handleSubmit: null,
    errors: null
  },
  emits: ["update:mediaObject"],
  setup(__props, { emit }) {
    const props = __props;
    const item = vue_cjs_prod.computed({
      get() {
        return props.mediaObject;
      },
      set(value) {
        emit("update:mediaObject", value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), vue_cjs_prod.mergeProps({
        class: "flex flex-row flex-wrap",
        "initial-values": vue_cjs_prod.unref(item)
      }, _attrs), {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "uniqueId",
              error: errors.uniqueId,
              value: values.uniqueId,
              label: "Identifiant unique",
              class: "w-full",
              "field-attrs": { disabled: "disabled" }
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "customName",
              error: errors.customName,
              value: values.customName,
              label: "Nom personnalis\xE9",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1e, {
              tree: __props.tree,
              name: "mediaNodes",
              value: values.mediaNodes
            }, null, _parent2, _scopeId));
            _push2(`<button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Mettre \xE0 jour</button>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "uniqueId",
                error: errors.uniqueId,
                value: values.uniqueId,
                label: "Identifiant unique",
                class: "w-full",
                "field-attrs": { disabled: "disabled" }
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "customName",
                error: errors.customName,
                value: values.customName,
                label: "Nom personnalis\xE9",
                class: "w-full"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1e, {
                tree: __props.tree,
                name: "mediaNodes",
                value: values.mediaNodes
              }, null, 8, ["tree", "value"]),
              vue_cjs_prod.createVNode("button", {
                type: "submit",
                class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
              }, "Mettre \xE0 jour")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_details/FileDetailsForm.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const _sfc_main$1c = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaObject: null,
    removeClickHandler: null
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    vue_cjs_prod.inject("closeDetailPanel");
    const item = vue_cjs_prod.ref(__spreadValues({}, props.mediaObject));
    const mediaNodeStore = useMediaNodeStore();
    const mediaObjectStore = useMediaObjectStore();
    const notificationStore = useNotificationStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("media-node-tree", async () => {
      await mediaNodeStore.fetchTree();
    })), await __temp, __restore();
    const onSendForm = async (data) => {
      try {
        await mediaObjectStore.update(data.uniqueId, data);
        notificationStore.showMessage("Fichier mis \xE0 jour");
      } catch (e) {
        notificationStore.showError("Probl\xE8me lors de la mise \xE0 jour du fichier");
      }
    };
    vue_cjs_prod.watch(() => props.mediaObject, (mediaObject) => {
      if (mediaObject) {
        item.value = __spreadValues({}, mediaObject);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col" }, _attrs))}><div class="flex flex-row"><h2 class="mb-3">D\xE9tail du fichier</h2>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
        icon: "ri-close-line",
        class: "h-6 w-6 rounded-md fill-primary justify-self-end"
      }, null, _parent));
      _push(`</div><div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1d, {
        tree: vue_cjs_prod.unref(mediaNodeStore).tree,
        mediaObject: item.value,
        "onUpdate:mediaObject": ($event) => item.value = $event,
        "handle-submit": onSendForm,
        errors: vue_cjs_prod.unref(mediaObjectStore)[vue_cjs_prod.unref(CRUD_MODE).EDITION].violations
      }, null, _parent));
      _push(`</div><div class="flex flex-col px-2"><h2 class="py-2">Miniatures</h2>`);
      if (item.value.thumbnails.length > 0) {
        _push(`<!--[-->`);
        serverRenderer.exports.ssrRenderList(item.value.thumbnails, (thumbnail) => {
          _push(`<div class="flex flex-col"><img${serverRenderer.exports.ssrRenderAttr("src", thumbnail.contentUrl)}${serverRenderer.exports.ssrRenderAttr("alt", thumbnail.customName || thumbnail.uniqueId)} class="w-fit h-auto object-scale-down">`);
          _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
            icon: "ri-delete-bin-line",
            class: "fill-secondary hover:fill-accent h-8 w-8 cursor-pointer"
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div><p>Aucune miniature</p></div>`);
      }
      _push(`<div class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark cursor-pointer text-center">G\xE9n\xE9rer les miniatures</div></div></div>`);
    };
  }
});
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/file_details/FileDetails.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const _sfc_main$1b = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    showSelection: { type: Boolean, default: true }
  },
  setup(__props, { expose }) {
    const props = __props;
    const notificationStore = useNotificationStore();
    const mediaObjectStore = useMediaObjectStore();
    const mediaNodeStore = useMediaNodeStore();
    const selectedMediaObject = vue_cjs_prod.ref(null);
    const links = vue_cjs_prod.ref([]);
    const thumbnails = vue_cjs_prod.ref([]);
    const currentMediaNode = vue_cjs_prod.ref(null);
    const fileNavigator = vue_cjs_prod.ref(null);
    vue_cjs_prod.provide("closeDetailPanel", () => {
      selectedMediaObject.value = null;
    });
    vue_cjs_prod.provide("selectionEnabled", props.showSelection);
    const reset = () => {
      thumbnails.value = [];
      links.value = [];
    };
    const selectMediaObject = (mediaObject) => {
      if (mediaObject.isImage) {
        selectImage(mediaObject);
      } else {
        selectLink(mediaObject);
      }
    };
    const selectImage = (res) => {
      var _a2;
      thumbnails.value.push({
        src: res.contentUrl,
        alt: (_a2 = res.customName) != null ? _a2 : res.uniqueId
      });
    };
    const selectLink = (res) => {
      links.value.push({
        src: res.contentUrl,
        name: res.filePath
      });
    };
    const removeThumbnail = (index2) => {
      thumbnails.value.splice(index2, 1);
    };
    const removeLink = (index2) => {
      links.value.splice(index2, 1);
    };
    const handleUpload = (files) => {
      if (!currentMediaNode.value) {
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mediaNodeId", currentMediaNode.value.id.toString());
        mediaObjectStore.create(formData).then((res) => {
          var _a2;
          if (res.isImage) {
            selectImage(res);
          } else {
            selectLink(res);
          }
          (_a2 = fileNavigator.value) == null ? void 0 : _a2.refresh();
        });
      }
    };
    const editMediaObject = (mediaObject) => {
      selectedMediaObject.value = mediaObject;
    };
    const removeMediaObject = async (mediaObject, isThumbnail = false) => {
      var _a2;
      try {
        await mediaObjectStore.remove(mediaObject.uniqueId);
        (_a2 = fileNavigator.value) == null ? void 0 : _a2.refresh();
        selectedMediaObject.value = null;
        notificationStore.showMessage("Media correctement supprim\xE9");
      } catch (e) {
        notificationStore.showError("Erreur dans la suppression du m\xE9dia");
      }
    };
    const removeFolderClickHandler = async (mediaNode) => {
      var _a2;
      try {
        await mediaNodeStore.remove(mediaNode.id);
        currentMediaNode.value = null;
        (_a2 = fileNavigator.value) == null ? void 0 : _a2.refresh(currentMediaNode.value);
        notificationStore.showMessage("Dossier correctement supprim\xE9");
      } catch (e) {
        notificationStore.showError("Erreur dans la suppression du dossier");
      }
    };
    expose({
      links,
      thumbnails,
      reset
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row" }, _attrs))}><div class="flex flex-col flex-auto w-2/3">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1g, {
        ref_key: "fileNavigator",
        ref: fileNavigator,
        "select-click-handler": selectMediaObject,
        "edit-click-handler": editMediaObject,
        "remove-click-handler": removeMediaObject,
        "remove-folder-click-handler": removeFolderClickHandler,
        "show-selection": __props.showSelection,
        modelValue: vue_cjs_prod.unref(currentMediaNode),
        "onUpdate:modelValue": ($event) => vue_cjs_prod.isRef(currentMediaNode) ? currentMediaNode.value = $event : null
      }, null, _parent));
      if (vue_cjs_prod.unref(currentMediaNode)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1l, { "handle-upload": handleUpload }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.showSelection) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1m, {
          thumbnails: vue_cjs_prod.unref(thumbnails),
          links: vue_cjs_prod.unref(links),
          "remove-link": removeLink,
          "remove-thumbnail": removeThumbnail
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (vue_cjs_prod.unref(selectedMediaObject)) {
        _push(`<div class="flex w-1/3">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1c, {
          "media-object": vue_cjs_prod.unref(selectedMediaObject),
          "remove-click-handler": removeMediaObject
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/file-manager/FileManager.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const _sfc_main$1a = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    editor: null
  },
  setup(__props) {
    const props = __props;
    const dialog = vue_cjs_prod.ref(false);
    const fileManager = vue_cjs_prod.ref(null);
    const injectFilesAndCloseDialog = () => {
      var _a2, _b;
      (_a2 = fileManager.value) == null ? void 0 : _a2.thumbnails.forEach((thumbnail) => {
        var _a3;
        (_a3 = props.editor) == null ? void 0 : _a3.chain().focus().setImage({ src: thumbnail.src, alt: thumbnail.alt }).run();
      });
      (_b = fileManager.value) == null ? void 0 : _b.links.forEach((link) => {
        var _a3, _b2, _c;
        const node = (_a3 = props.editor) == null ? void 0 : _a3.schema.text(link.name, [props == null ? void 0 : props.editor.schema.marks.link.create({ href: link.src, title: link.name })]);
        (_c = props.editor) == null ? void 0 : _c.view.dispatch((_b2 = props.editor) == null ? void 0 : _b2.state.tr.replaceSelectionWith(node, false));
      });
      dialog.value = false;
    };
    vue_cjs_prod.watch(dialog, () => {
      vue_cjs_prod.nextTick(() => {
        var _a2;
        (_a2 = fileManager.value) == null ? void 0 : _a2.reset();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe), { class: "relative bg-black flex-auto inline-flex p-2" }, {
        default: vue_cjs_prod.withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(xe), { class: "text-white" }, {
              default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                    icon: "ri-file-transfer-line",
                    class: "h-6 w-6 fill-white"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(_sfc_main$1v, {
                      icon: "ri-file-transfer-line",
                      class: "h-6 w-6 fill-white"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
              default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` T\xE9l\xE9verser un fichier `);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(" T\xE9l\xE9verser un fichier ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(xe), {
                class: "text-white",
                onClick: ($event) => dialog.value = true,
                onMouseover: ($event) => open = true,
                onMouseout: ($event) => open = false
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(_sfc_main$1v, {
                    icon: "ri-file-transfer-line",
                    class: "h-6 w-6 fill-white"
                  })
                ]),
                _: 2
              }, 1032, ["onClick", "onMouseover", "onMouseout"]),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createTextVNode(" T\xE9l\xE9verser un fichier ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe), {
        appear: "",
        show: dialog.value,
        as: "template"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Me), {
              as: "div",
              class: "relative z-10"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(je), { class: "w-4/5 transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` T\xE9l\xE9verser un fichier `);
                                  } else {
                                    return [
                                      vue_cjs_prod.createTextVNode(" T\xE9l\xE9verser un fichier ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(serverRenderer.exports.ssrRenderComponent(_sfc_main$1b, {
                                ref_key: "fileManager",
                                ref: fileManager
                              }, null, _parent5, _scopeId4));
                              _push5(`<div class="w-full h-1 m-2 border-b"${_scopeId4}></div><button class="bg-primary p-3 text-white uppercase"${_scopeId4}> Ins\xE9rer </button>`);
                            } else {
                              return [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" T\xE9l\xE9verser un fichier ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(_sfc_main$1b, {
                                  ref_key: "fileManager",
                                  ref: fileManager
                                }, null, 512),
                                vue_cjs_prod.createVNode("div", { class: "w-full h-1 m-2 border-b" }),
                                vue_cjs_prod.createVNode("button", {
                                  class: "bg-primary p-3 text-white uppercase",
                                  onClick: vue_cjs_prod.withModifiers(injectFilesAndCloseDialog, ["prevent"])
                                }, " Ins\xE9rer ", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-4/5 transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" T\xE9l\xE9verser un fichier ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(_sfc_main$1b, {
                                ref_key: "fileManager",
                                ref: fileManager
                              }, null, 512),
                              vue_cjs_prod.createVNode("div", { class: "w-full h-1 m-2 border-b" }),
                              vue_cjs_prod.createVNode("button", {
                                class: "bg-primary p-3 text-white uppercase",
                                onClick: vue_cjs_prod.withModifiers(injectFilesAndCloseDialog, ["prevent"])
                              }, " Ins\xE9rer ", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-4/5 transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" T\xE9l\xE9verser un fichier ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(_sfc_main$1b, {
                                  ref_key: "fileManager",
                                  ref: fileManager
                                }, null, 512),
                                vue_cjs_prod.createVNode("div", { class: "w-full h-1 m-2 border-b" }),
                                vue_cjs_prod.createVNode("button", {
                                  class: "bg-primary p-3 text-white uppercase",
                                  onClick: vue_cjs_prod.withModifiers(injectFilesAndCloseDialog, ["prevent"])
                                }, " Ins\xE9rer ", 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Me), {
                as: "div",
                onClose: ($event) => dialog.value = false,
                class: "relative z-10"
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-4/5 transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" T\xE9l\xE9verser un fichier ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(_sfc_main$1b, {
                                ref_key: "fileManager",
                                ref: fileManager
                              }, null, 512),
                              vue_cjs_prod.createVNode("div", { class: "w-full h-1 m-2 border-b" }),
                              vue_cjs_prod.createVNode("button", {
                                class: "bg-primary p-3 text-white uppercase",
                                onClick: vue_cjs_prod.withModifiers(injectFilesAndCloseDialog, ["prevent"])
                              }, " Ins\xE9rer ", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Editor/FileUploadBtn.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const _sfc_main$19 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    node: null,
    extension: null,
    updateAttributes: null
  },
  setup(__props) {
    const props = __props;
    const isActive = vue_cjs_prod.ref(false);
    const nodeDisplay = vue_cjs_prod.computed(() => {
      if (props.extension.options.inline) {
        return "inline-block";
      }
      return "block";
    });
    const handleMouseDown = (e) => {
      const startWidth = parseFloat(props.node.attrs.width.match(/(.+)px/)[1]);
      const startPosX = e.x;
      const onMouseMove = (e2) => {
        const diffInPx = startPosX - e2.pageX;
        const width = `${startWidth - diffInPx}px`;
        props.updateAttributes({
          width
        });
      };
      const onMouseUp = (e2) => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(NodeViewWrapper), vue_cjs_prod.mergeProps({
        style: { display: vue_cjs_prod.unref(nodeDisplay) }
      }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${serverRenderer.exports.ssrRenderClass([{ "is-active": isActive.value }, "img-container"])}" draggable="true" contenteditable="false" data-drag-handle style="${serverRenderer.exports.ssrRenderStyle({ width: __props.node.attrs.width })}"${_scopeId}><img${serverRenderer.exports.ssrRenderAttr("src", __props.node.attrs.src)}${serverRenderer.exports.ssrRenderAttr("alt", __props.node.attrs.title)} style="${serverRenderer.exports.ssrRenderStyle({ "width": "100%" })}"${_scopeId}><span style="${serverRenderer.exports.ssrRenderStyle(isActive.value ? null : { display: "none" })}" class="handle"${_scopeId}></span></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", {
                ref: "imgContainer",
                class: ["img-container", { "is-active": isActive.value }],
                draggable: "true",
                contenteditable: "false",
                "data-drag-handle": "",
                style: { width: __props.node.attrs.width }
              }, [
                vue_cjs_prod.createVNode("img", {
                  src: __props.node.attrs.src,
                  alt: __props.node.attrs.title,
                  style: { "width": "100%" },
                  onClick: ($event) => isActive.value = !isActive.value
                }, null, 8, ["src", "alt", "onClick"]),
                vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("span", {
                  class: "handle",
                  onMousedown: vue_cjs_prod.withModifiers(($event) => handleMouseDown($event), ["prevent"])
                }, null, 40, ["onMousedown"]), [
                  [vue_cjs_prod.vShow, isActive.value]
                ])
              ], 6)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Editor/resizable-image/ResizableImageNode.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const ResizableImage = Image.extend({
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(_sfc_main$19);
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
        default: "400px"
      }
    };
  }
});
const TextColor = Extension.create({
  name: "text-color",
  addGlobalAttributes() {
    return [{
      types: [
        "heading",
        "paragraph",
        "textStyle"
      ],
      attributes: {
        color: {
          default: null,
          renderHTML(attributes) {
            if (!attributes.color) {
              return {};
            }
            return {
              class: `${attributes.color}`,
              "data-color": attributes.color
            };
          },
          addAttributes() {
            return {
              color: {
                parseHTML: (element) => element.getAttribute("data-color")
              }
            };
          }
        }
      }
    }];
  },
  addCommands() {
    return {
      setColor: (color) => ({ chain }) => {
        return chain().setMark("textStyle", { color }).run();
      },
      removeColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { color: null }).run();
      }
    };
  }
});
const TextBackgroundColor = Extension.create({
  name: "text-background-color",
  addGlobalAttributes() {
    return [{
      types: [
        "heading",
        "paragraph",
        "textStyle"
      ],
      attributes: {
        backGroundColor: {
          default: null,
          renderHTML(attributes) {
            if (!attributes.backGroundColor) {
              return {};
            }
            return {
              class: `${attributes.backGroundColor}`,
              "data-background-color": attributes.backGroundColor
            };
          },
          addAttributes() {
            return {
              color: {
                parseHTML: (element) => element.getAttribute("data-background-color")
              }
            };
          }
        }
      }
    }];
  },
  addCommands() {
    return {
      setBackgroundColor: (backGroundColor) => ({ chain }) => {
        return chain().setMark("textStyle", { backGroundColor }).run();
      },
      removeBackgroundColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { backGroundColor: null }).run();
      }
    };
  }
});
const editorColors = [
  { name: "Titre", text: "text-primary-dark", background: "bg-primary-dark" },
  { name: "Primaire", text: "text-primary", background: "bg-primary" },
  { name: "Info", text: "text-info", background: "bg-info" },
  { name: "Erreur", text: "text-error", background: "bg-error" },
  { name: "Accent", text: "text-accent", background: "bg-accent" },
  { name: "Secondaire", text: "text-secondary", background: "bg-secondary" },
  { name: "Light secondaire", text: "text-secondary-light", background: "bg-secondary-light" },
  { name: "Noir", text: "text-black", background: "bg-black" },
  { name: "Blanc", text: "text-white", background: "bg-white" }
];
const _sfc_main$18 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    editor: null
  },
  setup(__props) {
    const props = __props;
    const dialog = vue_cjs_prod.ref(false);
    const colors = editorColors;
    const selectedColor = vue_cjs_prod.ref(null);
    const chooseColor = (color) => {
      var _a2;
      (_a2 = props.editor) == null ? void 0 : _a2.chain().focus().setColor(color.text).run();
      dialog.value = false;
    };
    const removeColor = () => {
      var _a2;
      (_a2 = props.editor) == null ? void 0 : _a2.chain().focus().removeColor().run();
      dialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe), { class: "relative bg-black flex-auto inline-flex p-2" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(xe), {
              class: ["text-white", props.btnClass]
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$1v), {
                    icon: "ri-font-color",
                    class: "h-6 w-6 fill-white"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(_sfc_main$1v), {
                      icon: "ri-font-color",
                      class: "h-6 w-6 fill-white"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Couleur du text `);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(" Couleur du text ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(xe), {
                class: ["text-white", props.btnClass],
                onClick: ($event) => dialog.value = true
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(_sfc_main$1v), {
                    icon: "ri-font-color",
                    class: "h-6 w-6 fill-white"
                  })
                ]),
                _: 1
              }, 8, ["class", "onClick"]),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createTextVNode(" Couleur du text ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe), {
        appear: "",
        show: dialog.value,
        as: "template"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Me), {
              as: "div",
              class: "relative z-10"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` S\xE9lectionne une couleur `);
                                  } else {
                                    return [
                                      vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(De), {
                                modelValue: selectedColor.value,
                                "onUpdate:modelValue": ($event) => selectedColor.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                            _push7(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ce), {
                                              key: index2,
                                              class: ["cursor-pointer", color.text]
                                            }, {
                                              default: vue_cjs_prod.withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${serverRenderer.exports.ssrInterpolate(color.name)}`);
                                                } else {
                                                  return [
                                                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(color.name), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                          _push7(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ce), { class: "cursor-pointer" }, {
                                            default: vue_cjs_prod.withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Aucune couleur `);
                                              } else {
                                                return [
                                                  vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                              return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                                key: index2,
                                                onClick: ($event) => chooseColor(color),
                                                class: ["cursor-pointer", color.text]
                                              }, {
                                                default: vue_cjs_prod.withCtx(() => [
                                                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(color.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick", "class"]);
                                            }), 128)),
                                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                              onClick: removeColor,
                                              class: "cursor-pointer"
                                            }, {
                                              default: vue_cjs_prod.withCtx(() => [
                                                vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                            return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                              key: index2,
                                              onClick: ($event) => chooseColor(color),
                                              class: ["cursor-pointer", color.text]
                                            }, {
                                              default: vue_cjs_prod.withCtx(() => [
                                                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(color.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick", "class"]);
                                          }), 128)),
                                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                            onClick: removeColor,
                                            class: "cursor-pointer"
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                  modelValue: selectedColor.value,
                                  "onUpdate:modelValue": ($event) => selectedColor.value = $event
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx(() => [
                                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                            key: index2,
                                            onClick: ($event) => chooseColor(color),
                                            class: ["cursor-pointer", color.text]
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(color.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "class"]);
                                        }), 128)),
                                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          onClick: removeColor,
                                          class: "cursor-pointer"
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                modelValue: selectedColor.value,
                                "onUpdate:modelValue": ($event) => selectedColor.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                          key: index2,
                                          onClick: ($event) => chooseColor(color),
                                          class: ["cursor-pointer", color.text]
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(color.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "class"]);
                                      }), 128)),
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                        onClick: removeColor,
                                        class: "cursor-pointer"
                                      }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                  modelValue: selectedColor.value,
                                  "onUpdate:modelValue": ($event) => selectedColor.value = $event
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx(() => [
                                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                            key: index2,
                                            onClick: ($event) => chooseColor(color),
                                            class: ["cursor-pointer", color.text]
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(color.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "class"]);
                                        }), 128)),
                                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          onClick: removeColor,
                                          class: "cursor-pointer"
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Me), {
                as: "div",
                onClose: ($event) => dialog.value = false,
                class: "relative z-10"
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                modelValue: selectedColor.value,
                                "onUpdate:modelValue": ($event) => selectedColor.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                          key: index2,
                                          onClick: ($event) => chooseColor(color),
                                          class: ["cursor-pointer", color.text]
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(color.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "class"]);
                                      }), 128)),
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                        onClick: removeColor,
                                        class: "cursor-pointer"
                                      }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Editor/TextColorBtn.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const _sfc_main$17 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    editor: null
  },
  setup(__props) {
    const props = __props;
    const dialog = vue_cjs_prod.ref(false);
    const colors = editorColors;
    const selectedColor = vue_cjs_prod.ref(null);
    const chooseBackgroundColor = (backgroundColor) => {
      var _a2;
      (_a2 = props.editor) == null ? void 0 : _a2.chain().focus().setBackgroundColor(backgroundColor.background).run();
      dialog.value = false;
    };
    const removeBackgroundColor = () => {
      var _a2;
      (_a2 = props.editor) == null ? void 0 : _a2.chain().focus().removeBackgroundColor().run();
      dialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe), { class: "relative bg-black flex-auto inline-flex p-2" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(xe), {
              class: ["text-white", props.btnClass]
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$1v), {
                    icon: "ri-paint-fill",
                    class: "h-6 w-6 fill-white"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(_sfc_main$1v), {
                      icon: "ri-paint-fill",
                      class: "h-6 w-6 fill-white"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Couleur de fond `);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(" Couleur de fond ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(xe), {
                class: ["text-white", props.btnClass],
                onClick: ($event) => dialog.value = true
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(_sfc_main$1v), {
                    icon: "ri-paint-fill",
                    class: "h-6 w-6 fill-white"
                  })
                ]),
                _: 1
              }, 8, ["class", "onClick"]),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createTextVNode(" Couleur de fond ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe), {
        appear: "",
        show: dialog.value,
        as: "template"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Me), {
              as: "div",
              class: "relative z-10"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` S\xE9lectionne une couleur `);
                                  } else {
                                    return [
                                      vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(De), {
                                modelValue: selectedColor.value,
                                "onUpdate:modelValue": ($event) => selectedColor.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                            _push7(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ce), {
                                              key: index2,
                                              class: ["cursor-pointer", color.background]
                                            }, {
                                              default: vue_cjs_prod.withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` \xA0 `);
                                                } else {
                                                  return [
                                                    vue_cjs_prod.createTextVNode(" \xA0 ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                          _push7(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ce), { class: "cursor-pointer" }, {
                                            default: vue_cjs_prod.withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Aucune couleur `);
                                              } else {
                                                return [
                                                  vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                              return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                                key: index2,
                                                onClick: ($event) => chooseBackgroundColor(color),
                                                class: ["cursor-pointer", color.background]
                                              }, {
                                                default: vue_cjs_prod.withCtx(() => [
                                                  vue_cjs_prod.createTextVNode(" \xA0 ")
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick", "class"]);
                                            }), 128)),
                                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                              onClick: removeBackgroundColor,
                                              class: "cursor-pointer"
                                            }, {
                                              default: vue_cjs_prod.withCtx(() => [
                                                vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                            return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                              key: index2,
                                              onClick: ($event) => chooseBackgroundColor(color),
                                              class: ["cursor-pointer", color.background]
                                            }, {
                                              default: vue_cjs_prod.withCtx(() => [
                                                vue_cjs_prod.createTextVNode(" \xA0 ")
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick", "class"]);
                                          }), 128)),
                                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                            onClick: removeBackgroundColor,
                                            class: "cursor-pointer"
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                  modelValue: selectedColor.value,
                                  "onUpdate:modelValue": ($event) => selectedColor.value = $event
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx(() => [
                                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                            key: index2,
                                            onClick: ($event) => chooseBackgroundColor(color),
                                            class: ["cursor-pointer", color.background]
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(" \xA0 ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "class"]);
                                        }), 128)),
                                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          onClick: removeBackgroundColor,
                                          class: "cursor-pointer"
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                modelValue: selectedColor.value,
                                "onUpdate:modelValue": ($event) => selectedColor.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                          key: index2,
                                          onClick: ($event) => chooseBackgroundColor(color),
                                          class: ["cursor-pointer", color.background]
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" \xA0 ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "class"]);
                                      }), 128)),
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                        onClick: removeBackgroundColor,
                                        class: "cursor-pointer"
                                      }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                  modelValue: selectedColor.value,
                                  "onUpdate:modelValue": ($event) => selectedColor.value = $event
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx(() => [
                                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                            key: index2,
                                            onClick: ($event) => chooseBackgroundColor(color),
                                            class: ["cursor-pointer", color.background]
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(" \xA0 ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "class"]);
                                        }), 128)),
                                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          onClick: removeBackgroundColor,
                                          class: "cursor-pointer"
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Me), {
                as: "div",
                onClose: ($event) => dialog.value = false,
                class: "relative z-10"
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                modelValue: selectedColor.value,
                                "onUpdate:modelValue": ($event) => selectedColor.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(colors), (color, index2) => {
                                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(Ce), {
                                          key: index2,
                                          onClick: ($event) => chooseBackgroundColor(color),
                                          class: ["cursor-pointer", color.background]
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" \xA0 ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "class"]);
                                      }), 128)),
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                        onClick: removeBackgroundColor,
                                        class: "cursor-pointer"
                                      }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          vue_cjs_prod.createTextVNode(" Aucune couleur ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Editor/TextBackgroundColorBtn.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const _sfc_main$16 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    editor: null
  },
  setup(__props) {
    const props = __props;
    const fonts = [
      "Permanent Marker",
      "Amatic SC",
      "Caveat",
      "Helvetica"
    ];
    const dialog = vue_cjs_prod.ref(false);
    const selectedFont = vue_cjs_prod.ref(null);
    const selectFontFamily = (font) => {
      var _a2;
      (_a2 = props.editor) == null ? void 0 : _a2.chain().focus().setFontFamily(font).run();
      dialog.value = false;
    };
    const removeFontFamily = () => {
      var _a2;
      (_a2 = props.editor) == null ? void 0 : _a2.chain().focus().unsetFontFamily().run();
      dialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe), { class: "relative bg-black flex-auto inline-flex p-2" }, {
        default: vue_cjs_prod.withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(xe), { class: "text-white" }, {
              default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$1v), {
                    icon: "ri-font-size",
                    class: "h-6 w-6 fill-white"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(_sfc_main$1v), {
                      icon: "ri-font-size",
                      class: "h-6 w-6 fill-white"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
              default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Police de caract\xE8re `);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(" Police de caract\xE8re ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(xe), {
                class: "text-white",
                onClick: ($event) => dialog.value = true,
                onMouseover: ($event) => open = true,
                onMouseout: ($event) => open = false
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(_sfc_main$1v), {
                    icon: "ri-font-size",
                    class: "h-6 w-6 fill-white"
                  })
                ]),
                _: 2
              }, 1032, ["onClick", "onMouseover", "onMouseout"]),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(we), { class: "absolute z-10" }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createTextVNode(" Police de caract\xE8re ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe), {
        appear: "",
        show: dialog.value,
        as: "template"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Me), {
              as: "div",
              class: "relative z-10"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` S\xE9lectionne une couleur `);
                                  } else {
                                    return [
                                      vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(De), {
                                modelValue: selectedFont.value,
                                "onUpdate:modelValue": ($event) => selectedFont.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          serverRenderer.exports.ssrRenderList(fonts, (font, index2) => {
                                            _push7(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ce), {
                                              key: index2,
                                              class: "cursor-pointer",
                                              style: "font-family: " + font
                                            }, {
                                              default: vue_cjs_prod.withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${serverRenderer.exports.ssrInterpolate(font)}`);
                                                } else {
                                                  return [
                                                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(font), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                          _push7(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ce), { class: "cursor-pointer" }, {
                                            default: vue_cjs_prod.withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Police par d\xE9faut `);
                                              } else {
                                                return [
                                                  vue_cjs_prod.createTextVNode(" Police par d\xE9faut ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(fonts, (font, index2) => {
                                              return vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                                key: index2,
                                                onClick: ($event) => selectFontFamily(font),
                                                class: "cursor-pointer",
                                                style: "font-family: " + font
                                              }, {
                                                default: vue_cjs_prod.withCtx(() => [
                                                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(font), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick", "style"]);
                                            }), 64)),
                                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                              onClick: removeFontFamily,
                                              class: "cursor-pointer"
                                            }, {
                                              default: vue_cjs_prod.withCtx(() => [
                                                vue_cjs_prod.createTextVNode(" Police par d\xE9faut ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(fonts, (font, index2) => {
                                            return vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                              key: index2,
                                              onClick: ($event) => selectFontFamily(font),
                                              class: "cursor-pointer",
                                              style: "font-family: " + font
                                            }, {
                                              default: vue_cjs_prod.withCtx(() => [
                                                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(font), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick", "style"]);
                                          }), 64)),
                                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                            onClick: removeFontFamily,
                                            class: "cursor-pointer"
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(" Police par d\xE9faut ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                  modelValue: selectedFont.value,
                                  "onUpdate:modelValue": ($event) => selectedFont.value = $event
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx(() => [
                                        (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(fonts, (font, index2) => {
                                          return vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                            key: index2,
                                            onClick: ($event) => selectFontFamily(font),
                                            class: "cursor-pointer",
                                            style: "font-family: " + font
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(font), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "style"]);
                                        }), 64)),
                                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          onClick: removeFontFamily,
                                          class: "cursor-pointer"
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" Police par d\xE9faut ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                modelValue: selectedFont.value,
                                "onUpdate:modelValue": ($event) => selectedFont.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(fonts, (font, index2) => {
                                        return vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          key: index2,
                                          onClick: ($event) => selectFontFamily(font),
                                          class: "cursor-pointer",
                                          style: "font-family: " + font
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(font), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "style"]);
                                      }), 64)),
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                        onClick: removeFontFamily,
                                        class: "cursor-pointer"
                                      }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          vue_cjs_prod.createTextVNode(" Police par d\xE9faut ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                  modelValue: selectedFont.value,
                                  "onUpdate:modelValue": ($event) => selectedFont.value = $event
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                      default: vue_cjs_prod.withCtx(() => [
                                        (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(fonts, (font, index2) => {
                                          return vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                            key: index2,
                                            onClick: ($event) => selectFontFamily(font),
                                            class: "cursor-pointer",
                                            style: "font-family: " + font
                                          }, {
                                            default: vue_cjs_prod.withCtx(() => [
                                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(font), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "style"]);
                                        }), 64)),
                                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          onClick: removeFontFamily,
                                          class: "cursor-pointer"
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(" Police par d\xE9faut ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Me), {
                as: "div",
                onClose: ($event) => dialog.value = false,
                class: "relative z-10"
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" S\xE9lectionne une couleur ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(De), {
                                modelValue: selectedFont.value,
                                "onUpdate:modelValue": ($event) => selectedFont.value = $event
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(ke), { static: "" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(fonts, (font, index2) => {
                                        return vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                          key: index2,
                                          onClick: ($event) => selectFontFamily(font),
                                          class: "cursor-pointer",
                                          style: "font-family: " + font
                                        }, {
                                          default: vue_cjs_prod.withCtx(() => [
                                            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(font), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "style"]);
                                      }), 64)),
                                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ce), {
                                        onClick: removeFontFamily,
                                        class: "cursor-pointer"
                                      }, {
                                        default: vue_cjs_prod.withCtx(() => [
                                          vue_cjs_prod.createTextVNode(" Police par d\xE9faut ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Editor/FontFamilyBtn.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const _sfc_main$15 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    name: null,
    value: null,
    label: null
  },
  setup(__props, { expose }) {
    const props = __props;
    const editor = vue_cjs_prod.ref(null);
    const name = vue_cjs_prod.toRef(props, "name");
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta: meta2
    } = useField(name, void 0, {
      initialValue: props.value
    });
    vue_cjs_prod.onMounted(() => {
      editor.value = new Editor({
        content: inputValue.value,
        extensions: [
          Starterkit,
          TextAlign.configure({
            types: ["heading", "paragraph"]
          }),
          Typography,
          Table.configure({
            resizable: true
          }),
          TableRow,
          TableHeader,
          TableCell,
          ResizableImage.configure({ inline: true }),
          Link$1.configure({ openOnClick: true }),
          TextStyle,
          TextColor,
          TextBackgroundColor,
          FontFamily
        ],
        onUpdate: ({ editor: editor2 }) => {
          inputValue.value = editor2.getHTML();
        }
      });
    });
    vue_cjs_prod.onBeforeUnmount(() => {
      var _a2;
      (_a2 = editor.value) == null ? void 0 : _a2.destroy();
    });
    const clearContent = (e) => {
      setContent("");
    };
    const addImage = () => {
      var _a2;
      const url = window.prompt("URL");
      if (url) {
        (_a2 = editor.value) == null ? void 0 : _a2.chain().focus().setImage({ src: url }).run();
      }
    };
    const setLink = () => {
      var _a2;
      const url = window.prompt("URL");
      if (url) {
        (_a2 = editor.value) == null ? void 0 : _a2.chain().focus().setLink({ href: url }).run();
      }
    };
    const setContent = (content) => {
      var _a2;
      (_a2 = editor.value) == null ? void 0 : _a2.commands.setContent(content, false);
    };
    vue_cjs_prod.watch(() => props.modelValue, (newValue) => {
      var _a2;
      const isSame = ((_a2 = editor.value) == null ? void 0 : _a2.getHTML()) === newValue;
      if (isSame) {
        return;
      }
      setContent(newValue || "");
    });
    expose({ setContent });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col" }, _attrs))}><div class="${serverRenderer.exports.ssrRenderClass([{ "text-accent": !!vue_cjs_prod.unref(errorMessage), "text-primary": !!__props.value && !vue_cjs_prod.unref(errorMessage) }, "flex"])}">${serverRenderer.exports.ssrInterpolate(__props.label)} `);
      if (vue_cjs_prod.unref(errorMessage)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(errorMessage))}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(errorMessage)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (vue_cjs_prod.unref(editor)) {
        _push(`<div class="editor flex flex-wrap">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Gras",
          "btn-class": { "fill-stone-400": vue_cjs_prod.unref(editor).isActive("bold") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleBold().run(),
          "icon-component": "ri-bold"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Italique",
          "btn-class": { "fill-stone-400": vue_cjs_prod.unref(editor).isActive("italic") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleItalic().run(),
          "icon-component": "ri-italic"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Barrer",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("strike") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleStrike().run(),
          "icon-component": "ri-strikethrough"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$18, { editor: vue_cjs_prod.unref(editor) }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$17, { editor: vue_cjs_prod.unref(editor) }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$16, { editor: vue_cjs_prod.unref(editor) }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Supprimer le style de la s\xE9lection",
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().unsetAllMarks().run(),
          "icon-component": "ri-format-clear"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Supprimer le style du bloc",
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().clearNodes().run(),
          "icon-component": "ri-eraser-line"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Paragraphe",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("paragraph") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().setParagraph().run(),
          "icon-component": "ri-paragraph"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Taille xxl",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("heading", { level: 1 }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleHeading({ level: 1 }).run(),
          "icon-component": "ri-h-1"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Taille xl",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("heading", { level: 2 }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleHeading({ level: 2 }).run(),
          "icon-component": "ri-h-2"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Taille l",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("heading", { level: 3 }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleHeading({ level: 3 }).run(),
          "icon-component": "ri-h-3"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Taille m",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("heading", { level: 4 }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleHeading({ level: 4 }).run(),
          "icon-component": "ri-h-4"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Taille s",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("heading", { level: 5 }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleHeading({ level: 5 }).run(),
          "icon-component": "ri-h-5"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Taille xs",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("heading", { level: 6 }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleHeading({ level: 6 }).run(),
          "icon-component": "ri-h-6"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Liste",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("bulletList") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleBulletList().run(),
          "icon-component": "ri-list-unordered"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Liste num\xE9rot\xE9e",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("orderedList") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleOrderedList().run(),
          "icon-component": "ri-list-ordered"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Bloc de code",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("codeBlock") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleCodeBlock().run(),
          "icon-component": "ri-code-line"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Citation",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive("blockquote") },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().toggleCodeBlock().run(),
          "icon-component": "ri-double-quotes-l"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "S\xE9parateur horizontal",
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().setHorizontalRule().run(),
          "icon-component": "ri-separator"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Undo",
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().undo().run(),
          "icon-component": "ri-arrow-go-back-line"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Redo",
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().redo().run(),
          "icon-component": "ri-arrow-go-forward-line"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Aligner \xE0 gauche",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive({ textAlign: "left" }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().setTextAlign("left").run(),
          "icon-component": "ri-align-left"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Centrer",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive({ textAlign: "center" }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().setTextAlign("center").run(),
          "icon-component": "ri-align-center"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Aligner \xE0 droite",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive({ textAlign: "right" }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().setTextAlign("right").run(),
          "icon-component": "ri-align-right"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Justifier",
          "btn-class": { "grey darken-3": vue_cjs_prod.unref(editor).isActive({ textAlign: "justify" }) },
          "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().setTextAlign("justify").run(),
          "icon-component": "ri-align-justify"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Ajouter une image",
          "btn-class": null,
          "click-handler": addImage,
          "icon-component": "ri-image-line"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1a, { editor: vue_cjs_prod.unref(editor) }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Ajouter un lien",
          "click-handler": setLink,
          "btn-class": { "is-active": vue_cjs_prod.unref(editor).isActive("link") },
          "icon-component": "ri-link"
        }, null, _parent));
        if (vue_cjs_prod.unref(editor).isActive("link")) {
          _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
            label: "Supprimer le lien",
            "icon-component": "ri-link-unlink",
            "click-handler": () => vue_cjs_prod.unref(editor).chain().focus().unsetLink().run()
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "supplemental_btns", {}, null, _push, _parent);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1n, {
          label: "Supprimer le contenu",
          "icon-component": "ri-delete-bin-2-line",
          "click-handler": clearContent
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(EditorContent), {
        class: "border border-2 border-black",
        editor: vue_cjs_prod.unref(editor)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Editor.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const _sfc_main$14 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    article: null,
    submitHandler: null,
    errors: null
  },
  emits: ["update:article"],
  async setup(__props, { emit }) {
    let __temp, __restore;
    const props = __props;
    const item = vue_cjs_prod.computed({
      get() {
        return props.article;
      },
      set(value) {
        emit("update:article", value);
      }
    });
    const mediaNodeStore = useMediaNodeStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("media-node-items", () => mediaNodeStore.fetchSelectItems())), await __temp, __restore();
    const mediaNodes = mediaNodeStore.selectItemList();
    const schema = {
      title: "required|min:3|max:60",
      preview: "required|min:20|max:500",
      content: "required|min:20"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), vue_cjs_prod.mergeProps({
        class: "flex flex-row flex-wrap",
        "validation-schema": schema,
        "initial-values": vue_cjs_prod.unref(item)
      }, _attrs), {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "title",
              error: errors.title,
              value: values.title,
              label: "Titre",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1q, {
              name: "isPublished",
              error: errors.isPublished,
              label: "Publier",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1p, {
              name: "mediaNode",
              options: vue_cjs_prod.unref(mediaNodes),
              error: errors.mediaNode,
              value: values.mediaNode,
              label: "Gallerie",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1s, {
              class: "w-1/2",
              "initial-tags": (_a2 = vue_cjs_prod.unref(item).tags) != null ? _a2 : []
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "preview",
              error: errors.preview,
              value: values.preview,
              label: "Preview",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`<input type="hidden" name="tags"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_ClientOnly, null, {
              default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vue_cjs_prod.unref(item).content !== void 0) {
                    _push3(serverRenderer.exports.ssrRenderComponent(_sfc_main$15, {
                      name: "content",
                      ref: "editor",
                      class: "bg-white w-full my-3 px-3",
                      label: "Contenu de la page",
                      value: vue_cjs_prod.unref(item).content
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    vue_cjs_prod.unref(item).content !== void 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$15, {
                      key: 0,
                      name: "content",
                      ref: "editor",
                      class: "bg-white w-full my-3 px-3",
                      label: "Contenu de la page",
                      value: vue_cjs_prod.unref(item).content
                    }, null, 8, ["value"])) : vue_cjs_prod.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="flex w-full justify-end px-3"${_scopeId}><button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Sauvegarder</button><button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId}>R\xE9initialiser</button></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "title",
                error: errors.title,
                value: values.title,
                label: "Titre",
                class: "w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1q, {
                name: "isPublished",
                error: errors.isPublished,
                label: "Publier",
                class: "w-1/2"
              }, null, 8, ["error"]),
              vue_cjs_prod.createVNode(_sfc_main$1p, {
                name: "mediaNode",
                options: vue_cjs_prod.unref(mediaNodes),
                error: errors.mediaNode,
                value: values.mediaNode,
                label: "Gallerie",
                class: "w-1/2"
              }, null, 8, ["options", "error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1s, {
                class: "w-1/2",
                "initial-tags": (_b = vue_cjs_prod.unref(item).tags) != null ? _b : []
              }, null, 8, ["initial-tags"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "preview",
                error: errors.preview,
                value: values.preview,
                label: "Preview",
                class: "w-full"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("input", {
                type: "hidden",
                name: "tags"
              }),
              vue_cjs_prod.createVNode(_component_ClientOnly, null, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.unref(item).content !== void 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$15, {
                    key: 0,
                    name: "content",
                    ref: "editor",
                    class: "bg-white w-full my-3 px-3",
                    label: "Contenu de la page",
                    value: vue_cjs_prod.unref(item).content
                  }, null, 8, ["value"])) : vue_cjs_prod.createCommentVNode("", true)
                ]),
                _: 1
              }),
              vue_cjs_prod.createVNode("div", { class: "flex w-full justify-end px-3" }, [
                vue_cjs_prod.createVNode("button", {
                  type: "submit",
                  class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                }, "Sauvegarder"),
                vue_cjs_prod.createVNode("button", {
                  type: "reset",
                  class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
                }, "R\xE9initialiser")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/blog/FormComponent.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const _sfc_main$13 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogArticleStore = useBlogArticleStore();
    const route = useRoute();
    const articleEdition = useState("page-edition", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await blogArticleStore.load(route.params.id, {
        "groups[]": "blog_article:read:edition"
      });
      articleEdition.value = blogArticleStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await blogArticleStore.update(data.id, data);
        notificationStore.showMessage("Article correctement \xE9dit\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la sauvegarde l'article, v\xE9rifie le formulaire");
        actions.setErrors(blogArticleStore[CRUD_MODE.Edition].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">\xC9dition d&#39;un article</h1>`);
      if (vue_cjs_prod.unref(articleEdition)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$14, {
          article: vue_cjs_prod.unref(articleEdition),
          "onUpdate:article": ($event) => vue_cjs_prod.isRef(articleEdition) ? articleEdition.value = $event : null,
          "submit-handler": submit,
          errors: vue_cjs_prod.unref(blogArticleStore)[vue_cjs_prod.unref(CRUD_MODE).EDITION].violations
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog/[id].vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const meta$m = {
  layout: "admin"
};
const _sfc_main$12 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const blogArticleStore = useBlogArticleStore();
    useRoute();
    useNuxtApp();
    const articleCreation = useState("article-creation", () => {
      return {
        content: "",
        isPublished: false
      };
    });
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      try {
        await blogArticleStore.create(data);
        notificationStore.showMessage("Article correctement cr\xE9e");
        navigateTo({ name: "admin-blog-id", params: { id: blogArticleStore[CRUD_MODE.CREATION].created.id } });
      } catch (e) {
        notificationStore.showError("Erreur dans la cr\xE9ation l'article, v\xE9rifie le formulaire");
        actions.setErrors(blogArticleStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">Cr\xE9ation d&#39;une article</h1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$14, {
        article: vue_cjs_prod.unref(articleCreation),
        "onUpdate:article": ($event) => vue_cjs_prod.isRef(articleCreation) ? articleCreation.value = $event : null,
        "submit-handler": submit,
        errors: vue_cjs_prod.unref(blogArticleStore)[vue_cjs_prod.unref(CRUD_MODE).CREATION].violations
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog/add.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const meta$l = {
  layout: "admin"
};
const _sfc_main$11 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    handleRemove: null,
    title: { default: "Suppression de l'\xE9l\xE9ment" },
    description: { default: "Ceci va supprimer d\xE9finitivement l'\xE9l\xE9ment" }
  },
  emits: ["update:open"],
  setup(__props, { emit }) {
    const props = __props;
    const isOpen = vue_cjs_prod.computed({
      get() {
        return props.open;
      },
      set(value) {
        emit("update:open", value);
      }
    });
    function setIsOpen(value) {
      isOpen.value = value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(serverRenderer.exports.ssrRenderComponent(_component_ClientOnly, _attrs, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Me), {
              open: vue_cjs_prod.unref(isOpen),
              class: "relative z-50"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="fixed inset-0 bg-black/30" aria-hidden="true"${_scopeId2}></div><div class="fixed inset-0 flex items-center justify-center p-4"${_scopeId2}>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(je), { class: "w-full max-w-sm rounded bg-white p-4 rounded-lg flex flex-col" }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ae), { class: "pb-2" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${serverRenderer.exports.ssrInterpolate(__props.title)}`);
                            } else {
                              return [
                                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Le), { class: "pb-2" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${serverRenderer.exports.ssrInterpolate(__props.description)}`);
                            } else {
                              return [
                                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.description), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        _push4(`<div class="self-center"${_scopeId3}><button class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId3}>Annuler</button><button class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId3}>Confirmer</button></div>`);
                      } else {
                        return [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), { class: "pb-2" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(Le), { class: "pb-2" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.description), 1)
                            ]),
                            _: 1
                          }),
                          vue_cjs_prod.renderSlot(_ctx.$slots, "default"),
                          vue_cjs_prod.createVNode("div", { class: "self-center" }, [
                            vue_cjs_prod.createVNode("button", {
                              onClick: ($event) => setIsOpen(false),
                              class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                            }, "Annuler", 8, ["onClick"]),
                            vue_cjs_prod.createVNode("button", {
                              onClick: __props.handleRemove,
                              class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
                            }, "Confirmer", 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode("div", {
                      class: "fixed inset-0 bg-black/30",
                      "aria-hidden": "true"
                    }),
                    vue_cjs_prod.createVNode("div", { class: "fixed inset-0 flex items-center justify-center p-4" }, [
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-sm rounded bg-white p-4 rounded-lg flex flex-col" }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), { class: "pb-2" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(Le), { class: "pb-2" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.description), 1)
                            ]),
                            _: 1
                          }),
                          vue_cjs_prod.renderSlot(_ctx.$slots, "default"),
                          vue_cjs_prod.createVNode("div", { class: "self-center" }, [
                            vue_cjs_prod.createVNode("button", {
                              onClick: ($event) => setIsOpen(false),
                              class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                            }, "Annuler", 8, ["onClick"]),
                            vue_cjs_prod.createVNode("button", {
                              onClick: __props.handleRemove,
                              class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
                            }, "Confirmer", 8, ["onClick"])
                          ])
                        ]),
                        _: 3
                      })
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Me), {
                open: vue_cjs_prod.unref(isOpen),
                onClose: setIsOpen,
                class: "relative z-50"
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode("div", {
                    class: "fixed inset-0 bg-black/30",
                    "aria-hidden": "true"
                  }),
                  vue_cjs_prod.createVNode("div", { class: "fixed inset-0 flex items-center justify-center p-4" }, [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-sm rounded bg-white p-4 rounded-lg flex flex-col" }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), { class: "pb-2" }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.title), 1)
                          ]),
                          _: 1
                        }),
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(Le), { class: "pb-2" }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.description), 1)
                          ]),
                          _: 1
                        }),
                        vue_cjs_prod.renderSlot(_ctx.$slots, "default"),
                        vue_cjs_prod.createVNode("div", { class: "self-center" }, [
                          vue_cjs_prod.createVNode("button", {
                            onClick: ($event) => setIsOpen(false),
                            class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                          }, "Annuler", 8, ["onClick"]),
                          vue_cjs_prod.createVNode("button", {
                            onClick: __props.handleRemove,
                            class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
                          }, "Confirmer", 8, ["onClick"])
                        ])
                      ]),
                      _: 3
                    })
                  ])
                ]),
                _: 3
              }, 8, ["open"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ConfirmationDeleteModal.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const _sfc_main$10 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogArticleStore = useBlogArticleStore();
    const notificationStore = useNotificationStore();
    useRoute();
    const { data, refresh } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-blog-article-list", async () => {
      await blogArticleStore.fetchAll();
      return blogArticleStore.list;
    })), __temp = await __temp, __restore(), __temp);
    const dialog = vue_cjs_prod.ref(false);
    const articleToDelete = vue_cjs_prod.ref(null);
    const handleDelete = async () => {
      if (!articleToDelete.value) {
        return;
      }
      try {
        await blogArticleStore.remove(articleToDelete.value.id);
        refresh();
        notificationStore.showMessage("Article correctement supprim\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la suppression de l'article");
      }
      dialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: { name: "admin-blog-add" },
        class: "py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-add-line",
              class: "fill-white w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pl-2"${_scopeId}>Cr\xE9er un article de blog</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1v, {
                icon: "ri-add-line",
                class: "fill-white w-8 h-8"
              }),
              vue_cjs_prod.createVNode("div", { class: "pl-2" }, "Cr\xE9er un article de blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1 md:pl-2">Titre</div><div class="w-full md:w-1/6 flex-1">Tags</div><div class="w-full md:w-1/6 flex-initial">Auteur</div><div class="w-full md:w-1/12 flex-initial">Est publi\xE9 ?</div><div class="w-full md:w-1/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (article) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1 md:pl-2">${serverRenderer.exports.ssrInterpolate(article.title)}</div><div class="w-full md:w-1/6 flex-1">${serverRenderer.exports.ssrInterpolate(article.tags ? article.tags.join(", ") : "")}</div><div class="w-full md:w-1/6 flex-initial">${serverRenderer.exports.ssrInterpolate(article.createdBy.nickname)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(article.isPublished)}</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-blog-id", params: { id: article.id } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-edit-line",
                class: "fill-white w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-edit-line",
                  class: "fill-white w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="bg-accent flex-auto flex items-stretch justify-center"><div class="w-full flex items-center justify-center cursor-pointer">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-white w-4 h-4"
        }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]-->`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$11, {
        open: dialog.value,
        "onUpdate:open": ($event) => dialog.value = $event,
        "handle-remove": handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog/index.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const meta$k = {
  layout: "admin"
};
const usePageCategoryStore = defineStore("page_category", {
  state: () => {
    return __spreadValues({
      resource: "/page_categories"
    }, crudState);
  }
});
const _sfc_main$$ = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    category: null,
    submitHandler: null,
    errors: null
  },
  emits: ["update:category"],
  async setup(__props, { emit }) {
    let __temp, __restore;
    const props = __props;
    const item = vue_cjs_prod.computed({
      get() {
        return props.category;
      },
      set(value) {
        emit("update:category", value);
      }
    });
    const pageCategoryStore = usePageCategoryStore();
    const mediaNodeStore = useMediaNodeStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("page-category-items", () => pageCategoryStore.fetchSelectItems())), await __temp, __restore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("media-node-items", () => mediaNodeStore.fetchSelectItems())), await __temp, __restore();
    pageCategoryStore.selectItemList();
    mediaNodeStore.selectItemList();
    vue_cjs_prod.ref(null);
    const schema = {
      name: "required|min:3|max:60"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), vue_cjs_prod.mergeProps({
        class: "flex flex-row flex-wrap",
        "validation-schema": schema,
        "initial-values": vue_cjs_prod.unref(item)
      }, _attrs), {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "name",
              error: errors.name,
              value: values.name,
              label: "Titre",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1q, {
              name: "isPublished",
              error: errors.isPublished,
              label: "Publier",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1q, {
              name: "showInMenu",
              error: errors.showInMenu,
              label: "Afficher dans le menu",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex w-full justify-end px-3"${_scopeId}><button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Sauvegarder</button><button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId}>R\xE9initialiser</button></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "name",
                error: errors.name,
                value: values.name,
                label: "Titre",
                class: "w-full"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1q, {
                name: "isPublished",
                error: errors.isPublished,
                label: "Publier",
                class: "w-1/2"
              }, null, 8, ["error"]),
              vue_cjs_prod.createVNode(_sfc_main$1q, {
                name: "showInMenu",
                error: errors.showInMenu,
                label: "Afficher dans le menu",
                class: "w-1/2"
              }, null, 8, ["error"]),
              vue_cjs_prod.createVNode("div", { class: "flex w-full justify-end px-3" }, [
                vue_cjs_prod.createVNode("button", {
                  type: "submit",
                  class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                }, "Sauvegarder"),
                vue_cjs_prod.createVNode("button", {
                  type: "reset",
                  class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
                }, "R\xE9initialiser")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/categories/FormComponent.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const _sfc_main$_ = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageCategoryStore = usePageCategoryStore();
    const route = useRoute();
    const categoryEdition = useState("page-edition", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await pageCategoryStore.load(route.params.slug);
      categoryEdition.value = pageCategoryStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageCategoryStore.update(data.slug, data);
        notificationStore.showMessage("Cat\xE9gorie correctement \xE9dit\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la sauvegarde la cat\xE9gorie, v\xE9rifie le formulaire");
        actions.setErrors(pageCategoryStore[CRUD_MODE.Edition].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">\xC9dition d&#39;une cat\xE9gorie</h1>`);
      if (vue_cjs_prod.unref(categoryEdition)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$$, {
          category: vue_cjs_prod.unref(categoryEdition),
          "onUpdate:category": ($event) => vue_cjs_prod.isRef(categoryEdition) ? categoryEdition.value = $event : null,
          "submit-handler": submit,
          errors: vue_cjs_prod.unref(pageCategoryStore)[vue_cjs_prod.unref(CRUD_MODE).EDITION].violations
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/[slug].vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const meta$j = {
  layout: "admin"
};
const _sfc_main$Z = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const pageCategoryStore = usePageCategoryStore();
    useRoute();
    useNuxtApp();
    const categoryCreation = useState("page-creation", () => {
      return {
        isPublished: false,
        showInMenu: false
      };
    });
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageCategoryStore.create(data);
        notificationStore.showMessage("Cat\xE9gorie correctement cr\xE9e");
        navigateTo({ name: "admin-categories-slug", params: { slug: pageCategoryStore[CRUD_MODE.CREATION].created.slug } });
      } catch (e) {
        notificationStore.showError("Erreur dans la cr\xE9ation la cat\xE9gorie, v\xE9rifie le formulaire");
        actions.setErrors(pageCategoryStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">Cr\xE9ation d&#39;une page</h1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$$, {
        category: vue_cjs_prod.unref(categoryCreation),
        "onUpdate:category": ($event) => vue_cjs_prod.isRef(categoryCreation) ? categoryCreation.value = $event : null,
        "submit-handler": submit,
        errors: vue_cjs_prod.unref(pageCategoryStore)[vue_cjs_prod.unref(CRUD_MODE).CREATION].violations
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/add.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const meta$i = {
  layout: "admin"
};
const _sfc_main$Y = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageCategoryStore = usePageCategoryStore();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("page-category-list", async () => {
      await pageCategoryStore.fetchAll();
      return pageCategoryStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: { name: "admin-categories-add" },
        class: "py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-add-line",
              class: "fill-white w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pl-2"${_scopeId}>Cr\xE9er une cat\xE9gorie</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1v, {
                icon: "ri-add-line",
                class: "fill-white w-8 h-8"
              }),
              vue_cjs_prod.createVNode("div", { class: "pl-2" }, "Cr\xE9er une cat\xE9gorie")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1">Nom</div><div class="w-full md:w-1/12 flex-initial">Est publi\xE9 ?</div><div class="w-full md:w-1/12 flex-initial">Menu</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (category) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(category.name)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(category.isPublished)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(category.showInMenu)}</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch"><div class="bg-primary hover:bg-primary-dark flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-categories-slug", params: { slug: category.slug } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-edit-line",
                class: "fill-white w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-edit-line",
                  class: "fill-white w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="bg-secondary hover:bg-accent flex-auto flex items-stretch justify-center"><div class="w-full flex items-center justify-center cursor-pointer">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-white w-4 h-4"
        }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/index.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const meta$h = {
  layout: "admin"
};
function useDateHelper() {
  const formatRDate = (rawDate) => {
    return formatRelative(parseISO(rawDate), new Date(), { locale: fr$1 });
  };
  const formatDate = (rawDate) => {
    return format(parseISO(rawDate), "ii LLLL yy", { locale: fr$1 });
  };
  return {
    formatDate,
    formatRDate
  };
}
const useContactStore = defineStore("contacts", {
  state: () => {
    return __spreadValues({
      resource: "/contacts"
    }, crudState);
  }
});
const _sfc_main$X = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { formatDate } = useDateHelper();
    const contactStore = useContactStore();
    const route = useRoute();
    const contact2 = useState("contact-view", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await contactStore.load(route.params.id, {
        "groups[]": "blog_article:read:edition"
      });
      contact2.value = contactStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">D\xE9tail d&#39;un contact</h1><div class="py-2"> Pr\xE9nom et Nom : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).firstName)} ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).lastName)}</div><div class="py-2"> Email et num\xE9ro : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).email)} ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).phoneNumber)}</div><div class="py-2"> Date et ip : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(vue_cjs_prod.unref(contact2).createdAt))} ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).ip)}</div><div class="py-2"> Sujet : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).subject)}</div><div class="py-2">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).content)}</div></div>`);
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/contact/[id].vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const meta$g = {
  layout: "admin"
};
const _sfc_main$W = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const contactStore = useContactStore();
    const { formatDate } = useDateHelper();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-contact-list", async () => {
      await contactStore.fetchAll({
        "order[createdAt]": "desc"
      });
      return contactStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><div class="flex flex-row flex-wrap items-center justify-between border-b-2 font-bold h-9"><div class="w-full md:w-1/5 flex-1">Email</div><div class="w-full md:w-2/12 flex-initial">Pr\xE9nom</div><div class="w-full md:w-2/12 flex-initial">Nom</div><div class="w-full md:w-2/12 flex-initial">Num\xE9ro</div><div class="w-full md:w-2/12 flex-initial">Nous a contact\xE9 le</div><div class="w-full md:w-2/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (contact2) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(contact2.email)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.firstName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.lastName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.phoneNumber)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(contact2.createdAt))}</div><div class="w-full md:w-2/12 flex-initial"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-contact-id", params: { id: contact2.id } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-eye-fill",
                class: "fill-white w-8 h-8"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-eye-fill",
                  class: "fill-white w-8 h-8"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/contact/index.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const meta$f = {
  layout: "admin"
};
const _sfc_main$V = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><h1>Administration</h1><div><p>Utiliser le menu pour naviguer</p></div></div>`);
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const meta$e = {
  layout: "admin",
  middleware: "is-admin"
};
const useJoinStore = defineStore("survey_joins", {
  state: () => {
    return __spreadValues({
      resource: "/survey_joins"
    }, crudState);
  }
});
const _sfc_main$U = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const joinStore = useJoinStore();
    const route = useRoute();
    const join = useState("join-view", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await joinStore.load(route.params.id, {
        "groups[]": "blog_article:read:edition"
      });
      join.value = joinStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const family = vue_cjs_prod.computed(() => {
      return join.value.family.filter((member) => !!member.firstName);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h2 class="w-full py-3">J&#39;en dis un peu sur moi :</h2><div class="flex py-3"><div class="w-1/2">Email : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).email)}</div><div class="w-1/2">Num\xE9ro de t\xE9l\xE9phone :${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).phoneNumber)}</div></div><div class="flex py-3"><div class="w-1/2">Pr\xE9nom : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).firstName)}</div><div class="w-1/2">Nom : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).lastName)}</div></div><div class="flex py-3"><div class="w-1/2">Ville actuelle : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).city)}</div><div class="w-1/2">Comment j&#39;ai connu les transalpins ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).origin)}</div></div><div class="py-3"><p>De combien de personnes est compos\xE9 ton foyer, pr\xE9nom et \xE2ge des membres du foyer ?</p></div><div class="flex flex-col py-3"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(family), (member) => {
        _push(`<div>${serverRenderer.exports.ssrInterpolate(member.firstName)} - ${serverRenderer.exports.ssrInterpolate(member.age)} an(s)</div>`);
      });
      _push(`<!--]--></div><h2 class="w-full py-3"> Quelle est ma raison d&#39;\xEAtre ? Quelles sont mes motivations pour rejoindre ce projet ? </h2><div class="py-3"> Qu&#39;est-ce qui me motive \xE0 cr\xE9er ou \xE0 m&#39;engager dans un projet d&#39;Oasis ? ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).motivationsFreeThinking)}</div><div class="w-full py-3"> Quelles sont les valeurs essentielles que j&#39;aimerais vivre : les valeurs non n\xE9gociables, c-a-d dont l&#39;absence me ferait perdre son sens au projet et ma motivation \xE0 y participer ? </div><div class="flex py-3"><div class="w-1/2">Valeurs humaines : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).coreValuesHuman)}</div><div class="w-1/2">Valeurs autres : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).coreValuesOther)}</div></div><div class="flex py-3"><div class="w-1/2">Qu\u2019est-ce qui m&#39;attire dans le projet des transalpins ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).affinity)}</div><div class="w-1/2">Qu\u2019est-ce qui me questionne dans ce projet ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).questioning)}</div></div><h2 class="w-full py-3"> Suis-je pr\xEAt.e \xE0 m&#39;investir dans ce projet ? </h2><div class="py-3"> Que suis-je pr\xEAt.e \xE0 lui apporter ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).bring)}</div><div class="flex py-3"><div class="w-1/2">En tant qu\u2019habitant.e, suis-je pr\xEAt.e \xE0 investir financi\xE8rement ? Et combien ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).investment)}</div><div class="w-1/2">Suis-je pr\xEAt.e \xE0 payer un loyer ? \xC0 quelle hauteur ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).rent)}</div></div><h2 class="w-full py-3">Ma vie au quotidien</h2><div class="w-full">Des questions encore plus concr\xE8tes : A quoi ressemblera ma vie quand je vivrai l\xE0 ?</div><div class="flex py-3"><div class="w-1/2">Je d\xE9cris ma journ\xE9e type : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).typicalDay)}</div><div class="w-1/2">Je d\xE9cris mon habitation : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).dwelling)}</div></div><div class="flex py-3"><div class="w-1/2">Je d\xE9cris les espaces communs : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).commonAreas)}</div><div class="w-1/2">Je d\xE9cris les relations au sein de l&#39;oasis : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).relationship)}</div></div><h2 class="w-full py-3">Mes savoir-faire et savoir-\xEAtre</h2><div class="flex py-3"><div class="w-1/2">Est-ce que je connais la CNV ? Si oui quelle est mon exp\xE9rience ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).cnvExperience)}</div><div class="w-1/2">Est-ce que je connais la gouvernance partag\xE9e ? Si oui, quelle est mon exp\xE9rience ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).sharedGovernance)}</div></div><div class="flex py-3"><div class="w-1/2">Quels sont les savoir-faire/\xEAtre que je peux amener au projet ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).skills)}</div><div class="w-1/2">Quelles sont mes limites ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).limits)}</div></div><div class="py-3"> Quelles sont mes disponibilit\xE9s durant la p\xE9riode de montage du projet ? Et mes disponibilit\xE9s en semaine ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).availability)}</div><div class="flex py-3"><div class="w-1/2">Serais-je dispos\xE9.e \xE0 rencontrer des \xE9lus locaux, des banquiers, architectes\u2026 ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).meet)}</div><div class="w-1/2">Dans quel domaine utile au projet suis-je pr\xEAt.e \xE0 me former ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).skillUp)}</div></div></div>`);
    };
  }
});
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/join/[id].vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const meta$d = {
  layout: "admin"
};
const _sfc_main$T = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const joinStore = useJoinStore();
    const { formatDate } = useDateHelper();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-join-list", async () => {
      await joinStore.fetchAll({
        "order[createdAt]": "desc"
      });
      return joinStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><div class="flex flex-row flex-wrap items-center justify-between border-b-2 font-bold h-9"><div class="w-full md:w-1/5 flex-1">Email</div><div class="w-full md:w-2/12 flex-initial">Pr\xE9nom</div><div class="w-full md:w-2/12 flex-initial">Nom</div><div class="w-full md:w-2/12 flex-initial">A rempli le formulaire le</div><div class="w-full md:w-2/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (join) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(join.email)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(join.firstName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(join.lastName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(join.createdAt))}</div><div class="w-full md:w-2/12 flex-initial"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-join-id", params: { id: join.id } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-eye-fill",
                class: "fill-white w-8 h-8"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-eye-fill",
                  class: "fill-white w-8 h-8"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/join/index.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const meta$c = {
  layout: "admin"
};
const _sfc_main$S = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1b, vue_cjs_prod.mergeProps({
        "show-selection": false,
        class: "flex-auto pl-3 pt-3"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/media.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const meta$b = {
  layout: "admin"
};
const useContactNewsletterStore = defineStore("contact_newsletters", {
  state: () => {
    return __spreadValues({
      resource: "/contact_newsletters"
    }, crudState);
  }
});
const _sfc_main$R = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const contactNewsetterStore = useContactNewsletterStore();
    const { formatDate } = useDateHelper();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-contact-newsletter-list", async () => {
      await contactNewsetterStore.fetchAll({
        "order[createdAt]": "desc"
      });
      return contactNewsetterStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1">Email</div><div class="w-full md:w-1/12 flex-initial">Ip</div><div class="w-full md:w-1/12 flex-initial">Cr\xE9\xE9 le</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (contact2) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(contact2.email)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.ip)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(contact2.createdAt))}</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/newsletter.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const meta$a = {
  layout: "admin"
};
const usePageLogStore = defineStore("page_logs", {
  state: () => {
    return __spreadValues({
      resource: "/page_logs"
    }, crudState);
  }
});
const _sfc_main$Q = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    url: null,
    setContent: null
  },
  setup(__props) {
    const props = __props;
    const dialog = vue_cjs_prod.ref(false);
    const mouseOn = vue_cjs_prod.ref(false);
    const pageLogStore = usePageLogStore();
    const { formatRDate } = useDateHelper();
    const selectedLog = vue_cjs_prod.ref(null);
    const { refresh } = useAsyncData("page-log-stores", async () => {
      await pageLogStore.fetchAll({
        "page.url": props.url,
        "order[updatedAt]": "desc"
      });
    });
    const logs = vue_cjs_prod.computed(() => {
      return pageLogStore.list.map((item) => {
        return {
          value: item["@id"],
          label: `#${item.id} ${formatRDate(item.updatedAt)} - ${item.draft ? "Automatique" : `Manuelle par ${item.updatedBy.nickname}`}`
        };
      });
    });
    const submitHandler = (log) => {
      const pageLog = pageLogStore.find(log);
      if (pageLog) {
        props.setContent(pageLog.originalContent);
      }
      dialog.value = false;
    };
    vue_cjs_prod.watch(dialog, (newVal, oldVal) => {
      if (newVal && !oldVal) {
        refresh();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe), { class: "relative bg-black flex-auto inline-flex p-2" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(xe), null, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                    icon: "ri-download-cloud-line",
                    class: "h-6 w-6 fill-white"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(_sfc_main$1v, {
                      icon: "ri-download-cloud-line",
                      class: "h-6 w-6 fill-white",
                      onMouseenter: ($event) => mouseOn.value = true,
                      onMouseleave: ($event) => mouseOn.value = false
                    }, null, 8, ["onMouseenter", "onMouseleave"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(we), {
              class: "absolute z-10 bg-sky-500 w-24 bottom-10 left-2",
              style: mouseOn.value ? null : { display: "none" },
              static: ""
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` R\xE9cup\xE9rer une ancienne version `);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(" R\xE9cup\xE9rer une ancienne version ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(xe), {
                onClick: vue_cjs_prod.withModifiers(($event) => dialog.value = true, ["prevent"])
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(_sfc_main$1v, {
                    icon: "ri-download-cloud-line",
                    class: "h-6 w-6 fill-white",
                    onMouseenter: ($event) => mouseOn.value = true,
                    onMouseleave: ($event) => mouseOn.value = false
                  }, null, 8, ["onMouseenter", "onMouseleave"])
                ]),
                _: 1
              }, 8, ["onClick"]),
              vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode(vue_cjs_prod.unref(we), {
                class: "absolute z-10 bg-sky-500 w-24 bottom-10 left-2",
                static: ""
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createTextVNode(" R\xE9cup\xE9rer une ancienne version ")
                ]),
                _: 1
              }, 512), [
                [vue_cjs_prod.vShow, mouseOn.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe), {
        appear: "",
        show: dialog.value,
        as: "template"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Me), {
              as: "div",
              class: "relative z-10"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` R\xE9cup\xE9rer une ancienne version `);
                                  } else {
                                    return [
                                      vue_cjs_prod.createTextVNode(" R\xE9cup\xE9rer une ancienne version ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<select class="peer w-full outline-none h-8"${_scopeId4}><!--[-->`);
                              serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(logs), (log) => {
                                _push5(`<option${serverRenderer.exports.ssrRenderAttr("value", log.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(log.value === selectedLog.value) ? " selected" : ""}${_scopeId4}>${serverRenderer.exports.ssrInterpolate(log.label)}</option>`);
                              });
                              _push5(`<!--]--></select>`);
                            } else {
                              return [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" R\xE9cup\xE9rer une ancienne version ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                                  class: "peer w-full outline-none h-8",
                                  onChange: ($event) => submitHandler(selectedLog.value),
                                  "onUpdate:modelValue": ($event) => selectedLog.value = $event
                                }, [
                                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(logs), (log) => {
                                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                                      value: log.value,
                                      selected: log.value === selectedLog.value
                                    }, vue_cjs_prod.toDisplayString(log.label), 9, ["value", "selected"]);
                                  }), 256))
                                ], 40, ["onChange", "onUpdate:modelValue"]), [
                                  [vue_cjs_prod.vModelSelect, selectedLog.value]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" R\xE9cup\xE9rer une ancienne version ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                                class: "peer w-full outline-none h-8",
                                onChange: ($event) => submitHandler(selectedLog.value),
                                "onUpdate:modelValue": ($event) => selectedLog.value = $event
                              }, [
                                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(logs), (log) => {
                                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                                    value: log.value,
                                    selected: log.value === selectedLog.value
                                  }, vue_cjs_prod.toDisplayString(log.label), 9, ["value", "selected"]);
                                }), 256))
                              ], 40, ["onChange", "onUpdate:modelValue"]), [
                                [vue_cjs_prod.vModelSelect, selectedLog.value]
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(" R\xE9cup\xE9rer une ancienne version ")
                                  ]),
                                  _: 1
                                }),
                                vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                                  class: "peer w-full outline-none h-8",
                                  onChange: ($event) => submitHandler(selectedLog.value),
                                  "onUpdate:modelValue": ($event) => selectedLog.value = $event
                                }, [
                                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(logs), (log) => {
                                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                                      value: log.value,
                                      selected: log.value === selectedLog.value
                                    }, vue_cjs_prod.toDisplayString(log.label), 9, ["value", "selected"]);
                                  }), 256))
                                ], 40, ["onChange", "onUpdate:modelValue"]), [
                                  [vue_cjs_prod.vModelSelect, selectedLog.value]
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Me), {
                as: "div",
                onClose: ($event) => dialog.value = false,
                class: "relative z-10"
              }, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    vue_cjs_prod.createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(oe), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(vue_cjs_prod.unref(je), { class: "w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100" }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(vue_cjs_prod.unref(Ae), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(" R\xE9cup\xE9rer une ancienne version ")
                                ]),
                                _: 1
                              }),
                              vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                                class: "peer w-full outline-none h-8",
                                onChange: ($event) => submitHandler(selectedLog.value),
                                "onUpdate:modelValue": ($event) => selectedLog.value = $event
                              }, [
                                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(logs), (log) => {
                                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                                    value: log.value,
                                    selected: log.value === selectedLog.value
                                  }, vue_cjs_prod.toDisplayString(log.label), 9, ["value", "selected"]);
                                }), 256))
                              ], 40, ["onChange", "onUpdate:modelValue"]), [
                                [vue_cjs_prod.vModelSelect, selectedLog.value]
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/pages/OldVersionBtn.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const _sfc_main$P = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    page: null,
    submitHandler: null,
    errors: null
  },
  emits: ["update:page"],
  async setup(__props, { emit }) {
    let __temp, __restore;
    const props = __props;
    const item = vue_cjs_prod.computed({
      get() {
        return props.page;
      },
      set(value) {
        emit("update:page", value);
      }
    });
    const pageCategoryStore = usePageCategoryStore();
    const mediaNodeStore = useMediaNodeStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("page-category-items", () => pageCategoryStore.fetchSelectItems())), await __temp, __restore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("media-node-items", () => mediaNodeStore.fetchSelectItems())), await __temp, __restore();
    const categories = pageCategoryStore.selectItemList();
    const mediaNodes = mediaNodeStore.selectItemList();
    const editor = vue_cjs_prod.ref(null);
    const setContent = (content) => {
      var _a2;
      (_a2 = editor.value) == null ? void 0 : _a2.setContent(content);
    };
    const schema = {
      title: "required|min:3|max:60",
      url: "required|min:3|max:60",
      content: "required|min:10|max:20000"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), vue_cjs_prod.mergeProps({
        class: "flex flex-row flex-wrap",
        "validation-schema": schema,
        "initial-values": vue_cjs_prod.unref(item)
      }, _attrs), {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "title",
              error: errors.title,
              value: values.title,
              label: "Titre",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "url",
              error: errors.url,
              value: values.url,
              label: "URL",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1q, {
              name: "isPublished",
              error: errors.isPublished,
              label: "Publier",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1q, {
              name: "showInMenu",
              error: errors.showInMenu,
              label: "Afficher dans le menu",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1p, {
              name: "category",
              options: vue_cjs_prod.unref(categories),
              error: errors.category,
              value: values.category,
              label: "Cat\xE9gorie",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1p, {
              name: "mediaNode",
              options: vue_cjs_prod.unref(mediaNodes),
              error: errors.mediaNode,
              value: values.mediaNode,
              label: "Gallerie",
              class: "w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_component_ClientOnly, null, {
              default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vue_cjs_prod.unref(item).content !== void 0) {
                    _push3(serverRenderer.exports.ssrRenderComponent(_sfc_main$15, {
                      name: "content",
                      ref_key: "editor",
                      ref: editor,
                      class: "bg-white w-full my-3 px-3",
                      label: "Contenu de la page",
                      value: vue_cjs_prod.unref(item).content
                    }, {
                      supplemental_btns: vue_cjs_prod.withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (vue_cjs_prod.unref(item).url) {
                            _push4(serverRenderer.exports.ssrRenderComponent(_sfc_main$Q, {
                              url: vue_cjs_prod.unref(item).url,
                              "set-content": setContent
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            vue_cjs_prod.unref(item).url ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$Q, {
                              key: 0,
                              url: vue_cjs_prod.unref(item).url,
                              "set-content": setContent
                            }, null, 8, ["url"])) : vue_cjs_prod.createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    vue_cjs_prod.unref(item).content !== void 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$15, {
                      key: 0,
                      name: "content",
                      ref_key: "editor",
                      ref: editor,
                      class: "bg-white w-full my-3 px-3",
                      label: "Contenu de la page",
                      value: vue_cjs_prod.unref(item).content
                    }, {
                      supplemental_btns: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.unref(item).url ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$Q, {
                          key: 0,
                          url: vue_cjs_prod.unref(item).url,
                          "set-content": setContent
                        }, null, 8, ["url"])) : vue_cjs_prod.createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["value"])) : vue_cjs_prod.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="flex w-full justify-end px-3"${_scopeId}><button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Sauvegarder</button><button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId}>R\xE9initialiser</button></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "title",
                error: errors.title,
                value: values.title,
                label: "Titre",
                class: "w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "url",
                error: errors.url,
                value: values.url,
                label: "URL",
                class: "w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1q, {
                name: "isPublished",
                error: errors.isPublished,
                label: "Publier",
                class: "w-1/2"
              }, null, 8, ["error"]),
              vue_cjs_prod.createVNode(_sfc_main$1q, {
                name: "showInMenu",
                error: errors.showInMenu,
                label: "Afficher dans le menu",
                class: "w-1/2"
              }, null, 8, ["error"]),
              vue_cjs_prod.createVNode(_sfc_main$1p, {
                name: "category",
                options: vue_cjs_prod.unref(categories),
                error: errors.category,
                value: values.category,
                label: "Cat\xE9gorie",
                class: "w-1/2"
              }, null, 8, ["options", "error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1p, {
                name: "mediaNode",
                options: vue_cjs_prod.unref(mediaNodes),
                error: errors.mediaNode,
                value: values.mediaNode,
                label: "Gallerie",
                class: "w-1/2"
              }, null, 8, ["options", "error", "value"]),
              vue_cjs_prod.createVNode(_component_ClientOnly, null, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.unref(item).content !== void 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$15, {
                    key: 0,
                    name: "content",
                    ref_key: "editor",
                    ref: editor,
                    class: "bg-white w-full my-3 px-3",
                    label: "Contenu de la page",
                    value: vue_cjs_prod.unref(item).content
                  }, {
                    supplemental_btns: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.unref(item).url ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$Q, {
                        key: 0,
                        url: vue_cjs_prod.unref(item).url,
                        "set-content": setContent
                      }, null, 8, ["url"])) : vue_cjs_prod.createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["value"])) : vue_cjs_prod.createCommentVNode("", true)
                ]),
                _: 1
              }),
              vue_cjs_prod.createVNode("div", { class: "flex w-full justify-end px-3" }, [
                vue_cjs_prod.createVNode("button", {
                  type: "submit",
                  class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
                }, "Sauvegarder"),
                vue_cjs_prod.createVNode("button", {
                  type: "reset",
                  class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
                }, "R\xE9initialiser")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/pages/FormComponent.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const _sfc_main$O = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageStore = usePageStore();
    const route = useRoute();
    useNuxtApp();
    const pageEdition = useState("page-edition", () => null);
    usePageLogStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await pageStore.load(route.params.slug, {
        "groups[]": "page:read:edition"
      });
      pageEdition.value = pageStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageStore.update(data.url, data);
        notificationStore.showMessage("Page correctement \xE9dit\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la sauvegarde la page, v\xE9rifie le formulaire");
        actions.setErrors(pageStore[CRUD_MODE.Edition].violations);
      }
    };
    let autoSaveInterval = null;
    vue_cjs_prod.onMounted(() => {
    });
    vue_cjs_prod.onBeforeUnmount(() => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
      autoSaveInterval = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">\xC9dition d&#39;une page</h1>`);
      if (vue_cjs_prod.unref(pageEdition)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$P, {
          page: vue_cjs_prod.unref(pageEdition),
          "onUpdate:page": ($event) => vue_cjs_prod.isRef(pageEdition) ? pageEdition.value = $event : null,
          "submit-handler": submit,
          errors: vue_cjs_prod.unref(pageStore)[vue_cjs_prod.unref(CRUD_MODE).EDITION].violations
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/pages/[slug].vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const meta$9 = {
  layout: "admin"
};
const _sfc_main$N = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const pageStore = usePageStore();
    useRoute();
    useNuxtApp();
    const pageCreation = useState("page-creation", () => {
      return {
        content: "",
        isPublished: false,
        showInMenu: false
      };
    });
    usePageLogStore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageStore.create(data);
        notificationStore.showMessage("Page correctement cr\xE9e");
        navigateTo({ name: "admin-pages-slug", params: { slug: pageStore[CRUD_MODE.CREATION].created.url } });
      } catch (e) {
        notificationStore.showError("Erreur dans la cr\xE9ation la page, v\xE9rifie le formulaire");
        actions.setErrors(pageStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">Cr\xE9ation d&#39;une page</h1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$P, {
        page: vue_cjs_prod.unref(pageCreation),
        "onUpdate:page": ($event) => vue_cjs_prod.isRef(pageCreation) ? pageCreation.value = $event : null,
        "submit-handler": submit,
        errors: vue_cjs_prod.unref(pageStore)[vue_cjs_prod.unref(CRUD_MODE).CREATION].violations
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/pages/add.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const meta$8 = {
  layout: "admin"
};
const _sfc_main$M = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageStore = usePageStore();
    const notificationStore = useNotificationStore();
    useRoute();
    const { data, refresh } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("page-list", async () => {
      await pageStore.fetchAll();
      return pageStore.list;
    })), __temp = await __temp, __restore(), __temp);
    const dialog = vue_cjs_prod.ref(false);
    const pageToDelete = vue_cjs_prod.ref(null);
    const handleDelete = async () => {
      if (!pageToDelete.value) {
        return;
      }
      try {
        await pageStore.remove(pageToDelete.value.url);
        refresh();
        notificationStore.showMessage("Page correctement supprim\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la suppression de la page");
      }
      dialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: { name: "admin-pages-add" },
        class: "py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-add-line",
              class: "fill-white w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pl-2"${_scopeId}>Cr\xE9er une page</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1v, {
                icon: "ri-add-line",
                class: "fill-white w-8 h-8"
              }),
              vue_cjs_prod.createVNode("div", { class: "pl-2" }, "Cr\xE9er une page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1 md:pl-2">Titre</div><div class="w-full md:w-1/6 flex-initial">Url</div><div class="w-full md:w-1/6 flex-initial">Auteur</div><div class="w-full md:w-1/5 flex-1">Cat\xE9gorie</div><div class="w-full md:w-1/12 flex-initial">Est publi\xE9 ?</div><div class="w-full md:w-1/12 flex-initial">Menu</div><div class="w-full md:w-1/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (page) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1 md:pl-2">${serverRenderer.exports.ssrInterpolate(page.title)}</div><div class="w-full md:w-1/6 flex-initial">/${serverRenderer.exports.ssrInterpolate(page.url)}</div><div class="w-full md:w-1/6 flex-initial">${serverRenderer.exports.ssrInterpolate(page.createdBy.nickname)}</div><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(page.category ? page.category.name : "N/A")}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(page.isPublished)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(page.showInMenu)}</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-pages-slug", params: { slug: page.url } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-edit-line",
                class: "fill-white w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-edit-line",
                  class: "fill-white w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="bg-accent flex-auto flex items-stretch justify-center"><div class="w-full flex items-center justify-center cursor-pointer">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-white w-4 h-4"
        }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]-->`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$11, {
        open: dialog.value,
        "onUpdate:open": ($event) => dialog.value = $event,
        "handle-remove": handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/pages/index.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const meta$7 = {
  layout: "admin"
};
function useStringHelper() {
  const capitalize2 = (value) => {
    if (!value) {
      return "";
    }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  return {
    capitalize: capitalize2
  };
}
const _sfc_main$L = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    article: null
  },
  setup(__props) {
    const { formatDate } = useDateHelper();
    const { capitalize: capitalize2 } = useStringHelper();
    useBlogArticleStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "p-3" }, _attrs))}><header class="p-3"><h1>${serverRenderer.exports.ssrInterpolate(__props.article.title)}</h1></header><section class="p-2"><div class="text-2xl">${serverRenderer.exports.ssrInterpolate(__props.article.preview)}</div></section><section class="flex w-full items-center p-2"><div class="flex flex-col"><div>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(capitalize2)(__props.article.createdBy.nickname))} - <time${serverRenderer.exports.ssrRenderAttr("datetime", __props.article.createdAt)}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(__props.article.createdAt))}</time></div></div><div class="flex flex-wrap"><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.article.tags, (tag, i) => {
        _push(`<div class="bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 mb-1 text-xs cursor-pointer">${serverRenderer.exports.ssrInterpolate(tag)}</div>`);
      });
      _push(`<!--]--></div></section><section class="p-3 border-t border-gray-300"><div class="js-content">${__props.article.content}</div></section></article>`);
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/front/blog/ArticleComponent.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const _sfc_main$K = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const blogArticleStore = useBlogArticleStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("article", () => blogArticleStore.load(route.params.id))), await __temp, __restore();
    const article = blogArticleStore[CRUD_MODE.EDITION].retrieved;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(article) ? "Article - " + vue_cjs_prod.unref(article).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise")}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(article) ? "Article - " + vue_cjs_prod.unref(article).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(article) !== null && vue_cjs_prod.unref(article).mediaNode !== null) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1u, {
          "media-node": vue_cjs_prod.unref(article).mediaNode
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(article)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$L, { article: vue_cjs_prod.unref(article) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const meta$6 = void 0;
const _sfc_main$J = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    mediaObject: null,
    size: { default: "original" },
    maxHeight: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.mediaObject) {
        _push(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
          src: `${__props.mediaObject.contentUrl}?size=${__props.size}`,
          alt: __props.mediaObject.customName,
          class: "h-full w-full object-contain rounded-sm"
        }, _attrs))}>`);
      } else {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
          class: [{ [`h-${__props.maxHeight}`]: !!__props.maxHeight }, "w-full bg-primary relative before:text-white before:text-2xl before:font-bold before:content-['Transalpins'] before:font-marker before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 rounded-sm shadow-sm"]
        }, _attrs))}></div>`);
      }
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/front/blog/PreviewImage.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const _sfc_main$I = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const articleStore = useBlogArticleStore();
    const { tags, activeTags } = storeToRefs(articleStore);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("blog-tags", () => articleStore.fetchTags())), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-row flex-wrap px-3 justify-center h-fit" }, _attrs))}><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(tags), (tag, i) => {
        _push(`<div class="${serverRenderer.exports.ssrRenderClass([{ "bg-primary-dark": vue_cjs_prod.unref(activeTags).indexOf(tag) !== -1, "bg-primary": vue_cjs_prod.unref(activeTags).indexOf(tag) === -1 }, "text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer w-fit h-fit hover:bg-primary-dark"])}">${serverRenderer.exports.ssrInterpolate(tag)}</div>`);
      });
      _push(`<!--]--><div class="${serverRenderer.exports.ssrRenderClass([{ "bg-primary-dark": vue_cjs_prod.unref(activeTags).length === 0, "bg-primary": vue_cjs_prod.unref(activeTags).length > 0 }, "fill-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer w-fit h-fit hover:bg-primary-dark"])}">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
        icon: "ri-close-circle-line",
        class: "h-4 w-4"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/front/blog/TagCloud.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const _sfc_main$H = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRoute();
    const blogArticleStore = useBlogArticleStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("blog-articles-index", () => blogArticleStore.fetchAll({ "order[createdAt]": "desc", "itemsPerPage": 50 }))), await __temp, __restore();
    const { listWithActiveTags: articles } = storeToRefs(blogArticleStore);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col px-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$I, null, null, _parent));
      _push(`<!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(articles), (article, i) => {
        _push(`<div class="w-full flex flex-col py-2"><div class="flex flex-row"><div class="${serverRenderer.exports.ssrRenderClass([{ "order-1": i % 2 === 1 }, "px-3 w-40"])}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$J, {
          "media-object": vue_cjs_prod.unref(blogArticleStore).getRandomImage(article),
          class: "h-20 before:text-[6px]",
          size: "sm"
        }, null, _parent));
        _push(`</div><div class="${serverRenderer.exports.ssrRenderClass([{ "text-right": i % 2 === 1 }, "flex flex-col w-full justify-center"])}"><p class="w-full"><b class="text-lg">${serverRenderer.exports.ssrInterpolate(article.title)}</b> | ${serverRenderer.exports.ssrInterpolate(article.preview)}</p><div class="${serverRenderer.exports.ssrRenderClass([{ "self-end": i % 2 === 1 }, "pt-2 text-primary-dark fill-primary-dark flex uppercase text-xs items-center"])}"><!--[-->`);
        serverRenderer.exports.ssrRenderList(article.tags, (tag, i2) => {
          _push(`<div class="bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer">${serverRenderer.exports.ssrInterpolate(tag)}</div>`);
        });
        _push(`<!--]-->`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-arrow-right-s-line",
          class: "h-4 w-4"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "blog-id", params: { id: article.id } }
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`En savoir plus`);
            } else {
              return [
                vue_cjs_prod.createTextVNode("En savoir plus")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div><div class="h-2 w-1/2 border-b self-center"></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const meta$5 = void 0;
const _sfc_main$G = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const pageStore = usePageStore();
    const page = pageStore.find("/api/pages/contact");
    useContactStore();
    useNotificationStore();
    const schema = {
      email: "required|email",
      phoneNumber: "regex:^0\\d{9}$",
      firstName: "min:3|max:60",
      lastName: "min:3|max:60",
      subject: "required|min:8|max:60",
      content: "required|min:10|max:1000"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col py-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contacte-nous`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Contacte-nous")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(page)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, { page: vue_cjs_prod.unref(page) }, null, _parent));
      } else {
        _push(`<div><p> Pour nous contacter tu peux nous envoyer un email \xE0 <a href="mailto:contact@lestransalpins.org" title="Envoyer un email aux transalpins">contact@lestransalpins.org</a> ou bien remplir le formulaire suivant.</p><p> Dans ce cas tu recevras un email de confirmation ou bien regarde dans tes spams si ce n&#39;est pas le cas. </p></div>`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), {
        class: "flex flex-row flex-wrap w-full sm:w-3/4 md:wd-1/2 lg:wd-1/3 justify-center self-center text-gray-500",
        "validation-schema": schema
      }, {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              icon: "ri-mail-line",
              type: "email",
              name: "email",
              error: errors.email,
              value: values.email,
              label: "Email",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              icon: "ri-phone-line",
              type: "phoneNumber",
              name: "phoneNumber",
              error: errors.phoneNumber,
              value: values.phoneNumber,
              label: "Num\xE9ro de t\xE9l\xE9phone",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              type: "firstName",
              name: "firstName",
              error: errors.firstName,
              value: values.firstName,
              label: "Pr\xE9nom",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              type: "lastName",
              name: "lastName",
              error: errors.lastName,
              value: values.lastName,
              label: "Nom",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-row w-full group py-4 px-3"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              id: "subject",
              name: "subject",
              autocomplete: "off",
              type: "text",
              format: "0[0-9]{9}",
              class: "peer w-full outline-none h-8",
              validateOnInput: true
            }, null, _parent2, _scopeId));
            _push2(`<label for="subject" class="${serverRenderer.exports.ssrRenderClass([{ "h-1/2 -translate-y-full pl-0": !!values.subject, "text-accent": !!errors.subject, "text-primary": !!values.subject && !errors.subject }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])}"${_scopeId}>Sujet `);
            if (errors.subject) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
                default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate(errors.subject)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.subject), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><div class="${serverRenderer.exports.ssrRenderClass([{ "border-accent": !!errors.subject, "border-primary": !!values.subject && !errors.subject, "border-gray-500": !values.subject }, "absolute bottom-0 w-full border-b"])}"${_scopeId}></div></div></div><div class="flex flex-col w-full group py-4 px-3"${_scopeId}><div class="flex flex-row"${_scopeId}><label for="content" class="${serverRenderer.exports.ssrRenderClass([{ "text-accent": !!errors.content, "text-primary": !!values.content && !errors.content }, "w-fit self-center"])}"${_scopeId}>Message</label>`);
            if (errors.content) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
                default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate(errors.content)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.content), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              as: "textarea",
              autocomplete: "off",
              rows: "10",
              id: "content",
              name: "content",
              type: "textarea",
              format: "0[0-9]{9}",
              class: ["w-full w-full border p-2 outline-none", { "border-accent": !!errors.content, "border-primary": !!values.content && !errors.content, "border-gray-500": !values.content }]
            }, null, _parent2, _scopeId));
            _push2(`</div><button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Envoyer</button><button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId}>R\xE9initialiser</button>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                icon: "ri-mail-line",
                type: "email",
                name: "email",
                error: errors.email,
                value: values.email,
                label: "Email",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                icon: "ri-phone-line",
                type: "phoneNumber",
                name: "phoneNumber",
                error: errors.phoneNumber,
                value: values.phoneNumber,
                label: "Num\xE9ro de t\xE9l\xE9phone",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                type: "firstName",
                name: "firstName",
                error: errors.firstName,
                value: values.firstName,
                label: "Pr\xE9nom",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                type: "lastName",
                name: "lastName",
                error: errors.lastName,
                value: values.lastName,
                label: "Nom",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("div", { class: "flex flex-row w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode("div", { class: "relative w-full" }, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                    id: "subject",
                    name: "subject",
                    autocomplete: "off",
                    type: "text",
                    format: "0[0-9]{9}",
                    class: "peer w-full outline-none h-8",
                    validateOnInput: true
                  }),
                  vue_cjs_prod.createVNode("label", {
                    for: "subject",
                    class: [{ "h-1/2 -translate-y-full pl-0": !!values.subject, "text-accent": !!errors.subject, "text-primary": !!values.subject && !errors.subject }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"]
                  }, [
                    vue_cjs_prod.createTextVNode("Sujet "),
                    errors.subject ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1r, { key: 0 }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.subject), 1)
                      ]),
                      _: 2
                    }, 1024)) : vue_cjs_prod.createCommentVNode("", true)
                  ], 2),
                  vue_cjs_prod.createVNode("div", {
                    class: [{ "border-accent": !!errors.subject, "border-primary": !!values.subject && !errors.subject, "border-gray-500": !values.subject }, "absolute bottom-0 w-full border-b"]
                  }, null, 2)
                ])
              ]),
              vue_cjs_prod.createVNode("div", { class: "flex flex-col w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode("div", { class: "flex flex-row" }, [
                  vue_cjs_prod.createVNode("label", {
                    for: "content",
                    class: ["w-fit self-center", { "text-accent": !!errors.content, "text-primary": !!values.content && !errors.content }]
                  }, "Message", 2),
                  errors.content ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1r, { key: 0 }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.content), 1)
                    ]),
                    _: 2
                  }, 1024)) : vue_cjs_prod.createCommentVNode("", true)
                ]),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                  as: "textarea",
                  autocomplete: "off",
                  rows: "10",
                  id: "content",
                  name: "content",
                  type: "textarea",
                  format: "0[0-9]{9}",
                  class: ["w-full w-full border p-2 outline-none", { "border-accent": !!errors.content, "border-primary": !!values.content && !errors.content, "border-gray-500": !values.content }]
                }, null, 8, ["class"])
              ]),
              vue_cjs_prod.createVNode("button", {
                type: "submit",
                class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
              }, "Envoyer"),
              vue_cjs_prod.createVNode("button", {
                type: "reset",
                class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
              }, "R\xE9initialiser")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const meta$4 = void 0;
const _sfc_main$F = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    article: null
  },
  setup(__props) {
    const props = __props;
    const { formatDate } = useDateHelper();
    const { capitalize: capitalize2 } = useStringHelper();
    const blogArticleStore = useBlogArticleStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<article${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col p-8" }, _attrs))}><div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$J, {
        "media-object": vue_cjs_prod.unref(blogArticleStore).getRandomImage(__props.article),
        class: "max-h-44 object-contain",
        "max-height": "44",
        size: "md"
      }, null, _parent));
      _push(`</div><div class="text-xs mt-2"><div class="text-secondary">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(capitalize2)(props.article.createdBy.nickname))}</div></div><div><time${serverRenderer.exports.ssrRenderAttr("datetime", __props.article.createdAt)} class="text-xs uppercase tracking-wider">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(__props.article.createdAt))}</time></div><header class="py-4"><h2>${serverRenderer.exports.ssrInterpolate(__props.article.title)}</h2></header><section class="max-h-64 text-ellipsis overflow-hidden"><p>${serverRenderer.exports.ssrInterpolate(__props.article.preview)}</p></section><footer><div class="flex flex-wrap mt-4"><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.article.tags, (tag, i) => {
        _push(`<div class="bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 mb-1 text-xs cursor-pointer">${serverRenderer.exports.ssrInterpolate(tag)}</div>`);
      });
      _push(`<!--]--></div><div class="pt-2 text-primary-dark fill-primary-dark flex uppercase text-xs">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
        icon: "ri-arrow-right-s-line",
        class: "h-4 w-4"
      }, null, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: { name: "blog-id", params: { id: __props.article.id } }
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`En savoir plus`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("En savoir plus")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></footer></article>`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/front/ArticlePreviewComponent.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogArticleStore = useBlogArticleStore();
    const pageStore = usePageStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("articles", () => blogArticleStore.fetchAll({ "order[createdAt]": "desc", "itemsPerPage": 8 }))), await __temp, __restore();
    const homePage = pageStore.findBySlug("home");
    const articles = blogArticleStore.list;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col" }, _attrs))}>`);
      if (vue_cjs_prod.unref(homePage) !== null && vue_cjs_prod.unref(homePage).mediaNode !== null) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1u, {
          "media-node": vue_cjs_prod.unref(homePage).mediaNode
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(homePage)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, {
          page: vue_cjs_prod.unref(homePage),
          class: "md:w-4/5"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="p-3 w-full md:w-4/5 self-center">Les ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(articles).length)} derniers articles</h2><div class="flex flex-wrap md:w-4/5 lg:w-3/4 self-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(articles), (article) => {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$F, {
          article,
          class: "w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Habitat participatif situ\xE9 vers la r\xE9gion grenobloise`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Habitat participatif situ\xE9 vers la r\xE9gion grenobloise")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const meta$3 = void 0;
const useAuthStore = defineStore("main", {
  state: () => {
    return {
      user: null,
      credentialError: false,
      refreshError: true,
      loading: false
    };
  },
  getters: {
    isLogged(state) {
      return state.user !== null;
    },
    isAdmin(state) {
      return state.user !== null && state.user.isAdmin;
    }
  },
  actions: {
    async login(credentials) {
      this.credentialError = false;
      this.loading = true;
      await this.$nuxt.$apiFetch("/login_check", {
        method: "POST",
        body: credentials
      }).catch(() => {
        this.credentialError = true;
      });
      this.loading = false;
      if (!this.credentialError) {
        await this.getUser();
      }
    },
    async register(credentials) {
      await this.$nuxt.$apiFetch("/auth/register", {
        method: "POST",
        body: credentials
      });
      await this.getUser();
    },
    async getUser() {
      this.user = await this.$nuxt.$apiFetch("/me");
    },
    async refresh() {
      this.refreshError = false;
      await this.$nuxt.$apiFetch("/refresh", {
        method: "POST"
      }).catch(() => {
        this.refreshError = true;
      });
      if (!this.refreshError) {
        await this.getUser();
      }
    },
    async logout() {
      await this.$nuxt.$apiFetch("/logout");
      this.user = null;
    },
    loadPermissions() {
    }
  }
});
const _sfc_main$D = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const store = useAuthStore();
    const form = vue_cjs_prod.ref(null);
    vue_cjs_prod.onMounted(() => {
      form.value && form.value.resetForm();
    });
    const schema = {
      email: "required|email",
      password: "required|min:10"
    };
    if (store.isLogged) {
      navigateTo("/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-auto justify-center items-center bg-white" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Connexion`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Connexion")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-fit"><h2 class="py-3">Connexion</h2>`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), {
        ref_key: "form",
        ref: form,
        class: "flex flex-row flex-wrap w-full sm:w-3/4 md:wd-1/2 lg:wd-1/3 justify-center self-center text-gray-500",
        "validation-schema": schema
      }, {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row w-full group py-4 px-3"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-mail-line",
              class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.email, "fill-primary": !!values.email && !errors.email, "fill-gray-500": !values.email }]
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative w-full"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              id: "email",
              name: "email",
              type: "email",
              required: "",
              autocomplete: "off",
              class: "peer w-full outline-none h-8 autofill:bg-transparent",
              validateOnInput: true
            }, null, _parent2, _scopeId));
            _push2(`<label for="email" class="${serverRenderer.exports.ssrRenderClass([{ "h-1/2 -translate-y-full pl-0": !!values.email, "text-accent": !!errors.email, "text-primary": !!values.email && !errors.email }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])}"${_scopeId}>Email</label><div class="${serverRenderer.exports.ssrRenderClass([{ "border-accent": !!errors.email, "border-primary": !!values.email && !errors.email, "border-gray-500": !values.email }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"])}"${_scopeId}></div></div></div><div class="flex flex-row w-full group py-4 px-3"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-key-fill",
              class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.password, "fill-primary": !!values.password && !errors.password, "fill-gray-500": !values.password }]
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative w-full"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              id: "password",
              name: "password",
              type: "password",
              required: "",
              autocomplete: "off",
              class: "peer w-full outline-none h-8",
              validateOnInput: true
            }, null, _parent2, _scopeId));
            _push2(`<label for="password" class="${serverRenderer.exports.ssrRenderClass([{ "h-1/2 -translate-y-full pl-0": !!values.password, "text-accent": !!errors.password, "text-primary": !!values.password && !errors.password }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])}"${_scopeId}>Password</label><div class="${serverRenderer.exports.ssrRenderClass([{ "border-accent": !!errors.password, "border-primary": !!values.password && !errors.password, "border-gray-500": !values.password }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"])}"${_scopeId}></div></div></div><button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Connexion</button><button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId}>R\xE9initialiser</button>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "flex flex-row w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-mail-line",
                  class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.email, "fill-primary": !!values.email && !errors.email, "fill-gray-500": !values.email }]
                }, null, 8, ["class"]),
                vue_cjs_prod.createVNode("div", { class: "relative w-full" }, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                    id: "email",
                    name: "email",
                    type: "email",
                    required: "",
                    autocomplete: "off",
                    class: "peer w-full outline-none h-8 autofill:bg-transparent",
                    validateOnInput: true
                  }),
                  vue_cjs_prod.createVNode("label", {
                    for: "email",
                    class: [{ "h-1/2 -translate-y-full pl-0": !!values.email, "text-accent": !!errors.email, "text-primary": !!values.email && !errors.email }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"]
                  }, "Email", 2),
                  vue_cjs_prod.createVNode("div", {
                    class: [{ "border-accent": !!errors.email, "border-primary": !!values.email && !errors.email, "border-gray-500": !values.email }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"]
                  }, null, 2)
                ])
              ]),
              vue_cjs_prod.createVNode("div", { class: "flex flex-row w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-key-fill",
                  class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.password, "fill-primary": !!values.password && !errors.password, "fill-gray-500": !values.password }]
                }, null, 8, ["class"]),
                vue_cjs_prod.createVNode("div", { class: "relative w-full" }, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                    id: "password",
                    name: "password",
                    type: "password",
                    required: "",
                    autocomplete: "off",
                    class: "peer w-full outline-none h-8",
                    validateOnInput: true
                  }),
                  vue_cjs_prod.createVNode("label", {
                    for: "password",
                    class: [{ "h-1/2 -translate-y-full pl-0": !!values.password, "text-accent": !!errors.password, "text-primary": !!values.password && !errors.password }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"]
                  }, "Password", 2),
                  vue_cjs_prod.createVNode("div", {
                    class: [{ "border-accent": !!errors.password, "border-primary": !!values.password && !errors.password, "border-gray-500": !values.password }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"]
                  }, null, 2)
                ])
              ]),
              vue_cjs_prod.createVNode("button", {
                type: "submit",
                class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
              }, "Connexion"),
              vue_cjs_prod.createVNode("button", {
                type: "reset",
                class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
              }, "R\xE9initialiser")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const meta$2 = void 0;
const _sfc_main$C = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mentions l\xE9gales`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Mentions l\xE9gales")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-xl text-primary-dark font-marker py-3">Mentions l\xE9gales</div><div><p> Conform\xE9ment aux dispositions de la loi n\xB0 2004-575 du 21 juin 2004 pour la confiance en l\u2019\xE9conomie num\xE9rique, il est pr\xE9cis\xE9 aux utilisateurs du site lestransalpins.org l\u2019identit\xE9 des diff\xE9rents intervenants dans le cadre de sa r\xE9alisation et de son suivi. </p><h3 class="py-3">H\xE9bergeur</h3><div><p>Le site transalpins.org est h\xE9berg\xE9 par la soci\xE9t\xE9 O2switch</p><ul><li>Siret : 510 909 807 00024</li><li>RCS Clermont Ferrand</li><li>SARL au capital de 100 000\u20AC</li></ul></div><p> Le stockage des donn\xE9es personnelles des Utilisateurs est exclusivement r\xE9alis\xE9 sur les centre de donn\xE9es (\xAB clusters \xBB) localis\xE9s en France de la soci\xE9t\xE9 O2switch </p><h3 class="py-3">Cookie</h3><p> Le seul cookie utilis\xE9 par ce site est g\xE9n\xE9r\xE9 lors de l&#39;identification au site, il est r\xE9serv\xE9 pour un usage d&#39;administration du site web </p></div></div>`);
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mentions-legales.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const meta$1 = {
  title: "Mentions l\xE9gales"
};
const _sfc_main$B = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  props: {
    onSubmit: null
  },
  setup(__props) {
    const family = vue_cjs_prod.ref([
      { firstName: null, age: null }
    ]);
    const { value: familyInputValue } = useField("family", void 0);
    const addMember = () => {
      family.value.push({ firstName: null, age: null });
    };
    const removeMember = () => {
      if (family.value.length > 1) {
        family.value.splice(family.value.length - 1, 1);
      }
    };
    const schema = {
      email: "required|email",
      phoneNumber: "required|regex:^0\\d{9}$",
      firstName: "required|min:3|max:60",
      lastName: "required|min:3|max:60",
      city: "required|min:1"
    };
    vue_cjs_prod.watch(family, (newFamily) => {
      familyInputValue.value = newFamily;
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), vue_cjs_prod.mergeProps({
        class: "flex flex-row flex-wrap p-3",
        "validation-schema": schema,
        "initial-values": { acceptance: false }
      }, _attrs), {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="w-full py-3"${_scopeId}>J&#39;en dis un peu sur moi :</h2>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              icon: "ri-mail-line",
              type: "email",
              name: "email",
              error: errors.email,
              value: values.email,
              label: "Email",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              icon: "ri-phone-line",
              name: "phoneNumber",
              error: errors.phoneNumber,
              value: values.phoneNumber,
              label: "Num\xE9ro de t\xE9l\xE9phone",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "firstName",
              error: errors.firstName,
              value: values.firstName,
              label: "Pr\xE9nom",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "lastName",
              error: errors.lastName,
              value: values.lastName,
              label: "Nom",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "city",
              error: errors.city,
              value: values.city,
              label: "Ville actuelle",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              name: "origin",
              error: errors.origin,
              value: values.origin,
              label: "Comment j'ai connu les transalpins ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p${_scopeId}>De combien de personnes est compos\xE9 mon foyer, pr\xE9nom et leur \xE2ge ?</p></div><div class="w-full flex flex-col"${_scopeId}><!--[-->`);
            serverRenderer.exports.ssrRenderList(family.value, (member, i) => {
              _push2(`<div class="flex w-full md:w-1/2 py-2"${_scopeId}><input type="text"${serverRenderer.exports.ssrRenderAttr("value", family.value[i].firstName)} class="w-1/2 border h-8" placeholder="Pr\xE9nom"${_scopeId}><input type="number" min="0" max="99"${serverRenderer.exports.ssrRenderAttr("value", family.value[i].age)} class="w-1/2 border h-8" placeholder="Age"${_scopeId}></div>`);
            });
            _push2(`<!--]--><div class="flex flex-row"${_scopeId}><div class="py-1 px-2 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit cursor-pointer"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-add-line",
              class: "fill-white h-8 w-8"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (family.value.length > 1) {
              _push2(`<div class="py-1 px-2 bg-secondary text-white shadow-md uppercase hover:bg-accent w-fit cursor-pointer"${_scopeId}>`);
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-subtract-line",
                class: "fill-white h-8 w-8"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1q, {
              name: "acceptance",
              error: errors.acceptance,
              label: "En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association \xAB les Transalpins \xBB ne faisant pas partie du bureau",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="w-full py-3"${_scopeId}>Quelle est ma raison d&#39;\xEAtre ? Quelles sont mes motivations pour rejoindre ce projet ?</h2>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "motivationsFreeThinking",
              error: errors.motivationsFreeThinking,
              value: values.motivationsFreeThinking,
              label: "Qu'est-ce qui me motive \xE0 cr\xE9er ou \xE0 m'engager dans un projet d'Oasis ?",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`<div class="w-full"${_scopeId}><p${_scopeId}> Quelles sont les valeurs essentielles que j&#39;aimerais vivre : les valeurs non n\xE9gociables, c-a-d dont l&#39;absence me ferait perdre son sens au projet et ma motivation \xE0 y participer ? </p></div>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "coreValuesHuman",
              error: errors.coreValuesHuman,
              value: values.coreValuesHuman,
              label: "Valeurs humaines",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "coreValuesOther",
              error: errors.coreValuesOther,
              value: values.coreValuesOther,
              label: "Valeurs autres",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "affinity",
              error: errors.affinity,
              value: values.affinity,
              label: "Qu\u2019est-ce qui m'attire dans le projet des transalpins ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "questioning",
              error: errors.questioning,
              value: values.questioning,
              label: "Qu\u2019est-ce qui me questionne dans ce projet ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="w-full py-3"${_scopeId}>Suis-je pr\xEAt.e \xE0 m&#39;investir dans ce projet ?</h2>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "bring",
              error: errors.bring,
              value: values.bring,
              label: "Que suis-je pr\xEAt.e \xE0 lui apporter ?",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "investment",
              error: errors.investment,
              value: values.investment,
              label: "En tant qu\u2019habitant.e, suis-je pr\xEAt.e \xE0 investir financi\xE8rement ? Et combien ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "rent",
              error: errors.rent,
              value: values.rent,
              label: "Suis-je pr\xEAt.e \xE0 payer un loyer ? \xC0 quelle hauteur ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="w-full py-3"${_scopeId}>Ma vie au quotidien</h2><div class="w-full"${_scopeId}><p${_scopeId}> Des questions encore plus concr\xE8tes : A quoi ressemblera ma vie quand je vivrai l\xE0 ? </p></div>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "typicalDay",
              error: errors.typicalDay,
              value: values.typicalDay,
              label: "Je d\xE9cris ma journ\xE9e type",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "dwelling",
              error: errors.dwelling,
              value: values.dwelling,
              label: "Je d\xE9cris mon habitation",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "commonAreas",
              error: errors.commonAreas,
              value: values.commonAreas,
              label: "Je d\xE9cris les espaces communs",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "relationship",
              error: errors.relationship,
              value: values.relationship,
              label: "Je d\xE9cris les relations au sein de l'oasis",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="w-full py-3"${_scopeId}>Mes savoir-faire et savoir-\xEAtre</h2>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "cnvExperience",
              error: errors.cnvExperience,
              value: values.cnvExperience,
              label: "Est-ce que je connais la CNV ? Si oui quelle est mon exp\xE9rience ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "sharedGovernance",
              error: errors.sharedGovernance,
              value: values.sharedGovernance,
              label: "Est-ce que je connais la gouvernance partag\xE9e ? Si oui, quelle est mon exp\xE9rience ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "skills",
              error: errors.skills,
              value: values.skills,
              label: "Quels sont les savoir-faire/\xEAtre que je peux amener au projet",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "limits",
              error: errors.limits,
              value: values.limits,
              label: "Quelles sont mes limites ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "availability",
              error: errors.availability,
              value: values.availability,
              label: "Quelles sont mes disponibilit\xE9s durant la p\xE9riode de montage du projet ? Et mes disponibilit\xE9s en semaine ?",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "meet",
              error: errors.meet,
              value: values.meet,
              label: "Serais-je dispos\xE9.e \xE0 rencontrer des \xE9lus locaux, des banquiers, architectes\u2026 ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              as: "textarea",
              type: "textarea",
              name: "skillUp",
              error: errors.skillUp,
              value: values.skillUp,
              label: "Dans quel domaine utile au projet suis-je pr\xEAt.e \xE0 me former ?",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Envoyer</button>`);
          } else {
            return [
              vue_cjs_prod.createVNode("h2", { class: "w-full py-3" }, "J'en dis un peu sur moi :"),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                icon: "ri-mail-line",
                type: "email",
                name: "email",
                error: errors.email,
                value: values.email,
                label: "Email",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                icon: "ri-phone-line",
                name: "phoneNumber",
                error: errors.phoneNumber,
                value: values.phoneNumber,
                label: "Num\xE9ro de t\xE9l\xE9phone",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "firstName",
                error: errors.firstName,
                value: values.firstName,
                label: "Pr\xE9nom",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "lastName",
                error: errors.lastName,
                value: values.lastName,
                label: "Nom",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "city",
                error: errors.city,
                value: values.city,
                label: "Ville actuelle",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                name: "origin",
                error: errors.origin,
                value: values.origin,
                label: "Comment j'ai connu les transalpins ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("div", null, [
                vue_cjs_prod.createVNode("p", null, "De combien de personnes est compos\xE9 mon foyer, pr\xE9nom et leur \xE2ge ?")
              ]),
              vue_cjs_prod.createVNode("div", { class: "w-full flex flex-col" }, [
                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(family.value, (member, i) => {
                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", { class: "flex w-full md:w-1/2 py-2" }, [
                    vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": ($event) => family.value[i].firstName = $event,
                      class: "w-1/2 border h-8",
                      placeholder: "Pr\xE9nom"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vue_cjs_prod.vModelText, family.value[i].firstName]
                    ]),
                    vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                      type: "number",
                      min: "0",
                      max: "99",
                      "onUpdate:modelValue": ($event) => family.value[i].age = $event,
                      class: "w-1/2 border h-8",
                      placeholder: "Age"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vue_cjs_prod.vModelText, family.value[i].age]
                    ])
                  ]);
                }), 256)),
                vue_cjs_prod.createVNode("div", { class: "flex flex-row" }, [
                  vue_cjs_prod.createVNode("div", {
                    class: "py-1 px-2 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit cursor-pointer",
                    onClick: addMember
                  }, [
                    vue_cjs_prod.createVNode(_sfc_main$1v, {
                      icon: "ri-add-line",
                      class: "fill-white h-8 w-8"
                    })
                  ]),
                  family.value.length > 1 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                    key: 0,
                    class: "py-1 px-2 bg-secondary text-white shadow-md uppercase hover:bg-accent w-fit cursor-pointer",
                    onClick: removeMember
                  }, [
                    vue_cjs_prod.createVNode(_sfc_main$1v, {
                      icon: "ri-subtract-line",
                      class: "fill-white h-8 w-8"
                    })
                  ])) : vue_cjs_prod.createCommentVNode("", true)
                ])
              ]),
              vue_cjs_prod.createVNode(_sfc_main$1q, {
                name: "acceptance",
                error: errors.acceptance,
                label: "En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association \xAB les Transalpins \xBB ne faisant pas partie du bureau",
                class: "w-full md:w-1/2"
              }, null, 8, ["error"]),
              vue_cjs_prod.createVNode("h2", { class: "w-full py-3" }, "Quelle est ma raison d'\xEAtre ? Quelles sont mes motivations pour rejoindre ce projet ?"),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "motivationsFreeThinking",
                error: errors.motivationsFreeThinking,
                value: values.motivationsFreeThinking,
                label: "Qu'est-ce qui me motive \xE0 cr\xE9er ou \xE0 m'engager dans un projet d'Oasis ?",
                class: "w-full"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("div", { class: "w-full" }, [
                vue_cjs_prod.createVNode("p", null, " Quelles sont les valeurs essentielles que j'aimerais vivre : les valeurs non n\xE9gociables, c-a-d dont l'absence me ferait perdre son sens au projet et ma motivation \xE0 y participer ? ")
              ]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "coreValuesHuman",
                error: errors.coreValuesHuman,
                value: values.coreValuesHuman,
                label: "Valeurs humaines",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "coreValuesOther",
                error: errors.coreValuesOther,
                value: values.coreValuesOther,
                label: "Valeurs autres",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "affinity",
                error: errors.affinity,
                value: values.affinity,
                label: "Qu\u2019est-ce qui m'attire dans le projet des transalpins ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "questioning",
                error: errors.questioning,
                value: values.questioning,
                label: "Qu\u2019est-ce qui me questionne dans ce projet ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("h2", { class: "w-full py-3" }, "Suis-je pr\xEAt.e \xE0 m'investir dans ce projet ?"),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "bring",
                error: errors.bring,
                value: values.bring,
                label: "Que suis-je pr\xEAt.e \xE0 lui apporter ?",
                class: "w-full"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "investment",
                error: errors.investment,
                value: values.investment,
                label: "En tant qu\u2019habitant.e, suis-je pr\xEAt.e \xE0 investir financi\xE8rement ? Et combien ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "rent",
                error: errors.rent,
                value: values.rent,
                label: "Suis-je pr\xEAt.e \xE0 payer un loyer ? \xC0 quelle hauteur ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("h2", { class: "w-full py-3" }, "Ma vie au quotidien"),
              vue_cjs_prod.createVNode("div", { class: "w-full" }, [
                vue_cjs_prod.createVNode("p", null, " Des questions encore plus concr\xE8tes : A quoi ressemblera ma vie quand je vivrai l\xE0 ? ")
              ]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "typicalDay",
                error: errors.typicalDay,
                value: values.typicalDay,
                label: "Je d\xE9cris ma journ\xE9e type",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "dwelling",
                error: errors.dwelling,
                value: values.dwelling,
                label: "Je d\xE9cris mon habitation",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "commonAreas",
                error: errors.commonAreas,
                value: values.commonAreas,
                label: "Je d\xE9cris les espaces communs",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "relationship",
                error: errors.relationship,
                value: values.relationship,
                label: "Je d\xE9cris les relations au sein de l'oasis",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("h2", { class: "w-full py-3" }, "Mes savoir-faire et savoir-\xEAtre"),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "cnvExperience",
                error: errors.cnvExperience,
                value: values.cnvExperience,
                label: "Est-ce que je connais la CNV ? Si oui quelle est mon exp\xE9rience ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "sharedGovernance",
                error: errors.sharedGovernance,
                value: values.sharedGovernance,
                label: "Est-ce que je connais la gouvernance partag\xE9e ? Si oui, quelle est mon exp\xE9rience ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "skills",
                error: errors.skills,
                value: values.skills,
                label: "Quels sont les savoir-faire/\xEAtre que je peux amener au projet",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "limits",
                error: errors.limits,
                value: values.limits,
                label: "Quelles sont mes limites ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "availability",
                error: errors.availability,
                value: values.availability,
                label: "Quelles sont mes disponibilit\xE9s durant la p\xE9riode de montage du projet ? Et mes disponibilit\xE9s en semaine ?",
                class: "w-full"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "meet",
                error: errors.meet,
                value: values.meet,
                label: "Serais-je dispos\xE9.e \xE0 rencontrer des \xE9lus locaux, des banquiers, architectes\u2026 ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                as: "textarea",
                type: "textarea",
                name: "skillUp",
                error: errors.skillUp,
                value: values.skillUp,
                label: "Dans quel domaine utile au projet suis-je pr\xEAt.e \xE0 me former ?",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("button", {
                type: "submit",
                class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
              }, "Envoyer")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/front/join/FormJoin.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const _sfc_main$A = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const joinStore = useJoinStore();
    const pageStore = usePageStore();
    const notificationStore = useNotificationStore();
    const page = pageStore.find("/api/pages/nous-rejoindre");
    const onSubmit = async (data, actions) => {
      try {
        await joinStore.create(data);
        notificationStore.showMessage("Le questionnaire a correctement \xE9t\xE9 enregistr\xE9, nous prendrons contact avec toi le plus rapidement possible");
      } catch (e) {
        notificationStore.showError("Erreur dans la formulaire, merci de corriger les champs non valides");
        actions.setErrors(joinStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col py-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Nous rejoindre`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Nous rejoindre")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(page)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, { page: vue_cjs_prod.unref(page) }, null, _parent));
      } else {
        _push(`<h1 class="px-3">J&#39;ai envie de vous rejoindre !</h1>`);
      }
      _push(`<div class="py-4 px-3"><p> Je peux remplir ce questionnaire en ligne ou bien <a href="/files/questionnaire_transalpins_v1.pdf" title="T\xE9l\xE9charger le formulaire" target="_blank" class="text-primary text-underline">T\xE9l\xE9charger le PDF</a> pour le remplir num\xE9riquement ou manuellement et l&#39;envoyer eux transalpins \xE0 l&#39;addresse suivante : <a href="mailto:contact@lestransalpins.org" title="Contacter les transalpins">contact@lestransalpins.org</a></p></div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$B, { "on-submit": onSubmit }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/nous-rejoindre.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const meta = void 0;
const routes = [
  {
    name: "slug",
    path: "/:slug(.*)*",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/[...slug].vue",
    children: [],
    meta: meta$n,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return ____slug_;
    })
  },
  {
    name: "admin-blog-id",
    path: "/admin/blog/:id",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/blog/[id].vue",
    children: [],
    meta: meta$m,
    alias: (meta$m == null ? void 0 : meta$m.alias) || [],
    component: () => Promise.resolve().then(function() {
      return _id_$3;
    })
  },
  {
    name: "admin-blog-add",
    path: "/admin/blog/add",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/blog/add.vue",
    children: [],
    meta: meta$l,
    alias: (meta$l == null ? void 0 : meta$l.alias) || [],
    component: () => Promise.resolve().then(function() {
      return add$3;
    })
  },
  {
    name: "admin-blog",
    path: "/admin/blog",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/blog/index.vue",
    children: [],
    meta: meta$k,
    alias: (meta$k == null ? void 0 : meta$k.alias) || [],
    component: () => Promise.resolve().then(function() {
      return index$7;
    })
  },
  {
    name: "admin-categories-slug",
    path: "/admin/categories/:slug",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/categories/[slug].vue",
    children: [],
    meta: meta$j,
    alias: (meta$j == null ? void 0 : meta$j.alias) || [],
    component: () => Promise.resolve().then(function() {
      return _slug_$1;
    })
  },
  {
    name: "admin-categories-add",
    path: "/admin/categories/add",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/categories/add.vue",
    children: [],
    meta: meta$i,
    alias: (meta$i == null ? void 0 : meta$i.alias) || [],
    component: () => Promise.resolve().then(function() {
      return add$2;
    })
  },
  {
    name: "admin-categories",
    path: "/admin/categories",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/categories/index.vue",
    children: [],
    meta: meta$h,
    alias: (meta$h == null ? void 0 : meta$h.alias) || [],
    component: () => Promise.resolve().then(function() {
      return index$6;
    })
  },
  {
    name: "admin-contact-id",
    path: "/admin/contact/:id",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/contact/[id].vue",
    children: [],
    meta: meta$g,
    alias: (meta$g == null ? void 0 : meta$g.alias) || [],
    component: () => Promise.resolve().then(function() {
      return _id_$2;
    })
  },
  {
    name: "admin-contact",
    path: "/admin/contact",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/contact/index.vue",
    children: [],
    meta: meta$f,
    alias: (meta$f == null ? void 0 : meta$f.alias) || [],
    component: () => Promise.resolve().then(function() {
      return index$5;
    })
  },
  {
    name: "admin",
    path: "/admin",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/index.vue",
    children: [],
    meta: meta$e,
    alias: (meta$e == null ? void 0 : meta$e.alias) || [],
    component: () => Promise.resolve().then(function() {
      return index$4;
    })
  },
  {
    name: "admin-join-id",
    path: "/admin/join/:id",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/join/[id].vue",
    children: [],
    meta: meta$d,
    alias: (meta$d == null ? void 0 : meta$d.alias) || [],
    component: () => Promise.resolve().then(function() {
      return _id_$1;
    })
  },
  {
    name: "admin-join",
    path: "/admin/join",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/join/index.vue",
    children: [],
    meta: meta$c,
    alias: (meta$c == null ? void 0 : meta$c.alias) || [],
    component: () => Promise.resolve().then(function() {
      return index$3;
    })
  },
  {
    name: "admin-media",
    path: "/admin/media",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/media.vue",
    children: [],
    meta: meta$b,
    alias: (meta$b == null ? void 0 : meta$b.alias) || [],
    component: () => Promise.resolve().then(function() {
      return media;
    })
  },
  {
    name: "admin-newsletter",
    path: "/admin/newsletter",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/newsletter.vue",
    children: [],
    meta: meta$a,
    alias: (meta$a == null ? void 0 : meta$a.alias) || [],
    component: () => Promise.resolve().then(function() {
      return newsletter;
    })
  },
  {
    name: "admin-pages-slug",
    path: "/admin/pages/:slug",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/pages/[slug].vue",
    children: [],
    meta: meta$9,
    alias: (meta$9 == null ? void 0 : meta$9.alias) || [],
    component: () => Promise.resolve().then(function() {
      return _slug_;
    })
  },
  {
    name: "admin-pages-add",
    path: "/admin/pages/add",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/pages/add.vue",
    children: [],
    meta: meta$8,
    alias: (meta$8 == null ? void 0 : meta$8.alias) || [],
    component: () => Promise.resolve().then(function() {
      return add$1;
    })
  },
  {
    name: "admin-pages",
    path: "/admin/pages",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/admin/pages/index.vue",
    children: [],
    meta: meta$7,
    alias: (meta$7 == null ? void 0 : meta$7.alias) || [],
    component: () => Promise.resolve().then(function() {
      return index$2;
    })
  },
  {
    name: "blog-id",
    path: "/blog/:id",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/blog/[id].vue",
    children: [],
    meta: meta$6,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _id_;
    })
  },
  {
    name: "blog",
    path: "/blog",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/blog/index.vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index$1;
    })
  },
  {
    name: "contact",
    path: "/contact",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/contact.vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return contact;
    })
  },
  {
    name: "index",
    path: "/",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/index.vue",
    children: [],
    meta: meta$3,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index;
    })
  },
  {
    name: "login",
    path: "/login",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/login.vue",
    children: [],
    meta: meta$2,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return login;
    })
  },
  {
    name: "mentions-legales",
    path: "/mentions-legales",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/mentions-legales.vue",
    children: [],
    meta: meta$1,
    alias: (meta$1 == null ? void 0 : meta$1.alias) || [],
    component: () => Promise.resolve().then(function() {
      return mentionsLegales;
    })
  },
  {
    name: "nous-rejoindre",
    path: "/nous-rejoindre",
    file: "/Users/m.giraudtelme/Code/apps/oasis-manager/app/pages/nous-rejoindre.vue",
    children: [],
    meta,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return nousRejoindre;
    })
  }
];
const configRouterOptions = {};
const routerOptions = __spreadValues({}, configRouterOptions);
const globalMiddleware = [];
const namedMiddleware = {
  "is-admin": () => Promise.resolve().then(function() {
    return isAdmin$1;
  })
};
const _14f7d7b1 = defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = vueRouter_cjs_prod.createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = vueRouter_cjs_prod.createRouter(__spreadProps(__spreadValues({}, routerOptions), {
    history: routerHistory,
    routes
  }));
  nuxtApp.vueApp.use(router);
  const previousRoute = vue_cjs_prod.shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const route = {};
  for (const key in router.currentRoute.value) {
    route[key] = vue_cjs_prod.computed(() => router.currentRoute.value[key]);
  }
  const _activeRoute = vue_cjs_prod.shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _activeRoute.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a2, _b, _c, _d;
    if (((_b = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const activeRoute = {};
  for (const key in _activeRoute.value) {
    activeRoute[key] = vue_cjs_prod.computed(() => _activeRoute.value[key]);
  }
  nuxtApp._route = vue_cjs_prod.reactive(route);
  nuxtApp._activeRoute = vue_cjs_prod.reactive(activeRoute);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  router.afterEach(async (to) => {
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, throwError, [createError({
        statusCode: 404,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.res.statusCode = 404;
    }
  });
  try {
    if (true) {
      await router.push(initialURL);
    }
    await router.isReady();
  } catch (error2) {
    callWithNuxt(nuxtApp, throwError, [error2]);
  }
  router.beforeEach(async (to, from) => {
    var _a2;
    to.meta = vue_cjs_prod.reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a2 = namedMiddleware[entry2]) == null ? void 0 : _a2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, throwError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace(__spreadProps(__spreadValues({}, router.resolve(initialURL)), {
        force: true
      }));
    } catch (error2) {
      callWithNuxt(nuxtApp, throwError, [error2]);
    }
  });
  return { provide: { router } };
});
const PiniaNuxtPlugin = (context, inject2) => {
  const pinia = createPinia();
  {
    context.vueApp.use(pinia);
  }
  inject2("pinia", pinia);
  context.pinia = pinia;
  setActivePinia(pinia);
  pinia._p.push(({ store }) => {
    Object.defineProperty(store, "$nuxt", { value: context });
  });
  {
    {
      context.nuxtState.pinia = pinia.state.value;
    }
  }
};
function normalize(data) {
  if (!!data["hydra:member"]) {
    data["hydra:member"] = data["hydra:member"].map((item) => normalize(item));
    return data;
  }
  return data;
}
class SubmissionError extends Error {
  constructor(errors) {
    super("Submit Validation Failed");
    this.errors = errors;
    if (Error.captureStackTrace !== void 0) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = this.constructor.name;
    return this;
  }
}
const makeParamArray = (key, arr) => arr.map((val) => `${key}[]=${val}`).join("&");
const apiFetch_5382cb14 = defineNuxtPlugin(() => {
  var _a2;
  const config = useRuntimeConfig().public;
  const entryPoint = config.API_BASE_URL + (((_a2 = config.API_BASE_URL) == null ? void 0 : _a2.endsWith("/")) ? "" : "/");
  const jsonLdMimeType = "application/ld+json";
  const route = useRoute();
  const authStore = useAuthStore();
  const fetch = $fetch.create({
    baseURL: entryPoint,
    headers: __spreadValues({}, useRequestHeaders(["cookie"])),
    credentials: "include",
    async onRequest({ request, options }) {
      {
        options.headers["Accept"] = jsonLdMimeType;
      }
      if (request.body !== null) {
        {
          options.headers["Content-Type"] = jsonLdMimeType;
        }
      }
      if (options.params) {
        const params = normalize(options.params);
        const queryString = Object.keys(params).map((key) => Array.isArray(params[key]) ? makeParamArray(key, params[key]) : `${key}=${params[key]}`).join("&");
        request = `${request}?${queryString}`;
      }
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]", request, error);
    },
    async onResponse({ request, response, options }) {
      if (response.ok) {
        return;
      }
      if (response.status === 401 && route.name !== "login" && !request.includes("/refresh")) {
        await authStore.logout();
        navigateTo({ path: "/login" });
      }
      const error = response._data["hydra:description"] || response._data["hydra:title"] || "An error occurred.";
      if (!response._data.violations) {
        throw new Error(error);
      }
      const errors = { _error: error };
      response._data.violations.forEach((violation) => errors[violation.propertyPath] ? errors[violation.propertyPath] += "\n" + errors[violation.propertyPath] : errors[violation.propertyPath] = violation.message);
      throw new SubmissionError(errors);
    },
    async onResponseError({ request, response, options }) {
      console.log("[fetch response error]", request, response.status, response._data);
    }
  });
  return {
    provide: {
      apiFetch: fetch
    }
  };
});
function piniaApiPlugin({ store }) {
  store.load = async (id, params = {}) => {
    store.$state[CRUD_MODE.EDITION] = Object.assign(__spreadValues({}, store.$state[CRUD_MODE.EDITION]));
    store.toggleLoading(CRUD_MODE.EDITION);
    store.$state[CRUD_MODE.EDITION].retrieved = await store.$nuxt.$apiFetch(`${store.resource}/${id}`, {
      params
    }).catch(async (e) => {
      await store.handleError(CRUD_MODE.EDITION, e);
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.EDITION);
    });
  };
  store.fetchAll = async (params = {}, reset = true) => {
    store.$state[CRUD_MODE.LIST] = Object.assign(__spreadValues({}, store.$state[CRUD_MODE.LIST]));
    store.toggleLoading(CRUD_MODE.LIST);
    if (reset) {
      store.resetList();
    }
    const data = await store.$nuxt.$apiFetch(store.resource, {
      params
    }).catch(async (e) => {
      await store.handleError(CRUD_MODE.LIST, e);
    });
    if (!data) {
      return;
    }
    data["hydra:member"].forEach((item) => {
      store.addItem(item, store);
    });
    store.$state[CRUD_MODE.LIST].totalItems = data["hydra:totalItems"];
    store.$state[CRUD_MODE.LIST].view = data["hydra:view"];
    store.toggleLoading(CRUD_MODE.LIST);
    return store.list;
  };
  store.resetList = () => {
    store.$state[CRUD_MODE.LIST].allIds = [];
    store.$state[CRUD_MODE.LIST].byId = {};
  };
  store.addItem = (item) => {
    store.$state[CRUD_MODE.LIST].allIds.push(item["@id"]);
    store.$state[CRUD_MODE.LIST].byId[item["@id"]] = item;
  };
  store.find = (id) => {
    var _a2;
    return (_a2 = store.$state[CRUD_MODE.LIST].byId[id]) != null ? _a2 : null;
  };
  store.toggleLoading = (mode) => {
    store.$state[mode].isLoading = !store.$state[mode].isLoading;
  };
  store.handleError = (mode, e) => {
    if (mode !== CRUD_MODE.EDITION && mode !== CRUD_MODE.CREATION && mode !== CRUD_MODE.DELETION) {
      return;
    }
    if (e instanceof SubmissionError) {
      store.$state[mode].violations = e.errors;
      store.$state[mode].error = e.errors._error;
      return Promise.reject(e);
    }
    store.$state[mode].error = e.message;
    return Promise.reject(e);
  };
  store.update = async (id, item) => {
    store.$state[CRUD_MODE.EDITION] = Object.assign(__spreadValues({}, store.$state[CRUD_MODE.EDITION]));
    store.$state[CRUD_MODE.EDITION].edited = null;
    store.$state[CRUD_MODE.EDITION].error = "";
    store.$state[CRUD_MODE.EDITION].violations = null;
    store.toggleLoading(CRUD_MODE.EDITION);
    store.$state[CRUD_MODE.EDITION].edited = await store.$nuxt.$apiFetch(`${store.resource}/${id}`, {
      method: "PUT",
      body: item
    }).catch(async (e) => {
      await store.handleError(CRUD_MODE.EDITION, e);
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.EDITION);
    });
    return store.$state[CRUD_MODE.EDITION].edited;
  };
  store.create = async (values) => {
    store.$state[CRUD_MODE.CREATION] = Object.assign(__spreadValues({}, store.$state[CRUD_MODE.CREATION]));
    store.$state[CRUD_MODE.CREATION].created = null;
    store.$state[CRUD_MODE.CREATION].error = "";
    store.$state[CRUD_MODE.CREATION].violations = null;
    store.toggleLoading(CRUD_MODE.CREATION);
    store.$state[CRUD_MODE.CREATION].created = await store.$nuxt.$apiFetch(`${store.resource}`, {
      method: "POST",
      body: values
    }).catch(async (e) => {
      await store.handleError(CRUD_MODE.CREATION, e);
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.CREATION);
    });
    return store.$state[CRUD_MODE.CREATION].created;
  };
  store.remove = async (identifier) => {
    store.$state[CRUD_MODE.DELETION] = Object.assign(__spreadValues({}, store.$state[CRUD_MODE.DELETION]));
    store.toggleLoading(CRUD_MODE.DELETION);
    store.$state[CRUD_MODE.DELETION].deleted = await store.$nuxt.$apiFetch(`${store.resource}/${identifier}`, {
      method: "DELETE"
    }).catch(async (e) => {
      await store.handleError(CRUD_MODE.DELETION, e);
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.DELETION);
    });
  };
  store.fetchSelectItems = async ({ params = { "properties[]": ["name"] } } = {}) => {
    store.$state[CRUD_MODE.SELECTION] = Object.assign(__spreadValues({}, store.$state[CRUD_MODE.SELECTION]));
    store.toggleLoading(CRUD_MODE.SELECTION);
    const res = await store.$nuxt.$apiFetch(store.resource, {
      params
    }).catch(async (e) => {
      await store.handleError(CRUD_MODE.SELECTION, e);
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.SELECTION);
    });
    if (!res) {
      return;
    }
    store.$state[CRUD_MODE.SELECTION].selectItems = res["hydra:member"];
  };
  store.selectItemList = vue_cjs_prod.computed(() => (valueExpr = "@id", labelExpr = "name") => {
    const items = store.$state[CRUD_MODE.SELECTION].selectItems.map((item) => {
      return {
        value: item[valueExpr],
        label: item[labelExpr]
      };
    });
    items.unshift({
      value: null,
      label: "Selectionne un \xE9l\xE9ment..."
    });
    return items;
  });
  store.list = vue_cjs_prod.computed(() => {
    return store.$state[CRUD_MODE.LIST].allIds.map((id) => store.$state[CRUD_MODE.LIST].byId[id]);
  });
}
const apiPinia_2bfbc381 = defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(piniaApiPlugin);
});
const init_59ee0c44 = defineNuxtPlugin(async () => {
  let __temp, __restore;
  const authStore = useAuthStore();
  [__temp, __restore] = executeAsync(() => authStore.refresh()), await __temp, __restore();
});
const code = "fr";
const messages = {
  _default: "Le champ {field} est invalide",
  alpha: "Le champ {field} ne peut contenir que des lettres",
  alpha_num: "Le champ {field} ne peut contenir que des caract\xE8res alpha-num\xE9riques",
  alpha_dash: "Le champ {field} ne peut contenir que des caract\xE8res alpha-num\xE9riques, tirets ou soulign\xE9s",
  alpha_spaces: "Le champ {field} ne peut contenir que des lettres ou des espaces",
  between: "Le champ {field} doit \xEAtre compris entre 0:{min} et 1:{max}",
  confirmed: "Le champ {field} ne correspond pas",
  digits: "Le champ {field} doit \xEAtre un nombre entier de 0:{length} chiffres",
  dimensions: "Le champ {field} doit avoir une taille de 0:{width} pixels par 1:{height} pixels",
  email: "Le champ {field} doit \xEAtre une adresse e-mail valide",
  excluded: "Le champ {field} doit \xEAtre une valeur valide",
  ext: "Le champ {field} doit \xEAtre un fichier valide",
  image: "Le champ {field} doit \xEAtre une image",
  integer: "Le champ {field} doit \xEAtre un entier",
  length: "Le champ {field} doit contenir 0:{length} caract\xE8res",
  max_value: "Le champ {field} doit avoir une valeur de 0:{max} ou moins",
  max: "Le champ {field} ne peut pas contenir plus de 0:{length} caract\xE8res",
  mimes: "Le champ {field} doit avoir un type MIME valide",
  min_value: "Le champ {field} doit avoir une valeur de 0:{min} ou plus",
  min: "Le champ {field} doit contenir au minimum 0:{length} caract\xE8res",
  numeric: "Le champ {field} ne peut contenir que des chiffres",
  one_of: "Le champ {field} doit \xEAtre une valeur valide",
  regex: "Le champ {field} est invalide",
  required: "Le champ {field} est obligatoire",
  required_if: "Le champ {field} est obligatoire lorsque {target} poss\xE8de cette valeur",
  size: "Le champ {field} doit avoir un poids inf\xE9rieur \xE0 0:{size}KB"
};
const fr = {
  code,
  messages
};
const setupVeeValidate_c0514336 = defineNuxtPlugin(async () => {
  Object.keys(AllRules).forEach((rule) => {
    if (rule === "default") {
      return;
    }
    defineRule(rule, AllRules[rule]);
  });
  configure({
    generateMessage: localize({
      fr
    })
  });
  setLocale("fr");
});
const _plugins = [
  preload,
  componentsPlugin_08759b39,
  vueuseHead_297ed1ff,
  _4d83301a,
  _14f7d7b1,
  PiniaNuxtPlugin,
  apiFetch_5382cb14,
  apiPinia_2bfbc381,
  init_59ee0c44,
  setupVeeValidate_c0514336
];
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$z = {
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: String,
      default: "404"
    },
    statusMessage: {
      type: String,
      default: "Not Found"
    },
    description: {
      type: String,
      default: "Sorry, the page you are looking for could not be found."
    },
    backHome: {
      type: String,
      default: "Go back home"
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-220cce0a><div class="fixed left-0 right-0 spotlight z-10" data-v-220cce0a></div><div class="max-w-520px text-center z-20" data-v-220cce0a><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-220cce0a>${serverRenderer.exports.ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-220cce0a>${serverRenderer.exports.ssrInterpolate(__props.description)}</p><div class="w-full flex items-center justify-center" data-v-220cce0a>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(__props.backHome)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.backHome), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui-templates/dist/templates/error-404.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const Error404 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-220cce0a"]]);
const _sfc_main$y = {
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: String,
      default: "500"
    },
    statusMessage: {
      type: String,
      default: "Server error"
    },
    description: {
      type: String,
      default: "This page is temporarily unavailable."
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-2b1feed0><div class="fixed -bottom-1/2 left-0 right-0 h-1/2 spotlight" data-v-2b1feed0></div><div class="max-w-520px text-center" data-v-2b1feed0><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-2b1feed0>${serverRenderer.exports.ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-2b1feed0>${serverRenderer.exports.ssrInterpolate(__props.description)}</p></div></div>`);
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui-templates/dist/templates/error-500.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const Error500 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-2b1feed0"]]);
const _sfc_main$w = {
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    var _a2;
    const props = __props;
    const error = props.error;
    (error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = String(error.statusCode || 500);
    const is404 = statusCode === "404";
    const statusMessage = (_a2 = error.statusMessage) != null ? _a2 : is404 ? "Page Not Found" : "Internal Server Error";
    const description = error.message || error.toString();
    const stack2 = void 0;
    const ErrorTemplate = is404 ? Error404 : Error500;
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorTemplate), vue_cjs_prod.mergeProps({ statusCode: vue_cjs_prod.unref(statusCode), statusMessage: vue_cjs_prod.unref(statusMessage), description: vue_cjs_prod.unref(description), stack: vue_cjs_prod.unref(stack2) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = {
  __ssrInlineRender: true,
  setup(__props) {
    const nuxtApp = useNuxtApp();
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    vue_cjs_prod.onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, throwError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = vue_cjs_prod.resolveComponent("App");
      serverRenderer.exports.ssrRenderSuspense(_push, {
        default: () => {
          if (vue_cjs_prod.unref(error)) {
            _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$w), { error: vue_cjs_prod.unref(error) }, null, _parent));
          } else {
            _push(serverRenderer.exports.ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const layouts = {
  admin: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return admin;
  })),
  default: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _default;
  }))
};
const defaultLayoutTransition = { name: "layout", mode: "out-in" };
const __nuxt_component_0 = vue_cjs_prod.defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a2, _b, _c;
      const layout = (_b = (_a2 = vue_cjs_prod.isRef(props.name) ? props.name.value : props.name) != null ? _a2 : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout && layout in layouts;
      return _wrapIf(vue_cjs_prod.Transition, hasLayout && ((_c = route.meta.layoutTransition) != null ? _c : defaultLayoutTransition), _wrapIf(layouts[layout], hasLayout, context.slots)).default();
    };
  }
});
const _sfc_main$u = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = vue_cjs_prod.resolveComponent("NuxtPage");
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext = {}) {
    const vueApp = vue_cjs_prod.createApp(_sfc_main$v);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      ssrContext.error = ssrContext.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);
const _sfc_main$t = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pageStore = usePageStore();
    const page = pageStore.findBySlug(route.params.slug[0]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(page) ? vue_cjs_prod.unref(page).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise")}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(page) ? vue_cjs_prod.unref(page).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(page) !== null && vue_cjs_prod.unref(page).mediaNode !== null) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1u, {
          "media-node": vue_cjs_prod.unref(page).mediaNode
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(page)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, {
          page: vue_cjs_prod.unref(page),
          class: "p-3"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogArticleStore = useBlogArticleStore();
    const route = useRoute();
    const articleEdition = useState("page-edition", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await blogArticleStore.load(route.params.id, {
        "groups[]": "blog_article:read:edition"
      });
      articleEdition.value = blogArticleStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await blogArticleStore.update(data.id, data);
        notificationStore.showMessage("Article correctement \xE9dit\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la sauvegarde l'article, v\xE9rifie le formulaire");
        actions.setErrors(blogArticleStore[CRUD_MODE.Edition].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">\xC9dition d&#39;un article</h1>`);
      if (vue_cjs_prod.unref(articleEdition)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$14, {
          article: vue_cjs_prod.unref(articleEdition),
          "onUpdate:article": ($event) => vue_cjs_prod.isRef(articleEdition) ? articleEdition.value = $event : null,
          "submit-handler": submit,
          errors: vue_cjs_prod.unref(blogArticleStore)[vue_cjs_prod.unref(CRUD_MODE).EDITION].violations
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog/[id].vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _id_$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const blogArticleStore = useBlogArticleStore();
    useRoute();
    useNuxtApp();
    const articleCreation = useState("article-creation", () => {
      return {
        content: "",
        isPublished: false
      };
    });
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      try {
        await blogArticleStore.create(data);
        notificationStore.showMessage("Article correctement cr\xE9e");
        navigateTo({ name: "admin-blog-id", params: { id: blogArticleStore[CRUD_MODE.CREATION].created.id } });
      } catch (e) {
        notificationStore.showError("Erreur dans la cr\xE9ation l'article, v\xE9rifie le formulaire");
        actions.setErrors(blogArticleStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">Cr\xE9ation d&#39;une article</h1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$14, {
        article: vue_cjs_prod.unref(articleCreation),
        "onUpdate:article": ($event) => vue_cjs_prod.isRef(articleCreation) ? articleCreation.value = $event : null,
        "submit-handler": submit,
        errors: vue_cjs_prod.unref(blogArticleStore)[vue_cjs_prod.unref(CRUD_MODE).CREATION].violations
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog/add.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const add$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogArticleStore = useBlogArticleStore();
    const notificationStore = useNotificationStore();
    useRoute();
    const { data, refresh } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-blog-article-list", async () => {
      await blogArticleStore.fetchAll();
      return blogArticleStore.list;
    })), __temp = await __temp, __restore(), __temp);
    const dialog = vue_cjs_prod.ref(false);
    const articleToDelete = vue_cjs_prod.ref(null);
    const handleDelete = async () => {
      if (!articleToDelete.value) {
        return;
      }
      try {
        await blogArticleStore.remove(articleToDelete.value.id);
        refresh();
        notificationStore.showMessage("Article correctement supprim\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la suppression de l'article");
      }
      dialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: { name: "admin-blog-add" },
        class: "py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-add-line",
              class: "fill-white w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pl-2"${_scopeId}>Cr\xE9er un article de blog</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1v, {
                icon: "ri-add-line",
                class: "fill-white w-8 h-8"
              }),
              vue_cjs_prod.createVNode("div", { class: "pl-2" }, "Cr\xE9er un article de blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1 md:pl-2">Titre</div><div class="w-full md:w-1/6 flex-1">Tags</div><div class="w-full md:w-1/6 flex-initial">Auteur</div><div class="w-full md:w-1/12 flex-initial">Est publi\xE9 ?</div><div class="w-full md:w-1/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (article) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1 md:pl-2">${serverRenderer.exports.ssrInterpolate(article.title)}</div><div class="w-full md:w-1/6 flex-1">${serverRenderer.exports.ssrInterpolate(article.tags ? article.tags.join(", ") : "")}</div><div class="w-full md:w-1/6 flex-initial">${serverRenderer.exports.ssrInterpolate(article.createdBy.nickname)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(article.isPublished)}</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-blog-id", params: { id: article.id } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-edit-line",
                class: "fill-white w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-edit-line",
                  class: "fill-white w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="bg-accent flex-auto flex items-stretch justify-center"><div class="w-full flex items-center justify-center cursor-pointer">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-white w-4 h-4"
        }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]-->`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$11, {
        open: dialog.value,
        "onUpdate:open": ($event) => dialog.value = $event,
        "handle-remove": handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog/index.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const index$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageCategoryStore = usePageCategoryStore();
    const route = useRoute();
    const categoryEdition = useState("page-edition", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await pageCategoryStore.load(route.params.slug);
      categoryEdition.value = pageCategoryStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageCategoryStore.update(data.slug, data);
        notificationStore.showMessage("Cat\xE9gorie correctement \xE9dit\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la sauvegarde la cat\xE9gorie, v\xE9rifie le formulaire");
        actions.setErrors(pageCategoryStore[CRUD_MODE.Edition].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">\xC9dition d&#39;une cat\xE9gorie</h1>`);
      if (vue_cjs_prod.unref(categoryEdition)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$$, {
          category: vue_cjs_prod.unref(categoryEdition),
          "onUpdate:category": ($event) => vue_cjs_prod.isRef(categoryEdition) ? categoryEdition.value = $event : null,
          "submit-handler": submit,
          errors: vue_cjs_prod.unref(pageCategoryStore)[vue_cjs_prod.unref(CRUD_MODE).EDITION].violations
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/[slug].vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _slug_$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$p
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$o = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const pageCategoryStore = usePageCategoryStore();
    useRoute();
    useNuxtApp();
    const categoryCreation = useState("page-creation", () => {
      return {
        isPublished: false,
        showInMenu: false
      };
    });
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageCategoryStore.create(data);
        notificationStore.showMessage("Cat\xE9gorie correctement cr\xE9e");
        navigateTo({ name: "admin-categories-slug", params: { slug: pageCategoryStore[CRUD_MODE.CREATION].created.slug } });
      } catch (e) {
        notificationStore.showError("Erreur dans la cr\xE9ation la cat\xE9gorie, v\xE9rifie le formulaire");
        actions.setErrors(pageCategoryStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">Cr\xE9ation d&#39;une page</h1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$$, {
        category: vue_cjs_prod.unref(categoryCreation),
        "onUpdate:category": ($event) => vue_cjs_prod.isRef(categoryCreation) ? categoryCreation.value = $event : null,
        "submit-handler": submit,
        errors: vue_cjs_prod.unref(pageCategoryStore)[vue_cjs_prod.unref(CRUD_MODE).CREATION].violations
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/add.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const add$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$n = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageCategoryStore = usePageCategoryStore();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("page-category-list", async () => {
      await pageCategoryStore.fetchAll();
      return pageCategoryStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: { name: "admin-categories-add" },
        class: "py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-add-line",
              class: "fill-white w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pl-2"${_scopeId}>Cr\xE9er une cat\xE9gorie</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1v, {
                icon: "ri-add-line",
                class: "fill-white w-8 h-8"
              }),
              vue_cjs_prod.createVNode("div", { class: "pl-2" }, "Cr\xE9er une cat\xE9gorie")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1">Nom</div><div class="w-full md:w-1/12 flex-initial">Est publi\xE9 ?</div><div class="w-full md:w-1/12 flex-initial">Menu</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (category) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(category.name)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(category.isPublished)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(category.showInMenu)}</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch"><div class="bg-primary hover:bg-primary-dark flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-categories-slug", params: { slug: category.slug } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-edit-line",
                class: "fill-white w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-edit-line",
                  class: "fill-white w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="bg-secondary hover:bg-accent flex-auto flex items-stretch justify-center"><div class="w-full flex items-center justify-center cursor-pointer">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-white w-4 h-4"
        }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/index.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const index$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { formatDate } = useDateHelper();
    const contactStore = useContactStore();
    const route = useRoute();
    const contact2 = useState("contact-view", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await contactStore.load(route.params.id, {
        "groups[]": "blog_article:read:edition"
      });
      contact2.value = contactStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">D\xE9tail d&#39;un contact</h1><div class="py-2"> Pr\xE9nom et Nom : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).firstName)} ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).lastName)}</div><div class="py-2"> Email et num\xE9ro : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).email)} ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).phoneNumber)}</div><div class="py-2"> Date et ip : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(vue_cjs_prod.unref(contact2).createdAt))} ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).ip)}</div><div class="py-2"> Sujet : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).subject)}</div><div class="py-2">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(contact2).content)}</div></div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/contact/[id].vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _id_$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const contactStore = useContactStore();
    const { formatDate } = useDateHelper();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-contact-list", async () => {
      await contactStore.fetchAll({
        "order[createdAt]": "desc"
      });
      return contactStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><div class="flex flex-row flex-wrap items-center justify-between border-b-2 font-bold h-9"><div class="w-full md:w-1/5 flex-1">Email</div><div class="w-full md:w-2/12 flex-initial">Pr\xE9nom</div><div class="w-full md:w-2/12 flex-initial">Nom</div><div class="w-full md:w-2/12 flex-initial">Num\xE9ro</div><div class="w-full md:w-2/12 flex-initial">Nous a contact\xE9 le</div><div class="w-full md:w-2/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (contact2) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(contact2.email)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.firstName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.lastName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.phoneNumber)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(contact2.createdAt))}</div><div class="w-full md:w-2/12 flex-initial"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-contact-id", params: { id: contact2.id } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-eye-fill",
                class: "fill-white w-8 h-8"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-eye-fill",
                  class: "fill-white w-8 h-8"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/contact/index.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const index$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><h1>Administration</h1><div><p>Utiliser le menu pour naviguer</p></div></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const index$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const joinStore = useJoinStore();
    const route = useRoute();
    const join = useState("join-view", () => null);
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await joinStore.load(route.params.id, {
        "groups[]": "blog_article:read:edition"
      });
      join.value = joinStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const family = vue_cjs_prod.computed(() => {
      return join.value.family.filter((member) => !!member.firstName);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h2 class="w-full py-3">J&#39;en dis un peu sur moi :</h2><div class="flex py-3"><div class="w-1/2">Email : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).email)}</div><div class="w-1/2">Num\xE9ro de t\xE9l\xE9phone :${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).phoneNumber)}</div></div><div class="flex py-3"><div class="w-1/2">Pr\xE9nom : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).firstName)}</div><div class="w-1/2">Nom : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).lastName)}</div></div><div class="flex py-3"><div class="w-1/2">Ville actuelle : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).city)}</div><div class="w-1/2">Comment j&#39;ai connu les transalpins ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).origin)}</div></div><div class="py-3"><p>De combien de personnes est compos\xE9 ton foyer, pr\xE9nom et \xE2ge des membres du foyer ?</p></div><div class="flex flex-col py-3"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(family), (member) => {
        _push(`<div>${serverRenderer.exports.ssrInterpolate(member.firstName)} - ${serverRenderer.exports.ssrInterpolate(member.age)} an(s)</div>`);
      });
      _push(`<!--]--></div><h2 class="w-full py-3"> Quelle est ma raison d&#39;\xEAtre ? Quelles sont mes motivations pour rejoindre ce projet ? </h2><div class="py-3"> Qu&#39;est-ce qui me motive \xE0 cr\xE9er ou \xE0 m&#39;engager dans un projet d&#39;Oasis ? ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).motivationsFreeThinking)}</div><div class="w-full py-3"> Quelles sont les valeurs essentielles que j&#39;aimerais vivre : les valeurs non n\xE9gociables, c-a-d dont l&#39;absence me ferait perdre son sens au projet et ma motivation \xE0 y participer ? </div><div class="flex py-3"><div class="w-1/2">Valeurs humaines : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).coreValuesHuman)}</div><div class="w-1/2">Valeurs autres : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).coreValuesOther)}</div></div><div class="flex py-3"><div class="w-1/2">Qu\u2019est-ce qui m&#39;attire dans le projet des transalpins ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).affinity)}</div><div class="w-1/2">Qu\u2019est-ce qui me questionne dans ce projet ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).questioning)}</div></div><h2 class="w-full py-3"> Suis-je pr\xEAt.e \xE0 m&#39;investir dans ce projet ? </h2><div class="py-3"> Que suis-je pr\xEAt.e \xE0 lui apporter ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).bring)}</div><div class="flex py-3"><div class="w-1/2">En tant qu\u2019habitant.e, suis-je pr\xEAt.e \xE0 investir financi\xE8rement ? Et combien ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).investment)}</div><div class="w-1/2">Suis-je pr\xEAt.e \xE0 payer un loyer ? \xC0 quelle hauteur ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).rent)}</div></div><h2 class="w-full py-3">Ma vie au quotidien</h2><div class="w-full">Des questions encore plus concr\xE8tes : A quoi ressemblera ma vie quand je vivrai l\xE0 ?</div><div class="flex py-3"><div class="w-1/2">Je d\xE9cris ma journ\xE9e type : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).typicalDay)}</div><div class="w-1/2">Je d\xE9cris mon habitation : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).dwelling)}</div></div><div class="flex py-3"><div class="w-1/2">Je d\xE9cris les espaces communs : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).commonAreas)}</div><div class="w-1/2">Je d\xE9cris les relations au sein de l&#39;oasis : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).relationship)}</div></div><h2 class="w-full py-3">Mes savoir-faire et savoir-\xEAtre</h2><div class="flex py-3"><div class="w-1/2">Est-ce que je connais la CNV ? Si oui quelle est mon exp\xE9rience ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).cnvExperience)}</div><div class="w-1/2">Est-ce que je connais la gouvernance partag\xE9e ? Si oui, quelle est mon exp\xE9rience ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).sharedGovernance)}</div></div><div class="flex py-3"><div class="w-1/2">Quels sont les savoir-faire/\xEAtre que je peux amener au projet ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).skills)}</div><div class="w-1/2">Quelles sont mes limites ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).limits)}</div></div><div class="py-3"> Quelles sont mes disponibilit\xE9s durant la p\xE9riode de montage du projet ? Et mes disponibilit\xE9s en semaine ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).availability)}</div><div class="flex py-3"><div class="w-1/2">Serais-je dispos\xE9.e \xE0 rencontrer des \xE9lus locaux, des banquiers, architectes\u2026 ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).meet)}</div><div class="w-1/2">Dans quel domaine utile au projet suis-je pr\xEAt.e \xE0 me former ? : ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(join).skillUp)}</div></div></div>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/join/[id].vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _id_$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const joinStore = useJoinStore();
    const { formatDate } = useDateHelper();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-join-list", async () => {
      await joinStore.fetchAll({
        "order[createdAt]": "desc"
      });
      return joinStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><div class="flex flex-row flex-wrap items-center justify-between border-b-2 font-bold h-9"><div class="w-full md:w-1/5 flex-1">Email</div><div class="w-full md:w-2/12 flex-initial">Pr\xE9nom</div><div class="w-full md:w-2/12 flex-initial">Nom</div><div class="w-full md:w-2/12 flex-initial">A rempli le formulaire le</div><div class="w-full md:w-2/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (join) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(join.email)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(join.firstName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(join.lastName)}</div><div class="w-full md:w-2/12 flex-initial">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(join.createdAt))}</div><div class="w-full md:w-2/12 flex-initial"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-join-id", params: { id: join.id } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-eye-fill",
                class: "fill-white w-8 h-8"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-eye-fill",
                  class: "fill-white w-8 h-8"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/join/index.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1b, vue_cjs_prod.mergeProps({
        "show-selection": false,
        class: "flex-auto pl-3 pt-3"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/media.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const media = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const contactNewsetterStore = useContactNewsletterStore();
    const { formatDate } = useDateHelper();
    useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("admin-contact-newsletter-list", async () => {
      await contactNewsetterStore.fetchAll({
        "order[createdAt]": "desc"
      });
      return contactNewsetterStore.list;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1">Email</div><div class="w-full md:w-1/12 flex-initial">Ip</div><div class="w-full md:w-1/12 flex-initial">Cr\xE9\xE9 le</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (contact2) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(contact2.email)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(contact2.ip)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(formatDate)(contact2.createdAt))}</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/newsletter.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const newsletter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageStore = usePageStore();
    const route = useRoute();
    useNuxtApp();
    const pageEdition = useState("page-edition", () => null);
    usePageLogStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("async-page-edition", async () => {
      await pageStore.load(route.params.slug, {
        "groups[]": "page:read:edition"
      });
      pageEdition.value = pageStore[CRUD_MODE.EDITION].retrieved;
    })), await __temp, __restore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageStore.update(data.url, data);
        notificationStore.showMessage("Page correctement \xE9dit\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la sauvegarde la page, v\xE9rifie le formulaire");
        actions.setErrors(pageStore[CRUD_MODE.Edition].violations);
      }
    };
    let autoSaveInterval = null;
    vue_cjs_prod.onMounted(() => {
    });
    vue_cjs_prod.onBeforeUnmount(() => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
      autoSaveInterval = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">\xC9dition d&#39;une page</h1>`);
      if (vue_cjs_prod.unref(pageEdition)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$P, {
          page: vue_cjs_prod.unref(pageEdition),
          "onUpdate:page": ($event) => vue_cjs_prod.isRef(pageEdition) ? pageEdition.value = $event : null,
          "submit-handler": submit,
          errors: vue_cjs_prod.unref(pageStore)[vue_cjs_prod.unref(CRUD_MODE).EDITION].violations
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/pages/[slug].vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const pageStore = usePageStore();
    useRoute();
    useNuxtApp();
    const pageCreation = useState("page-creation", () => {
      return {
        content: "",
        isPublished: false,
        showInMenu: false
      };
    });
    usePageLogStore();
    const notificationStore = useNotificationStore();
    const submit = async (data, actions) => {
      if (data.isPublished === "true") {
        data.isPublished = false;
      }
      if (data.showInMenu === "true") {
        data.showInMenu = false;
      }
      try {
        await pageStore.create(data);
        notificationStore.showMessage("Page correctement cr\xE9e");
        navigateTo({ name: "admin-pages-slug", params: { slug: pageStore[CRUD_MODE.CREATION].created.url } });
      } catch (e) {
        notificationStore.showError("Erreur dans la cr\xE9ation la page, v\xE9rifie le formulaire");
        actions.setErrors(pageStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}><h1 class="mb-4">Cr\xE9ation d&#39;une page</h1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$P, {
        page: vue_cjs_prod.unref(pageCreation),
        "onUpdate:page": ($event) => vue_cjs_prod.isRef(pageCreation) ? pageCreation.value = $event : null,
        "submit-handler": submit,
        errors: vue_cjs_prod.unref(pageStore)[vue_cjs_prod.unref(CRUD_MODE).CREATION].violations
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/pages/add.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const add$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageStore = usePageStore();
    const notificationStore = useNotificationStore();
    useRoute();
    const { data, refresh } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("page-list", async () => {
      await pageStore.fetchAll();
      return pageStore.list;
    })), __temp = await __temp, __restore(), __temp);
    const dialog = vue_cjs_prod.ref(false);
    const pageToDelete = vue_cjs_prod.ref(null);
    const handleDelete = async () => {
      if (!pageToDelete.value) {
        return;
      }
      try {
        await pageStore.remove(pageToDelete.value.url);
        refresh();
        notificationStore.showMessage("Page correctement supprim\xE9e");
      } catch (e) {
        notificationStore.showError("Erreur dans la suppression de la page");
      }
      dialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: { name: "admin-pages-add" },
        class: "py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-add-line",
              class: "fill-white w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pl-2"${_scopeId}>Cr\xE9er une page</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1v, {
                icon: "ri-add-line",
                class: "fill-white w-8 h-8"
              }),
              vue_cjs_prod.createVNode("div", { class: "pl-2" }, "Cr\xE9er une page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 h-9 border-b-2 font-bold"><div class="w-full md:w-1/5 flex-1 md:pl-2">Titre</div><div class="w-full md:w-1/6 flex-initial">Url</div><div class="w-full md:w-1/6 flex-initial">Auteur</div><div class="w-full md:w-1/5 flex-1">Cat\xE9gorie</div><div class="w-full md:w-1/12 flex-initial">Est publi\xE9 ?</div><div class="w-full md:w-1/12 flex-initial">Menu</div><div class="w-full md:w-1/12 flex-initial">Actions</div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(data), (page) => {
        _push(`<div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9"><div class="w-full md:w-1/5 flex-1 md:pl-2">${serverRenderer.exports.ssrInterpolate(page.title)}</div><div class="w-full md:w-1/6 flex-initial">/${serverRenderer.exports.ssrInterpolate(page.url)}</div><div class="w-full md:w-1/6 flex-initial">${serverRenderer.exports.ssrInterpolate(page.createdBy.nickname)}</div><div class="w-full md:w-1/5 flex-1">${serverRenderer.exports.ssrInterpolate(page.category ? page.category.name : "N/A")}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(page.isPublished)}</div><div class="w-full md:w-1/12 flex-initial">${serverRenderer.exports.ssrInterpolate(page.showInMenu)}</div><div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch"><div class="bg-primary flex-auto flex items-stretch justify-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "admin-pages-slug", params: { slug: page.url } },
          class: "w-full flex items-center justify-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                icon: "ri-edit-line",
                class: "fill-white w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-edit-line",
                  class: "fill-white w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="bg-accent flex-auto flex items-stretch justify-center"><div class="w-full flex items-center justify-center cursor-pointer">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-delete-bin-line",
          class: "fill-white w-4 h-4"
        }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]-->`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$11, {
        open: dialog.value,
        "onUpdate:open": ($event) => dialog.value = $event,
        "handle-remove": handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/pages/index.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const blogArticleStore = useBlogArticleStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("article", () => blogArticleStore.load(route.params.id))), await __temp, __restore();
    const article = blogArticleStore[CRUD_MODE.EDITION].retrieved;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(article) ? "Article - " + vue_cjs_prod.unref(article).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise")}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(article) ? "Article - " + vue_cjs_prod.unref(article).title : "Habitat participatif situ\xE9 vers la r\xE9gion grenobloise"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(article) !== null && vue_cjs_prod.unref(article).mediaNode !== null) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1u, {
          "media-node": vue_cjs_prod.unref(article).mediaNode
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(article)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$L, { article: vue_cjs_prod.unref(article) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRoute();
    const blogArticleStore = useBlogArticleStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("blog-articles-index", () => blogArticleStore.fetchAll({ "order[createdAt]": "desc", "itemsPerPage": 50 }))), await __temp, __restore();
    const { listWithActiveTags: articles } = storeToRefs(blogArticleStore);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col px-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$I, null, null, _parent));
      _push(`<!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(articles), (article, i) => {
        _push(`<div class="w-full flex flex-col py-2"><div class="flex flex-row"><div class="${serverRenderer.exports.ssrRenderClass([{ "order-1": i % 2 === 1 }, "px-3 w-40"])}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$J, {
          "media-object": vue_cjs_prod.unref(blogArticleStore).getRandomImage(article),
          class: "h-20 before:text-[6px]",
          size: "sm"
        }, null, _parent));
        _push(`</div><div class="${serverRenderer.exports.ssrRenderClass([{ "text-right": i % 2 === 1 }, "flex flex-col w-full justify-center"])}"><p class="w-full"><b class="text-lg">${serverRenderer.exports.ssrInterpolate(article.title)}</b> | ${serverRenderer.exports.ssrInterpolate(article.preview)}</p><div class="${serverRenderer.exports.ssrRenderClass([{ "self-end": i % 2 === 1 }, "pt-2 text-primary-dark fill-primary-dark flex uppercase text-xs items-center"])}"><!--[-->`);
        serverRenderer.exports.ssrRenderList(article.tags, (tag, i2) => {
          _push(`<div class="bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer">${serverRenderer.exports.ssrInterpolate(tag)}</div>`);
        });
        _push(`<!--]-->`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-arrow-right-s-line",
          class: "h-4 w-4"
        }, null, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { name: "blog-id", params: { id: article.id } }
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`En savoir plus`);
            } else {
              return [
                vue_cjs_prod.createTextVNode("En savoir plus")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div><div class="h-2 w-1/2 border-b self-center"></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const pageStore = usePageStore();
    const page = pageStore.find("/api/pages/contact");
    useContactStore();
    useNotificationStore();
    const schema = {
      email: "required|email",
      phoneNumber: "regex:^0\\d{9}$",
      firstName: "min:3|max:60",
      lastName: "min:3|max:60",
      subject: "required|min:8|max:60",
      content: "required|min:10|max:1000"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col py-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contacte-nous`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Contacte-nous")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(page)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, { page: vue_cjs_prod.unref(page) }, null, _parent));
      } else {
        _push(`<div><p> Pour nous contacter tu peux nous envoyer un email \xE0 <a href="mailto:contact@lestransalpins.org" title="Envoyer un email aux transalpins">contact@lestransalpins.org</a> ou bien remplir le formulaire suivant.</p><p> Dans ce cas tu recevras un email de confirmation ou bien regarde dans tes spams si ce n&#39;est pas le cas. </p></div>`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), {
        class: "flex flex-row flex-wrap w-full sm:w-3/4 md:wd-1/2 lg:wd-1/3 justify-center self-center text-gray-500",
        "validation-schema": schema
      }, {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              icon: "ri-mail-line",
              type: "email",
              name: "email",
              error: errors.email,
              value: values.email,
              label: "Email",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              icon: "ri-phone-line",
              type: "phoneNumber",
              name: "phoneNumber",
              error: errors.phoneNumber,
              value: values.phoneNumber,
              label: "Num\xE9ro de t\xE9l\xE9phone",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              type: "firstName",
              name: "firstName",
              error: errors.firstName,
              value: values.firstName,
              label: "Pr\xE9nom",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              type: "lastName",
              name: "lastName",
              error: errors.lastName,
              value: values.lastName,
              label: "Nom",
              class: "w-full md:w-1/2"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-row w-full group py-4 px-3"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              id: "subject",
              name: "subject",
              autocomplete: "off",
              type: "text",
              format: "0[0-9]{9}",
              class: "peer w-full outline-none h-8",
              validateOnInput: true
            }, null, _parent2, _scopeId));
            _push2(`<label for="subject" class="${serverRenderer.exports.ssrRenderClass([{ "h-1/2 -translate-y-full pl-0": !!values.subject, "text-accent": !!errors.subject, "text-primary": !!values.subject && !errors.subject }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])}"${_scopeId}>Sujet `);
            if (errors.subject) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
                default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate(errors.subject)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.subject), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><div class="${serverRenderer.exports.ssrRenderClass([{ "border-accent": !!errors.subject, "border-primary": !!values.subject && !errors.subject, "border-gray-500": !values.subject }, "absolute bottom-0 w-full border-b"])}"${_scopeId}></div></div></div><div class="flex flex-col w-full group py-4 px-3"${_scopeId}><div class="flex flex-row"${_scopeId}><label for="content" class="${serverRenderer.exports.ssrRenderClass([{ "text-accent": !!errors.content, "text-primary": !!values.content && !errors.content }, "w-fit self-center"])}"${_scopeId}>Message</label>`);
            if (errors.content) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1r, null, {
                default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate(errors.content)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.content), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              as: "textarea",
              autocomplete: "off",
              rows: "10",
              id: "content",
              name: "content",
              type: "textarea",
              format: "0[0-9]{9}",
              class: ["w-full w-full border p-2 outline-none", { "border-accent": !!errors.content, "border-primary": !!values.content && !errors.content, "border-gray-500": !values.content }]
            }, null, _parent2, _scopeId));
            _push2(`</div><button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Envoyer</button><button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId}>R\xE9initialiser</button>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                icon: "ri-mail-line",
                type: "email",
                name: "email",
                error: errors.email,
                value: values.email,
                label: "Email",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                icon: "ri-phone-line",
                type: "phoneNumber",
                name: "phoneNumber",
                error: errors.phoneNumber,
                value: values.phoneNumber,
                label: "Num\xE9ro de t\xE9l\xE9phone",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                type: "firstName",
                name: "firstName",
                error: errors.firstName,
                value: values.firstName,
                label: "Pr\xE9nom",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                type: "lastName",
                name: "lastName",
                error: errors.lastName,
                value: values.lastName,
                label: "Nom",
                class: "w-full md:w-1/2"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("div", { class: "flex flex-row w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode("div", { class: "relative w-full" }, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                    id: "subject",
                    name: "subject",
                    autocomplete: "off",
                    type: "text",
                    format: "0[0-9]{9}",
                    class: "peer w-full outline-none h-8",
                    validateOnInput: true
                  }),
                  vue_cjs_prod.createVNode("label", {
                    for: "subject",
                    class: [{ "h-1/2 -translate-y-full pl-0": !!values.subject, "text-accent": !!errors.subject, "text-primary": !!values.subject && !errors.subject }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"]
                  }, [
                    vue_cjs_prod.createTextVNode("Sujet "),
                    errors.subject ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1r, { key: 0 }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.subject), 1)
                      ]),
                      _: 2
                    }, 1024)) : vue_cjs_prod.createCommentVNode("", true)
                  ], 2),
                  vue_cjs_prod.createVNode("div", {
                    class: [{ "border-accent": !!errors.subject, "border-primary": !!values.subject && !errors.subject, "border-gray-500": !values.subject }, "absolute bottom-0 w-full border-b"]
                  }, null, 2)
                ])
              ]),
              vue_cjs_prod.createVNode("div", { class: "flex flex-col w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode("div", { class: "flex flex-row" }, [
                  vue_cjs_prod.createVNode("label", {
                    for: "content",
                    class: ["w-fit self-center", { "text-accent": !!errors.content, "text-primary": !!values.content && !errors.content }]
                  }, "Message", 2),
                  errors.content ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1r, { key: 0 }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(errors.content), 1)
                    ]),
                    _: 2
                  }, 1024)) : vue_cjs_prod.createCommentVNode("", true)
                ]),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                  as: "textarea",
                  autocomplete: "off",
                  rows: "10",
                  id: "content",
                  name: "content",
                  type: "textarea",
                  format: "0[0-9]{9}",
                  class: ["w-full w-full border p-2 outline-none", { "border-accent": !!errors.content, "border-primary": !!values.content && !errors.content, "border-gray-500": !values.content }]
                }, null, 8, ["class"])
              ]),
              vue_cjs_prod.createVNode("button", {
                type: "submit",
                class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
              }, "Envoyer"),
              vue_cjs_prod.createVNode("button", {
                type: "reset",
                class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
              }, "R\xE9initialiser")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogArticleStore = useBlogArticleStore();
    const pageStore = usePageStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("articles", () => blogArticleStore.fetchAll({ "order[createdAt]": "desc", "itemsPerPage": 8 }))), await __temp, __restore();
    const homePage = pageStore.findBySlug("home");
    const articles = blogArticleStore.list;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col" }, _attrs))}>`);
      if (vue_cjs_prod.unref(homePage) !== null && vue_cjs_prod.unref(homePage).mediaNode !== null) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1u, {
          "media-node": vue_cjs_prod.unref(homePage).mediaNode
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(homePage)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, {
          page: vue_cjs_prod.unref(homePage),
          class: "md:w-4/5"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="p-3 w-full md:w-4/5 self-center">Les ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(articles).length)} derniers articles</h2><div class="flex flex-wrap md:w-4/5 lg:w-3/4 self-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(articles), (article) => {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$F, {
          article,
          class: "w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Habitat participatif situ\xE9 vers la r\xE9gion grenobloise`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Habitat participatif situ\xE9 vers la r\xE9gion grenobloise")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const store = useAuthStore();
    const form = vue_cjs_prod.ref(null);
    vue_cjs_prod.onMounted(() => {
      form.value && form.value.resetForm();
    });
    const schema = {
      email: "required|email",
      password: "required|min:10"
    };
    if (store.isLogged) {
      navigateTo("/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-auto justify-center items-center bg-white" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Connexion`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Connexion")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-fit"><h2 class="py-3">Connexion</h2>`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), {
        ref_key: "form",
        ref: form,
        class: "flex flex-row flex-wrap w-full sm:w-3/4 md:wd-1/2 lg:wd-1/3 justify-center self-center text-gray-500",
        "validation-schema": schema
      }, {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row w-full group py-4 px-3"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-mail-line",
              class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.email, "fill-primary": !!values.email && !errors.email, "fill-gray-500": !values.email }]
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative w-full"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              id: "email",
              name: "email",
              type: "email",
              required: "",
              autocomplete: "off",
              class: "peer w-full outline-none h-8 autofill:bg-transparent",
              validateOnInput: true
            }, null, _parent2, _scopeId));
            _push2(`<label for="email" class="${serverRenderer.exports.ssrRenderClass([{ "h-1/2 -translate-y-full pl-0": !!values.email, "text-accent": !!errors.email, "text-primary": !!values.email && !errors.email }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])}"${_scopeId}>Email</label><div class="${serverRenderer.exports.ssrRenderClass([{ "border-accent": !!errors.email, "border-primary": !!values.email && !errors.email, "border-gray-500": !values.email }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"])}"${_scopeId}></div></div></div><div class="flex flex-row w-full group py-4 px-3"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-key-fill",
              class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.password, "fill-primary": !!values.password && !errors.password, "fill-gray-500": !values.password }]
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative w-full"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Field), {
              id: "password",
              name: "password",
              type: "password",
              required: "",
              autocomplete: "off",
              class: "peer w-full outline-none h-8",
              validateOnInput: true
            }, null, _parent2, _scopeId));
            _push2(`<label for="password" class="${serverRenderer.exports.ssrRenderClass([{ "h-1/2 -translate-y-full pl-0": !!values.password, "text-accent": !!errors.password, "text-primary": !!values.password && !errors.password }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])}"${_scopeId}>Password</label><div class="${serverRenderer.exports.ssrRenderClass([{ "border-accent": !!errors.password, "border-primary": !!values.password && !errors.password, "border-gray-500": !values.password }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"])}"${_scopeId}></div></div></div><button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"${_scopeId}>Connexion</button><button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"${_scopeId}>R\xE9initialiser</button>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "flex flex-row w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-mail-line",
                  class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.email, "fill-primary": !!values.email && !errors.email, "fill-gray-500": !values.email }]
                }, null, 8, ["class"]),
                vue_cjs_prod.createVNode("div", { class: "relative w-full" }, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                    id: "email",
                    name: "email",
                    type: "email",
                    required: "",
                    autocomplete: "off",
                    class: "peer w-full outline-none h-8 autofill:bg-transparent",
                    validateOnInput: true
                  }),
                  vue_cjs_prod.createVNode("label", {
                    for: "email",
                    class: [{ "h-1/2 -translate-y-full pl-0": !!values.email, "text-accent": !!errors.email, "text-primary": !!values.email && !errors.email }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"]
                  }, "Email", 2),
                  vue_cjs_prod.createVNode("div", {
                    class: [{ "border-accent": !!errors.email, "border-primary": !!values.email && !errors.email, "border-gray-500": !values.email }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"]
                  }, null, 2)
                ])
              ]),
              vue_cjs_prod.createVNode("div", { class: "flex flex-row w-full group py-4 px-3" }, [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-key-fill",
                  class: ["h-8 w-10 group-focus-within:stroke-2", { "fill-accent": !!errors.password, "fill-primary": !!values.password && !errors.password, "fill-gray-500": !values.password }]
                }, null, 8, ["class"]),
                vue_cjs_prod.createVNode("div", { class: "relative w-full" }, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(Field), {
                    id: "password",
                    name: "password",
                    type: "password",
                    required: "",
                    autocomplete: "off",
                    class: "peer w-full outline-none h-8",
                    validateOnInput: true
                  }),
                  vue_cjs_prod.createVNode("label", {
                    for: "password",
                    class: [{ "h-1/2 -translate-y-full pl-0": !!values.password, "text-accent": !!errors.password, "text-primary": !!values.password && !errors.password }, "transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"]
                  }, "Password", 2),
                  vue_cjs_prod.createVNode("div", {
                    class: [{ "border-accent": !!errors.password, "border-primary": !!values.password && !errors.password, "border-gray-500": !values.password }, "absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"]
                  }, null, 2)
                ])
              ]),
              vue_cjs_prod.createVNode("button", {
                type: "submit",
                class: "py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"
              }, "Connexion"),
              vue_cjs_prod.createVNode("button", {
                type: "reset",
                class: "py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"
              }, "R\xE9initialiser")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const login = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white flex-auto p-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mentions l\xE9gales`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Mentions l\xE9gales")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-xl text-primary-dark font-marker py-3">Mentions l\xE9gales</div><div><p> Conform\xE9ment aux dispositions de la loi n\xB0 2004-575 du 21 juin 2004 pour la confiance en l\u2019\xE9conomie num\xE9rique, il est pr\xE9cis\xE9 aux utilisateurs du site lestransalpins.org l\u2019identit\xE9 des diff\xE9rents intervenants dans le cadre de sa r\xE9alisation et de son suivi. </p><h3 class="py-3">H\xE9bergeur</h3><div><p>Le site transalpins.org est h\xE9berg\xE9 par la soci\xE9t\xE9 O2switch</p><ul><li>Siret : 510 909 807 00024</li><li>RCS Clermont Ferrand</li><li>SARL au capital de 100 000\u20AC</li></ul></div><p> Le stockage des donn\xE9es personnelles des Utilisateurs est exclusivement r\xE9alis\xE9 sur les centre de donn\xE9es (\xAB clusters \xBB) localis\xE9s en France de la soci\xE9t\xE9 O2switch </p><h3 class="py-3">Cookie</h3><p> Le seul cookie utilis\xE9 par ce site est g\xE9n\xE9r\xE9 lors de l&#39;identification au site, il est r\xE9serv\xE9 pour un usage d&#39;administration du site web </p></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mentions-legales.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const mentionsLegales = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const joinStore = useJoinStore();
    const pageStore = usePageStore();
    const notificationStore = useNotificationStore();
    const page = pageStore.find("/api/pages/nous-rejoindre");
    const onSubmit = async (data, actions) => {
      try {
        await joinStore.create(data);
        notificationStore.showMessage("Le questionnaire a correctement \xE9t\xE9 enregistr\xE9, nous prendrons contact avec toi le plus rapidement possible");
      } catch (e) {
        notificationStore.showError("Erreur dans la formulaire, merci de corriger les champs non valides");
        actions.setErrors(joinStore[CRUD_MODE.CREATION].violations);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex bg-white flex-auto flex-col py-3" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Nous rejoindre`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Nous rejoindre")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue_cjs_prod.unref(page)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1w, { page: vue_cjs_prod.unref(page) }, null, _parent));
      } else {
        _push(`<h1 class="px-3">J&#39;ai envie de vous rejoindre !</h1>`);
      }
      _push(`<div class="py-4 px-3"><p> Je peux remplir ce questionnaire en ligne ou bien <a href="/files/questionnaire_transalpins_v1.pdf" title="T\xE9l\xE9charger le formulaire" target="_blank" class="text-primary text-underline">T\xE9l\xE9charger le PDF</a> pour le remplir num\xE9riquement ou manuellement et l&#39;envoyer eux transalpins \xE0 l&#39;addresse suivante : <a href="mailto:contact@lestransalpins.org" title="Contacter les transalpins">contact@lestransalpins.org</a></p></div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$B, { "on-submit": onSubmit }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/nous-rejoindre.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const nousRejoindre = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const isAdmin = defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.isAdmin) {
    return navigateTo("/login");
  }
});
const isAdmin$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": isAdmin
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const logout = () => {
      authStore.logout();
      navigateTo({ name: "index" });
    };
    const redirectTo = (url) => {
      if (url !== null) {
        navigateTo({ name: url });
      }
    };
    const items = [
      {
        label: "Acueil",
        icon: "ri-home-line",
        children: [],
        url: "admin"
      },
      {
        label: "G\xE9rer les fichiers",
        icon: "ri-folder-open-line",
        children: [],
        url: "admin-media"
      },
      {
        label: "Blog",
        children: [
          { icon: "ri-article-line", label: "Article", url: "admin-blog", permission: "USER_CAN_ACCESS_BLOG_ARTICLES" }
        ]
      },
      {
        label: "Pages",
        children: [
          { icon: "ri-article-line", label: "Pages", url: "admin-pages", permission: "USER_CAN_ACCESS_PAGES" },
          { icon: "ri-folder-line", label: "Categories", url: "admin-categories", permission: "USER_CAN_ACCESS_PAGE_CATEGORIES" }
        ]
      },
      {
        label: "Membres",
        children: [
          { icon: "ri-contacts-line", label: "Prises de contact", url: "admin-contact", permission: "USER_CAN_VIEW_CONTACT" },
          { icon: "ri-mail-line", label: "Inscriptions \xE0 la newsletter", url: "admin-newsletter", permission: "USER_CAN_VIEW_CONTACT_NEWSLETTER" },
          { icon: "ri-survey-line", label: "R\xE9ponses au questionnaire", url: "admin-join", permission: "USER_CAN_VIEW_SURVEY_JOIN" }
        ]
      },
      {
        label: "Retour au site",
        icon: "ri-arrow-left-circle-fill",
        children: [],
        url: "index"
      },
      {
        label: "D\xE9connexion",
        icon: "ri-logout-circle-line",
        onClick: logout,
        children: []
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col bg-gray-100" }, _attrs))}><!--[-->`);
      serverRenderer.exports.ssrRenderList(items, (item) => {
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe$1), {
          as: "div",
          class: "text-left flex flex-wrap"
        }, {
          default: vue_cjs_prod.withCtx(({ open }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(me), { class: "p-3 grow shrink basis-full text-primary-dark text-left before:absolute before:top-0 tracking-widest text-xs uppercase flex items-center" }, {
                default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (item.icon) {
                      _push3(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                        icon: item.icon,
                        class: "h-3 w-3 inline-flex fill-primary-dark"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="${serverRenderer.exports.ssrRenderClass([{ "pl-3": item.icon, "pl-6": !item.icon }, "flex-auto"])}"${_scopeId2}>${serverRenderer.exports.ssrInterpolate(item.label)}</div>`);
                  } else {
                    return [
                      item.icon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1v, {
                        key: 0,
                        icon: item.icon,
                        class: "h-3 w-3 inline-flex fill-primary-dark"
                      }, null, 8, ["icon"])) : vue_cjs_prod.createCommentVNode("", true),
                      vue_cjs_prod.createVNode("div", {
                        class: ["flex-auto", { "pl-3": item.icon, "pl-6": !item.icon }]
                      }, vue_cjs_prod.toDisplayString(item.label), 3)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe$1), vue_cjs_prod.mergeProps({
                class: "flex flex-col flex-auto w-full text-primary pl-6",
                static: ""
              }, _attrs), {
                default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    serverRenderer.exports.ssrRenderList(item.children, (subItem) => {
                      _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ve), {
                        as: "div",
                        class: "p-3 hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer"
                      }, {
                        default: vue_cjs_prod.withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="pl-2 text-xs flex-auto"${_scopeId3}>${serverRenderer.exports.ssrInterpolate(subItem.label)}</div>`);
                            if (subItem.icon) {
                              _push4(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
                                icon: subItem.icon,
                                class: ["h-3 w-3 inline-flex", { "fill-primary-dark": !open, "fill-primary": open }]
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              vue_cjs_prod.createVNode("div", { class: "pl-2 text-xs flex-auto" }, vue_cjs_prod.toDisplayString(subItem.label), 1),
                              subItem.icon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1v, {
                                key: 0,
                                icon: subItem.icon,
                                class: ["h-3 w-3 inline-flex", { "fill-primary-dark": !open, "fill-primary": open }]
                              }, null, 8, ["icon", "class"])) : vue_cjs_prod.createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.children, (subItem) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(ve), {
                          onClick: ($event) => redirectTo(subItem.url),
                          as: "div",
                          class: "p-3 hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer"
                        }, {
                          default: vue_cjs_prod.withCtx(({ active }) => [
                            vue_cjs_prod.createVNode("div", { class: "pl-2 text-xs flex-auto" }, vue_cjs_prod.toDisplayString(subItem.label), 1),
                            subItem.icon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1v, {
                              key: 0,
                              icon: subItem.icon,
                              class: ["h-3 w-3 inline-flex", { "fill-primary-dark": !open, "fill-primary": open }]
                            }, null, 8, ["icon", "class"])) : vue_cjs_prod.createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 256))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(me), {
                  onClick: ($event) => item.onClick ? item.onClick() : redirectTo(item.url),
                  class: "p-3 grow shrink basis-full text-primary-dark text-left before:absolute before:top-0 tracking-widest text-xs uppercase flex items-center"
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    item.icon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1v, {
                      key: 0,
                      icon: item.icon,
                      class: "h-3 w-3 inline-flex fill-primary-dark"
                    }, null, 8, ["icon"])) : vue_cjs_prod.createCommentVNode("", true),
                    vue_cjs_prod.createVNode("div", {
                      class: ["flex-auto", { "pl-3": item.icon, "pl-6": !item.icon }]
                    }, vue_cjs_prod.toDisplayString(item.label), 3)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                vue_cjs_prod.createVNode(vue_cjs_prod.Transition, {
                  "enter-active-class": "transition duration-100 ease-out",
                  "enter-from-class": "transform scale-95 opacity-0",
                  "enter-to-class": "transform scale-100 opacity-100",
                  "leave-active-class": "transition duration-75 ease-in",
                  "leave-from-class": "transform scale-100 opacity-100",
                  "leave-to-class": "transform scale-95 opacity-0"
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(pe$1), {
                      class: "flex flex-col flex-auto w-full text-primary pl-6",
                      static: ""
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.children, (subItem) => {
                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(ve), {
                            onClick: ($event) => redirectTo(subItem.url),
                            as: "div",
                            class: "p-3 hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer"
                          }, {
                            default: vue_cjs_prod.withCtx(({ active }) => [
                              vue_cjs_prod.createVNode("div", { class: "pl-2 text-xs flex-auto" }, vue_cjs_prod.toDisplayString(subItem.label), 1),
                              subItem.icon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$1v, {
                                key: 0,
                                icon: subItem.icon,
                                class: ["h-3 w-3 inline-flex", { "fill-primary-dark": !open, "fill-primary": open }]
                              }, null, 8, ["icon", "class"])) : vue_cjs_prod.createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 256))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/admin/Menu.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { color, text, show } = storeToRefs(useNotificationStore());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "fixed bottom-0 left-1/2 -translate-x-1/2" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe), {
        show: vue_cjs_prod.unref(show),
        enter: "transition ease-in-out duration-3000 transform",
        "enter-from": "translate-y-full",
        "enter-to": "translate-y-0",
        leave: "transition ease-in-out duration-3000 transform",
        "leave-from": "translate-y-0",
        "leave-to": "translate-y-full"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${serverRenderer.exports.ssrRenderClass([`bg-${vue_cjs_prod.unref(color)}`, "px-3 pt-3 pb-2 text-white rounded-tl-lg rounded-tr-lg shadow-[0_-5px_4px_0px_rgba(0,0,0,0.3)]"])}"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(text))}</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", {
                class: [`bg-${vue_cjs_prod.unref(color)}`, "px-3 pt-3 pb-2 text-white rounded-tl-lg rounded-tr-lg shadow-[0_-5px_4px_0px_rgba(0,0,0,0.3)]"]
              }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(text)), 3)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Notification.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex min-h-screen" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$5, { class: "w-80 shrink-0" }, null, _parent));
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
var reactivity_cjs_prod = {};
Object.defineProperty(reactivity_cjs_prod, "__esModule", { value: true });
var shared = shared_cjs_prod;
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect2) => {
  const { deps } = effect2;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect2);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler2 = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler2;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
function effect(fn, options) {
  if (fn.effect) {
    fn = fn.effect.fn;
  }
  const _effect = new ReactiveEffect(fn);
  if (options) {
    shared.extend(_effect, options);
    if (options.scope)
      recordEffectScope(_effect, options.scope);
  }
  if (!options || !options.lazy) {
    _effect.run();
  }
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && shared.isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!shared.isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (shared.isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (shared.isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!shared.isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (shared.isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (shared.isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect2 of shared.isArray(dep) ? dep : [...dep]) {
    if (effect2 !== activeEffect || effect2.allowRecurse) {
      if (effect2.scheduler) {
        effect2.scheduler();
      } else {
        effect2.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(shared.isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = shared.isArray(target);
    if (!isReadonly2 && targetIsArray && shared.hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !shared.isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (shared.isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (shared.hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = shared.hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", shared.isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ shared.extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ shared.extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (shared.hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = shared.isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared.toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!shared.isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  shared.def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => shared.isObject(value) ? reactive(value) : value;
const toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (shared.hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function triggerRef(ref2) {
  triggerRefValue(ref2);
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get: get2, set: set2 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
    this._get = get2;
    this._set = set2;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
function toRefs(object) {
  const ret = shared.isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = shared.isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = shared.NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
var _a;
const tick = /* @__PURE__ */ Promise.resolve();
const queue$1 = [];
let queued = false;
const scheduler = (fn) => {
  queue$1.push(fn);
  if (!queued) {
    queued = true;
    tick.then(flush);
  }
};
const flush = () => {
  for (let i = 0; i < queue$1.length; i++) {
    queue$1[i]();
  }
  queue$1.length = 0;
  queued = false;
};
class DeferredComputedRefImpl {
  constructor(getter) {
    this.dep = void 0;
    this._dirty = true;
    this.__v_isRef = true;
    this[_a] = true;
    let compareTarget;
    let hasCompareTarget = false;
    let scheduled = false;
    this.effect = new ReactiveEffect(getter, (computedTrigger) => {
      if (this.dep) {
        if (computedTrigger) {
          compareTarget = this._value;
          hasCompareTarget = true;
        } else if (!scheduled) {
          const valueToCompare = hasCompareTarget ? compareTarget : this._value;
          scheduled = true;
          hasCompareTarget = false;
          scheduler(() => {
            if (this.effect.active && this._get() !== valueToCompare) {
              triggerRefValue(this);
            }
            scheduled = false;
          });
        }
        for (const e of this.dep) {
          if (e.computed instanceof DeferredComputedRefImpl) {
            e.scheduler(true);
          }
        }
      }
      this._dirty = true;
    });
    this.effect.computed = this;
  }
  _get() {
    if (this._dirty) {
      this._dirty = false;
      return this._value = this.effect.run();
    }
    return this._value;
  }
  get value() {
    trackRefValue(this);
    return toRaw(this)._get();
  }
}
_a = "__v_isReadonly";
function deferredComputed(getter) {
  return new DeferredComputedRefImpl(getter);
}
reactivity_cjs_prod.EffectScope = EffectScope;
reactivity_cjs_prod.ITERATE_KEY = ITERATE_KEY;
reactivity_cjs_prod.ReactiveEffect = ReactiveEffect;
reactivity_cjs_prod.computed = computed;
reactivity_cjs_prod.customRef = customRef;
reactivity_cjs_prod.deferredComputed = deferredComputed;
reactivity_cjs_prod.effect = effect;
reactivity_cjs_prod.effectScope = effectScope;
reactivity_cjs_prod.enableTracking = enableTracking;
reactivity_cjs_prod.getCurrentScope = getCurrentScope;
reactivity_cjs_prod.isProxy = isProxy;
reactivity_cjs_prod.isReactive = isReactive;
reactivity_cjs_prod.isReadonly = isReadonly;
reactivity_cjs_prod.isRef = isRef;
reactivity_cjs_prod.isShallow = isShallow;
reactivity_cjs_prod.markRaw = markRaw;
reactivity_cjs_prod.onScopeDispose = onScopeDispose;
var pauseTracking_1 = reactivity_cjs_prod.pauseTracking = pauseTracking;
reactivity_cjs_prod.proxyRefs = proxyRefs;
reactivity_cjs_prod.reactive = reactive;
reactivity_cjs_prod.readonly = readonly;
reactivity_cjs_prod.ref = ref;
var resetTracking_1 = reactivity_cjs_prod.resetTracking = resetTracking;
reactivity_cjs_prod.shallowReactive = shallowReactive;
reactivity_cjs_prod.shallowReadonly = shallowReadonly;
reactivity_cjs_prod.shallowRef = shallowRef;
reactivity_cjs_prod.stop = stop;
reactivity_cjs_prod.toRaw = toRaw;
reactivity_cjs_prod.toRef = toRef;
reactivity_cjs_prod.toRefs = toRefs;
reactivity_cjs_prod.track = track;
reactivity_cjs_prod.trigger = trigger;
reactivity_cjs_prod.triggerRef = triggerRef;
reactivity_cjs_prod.unref = unref;
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction_1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise_1(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking_1();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking_1();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => injectHook(lifecycle, hook, target);
const onMounted = createHook("m");
const onUnmounted = createHook("um");
let currentInstance = null;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const _sfc_main$2 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-primary flex flex-col" }, _attrs))}><div class="w-full text-center h-12 flex-row items-center justify-center flex"><!--[-->`);
      serverRenderer.exports.ssrRenderList([{ label: "Mentions l\xE9gales", url: "mentions-legales" }], (link) => {
        _push(`<div class="my-2 cursor-pointer text-white text-xs uppercase">${serverRenderer.exports.ssrInterpolate(link.label)}</div>`);
      });
      _push(`<!--]--></div><div class="w-full text-center text-gray-600 pb-2"> 2020-${serverRenderer.exports.ssrInterpolate(new Date().getFullYear())} \u2014 <strong>Les transalpins</strong></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/default/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const pageStore = usePageStore();
    const { menu } = storeToRefs(pageStore);
    const redirectTo = (url) => {
      if (url !== null) {
        navigateTo(url);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(menu), (menuItem) => {
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(fe$1), {
          as: "div",
          class: "shadow-sm md:relative flex flex-auto h-10"
        }, {
          default: vue_cjs_prod.withCtx(({ open }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(me), { class: "w-full text-primary-dark text-center before:absolute before:top-0 tracking-widest text-xs uppercase" }, {
                default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate(menuItem.name)} `);
                    if (menuItem.children.length > 0 && !open) {
                      _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$1v), {
                        icon: "ri-arrow-right-s-fill",
                        class: "h-3 w-3 inline-flex fill-primary-dark"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (menuItem.children.length > 0 && open) {
                      _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$1v), {
                        icon: "ri-arrow-down-s-fill",
                        class: "h-3 w-3 inline-flex fill-primary-dark"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(menuItem.name) + " ", 1),
                      menuItem.children.length > 0 && !open ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(_sfc_main$1v), {
                        key: 0,
                        icon: "ri-arrow-right-s-fill",
                        class: "h-3 w-3 inline-flex fill-primary-dark"
                      })) : vue_cjs_prod.createCommentVNode("", true),
                      menuItem.children.length > 0 && open ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(_sfc_main$1v), {
                        key: 1,
                        icon: "ri-arrow-down-s-fill",
                        class: "h-3 w-3 inline-flex fill-primary-dark"
                      })) : vue_cjs_prod.createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (menuItem.children.length > 0) {
                _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(pe$1), vue_cjs_prod.mergeProps({ class: "flex flex-col flex-auto absolute left-0 top-full w-full bg-primary text-white z-10" }, _attrs), {
                  default: vue_cjs_prod.withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      serverRenderer.exports.ssrRenderList(menuItem.children, (subMenuItem) => {
                        _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ve), {
                          as: "div",
                          class: "hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer"
                        }, {
                          default: vue_cjs_prod.withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="pl-2 text-xs"${_scopeId3}>${serverRenderer.exports.ssrInterpolate(subMenuItem.name)}</div>`);
                            } else {
                              return [
                                vue_cjs_prod.createVNode("div", { class: "pl-2 text-xs" }, vue_cjs_prod.toDisplayString(subMenuItem.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(menuItem.children, (subMenuItem) => {
                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(ve), {
                            onClick: ($event) => redirectTo(subMenuItem.url),
                            as: "div",
                            class: "hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer"
                          }, {
                            default: vue_cjs_prod.withCtx(({ active }) => [
                              vue_cjs_prod.createVNode("div", { class: "pl-2 text-xs" }, vue_cjs_prod.toDisplayString(subMenuItem.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 256))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(me), {
                  onClick: ($event) => redirectTo(menuItem.children.length === 0 ? menuItem.url : null),
                  class: "w-full text-primary-dark text-center before:absolute before:top-0 tracking-widest text-xs uppercase"
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(menuItem.name) + " ", 1),
                    menuItem.children.length > 0 && !open ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(_sfc_main$1v), {
                      key: 0,
                      icon: "ri-arrow-right-s-fill",
                      class: "h-3 w-3 inline-flex fill-primary-dark"
                    })) : vue_cjs_prod.createCommentVNode("", true),
                    menuItem.children.length > 0 && open ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(_sfc_main$1v), {
                      key: 1,
                      icon: "ri-arrow-down-s-fill",
                      class: "h-3 w-3 inline-flex fill-primary-dark"
                    })) : vue_cjs_prod.createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                menuItem.children.length > 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Transition, {
                  key: 0,
                  "enter-active-class": "transition duration-100 ease-out",
                  "enter-from-class": "transform scale-95 opacity-0",
                  "enter-to-class": "transform scale-100 opacity-100",
                  "leave-active-class": "transition duration-75 ease-in",
                  "leave-from-class": "transform scale-100 opacity-100",
                  "leave-to-class": "transform scale-95 opacity-0"
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(pe$1), { class: "flex flex-col flex-auto absolute left-0 top-full w-full bg-primary text-white z-10" }, {
                      default: vue_cjs_prod.withCtx(() => [
                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(menuItem.children, (subMenuItem) => {
                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(ve), {
                            onClick: ($event) => redirectTo(subMenuItem.url),
                            as: "div",
                            class: "hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer"
                          }, {
                            default: vue_cjs_prod.withCtx(({ active }) => [
                              vue_cjs_prod.createVNode("div", { class: "pl-2 text-xs" }, vue_cjs_prod.toDisplayString(subMenuItem.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 256))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)) : vue_cjs_prod.createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/default/Menu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const { isLogged, isAdmin: isAdmin2 } = storeToRefs(authStore);
    const pageStore = usePageStore();
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("pages", () => {
      return pageStore.fetchAll();
    })), await __temp, __restore();
    const schema = {
      email: "email"
    };
    useContactNewsletterStore();
    useNotificationStore();
    const scrollY = vue_cjs_prod.ref(0);
    function onScroll() {
      scrollY.value = window.scrollY;
    }
    onMounted(() => {
      window.addEventListener("scroll", onScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Body = vue_cjs_prod.resolveComponent("Body");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col bg-secondary-light min-h-screen text-sm order-first" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Body, { class: "bg-primary" }, null, _parent));
      _push(`<header class="fixed top-0 left-0 right-0 block z-40 bg-primary"><div class="${serverRenderer.exports.ssrRenderClass([{ "h-10": scrollY.value >= 50, "h-36": scrollY.value < 50 }, "bg-primary hidden md:block absolute top-0 left-0 w-full transition-all duration-200"])}"><div class="${serverRenderer.exports.ssrRenderClass([{ "opacity-0": scrollY.value >= 50 }, "h-full bg-[url('/images/vercors.jpg')] bg-center bg-cover bg-no-repeat"])}"></div></div><div class="${serverRenderer.exports.ssrRenderClass([{ "h-10": scrollY.value >= 50, "h-10 md:h-36": scrollY.value < 50 }, "flex items-start transition-all duration-200"])}"><div class="self-end z-40 font-marker text-lg text-white px-4 py-2 cursor-pointer">Les transalpins</div><div class="grow"></div>`);
      if (vue_cjs_prod.unref(isAdmin2)) {
        _push(`<div class="items-center text-primary-dark z-40 mr-1 inline-flex whitespace-nowrap uppercase tracking-wider text-sm py-2 h-10 cursor-pointer">ADMIN</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="h-10 inline-flex items-center pt-1 pb-2">`);
      if (!vue_cjs_prod.unref(isLogged)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-login-box-line",
          class: "h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(isLogged)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
          icon: "ri-logout-box-line",
          class: "h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex flex-row bg-info flex-wrap">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div class="bg-white"><div class="shadow-md flex flex-row justify-center items-center flex-auto flex-wrap">`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Form), {
        class: "flex flex-row",
        "validation-schema": schema
      }, {
        default: vue_cjs_prod.withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1o, {
              icon: "ri-mail-line",
              type: "email",
              name: "email",
              error: errors.email,
              value: values.email,
              label: "Email",
              class: "w-96 py-4 px-3"
            }, null, _parent2, _scopeId));
            _push2(`<button${serverRenderer.exports.ssrRenderAttr("type", !errors.email && !!values.email ? "submit" : "button")}${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$1v, {
              icon: "ri-send-plane-fill",
              class: ["h-5 w-5", { "fill-primary hover:fill-primary-dark": !errors.email && !!values.email, "fill-gray-500": !values.email, "fill-accent": !!errors.email }]
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$1o, {
                icon: "ri-mail-line",
                type: "email",
                name: "email",
                error: errors.email,
                value: values.email,
                label: "Email",
                class: "w-96 py-4 px-3"
              }, null, 8, ["error", "value"]),
              vue_cjs_prod.createVNode("button", {
                type: !errors.email && !!values.email ? "submit" : "button"
              }, [
                vue_cjs_prod.createVNode(_sfc_main$1v, {
                  icon: "ri-send-plane-fill",
                  class: ["h-5 w-5", { "fill-primary hover:fill-primary-dark": !errors.email && !!values.email, "fill-gray-500": !values.email, "fill-accent": !!errors.email }]
                }, null, 8, ["class"])
              ], 8, ["type"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mx-3 text-gray-800 text-sm">ET</div><div class="grow md:grow-0"><button class="bg-primary hover:bg-primary-dark text-white text-sm px-3 py-1.5 shadow-md rounded-sm"><span class="uppercase tracking-wider font-light">Adh\xE8re \xE0 l&#39;association</span></button></div></div></div></header><div class="flex flex-col pt-48 sm:pt-64 flex-auto shadow-md mb-4">`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { entry$1 as default };
//# sourceMappingURL=server.mjs.map
