<template>
  <div class="flex flex-row flex-wrap gap-1">
    <div
      v-for="item in mediaObjectStore.list"
      :key="item['@id']"
      class="flex flex-col"
    >
      <div>
        <img
          v-if="item.isImage"
          :src="item.contentUrl"
          class="file-navigator-object max-h-80"
        />
        <div
          v-else
          class="px-3 py-3 border border-primary"
        >{{ item.filePath }}</div>
      </div>
      <div class="bg-gray-100 p-1">
        <small v-if="item.customName">{{ item.customName }}</small>
        <small v-else>Titre non défini</small>
      </div>
      <div class="flex flex-row bg-gray-100 pb-1">
        <Icon v-if="selectionEnabled" icon="ri-arrow-left-up-line" @click="selectClickHandler(item)" class="fill-primary h-8 w-8 cursor-pointer"/>
        <Icon icon="ri-pencil-line" @click="editClickHandler(item)" class="fill-primary hover:fill-primary-dark h-8 w-8 cursor-pointer"/>
        <Icon icon="ri-delete-bin-line" @click="removeClickHandler(item)" class="fill-secondary hover:fill-accent h-8 w-8 cursor-pointer"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/util/Icon.vue'
import { MediaNode } from '~/store/media-node'
import { useMediaObjectStore } from '~/store/media-object'

interface FileNavigatorProps {
  mediaNode?: MediaNode | null,
  selectClickHandler: Function,
  editClickHandler: Function,
  removeClickHandler: Function,
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  mediaNode: null
})

const selectionEnabled = inject<boolean>('selectionEnabled')
const mediaObjectStore = useMediaObjectStore()

const loadObjects = () => {
  if (props.mediaNode) {
    mediaObjectStore.fetchAll({
      mediaNodes: props.mediaNode.id,
      'exists[original]': false
    })
  }
}

onMounted(() => {
  loadObjects()
})

watch(() => props.mediaNode, (mediaNode: MediaNode | null) => {
  loadObjects()
})
</script>
