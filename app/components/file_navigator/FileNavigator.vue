<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="navigator-title" @click="handleRootClick">
          Navigateur de fichier
        </h3><file-navigator-bread-crumb :gallery-item="currentGalleryItem" :gallery-click-handler="handleGalleryClick" :gallery-item-click-handler="handleGalleryItemClick" />
      </v-col>
    </v-row>
    <v-row>
      <v-toolbar v-if="!currentGallery" dense>
        <v-overflow-btn
          v-model="currentGallery"
          :items="mediaGalleries"
          item-text="name"
          :item-value="getMediaGallery"
          label="Sélectionner une gallerie..."
          hide-details
          class="pa-0"
          overflow
        />
      </v-toolbar>
    </v-row>
    <v-row v-if="currentGalleryItem && currentGalleryItem.children.length > 0">
      <v-col cols="12">
        <h4>Dossiers</h4>
      </v-col>
      <v-col cols="12">
        <file-navigator-folders :gallery-item="currentGalleryItem" :handle-click="handleGalleryItemClick" />
      </v-col>
    </v-row>
    <v-row v-if="currentGalleryItem && currentGalleryItem.mediaObjects.length > 0">
      <v-col cols="12">
        <h4>Fichiers</h4>
      </v-col>
      <v-col>
        <file-navigator-files :click-handler="clickHandler" :gallery-item="currentGalleryItem" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop, Watch } from 'nuxt-property-decorator'
import FileNavigatorBreadCrumb from './FileNavigatorBreadCrumb.vue'
import FileNavigatorFolders from './FileNavigatorFolders.vue'
import FileNavigatorFiles from './FileNavigatorFiles.vue'
import { MediaObject } from '~/store/media_object'
import { MediaGalleryItem } from '~/store/media_gallery_item'
import { MediaGallery } from '~/store/media_gallery'

const mediaGalleryModule = namespace('media_gallery')
const mediaGalleryItemModule = namespace('media_gallery_item')
const mediaObjectModule = namespace('media_object')

@Component({
  components: {
    FileNavigatorBreadCrumb,
    FileNavigatorFolders,
    FileNavigatorFiles
  }
})
export default class FileNavigator extends Vue {
    currentGallery: MediaGallery | null = null
    currentGalleryItem: MediaGalleryItem | null = null
    @Prop({ type: Function, required: true }) readonly clickHandler!: (item: MediaObject) => void
    @Prop({ type: String, required: false, default: null }) readonly rootName!: string | null
    @mediaGalleryModule.Action('fetchAll') fetchAllGalleries!: (options?: {[propertyPath: string]: string | number}) => MediaGallery[]
    @mediaGalleryItemModule.Action('load') fetchGalleryItem!: (id: string) => MediaGalleryItem
    @mediaGalleryModule.Getter('list') mediaGalleries !: MediaGallery[]
    @mediaGalleryModule.Getter('find') findMediaGalleriesById !: (id: string) => MediaGallery
    @mediaObjectModule.Action('resetList') resetMediaObjects !: () => {}

    async fetch () {
      return await this.fetchAllGalleries()
    }

    getMediaGallery (value: MediaGallery) {
      return value
    }

    @Watch('currentGallery')
    async onGalleryChange (gallery: MediaGallery | null | undefined) {
      this.resetMediaObjects()
      if (!gallery) {
        this.currentGalleryItem = null
      } else {
        this.currentGalleryItem = await this.fetchGalleryItem(gallery.rootItem)
      }
    }

    async handleGalleryClick (id: string) {
      this.currentGallery = this.findMediaGalleriesById(id)
      this.currentGalleryItem = await this.fetchGalleryItem(this.currentGallery.rootItem)
    }

    async handleGalleryItemClick (id: string) {
      this.resetMediaObjects()
      this.currentGalleryItem = await this.fetchGalleryItem(id)
    }

    handleRootClick () {
      this.currentGallery = null
      this.currentGalleryItem = null
    }
}
</script>

<style scoped>
h3.navigator-title {
  display: inline-block;
  cursor: pointer;
}
</style>
