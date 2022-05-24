import{_ as y,d as T,l as k,D as N,h as w,i as S,p as F,E as L,z as V,o as _,e as v,w as u,b as n,g as E,t as h,j as c,c as j,k as B,n as O,F as P,G as D,H as A,f as q,I as z,J as H}from"./entry-63f3c6e5.mjs";import{u as C}from"./asyncData-2ab7c675.mjs";import{D as I,w as K,k as G,C as R,S as J,E as M}from"./Editor-bea37c24.mjs";import{C as U}from"./CheckboxField-23418cc9.mjs";import{T as Q}from"./TextField-69fdc5c3.mjs";const W=T({props:{initialTags:null},async setup(m,{expose:d}){d();let i,e;const o=m,r=k(),{tags:a}=N(r),t=w([]),l=S(()=>[...a.value,...t.value]);[i,e]=F(async()=>C("blog-tags",async()=>{await r.fetchTags()})),await i,e();const s=w(o.initialTags),g=x=>{const p=x.target.value;p!==!1&&!t.value.includes(p)&&!a.value.includes(p)&&(t.value.push(p),s.value.push(p)),x.target.value=""},{value:f}=L("tags",void 0,{initialValue:o.initialTags});V(()=>s,x=>{f.value=x.value},{deep:!0});const b={props:o,articleStore:r,storeTags:a,additionalTags:t,tags:l,selectedTags:s,addTag:g,inputValue:f,Listbox:I,ListboxButton:K,ListboxOptions:G,ListboxOption:R};return Object.defineProperty(b,"__isScriptSetup",{enumerable:!1,value:!0}),b}}),X={class:"relative"},Y={class:"p-3 w-full"},Z=["onKeyup"];function $(m,d,i,e,o,r){return _(),v(e.Listbox,{as:"div",modelValue:e.selectedTags,"onUpdate:modelValue":d[0]||(d[0]=a=>e.selectedTags=a),multiple:"",class:"flex justify-center flex-col"},{default:u(()=>[n(e.ListboxButton,{class:"w-full bg-gray-200 p-3"},{default:u(()=>[E(h(e.selectedTags.length>0?"Tags: "+e.selectedTags.join(", "):"S\xE9lectionne des tags"),1)]),_:1}),c("div",X,[n(e.ListboxOptions,{class:"absolute top-0 w-full bg-gray-200 z-10"},{default:u(()=>[(_(!0),j(P,null,B(e.tags,(a,t)=>(_(),v(e.ListboxOption,{as:"template",key:t,value:a},{default:u(({active:l,selected:s})=>[c("li",{class:O([{"text-primary-dark":s,"bg-primary text-white":l&&!s},"w-full cursor-pointer p-3"])},h(a),3)]),_:2},1032,["value"]))),128)),c("li",Y,[c("input",{onKeyup:D(e.addTag,["enter"]),type:"text p-2 w-full",placeholder:"Ajoute un tag (avec entr\xE9e)"},null,40,Z)])]),_:1})])]),_:1},8,["modelValue"])}var ee=y(W,[["render",$]]);const te=T({props:{article:null,submitHandler:null,errors:null},emits:["update:article"],async setup(m,{expose:d,emit:i}){d();let e,o;const r=m,a=S({get(){return r.article},set(f){i("update:article",f)}}),t=A();[e,o]=F(()=>C("media-node-items",()=>t.fetchSelectItems())),await e,o();const l=t.selectItemList(),g={props:r,emit:i,item:a,mediaNodeStore:t,mediaNodes:l,schema:{title:"required|min:3|max:60",preview:"required|min:20|max:500",content:"required|min:20"},FormTags:ee,CheckboxField:U,SelectField:J,TextField:Q,Editor:M,Form:z};return Object.defineProperty(g,"__isScriptSetup",{enumerable:!1,value:!0}),g}}),ae=c("input",{type:"hidden",name:"tags"},null,-1),le=c("div",{class:"flex w-full justify-end px-3"},[c("button",{type:"submit",class:"py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"},"Sauvegarder"),c("button",{type:"reset",class:"py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"},"R\xE9initialiser")],-1);function se(m,d,i,e,o,r){const a=H;return _(),v(e.Form,{onSubmit:i.submitHandler,class:"flex flex-row flex-wrap","validation-schema":e.schema,"initial-values":e.item},{default:u(({values:t,errors:l})=>{var s;return[n(e.TextField,{name:"title",error:l.title,value:t.title,label:"Titre",class:"w-1/2"},null,8,["error","value"]),n(e.CheckboxField,{name:"isPublished",error:l.isPublished,label:"Publier",class:"w-1/2"},null,8,["error"]),n(e.SelectField,{name:"mediaNode",options:e.mediaNodes,error:l.mediaNode,value:t.mediaNode,label:"Gallerie",class:"w-1/2"},null,8,["options","error","value"]),n(e.FormTags,{class:"w-1/2","initial-tags":(s=e.item.tags)!=null?s:[]},null,8,["initial-tags"]),n(e.TextField,{as:"textarea",type:"textarea",name:"preview",error:l.preview,value:t.preview,label:"Preview",class:"w-full"},null,8,["error","value"]),ae,n(a,null,{default:u(()=>[e.item.content!==void 0?(_(),v(e.Editor,{key:0,name:"content",ref:"editor",class:"bg-white w-full my-3 px-3",label:"Contenu de la page",value:e.item.content},null,8,["value"])):q("",!0)]),_:1}),le]}),_:1},8,["onSubmit","initial-values"])}var de=y(te,[["render",se]]);export{de as F};