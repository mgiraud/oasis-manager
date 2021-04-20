<template>
  <v-container>
    <v-row>
      <v-col v-for="child in galleryItem.children" :key="child['@id']">
        <v-btn @click="handleClick(child['@id'])">
          {{ child.name }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { MediaGalleryItem } from '~/store/media_gallery_item'

@Component
export default class FileNavigatorFolders extends Vue {
    @Prop({ type: Object, required: true }) readonly galleryItem!: MediaGalleryItem
    @Prop({ type: Function, required: true }) readonly handleClick!: (id: string) => {}
    name='file-navigator-bread-crumb-items'
    childItem: MediaGalleryItem | null = null

    getMediaGalleryItem (value: MediaGalleryItem) {
      return value
    }
}
</script>
