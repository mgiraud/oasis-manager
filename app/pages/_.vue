<template>
  <v-card class="fill-height ma-md-10" elevation="5">
    <v-container fluid>
      <v-row>
        <v-col>
          <PageModel v-if="page" :page="page" />
          <Error404 v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import PageModel from '~/components/page/PageModel.vue'
import Error404 from '~/components/error/404.vue'
import { defineComponent, useContext, computed, useRoute } from '@nuxtjs/composition-api'
import { pageStore } from '~/store/PageStore'

export default defineComponent({
  components: {
    PageModel,
    Error404
  },
  setup() {
    pageStore.setContext(useContext())
    const route = useRoute()

    const url = computed(() => {
      return route.value.params ? route.value.params.pathMatch : null
    })

    const page = computed(() => {
      return !pageStore.getState().isLoading && url.value !== null ? pageStore.find('/api/pages/' + decodeURIComponent(url.value)) : null
    })

    return {
      page
    }
  },
  head() {
    return {
      title: this.page ? this.page.title : 'Le vide intersidéral'
    }
  }
})
</script>
