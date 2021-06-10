<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="navigator-title" @click="handleRootClick">
          <v-btn rounded depressed small>Navigateur de fichier</v-btn>
        </h3><file-navigator-bread-crumb :media-node="currentMediaNode" :media-node-click-handler="handleMediaNodeClick" />
      </v-col>
    </v-row>
    <v-row v-if="currentMediaNode" @contextmenu.prevent="onRightClick">
      <v-col cols="12">
        <h4>Dossiers</h4>
      </v-col>
      <v-col cols="12">
        <file-navigator-folders :media-node="currentMediaNode" :handle-click="handleMediaNodeClick" v-if="currentMediaNode.children.length > 0"/>
        <p v-else>Aucun dossier</p>
      </v-col>
    </v-row>
    <v-row v-if="currentMediaNode && currentMediaNode.mediaObjects.length > 0">
      <v-col cols="12">
        <h4>Fichiers</h4>
      </v-col>
      <v-col>
        <file-navigator-files :select-click-handler="selectClickHandler" :edit-click-handler="editClickHandler" :media-node="currentMediaNode" />
      </v-col>
    </v-row>
    <v-row v-if="!currentMediaNode">
      <v-col cols="12">
        <h4>Sélectionner un dossier</h4>
      </v-col>
      <v-col cols="3" v-for="node in rootMediaNodes" :key="node['@id']">
        <v-btn @click="handleMediaNodeClick(node['@id'])">
          {{ node.name }}
        </v-btn>
      </v-col>
    </v-row>
    <file-navigator-context-menu ref="file-navigator-context-menu" :media-node="currentMediaNode" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop, InjectReactive } from 'nuxt-property-decorator'
import FileNavigatorBreadCrumb from './FileNavigatorBreadCrumb.vue'
import FileNavigatorFolders from './FileNavigatorFolders.vue'
import FileNavigatorFiles from './FileNavigatorFiles.vue'
import FileNavigatorContextMenu from './FileNavigatorContextMenu.vue'
import { MediaObject } from '~/store/media_object'
import { MediaNode } from '~/store/media_node'

const mediaNodeModule = namespace('media_node')
const mediaObjectModule = namespace('media_object')

@Component({
  components: {
    FileNavigatorBreadCrumb,
    FileNavigatorFolders,
    FileNavigatorFiles,
    FileNavigatorContextMenu
  }
})
export default class FileNavigator extends Vue {
    @Prop({ type: Object, required: false }) readonly currentMediaNode!: MediaNode| null
    @Prop({ type: Function, required: true }) readonly editClickHandler!: (item: MediaObject) => void
    @Prop({ type: Function, required: true }) readonly selectClickHandler!: (item: MediaObject) => void
    @Prop({ type: String, required: false, default: null }) readonly rootName!: string | null
    @InjectReactive() readonly closeDetailPanel !: () => void
    @mediaNodeModule.Action('fetchAll') fetchRootMediaNode!: (options?: {[propertyPath: string]: string | number}) => MediaNode[]
    @mediaNodeModule.Action('load') fetchMediaNode!: (id: string) => MediaNode
    @mediaNodeModule.Getter('list') rootMediaNodes !: MediaNode[]
    @mediaNodeModule.Getter('find') findMediaGalleriesById !: (id: string) => MediaNode
    @mediaObjectModule.Action('resetList') resetMediaObjects !: () => {}

    async fetch () {
      return await this.fetchRootMediaNode({
        'exists[parent]': false
      })
    }

    async handleMediaNodeClick (id: string) {
      this.resetMediaObjects()
      this.$emit('update:current-media-node', await this.fetchMediaNode(id))
    }

    handleRootClick () {
      this.$emit('update:current-media-node', null)
      this.closeDetailPanel()
    }

    async refresh () {
      if (!this.currentMediaNode) {
        return
      }
      this.$emit('update:current-media-node', await this.fetchMediaNode(this.currentMediaNode['@id']))
      this.$nextTick(() => {
        this.reload()
      })
    }

    reload () {
      const savedMediaNode = this.currentMediaNode
      this.$emit('update:current-media-node', null)
      this.$nextTick(() => {
        this.$emit('update:current-media-node', savedMediaNode)
      })
    }

    onRightClick (e: MouseEvent) {
      const fileNavigatorContextMenu = this.$refs['file-navigator-context-menu'] as FileNavigatorContextMenu
      fileNavigatorContextMenu.showMenu(e)
    }
}
</script>

<style scoped>
h3.navigator-title {
  display: inline-block;
  cursor: pointer;
}
</style>
