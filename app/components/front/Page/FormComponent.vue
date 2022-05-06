<template>
  <FormKit
    type="form"
    v-model="page"
    @submit="props.submitHandler"
  >
    <FormKit
      name="title"
      type="text"
      label="Title"
      validation="required"
    />
    <FormKit
      name="url"
      type="text"
      label="Url"
      validation="required"
    />
    <FormKit
      name="isPublished"
      type="checkbox"
      label="Publier"
    />
    <FormKit
      name="showInMenu"
      type="checkbox"
      label="Afficher dans le menu"
    />

    <FormKit
      type="select"
      label="Catégorie"
      name="category"
      :options="categories"
    />

    <FormKit
      type="select"
      label="Gallerie"
      name="mediaNode"
      :options="mediaNodes"
    />


    <ClientOnly>
      <Editor
        v-if="page.content !== undefined"
        ref="editor"
        v-model="page.content"
        class="bg-white"
      >
      </Editor>
    </ClientOnly>
  </FormKit>
</template>

<script setup lang="ts">
import { useMediaNodeStore } from '~/store/media-node'
import { Page } from '~/store/page'
import Editor from '~/components/util/Editor.vue'
import { usePageCategoryStore } from '~/store/page-category'

const props = defineProps<{
  page: Page,
  submitHandler: Function
}>()
const pageCategoryStore = usePageCategoryStore()
const mediaNodeStore = useMediaNodeStore()
await useAsyncData('page-category-items', () => pageCategoryStore.fetchSelectItems())
await useAsyncData('media-node-items', () => mediaNodeStore.fetchSelectItems())
const categories = pageCategoryStore.selectItemList()
const mediaNodes = mediaNodeStore.selectItemList()
</script>
