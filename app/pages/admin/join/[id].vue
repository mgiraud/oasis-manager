<template>
  <div class="flex flex-col flex-auto p-3">
    <h2 class="w-full py-3">J'en dis un peu sur moi :</h2>
    <div class="flex py-3">
      <div class="w-1/2">Email : {{join.email}}</div>
      <div class="w-1/2">Numéro de téléphone :{{join.phoneNumber}}</div>
    </div>
    <div class="flex py-3">
      <div class="w-1/2">Prénom : {{join.firstName}}</div>
      <div class="w-1/2">Nom : {{join.lastName}}</div>
    </div>
    <div class="flex py-3">
      <div class="w-1/2">Ville actuelle : {{join.city}}</div>
      <div class="w-1/2">Comment j'ai connu les transalpins ? : {{join.origin}}</div>
    </div>
    <div class="py-3">
      <p>De combien de personnes est composé ton foyer, prénom et âge des membres du foyer ?</p>
    </div>
    <div class="flex flex-col py-3">
      <div v-for="member in family">{{member.firstName}} - {{ member.age }} an(s)</div>
    </div>
    <h2 class="w-full py-3">
      Quelle est ma raison d'être ? Quelles sont mes motivations pour rejoindre ce projet ?
    </h2>
    <div class="py-3">
      Qu'est-ce qui me motive à créer ou à m'engager dans un projet d'Oasis ?
      {{join.motivationsFreeThinking}}
    </div>
    <div class="w-full py-3">
        Quelles sont les valeurs essentielles que j'aimerais vivre : les valeurs non
        négociables, c-a-d dont l'absence me ferait perdre son sens au projet et ma
        motivation à y participer ?
    </div>
    <div class="flex py-3">
      <div class="w-1/2">Valeurs humaines : {{join.coreValuesHuman}}</div>
      <div class="w-1/2">Valeurs autres : {{join.coreValuesOther}}</div>
    </div>
    <div class="flex py-3">
      <div class="w-1/2">Qu’est-ce qui m'attire dans le projet des transalpins ? : {{join.affinity}}</div>
      <div class="w-1/2">Qu’est-ce qui me questionne dans ce projet ? : {{join.questioning}}</div>
    </div>
    <h2 class="w-full py-3">
      Suis-je prêt.e à m'investir dans ce projet ?
    </h2>
    <div class="py-3">
      Que suis-je prêt.e à lui apporter ? : {{join.bring}}
    </div>
    <div class="flex py-3">
      <div class="w-1/2">En tant qu’habitant.e, suis-je prêt.e à investir financièrement ? Et combien ? : {{join.investment}}</div>
      <div class="w-1/2">Suis-je prêt.e à payer un loyer ? À quelle hauteur ? : {{join.rent}}</div>
    </div>

    <h2 class="w-full py-3">Ma vie au quotidien</h2>
    <div class="w-full">Des questions encore plus concrètes : A quoi ressemblera ma vie quand je vivrai là ?</div>
    <div class="flex py-3">
      <div class="w-1/2">Je décris ma journée type : {{join.typicalDay}}</div>
      <div class="w-1/2">Je décris mon habitation : {{join.dwelling}}</div>
    </div>
    <div class="flex py-3">
      <div class="w-1/2">Je décris les espaces communs : {{join.commonAreas}}</div>
      <div class="w-1/2">Je décris les relations au sein de l'oasis : {{join.relationship}}</div>
    </div>

    <h2 class="w-full py-3">Mes savoir-faire et savoir-être</h2>
    <div class="flex py-3">
      <div class="w-1/2">Est-ce que je connais la CNV ? Si oui quelle est mon expérience ? : {{join.cnvExperience}}</div>
      <div class="w-1/2">Est-ce que je connais la gouvernance partagée ? Si oui, quelle est mon expérience ? : {{join.sharedGovernance}}</div>
    </div>
    <div class="flex py-3">
      <div class="w-1/2">Quels sont les savoir-faire/être que je peux amener au projet ? : {{join.skills}}</div>
      <div class="w-1/2">Quelles sont mes limites ? : {{join.limits}}</div>
    </div>
    <div class="py-3">
      Quelles sont mes disponibilités durant la période de montage du projet ? Et mes disponibilités en semaine ? : {{join.availability}}
    </div>
    <div class="flex py-3">
      <div class="w-1/2">Serais-je disposé.e à rencontrer des élus locaux, des banquiers, architectes… ? : {{join.meet}}</div>
      <div class="w-1/2">Dans quel domaine utile au projet suis-je prêt.e à me former ? : {{join.skillUp}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { useDateHelper } from '~/composables/useDateHelper'
import { BlogArticle } from '~/store/blog-article'
import { CRUD_MODE } from '~/store/crud'
import { useJoinStore } from '~/store/join'

definePageMeta({
  layout: 'admin'
})

const { formatDate } = useDateHelper()
const joinStore = useJoinStore()
const route = useRoute()
const join: Ref<BlogArticle | null> = useState('join-view', () => null)

await useAsyncData('async-page-edition', async () => {
  await joinStore.load(route.params.id, {
    'groups[]': 'blog_article:read:edition'
  })
  join.value = joinStore[CRUD_MODE.EDITION].retrieved
});

const family = computed(() => {
  return join.value.family.filter((member) => !!member.firstName)
})
</script>
