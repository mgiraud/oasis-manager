<template>
  <Form
    v-slot="{ values, errors }"
    @submit="submitHandler"
    class="flex flex-row flex-wrap"
    :validation-schema="schema"
    :initial-values="item"
  >
    <TextField name="title" :error="errors.title" :value="values.title" label="Titre" class="w-1/2" />
    <TextField name="url" :error="errors.url" :value="values.url" label="URL" class="w-1/2" />
    <CheckboxField name="isPublished" :error="errors.isPublished" label="Publier" class="w-1/2" />
    <CheckboxField name="showInMenu" :error="errors.showInMenu" label="Afficher dans le menu" class="w-1/2" />
    <SelectField name="category" :options="categories" :error="errors.category" :value="values.category" label="Catégorie" class="w-1/2"/>
    <SelectField name="mediaNode" :options="mediaNodes" :error="errors.mediaNode" :value="values.mediaNode" label="Gallerie" class="w-1/2"/>
    <ClientOnly>
      <Editor
        v-if="item.content !== undefined"
        name="content"
        ref="editor"
        class="bg-white w-full my-3 px-3"
        label="Contenu de la page"
        :value="item.content"
      >
        <template v-slot:supplemental_btns>
          <OldVersionBtn v-if="item.url" :url="item.url" :set-content="setContent"/>
        </template>
      </Editor>
    </ClientOnly>
    <div class="flex w-full justify-end px-3">
      <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Sauvegarder</button>
      <button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent">Réinitialiser</button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import OldVersionBtn from '~/components/admin/pages/OldVersionBtn.vue'
import CheckboxField from '~/components/form/CheckboxField.vue'
import SelectField from '~/components/form/SelectField.vue'
import TextField from '~/components/form/TextField.vue'
import { useMediaNodeStore } from '~/store/media-node'
import { Page } from '~/store/page'
import Editor from '~/components/util/Editor.vue'
import { usePageCategoryStore } from '~/store/page-category'
import { FormErrors } from '~/types/form'
import { Form } from 'vee-validate';

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

const schema = {
  title: 'required|min:3|max:60',
  url: 'required|min:3|max:60',
  content: 'required|min:10|max:1000'
};
</script>
