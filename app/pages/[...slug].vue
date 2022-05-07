<template>
  <div class="flex bg-white flex-auto flex-col p-3">
    <PageComponent :page="page" v-if="page"/>
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from '~/store/page'
import PageComponent from '~/components/front/PageComponent'

const route = useRoute()
const pageStore = usePageStore()
const page = pageStore.findBySlug(route.params.slug[0])
</script>
