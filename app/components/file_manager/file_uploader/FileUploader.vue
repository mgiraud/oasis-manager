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
          @change="handleUpload"
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
    @Prop({ type: Function, required: true }) readonly handleUpload!: (e: Event) => {}

    openFileSelection () {
      (this.$refs.fileSelection as HTMLInputElement).click()
    }
}
</script>
