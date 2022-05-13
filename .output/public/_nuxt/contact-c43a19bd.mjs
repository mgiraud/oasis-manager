import{P as w}from"./PageComponent-91c3b090.mjs";import{T as g}from"./Tooltip-52fdeb63.mjs";import{_ as N,d as j,a as v,am as k,s as E,J as S,M as C,r as T,o as i,c as x,b as s,w as c,e as r,C as F,k as e,n,g as l,t as m,f as u}from"./entry-87b30bf9.mjs";import{I}from"./Icon-fefadd4a.mjs";const O=j({setup(_,{expose:b}){b();const d=v(),o=d.find("/api/pages/contact"),f=k(),p=E(),t={pageStore:d,page:o,contactStore:f,notificationStore:p,schema:{email:"required|email",phoneNumber:"regex:^0\\d{9}$",firstName:"min:3|max:60",lastName:"min:3|max:60",subject:"required|min:8|max:60",content:"required|min:10|max:1000"},onSubmit:async y=>{try{await f.create(y),p.showMessage("Message correctement envoy\xE9 !")}catch{p.showError(f[F.CREATION].error)}},PageComponent:w,Tooltip:g,Icon:I,Form:S,Field:C};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}}),P={class:"flex bg-white flex-auto flex-col py-3"},M=l("Contacte-nous"),q={key:1},B=e("p",null,[l(" Pour nous contacter tu peux nous envoyer un email \xE0 "),e("a",{href:"mailto:contact@lestransalpins.org",title:"Envoyer un email aux transalpins"},"contact@lestransalpins.org"),l(" ou bien remplir le formulaire suivant.")],-1),D=e("p",null," Dans ce cas tu recevras un email de confirmation ou bien regarde dans tes spams si ce n'est pas le cas. ",-1),V=[B,D],R={class:"flex flex-row w-1/2 group py-4 px-3"},z={class:"relative w-full"},A=l("Email "),J={class:"flex flex-row w-1/2 group py-4 px-3"},U={class:"relative w-full"},G=l("Num\xE9ro de t\xE9l\xE9phone "),H={class:"flex flex-row w-1/2 group py-4 px-3"},K={class:"relative w-full"},L=l("Pr\xE9nom "),Q={class:"flex flex-row w-1/2 group py-4 px-3"},W={class:"relative w-full"},X=l("Nom "),Y={class:"flex flex-row w-full group py-4 px-3"},Z={class:"relative w-full"},$=l("Sujet "),tt={class:"flex flex-col w-full group py-4 px-3"},et={class:"flex flex-row"},at=e("button",{type:"submit",class:"py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"},"Envoyer",-1),ot=e("button",{type:"reset",class:"py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent"},"R\xE9initialiser",-1);function lt(_,b,d,o,f,p){const h=T("Title");return i(),x("div",P,[s(h,null,{default:c(()=>[M]),_:1}),o.page?(i(),r(o.PageComponent,{key:0,page:o.page},null,8,["page"])):(i(),x("div",q,V)),s(o.Form,{onSubmit:o.onSubmit,class:"flex flex-row flex-wrap w-full sm:w-3/4 md:wd-1/2 lg:wd-1/3 justify-center self-center text-gray-500","validation-schema":o.schema},{default:c(({values:a,errors:t})=>[e("div",R,[s(o.Icon,{icon:"ri-mail-line",class:n(["h-8 w-10 group-focus-within:stroke-2",{"fill-accent":!!t.email,"fill-primary":!!a.email&&!t.email,"fill-gray-500":!a.email}])},null,8,["class"]),e("div",z,[s(o.Field,{id:"email",name:"email",type:"email",required:"",autocomplete:"off",class:"peer w-full outline-none h-8",validateOnInput:!0}),e("label",{for:"email",class:n([{"h-1/2 -translate-y-full pl-0":!!a.email,"text-accent":!!t.email,"text-primary":!!a.email&&!t.email},"transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])},[A,t.email?(i(),r(o.Tooltip,{key:0},{default:c(()=>[l(m(t.email),1)]),_:2},1024)):u("",!0)],2),e("div",{class:n([{"border-accent":!!t.email,"border-primary":!!a.email&&!t.email,"border-gray-500":!a.email},"absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b"])},null,2)])]),e("div",J,[e("div",U,[s(o.Field,{id:"phoneNumber",name:"phoneNumber",autocomplete:"off",type:"tel",format:"0[0-9]{9}",class:"peer w-full outline-none h-8",validateOnInput:!0}),e("label",{for:"phoneNumber",class:n([{"h-1/2 -translate-y-full pl-0":!!a.phoneNumber,"text-accent":!!t.phoneNumber,"text-primary":!!a.phoneNumber&&!t.phoneNumber},"transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])},[G,t.phoneNumber?(i(),r(o.Tooltip,{key:0},{default:c(()=>[l(m(t.phoneNumber),1)]),_:2},1024)):u("",!0)],2),e("div",{class:n([{"border-accent":!!t.phoneNumber,"border-primary":!!a.phoneNumber&&!t.phoneNumber,"border-gray-500":!a.phoneNumber},"absolute bottom-0 w-full border-b"])},null,2)])]),e("div",H,[e("div",K,[s(o.Field,{id:"firstName",name:"firstName",autocomplete:"off",type:"text",format:"0[0-9]{9}",class:"peer w-full outline-none h-8",validateOnInput:!0}),e("label",{for:"firstName",class:n([{"h-1/2 -translate-y-full pl-0":!!a.firstName,"text-accent":!!t.firstName,"text-primary":!!a.firstName&&!t.firstName},"transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])},[L,t.firstName?(i(),r(o.Tooltip,{key:0},{default:c(()=>[l(m(t.firstName),1)]),_:2},1024)):u("",!0)],2),e("div",{class:n([{"border-accent":!!t.firstName,"border-primary":!!a.firstName&&!t.firstName,"border-gray-500":!a.firstName},"absolute bottom-0 w-full border-b"])},null,2)])]),e("div",Q,[e("div",W,[s(o.Field,{id:"lastName",name:"lastName",autocomplete:"off",type:"text",format:"0[0-9]{9}",class:"peer w-full outline-none h-8",validateOnInput:!0}),e("label",{for:"lastName",class:n([{"h-1/2 -translate-y-full pl-0":!!a.lastName,"text-accent":!!t.lastName,"text-primary":!!a.lastName&&!t.lastName},"transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])},[X,t.lastName?(i(),r(o.Tooltip,{key:0},{default:c(()=>[l(m(t.lastName),1)]),_:2},1024)):u("",!0)],2),e("div",{class:n([{"border-accent":!!t.lastName,"border-primary":!!a.lastName&&!t.lastName,"border-gray-500":!a.lastName},"absolute bottom-0 w-full border-b"])},null,2)])]),e("div",Y,[e("div",Z,[s(o.Field,{id:"subject",name:"subject",autocomplete:"off",type:"text",format:"0[0-9]{9}",class:"peer w-full outline-none h-8",validateOnInput:!0}),e("label",{for:"subject",class:n([{"h-1/2 -translate-y-full pl-0":!!a.subject,"text-accent":!!t.subject,"text-primary":!!a.subject&&!t.subject},"transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full"])},[$,t.subject?(i(),r(o.Tooltip,{key:0},{default:c(()=>[l(m(t.subject),1)]),_:2},1024)):u("",!0)],2),e("div",{class:n([{"border-accent":!!t.subject,"border-primary":!!a.subject&&!t.subject,"border-gray-500":!a.subject},"absolute bottom-0 w-full border-b"])},null,2)])]),e("div",tt,[e("div",et,[e("label",{for:"content",class:n(["w-fit self-center",{"text-accent":!!t.content,"text-primary":!!a.content&&!t.content}])},"Message",2),t.content?(i(),r(o.Tooltip,{key:0},{default:c(()=>[l(m(t.content),1)]),_:2},1024)):u("",!0)]),s(o.Field,{as:"textarea",autocomplete:"off",rows:"10",id:"content",name:"content",type:"textarea",format:"0[0-9]{9}",class:n(["w-full w-full border p-2 outline-none",{"border-accent":!!t.content,"border-primary":!!a.content&&!t.content,"border-gray-500":!a.content}])},null,8,["class"])]),at,ot]),_:1})])}var mt=N(O,[["render",lt]]);export{mt as default};
