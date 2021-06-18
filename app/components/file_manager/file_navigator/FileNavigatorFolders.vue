<template>
  <v-container>
    <v-row>
      <v-col v-for="child in mediaNode.children" :key="child['@id']">
        <v-btn @click="handleClick(child['@id'])">
          {{ child.name }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { MediaNode } from '~/store/media_node'

@Component
export default class FileNavigatorFolders extends Vue {
    @Prop({ type: Object, required: true }) readonly mediaNode!: MediaNode
    @Prop({ type: Function, required: true }) readonly handleClick!: (id: string) => {}
    name='file-navigator-bread-crumb-items'
    childItem: MediaNode | null = null

    getMediaNode (value: MediaNode) {
      return value
    }
}
</script>
