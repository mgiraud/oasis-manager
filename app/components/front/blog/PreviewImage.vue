<template>
    <img v-if="mediaObject" :src="`${mediaObject.contentUrl}?size=${size}`" :alt="mediaObject.customName" class="h-full w-full object-contain rounded-sm"/>
    <div v-else :class="{[`h-${maxHeight}`]: !!maxHeight}" class="w-full bg-primary relative before:text-white before:text-2xl before:font-bold before:content-['Transalpins'] before:font-marker before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 rounded-sm shadow-sm"></div>
</template>

<script setup lang="ts">
  import { MediaObject } from '~/store/media-object'

  withDefaults(defineProps<{
    mediaObject: MediaObject | null,
    size?: string
    maxHeight?: string,
  }>(), {
    size: 'original'
  })
</script>
