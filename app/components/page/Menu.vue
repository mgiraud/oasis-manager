<template>
  <v-tabs v-model="tab" fixed-tabs optional>
    <v-tab v-for="item in menuItems" :key="item.name">
      {{ item.name }}
      <v-icon v-if="!item.url && activeSlug !== item.slug">
        mdi-menu-down
      </v-icon>
      <v-icon v-if="!item.url && activeSlug === item.slug">
        mdi-menu-up
      </v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { findIndex } from 'lodash'

export default {
  resourcePrefix: '/api/pages/',
  data: () => ({
    tab: null
  }),
  computed: {
    ...mapState('page', ['activeSlug']),
    ...mapGetters('page', ['menuItems'])
  },
  mounted () {
    if (this.$route.params.pathMatch) {
      this.tab = findIndex(this.menuItems, { url: this.$route.params.pathMatch })
    }
  },
  methods: {
    ...mapMutations('page', ['setActiveSlug']),
    redirectOrToggleSubMenu (item) {
      if (item.url) {
        this.$router.push(item.url)
        this.setActiveSlug(null)
      } else if (this.activeSlug !== item.slug) {
        this.setActiveSlug(item.slug)
      } else {
        this.setActiveSlug(null)
      }
    }
  },
  watch: {
    tab (tabIndex) {
      if (tabIndex === undefined || !this.menuItems[tabIndex]) {
        this.setActiveSlug(null)
      } else {
        this.redirectOrToggleSubMenu(this.menuItems[tabIndex])
      }
    }
  }
}
</script>
