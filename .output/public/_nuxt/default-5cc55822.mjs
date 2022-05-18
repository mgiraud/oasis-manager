import{_ as C,d as S,o as a,c as p,j as t,F as k,k as T,t as w,g as N,aj as h,aw as P,u as H,a as L,D,e as d,w as u,b as i,f as _,av as V,as as U,p as q,ap as J,q as G,h as K,P as Q,y as W,r as X,n as g,ac as Z,I as $,C as M}from"./entry-2e347780.mjs";import{u as ee}from"./asyncData-bc25d67a.mjs";import{T as te}from"./TextField-5fde64fb.mjs";import{I as F}from"./Icon-f078fbba.mjs";import{f as re,m as oe,p as se,v as ae,N as le}from"./Notification-d1927b21.mjs";import"./use-outside-click-ea4f1ee7.mjs";import"./calculate-active-index-130b59fd.mjs";import"./transition-2ed963cb.mjs";const ie=S({setup(f,{expose:n}){n();const e={redirectTo:l=>{h(l)}};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}}),ne={class:"bg-primary flex flex-col"},ce={class:"w-full text-center h-12 flex-row items-center justify-center flex"},de=["onClick"],fe={class:"w-full text-center text-gray-600 pb-2"},me=t("strong",null,"Les transalpins",-1);function ue(f,n,c,e,l,m){return a(),p("div",ne,[t("div",ce,[(a(),p(k,null,T([{label:"Mentions l\xE9gales",url:"mentions-legales"}],r=>t("div",{key:r.label,onClick:o=>e.redirectTo(r.url),class:"my-2 cursor-pointer text-white text-xs uppercase"},w(r.label),9,de)),64))]),t("div",fe,[N(" 2020-"+w(new Date().getFullYear())+" \u2014 ",1),me])])}var _e=C(ie,[["render",ue]]);const pe=S({setup(f,{expose:n}){n();const c=P(),e=H(),l=L(),{menu:m}=D(l),o={router:c,route:e,pageStore:l,menu:m,redirectTo:s=>{s!==null&&h(s)},Menu:re,MenuButton:oe,MenuItems:se,MenuItem:ae,Icon:F};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}}),he={class:"pl-2 text-xs"};function xe(f,n,c,e,l,m){return a(!0),p(k,null,T(e.menu,r=>(a(),d(e.Menu,{as:"div",class:"shadow-sm md:relative flex flex-auto h-10"},{default:u(({open:o})=>[i(e.MenuButton,{onClick:s=>e.redirectTo(r.children.length===0?r.url:null),class:"w-full text-primary-dark text-center before:absolute before:top-0 tracking-widest text-xs uppercase"},{default:u(()=>[N(w(r.name)+" ",1),r.children.length>0&&!o?(a(),d(e.Icon,{key:0,icon:"ri-arrow-right-s-fill",class:"h-3 w-3 inline-flex fill-primary-dark"})):_("",!0),r.children.length>0&&o?(a(),d(e.Icon,{key:1,icon:"ri-arrow-down-s-fill",class:"h-3 w-3 inline-flex fill-primary-dark"})):_("",!0)]),_:2},1032,["onClick"]),r.children.length>0?(a(),d(V,{key:0,"enter-active-class":"transition duration-100 ease-out","enter-from-class":"transform scale-95 opacity-0","enter-to-class":"transform scale-100 opacity-100","leave-active-class":"transition duration-75 ease-in","leave-from-class":"transform scale-100 opacity-100","leave-to-class":"transform scale-95 opacity-0"},{default:u(()=>[i(e.MenuItems,{class:"flex flex-col flex-auto absolute left-0 top-full w-full bg-primary text-white z-10"},{default:u(()=>[(a(!0),p(k,null,T(r.children,s=>(a(),d(e.MenuItem,{onClick:y=>e.redirectTo(s.url),as:"div",class:"hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer"},{default:u(({active:y})=>[t("div",he,w(s.name),1)]),_:2},1032,["onClick"]))),256))]),_:2},1024)]),_:2},1024)):_("",!0)]),_:2},1024))),256)}var ge=C(pe,[["render",xe]]);const we=S({async setup(f,{expose:n}){n();let c,e;const l=U(),{isLogged:m,isAdmin:r}=D(l),o=L();[c,e]=q(()=>ee("pages",()=>o.fetchAll())),await c,e();const s={email:"email"},y=()=>{h("/login")},j=()=>{h("/")},B=()=>{h("/admin")},I=()=>{l.logout()},x=J(),v=G(),Y=async(O,R)=>{try{await x.create(O),v.showMessage("Je suis maintenant inscris \xE0 la newsletter")}catch{v.showError(x[M.CREATION].error),R.setErrors(x[M.CREATION].violations)}},A=K(0);function b(){A.value=window.scrollY}Q(()=>{window.addEventListener("scroll",b)}),W(()=>{window.removeEventListener("scroll",b)});function z(){window.open("https://www.helloasso.com/associations/les-transalpins/adhesions/adhesion-2022","_")}const E={authStore:l,isLogged:m,isAdmin:r,pageStore:o,schema:s,redirectToLogin:y,redirectToHome:j,redirectToAdmin:B,logout:I,newsletterStore:x,notificationStore:v,submitNewsletter:Y,scrollY:A,onScroll:b,redirectToHelloAsso:z,TextField:te,Footer:_e,LayoutDefaultMenu:ge,Icon:F,Notification:le,Form:$};return Object.defineProperty(E,"__isScriptSetup",{enumerable:!1,value:!0}),E}}),ye={class:"flex flex-col bg-secondary-light min-h-screen text-sm order-first"},ve={class:"fixed top-0 left-0 right-0 block z-40 bg-primary"},be=t("div",{class:"grow"},null,-1),ke={class:"h-10 inline-flex items-center pt-1 pb-2"},Te={class:"flex flex-row bg-info flex-wrap"},Ce={class:"bg-white"},Se={class:"shadow-md flex flex-row justify-center items-center flex-auto flex-wrap"},Ae=["type"],Ee=t("div",{class:"mx-3 text-gray-800 text-sm"},"ET",-1),Me=t("span",{class:"uppercase tracking-wider font-light"},"Adh\xE8re \xE0 l'association",-1),Ne=[Me],Le={class:"flex flex-col pt-48 sm:pt-64 flex-auto shadow-md mb-4"};function De(f,n,c,e,l,m){const r=X("Body");return a(),p("div",ye,[i(r,{class:"bg-primary"}),t("header",ve,[t("div",{class:g(["bg-primary hidden md:block absolute top-0 left-0 w-full transition-all duration-200",{"h-10":e.scrollY>=50,"h-36":e.scrollY<50}])},[t("div",{class:g(["h-full bg-[url('/images/vercors.jpg')] bg-center bg-cover bg-no-repeat",{"opacity-0":e.scrollY>=50}])},null,2)],2),t("div",{class:g(["flex items-start transition-all duration-200",{"h-10":e.scrollY>=50,"h-10 md:h-36":e.scrollY<50}])},[t("div",{onClick:e.redirectToHome,class:"self-end z-40 font-marker text-lg text-white px-4 py-2 cursor-pointer"},"Les transalpins"),be,e.isAdmin?(a(),p("div",{key:0,class:"items-center text-primary-dark z-40 mr-1 inline-flex whitespace-nowrap uppercase tracking-wider text-sm py-2 h-10 cursor-pointer",onClick:e.redirectToAdmin},"ADMIN")):_("",!0),t("div",ke,[e.isLogged?_("",!0):(a(),d(e.Icon,{key:0,icon:"ri-login-box-line",onClick:e.redirectToLogin,class:"h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"})),e.isLogged?(a(),d(e.Icon,{key:1,icon:"ri-logout-box-line",onClick:e.logout,class:"h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"})):_("",!0)])],2),t("div",Te,[i(e.LayoutDefaultMenu)]),t("div",Ce,[t("div",Se,[i(e.Form,{onSubmit:e.submitNewsletter,class:"flex flex-row","validation-schema":e.schema},{default:u(({values:o,errors:s})=>[i(e.TextField,{icon:"ri-mail-line",type:"email",name:"email",error:s.email,value:o.email,label:"Email",class:"w-96 py-4 px-3"},null,8,["error","value"]),t("button",{type:!s.email&&!!o.email?"submit":"button"},[i(e.Icon,{icon:"ri-send-plane-fill",class:g(["h-5 w-5",{"fill-primary hover:fill-primary-dark":!s.email&&!!o.email,"fill-gray-500":!o.email,"fill-accent":!!s.email}])},null,8,["class"])],8,Ae)]),_:1}),Ee,t("div",{class:"grow md:grow-0"},[t("button",{onClick:e.redirectToHelloAsso,class:"bg-primary hover:bg-primary-dark text-white text-sm px-3 py-1.5 shadow-md rounded-sm"},Ne)])])])]),t("div",Le,[Z(f.$slots,"default")]),i(e.Footer),i(e.Notification)])}var He=C(we,[["render",De]]);export{He as default};
