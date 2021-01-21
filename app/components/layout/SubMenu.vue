<template>
  <v-tabs v-model="tab" fixed-tabs optional show-arrows>
    <v-tab v-for="page in findByActiveSlug" :key="page['@id']" show-arrows>
      {{ page.title }}
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
import { findIndex } from 'lodash'

export default {
  resourcePrefix: '/api/pages/',
  data: () => ({
    tab: null
  }),
  computed: {
    ...mapGetters('page', ['menuItems', 'findByActiveSlug'])
  },
  watch: {
    tab (tabIndex) {
      if (tabIndex !== undefined || !this.findByActiveSlug[tabIndex]) {
        this.redirect(this.findByActiveSlug[tabIndex])
      }
    }
  },
  mounted () {
    if (this.$route.params.pathMatch) {
      this.tab = findIndex(this.findByActiveSlug, { url: this.$route.params.pathMatch })
    }
  },
  methods: {
    redirect (item) {
      if (item) {
        this.$router.push(item.url)
      }
    }
  }
}
</script>
