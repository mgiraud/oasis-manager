var b=Object.defineProperty;var p=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var D=(e,n,a)=>n in e?b(e,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[n]=a,g=(e,n)=>{for(var a in n||(n={}))C.call(n,a)&&D(e,a,n[a]);if(p)for(var a of p(n))P.call(n,a)&&D(e,a,n[a]);return e};import{v as x,h as c,x as O,y as z,z as _,A as B,B as R,D as A}from"./entry-87b30bf9.mjs";const M=e=>x(e)?e:c(e),E=()=>null;function S(e,n,a={}){var o,h,y,m,v;if(typeof e!="string")throw new TypeError("asyncData key must be a string");if(typeof n!="function")throw new TypeError("asyncData handler must be a function");a=g({server:!0,default:E},a),a.defer&&console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC."),a.lazy=(h=(o=a.lazy)!=null?o:a.defer)!=null?h:!1,a.initialCache=(y=a.initialCache)!=null?y:!0;const r=O(),i=R();if(i&&!i._nuxtOnBeforeMountCbs){const f=i._nuxtOnBeforeMountCbs=[];i&&(z(()=>{f.forEach(s=>{s()}),f.splice(0,f.length)}),_(()=>f.splice(0,f.length)))}const l=()=>a.initialCache&&r.payload.data[e]!==void 0,t={data:M((m=r.payload.data[e])!=null?m:a.default()),pending:c(!l()),error:c((v=r.payload._errors[e])!=null?v:null)};t.refresh=(f={})=>r._asyncDataPromises[e]?r._asyncDataPromises[e]:f._initial&&l()?r.payload.data[e]:(t.pending.value=!0,r._asyncDataPromises[e]=Promise.resolve(n(r)).then(s=>{a.transform&&(s=a.transform(s)),a.pick&&(s=I(s,a.pick)),t.data.value=s,t.error.value=null}).catch(s=>{t.error.value=s,t.data.value=A(a.default())}).finally(()=>{t.pending.value=!1,r.payload.data[e]=t.data.value,t.error.value&&(r.payload._errors[e]=!0),delete r._asyncDataPromises[e]}),r._asyncDataPromises[e]);const u=()=>t.refresh({_initial:!0}),w=a.server!==!1&&r.payload.serverRendered;{w&&r.isHydrating&&e in r.payload.data?t.pending.value=!1:i&&r.payload.serverRendered&&(r.isHydrating||a.lazy)?i._nuxtOnBeforeMountCbs.push(u):u(),a.watch&&B(a.watch,()=>t.refresh());const f=r.hook("app:data:refresh",s=>{if(!s||s.includes(e))return t.refresh()});i&&_(f)}const d=Promise.resolve(r._asyncDataPromises[e]).then(()=>t);return Object.assign(d,t),d}function I(e,n){const a={};for(const r of n)a[r]=e[r];return a}export{S as u};
