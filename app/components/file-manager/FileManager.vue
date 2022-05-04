<template>
  <div class="flex flex-row">
      <div class="flex flex-auto">
        <div class="flex flex-col flex-auto">
          <div v-if="showSelection" class="flex-auto">
            <FileSelection
              :thumbnails="thumbnails"
              :links="links"
              :remove-link="removeLink"
              :remove-thumbnail="removeThumbnail"
            />
        </div>
        <div class="flex-auto">
            <FileNavigator
              ref="fileNavigator"
              :select-click-handler="selectMediaObject"
              :current-media-node.sync="currentMediaNode"
              :edit-click-handler="editMediaObject"
              :show-selection="showSelection"
            />
        </div>
        <div class="flex-auto" v-if="currentMediaNode">
            <FileUploader :handle-upload="handleUpload" />
        </div>
      </div>
      <div v-if="detailsPanel" class="flex flex-auto">
        <FileDetails :media-object="selectedMediaObject" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { MediaNode } from '~/store/media-node'
import { MediaObject, useMediaObjectStore } from '~/store/media-object'
import FileSelection from './file_selection/FileSelection.vue'
import FileUploader from './file_uploader/FileUploader.vue'
import FileNavigator from './file_navigator/FileNavigator.vue'
import FileDetails from './file_details/FileDetails.vue'

export interface Thumbnail {
  src: string
}

export interface Link {
  src: string
  name: string
}

interface FileManagerProps {
  showSelection: boolean,
}

const props = withDefaults(defineProps<FileManagerProps>(), {
  'showSelection': true
})

const mediaObjectStore = useMediaObjectStore()
const detailsPanel = ref(false)
const selectedMediaObject = ref(null) as Ref<null | MediaObject>
const links = ref([]) as Ref<Link[]>
const thumbnails = ref([]) as Ref<Thumbnail[]>
const currentMediaNode = ref(null) as Ref<MediaNode | null>
const fileNavigator = ref(null) as Ref<typeof FileNavigator | null>

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
    mediaObjectStore.create(formData).then((res: MediaObject) => {
      if (res.isImage) {
        selectImage(res)
      } else {
        selectLink(res)
      }
      // @ts-ignore
      fileNavigator.value?.refresh()
    })
  }
}

const editMediaObject = (mediaObject: MediaObject) => {
  detailsPanel.value = true
  selectedMediaObject.value = mediaObject
}
</script>
