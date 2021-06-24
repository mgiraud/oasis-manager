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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Page } from '~/store/PageStore'
import ImagePreview from '~/components/util/ImagePreview.vue'
@Component({
  components: { ImagePreview }
})
export default class PageModel extends Vue {
  @Prop({ type: Object, required: true }) readonly page!: Page
}
</script>

<style scoped lang="scss">
.page-title {
  font-family: 'Permanent Marker', serif;
}
</style>
