<template>
  <div class="p-3 rounded-sm flex flex-col w-full md:w-4/5 self-center">
    <div class="text-3xl text-primary-dark font-marker py-3" v-if="page">{{page.title}}</div>
    <div class="js-content" v-html="page.content" v-if="page"></div>
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

<style>
.js-content img {
  display: inline-block;
}
</style>
