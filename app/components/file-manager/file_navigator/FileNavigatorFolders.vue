<template>
  <div class="flex flex-row py-3">
      <div
        v-for="child in mediaNode.children"
        :key="child['@id']"
        class="w-fit p-3 bg-primary-dark text-white ml-2 first:ml-0 rounded-md hover:bg-primary"
      >
        <button @click="props.handleClick(child.id)">
          {{ child.name }}
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { MediaNode } from '~/store/media-node'

interface FileNavigatorProps {
  mediaNode?: MediaNode | null,
  handleClick: Function,
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  mediaNode: null
})
</script>
