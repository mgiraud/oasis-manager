var $e=Object.defineProperty,Ee=Object.defineProperties;var Re=Object.getOwnPropertyDescriptors;var q=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var ae=(e,t,l)=>t in e?$e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[t]=l,f=(e,t)=>{for(var l in t||(t={}))ne.call(t,l)&&ae(e,l,t[l]);if(q)for(var l of q(t))oe.call(t,l)&&ae(e,l,t[l]);return e},x=(e,t)=>Ee(e,Re(t));var G=(e,t)=>{var l={};for(var a in e)ne.call(e,a)&&t.indexOf(a)<0&&(l[a]=e[a]);if(e!=null&&q)for(var a of q(e))t.indexOf(a)<0&&oe.call(e,a)&&(l[a]=e[a]);return l};import{F as L,a as ce,H as re,d as W,L as ie,e as M,o as fe,k as $,t as P,p as ke,u as J,l as ue,g as Ae,i as Fe,m as se}from"./use-outside-click-545a1624.mjs";import{Q as I,P as H,z as X,h as c,i as m,d as E,N,S as j,y as K,O as F,ai as Te,aj as Ce,B as Oe,R as Pe}from"./entry-bbf0cde0.mjs";function Z(e,t,l,a){typeof window!="undefined"&&I(r=>{e=e!=null?e:window,e.addEventListener(t,l,a),r(()=>e.removeEventListener(t,l,a))})}var B=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(B||{});function je(e,t=c(30),l=c({})){var a,r;let n=c(null),o=c(null),s={value:!1},v=m(()=>Boolean(t.value&16)),w=m(()=>Boolean(t.value&2)),u=m(()=>M(e));return H(()=>{X(v,(p,i)=>{var h;p!==i&&(!v.value||(s.value=!0,n.value||(n.value=(h=u.value)==null?void 0:h.activeElement)))},{immediate:!0}),X(v,(p,i,h)=>{p!==i&&(!v.value||h(()=>{s.value!==!1&&(s.value=!1,L(n.value),n.value=null)}))},{immediate:!0}),X([e,l,l.value.initialFocus,w],(p,i)=>{var h,D;if(p.every((Q,_)=>(i==null?void 0:i[_])===Q)||!w.value)return;let S=e.value;if(!S)return;let T=ce(l.value.initialFocus),C=(h=u.value)==null?void 0:h.activeElement;if(T){if(T===C){o.value=C;return}}else if(S.contains(C)){o.value=C;return}T?L(T):re(S,W.First)===ie.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.value=(D=u.value)==null?void 0:D.activeElement},{immediate:!0})}),Z((a=u.value)==null?void 0:a.defaultView,"keydown",p=>{var i;!(t.value&4)||!e.value||p.key===fe.Tab&&(p.preventDefault(),re(e.value,(p.shiftKey?W.Previous:W.Next)|W.WrapAround)===ie.Success&&(o.value=(i=u.value)==null?void 0:i.activeElement))}),Z((r=u.value)==null?void 0:r.defaultView,"focus",p=>{var i;if(!(t.value&8))return;let h=new Set((i=l.value.containers)==null?void 0:i.value);if(h.add(e),!h.size)return;let D=o.value;if(!D||!s.value)return;let S=p.target;S&&S instanceof HTMLElement?xe(h,S)?(o.value=S,L(S)):(p.preventDefault(),p.stopPropagation(),L(D)):L(o.value)},!0),n}function xe(e,t){var l;for(let a of e)if((l=a.value)!=null&&l.contains(t))return!0;return!1}let de="body > *",O=new Set,k=new Map;function pe(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function ve(e){let t=k.get(e);!t||(t["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t["aria-hidden"]),e.inert=t.inert)}function Le(e,t=c(!0)){I(l=>{if(!t.value||!e.value)return;let a=e.value,r=M(a);if(r){O.add(a);for(let n of k.keys())n.contains(a)&&(ve(n),k.delete(n));r.querySelectorAll(de).forEach(n=>{if(n instanceof HTMLElement){for(let o of O)if(n.contains(o))return;O.size===1&&(k.set(n,{"aria-hidden":n.getAttribute("aria-hidden"),inert:n.inert}),pe(n))}}),l(()=>{if(O.delete(a),O.size>0)r.querySelectorAll(de).forEach(n=>{if(n instanceof HTMLElement&&!k.has(n)){for(let o of O)if(n.contains(o))return;k.set(n,{"aria-hidden":n.getAttribute("aria-hidden"),inert:n.inert}),pe(n)}});else for(let n of k.keys())ve(n),k.delete(n)})}})}let ge=Symbol("ForcePortalRootContext");function Be(){return j(ge,!1)}let ee=E({name:"ForcePortalRoot",props:{as:{type:[Object,String],default:"template"},force:{type:Boolean,default:!1}},setup(e,{slots:t,attrs:l}){return N(ge,e.force),()=>{let n=e,{force:a}=n,r=G(n,["force"]);return $({props:r,slot:{},slots:t,attrs:l,name:"ForcePortalRoot"})}}});function Ie(e){let t=M(e);if(!t)throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);let l=t.getElementById("headlessui-portal-root");if(l)return l;let a=t.createElement("div");return a.setAttribute("id","headlessui-portal-root"),t.body.appendChild(a)}let me=E({name:"Portal",props:{as:{type:[Object,String],default:"div"}},setup(e,{slots:t,attrs:l}){let a=c(null),r=m(()=>M(a)),n=Be(),o=j(he,null),s=c(n===!0||o==null?Ie(a.value):o.resolveTarget());return I(()=>{n||o!=null&&(s.value=o.resolveTarget())}),K(()=>{var v,w;let u=(v=r.value)==null?void 0:v.getElementById("headlessui-portal-root");!u||s.value===u&&s.value.children.length<=0&&((w=s.value.parentElement)==null||w.removeChild(s.value))}),()=>{if(s.value===null)return null;let v={ref:a};return F(Te,{to:s.value},$({props:f(f({},e),v),slot:{},attrs:l,slots:t,name:"Portal"}))}}}),he=Symbol("PortalGroupContext"),Me=E({name:"PortalGroup",props:{as:{type:[Object,String],default:"template"},target:{type:Object,default:null}},setup(e,{attrs:t,slots:l}){let a=Ce({resolveTarget(){return e.target}});return N(he,a),()=>{let o=e,{target:r}=o,n=G(o,["target"]);return $({props:n,slot:{},attrs:t,slots:l,name:"PortalGroup"})}}}),ye=Symbol("StackContext");var te=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(te||{});function He(){return j(ye,()=>{})}function Ne({type:e,element:t,onUpdate:l}){let a=He();function r(...n){l==null||l(...n),a(...n)}H(()=>{r(0,e,t),K(()=>{r(1,e,t)})}),N(ye,r)}let be=Symbol("DescriptionContext");function ze(){let e=j(be,null);if(e===null)throw new Error("Missing parent");return e}function Ue({slot:e=c({}),name:t="Description",props:l={}}={}){let a=c([]);function r(n){return a.value.push(n),()=>{let o=a.value.indexOf(n);o!==-1&&a.value.splice(o,1)}}return N(be,{register:r,slot:e,name:t,props:l}),m(()=>a.value.length>0?a.value.join(" "):void 0)}let Ve=E({name:"Description",props:{as:{type:[Object,String],default:"p"}},setup(e,{attrs:t,slots:l}){let a=ze(),r=`headlessui-description-${P()}`;return H(()=>K(a.register(r))),()=>{let{name:n="Description",slot:o=c({}),props:s={}}=a,v=e,w=x(f({},Object.entries(s).reduce((u,[p,i])=>Object.assign(u,{[p]:Oe(i)}),{})),{id:r});return $({props:f(f({},v),w),slot:o.value,attrs:t,slots:l,name:n})}}});var qe=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(qe||{});let le=Symbol("DialogContext");function z(e){let t=j(le,null);if(t===null){let l=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(l,z),l}return t}let Y="DC8F892D-2EBD-447C-A4C8-A03058436FF4",Ke=E({name:"Dialog",inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},open:{type:[Boolean,String],default:Y},initialFocus:{type:Object,default:null}},emits:{close:e=>!0},setup(e,{emit:t,attrs:l,slots:a,expose:r}){var n;let o=c(0),s=ke(),v=m(()=>e.open===Y&&s!==null?J(s.value,{[ue.Open]:!0,[ue.Closed]:!1}):e.open),w=c(new Set),u=c(null),p=m(()=>M(u));if(r({el:u,$el:u}),!(e.open!==Y||s!==null))throw new Error("You forgot to provide an `open` prop to the `Dialog`.");if(typeof v.value!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${v.value===Y?void 0:e.open}`);let i=m(()=>v.value?0:1),h=m(()=>i.value===0),D=m(()=>o.value>1),S=j(le,null)!==null,T=m(()=>D.value?"parent":"leaf"),C=je(u,m(()=>h.value?J(T.value,{parent:B.RestoreFocus,leaf:B.All&~B.FocusLock}):B.None),m(()=>({initialFocus:c(e.initialFocus),containers:w})));Le(u,m(()=>D.value?h.value:!1)),Ne({type:"Dialog",element:u,onUpdate:(d,y,b)=>{if(y==="Dialog")return J(d,{[te.Add](){w.value.add(b),o.value+=1},[te.Remove](){w.value.delete(b),o.value-=1}})}});let Q=Ue({name:"DialogDescription",slot:m(()=>({open:v.value}))}),_=`headlessui-dialog-${P()}`,U=c(null),A={titleId:U,panelRef:c(null),dialogState:i,setTitleId(d){U.value!==d&&(U.value=d)},close(){t("close",!1)}};N(le,A),Ae(()=>{var d,y,b;return[...Array.from((y=(d=p.value)==null?void 0:d.querySelectorAll("body > *"))!=null?y:[]).filter(g=>!(!(g instanceof HTMLElement)||g.contains(C.value)||A.panelRef.value&&g.contains(A.panelRef.value))),(b=A.panelRef.value)!=null?b:u.value]},(d,y)=>{i.value===0&&(D.value||(A.close(),Pe(()=>y==null?void 0:y.focus())))},Fe.IgnoreScrollbars),Z((n=p.value)==null?void 0:n.defaultView,"keydown",d=>{d.key===fe.Escape&&i.value===0&&(D.value||(d.preventDefault(),d.stopPropagation(),A.close()))}),I(d=>{var y;if(i.value!==0||S)return;let b=p.value;if(!b)return;let g=b==null?void 0:b.documentElement,R=(y=b.defaultView)!=null?y:window,V=g.style.overflow,Se=g.style.paddingRight,De=R.innerWidth-g.clientWidth;g.style.overflow="hidden",g.style.paddingRight=`${De}px`,d(()=>{g.style.overflow=V,g.style.paddingRight=Se})}),I(d=>{if(i.value!==0)return;let y=ce(u);if(!y)return;let b=new IntersectionObserver(g=>{for(let R of g)R.boundingClientRect.x===0&&R.boundingClientRect.y===0&&R.boundingClientRect.width===0&&R.boundingClientRect.height===0&&A.close()});b.observe(y),d(()=>b.disconnect())});function we(d){d.stopPropagation()}return()=>{let d=x(f({},l),{ref:u,id:_,role:"dialog","aria-modal":i.value===0?!0:void 0,"aria-labelledby":U.value,"aria-describedby":Q.value,onClick:we}),V=e,{open:y,initialFocus:b}=V,g=G(V,["open","initialFocus"]),R={open:i.value===0};return F(ee,{force:!0},()=>F(me,()=>F(Me,{target:u.value},()=>F(ee,{force:!1},()=>$({props:f(f({},g),d),slot:R,attrs:l,slots:a,visible:i.value===0,features:se.RenderStrategy|se.Static,name:"Dialog"})))))}}});E({name:"DialogOverlay",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:t,slots:l}){let a=z("DialogOverlay"),r=`headlessui-dialog-overlay-${P()}`;function n(o){o.target===o.currentTarget&&(o.preventDefault(),o.stopPropagation(),a.close())}return()=>$({props:x(f({},e),{id:r,"aria-hidden":!0,onClick:n}),slot:{open:a.dialogState.value===0},attrs:t,slots:l,name:"DialogOverlay"})}});E({name:"DialogBackdrop",props:{as:{type:[Object,String],default:"div"}},inheritAttrs:!1,setup(e,{attrs:t,slots:l,expose:a}){let r=z("DialogBackdrop"),n=`headlessui-dialog-backdrop-${P()}`,o=c(null);return a({el:o,$el:o}),H(()=>{if(r.panelRef.value===null)throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.")}),()=>{let s=e,v={id:n,ref:o,"aria-hidden":!0};return F(ee,{force:!0},()=>F(me,()=>$({props:f(f(f({},t),s),v),slot:{open:r.dialogState.value===0},attrs:t,slots:l,name:"DialogBackdrop"})))}}});let Qe=E({name:"DialogPanel",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:t,slots:l}){let a=z("DialogPanel"),r=`headlessui-dialog-panel-${P()}`;return()=>{let n={id:r,ref:a.panelRef};return $({props:f(f({},e),n),slot:{open:a.dialogState.value===0},attrs:t,slots:l,name:"DialogPanel"})}}}),_e=E({name:"DialogTitle",props:{as:{type:[Object,String],default:"h2"}},setup(e,{attrs:t,slots:l}){let a=z("DialogTitle"),r=`headlessui-dialog-title-${P()}`;return H(()=>{a.setTitleId(r),K(()=>a.setTitleId(null))}),()=>$({props:x(f({},e),{id:r}),slot:{open:a.dialogState.value===0},attrs:t,slots:l,name:"DialogTitle"})}}),Je=Ve;export{_e as A,Je as L,Ke as M,Qe as j,Z as r};