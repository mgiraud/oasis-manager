import{I as w}from"./Icon-b7f67c13.mjs";import{_ as p,d as b,h as d,i as O,j,o as i,c as l,k as c,F as N,l as g,n as v,b as k,f as x}from"./entry-7a7af91b.mjs";const C=b({props:{mediaNode:null},setup(u,{expose:f}){f();const o=u,r=d({}),m=O();o.mediaNode.mediaObjects.forEach((t,e)=>{t.index=e,r.value[e]=e+1});const a=d(0),s=o.mediaNode.mediaObjects.length,n=d(0),_=j(()=>t=>{var e;return r.value[(e=t.index)!=null?e:0]}),h={props:o,indexToOrder:r,mediaObjectStore:m,current:a,nbItems:s,showTransition:n,order:_,next:()=>{n.value=1},previous:()=>{n.value=-1},updateOrder:()=>{a.value===s-1?a.value=0:a.value+=1;let t=1;for(let e=a.value;e<s;e++)r.value[e]=t,t++;for(let e=0;e<a.value;e++)r.value[e]=t,t++;n.value=0},Icon:w};return Object.defineProperty(h,"__isScriptSetup",{enumerable:!1,value:!0}),h}}),y={key:0,class:"overflow-hidden hidden md:flex flex-no-wrap flex-row bg-white"},T=["src"],I={class:"w-fit -translate-x-[150%]"};function S(u,f,o,r,m,a){return o.mediaNode.mediaObjects.length>0?(i(),l("div",y,[c("div",{class:v(["flex flex-row flex-nowrap h-96 flex-auto",{"translate-x-0":!r.showTransition,"transition ease-in duration-700 -translate-x-full":r.showTransition}]),onTransitionend:r.updateOrder},[(i(!0),l(N,null,g(o.mediaNode.mediaObjects,s=>(i(),l("div",{class:v(["w-full shrink-0 flex items-center justify-center",`order-${r.order(s)}`])},[c("img",{src:s.contentUrl,class:"w-auto max-h-96 object-scale-down"},null,8,T)],2))),256))],34),o.mediaNode.mediaObjects.length>1?(i(),l("div",{key:0,onClick:r.next,class:"cursor-pointer grow-0 w-0 flex z-10 items-center"},[c("div",I,[k(r.Icon,{icon:"ri-arrow-right-s-fill",class:"fill-white bg-primary rounded-full h-12 w-12 shadow-xs"})])])):x("",!0)])):x("",!0)}var L=p(C,[["render",S]]);export{L as C};
