<template>
  <v-row>
    <v-container>
      <ItemBreadcrumb v-if="selectedGalleryItem" :breadcrumb="selectedGalleryItem.breadcrumb" />
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
import ItemBreadcrumb from '~/components/admin/gallery/ItemBreadcrumb'
export default {
  components: {
    ItemBreadcrumb
  },
  layout: 'Admin',
  middleware: 'authenticated',
  fetchOnServer: false,
  async validate ({ store }) {
    const hasGalleries = store.state.gallery.galleries !== null
    if (hasGalleries) { return true }
    await store.dispatch('gallery/fetchAll')
    return true
  },
  async fetch ({ store, params }) {
    await store.dispatch('gallery/setSelectedItemFromGalleryId', params.id)
    await store.dispatch('gallery/getMediaObjectForGalleryItemId', store.state.gallery.selectedGalleryItem.id)
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
