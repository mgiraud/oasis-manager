<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
        <h2 class="mb-3">Détail du fichier</h2>
        <Icon icon="ri-close-line" class="h-6 w-6 rounded-md fill-primary justify-self-end" @click="closeDetailPanel"/>
    </div>
    <div>
        <FileDetailsForm
          :tree="mediaNodeStore.tree"
          v-model:mediaObject="item"
          :handle-submit="onSendForm"
          :errors="mediaObjectStore[CRUD_MODE.EDITION].violations"
        />
    </div>
    <div class="flex flex-col px-2">
      <h2 class="py-2">Miniatures</h2>
      <div v-if="item.thumbnails.length > 0" v-for="thumbnail in item.thumbnails" class="flex flex-col">
        <img :src="thumbnail.contentUrl" :alt="thumbnail.customName || thumbnail.uniqueId" class="w-fit h-auto object-scale-down"/>
        <Icon icon="ri-delete-bin-line" @click="removeClickHandler(thumbnail)" class="fill-secondary hover:fill-accent h-8 w-8 cursor-pointer"/>
      </div>
      <p v-else><small>Aucune miniature</small></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { useMediaNodeStore } from '~/store/media-node'
import { MediaObject, useMediaObjectStore } from '~/store/media-object'
import { useNotificationStore } from '~/store/notification'
import FileDetailsForm from './FileDetailsForm.vue'
import Icon from '~/components/util/Icon.vue'
import { CRUD_MODE } from '~/store/crud'

interface FileDetailsProps {
  mediaObject: MediaObject,
  removeClickHandler: Function
}

const props = defineProps<FileDetailsProps>()
const closeDetailPanel = inject('closeDetailPanel')
const item = {...props.mediaObject}
const mediaNodeStore = useMediaNodeStore()
const mediaObjectStore = useMediaObjectStore()
const notificationStore = useNotificationStore()

await useAsyncData('media-node-tree', async () => {
    await mediaNodeStore.fetchTree()
})

const onSendForm = async (data: MediaObject) => {
  await mediaObjectStore.update(data.uniqueId, data)
}

watch(() => mediaObjectStore[CRUD_MODE.EDITION].edited, (edited: MediaObject | null) => {
  if (!edited) {
    return
  }
  notificationStore.showMessage('Fichier mis à jour')
})
</script>
