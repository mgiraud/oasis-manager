<template>
  <div class="flex flex-col">
    <div>
        <h3>
          Détail du fichier
          <button
            class="bg-error h-6 w-16 rounded-lg"
            @click="closeDetailPanel"
          >
            <Icon icon="ri-close-line" class="h-6 w-6"/>
          </button>
        </h3>
    </div>
    <div>
<!--        <FileDetailsForm-->
<!--          :tree="tree"-->
<!--          :values="item"-->
<!--          :errors="state.violations"-->
<!--        />-->
    </div>
    <div>
<!--        <Toolbar-->
<!--          :handle-submit="onSendForm"-->
<!--        />-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaNodeStore } from '~/store/media-node'
import { MediaObject, useMediaObjectStore } from '~/store/media-object'
import { useNotificationStore } from '~/store/notification'
import FileDetailsForm from './FileDetailsForm.vue'
// import Toolbar from '../../form/Toolbar.vue'
import Icon from '~/components/util/Icon'

interface FileDetailsProps {
  mediaObject: MediaObject,
}

const props = defineProps<FileDetailsProps>()
const closeDetailPanel = inject('closeDetailPanel')
const item = computed(() => props.mediaObject)
const mediaNodeStore = useMediaNodeStore()
const mediaObjectStore = useMediaObjectStore()
const notificationStore = useNotificationStore()

if (mediaNodeStore.tree.length === 0) {
  useFetch(async () => {
      await mediaNodeStore.fetchTree()
  })
}

const onSendForm = (data) => {
    mediaObjectStore.update(data)
}

watch(() => mediaObjectStore.updated, (created: MediaObject | null) => {
  if (!created) {
    return
  }
  notificationStore.showMessage('Fichier mis à jour')
})
</script>
