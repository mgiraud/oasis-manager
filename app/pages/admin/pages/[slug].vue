<template>
  <div class="flex flex-col flex-auto p-3">
    <h1>Édition d'une page</h1>
    <FormComponent v-model:page="pageEdition" :submit-handler="submit" v-if="pageEdition" :errors="pageStore[CRUD_MODE.EDITION].violations"/>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import FormComponent from '~/components/front/Page/FormComponent.vue'
import { CRUD_MODE } from '~/store/crud'
import { useNotificationStore } from '~/store/notification'
import { Page, usePageStore } from '~/store/page'

definePageMeta({
  layout: 'admin'
})

const pageStore = usePageStore()
const route = useRoute()
const app = useNuxtApp()
const pageEdition: Ref<Page | null> = useState('page-edition', () => null)
await useAsyncData('async-page-edition', async () => {
  await pageStore.load(route.params.slug as string, {
    'groups[]': 'page:read:edition'
  })
  pageEdition.value = pageStore[CRUD_MODE.EDITION].retrieved
});

const notificationStore = useNotificationStore();
const submit = async (data: Page) => {
  try {
    await pageStore.update(data.url, data)
    notificationStore.showMessage('success', 'Page correctement éditée')
  } catch (e) {
    notificationStore.showError('Erreur dans la sauvegarde la page, vérifie le formulaire')
  }
}

</script>
