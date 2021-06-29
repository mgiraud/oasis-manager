<template>
  <v-tabs
    v-model="tab"
    fixed-tabs
    optional
    show-arrows
    background-color="primary"
    color="white"
  >
    <v-tab
      v-for="page in findByActiveSlug"
      :key="page['@id']"
      class="white--text"
    >
      {{ page.title }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { findIndex } from 'lodash'
import { defineComponent, onMounted, Ref, ref, useContext, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import { Page, pageStore } from '~/custom-store/PageStore'

export default defineComponent({
  setup () {
    const tab = ref(null) as Ref<number | null>
    const router = useRouter()
    const route = useRoute()
    pageStore.setContext(useContext())

    const redirect = (item: Page) => {
      if (item && item.url) {
        router.push(item.url)
      }
    }

    // @ts-ignore
    watch(tab, (tabIndex: number) => {
      if (pageStore.findByActiveSlug.value[tabIndex]) {
        redirect(pageStore.findByActiveSlug.value[tabIndex])
      }
    })

    onMounted(() => {
      tab.value = findIndex(pageStore.findByActiveSlug.value, { url: route.value.params.pathMatch })
    })

    return {
      findByActiveSlug: pageStore.findByActiveSlug,
      tab,
      redirect
    }
  }
})
</script>
