import{_ as E,d as x,a as S,u as h,v as w,m as y,ar as C,p as I,q as b,P as D,ac as P,o as _,c as M,e as N,f as B,C as c,j as O}from"./entry-bbf0cde0.mjs";import{u as k}from"./asyncData-ab30f611.mjs";import{F as U}from"./FormComponent-0cada11f.mjs";import"./Icon-ca36084c.mjs";import"./useDateHelper-c6a748de.mjs";import"./FileManager-c1dc257e.mjs";import"./use-outside-click-545a1624.mjs";import"./transition-b8498542.mjs";import"./dialog-082ab9cf.mjs";import"./TextField-52f43e27.mjs";import"./CheckboxField-6dd604a6.mjs";import"./Editor-e4ccd61e.mjs";import"./calculate-active-index-130b59fd.mjs";const A=x({async setup(f,{expose:r}){r();let i,e;const t=S(),p=h(),u=w(),s=y("page-edition",()=>null),m=C();[i,e]=I(async()=>k("async-page-edition",async()=>{await t.load(p.params.slug,{"groups[]":"page:read:edition"}),s.value=t[c.EDITION].retrieved})),await i,e();const l=b(),v=async(o,n)=>{o.isPublished==="true"&&(o.isPublished=!1),o.showInMenu==="true"&&(o.showInMenu=!1);try{await t.update(o.url,o),l.showMessage("Page correctement \xE9dit\xE9e")}catch{l.showError("Erreur dans la sauvegarde la page, v\xE9rifie le formulaire"),n.setErrors(t[c.Edition].violations)}};let a=null;const d=()=>{var o,n;m.create({originalContent:(o=s.value)==null?void 0:o.content,draft:!0,page:(n=s.value)==null?void 0:n["@id"]})};D(()=>{a=window.setInterval(d,12e4)}),P(()=>{a&&clearInterval(a),a=null});const g={pageStore:t,route:p,app:u,pageEdition:s,pageLogStore:m,notificationStore:l,submit:v,autoSaveInterval:a,autoSave:d,FormComponent:U,CRUD_MODE:c};return Object.defineProperty(g,"__isScriptSetup",{enumerable:!1,value:!0}),g}}),F={class:"flex flex-col flex-auto p-3"},R=O("h1",{class:"mb-4"},"\xC9dition d'une page",-1);function j(f,r,i,e,t,p){return _(),M("div",F,[R,e.pageEdition?(_(),N(e.FormComponent,{key:0,page:e.pageEdition,"onUpdate:page":r[0]||(r[0]=u=>e.pageEdition=u),"submit-handler":e.submit,errors:e.pageStore[e.CRUD_MODE.EDITION].violations},null,8,["page","errors"])):B("",!0)])}var $=E(A,[["render",j]]);export{$ as default};