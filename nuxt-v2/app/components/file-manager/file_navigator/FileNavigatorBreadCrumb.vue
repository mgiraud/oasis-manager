<template>
  <div
    v-if="mediaNode"
    class="file-navigator-breadcrumb-container"
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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { breadcrumbItem } from '../../../custom-store/MediaNodeStore'

export default defineComponent({
  props: {
    mediaNode: {
      type: Object,
      default: null
    },
    mediaNodeClickHandler: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const handleCrumbClick = (crumb: breadcrumbItem) => {
      // @ts-ignore
      props.mediaNodeClickHandler(crumb['@id'])
    }

    return {
      handleCrumbClick
    }
  }
})
</script>

<style scoped>
.file-navigator-breadcrumb-container {
  display: inline-block;
  cursor: pointer;
}
</style>
