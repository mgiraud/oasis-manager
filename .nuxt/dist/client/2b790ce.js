(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{682:function(e,t,l){var content=l(733);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(16).default)("7e42a463",content,!0,{sourceMap:!1})},732:function(e,t,l){"use strict";l(682)},733:function(e,t,l){var o=l(15)(!1);o.push([e.i,"ul.contact-informations[data-v-15383847]{list-style-type:none}.content-textarea[data-v-15383847]{width:100%;padding:10px;min-height:200px;border-top-left-radius:6px;border-top-right-radius:6px}",""]),e.exports=o},775:function(e,t,l){"use strict";l.r(t);l(35);var o=l(11),r=l(19),n=l(18),c=l(7),m=l(14),v=(l(5),l(681)),d=l(20),f=l(679),y=l(566),_=l(562),x=l(656);function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var l,o=Object(c.a)(e);if(t){var r=Object(c.a)(this).constructor;l=Reflect.construct(o,arguments,r)}else l=o.apply(this,arguments);return Object(n.a)(this,l)}}var k=function(e,t,l,desc){var o,r=arguments.length,n=r<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,l):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,l,desc);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(n=(r<3?o(n):r>3?o(t,l,n):o(t,l))||n);return r>3&&n&&Object.defineProperty(t,l,n),n},w=Object(d.namespace)("survey_join"),j=function(e){Object(r.a)(l,e);var t=h(l);function l(){return Object(o.a)(this,l),t.apply(this,arguments)}return l}(Object(d.mixins)(f.a));k([w.State("isLoading")],j.prototype,"isLoading",void 0),k([w.Getter("find")],j.prototype,"find",void 0),k([w.Action("load")],j.prototype,"retrieve",void 0);var $=j=k([Object(d.Component)({components:{Loading:y.a,Toolbar:_.a,ContactForm:x.a,VuetifyDraggableTreeview:v.a},servicePrefix:"admin-survey-join",resourcePrefix:"/api/survey_joins/",middleware:"hasPermissions",meta:{permissions:["USER_CAN_VIEW_SURVEY_JOIN"]}})],j),N=(l(732),l(31)),V=l(40),C=l.n(V),O=l(674),D=l(551),R=l(557),E=l(538),P=l(198),A=l(553),Q=l(537),T=l(655),component=Object(N.a)($,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("v-container",{attrs:{fluid:""}},[e.item?l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("v-container",[l("v-row",[l("v-col",[l("ul",{staticClass:"contact-informations"},[l("h3",[e._v("Informations du contact")]),e._v(" "),l("li",[l("v-icon",[e._v("ri-mail-line")]),e._v(" "+e._s(e.item.email))],1),e._v(" "),l("li",[l("v-icon",[e._v("ri-phone-line")]),e._v(" "+e._s(e.item.phoneNumber||"Non précisé"))],1),e._v(" "),l("li",[e._v("Prénom : "+e._s(e.item.firstName||"Non précisé"))]),e._v(" "),l("li",[e._v("Nom : "+e._s(e.item.lastName||"Non précisé"))]),e._v(" "),l("li",[e._v("Ville : "+e._s(e.item.city||"Non précisé"))])])])],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12",md:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Comment nous as-tu connu ?"},model:{value:e.item.origin,callback:function(t){e.$set(e.item,"origin",t)},expression:"item.origin"}})],1),e._v(" "),l("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[l("v-checkbox",{attrs:{readonly:"",label:"En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association « les Transalpins » ne faisant pas partie du bureau","hide-details":""},model:{value:e.item.acceptance,callback:function(t){e.$set(e.item,"acceptance",t)},expression:"item.acceptance"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("label",{staticClass:"v-label"},[e._v("De combien de personnes est composé ton foyer, prénom et âge des membres du foyer ?")])]),e._v(" "),e.item.family.length>0?l("v-col",{attrs:{cols:"12",md:"6"}},[l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Prénom"},model:{value:e.item.family[0].firstName,callback:function(t){e.$set(e.item.family[0],"firstName",t)},expression:"item.family[0].firstName"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Age"},model:{value:e.item.family[0].age,callback:function(t){e.$set(e.item.family[0],"age",e._n(t))},expression:"item.family[0].age"}})],1)],1)],1):e._e(),e._v(" "),e.item.family.length>1?l("v-col",{attrs:{cols:"12",md:"6"}},[l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Prénom"},model:{value:e.item.family[1].firstName,callback:function(t){e.$set(e.item.family[1],"firstName",t)},expression:"item.family[1].firstName"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Age"},model:{value:e.item.family[1].age,callback:function(t){e.$set(e.item.family[1],"age",e._n(t))},expression:"item.family[1].age"}})],1)],1)],1):e._e(),e._v(" "),e.item.family.length>2?l("v-col",{attrs:{cols:"12",md:"6"}},[l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Prénom"},model:{value:e.item.family[2].firstName,callback:function(t){e.$set(e.item.family[2],"firstName",t)},expression:"item.family[2].firstName"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Age"},model:{value:e.item.family[2].age,callback:function(t){e.$set(e.item.family[2],"age",e._n(t))},expression:"item.family[2].age"}})],1)],1)],1):e._e(),e._v(" "),e.item.family.length>3?l("v-col",{attrs:{cols:"12",md:"6"}},[l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Prénom"},model:{value:e.item.family[3].firstName,callback:function(t){e.$set(e.item.family[3],"firstName",t)},expression:"item.family[3].firstName"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{readonly:"",label:"Age"},model:{value:e.item.family[3].age,callback:function(t){e.$set(e.item.family[3],"age",e._n(t))},expression:"item.family[3].age"}})],1)],1)],1):e._e()],1),e._v(" "),l("v-divider",{staticClass:"mb-5 mt-4"}),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("h2",[e._v("Quelle est ma raison d'être ? Quelles sont mes motivations pour rejoindre ce projet ?")])])],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("p",{staticClass:"v-label"},[e._v("\n              Dans les termes ci-dessous, quels sont ceux, quelques-uns qui définiraient le mieux ta motivation initiale à créer une oasis ? Les classer par ordre d’importance, le plus important en premier. (Utilise le cliquer-glisser)\n            ")]),e._v(" "),l("vuetify-draggable-treeview",{attrs:{"item-disabled":"locked"},model:{value:e.item.motivationsRaw,callback:function(t){e.$set(e.item,"motivationsRaw",t)},expression:"item.motivationsRaw"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("v-textarea",{attrs:{readonly:"",label:"Qu'est-ce qui te motive à créer ou à t'engager dans un projet d'Oasis ?",hint:"Tu peux développer à loisir ta réponse."},model:{value:e.item.motivationsFreeThinking,callback:function(t){e.$set(e.item,"motivationsFreeThinking",t)},expression:"item.motivationsFreeThinking"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("p",{staticClass:"v-label"},[e._v("\n              Quelles sont les valeurs essentielles que tu aimerais vivre : les valeurs non négociables, c-a-d dont l'absence ferait pour toi perdre son sens au projet et ta motivation à y participer ?\n            ")])])],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Valeurs humaines"},model:{value:e.item.coreValuesHuman,callback:function(t){e.$set(e.item,"coreValuesHuman",t)},expression:"item.coreValuesHuman"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Valeurs autres"},model:{value:e.item.coreValuesOther,callback:function(t){e.$set(e.item,"coreValuesOther",t)},expression:"item.coreValuesOther"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Qu’est-ce qui t'attire dans le projet des transalpins ?"},model:{value:e.item.affinity,callback:function(t){e.$set(e.item,"affinity",t)},expression:"item.affinity"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Qu’est-ce qui te questionne dans ce projet ?"},model:{value:e.item.questioning,callback:function(t){e.$set(e.item,"questioning",t)},expression:"item.questioning"}})],1)],1),e._v(" "),l("v-divider",{staticClass:"mb-5 mt-4"}),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("h2",[e._v("Suis-je prêt.e à m'investir dans ce projet ?")])])],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("v-textarea",{attrs:{readonly:"",label:"Qu'est tu prêt.e à lui apporter ?",hint:"(En plus de ce que tu peux apporter dans la vie quotidienne, développez ici des projets professionnels/rémunérateurs ou autre que tu souhaiterais mettre en place en marge de l'oasis et un exemple de fonctionnement)."},model:{value:e.item.bring,callback:function(t){e.$set(e.item,"bring",t)},expression:"item.bring"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"En tant qu’habitant.e, es-tu prêt.e à investir financièrement ?"},model:{value:e.item.investment,callback:function(t){e.$set(e.item,"investment",t)},expression:"item.investment"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Es-tu prêt.e à payer un loyer ?"},model:{value:e.item.rent,callback:function(t){e.$set(e.item,"rent",t)},expression:"item.rent"}})],1)],1),e._v(" "),l("v-divider",{staticClass:"mb-5 mt-4"}),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("h2",[e._v("Ma vie au quotidien")])])],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("p",{staticClass:"v-label"},[e._v("\n              Des questions encore plus concrètes : A quoi ressemblera ma vie quand je vivrai là ?\n            ")])])],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Décris une journée type"},model:{value:e.item.typicalDay,callback:function(t){e.$set(e.item,"typicalDay",t)},expression:"item.typicalDay"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Décris ton habitation"},model:{value:e.item.dwelling,callback:function(t){e.$set(e.item,"dwelling",t)},expression:"item.dwelling"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Décrire les espaces communs",hint:"(Dans le cahier des charges nous avons déjà déterminé des espaces communs indispensables page 3, libre à toi d'en proposer d'autres)"},model:{value:e.item.commonAreas,callback:function(t){e.$set(e.item,"commonAreas",t)},expression:"item.commonAreas"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Décrire les relations au sein de l'oasis",hint:"(Nous souhaitons baser notre modèle de gouvernance sur la sociocratie avec des ajustements que nous ferons au fil des expérience)"},model:{value:e.item.relationship,callback:function(t){e.$set(e.item,"relationship",t)},expression:"item.relationship"}})],1)],1),e._v(" "),l("v-divider",{staticClass:"mb-5 mt-4"}),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("h2",[e._v("Mes savoir-faire et savoir-être")])])],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Connais-tu la CNV ? Si oui quelle est ton expérience ?"},model:{value:e.item.cnvExperience,callback:function(t){e.$set(e.item,"cnvExperience",t)},expression:"item.cnvExperience"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Connais-tu la gouvernance partagée si oui quelle est ton expérience ?"},model:{value:e.item.sharedGovernance,callback:function(t){e.$set(e.item,"sharedGovernance",t)},expression:"item.sharedGovernance"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Quels sont tes savoir-faire/être que tu peux amener au projet"},model:{value:e.item.skills,callback:function(t){e.$set(e.item,"skills",t)},expression:"item.skills"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Quelles sont test limites ?"},model:{value:e.item.limits,callback:function(t){e.$set(e.item,"limits",t)},expression:"item.limits"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("v-textarea",{attrs:{readonly:"",label:"Quelles sont test disponibilités durant la période de montage du projet ? Et tes disponibilités en semaine ?"},model:{value:e.item.availability,callback:function(t){e.$set(e.item,"availability",t)},expression:"item.availability"}})],1)],1),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Serais-tu disposé.e à rencontrer des élus locaux, des banquiers, architectes… ?"},model:{value:e.item.meet,callback:function(t){e.$set(e.item,"meet",t)},expression:"item.meet"}})],1),e._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-textarea",{attrs:{readonly:"",label:"Dans quel domaine utile au projet serais-tu prêt.e à te former ?"},model:{value:e.item.skillUp,callback:function(t){e.$set(e.item,"skillUp",t)},expression:"item.skillUp"}})],1)],1)],1)],1)],1):e._e(),e._v(" "),l("v-row",[l("v-col",{attrs:{cols:"12"}},[l("Toolbar",{attrs:{"handle-back":e.back}})],1)],1),e._v(" "),l("Loading",{attrs:{visible:e.isLoading}})],1)}),[],!1,null,"15383847",null);t.default=component.exports;C()(component,{VCheckbox:O.a,VCol:D.a,VContainer:R.a,VDivider:E.a,VIcon:P.a,VRow:A.a,VTextField:Q.a,VTextarea:T.a})}}]);