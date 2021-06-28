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
                ref="fileNavigator"
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
import { defineComponent, provide, Ref, ref, useContext } from '@nuxtjs/composition-api'
import FileSelection from './file_selection/FileSelection.vue'
import FileUploader from './file_uploader/FileUploader.vue'
import FileNavigator from './file_navigator/FileNavigator.vue'
import FileDetails from './file_details/FileDetails.vue'
import { MediaObject } from '~/custom-store/MediaObjectStore'
import { MediaNode } from '~/custom-store/MediaNodeStore'

export interface Thumbnail {
  src: string
}

export interface Link {
  src: string
  name: string
}

export default defineComponent({
  components: {
    FileSelection,
    FileUploader,
    FileNavigator,
    FileDetails
  },
  props: {
    showSelection: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const detailsPanel = ref(false)
    const selectedMediaObject = ref(null) as Ref<null | MediaObject>
    const links = ref([]) as Ref<Link[]>
    const thumbnails = ref([]) as Ref<Thumbnail[]>
    const currentMediaNode = ref(null) as Ref<MediaNode | null>
    const fileNavigator = ref(null) as Ref<FileNavigator | null>
    const context = useContext()
    provide('closeDetailPanel', () => {
      detailsPanel.value = false
      selectedMediaObject.value = null
    })
    provide('selectionEnabled', props.showSelection)

    const reset = () => {
      thumbnails.value = []
      links.value = []
    }

    const selectMediaObject = (mediaObject: MediaObject) => {
      if (mediaObject.isImage) {
        selectImage(mediaObject)
      } else {
        selectLink(mediaObject)
      }
    }

    const selectImage = (res: MediaObject) => {
      thumbnails.value.push({
        src: res.contentUrl
      })
    }

    const selectLink = (res: MediaObject) => {
      links.value.push({
        src: res.contentUrl,
        name: res.filePath
      })
    }

    const removeThumbnail = (index: number) => {
      thumbnails.value.splice(index, 1)
    }

    const removeLink = (index: number) => {
      links.value.splice(index, 1)
    }

    const handleUpload = (files: FileList) => {
      if (!currentMediaNode.value) {
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
        formData.append('mediaNodeId', currentMediaNode.value.id.toString())
        context.$getRepository('media_objects').$post('/api/media_objects', {
          method: 'POST',
          body: formData
        }).then((res: MediaObject) => {
          if (res.isImage) {
            selectImage(res)
          } else {
            selectLink(res)
          }
          fileNavigator.value?.refresh()
        })
      }
    }

    const editMediaObject = (mediaObject: MediaObject) => {
      detailsPanel.value = true
      selectedMediaObject.value = mediaObject
    }

    return {
      detailsPanel,
      selectedMediaObject,
      links,
      thumbnails,
      currentMediaNode,
      fileNavigator,
      selectMediaObject,
      reset,
      removeThumbnail,
      removeLink,
      handleUpload,
      editMediaObject
    }
  }
})
</script>
