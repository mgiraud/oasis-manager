<template>
  <div class="flex flex-row">
    <FileArbo ref="fileArbo" class="flex w-1/6" :click-handler="onTreeItemClick"/>
    <div class="flex flex-col flex-auto w-1/2">
      <FileNavigator
        ref="fileNavigator"
        :select-click-handler="selectMediaObject"
        :edit-click-handler="editMediaObject"
        :remove-click-handler="removeMediaObject"
        :remove-folder-click-handler="removeFolderClickHandler"
        :refresh-handler="refreshAll"
        :show-selection="showSelection"
        v-model="currentMediaNode"
      />
      <FileUploader :handle-upload="handleUpload" v-if="currentMediaNode" />
      <FileSelection
        v-if="showSelection"
        :thumbnails="thumbnails"
        :links="links"
        :remove-link="removeLink"
        :remove-thumbnail="removeThumbnail"
      />
    </div>
    <FileDetails
      v-if="selectedMediaObject"
      class="flex w-1/3"
      :media-object="selectedMediaObject"
      :remove-click-handler="removeMediaObject"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import FileArbo from '~/components/file-manager/file_arbo/FileArbo.vue'
import { MediaNode, MediaNodeItem, useMediaNodeStore } from '~/store/media-node'
import { MediaObject, useMediaObjectStore } from '~/store/media-object'
import { useNotificationStore } from '~/store/notification'
import FileSelection from './file_selection/FileSelection.vue'
import FileUploader from './file_uploader/FileUploader.vue'
import FileNavigator from './file_navigator/FileNavigator.vue'
import FileDetails from './file_details/FileDetails.vue'

export interface Thumbnail {
  src: string,
  alt: string
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
const selectedMediaObject = ref(null) as Ref<null | MediaObject>
const links = ref([]) as Ref<Link[]>
const thumbnails = ref([]) as Ref<Thumbnail[]>
const currentMediaNode = ref(null) as Ref<MediaNode | null>
const fileNavigator = ref(null) as Ref<typeof FileNavigator | null>
const fileArbo = ref(null) as Ref<typeof FileArbo | null>

provide('closeDetailPanel', () => {
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
    src: res.contentUrl,
    alt: res.customName ?? res.uniqueId
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

const refreshAll = (mediaNode: MediaNode | null = null) => {
  fileNavigator.value?.refresh(mediaNode)
  fileArbo.value?.refresh()
}

const refreshNavigator = (mediaNode: MediaNode | null = null) => {
  fileNavigator.value?.refresh(mediaNode)
}

const refreshArbo = () => {
  fileArbo.value?.refresh()
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
      refreshNavigator()
    })
  }
}

const editMediaObject = (mediaObject: MediaObject) => {
  selectedMediaObject.value = mediaObject
}

const removeMediaObject = async (mediaObject: MediaObject) => {
  try {
    await mediaObjectStore.remove(mediaObject.uniqueId)
    refreshNavigator()
    selectedMediaObject.value = null
    notificationStore.showMessage('Media correctement supprimé')
  } catch (e) {
    notificationStore.showError('Erreur dans la suppression du média')
  }
}

const removeFolderClickHandler = async (mediaNode: MediaNode) => {
  try {
    await mediaNodeStore.remove(mediaNode.id)
    currentMediaNode.value = null
    refreshAll()
    notificationStore.showMessage('Dossier correctement supprimé')
  } catch (e) {
    notificationStore.showError('Erreur dans la suppression du dossier')
  }
}

const onTreeItemClick = async (item: MediaNodeItem) => {
  await fileNavigator.value?.refresh(item)
}

defineExpose({
  links,
  thumbnails,
  reset
})
</script>
