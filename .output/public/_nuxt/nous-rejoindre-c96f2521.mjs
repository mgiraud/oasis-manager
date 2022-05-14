import{_ as w,d as b,h as E,G as g,A as F,o,e as y,w as _,b as r,k as t,c as d,l as T,V as v,at as h,F as q,f as j,J as N,ao as k,a as S,s as V,r as C,g as f,C as A}from"./entry-7a7af91b.mjs";import{P as J}from"./PageComponent-7f789f1a.mjs";import{C as D}from"./CheckboxField-20f6aa23.mjs";import{T as Q}from"./TextField-e0d4bdd8.mjs";import{I as M}from"./Icon-b7f67c13.mjs";const P=b({props:{onSubmit:null},setup(x,{expose:u}){u();const n=x,e=E([{firstName:null,age:null}]),{value:i}=g("family",void 0),c=()=>{e.value.push({firstName:null,age:null})},l=()=>{e.value.length>1&&e.value.splice(e.value.length-1,1)},a={email:"required|email",phoneNumber:"required|regex:^0\\d{9}$",firstName:"required|min:3|max:60",lastName:"required|min:3|max:60",city:"required|min:1"};F(e,s=>{i.value=s},{deep:!0});const m={props:n,family:e,familyInputValue:i,addMember:c,removeMember:l,schema:a,CheckboxField:D,TextField:Q,Form:N,Icon:M};return Object.defineProperty(m,"__isScriptSetup",{enumerable:!1,value:!0}),m}}),O=t("h2",{class:"w-full py-3"},"J'en dis un peu sur moi :",-1),U=t("div",null,[t("p",null,"De combien de personnes est compos\xE9 mon foyer, pr\xE9nom et leur \xE2ge ?")],-1),B={class:"w-full flex flex-col"},I={class:"flex w-full md:w-1/2 py-2"},G=["onUpdate:modelValue"],H=["onUpdate:modelValue"],R={class:"flex flex-row"},L=t("h2",{class:"w-full py-3"},"Quelle est ma raison d'\xEAtre ? Quelles sont mes motivations pour rejoindre ce projet ?",-1),z=t("div",{class:"w-full"},[t("p",null," Quelles sont les valeurs essentielles que j'aimerais vivre : les valeurs non n\xE9gociables, c-a-d dont l'absence me ferait perdre son sens au projet et ma motivation \xE0 y participer ? ")],-1),K=t("h2",{class:"w-full py-3"},"Suis-je pr\xEAt.e \xE0 m'investir dans ce projet ?",-1),W=t("h2",{class:"w-full py-3"},"Ma vie au quotidien",-1),X=t("div",{class:"w-full"},[t("p",null," Des questions encore plus concr\xE8tes : A quoi ressemblera ma vie quand je vivrai l\xE0 ? ")],-1),Y=t("h2",{class:"w-full py-3"},"Mes savoir-faire et savoir-\xEAtre",-1),Z=t("button",{type:"submit",class:"py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark"},"Envoyer",-1);function $(x,u,n,e,i,c){return o(),y(e.Form,{onSubmit:n.onSubmit,class:"flex flex-row flex-wrap p-3","validation-schema":e.schema,"initial-values":{acceptance:!1}},{default:_(({values:l,errors:a})=>[O,r(e.TextField,{icon:"ri-mail-line",type:"email",name:"email",error:a.email,value:l.email,label:"Email",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{icon:"ri-phone-line",name:"phoneNumber",error:a.phoneNumber,value:l.phoneNumber,label:"Num\xE9ro de t\xE9l\xE9phone",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{name:"firstName",error:a.firstName,value:l.firstName,label:"Pr\xE9nom",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{name:"lastName",error:a.lastName,value:l.lastName,label:"Nom",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{name:"city",error:a.city,value:l.city,label:"Ville actuelle",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{name:"origin",error:a.origin,value:l.origin,label:"Comment j'ai connu les transalpins ?",class:"w-full md:w-1/2"},null,8,["error","value"]),U,t("div",B,[(o(!0),d(q,null,T(e.family,(m,s)=>(o(),d("div",I,[v(t("input",{type:"text","onUpdate:modelValue":p=>e.family[s].firstName=p,class:"w-1/2 border h-8",placeholder:"Pr\xE9nom"},null,8,G),[[h,e.family[s].firstName]]),v(t("input",{type:"number",min:"0",max:"99","onUpdate:modelValue":p=>e.family[s].age=p,class:"w-1/2 border h-8",placeholder:"Age"},null,8,H),[[h,e.family[s].age]])]))),256)),t("div",R,[t("div",{class:"py-1 px-2 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit cursor-pointer",onClick:e.addMember},[r(e.Icon,{icon:"ri-add-line",class:"fill-white h-8 w-8"})]),e.family.length>1?(o(),d("div",{key:0,class:"py-1 px-2 bg-secondary text-white shadow-md uppercase hover:bg-accent w-fit cursor-pointer",onClick:e.removeMember},[r(e.Icon,{icon:"ri-subtract-line",class:"fill-white h-8 w-8"})])):j("",!0)])]),r(e.CheckboxField,{name:"acceptance",error:a.acceptance,label:"En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association \xAB les Transalpins \xBB ne faisant pas partie du bureau",class:"w-full md:w-1/2"},null,8,["error"]),L,r(e.TextField,{as:"textarea",type:"textarea",name:"motivationsFreeThinking",error:a.motivationsFreeThinking,value:l.motivationsFreeThinking,label:"Qu'est-ce qui me motive \xE0 cr\xE9er ou \xE0 m'engager dans un projet d'Oasis ?",class:"w-full"},null,8,["error","value"]),z,r(e.TextField,{as:"textarea",type:"textarea",name:"coreValuesHuman",error:a.coreValuesHuman,value:l.coreValuesHuman,label:"Valeurs humaines",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"coreValuesOther",error:a.coreValuesOther,value:l.coreValuesOther,label:"Valeurs autres",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"affinity",error:a.affinity,value:l.affinity,label:"Qu\u2019est-ce qui m'attire dans le projet des transalpins ?",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"questioning",error:a.questioning,value:l.questioning,label:"Qu\u2019est-ce qui me questionne dans ce projet ?",class:"w-full md:w-1/2"},null,8,["error","value"]),K,r(e.TextField,{as:"textarea",type:"textarea",name:"bring",error:a.bring,value:l.bring,label:"Que suis-je pr\xEAt.e \xE0 lui apporter ?",class:"w-full"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"investment",error:a.investment,value:l.investment,label:"En tant qu\u2019habitant.e, suis-je pr\xEAt.e \xE0 investir financi\xE8rement ? Et combien ?",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"rent",error:a.rent,value:l.rent,label:"Suis-je pr\xEAt.e \xE0 payer un loyer ? \xC0 quelle hauteur ?",class:"w-full md:w-1/2"},null,8,["error","value"]),W,X,r(e.TextField,{as:"textarea",type:"textarea",name:"typicalDay",error:a.typicalDay,value:l.typicalDay,label:"Je d\xE9cris ma journ\xE9e type",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"dwelling",error:a.dwelling,value:l.dwelling,label:"Je d\xE9cris mon habitation",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"commonAreas",error:a.commonAreas,value:l.commonAreas,label:"Je d\xE9cris les espaces communs",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"relationship",error:a.relationship,value:l.relationship,label:"Je d\xE9cris les relations au sein de l'oasis",class:"w-full md:w-1/2"},null,8,["error","value"]),Y,r(e.TextField,{as:"textarea",type:"textarea",name:"cnvExperience",error:a.cnvExperience,value:l.cnvExperience,label:"Est-ce que je connais la CNV ? Si oui quelle est mon exp\xE9rience ?",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"sharedGovernance",error:a.sharedGovernance,value:l.sharedGovernance,label:"Est-ce que je connais la gouvernance partag\xE9e ? Si oui, quelle est mon exp\xE9rience ?",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"skills",error:a.skills,value:l.skills,label:"Quels sont les savoir-faire/\xEAtre que je peux amener au projet",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"limits",error:a.limits,value:l.limits,label:"Quelles sont mes limites ?",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"availability",error:a.availability,value:l.availability,label:"Quelles sont mes disponibilit\xE9s durant la p\xE9riode de montage du projet ? Et mes disponibilit\xE9s en semaine ?",class:"w-full"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"meet",error:a.meet,value:l.meet,label:"Serais-je dispos\xE9.e \xE0 rencontrer des \xE9lus locaux, des banquiers, architectes\u2026 ?",class:"w-full md:w-1/2"},null,8,["error","value"]),r(e.TextField,{as:"textarea",type:"textarea",name:"skillUp",error:a.skillUp,value:l.skillUp,label:"Dans quel domaine utile au projet suis-je pr\xEAt.e \xE0 me former ?",class:"w-full md:w-1/2"},null,8,["error","value"]),Z]),_:1},8,["onSubmit"])}var ee=w(P,[["render",$]]);const ae=b({setup(x,{expose:u}){u();const n=k(),e=S(),i=V(),c=e.find("/api/pages/nous-rejoindre"),a={joinStore:n,pageStore:e,notificationStore:i,page:c,onSubmit:async(m,s)=>{try{await n.create(m),i.showMessage("Le questionnaire a correctement \xE9t\xE9 enregistr\xE9, nous prendrons contact avec toi le plus rapidement possible")}catch{i.showError("Erreur dans la formulaire, merci de corriger les champs non valides"),s.setErrors(n[A.CREATION].violations)}},PageComponent:J,FormJoin:ee};return Object.defineProperty(a,"__isScriptSetup",{enumerable:!1,value:!0}),a}}),le={class:"flex bg-white flex-auto flex-col py-3"},re=f("Nous rejoindre"),te={key:1,class:"px-3"},ne=t("div",{class:"py-4 px-3"},[t("p",null,[f(" Je peux remplir ce questionnaire en ligne ou bien "),t("a",{href:"/files/questionnaire_transalpins_v1.pdf",title:"T\xE9l\xE9charger le formulaire",target:"_blank",class:"text-primary text-underline"},"T\xE9l\xE9charger le PDF"),f(" pour le remplir num\xE9riquement ou manuellement et l'envoyer eux transalpins \xE0 l'addresse suivante : "),t("a",{href:"mailto:contact@lestransalpins.org",title:"Contacter les transalpins"},"contact@lestransalpins.org")])],-1);function ie(x,u,n,e,i,c){const l=C("Title");return o(),d("div",le,[r(l,null,{default:_(()=>[re]),_:1}),e.page?(o(),y(e.PageComponent,{key:0,page:e.page},null,8,["page"])):(o(),d("h1",te,"J'ai envie de vous rejoindre !")),ne,r(e.FormJoin,{"on-submit":e.onSubmit})])}var de=w(ae,[["render",ie]]);export{de as default};
