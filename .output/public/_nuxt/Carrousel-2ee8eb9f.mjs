import{I as w}from"./Icon-f078fbba.mjs";import{_ as b,d as g,h as d,i as p,o as a,c as l,j as u,F as O,k as j,n as h,b as k,f as _}from"./entry-2e347780.mjs";const y=g({props:{mediaNode:null},setup(f,{expose:m}){m();const i=f,e=d({}),c=p(()=>i.mediaNode.mediaObjects.filter(t=>t.original===null).map((t,r)=>(t.index=r,e.value[r]=r+1,t))),o=d(0),n=c.value.length,s=d(0),x=p(()=>t=>{var r;return e.value[(r=t.index)!=null?r:0]}),v={props:i,indexToOrder:e,mediaObjects:c,current:o,nbItems:n,showTransition:s,order:x,next:()=>{s.value=1},previous:()=>{s.value=-1},updateOrder:()=>{if(s.value!==1)return;o.value===n-1?o.value=0:o.value+=1;let t=1;for(let r=o.value;r<n;r++)e.value[r]=t,t++;for(let r=0;r<o.value;r++)e.value[r]=t,t++;s.value=0},Icon:w};return Object.defineProperty(v,"__isScriptSetup",{enumerable:!1,value:!0}),v}}),C={key:0,class:"overflow-hidden hidden md:flex flex-no-wrap flex-row bg-white"},N=["src"],T={class:"w-fit -translate-x-[150%]"};function I(f,m,i,e,c,o){return e.mediaObjects.length>0?(a(),l("div",C,[u("div",{class:h(["flex flex-row flex-nowrap h-96 flex-auto bg-primary",{"translate-x-0":!e.showTransition,"transition ease-in duration-700 -translate-x-full":e.showTransition}]),onTransitionend:e.updateOrder},[(a(!0),l(O,null,j(e.mediaObjects,n=>(a(),l("div",{class:h(["w-full shrink-0 flex items-center justify-center h-96 group",`order-${e.order(n)}`])},[u("img",{src:n.contentUrl,class:"w-auto object-cover"},null,8,N)],2))),256))],34),e.mediaObjects.length>1?(a(),l("div",{key:0,onClick:e.next,class:"cursor-pointer grow-0 w-0 flex z-10 items-center"},[u("div",T,[k(e.Icon,{icon:"ri-arrow-right-s-fill",class:"fill-white bg-primary rounded-full h-12 w-12 shadow-xs"})])])):_("",!0)])):_("",!0)}var E=b(y,[["render",I]]);export{E as C};
