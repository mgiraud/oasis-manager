<template>
  <div>
    <v-card-title class="primary--text text--darken-4 page-title">
      {{ page.title | capitalize }}
    </v-card-title>
    <v-card-text v-html="page.content" />
    <image-preview v-if="page.mediaNode" :media-objects="page.mediaNode.mediaObjects" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Page } from '~/store/PageStore'
import ImagePreview from '~/components/util/ImagePreview.vue'

export default defineComponent({
  components: { ImagePreview },
  props: {
    page: {
      type: Object as () => Page,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
.page-title {
  font-family: 'Permanent Marker', serif;
}
</style>
