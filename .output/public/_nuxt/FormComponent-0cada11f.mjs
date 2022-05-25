import{_ as L,d as D,h as v,ar as I,i as N,z as M,o as m,c as w,b as o,w as n,T as A,U as P,V as B,j as u,as as O,F as k,k as V,t as j,g as E,an as R,H,p as F,e as h,f as T,I as q,J as z}from"./entry-bbf0cde0.mjs";import{u as y}from"./asyncData-ab30f611.mjs";import{I as U}from"./Icon-ca36084c.mjs";import{u as G}from"./useDateHelper-c6a748de.mjs";import{p as J,x as K,w as Q}from"./FileManager-c1dc257e.mjs";import{f as W,o as X}from"./transition-b8498542.mjs";import{M as Y,j as Z,A as $}from"./dialog-082ab9cf.mjs";import{C as ee}from"./CheckboxField-6dd604a6.mjs";import{S as te,E as ae}from"./Editor-e4ccd61e.mjs";import{T as oe}from"./TextField-52f43e27.mjs";const le=D({props:{url:null,setContent:null},setup(f,{expose:t}){t();const i=f,e=v(!1),c=v(!1),d=I(),{formatRDate:a}=G(),r=v(null),{refresh:l}=y("page-log-stores",async()=>{await d.fetchAll({"page.url":i.url,"order[updatedAt]":"desc"})}),_=N(()=>d.list.map(s=>({value:s["@id"],label:`#${s.id} ${a(s.updatedAt)} - ${s.draft?"Automatique":`Manuelle par ${s.updatedBy.nickname}`}`}))),x=s=>{const g=d.find(s);g&&i.setContent(g.originalContent),e.value=!1};M(e,(s,g)=>{s&&!g&&l()});const p={props:i,dialog:e,mouseOn:c,pageLogStore:d,formatRDate:a,selectedLog:r,refresh:l,logs:_,submitHandler:x,Popover:J,PopoverButton:K,PopoverPanel:Q,TransitionRoot:W,TransitionChild:X,Dialog:Y,DialogPanel:Z,DialogTitle:$,Icon:U};return Object.defineProperty(p,"__isScriptSetup",{enumerable:!1,value:!0}),p}}),ne=E(" R\xE9cup\xE9rer une ancienne version "),re=u("div",{class:"fixed inset-0 bg-black bg-opacity-25"},null,-1),se={class:"fixed inset-0 overflow-y-auto"},ie={class:"flex min-h-full items-center justify-center p-4 text-center"},de=E(" R\xE9cup\xE9rer une ancienne version "),ce=["value","selected"];function ue(f,t,i,e,c,d){return m(),w(k,null,[o(e.Popover,{class:"relative bg-black flex-auto inline-flex p-2"},{default:n(()=>[o(e.PopoverButton,{onClick:t[2]||(t[2]=A(a=>e.dialog=!0,["prevent"]))},{default:n(()=>[o(e.Icon,{icon:"ri-download-cloud-line",class:"h-6 w-6 fill-white",onMouseenter:t[0]||(t[0]=a=>e.mouseOn=!0),onMouseleave:t[1]||(t[1]=a=>e.mouseOn=!1)})]),_:1}),P(o(e.PopoverPanel,{class:"absolute z-10 bg-sky-500 w-24 bottom-10 left-2",static:""},{default:n(()=>[ne]),_:1},512),[[B,e.mouseOn]])]),_:1}),o(e.TransitionRoot,{appear:"",show:e.dialog,as:"template"},{default:n(()=>[o(e.Dialog,{as:"div",onClose:t[5]||(t[5]=a=>e.dialog=!1),class:"relative z-10"},{default:n(()=>[o(e.TransitionChild,{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0"},{default:n(()=>[re]),_:1}),u("div",se,[u("div",ie,[o(e.TransitionChild,{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-200 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95"},{default:n(()=>[o(e.DialogPanel,{class:"w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100"},{default:n(()=>[o(e.DialogTitle,{as:"h3",class:"text-lg font-medium leading-6 text-gray-900"},{default:n(()=>[de]),_:1}),P(u("select",{class:"peer w-full outline-none h-8",onChange:t[3]||(t[3]=a=>e.submitHandler(e.selectedLog)),"onUpdate:modelValue":t[4]||(t[4]=a=>e.selectedLog=a)},[(m(!0),w(k,null,V(e.logs,a=>(m(),w("option",{value:a.value,selected:a.value===e.selectedLog},j(a.label),9,ce))),256))],544),[[O,e.selectedLog]])]),_:1})]),_:1})])])]),_:1})]),_:1},8,["show"])],64)}var me=L(le,[["render",ue]]);const fe=D({props:{page:null,submitHandler:null,errors:null},emits:["update:page"],async setup(f,{expose:t,emit:i}){t();let e,c;const d=f,a=N({get(){return d.page},set(b){i("update:page",b)}}),r=R(),l=H();[e,c]=F(()=>y("page-category-items",()=>r.fetchSelectItems())),await e,c(),[e,c]=F(()=>y("media-node-items",()=>l.fetchSelectItems())),await e,c();const _=r.selectItemList(),x=l.selectItemList(),p=v(null),C={props:d,emit:i,item:a,pageCategoryStore:r,mediaNodeStore:l,categories:_,mediaNodes:x,editor:p,setContent:b=>{var S;(S=p.value)==null||S.setContent(b)},schema:{title:"required|min:3|max:60",url:"required|min:3|max:60",content:"required|min:10|max:20000"},OldVersionBtn:me,CheckboxField:ee,SelectField:te,TextField:oe,Editor:ae,Form:q};return Object.defineProperty(C,"__isScriptSetup",{enumerable:!1,value:!0}),C}}),pe=u("div",{class:"flex w-full justify-end px-3"},[u("button",{type:"submit",class:"py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"},"Sauvegarder"),u("button",{type:"reset",class:"py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"},"R\xE9initialiser")],-1);function ge(f,t,i,e,c,d){const a=z;return m(),h(e.Form,{onSubmit:i.submitHandler,class:"flex flex-row flex-wrap","validation-schema":e.schema,"initial-values":e.item},{default:n(({values:r,errors:l})=>[o(e.TextField,{name:"title",error:l.title,value:r.title,label:"Titre",class:"w-1/2"},null,8,["error","value"]),o(e.TextField,{name:"url",error:l.url,value:r.url,label:"URL",class:"w-1/2"},null,8,["error","value"]),o(e.CheckboxField,{name:"isPublished",error:l.isPublished,label:"Publier",class:"w-1/2"},null,8,["error"]),o(e.CheckboxField,{name:"showInMenu",error:l.showInMenu,label:"Afficher dans le menu",class:"w-1/2"},null,8,["error"]),o(e.SelectField,{name:"category",options:e.categories,error:l.category,value:r.category,label:"Cat\xE9gorie",class:"w-1/2"},null,8,["options","error","value"]),o(e.SelectField,{name:"mediaNode",options:e.mediaNodes,error:l.mediaNode,value:r.mediaNode,label:"Gallerie",class:"w-1/2"},null,8,["options","error","value"]),o(a,null,{default:n(()=>[e.item.content!==void 0?(m(),h(e.Editor,{key:0,name:"content",ref:"editor",class:"bg-white w-full my-3 px-3",label:"Contenu de la page",value:e.item.content},{supplemental_btns:n(()=>[e.item.url?(m(),h(e.OldVersionBtn,{key:0,url:e.item.url,"set-content":e.setContent},null,8,["url"])):T("",!0)]),_:1},8,["value"])):T("",!0)]),_:1}),pe]),_:1},8,["onSubmit","initial-values"])}var ke=L(fe,[["render",ge]]);export{ke as F};