<template>
  <v-container>
    <AdminGalleryItemBreadcrumb v-if="!!selectedGalleryItem" :breadcrumb="selectedGalleryItem.breadcrumb" />
    <v-row>
      <v-col v-for="mediaObject in getMediaObjectsForSelectedGalleryItem" :key="mediaObject['@id']">
        {{ mediaObject['@id'] }}
        <v-img :src="mediaObject.contentUrl" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="child in selectedGalleryItem.children" :key="child['@id']">
        <nuxt-link :to="`/admin/gallery/folders/${child.id}`">
          {{ child.name }}
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  fetchOnServer: false,
  async fetch ({ store, params, $repository }) {
    await store.dispatch('gallery/setSelectedItemId', { itemId: params.id, $repository })
    if (store.state.gallery.selectedGalleryItem) {
      await store.dispatch('gallery/getMediaObjectForGalleryItemId', { itemId: store.state.gallery.selectedGalleryItem.id, $repository })
    }
  },
  computed: {
    ...mapGetters('gallery', [
      'getMediaObjectsForSelectedGalleryItem'
    ]),
    ...mapState('gallery', [
      'selectedGalleryItem'
    ])
  }
}
</script>
