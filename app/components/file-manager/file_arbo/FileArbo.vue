<template>
  <div class="flex flex-col">
    <h2 class="mb-2">Arborescence</h2>
    <FileLeaf v-for="root in tree" :item="root" :click-handler="clickHandler"/>
  </div>
</template>

<script setup lang="ts">

import { useAsyncData } from '#app'
import { storeToRefs } from 'pinia'
import FileLeaf from '~/components/file-manager/file_arbo/FileLeaf.vue'
import { MediaNodeItem, useMediaNodeStore } from '~/store/media-node'

const props = defineProps<{
  clickHandler: Function
}>()

const mediaNodeStore = useMediaNodeStore();
const { refresh } = await useAsyncData('root-media-tree', async () => {
  await mediaNodeStore.fetchTree();
})
const { tree } = storeToRefs(mediaNodeStore)

defineExpose({
  refresh
})
</script>
