<template>
  <article class="p-3">
    <header>
      <h2>
        {{ article.title }}
      </h2>
    </header>
    <section>
      <div v-html="article.content" />
    </section>
<!--    <image-preview-->
<!--      v-if="article.mediaNode"-->
<!--      :media-objects="article.mediaNode.mediaObjects"-->
<!--    />-->
    <footer>
      <small>
        <span
          v-for="(tag, i) in article.tags"
          :key="i"
        >
          {{ tag.toUpperCase() }}
<!--          <nuxt-link :to="{name: 'blog-tag', params: {tag}}">{{ tag.toUpperCase() }}</nuxt-link>-->
          <span v-if="i < article.tags.length - 1"> / </span>
        </span>
        <span v-if="article.tags.length > 0"> -</span>
        <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
        - {{ capitalize(article.createdBy.nickname) }}
      </small>
    </footer>
  </article>
</template>

<script setup lang="ts">

import { useDateHelper } from '~/composables/useDateHelper'
import { useStringHelper } from '~/composables/useStringHelper'
import { BlogArticle } from '~/store/blog-article'

interface ArticleComponentProps {
  article: BlogArticle,
}

const props = defineProps<ArticleComponentProps>()
const { formatDate } = useDateHelper()
const { capitalize } = useStringHelper()
</script>
