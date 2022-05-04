<template>
  <div
    v-if="mediaNode"
    class="cursor-pointer"
  >
    <span
      v-for="crumb in mediaNode.breadcrumb"
      :key="crumb['@id']"
      @click="handleCrumbClick(crumb)"
    >&nbsp;<v-icon>ri-arrow-right-s-line</v-icon>&nbsp;<v-btn
      rounded
      depressed
      small
    >{{ crumb.name }}</v-btn></span>
  </div>
</template>

<script setup lang="ts">

import { BreadcrumbItem, MediaNode } from '~/store/media-node'

interface FileNavigatorProps {
  mediaNode?: MediaNode | null,
  mediaNodeClickHandler: Function
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  mediaNode: null
})

const handleCrumbClick = (crumb: BreadcrumbItem) => {
  // @ts-ignore
  props.mediaNodeClickHandler(crumb['@id'])
}
</script>
