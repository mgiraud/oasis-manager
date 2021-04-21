<template>
  <v-dialog
    v-model="dialog"
    width="90%"
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
        <h3>Fichiers sélectionnés</h3>
        <v-container>
          <v-row>
            <v-col v-for="(thumbnail, i) in thumbnails" :key="i">
              <v-img :src="thumbnail.src" max-height="200" max-width="200" />
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(link, i) in links" :key="i">
              <span>{{ link.name }}</span>
            </v-col>
          </v-row>
        </v-container>

        <p v-if="thumbnails.length + links.length === 0">
          Tu peux téleverser un fichier ou utiliser le navigateur pour sélectionner les fichiers à insérer
        </p>
        <v-divider />
        <div v-if="currentGalleryItem">
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
        </div>
        <v-divider />
        <file-navigator ref="file-navigator" :click-handler="selectItem" :current-gallery-item.sync="currentGalleryItem" />
      </v-card-text>
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
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import FileNavigator from '~/components/file_navigator/FileNavigator.vue'
import { MediaGalleryItem } from '~/store/media_gallery_item'
import { MediaObject } from '~/store/media_object'

interface Thumbnail {
  src: string
}

interface Link {
  src: string
  name: string
}

@Component({
  components: { FileNavigator }
})
export default class FileUploadBtn extends Vue {
  @Prop({ type: Object, required: true }) readonly editor!: Editor

  dialog = false
  thumbnails: Thumbnail[] = []
  links: Link[] = []
  currentGalleryItem: MediaGalleryItem | null = null

  openFileSelection () {
    (this.$refs.fileSelection as HTMLInputElement).click()
  }

  reset (): void {
    this.thumbnails = []
    this.links = []
  }

  selectItem (item: MediaObject) {
    if (item.isImage) {
      this.selectImage(item)
    } else {
      this.selectLink(item)
    }
  }

  selectImage (res: MediaObject) {
    this.thumbnails.push({
      src: res.contentUrl
    })
  }

  selectLink (res: MediaObject) {
    this.links.push({
      src: res.contentUrl,
      name: res.filePath
    })
  }

  handleUpload () {
    if (!this.currentGalleryItem) {
      return
    }
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
      formData.append('mediaGalleryItemId', this.currentGalleryItem.id.toString())
      this.$getRepository('media_objects').$post('/api/media_objects', {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res.isImage) {
          this.selectImage(res)
        } else {
          this.selectLink(res)
        }
        (this.$refs['file-navigator'] as FileNavigator).reload()
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

  @Watch('dialog')
  onDialogToggle () {
    this.reset()
  }
}
</script>
