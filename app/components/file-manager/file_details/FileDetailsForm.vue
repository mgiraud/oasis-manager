<template>
  <FormKit
    type="form"
    v-model="item"
    @submit="handleSubmit"
  >
    <FormKit
      name="uniqueId"
      type="text"
      label="Identifiant unique"
      disabled="disabled"
      validation=""
      outer-class="w-full"
      :errors="errors ? [errors.uniqueId] : []"
    />
    <FormKit
      name="customName"
      type="text"
      label="Nom personnalisé"
      validation=""
      outer-class="w-full"
      :errors="errors ? [errors.customName] : []"
    />
    <FormKit
      name="mediaNodes"
      :type="fileTreeView"
      label="Appartient aux catégories..."
      outer-class="w-full"
      :errors="errors ? [errors.mediaNodes] : []"
      :tree="tree"
    />
  </FormKit>
</template>

<script setup lang="ts">
import { createInput } from '@formkit/vue'
import { MediaNodeItem } from '~/store/media-node'
import { MediaObject } from '~/store/media-object'
import { FormErrors } from '~/types/form'
import FileTreeView from '~/components/file-manager/file_details/FileTreeView.vue'

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

const fileTreeView = createInput(FileTreeView, {
  props: ['tree']
})
</script>
