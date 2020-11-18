<template>
  <v-container>
    <v-row>
      <div v-for="gallery in galleries" :key="gallery.id">
        <nuxt-link :to="`/admin/gallery/${gallery.id}`">
          {{ gallery.name }}
        </nuxt-link>
      </div>
    </v-row>
    <v-row>
      <nuxt-child v-if="!!$route.params.id" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_GALLERIES']
  },
  async fetch ({ store }) {
    await store.dispatch('gallery/fetchAll')
  },
  computed: {
    ...mapGetters('gallery', {
      galleries: 'list'
    })
  }
}
</script>
