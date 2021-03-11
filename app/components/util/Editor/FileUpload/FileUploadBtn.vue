<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on: onDropdown, attrs: attrsDropdown }">
      <v-tooltip top>
        <template v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }">
          <v-btn
            small
            v-bind="{...attrsDropdown, ...attrsTooltip}"
            v-on="{...onDropdown, ...onTooltip}"
          >
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </template>
        <span>Téléverser un fichier</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Téléverser un fichier
      </v-card-title>

      <v-card-text>
        <div id="dropDown" />
        <input
          id="fileElem"
          ref="fileSelection"
          type="file"
          multiple
          accept="image/*"
          style="display:none"
          @change="handleUpload"
        ><v-btn @click="openFileSelection">
          Sélectionner des fichiers
        </v-btn>
        <v-img v-for="(thumbnail, i) in thumbnails" :key="i" :src="thumbnail.src" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click.prevent="injectFilesAndCloseDialog"
        >
          Insérer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      thumbnails: []
    }
  },
  methods: {
    openFileSelection () {
      this.$refs.fileSelection.click()
    },
    handleUpload () {
      const files = this.$refs.fileSelection.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // const reader = new FileReader()
        // reader.onload = (e) => {
        //   this.thumbnails.push({
        //     src: e.target.result
        //   })
        // }
        // reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('mediaGalleryItemId', 1)
        this.$getRepository('media_objects').$post('/api/media_objects', {
          method: 'POST',
          'Content-Type': 'multipart/form-data',
          body: formData,
          onUploadProgress: (event) => {
            // commit('setFileUploadProgress', Math.round((100 * event.loaded) / event.total))
          }
        }).then((e) => {
          const imageType = /^image\//
          if (!imageType.test(file.type)) {
            return
          }

          this.thumbnails.push({
            src: e.contentUrl
          })
        })
      }
    },
    injectFilesAndCloseDialog () {
      this.dialog = false
      this.thumbnails.forEach((thumbnail) => {
        this.editor.chain().focus().setImage({ src: thumbnail.src, inline: true }).run()
      })
    }
  }
}
</script>
