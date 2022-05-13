<template>
  <Form
    v-slot="{ values, errors }"
    @submit="submitHandler"
    class="flex flex-row flex-wrap"
    :validation-schema="schema"
    :initial-values="item"
  >
    <TextField name="title" :error="errors.title" :value="values.title" label="Titre" class="w-1/2" />
    <CheckboxField name="isPublished" :error="errors.isPublished" label="Publier" class="w-1/2" />
    <SelectField name="mediaNode" :options="mediaNodes" :error="errors.mediaNode" :value="values.mediaNode" label="Gallerie" class="w-1/2"/>
    <FormTags class="w-1/2" :initial-tags="item.tags ?? []"/>
    <TextField as="textarea" type="textarea" name="preview" :error="errors.preview" :value="values.preview" label="Preview" class="w-full" />
    <input type="hidden" name="tags" />
    <ClientOnly>
      <Editor
        v-if="item.content !== undefined"
        name="content"
        ref="editor"
        class="bg-white w-full my-3 px-3"
        label="Contenu de la page"
        :value="item.content"
      />
    </ClientOnly>
    <div class="flex w-full justify-end px-3">
      <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Sauvegarder</button>
      <button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent">Réinitialiser</button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { storeToRefs } from 'pinia'
import FormTags from '~/components/admin/blog/FormTags.vue'
import CheckboxField from '~/components/form/CheckboxField.vue'
import SelectField from '~/components/form/SelectField.vue'
import TextField from '~/components/form/TextField.vue'
import { BlogArticle, useBlogArticleStore } from '~/store/blog-article'
import { useMediaNodeStore } from '~/store/media-node'
import Editor from '~/components/util/Editor.vue'
import { FormErrors } from '~/types/form'
import { Form, useField } from 'vee-validate'

const props = defineProps<{
  article: BlogArticle,
  submitHandler: Function,
  errors: FormErrors | null
}>()
const emit = defineEmits(['update:article']);

const item = computed({
  get() {
    return props.article
  },
  set(value) {
    emit('update:article', value)
  }
})

const mediaNodeStore = useMediaNodeStore()
await useAsyncData('media-node-items', () => mediaNodeStore.fetchSelectItems())
const mediaNodes = mediaNodeStore.selectItemList()

const schema = {
  title: 'required|min:3|max:60',
  preview: 'required|min:20|max:500',
  content: 'required|min:20'
};
</script>
