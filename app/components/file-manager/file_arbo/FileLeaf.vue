<template>
  <div class="flex flex-col w-full pl-3 py-1">
    <div class="cursor-pointer hover:text-primary" @click="clickHandler(item)">{{item.name}}</div>
    <FileLeaf
      v-for="child in item.children"
      :item="child"
      :click-handler="clickHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { MediaNodeItem } from '~/store/media-node'

const props = defineProps<{
  item: MediaNodeItem,
  clickHandler: Function
}>()

</script>
