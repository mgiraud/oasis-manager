<template>
    <img v-if="mediaObject" :src="mediaObject.contentUrl" :alt="mediaObject.customName" class="h-full w-full object-contain rounded-sm"/>
    <div v-else :class="{[`h-${maxHeight}`]: !!maxHeight}" class="w-full bg-primary relative before:text-white before:text-2xl before:font-bold before:content-['?'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 rounded-sm shadow-sm"></div>
</template>

<script setup lang="ts">
  import { MediaObject } from '~/store/media-object'

  defineProps<{
    mediaObject: MediaObject | null,
    maxHeight?: string
  }>()
</script>
