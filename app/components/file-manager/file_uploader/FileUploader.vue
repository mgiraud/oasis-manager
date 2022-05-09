<template>
  <div class="flex flex-col mt-6">
        <input
          id="fileElem"
          ref="fileSelection"
          type="file"
          multiple
          accept="image/*"
          style="display:none"
          @change="onFileChange"
        >
        <button @click="openFileSelection" class="bg-primary text-white py-3 px-6 rounded-md w-fit">
          Téléverser des fichiers
        </button>
  </div>
</template>

<script setup lang="ts">

import { Ref } from '@vue/reactivity'

interface FileUploaderProps {
  handleUpload: Function,
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
