<template>
  <div class="flex flex-col flex-auto p-3">
    <h1>Édition d'une page</h1>
    <FormComponent :page="{...data}" :submit-handler="submit"/>
  </div>
</template>

<script setup lang="ts">
import FormComponent from '~/components/front/Page/FormComponent.vue'
import { CRUD_MODE } from '~/store/crud'
import { Page, usePageStore } from '~/store/page'

definePageMeta({
  layout: 'admin'
})

const pageStore = usePageStore()
const route = useRoute()
const { data } = await useAsyncData('page-update', async () => {
  await pageStore.load(route.params.slug as string, {
    'groups[]': 'page:read:edition'
  })
  return pageStore[CRUD_MODE.EDITION].retrieved
});
const submit = async (data: Page) => {
  const res = await pageStore.update(data.url, data)
}
</script>
