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
        ><v-btn @click="openFileSelection">
          Sélectionner des fichiers à téléverser
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class FileUploader extends Vue {
    @Prop({ type: Function, required: true }) readonly handleUpload!: (files: FileList) => {}

    openFileSelection () {
      (this.$refs.fileSelection as HTMLInputElement).click()
    }

    onFileChange () {
      const files = (this.$refs.fileSelection as HTMLInputElement).files
      if (files) {
        this.handleUpload(files)
      }
    }
}
</script>
