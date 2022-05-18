var A=Object.defineProperty,B=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var E=(a,o,r)=>o in a?A(a,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[o]=r,y=(a,o)=>{for(var r in o||(o={}))j.call(o,r)&&E(a,r,o[r]);if(P)for(var r of P(o))V.call(o,r)&&E(a,r,o[r]);return a},N=(a,o)=>B(a,L(o));import{e as K,g as U,c as W,u as q,l as k,k as T,t as D,a as b,p as Q,m as C,o as m,v as z,S as H,b as J}from"./use-outside-click-ea4f1ee7.mjs";import{x as G,a as g}from"./calculate-active-index-130b59fd.mjs";import{Q as F,d as w,h as x,N as X,i as R,P as O,y as Y,R as h,S as Z,_ as ee,D as te,q as ae,o as ne,c as le,b as oe,w as re,j as ue,t as se,n as ie}from"./entry-2e347780.mjs";import{b as ce,f as ve}from"./transition-2ed963cb.mjs";function de({container:a,accept:o,walk:r,enabled:i}){F(()=>{let e=a.value;if(!e||i!==void 0&&!i.value)return;let d=K(a);if(!d)return;let u=Object.assign(v=>o(v),{acceptNode:o}),f=d.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,u,!1);for(;f.nextNode();)r(f.currentNode)})}var pe=(a=>(a[a.Open=0]="Open",a[a.Closed=1]="Closed",a))(pe||{}),fe=(a=>(a[a.Pointer=0]="Pointer",a[a.Other=1]="Other",a))(fe||{});function me(a){requestAnimationFrame(()=>requestAnimationFrame(a))}let $=Symbol("MenuContext");function M(a){let o=Z($,null);if(o===null){let r=new Error(`<${a} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,M),r}return o}let we=w({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(a,{slots:o,attrs:r}){let i=x(1),e=x(null),d=x(null),u=x([]),f=x(""),v=x(null),I=x(1);function c(s=n=>n){let n=v.value!==null?u.value[v.value]:null,l=z(s(u.value.slice()),S=>b(S.dataRef.domRef)),p=n?l.indexOf(n):null;return p===-1&&(p=null),{items:l,activeItemIndex:p}}let t={menuState:i,buttonRef:e,itemsRef:d,items:u,searchQuery:f,activeItemIndex:v,activationTrigger:I,closeMenu:()=>{i.value=1,v.value=null},openMenu:()=>i.value=0,goToItem(s,n,l){let p=c(),S=G(s===g.Specific?{focus:g.Specific,id:n}:{focus:s},{resolveItems:()=>p.items,resolveActiveIndex:()=>p.activeItemIndex,resolveId:_=>_.id,resolveDisabled:_=>_.dataRef.disabled});f.value="",v.value=S,I.value=l!=null?l:1,u.value=p.items},search(s){let n=f.value!==""?0:1;f.value+=s.toLowerCase();let l=(v.value!==null?u.value.slice(v.value+n).concat(u.value.slice(0,v.value+n)):u.value).find(S=>S.dataRef.textValue.startsWith(f.value)&&!S.dataRef.disabled),p=l?u.value.indexOf(l):-1;p===-1||p===v.value||(v.value=p,I.value=1)},clearSearch(){f.value=""},registerItem(s,n){let l=c(p=>[...p,{id:s,dataRef:n}]);u.value=l.items,v.value=l.activeItemIndex,I.value=1},unregisterItem(s){let n=c(l=>{let p=l.findIndex(S=>S.id===s);return p!==-1&&l.splice(p,1),l});u.value=n.items,v.value=n.activeItemIndex,I.value=1}};return U([e,d],(s,n)=>{var l;i.value===0&&(t.closeMenu(),H(n,J.Loose)||(s.preventDefault(),(l=b(e))==null||l.focus()))}),X($,t),W(R(()=>q(i.value,{[0]:k.Open,[1]:k.Closed}))),()=>{let s={open:i.value===0};return T({props:a,slot:s,slots:o,attrs:r,name:"Menu"})}}}),Te=w({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"}},setup(a,{attrs:o,slots:r,expose:i}){let e=M("MenuButton"),d=`headlessui-menu-button-${D()}`;i({el:e.buttonRef,$el:e.buttonRef});function u(c){switch(c.key){case m.Space:case m.Enter:case m.ArrowDown:c.preventDefault(),c.stopPropagation(),e.openMenu(),h(()=>{var t;(t=b(e.itemsRef))==null||t.focus({preventScroll:!0}),e.goToItem(g.First)});break;case m.ArrowUp:c.preventDefault(),c.stopPropagation(),e.openMenu(),h(()=>{var t;(t=b(e.itemsRef))==null||t.focus({preventScroll:!0}),e.goToItem(g.Last)});break}}function f(c){switch(c.key){case m.Space:c.preventDefault();break}}function v(c){a.disabled||(e.menuState.value===0?(e.closeMenu(),h(()=>{var t;return(t=b(e.buttonRef))==null?void 0:t.focus({preventScroll:!0})})):(c.preventDefault(),c.stopPropagation(),e.openMenu(),me(()=>{var t;return(t=b(e.itemsRef))==null?void 0:t.focus({preventScroll:!0})})))}let I=ce(R(()=>({as:a.as,type:o.type})),e.buttonRef);return()=>{var c;let t={open:e.menuState.value===0},s={ref:e.buttonRef,id:d,type:I.value,"aria-haspopup":!0,"aria-controls":(c=b(e.itemsRef))==null?void 0:c.id,"aria-expanded":a.disabled?void 0:e.menuState.value===0,onKeydown:u,onKeyup:f,onClick:v};return T({props:y(y({},a),s),slot:t,attrs:o,slots:r,name:"MenuButton"})}}}),Me=w({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0}},setup(a,{attrs:o,slots:r,expose:i}){let e=M("MenuItems"),d=`headlessui-menu-items-${D()}`,u=x(null);i({el:e.itemsRef,$el:e.itemsRef}),de({container:R(()=>b(e.itemsRef)),enabled:R(()=>e.menuState.value===0),accept(t){return t.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:t.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(t){t.setAttribute("role","none")}});function f(t){var s;switch(u.value&&clearTimeout(u.value),t.key){case m.Space:if(e.searchQuery.value!=="")return t.preventDefault(),t.stopPropagation(),e.search(t.key);case m.Enter:if(t.preventDefault(),t.stopPropagation(),e.activeItemIndex.value!==null){let n=e.items.value[e.activeItemIndex.value];(s=b(n.dataRef.domRef))==null||s.click()}e.closeMenu(),h(()=>{var n;return(n=b(e.buttonRef))==null?void 0:n.focus({preventScroll:!0})});break;case m.ArrowDown:return t.preventDefault(),t.stopPropagation(),e.goToItem(g.Next);case m.ArrowUp:return t.preventDefault(),t.stopPropagation(),e.goToItem(g.Previous);case m.Home:case m.PageUp:return t.preventDefault(),t.stopPropagation(),e.goToItem(g.First);case m.End:case m.PageDown:return t.preventDefault(),t.stopPropagation(),e.goToItem(g.Last);case m.Escape:t.preventDefault(),t.stopPropagation(),e.closeMenu(),h(()=>{var n;return(n=b(e.buttonRef))==null?void 0:n.focus({preventScroll:!0})});break;case m.Tab:t.preventDefault(),t.stopPropagation();break;default:t.key.length===1&&(e.search(t.key),u.value=setTimeout(()=>e.clearSearch(),350));break}}function v(t){switch(t.key){case m.Space:t.preventDefault();break}}let I=Q(),c=R(()=>I!==null?I.value===k.Open:e.menuState.value===0);return()=>{var t,s;let n={open:e.menuState.value===0},l={"aria-activedescendant":e.activeItemIndex.value===null||(t=e.items.value[e.activeItemIndex.value])==null?void 0:t.id,"aria-labelledby":(s=b(e.buttonRef))==null?void 0:s.id,id:d,onKeydown:f,onKeyup:v,role:"menu",tabIndex:0,ref:e.itemsRef};return T({props:y(y({},a),l),slot:n,attrs:o,slots:r,features:C.RenderStrategy|C.Static,visible:c.value,name:"MenuItems"})}}}),_e=w({name:"MenuItem",props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1}},setup(a,{slots:o,attrs:r,expose:i}){let e=M("MenuItem"),d=`headlessui-menu-item-${D()}`,u=x(null);i({el:u,$el:u});let f=R(()=>e.activeItemIndex.value!==null?e.items.value[e.activeItemIndex.value].id===d:!1),v=R(()=>({disabled:a.disabled,textValue:"",domRef:u}));O(()=>{var n,l;let p=(l=(n=b(u))==null?void 0:n.textContent)==null?void 0:l.toLowerCase().trim();p!==void 0&&(v.value.textValue=p)}),O(()=>e.registerItem(d,v)),Y(()=>e.unregisterItem(d)),F(()=>{e.menuState.value===0&&(!f.value||e.activationTrigger.value!==0&&h(()=>{var n,l;return(l=(n=b(u))==null?void 0:n.scrollIntoView)==null?void 0:l.call(n,{block:"nearest"})}))});function I(n){if(a.disabled)return n.preventDefault();e.closeMenu(),h(()=>{var l;return(l=b(e.buttonRef))==null?void 0:l.focus({preventScroll:!0})})}function c(){if(a.disabled)return e.goToItem(g.Nothing);e.goToItem(g.Specific,d)}function t(){a.disabled||f.value||e.goToItem(g.Specific,d,0)}function s(){a.disabled||!f.value||e.goToItem(g.Nothing)}return()=>{let{disabled:n}=a,l={active:f.value,disabled:n};return T({props:N(y({},a),{id:d,ref:u,role:"menuitem",tabIndex:n===!0?void 0:-1,"aria-disabled":n===!0?!0:void 0,onClick:I,onFocus:c,onPointermove:t,onMousemove:t,onPointerleave:s,onMouseleave:s}),slot:l,attrs:r,slots:o,name:"MenuItem"})}}});const be=w({setup(a,{expose:o}){o();const{color:r,text:i,show:e}=te(ae()),d={color:r,text:i,show:e,TransitionRoot:ve};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}}),Ie={class:"fixed bottom-0 left-1/2 -translate-x-1/2"};function ge(a,o,r,i,e,d){return ne(),le("div",Ie,[oe(i.TransitionRoot,{show:i.show,enter:"transition ease-in-out duration-3000 transform","enter-from":"translate-y-full","enter-to":"translate-y-0",leave:"transition ease-in-out duration-3000 transform","leave-from":"translate-y-0","leave-to":"translate-y-full"},{default:re(()=>[ue("div",{class:ie([`bg-${i.color}`,"px-3 pt-3 pb-2 text-white rounded-tl-lg rounded-tr-lg shadow-[0_-5px_4px_0px_rgba(0,0,0,0.3)]"])},se(i.text),3)]),_:1},8,["show"])])}var ke=ee(be,[["render",ge]]);export{ke as N,we as f,Te as m,Me as p,_e as v};
