<template>
  <div class="flex flex-col flex-auto p-3">
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-primary hover:text-white" v-for="page in data">
      <div class="w-full md:w-1/5 flex-1">{{ page.title }}</div>
      <div class="w-full md:w-1/6 flex-initial">{{ page.createdBy }}</div>
      <div class="w-full md:w-1/5 flex-1">{{ page.category ? page.category.name : 'N/A' }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ page.isPublished }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ page.showInMenu }}</div>
      <div class="w-full md:w-1/12 flex-initial justify-self-end">
        <NuxtLink :to="{name: 'admin-pages-slug', params: {slug: page.url}}">
          <button class="bg-primary p-3">
            <Icon icon="ri-edit-line" class="fill-white w-4 h-4"/>
          </button>
        </NuxtLink>
        <NuxtLink as="button" @click="">
          <button class="bg-accent p-3">
            <Icon icon="ri-delete-bin-line" class="fill-white w-4 h-4"/>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormComponent from '~/components/front/Page/FormComponent.vue'
import { CRUD_MODE } from '~/store/crud'
import { Page, usePageStore } from '~/store/page'
import Icon from '~/components/util/Icon.vue'

definePageMeta({
  layout: 'admin'
})

const pageStore = usePageStore()
const route = useRoute()
const { data } = await useAsyncData('page-update', async () => {
  await pageStore.fetchAll()
  return pageStore.list
});
</script>
