<template>
  <v-container>
    <v-row>
      <v-col
        v-for="child in mediaNode.children"
        :key="child['@id']"
      >
        <v-btn @click="props.handleClick(child['@id'])">
          {{ child.name }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
