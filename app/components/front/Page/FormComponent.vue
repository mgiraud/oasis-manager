<template xmlns="http://www.w3.org/1999/html">
    <FormKit
      type="form"
      v-model="page"
      @submit="props.submitHandler"
    >
  <div class="flex flex-col">
    <div class="flex items-stretch">
      <FormKit
        name="title"
        type="text"
        label="Title"
        validation="required"
        outer-class="w-full md:w-1/2"
      />
      <FormKit
        name="url"
        type="text"
        label="Url"
        validation="required"
        outer-class="w-full md:w-1/2"
      />
    </div>
    <div class="flex items-stretch">
      <FormKit
        name="isPublished"
        type="checkbox"
        label="Publier"
        outer-class="w-full md:w-1/2"
      />
      <FormKit
        name="showInMenu"
        type="checkbox"
        label="Afficher dans le menu"
        outer-class="w-full md:w-1/2"
      />
    </div>
    <div class="flex items-stretch">
      <FormKit
        type="select"
        label="Catégorie"
        name="category"
        :options="categories"
        outer-class="w-full md:w-1/2"
      />

      <FormKit
        type="select"
        label="Gallerie"
        name="mediaNode"
        :options="mediaNodes"
        outer-class="w-full md:w-1/2"
      />
    </div>

      <ClientOnly>
        <Editor
          v-if="page.content !== undefined"
          ref="editor"
          v-model="page.content"
          class="bg-white"
        >
        </Editor>
      </ClientOnly>
  </div>
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
