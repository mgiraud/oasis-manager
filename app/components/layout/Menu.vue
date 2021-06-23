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
    <v-tab
      v-for="item in menuItems"
      :key="item.name"
      class="primary--text text--darken-4"
    >
      {{ item.name }}
      <v-icon v-if="!item.url && pageState.activeSlug !== item.slug">
        ri-arrow-drop-down-fill
      </v-icon>
      <v-icon v-if="!item.url && pageState.activeSlug === item.slug">
        ri-arrow-drop-up-fill
      </v-icon>
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { findIndex } from 'lodash'
import { Route } from 'vue-router'
import { MenuItem } from '~/store/page'
import {
  defineComponent, ref, useContext
} from '@nuxtjs/composition-api'
import { pageStore } from '~/store/PageStore'

export default defineComponent({
  setup () {
    pageStore.setContext(useContext())

    return {
      menuItems: pageStore.menuItems,
      pageState: pageStore.getState(),
      setActiveSlug: (slug: string | null) => pageStore.setActiveSlug(slug)
    }
  },
  data () {
    return {
      tab: undefined
    }
  },
  methods: {
    redirectOrToggleSubMenu (item: MenuItem) {
      if (item.url) {
        this.$router.push(item.url)
        this.setActiveSlug(null)
      } else if (this.pageState.activeSlug !== item.slug) {
        this.setActiveSlug(item.slug)
      } else {
        this.setActiveSlug(null)
      }
    }
  },
  watch: {
    tab (tabIndex: number | undefined) {
      if (tabIndex === undefined || !this.menuItems[tabIndex]) {
        this.setActiveSlug(null)
      } else {
        this.redirectOrToggleSubMenu(this.menuItems[tabIndex])
      }
    },
    $route (route: Route | null) {
      if (route === null) {
        return
      }
      // Check that static page is in menu
      const staticPageInMenu = this.menuItems.find((menuItem: MenuItem) => {
        return menuItem.url === route.name
      })

      // Check that dynamic page is in menu
      const dynamicPageIsInMenu = this.menuItems.find((menuItem: MenuItem) => {
        return menuItem.url === route.params.pathMatch
      })

      const isInMenu = staticPageInMenu || dynamicPageIsInMenu
      if (!isInMenu) {
        this.tab = undefined
      }
    },
  },
  mounted () {
    if (this.$route.params.pathMatch) {
      const index = findIndex(this.menuItems, { url: this.$route.params.pathMatch })
      this.tab = index === -1 ? undefined : index
    }
  }
})

// const pageModule = namespace('page')
//
// @Component
// export default class Toolbar extends Vue {
//   tab: number | null = null
//
//   @pageModule.State('activeSlug') activeSlug !: string | null
//   @pageModule.Getter('menuItems') menuItems !: MenuItem[]
//   @pageModule.Mutation('setActiveSlug') setActiveSlug !: (slug: string | null) => void
//
//   @Watch('tab')
//   onTabUpdate (tabIndex: number) {
//     if (tabIndex === undefined || !this.menuItems[tabIndex]) {
//       this.setActiveSlug(null)
//     } else {
//       this.redirectOrToggleSubMenu(this.menuItems[tabIndex])
//     }
//   }
//
//   @Watch('$route')
//   onRouteChange (route: Route | null) {
//     if (route === null) {
//       return
//     }
//     // Check that static page is in menu
//     const staticPageInMenu = this.menuItems.find((menuItem: MenuItem) => {
//       return menuItem.url === route.name
//     })
//
//     // Check that dynamic page is in menu
//     const dynamicPageIsInMenu = this.menuItems.find((menuItem: MenuItem) => {
//       return menuItem.url === route.params.pathMatch
//     })
//
//     const isInMenu = staticPageInMenu || dynamicPageIsInMenu
//     if (!isInMenu) {
//       this.tab = null
//     }
//   }
//
//   mounted () {
//     if (this.$route.params.pathMatch) {
//       this.tab = findIndex(this.menuItems, { url: this.$route.params.pathMatch })
//     }
//   }
//
//   redirectOrToggleSubMenu (item: MenuItem) {
//     if (item.url) {
//       this.$router.push(item.url)
//       this.setActiveSlug(null)
//     } else if (this.activeSlug !== item.slug) {
//       this.setActiveSlug(item.slug)
//     } else {
//       this.setActiveSlug(null)
//     }
//   }
// }
</script>
