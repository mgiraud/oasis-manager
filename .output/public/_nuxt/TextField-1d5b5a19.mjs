import{_,d as b,o as r,c as g,e as d,n as a,f as u,k as n,b as x,L as y,g as f,t as m,w as C,M as h}from"./entry-87b30bf9.mjs";import{T as v}from"./Tooltip-52fdeb63.mjs";import{I as w}from"./Icon-fefadd4a.mjs";function k(l){const o=l.fieldAttrs&&l.fieldAttrs.disabled==="disabled",e="gray-300";return{isDisabled:o,disabledColor:e,getColor:()=>o?e:l.value?!!l.value&&!l.error?"primary":l.error?"accent":"gray-500":"gray-500"}}const T=b({props:{name:null,label:null,type:{default:"text"},icon:null,error:null,value:null,fieldAttrs:{default:{autocomplete:"off",validateOnInput:!0}},as:{default:"input"}},setup(l,{expose:o}){o();const e=l,{isDisabled:t,disabledColor:i,getColor:s}=k(e),c={props:e,isDisabled:t,disabledColor:i,getColor:s,Field:h,Tooltip:v,Icon:w};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),A={class:"flex flex-row group py-4 px-3"},B={class:"relative w-full"},D=["for"];function F(l,o,e,t,i,s){return r(),g("div",A,[e.icon?(r(),d(t.Icon,{key:0,icon:e.icon,class:a(["h-8 w-10 group-focus-within:stroke-2",[`fill-${t.getColor()}`]])},null,8,["icon","class"])):u("",!0),n("div",B,[x(t.Field,y({as:e.as,id:e.name,name:e.name,type:e.type,class:["peer w-full outline-none h-fit",{[`text-${t.disabledColor}`]:t.isDisabled}]},e.fieldAttrs),null,16,["as","id","name","type","class"]),n("label",{for:e.name,class:a([{"-top-6 pl-0":!!e.value,[`text-${t.getColor()}`]:!0},"transform transition-all absolute top-0 left-0 h-fit flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:-top-6"])},[f(m(e.label)+" ",1),e.error?(r(),d(t.Tooltip,{key:0},{default:C(()=>[f(m(e.error),1)]),_:1})):u("",!0)],10,D),n("div",{class:a([{[`border-${t.getColor()}`]:!0,"-ml-8 w-[calc(100%_+_2rem)]":!!e.icon,"w-full":!e.icon},"absolute bottom-0 border-b"])},null,2)])])}var S=_(T,[["render",F]]);export{S as T};
