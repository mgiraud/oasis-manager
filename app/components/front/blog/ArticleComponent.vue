<template>
  <article class="p-3">
    <header class="p-3">
      <h1>{{ article.title }}</h1>
    </header>
    <section class="p-2">
      <div class="text-2xl">{{ article.preview }}</div>
    </section>
    <section class="flex w-full items-center p-2">
      <div class="flex flex-col">
        <div>
          {{ capitalize(article.createdBy.nickname) }} -  <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div
          v-for="(tag, i) in article.tags"
          :key="i"
          class="bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 mb-1 text-xs cursor-pointer"
          @click="setActiveTag(tag)"
        >
          {{ tag }}
        </div>
      </div>
    </section>
    <section class="p-3 border-t border-gray-300">
      <div class="js-content" v-html="article.content" />
    </section>
  </article>
</template>

<script setup lang="ts">

import { useDateHelper } from '~/composables/useDateHelper'
import { useStringHelper } from '~/composables/useStringHelper'
import { BlogArticle, useBlogArticleStore } from '~/store/blog-article'

interface ArticleComponentProps {
  article: BlogArticle,
}

const props = defineProps<ArticleComponentProps>()
const { formatDate } = useDateHelper()
const { capitalize } = useStringHelper()
const blogArticleStore = useBlogArticleStore()

const setActiveTag = (tag: string) => {
  blogArticleStore.$patch({
    activeTags: [tag]
  })
  navigateTo('/blog')
}
</script>

<style>
.js-content img {
  display: inline-block;
}
</style>
