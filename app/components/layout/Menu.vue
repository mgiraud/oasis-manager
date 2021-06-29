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
import { MenuItem } from '~/custom-store/PageStore'
import {
  defineComponent, onMounted, Ref, ref, useContext, useRoute, useRouter, watch
} from '@nuxtjs/composition-api'
import { pageStore } from '~/custom-store/PageStore'

export default defineComponent({
  setup () {
    pageStore.setContext(useContext())
    const router = useRouter()
    const route = useRoute()
    const tab = ref(undefined) as Ref<number | null | undefined>

    const redirectOrToggleSubMenu = (item: MenuItem) => {
      if (item.url) {
        router.push(item.url)
        pageStore.setActiveSlug(null)
      } else if (pageStore.getState().activeSlug !== item.slug) {
        pageStore.setActiveSlug(item.slug)
      } else {
        pageStore.setActiveSlug(null)
      }
    }

    onMounted(() => {
      if (route.value.params.pathMatch) {
        const index = findIndex(pageStore.menuItems.value, { url: route.value.params.pathMatch })
        tab.value = index === -1 ? undefined : index
      }
    })

    // @ts-ignore
    watch(tab, (tabIndex: number | undefined) => {
      if (tabIndex === undefined || !pageStore.menuItems.value[tabIndex]) {
        pageStore.setActiveSlug(null)
      } else {
        redirectOrToggleSubMenu(pageStore.menuItems.value[tabIndex])
      }
    })

    watch(route, (route: Route | null) => {
      if (route === null) {
        return
      }
      // Check that static page is in menu
      const staticPageInMenu = pageStore.menuItems.value.find((menuItem: MenuItem) => {
        return menuItem.url === route.name
      })

      // Check that dynamic page is in menu
      const dynamicPageIsInMenu = pageStore.menuItems.value.find((menuItem: MenuItem) => {
        return menuItem.url === route.params.pathMatch
      })

      const isInMenu = staticPageInMenu || dynamicPageIsInMenu
      if (!isInMenu) {
        tab.value = undefined
      }
    })

    return {
      tab,
      menuItems: pageStore.menuItems,
      pageState: pageStore.getState(),
      setActiveSlug: (slug: string | null) => pageStore.setActiveSlug(slug),
      redirectOrToggleSubMenu
    }
  }
})
</script>
