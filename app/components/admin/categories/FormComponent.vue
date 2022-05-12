<template>
  <Form
    v-slot="{ values, errors }"
    @submit="submitHandler"
    class="flex flex-row flex-wrap"
    :validation-schema="schema"
    :initial-values="item"
  >
    <TextField name="name" :error="errors.name" :value="values.name" label="Titre" class="w-full" />
    <CheckboxField name="isPublished" :error="errors.isPublished" label="Publier" class="w-1/2" />
    <CheckboxField name="showInMenu" :error="errors.showInMenu" label="Afficher dans le menu" class="w-1/2" />
    <div class="flex w-full justify-end px-3">
      <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Sauvegarder</button>
      <button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent">Réinitialiser</button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import CheckboxField from '~/components/form/CheckboxField.vue'
import TextField from '~/components/form/TextField.vue'
import { useMediaNodeStore } from '~/store/media-node'
import Editor from '~/components/util/Editor.vue'
import { PageCategory, usePageCategoryStore } from '~/store/page-category'
import { FormErrors } from '~/types/form'
import { Form } from 'vee-validate';

const props = defineProps<{
  category: PageCategory,
  submitHandler: Function,
  errors: FormErrors | null
}>()
const emit = defineEmits(['update:category']);

const item = computed({
  get() {
    return props.category
  },
  set(value) {
    emit('update:category', value)
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
  name: 'required|min:3|max:60',
};
</script>
