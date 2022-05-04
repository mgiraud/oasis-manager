<template>
  <div class="flex flex-col">
        <input
          id="fileElem"
          ref="fileSelection"
          type="file"
          multiple
          accept="image/*"
          style="display:none"
          @change="onFileChange"
        >
        <button @click="openFileSelection">
          Sélectionner des fichiers à téléverser
        </button>
  </div>
</template>

<script setup lang="ts">

import { Ref } from '@vue/reactivity'

interface FileUploaderProps {
  handleUpload: boolean,
}

const props = defineProps<FileUploaderProps>()
const fileSelection = ref(null) as Ref<HTMLInputElement | null>

const openFileSelection = () => {
  fileSelection.value?.click()
}

const onFileChange = () => {
  const files = fileSelection.value?.files
  if (files) {
    // @ts-ignore
    props.handleUpload(files)
  }
}
</script>
