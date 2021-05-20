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
    <footer>
      <small>
        <span v-for="(tag, i) in article.tags" :key="i">{{ tag.toUpperCase() }}<span v-if="i < article.tags.length - 1"> / </span></span><span v-if="article.tags.length > 0"> - </span><time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time> - {{ article.createdBy.nickname | capitalize }}
      </small>
    </footer>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { BlogArticle } from '~/store/blog_article'

@Component
export default class BlogArticleTemplateVue extends Vue {
  @Prop({ type: Object, required: true }) readonly article!: BlogArticle

  formatDate (rawDate: string) {
    return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
  }
}
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
