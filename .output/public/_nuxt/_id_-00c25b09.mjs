import{_ as f,d as x,m as h,o as l,c as _,k as a,t as i,g as v,F as g,l as b,aj as C,u as y,q as A,C as k,r as T,b as w,w as S,e as m,f as p}from"./entry-87b30bf9.mjs";import{u as D}from"./asyncData-43007f1d.mjs";import{u as N}from"./useDateHelper-e4869b7b.mjs";import{u as B}from"./useStringHelper-b0dd0f5e.mjs";import{C as E}from"./Carrousel-a539fecb.mjs";import"./Icon-fefadd4a.mjs";const H=x({props:{article:null},setup(d,{expose:n}){n();const t=d,{formatDate:e}=N(),{capitalize:s}=B(),r=h(),c={props:t,formatDate:e,capitalize:s,blogArticleStore:r,setActiveTag:u=>{r.$patch({activeTags:[u]}),C("/blog")}};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),j={class:"p-3"},O={class:"p-3"},V={class:"p-2"},L={class:"text-2xl"},M={class:"flex w-full items-center p-2"},z={class:"flex flex-col"},F=["datetime"],I={class:"flex flex-wrap"},P=["onClick"],R={class:"p-3 border-t border-gray-300"},q=["innerHTML"];function U(d,n,t,e,s,r){return l(),_("article",j,[a("header",O,[a("h1",null,i(t.article.title),1)]),a("section",V,[a("div",L,i(t.article.preview),1)]),a("section",M,[a("div",z,[a("div",null,[v(i(e.capitalize(t.article.createdBy.nickname))+" - ",1),a("time",{datetime:t.article.createdAt},i(e.formatDate(t.article.createdAt)),9,F)])]),a("div",I,[(l(!0),_(g,null,b(t.article.tags,(o,c)=>(l(),_("div",{key:c,class:"bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 mb-1 text-xs cursor-pointer",onClick:u=>e.setActiveTag(o)},i(o),9,P))),128))])]),a("section",R,[a("div",{class:"js-content",innerHTML:t.article.content},null,8,q)])])}var G=f(H,[["render",U]]);const J=x({async setup(d,{expose:n}){n();let t,e;const s=y(),r=h();[t,e]=A(()=>D("article",()=>r.load(s.params.id))),await t,e();const o=r[k.EDITION].retrieved,c={route:s,blogArticleStore:r,article:o,ArticleComponent:G,Carrousel:E};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),K={class:"flex bg-white flex-auto flex-col"};function Q(d,n,t,e,s,r){const o=T("Title");return l(),_("div",K,[w(o,null,{default:S(()=>[v(i(e.article?"Article - "+e.article.title:"Habitat participatif situ\xE9 vers la r\xE9gion grenobloise"),1)]),_:1}),e.article!==null&&e.article.mediaNode!==null?(l(),m(e.Carrousel,{key:0,"media-node":e.article.mediaNode},null,8,["media-node"])):p("",!0),e.article?(l(),m(e.ArticleComponent,{key:1,article:e.article},null,8,["article"])):p("",!0)])}var te=f(J,[["render",Q]]);export{te as default};
