<template>
  <v-card class="fill-height ma-md-10" elevation="5">
    <v-container fluid>
      <v-row>
        <v-col>
          <Template v-if="page" :page="page" />
          <Error404 v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Template from '../components/page/Template'
import Error404 from '../components/error/404'
export default {
  components: {
    Template,
    Error404
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
