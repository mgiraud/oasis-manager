<template>
  <div class="flex flex-col">
    <div class="flex-auto">
        <h3
          class="navigator-title"
          @click="handleRootClick"
        >
          <button>
            Navigateur de fichier
          </button>
        </h3>
        <FileNavigatorBreadCrumb
          :media-node="props.currentMediaNode"
          :media-node-click-handler="handleMediaNodeClick"
        />
    </div>
    <div
      class="flex-auto flex flex-col"
      v-if="props.currentMediaNode"
      @contextmenu.prevent="onRightClick"
    >
      <div>
        <h4>Dossiers</h4>
      </div>
      <div>
        <FileNavigatorFolders
          v-if="props.currentMediaNode.children.length > 0"
          :media-node="props.currentMediaNode"
          :handle-click="handleMediaNodeClick"
        />
        <p v-else>
          Aucun dossier
        </p>
      </div>
    </div>
    <div class="flex-auto" v-if="props.currentMediaNode && props.currentMediaNode.mediaObjects.length > 0">
      <div>
        <h4>Fichiers</h4>
      </div>
      <div>
        <FileNavigatorFiles
          :select-click-handler="props.selectClickHandler"
          :edit-click-handler="props.editClickHandler"
          :media-node="props.currentMediaNode"
        />
      </div>
    </div>
    <div class="flex-auto" v-if="!props.currentMediaNode">
      <div>
        <h4>Sélectionner un dossier</h4>
      </div>
      <div
        v-for="node in props.rootMediaNodes"
        :key="node['@id']"
      >
        <button @click="handleMediaNodeClick(node['@id'])">
          {{ node.name }}
        </button>
      </div>
    </div>
    <FileNavigatorContextMenu
      ref="fileNavigatorContextMenu"
      :media-node="props.currentMediaNode"
      :refresh="refresh"
    />
  </div>
</template>

<script setup lang="ts">
import { MediaNode, useMediaNodeStore } from '~/store/media-node'
import { useMediaObjectStore } from '~/store/media-object'
import FileNavigatorBreadCrumb from './FileNavigatorBreadCrumb.vue'
import FileNavigatorFolders from './FileNavigatorFolders.vue'
import FileNavigatorFiles from './FileNavigatorFiles.vue'
import FileNavigatorContextMenu from './FileNavigatorContextMenu.vue'

interface FileNavigatorProps {
  editClickHandler: Function,
  selectClickHandler: Function
  currentMediaNode?: MediaNode | null
  rootName?: string | null
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  currentMediaNode: null,
  rootName: null
})

const mediaNodeStore = useMediaNodeStore()
const mediaObjectStore = useMediaObjectStore()
const closeDetailPanel = inject<() => {}>('closeDetailPanel')
const fileNavigatorContextMenu = ref(null) as Ref<null | typeof FileNavigatorContextMenu>

const emit = defineEmits<{
  (e: 'update:current-media-node', value: MediaNode | undefined): void
}>()

useFetch(() => {
  mediaNodeStore.fetchAll({
    'exists[parent]': 'false'
  })
})

const handleMediaNodeClick = async (id: string) => {
  mediaObjectStore.resetList()
  emit('update:current-media-node', await mediaNodeStore.load(id))
}

const handleRootClick = () => {
  emit('update:current-media-node', undefined)
  closeDetailPanel && closeDetailPanel()
}

const refresh = async () => {
  if (!props.currentMediaNode) {
    return
  }
  emit('update:current-media-node', await mediaNodeStore.load(props.currentMediaNode['@id']))
  nextTick(() => {
    reload()
  })
}

const reload = () => {
  const savedMediaNode = props.currentMediaNode
  emit('update:current-media-node', undefined)
  nextTick(() => {
    emit('update:current-media-node', savedMediaNode)
  })
}

const onRightClick = (e: MouseEvent) => {
  // @ts-ignore
  fileNavigatorContextMenu.value?.showMenu(e)
}
</script>

<style scoped>
h3.navigator-title {
  display: inline-block;
  cursor: pointer;
}
</style>
