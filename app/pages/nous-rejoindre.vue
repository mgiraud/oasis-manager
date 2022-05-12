<template>
  <div class="flex bg-white flex-auto flex-col py-3">
    <Title>Nous rejoindre</Title>
    <h1>
      Tu souhaites nous rejoindre ?
    </h1>
    <PageComponent v-if="page" :page="page"  />
    <div>
      <p>
        Tu peux remplir ce questionnaire en ligne ou bien <a
        href="~/assets/files/questionnaire_transalpins_v1.pdf"
        title="Télécharger le formulaire"
        target="_blank"
      >Télécharger le PDF</a> pour le remplir numériquement ou manuellement et nous
        l'envoyer à l'addresse suivante : <a
        href="mailto:contact@lestransalpins.org"
        title="Contacter les transalpins"
      >contact@lestransalpins.org</a>
      </p>
    </div>
    <FormJoin :on-submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">

import { CRUD_MODE } from '~/store/crud'
import { Join, useJoinStore } from '~/store/join'
import { useNotificationStore } from '~/store/notification'
import { usePageStore } from '~/store/page'
import PageComponent from '~/components/front/PageComponent.vue'
import FormJoin from '~/components/front/join/FormJoin.vue'

const joinStore = useJoinStore()
const pageStore = usePageStore()
const notificationStore = useNotificationStore()
const page = pageStore.find('/api/pages/nous-rejoindre')
const onSubmit = async (data: Join, actions) => {
  try {
    await joinStore.create(data)
    notificationStore.showMessage('Le questionnaire a correctement été enregistré, nous prendrons contact avec toi le plus rapidement possible')
  } catch (e) {
    notificationStore.showError('Erreur dans la formulaire, merci de corriger les champs non valides')
    actions.setErrors(joinStore[CRUD_MODE.CREATION].violations)
  }
}
</script>
