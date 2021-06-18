<template>
  <v-container>
    <v-row no-gutters>
      <v-col :cols="detailsPanel ? 8 : 12">
        <v-container>
          <v-row v-if="showSelection">
            <v-col>
              <file-selection
                :thumbnails="thumbnails"
                :links="links"
                :remove-link="removeLink"
                :remove-thumbnail="removeThumbnail"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <file-navigator
                ref="file-navigator"
                :select-click-handler="selectMediaObject"
                :current-media-node.sync="currentMediaNode"
                :edit-click-handler="editMediaObject"
                :show-selection="showSelection"
              />
            </v-col>
          </v-row>
          <v-row v-if="currentMediaNode">
            <v-col>
              <file-uploader :handle-upload="handleUpload" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col v-if="detailsPanel">
        <v-container>
          <v-row no-gutters>
            <v-col>
              <file-details :media-object="selectedMediaObject" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, ProvideReactive } from 'nuxt-property-decorator'
import FileSelection from './file_selection/FileSelection.vue'
import FileUploader from './file_uploader/FileUploader.vue'
import FileNavigator from './file_navigator/FileNavigator.vue'
import FileDetails from './file_details/FileDetails.vue'
import { MediaObject } from '~/store/media_object'
import { MediaNode } from '~/store/media_node'

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
    FileNavigator,
    FileDetails
  }
})
export default class FileManager extends Vue {
  @Prop({ type: Boolean, default: true }) readonly showSelection!: boolean
  @Provide() selectionEnabled = this.showSelection

  @ProvideReactive() closeDetailPanel () {
    this.detailsPanel = false
    this.selectedMediaObject = null
  }

  currentMediaNode: MediaNode | null = null
  thumbnails: Thumbnail[] = []
  links: Link[] = []
  detailsPanel = false
  selectedMediaObject: MediaObject | null = null

  reset (): void {
    this.thumbnails = []
    this.links = []
  }

  selectMediaObject (mediaObject: MediaObject) {
    if (mediaObject.isImage) {
      this.selectImage(mediaObject)
    } else {
      this.selectLink(mediaObject)
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
    if (!this.currentMediaNode) {
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
      formData.append('mediaNodeId', this.currentMediaNode.id.toString())
      this.$getRepository('media_objects').$post('/api/media_objects', {
        method: 'POST',
        body: formData
      }).then((res: MediaObject) => {
        if (res.isImage) {
          this.selectImage(res)
        } else {
          this.selectLink(res)
        }
        (this.$refs['file-navigator'] as FileNavigator).refresh()
      })
    }
  }

  editMediaObject (mediaObject: MediaObject) {
    this.detailsPanel = true
    this.selectedMediaObject = mediaObject
  }
}
</script>
