<template>
  <v-container>
    <v-row>
      <v-col>
        <h3
          class="navigator-title"
          @click="handleRootClick"
        >
          <v-btn
            rounded
            depressed
            small
          >
            Navigateur de fichier
          </v-btn>
        </h3>
        <file-navigator-bread-crumb
          :media-node="currentMediaNode"
          :media-node-click-handler="handleMediaNodeClick"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="currentMediaNode"
      @contextmenu.prevent="onRightClick"
    >
      <v-col cols="12">
        <h4>Dossiers</h4>
      </v-col>
      <v-col cols="12">
        <file-navigator-folders
          v-if="currentMediaNode.children.length > 0"
          :media-node="currentMediaNode"
          :handle-click="handleMediaNodeClick"
        />
        <p v-else>
          Aucun dossier
        </p>
      </v-col>
    </v-row>
    <v-row v-if="currentMediaNode && currentMediaNode.mediaObjects.length > 0">
      <v-col cols="12">
        <h4>Fichiers</h4>
      </v-col>
      <v-col>
        <file-navigator-files
          :select-click-handler="selectClickHandler"
          :edit-click-handler="editClickHandler"
          :media-node="currentMediaNode"
        />
      </v-col>
    </v-row>
    <v-row v-if="!currentMediaNode">
      <v-col cols="12">
        <h4>Sélectionner un dossier</h4>
      </v-col>
      <v-col
        v-for="node in rootMediaNodes"
        :key="node['@id']"
        cols="3"
      >
        <v-btn @click="handleMediaNodeClick(node['@id'])">
          {{ node.name }}
        </v-btn>
      </v-col>
    </v-row>
    <file-navigator-context-menu
      ref="fileNavigatorContextMenu"
      :media-node="currentMediaNode"
      :refresh="refresh"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useContext, inject, useFetch, nextTick, ref, Ref } from '@nuxtjs/composition-api'
import FileNavigatorBreadCrumb from './FileNavigatorBreadCrumb.vue'
import FileNavigatorFolders from './FileNavigatorFolders.vue'
import FileNavigatorFiles from './FileNavigatorFiles.vue'
import FileNavigatorContextMenu from './FileNavigatorContextMenu.vue'
import { mediaNodeStore, MediaNode } from '~/custom-store/MediaNodeStore'
import { mediaObjectStore } from '~/custom-store/MediaObjectStore'

export default defineComponent({
  components: {
    FileNavigatorBreadCrumb,
    FileNavigatorFolders,
    FileNavigatorFiles,
    FileNavigatorContextMenu
  },
  props: {
    editClickHandler: {
      type: Function,
      required: true
    },
    selectClickHandler: {
      type: Function,
      required: true
    },
    currentMediaNode: {
      type: Object as () => MediaNode | undefined,
      default: null
    },
    rootName: {
      type: String,
      default: null
    }
  },
  setup (props, { emit }) {
    const context = useContext()
    mediaNodeStore.setContext(context)
    mediaObjectStore.setContext(context)

    const closeDetailPanel = inject<() => {}>('closeDetailPanel')
    const fileNavigatorContextMenu = ref(null) as Ref<null | typeof FileNavigatorContextMenu>

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

    return {
      closeDetailPanel,
      fileNavigatorContextMenu,
      rootMediaNodes: mediaNodeStore.rootNodes,
      handleMediaNodeClick,
      handleRootClick,
      refresh,
      reload,
      onRightClick
    }
  }
})
</script>

<style scoped>
h3.navigator-title {
  display: inline-block;
  cursor: pointer;
}
</style>
