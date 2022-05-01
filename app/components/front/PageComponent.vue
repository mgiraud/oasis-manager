<template>
  <div class="p-3 bg-white rounded-sm flex flex-col">
    <div class="text-lg text-primary-dark font-marker py-3">{{page.title}}</div>
    <div class="" v-html="page.content"></div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'
import { Page } from '~/store/page'

const props = withDefaults(defineProps({
  page: Object as PropType<Page> | null
}), {
  page: null
})
</script>
