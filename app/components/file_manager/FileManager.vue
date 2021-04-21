<template>
  <v-container>
    <v-row>
      <v-col>
        <file-selection :thumbnails="thumbnails" :links="links" :remove-link="removeLink" :remove-thumbnail="removeThumbnail" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <file-navigator ref="file-navigator" :click-handler="selectItem" :current-gallery-item.sync="currentGalleryItem" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <file-uploader :handle-upload="handleUpload" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FileSelection from './file_selection/FileSelection.vue'
import FileUploader from './file_uploader/FileUploader.vue'
import FileNavigator from './file_navigator/FileNavigator.vue'
import { MediaGalleryItem } from '~/store/media_gallery_item'
import { MediaObject } from '~/store/media_object'

export type Thumbnail = {
  src: string
}

export type Link = {
  src: string
  name: string
}

@Component({
  components: {
    FileSelection,
    FileUploader,
    FileNavigator
  }
})
export default class FileManager extends Vue {
  currentGalleryItem: MediaGalleryItem | null = null
  thumbnails: Thumbnail[] = []
  links: Link[] = []

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

  removeThumbnail (index: number) {
    this.thumbnails.splice(index, 1)
  }

  removeLink (index: number) {
    this.links.splice(index, 1)
  }

  handleUpload (files: FileList) {
    if (!this.currentGalleryItem) {
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
}
</script>
