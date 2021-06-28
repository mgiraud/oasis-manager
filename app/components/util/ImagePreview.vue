<template>
  <div>
    <section v-if="images.length > 1">
      <v-carousel :height="size">
        <v-carousel-item
          v-for="(image, i) in images"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <v-img
            :src="image.contentUrl"
            contain
            :max-height="size"
          />
        </v-carousel-item>
      </v-carousel>
    </section>
    <section v-if="images.length === 1">
      <v-img
        :src="images[0].contentUrl"
        contain
        :max-height="size"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { MediaObject } from '~/custom-store/MediaObjectStore'

export default defineComponent({
  props: {
    mediaObjects: {
      type: Array as () => MediaObject[],
      required: true
    }
  },
  setup (props) {
    const size = '250px'
    const images = computed(() => props.mediaObjects.filter((mediaObject: MediaObject) => mediaObject.isImage))

    return {
      size,
      images
    }
  }
})
</script>
