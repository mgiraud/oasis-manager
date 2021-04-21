<template>
  <v-container>
    <v-row>
      <v-col v-for="item in mediaObjects" :key="item['@id']">
        <v-img
          v-if="item.isImage"
          :src="item.contentUrl"
          max-height="200"
          max-width="200"
          class="file-navigator-object"
          @click="clickHandler(item)"
        />
        <span v-else class="file-navigator-object" @click="clickHandler(item)">{{ item.filePath }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace, Watch } from 'nuxt-property-decorator'
import { MediaGalleryItem } from '~/store/media_gallery_item'
import { MediaObject } from '~/store/media_object'

const mediaObjectModule = namespace('media_object')

@Component
export default class FileNavigatorFiles extends Vue {
  @Prop({ type: Object, required: true }) readonly galleryItem!: MediaGalleryItem
  @Prop({ type: Function, required: true }) readonly clickHandler!: (item: MediaObject) => void
  @mediaObjectModule.Action('fetchAll') fetchMediaObjects !: (options?: {[propertyPath: string]: string | number}) => MediaObject[]
  @mediaObjectModule.Getter('list') mediaObjects !: MediaObject[]

  loadObjects () {
    if (this.galleryItem !== null) {
      this.fetchMediaObjects({
        mediaGalleryItem: this.galleryItem['@id']
      })
    }
  }

  mounted () {
    this.loadObjects()
  }

  @Watch('galleryItem')
  onGalleryItemChange (galleryItem: MediaGalleryItem | null) {
    this.loadObjects()
  }
}
</script>

<style scoped>
.file-navigator-object {
  cursor: pointer;
}
</style>
