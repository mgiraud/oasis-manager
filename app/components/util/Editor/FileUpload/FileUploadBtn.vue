<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on: onDropdown, attrs: attrsDropdown }">
      <v-tooltip top>
        <template #activator="{ on: onTooltip, attrs: attrsTooltip }">
          <v-btn
            small
            v-bind="{...attrsDropdown, ...attrsTooltip}"
            v-on="{...onDropdown, ...onTooltip}"
          >
            <v-icon>ri-file-transfer-line</v-icon>
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

<script lang="ts">
import { Editor } from '@tiptap/core'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface Thumbnail {
  src: string
}

interface Link {
  src: string
  name: string
}

@Component
export default class FileUploadBtn extends Vue {
  @Prop({ type: Object, required: true }) readonly editor!: Editor

  dialog = false
  thumbnails: Thumbnail[] = []
  links: Link[] = []

  openFileSelection () {
    (this.$refs.fileSelection as HTMLInputElement).click()
  }

  handleUpload () {
    const files = (this.$refs.fileSelection as HTMLInputElement).files
    if (files === null) {
      return
    }
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
      formData.append('mediaGalleryItemId', '1')
      this.$getRepository('media_objects').$post('/api/media_objects', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
      }).then((res) => {
        const imageType = /^image\//
        if (imageType.test(file.type)) {
          this.thumbnails.push({
            src: res.contentUrl
          })
        } else {
          this.links.push({
            src: res.contentUrl,
            name: res.filePath
          })
        }
      })
    }
  }

  injectFilesAndCloseDialog () {
    this.dialog = false
    this.thumbnails.forEach((thumbnail) => {
      this.editor.chain().focus().setImage({ src: thumbnail.src }).run()
    })
    this.links.forEach((link) => {
      const node = this.editor.schema.text(link.name, [this.editor.schema.marks.link.create({ href: link.src })])
      this.editor.view.dispatch(this.editor.state.tr.replaceSelectionWith(node, false))
    })
  }
}
</script>
