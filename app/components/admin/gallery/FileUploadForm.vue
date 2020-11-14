<template>
  <v-row>
    <v-progress-linear
      v-model="fileUpload.progress"
      color="light-blue"
      height="25"
      reactive
    >
      <strong>{{ fileUpload.progress }} %</strong>
    </v-progress-linear>
    <v-file-input
      v-model="fileUpload.file"
      truncate-length="15"
      prepend-icon="mdi-paperclip"
      :show-size="1000"
      @change="onFileChange"
    />
    <v-btn
      text
      block
      :disabled="!fileUpload.file"
      @click="upload"
    >
      Upload
    </v-btn>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      fileUpload: state => state.gallery.fileUpload
    })
  },
  methods: {
    onFileChange (file) {
      this.$store.dispatch('gallery/addFileUpload', file)
    },
    upload () {
      this.$store.dispatch('gallery/uploadFile', { $repository: this.$repository })
    }
  }
}
</script>
