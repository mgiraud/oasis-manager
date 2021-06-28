<template>
  <v-container>
    <v-row>
      <v-col>
        <input
          id="fileElem"
          ref="fileSelection"
          type="file"
          multiple
          accept="image/*"
          style="display:none"
          @change="onFileChange"
        >
        <v-btn @click="openFileSelection">
          Sélectionner des fichiers à téléverser
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    handleUpload: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const fileSelection = ref(null) as Ref<HTMLInputElement | null>

    const openFileSelection = () => {
      fileSelection.value.click()
    }

    const onFileChange = () => {
      const files = fileSelection.value.files
      if (files) {
        props.handleUpload(files)
      }
    }

    return {
      fileSelection,
      openFileSelection,
      onFileChange
    }
  }
})
</script>
