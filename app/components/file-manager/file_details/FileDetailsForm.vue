<template>
  <Form
    v-slot="{ values, errors }"
    @submit="handleSubmit"
    class="flex flex-row flex-wrap"
    :initial-values="item"
  >
    <TextField name="uniqueId" :error="errors.uniqueId" :value="values.uniqueId" label="Identifiant unique" class="w-full" :field-attrs="{disabled: 'disabled'}"/>
    <TextField name="customName" :error="errors.customName" :value="values.customName" label="Nom personnalisé" class="w-full"/>
    <FileTreeView :tree="tree" name="mediaNodes" :value="values.mediaNodes"/>
    <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Mettre à jour</button>
  </Form>
</template>

<script setup lang="ts">
import { MediaNodeItem } from '~/store/media-node'
import { MediaObject } from '~/store/media-object'
import { FormErrors } from '~/types/form'
import FileTreeView from '~/components/file-manager/file_details/FileTreeView.vue'
import { Form } from 'vee-validate';
import TextField from '~/components/form/TextField.vue'

interface FileDetailsFormProps {
  mediaObject: MediaObject,
  tree: MediaNodeItem[],
  handleSubmit: Function,
  errors: FormErrors | null
}
const props = defineProps<FileDetailsFormProps>()
const emit = defineEmits(['update:mediaObject']);

const item = computed({
  get() {
    return props.mediaObject
  },
  set(value) {
    emit('update:mediaObject', value)
  }
})

// const fileTreeView = createInput(FileTreeView, {
//   props: ['tree']
// })
</script>
