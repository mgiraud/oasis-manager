<template>
  <div>{{page}}</div>
</template>

<script setup lang="ts">
import { usePageStore } from '~/store/page'

const route = useRoute()
const pageStore = usePageStore()

const page = pageStore.findBySlug(route.params.slug[0])
</script>
