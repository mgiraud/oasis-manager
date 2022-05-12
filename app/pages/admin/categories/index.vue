<template>
  <div class="flex flex-col flex-auto p-3">
    <NuxtLink :to="{name: 'admin-categories-add'}" class="py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center">
      <Icon icon="ri-add-line" class="fill-white w-8 h-8"></Icon>
      <div class="pl-2">Créer une catégorie</div>
    </NuxtLink>
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9" v-for="category in data">
      <div class="w-full md:w-1/5 flex-1">{{ category.name }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ category.isPublished }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ category.showInMenu }}</div>
      <div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch">
        <div class="bg-primary flex-auto flex items-stretch justify-center">
          <NuxtLink :to="{name: 'admin-categories-slug', params: {slug: category.slug}}" class="w-full flex items-center justify-center">
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
import Icon from '~/components/util/Icon.vue'
import { usePageCategoryStore } from '~/store/page-category'

definePageMeta({
  layout: 'admin'
})

const pageCategoryStore = usePageCategoryStore()
const route = useRoute()
const { data } = await useAsyncData('page-category-list', async () => {
  await pageCategoryStore.fetchAll()
  return pageCategoryStore.list
});
</script>
