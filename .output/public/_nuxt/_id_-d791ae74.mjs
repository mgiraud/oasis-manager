import{_ as v,d as x,ao as p,u as h,p as j,q as E,j as f,o as l,c,k as s,t as i,F as y,l as w,C as q}from"./entry-7a7af91b.mjs";import{u as g}from"./asyncData-189d8b04.mjs";const b=x({async setup(_,{expose:r}){r();let n,e;const t=p(),a=h(),o=j("join-view",()=>null);[n,e]=E(async()=>g("async-page-edition",async()=>{await t.load(a.params.id,{"groups[]":"blog_article:read:edition"}),o.value=t[q.EDITION].retrieved})),await n,e();const u=f(()=>o.value.family.filter(m=>!!m.firstName)),d={joinStore:t,route:a,join:o,family:u};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}}),A={class:"flex flex-col flex-auto p-3"},S=s("h2",{class:"w-full py-3"},"J'en dis un peu sur moi :",-1),N={class:"flex py-3"},Q={class:"w-1/2"},D={class:"w-1/2"},C={class:"flex py-3"},V={class:"w-1/2"},k={class:"w-1/2"},J={class:"flex py-3"},O={class:"w-1/2"},B={class:"w-1/2"},F=s("div",{class:"py-3"},[s("p",null,"De combien de personnes est compos\xE9 ton foyer, pr\xE9nom et \xE2ge des membres du foyer ?")],-1),M={class:"flex flex-col py-3"},I=s("h2",{class:"w-full py-3"}," Quelle est ma raison d'\xEAtre ? Quelles sont mes motivations pour rejoindre ce projet ? ",-1),P={class:"py-3"},R=s("div",{class:"w-full py-3"}," Quelles sont les valeurs essentielles que j'aimerais vivre : les valeurs non n\xE9gociables, c-a-d dont l'absence me ferait perdre son sens au projet et ma motivation \xE0 y participer ? ",-1),T={class:"flex py-3"},U={class:"w-1/2"},G={class:"w-1/2"},H={class:"flex py-3"},L={class:"w-1/2"},z={class:"w-1/2"},K=s("h2",{class:"w-full py-3"}," Suis-je pr\xEAt.e \xE0 m'investir dans ce projet ? ",-1),W={class:"py-3"},X={class:"flex py-3"},Y={class:"w-1/2"},Z={class:"w-1/2"},$=s("h2",{class:"w-full py-3"},"Ma vie au quotidien",-1),ss=s("div",{class:"w-full"},"Des questions encore plus concr\xE8tes : A quoi ressemblera ma vie quand je vivrai l\xE0 ?",-1),es={class:"flex py-3"},is={class:"w-1/2"},os={class:"w-1/2"},ts={class:"flex py-3"},ns={class:"w-1/2"},as={class:"w-1/2"},ls=s("h2",{class:"w-full py-3"},"Mes savoir-faire et savoir-\xEAtre",-1),cs={class:"flex py-3"},rs={class:"w-1/2"},ds={class:"w-1/2"},_s={class:"flex py-3"},us={class:"w-1/2"},ms={class:"w-1/2"},vs={class:"py-3"},xs={class:"flex py-3"},ps={class:"w-1/2"},hs={class:"w-1/2"};function js(_,r,n,e,t,a){return l(),c("div",A,[S,s("div",N,[s("div",Q,"Email : "+i(e.join.email),1),s("div",D,"Num\xE9ro de t\xE9l\xE9phone :"+i(e.join.phoneNumber),1)]),s("div",C,[s("div",V,"Pr\xE9nom : "+i(e.join.firstName),1),s("div",k,"Nom : "+i(e.join.lastName),1)]),s("div",J,[s("div",O,"Ville actuelle : "+i(e.join.city),1),s("div",B,"Comment j'ai connu les transalpins ? : "+i(e.join.origin),1)]),F,s("div",M,[(l(!0),c(y,null,w(e.family,o=>(l(),c("div",null,i(o.firstName)+" - "+i(o.age)+" an(s)",1))),256))]),I,s("div",P," Qu'est-ce qui me motive \xE0 cr\xE9er ou \xE0 m'engager dans un projet d'Oasis ? "+i(e.join.motivationsFreeThinking),1),R,s("div",T,[s("div",U,"Valeurs humaines : "+i(e.join.coreValuesHuman),1),s("div",G,"Valeurs autres : "+i(e.join.coreValuesOther),1)]),s("div",H,[s("div",L,"Qu\u2019est-ce qui m'attire dans le projet des transalpins ? : "+i(e.join.affinity),1),s("div",z,"Qu\u2019est-ce qui me questionne dans ce projet ? : "+i(e.join.questioning),1)]),K,s("div",W," Que suis-je pr\xEAt.e \xE0 lui apporter ? : "+i(e.join.bring),1),s("div",X,[s("div",Y,"En tant qu\u2019habitant.e, suis-je pr\xEAt.e \xE0 investir financi\xE8rement ? Et combien ? : "+i(e.join.investment),1),s("div",Z,"Suis-je pr\xEAt.e \xE0 payer un loyer ? \xC0 quelle hauteur ? : "+i(e.join.rent),1)]),$,ss,s("div",es,[s("div",is,"Je d\xE9cris ma journ\xE9e type : "+i(e.join.typicalDay),1),s("div",os,"Je d\xE9cris mon habitation : "+i(e.join.dwelling),1)]),s("div",ts,[s("div",ns,"Je d\xE9cris les espaces communs : "+i(e.join.commonAreas),1),s("div",as,"Je d\xE9cris les relations au sein de l'oasis : "+i(e.join.relationship),1)]),ls,s("div",cs,[s("div",rs,"Est-ce que je connais la CNV ? Si oui quelle est mon exp\xE9rience ? : "+i(e.join.cnvExperience),1),s("div",ds,"Est-ce que je connais la gouvernance partag\xE9e ? Si oui, quelle est mon exp\xE9rience ? : "+i(e.join.sharedGovernance),1)]),s("div",_s,[s("div",us,"Quels sont les savoir-faire/\xEAtre que je peux amener au projet ? : "+i(e.join.skills),1),s("div",ms,"Quelles sont mes limites ? : "+i(e.join.limits),1)]),s("div",vs," Quelles sont mes disponibilit\xE9s durant la p\xE9riode de montage du projet ? Et mes disponibilit\xE9s en semaine ? : "+i(e.join.availability),1),s("div",xs,[s("div",ps,"Serais-je dispos\xE9.e \xE0 rencontrer des \xE9lus locaux, des banquiers, architectes\u2026 ? : "+i(e.join.meet),1),s("div",hs,"Dans quel domaine utile au projet suis-je pr\xEAt.e \xE0 me former ? : "+i(e.join.skillUp),1)])])}var ys=v(b,[["render",js]]);export{ys as default};
