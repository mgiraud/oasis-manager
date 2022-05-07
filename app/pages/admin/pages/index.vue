<template>
  <div class="flex flex-col flex-auto p-3">
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9" v-for="page in data">
      <div class="w-full md:w-1/5 flex-1 md:pl-2">{{ page.title }}</div>
      <div class="w-full md:w-1/6 flex-initial">{{ page.createdBy }}</div>
      <div class="w-full md:w-1/5 flex-1">{{ page.category ? page.category.name : 'N/A' }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ page.isPublished }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ page.showInMenu }}</div>
      <div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch">
        <div class="bg-primary flex-auto flex items-stretch justify-center">
          <NuxtLink :to="{name: 'admin-pages-slug', params: {slug: page.url}}" class="w-full flex items-center justify-center">
              <Icon icon="ri-edit-line" class="fill-white w-4 h-4"/>
          </NuxtLink>
        </div>
        <div class="bg-accent flex-auto flex items-stretch justify-center">
          <div @click="" class="w-full flex items-center justify-center cursor-pointer">
              <Icon icon="ri-delete-bin-line" class="fill-white w-4 h-4"/>
          </div>
        </div>
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
