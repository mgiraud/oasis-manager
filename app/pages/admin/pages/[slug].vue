<template>
  <div class="flex flex-col flex-auto p-3">
    <h1 class="mb-4">Édition d'une page</h1>
    <FormComponent v-model:page="pageEdition" :submit-handler="submit" v-if="pageEdition" :errors="pageStore[CRUD_MODE.EDITION].violations"/>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import FormComponent from '~/components/front/Page/FormComponent.vue'
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
const pageEdition: Ref<Page | null> = useState('page-edition', () => null)
const pageLogStore = usePageLogStore()

await useAsyncData('async-page-edition', async () => {
  await pageStore.load(route.params.slug as string, {
    'groups[]': 'page:read:edition'
  })
  pageEdition.value = pageStore[CRUD_MODE.EDITION].retrieved
});

const notificationStore = useNotificationStore();
const submit = async (data: Page, actions) => {
  if (data.isPublished === 'true') {
    data.isPublished = false
  }
  if (data.showInMenu === 'true') {
    data.showInMenu = false
  }
  try {
    await pageStore.update(data.url, data)
    notificationStore.showMessage('Page correctement éditée')
  } catch (e) {
    notificationStore.showError('Erreur dans la sauvegarde la page, vérifie le formulaire')
    actions.setErrors(pageStore[CRUD_MODE.Edition].violations)
  }
}

let autoSaveInterval: number | null = null

const autoSave = () => {
  pageLogStore.create({
    originalContent: pageEdition.value?.content,
    draft: true,
    page: pageEdition.value?.['@id']
  })
}

onMounted(() => {
  if (process.client) {
    autoSaveInterval = window.setInterval(autoSave, 120000)
  }
})

onBeforeUnmount(() => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
  }
  autoSaveInterval = null
})
</script>
