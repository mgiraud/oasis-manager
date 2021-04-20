<template>
  <div v-if="galleryItem" class="file-navigator-breadcrumb-container">
    <span v-for="crumb in galleryItem.breadcrumb" :key="crumb['@id']" @click="handleCrumbClick(crumb)">&nbsp;>&nbsp;{{ crumb.name }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { breadcrumbItem, MediaGalleryItem } from '~/store/media_gallery_item'

@Component
export default class FileNavigatorBreadCrumbItems extends Vue {
    @Prop({ type: Object, required: false, default: null }) readonly galleryItem!: MediaGalleryItem
    @Prop({ type: Function, required: true }) readonly galleryItemClickHandler!: (id: string) => void
    @Prop({ type: Function, required: true }) readonly galleryClickHandler!: (id: string) => void
    name='file-navigator-bread-crumb-items'

    handleCrumbClick (crumb: breadcrumbItem) {
      if (crumb.type === 'item') {
        this.galleryItemClickHandler(crumb['@id'])
      } else {
        this.galleryClickHandler(crumb['@id'])
      }
    }
}
</script>

<style scoped>
.file-navigator-breadcrumb-container {
  display:inline-block;
  cursor: pointer;
}
</style>
