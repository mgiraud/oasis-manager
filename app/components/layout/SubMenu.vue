<template>
  <v-tabs v-model="tab" fixed-tabs optional show-arrows light>
    <v-tab v-for="page in findByActiveSlug" :key="page['@id']" light>
      {{ page.title }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import { findIndex } from 'lodash'
import { MenuItem, Page } from '~/store/page'

const pageModule = namespace('page')

@Component
export default class Toolbar extends Vue {
  tab: number | null = null
  @pageModule.Getter('menuItems') menuItems !: MenuItem[]
  @pageModule.Getter('findByActiveSlug') findByActiveSlug !: Page[]

  @Watch('tab')
  onTabUpdated (tabIndex: number) {
    if (tabIndex !== undefined || !this.findByActiveSlug[tabIndex]) {
      this.redirect(this.findByActiveSlug[tabIndex])
    }
  }

  mounted () {
    if (this.$route.params.pathMatch) {
      this.tab = findIndex(this.findByActiveSlug, { url: this.$route.params.pathMatch })
    }
  }

  redirect (item: Page) {
    if (item && item.url) {
      this.$router.push(item.url)
    }
  }
}
</script>
