<template>
  <div class="flex flex-col">
    <div>
      <h1 class="navigator-title">Navigateur de fichier</h1>
    </div>
    <div class="flex-auto py-2">
        <FileNavigatorBreadCrumb
          :media-node="props.modelValue"
          :media-node-click-handler="handleMediaNodeClick"
          :handle-root-click="handleRootClick"
        />
    </div>
    <div
      class="flex-auto flex flex-col"
      v-if="currentMediaNode"
    >
      <div class="flex flex-row h-16 items-center gap-x-2">
        <h2>Dossiers</h2>
        <Icon icon="ri-folder-add-line" class="fill-primary h-8 w-8 cursor-pointer" @click="folderDialog = true"/>
        <Icon icon="ri-delete-bin-line" class="fill-secondary hover:fill-accent h-8 w-8 cursor-pointer" @click="removeFolderClickHandler(currentMediaNode)"/>
      </div>
      <FileNavigatorFolders
        v-if="currentMediaNode.children.length > 0"
        :media-node="currentMediaNode"
        :handle-click="handleMediaNodeClick"
      />
      <p v-else>
        Aucun dossier
      </p>
    </div>
    <div class="flex-auto" v-if="currentMediaNode && currentMediaNode.mediaObjects.length > 0">
      <div>
        <h2>Fichiers</h2>
      </div>
      <div>
        <FileNavigatorFiles
          :select-click-handler="props.selectClickHandler"
          :edit-click-handler="props.editClickHandler"
          :remove-click-handler="props.removeClickHandler"
          :media-node="currentMediaNode"
        />
      </div>
    </div>
    <div class="flex-auto flex flex-col" v-if="!currentMediaNode">
      <div class="flex flex-row h-16 items-center gap-x-2">
        <h2>Sélectionner un dossier</h2>
        <Icon icon="ri-folder-add-line" class="fill-primary h-8 w-8 cursor-pointer" @click="folderDialog = true"/>
      </div>
      <div class="flex flex-row">
        <div
          v-for="node in mediaNodeStore.list"
          :key="node['@id']"
          class="w-fit p-3 bg-primary-dark text-white ml-2 first:ml-0 rounded-md hover:bg-primary cursor-pointer"
          @click="handleMediaNodeClick(node.id)"
        >
          {{ node.name }}
        </div>
      </div>
    </div>
    <FileNavigatorContextMenu
      :media-node="props.modelValue"
      :refresh="refresh"
      v-model:dialog="folderDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { CRUD_MODE } from '~/store/crud'
import { MediaNode, useMediaNodeStore } from '~/store/media-node'
import { useMediaObjectStore } from '~/store/media-object'
import FileNavigatorBreadCrumb from './FileNavigatorBreadCrumb.vue'
import FileNavigatorFolders from './FileNavigatorFolders.vue'
import FileNavigatorFiles from './FileNavigatorFiles.vue'
import FileNavigatorContextMenu from './FileNavigatorContextMenu.vue'
import Icon from '~/components/util/Icon.vue'

interface FileNavigatorProps {
  editClickHandler: Function,
  selectClickHandler: Function,
  removeClickHandler: Function,
  removeFolderClickHandler: Function,
  modelValue: MediaNode | null
  rootName?: string | null
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  rootName: null
})
const emit = defineEmits(['update:modelValue'])
const folderDialog = ref(false)
const currentMediaNode = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const mediaNodeStore = useMediaNodeStore()
const mediaObjectStore = useMediaObjectStore()
const closeDetailPanel = inject<() => {}>('closeDetailPanel')

const { refresh: getRoots } = await useAsyncData('root-media-nodes', async () => {
  await mediaNodeStore.fetchAll({
    'exists[parent]': 'false'
  })
})

const handleMediaNodeClick = async (id: string) => {
  mediaObjectStore.resetList()
  await mediaNodeStore.load(id)
  currentMediaNode.value = mediaNodeStore[CRUD_MODE.EDITION].retrieved as MediaNode
}

const handleRootClick = () => {
  currentMediaNode.value = null
  closeDetailPanel && closeDetailPanel()
}

const refresh = async (mediaNode ?: MediaNode | null) => {
  if (!currentMediaNode.value || mediaNode === null) {
    getRoots()
  } else {
    if (!!mediaNode) {
      await mediaNodeStore.load(mediaNode.id)
    } else {
      await mediaNodeStore.load(currentMediaNode.value.id)
    }
    currentMediaNode.value = mediaNodeStore[CRUD_MODE.EDITION].retrieved as MediaNode
  }
}

defineExpose({
  refresh
})
</script>
