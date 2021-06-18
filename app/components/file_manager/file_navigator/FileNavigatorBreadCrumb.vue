<template>
  <div v-if="mediaNode" class="file-navigator-breadcrumb-container">
    <span v-for="crumb in mediaNode.breadcrumb" :key="crumb['@id']" @click="handleCrumbClick(crumb)">&nbsp;<v-icon>ri-arrow-right-s-line</v-icon>&nbsp;<v-btn rounded depressed small>{{ crumb.name }}</v-btn></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { MediaNode, breadcrumbItem } from '~/store/media_node'

@Component
export default class FileNavigatorBreadCrumbItems extends Vue {
    @Prop({ type: Object, required: false, default: null }) readonly mediaNode!: MediaNode
    @Prop({ type: Function, required: true }) readonly mediaNodeClickHandler!: (id: string) => void
    name='file-navigator-bread-crumb-items'

    handleCrumbClick (crumb: breadcrumbItem) {
      this.mediaNodeClickHandler(crumb['@id'])
    }
}
</script>

<style scoped>
.file-navigator-breadcrumb-container {
  display:inline-block;
  cursor: pointer;
}
</style>
