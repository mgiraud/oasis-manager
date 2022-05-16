<template>
  <div class="flex flex-row">
    <div class="flex flex-col flex-auto">
      <FileSelection
        v-if="showSelection"
        :thumbnails="thumbnails"
        :links="links"
        :remove-link="removeLink"
        :remove-thumbnail="removeThumbnail"
      />
      <FileNavigator
        ref="fileNavigator"
        :select-click-handler="selectMediaObject"
        :edit-click-handler="editMediaObject"
        :remove-click-handler="removeMediaObject"
        :remove-folder-click-handler="removeFolderClickHandler"
        :show-selection="showSelection"
        v-model="currentMediaNode"
      />
      <FileUploader :handle-upload="handleUpload" v-if="currentMediaNode" />
    </div>
    <div v-if="detailsPanel" class="flex w-1/3">
      <FileDetails :media-object="selectedMediaObject" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { MediaNode, useMediaNodeStore } from '~/store/media-node'
import { MediaObject, useMediaObjectStore } from '~/store/media-object'
import { useNotificationStore } from '~/store/notification'
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
  showSelection?: boolean,
}

const props = withDefaults(defineProps<FileManagerProps>(), {
  showSelection: true
})

const notificationStore = useNotificationStore()
const mediaObjectStore = useMediaObjectStore()
const mediaNodeStore = useMediaNodeStore()
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

const removeMediaObject = async (mediaObject: MediaObject) => {
  try {
    await mediaObjectStore.remove(mediaObject.uniqueId)
    fileNavigator.value?.refresh()
    notificationStore.showMessage('Media correctement supprimé')
  } catch (e) {
    notificationStore.showError('Erreur dans la suppression du média')
  }
}

const removeFolderClickHandler = async (mediaNode: MediaNode) => {
  try {
    await mediaNodeStore.remove(mediaNode.id)
    currentMediaNode.value = null
    fileNavigator.value?.refresh(currentMediaNode.value)
    notificationStore.showMessage('Dossier correctement supprimé')
  } catch (e) {
    notificationStore.showError('Erreur dans la suppression du dossier')
  }
}

defineExpose({
  links,
  thumbnails,
  reset
})
</script>
