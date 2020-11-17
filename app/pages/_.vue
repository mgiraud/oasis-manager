<template>
  <v-container fluid fill-height>
    <PageTemplate v-if="page !== null" :page="page" />
    <Error404 v-else />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData ({ store }) {
    await store.dispatch('page/getPages')
  },
  computed: {
    ...mapGetters('page', ['getPageByUrl']),
    page () {
      return this.getPageByUrl(this.url)
    },
    url () {
      return this.$route.params ? this.$route.params.pathMatch : null
    }
  }
}
</script>
