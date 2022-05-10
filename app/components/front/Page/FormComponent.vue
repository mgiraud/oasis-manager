<template>
    <FormKit
      type="form"
      v-model="item"
      @submit="submitHandler"
    >
      <div class="flex flex-col">
        <div class="flex items-stretch">
          <FormKit
            name="title"
            type="text"
            label="Title"
            validation=""
            outer-class="w-full md:w-1/2"
            :errors="errors ? [errors.title] : []"
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
              v-if="item.content !== undefined"
              ref="editor"
              v-model="item.content"
              class="bg-white"
            >
              <template v-slot:supplemental_btns>
                <OldVersionBtn :url="item.url" :set-content="setContent"/>
              </template>
            </Editor>
          </ClientOnly>
      </div>
    </FormKit>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import OldVersionBtn from '~/components/admin/page/OldVersionBtn.vue'
import { useMediaNodeStore } from '~/store/media-node'
import { Page } from '~/store/page'
import Editor from '~/components/util/Editor.vue'
import { usePageCategoryStore } from '~/store/page-category'
import { FormErrors } from '~/types/form'
const props = defineProps<{
  page: Page,
  submitHandler: Function,
  errors: FormErrors | null
}>()
const emit = defineEmits(['update:page']);

const item = computed({
  get() {
    return props.page
  },
  set(value) {
    emit('update:page', value)
  }
})

const pageCategoryStore = usePageCategoryStore()
const mediaNodeStore = useMediaNodeStore()
await useAsyncData('page-category-items', () => pageCategoryStore.fetchSelectItems())
await useAsyncData('media-node-items', () => mediaNodeStore.fetchSelectItems())
const categories = pageCategoryStore.selectItemList()
const mediaNodes = mediaNodeStore.selectItemList()

const editor: Ref<InstanceType<typeof Editor>> = ref(null);
const setContent = (content: string) => {
    editor.value?.setContent(content)
}
</script>
