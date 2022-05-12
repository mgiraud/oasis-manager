<template>
  <div class="flex flex-col flex-auto p-3">
    <h1 class="mb-4">Création d'une page</h1>
    <FormComponent v-model:page="pageCreation" :submit-handler="submit" :errors="pageStore[CRUD_MODE.CREATION].violations"/>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { FormActions } from 'vee-validate'
import FormComponent from '~/components/admin/page/FormComponent.vue'
import { CRUD_MODE } from '~/store/crud'
import { useNotificationStore } from '~/store/notification'
import { Page, usePageStore } from '~/store/page'
import { usePageLogStore } from '~/store/page-logs'

definePageMeta({
  layout: 'admin'
})

const pageStore = usePageStore()
const route = useRoute()
const app = useNuxtApp()
const pageCreation: Ref<Page | {}> = useState('page-creation', () => { return {
  content: ''
}})
const pageLogStore = usePageLogStore()
const notificationStore = useNotificationStore();

const submit = async (data: Page, actions: FormActions<any>) => {
  if (data.isPublished === 'true') {
    data.isPublished = false
  }
  if (data.showInMenu === 'true') {
    data.showInMenu = false
  }
  try {
    await pageStore.create(data)
    notificationStore.showMessage('Page correctement crée')
    navigateTo({ name: "admin-pages-slug", params: { slug: pageStore[CRUD_MODE.CREATION].created.url } })
  } catch (e) {
    notificationStore.showError('Erreur dans la création la page, vérifie le formulaire')
    actions.setErrors(pageStore[CRUD_MODE.CREATION].violations)
  }
}
</script>
