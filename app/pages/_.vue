<template>
  <v-container fluid>
    <v-row>
      <v-col
        offset-md="1"
        offset-lg="2"
        lg="8"
        md="10"
      >
        <PageTemplate v-if="page" :page="page" />
        <Error404 v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData ({ store }) {
    await store.dispatch('page/fetchAll')
  },
  computed: {
    ...mapGetters('page', ['find']),
    page () {
      return this.find('/api/pages/' + decodeURIComponent(this.url))
    },
    url () {
      return this.$route.params ? this.$route.params.pathMatch : null
    }
  }
}
</script>
