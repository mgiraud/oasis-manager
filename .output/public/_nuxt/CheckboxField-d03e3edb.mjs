import{_ as s,d as c,o,c as d,b as i,L as u,k as f,g as l,t as n,e as _,w as m,f as p,M as x}from"./entry-87b30bf9.mjs";import{T as b}from"./Tooltip-52fdeb63.mjs";const h=c({props:{name:null,label:null,error:null,fieldAttrs:{default:{autocomplete:"off",validateOnInput:!0}}},setup(a,{expose:r}){r();const t={props:a,Field:x,Tooltip:b};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}}),k={class:"flex flex-row group py-4 px-3"},v=["for"];function y(a,r,e,t,C,g){return o(),d("div",k,[i(t.Field,u({id:e.name},{fieldAttrs:e.fieldAttrs},{type:"checkbox",name:e.name,value:!0,"unchecked-value":!1,class:"h-5 w-5 mr-2"}),null,16,["id","name"]),f("label",{for:e.name},[l(n(e.label)+" ",1),e.error?(o(),_(t.Tooltip,{key:0},{default:m(()=>[l(n(e.error),1)]),_:1})):p("",!0)],8,v)])}var N=s(h,[["render",y]]);export{N as C};
