<template>
  <v-tabs
    v-model="tab"
    fixed-tabs
    optional
    light
    background-color="info"
    slider-color="primary darken-4"
    show-arrows
  >
    <v-tab v-for="item in menuItems" :key="item.name" class="primary--text text--darken-4">
      {{ item.name }}
      <v-icon v-if="!item.url && activeSlug !== item.slug">
        ri-arrow-drop-down-fill
      </v-icon>
      <v-icon v-if="!item.url && activeSlug === item.slug">
        ri-arrow-drop-up-fill
      </v-icon>
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import { findIndex } from 'lodash'
import { MenuItem } from '~/store/page'

const pageModule = namespace('page')

@Component
export default class Toolbar extends Vue {
  tab: number | null = null

  @pageModule.State('activeSlug') activeSlug !: string | null
  @pageModule.Getter('menuItems') menuItems !: MenuItem[]
  @pageModule.Mutation('setActiveSlug') setActiveSlug !: (slug: string | null) => void

  @Watch('tab')
  onTabUpdate (tabIndex: number) {
    if (tabIndex === undefined || !this.menuItems[tabIndex]) {
      this.setActiveSlug(null)
    } else {
      this.redirectOrToggleSubMenu(this.menuItems[tabIndex])
    }
  }

  mounted () {
    if (this.$route.params.pathMatch) {
      this.tab = findIndex(this.menuItems, { url: this.$route.params.pathMatch })
    }
  }

  redirectOrToggleSubMenu (item: MenuItem) {
    if (item.url) {
      this.$router.push(item.url)
      this.setActiveSlug(null)
    } else if (this.activeSlug !== item.slug) {
      this.setActiveSlug(item.slug)
    } else {
      this.setActiveSlug(null)
    }
  }
}
</script>
