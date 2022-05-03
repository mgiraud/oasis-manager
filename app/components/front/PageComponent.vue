<template>
  <div class="p-3 rounded-sm flex flex-col">
    <div class="text-lg text-primary-dark font-marker py-3">{{page.title}}</div>
    <div class="" v-html="page.content"></div>
  </div>
</template>

<script setup lang="ts">
import { Page } from '~/store/page'

interface PageProps {
  page: Page | null
}

const props = withDefaults(defineProps<PageProps>(), {
  page: null
})
</script>
