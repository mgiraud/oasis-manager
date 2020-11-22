<template>
  <v-card class="fill-height ma-md-10" elevation="5">
    <v-container fluid>
      <v-row>
        <v-col>
          <PageTemplate v-if="page" :page="page" />
          <Error404 v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
