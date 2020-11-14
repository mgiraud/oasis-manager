<template>
  <v-row>
    <AdminGalleryFileUploadForm />
  </v-row>
</template>

<script>

export default {
  layout: 'admin',
  middleware: 'authenticated',
  fetchOnServer: false
  // async validate ({ store, $repository }) {
  //   const hasGalleries = store.state.gallery.galleries !== null
  //   if (hasGalleries) { return true }
  //   await store.dispatch('gallery/getGalleries', { $repository })
  //   return true
  // },
  // fetch ({ store, params, $repository }) {
  //   return store.dispatch('gallery/setSelectedGalleryFromItem', { galleryId: params.id, $repository })
  // }
}
</script>
