<template>
  <div>
    <p>{{ $route.params.slug }}</p>
    <FormComponent :page="{...data}"/>
  </div>
</template>

<script setup lang="ts">
import FormComponent from '~/components/front/Page/FormComponent.vue'
import { CRUD_MODE } from '~/store/crud'
import { usePageStore } from '~/store/page'

const pageStore = usePageStore()
const route = useRoute()
const { data } = await useAsyncData('retrieved', async () => {
  await pageStore.load(route.params.slug as string)
  return pageStore[CRUD_MODE.EDITION].retrieved
});

</script>
