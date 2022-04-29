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
          <nuxt-link :to="{name: 'blog-tag', params: {tag}}">{{ tag.toUpperCase() }}</nuxt-link>
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
import { BlogArticle } from '../../custom-store/BlogArticleStore'
import ImagePreview from '../util/ImagePreview.vue'
import { formatDate } from '../../composable/helpers/formatDate'

export default defineComponent({
  components: { ImagePreview },
  props: {
    article: {
      type: Object as () => BlogArticle,
      required: true
    }
  },
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
