<template>
  <div>
    <section v-if="images.length > 1">
      <v-carousel :height="size">
        <v-carousel-item
            v-for="(image, i) in images"
            v-if="image.isImage"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
        >
          <v-img :src="image.contentUrl" contain :max-height="size"></v-img>
        </v-carousel-item>
      </v-carousel>
    </section>
    <section v-if="images.length === 1">
      <v-img :src="images[0].contentUrl" contain :max-height="size"></v-img>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { MediaObject } from '~/store/media_object'

@Component
export default class ImagePreview extends Vue {
  @Prop({ type: Array, required: true }) readonly mediaObjects!: MediaObject[]
  size = '250px'

  get images(): MediaObject[] {
    return this.mediaObjects.filter((mediaObject: MediaObject) => mediaObject.isImage)
  }
}
</script>
