<template>
  <v-tabs
    v-model="tab"
    fixed-tabs
    optional
    show-arrows
    background-color="primary"
    color="white"
  >
    <v-tab v-for="page in findByActiveSlug" :key="page['@id']" class="white--text">
      {{ page.title }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { findIndex } from 'lodash'
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { Page, pageStore } from '~/store/PageStore'

export default defineComponent({
  setup () {
    pageStore.setContext(useContext())

    return {
      findByActiveSlug: pageStore.findByActiveSlug
    }
  },
  data() {
    return {
      tab: undefined
    }
  },
  methods: {
    redirect (item: Page) {
      if (item && item.url) {
        this.$router.push(item.url)
      }
    }
  },
  watch: {
    tab (tabIndex: number | undefined) {
      if (tabIndex !== undefined && this.findByActiveSlug[tabIndex]) {
        this.redirect(this.findByActiveSlug[tabIndex])
      }
    }
  },
  created () {
    if (this.$route.params.pathMatch) {
      this.tab = findIndex(this.findByActiveSlug, { url: this.$route.params.pathMatch })
    }
  },
})
</script>
