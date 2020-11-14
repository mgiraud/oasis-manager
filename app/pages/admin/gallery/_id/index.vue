<template>
  <v-row>
    <v-container>
      <v-row>
        <v-col v-for="mediaObject in getMediaObjectsForSelectedGalleryItem" :key="mediaObject['@id']">
          {{ mediaObject['@id'] }}
          <v-img :src="mediaObject.contentUrl" />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="child in selectedGalleryItem.children" :key="child['@id']">
          <nuxt-link :to="`folders/${child.id}`">
            {{ child.name }}
          </nuxt-link>
        </v-col>
      </v-row>
      <v-row>
        <AdminGalleryFileUploadForm />
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  fetchOnServer: false,
  async validate ({ store, $repository }) {
    const hasGalleries = store.state.gallery.galleries !== null
    if (hasGalleries) { return true }
    await store.dispatch('gallery/getGalleries', { $repository })
    return true
  },
  async fetch ({ store, params, $repository }) {
    await store.dispatch('gallery/setSelectedItemFromGalleryId', { galleryId: params.id, $repository })
    await store.dispatch('gallery/getMediaObjectForGalleryItemId', { itemId: store.state.gallery.selectedGalleryItem.id, $repository })
  },
  computed: {
    ...mapGetters('gallery', [
      'getMediaObjectsForSelectedGalleryItem' // -> this.someGetter
    ]),
    ...mapState('gallery', [
      'selectedGalleryItem'
    ])
  }
}
</script>
