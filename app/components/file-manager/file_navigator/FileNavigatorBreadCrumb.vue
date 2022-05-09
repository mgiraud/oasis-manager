<template>
  <div
    v-if="mediaNode"
    class="flex flex-row w-full"
  >
    <Icon icon="ri-home-fill" class="h-6 w-6 cursor-pointer fill-primary" @click="handleRootClick"/>
    <div
      v-for="crumb in mediaNode.breadcrumb"
      :key="crumb['@id']"
      @click="handleCrumbClick(crumb)"
      class="inline-flex items-center cursor-pointer"
    >&nbsp;<Icon icon="ri-arrow-right-s-line" class="h-6 w-6"/><div class="cursor-pointer text-primary">{{ crumb.name }}</div></div>
  </div>
</template>

<script setup lang="ts">

import { BreadcrumbItem, MediaNode } from '~/store/media-node'
import Icon from '~/components/util/Icon.vue'

interface FileNavigatorProps {
  mediaNode?: MediaNode | null,
  mediaNodeClickHandler: Function,
  handleRootClick: Function
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  mediaNode: null
})

const handleCrumbClick = (crumb: BreadcrumbItem) => {
  // @ts-ignore
  props.mediaNodeClickHandler(crumb.id)
}
</script>
