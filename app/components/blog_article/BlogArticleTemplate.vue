<template>
  <article>
    <header>
      <h2 class="primary--text text--darken-4 article-title">
        {{ article.title }}
      </h2>
    </header>
    <section>
      <div v-html="article.content" />
    </section>
    <image-preview
      v-if="article.mediaNode"
      :media-objects="article.mediaNode.mediaObjects"
    />
    <footer>
      <small>
        <span
          v-for="(tag, i) in article.tags"
          :key="i"
        >
          {{ tag.toUpperCase() }}
          <span v-if="i < article.tags.length - 1"> / </span>
        </span>
        <span v-if="article.tags.length > 0"> -</span>
        <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
        - {{ article.createdBy.nickname | capitalize }}
      </small>
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BlogArticle } from '~/store/BlogArticleStore'
import ImagePreview from '~/components/util/ImagePreview.vue'
import { formatDate } from '~/composable/helpers/formatDate'

export default defineComponent({
  props: {
    article: {
      type: Object as () => BlogArticle,
      required: true
    }
  },
  components: { ImagePreview },
  setup () {
    return {
      formatDate
    }
  }
})
</script>

<style scoped>
header > h2 {
  text-transform: uppercase;
}

section {
  padding: 20px 0 20px 0;
}

article {
  padding-bottom: 10px;
}

.article-title {
  font-family: 'Permanent Marker';
}
</style>
