<template>
  <div class="flex bg-white flex-auto flex-col">
    <PageComponent :page="homePage" v-if="homePage" class="md:w-4/5 self-center"/>
    <div class="flex flex-wrap md:w-4/5 lg:w-3/4 self-center">
      <ArticlePreviewComponent v-for="article in articles" :article="article" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageComponent from '~/components/front/PageComponent.vue'
import { useBlogArticleStore } from '~/store/blog-article'
import { usePageStore } from '~/store/page'
import ArticlePreviewComponent from '~/components/front/ArticlePreviewComponent.vue'

const blogArticleStore = useBlogArticleStore()
const pageStore = usePageStore()
await useAsyncData('articles', () => blogArticleStore.fetchAll({ 'order[createdAt]': 'desc' }))
const homePage = pageStore.findBySlug('home')
const articles = blogArticleStore.list

</script>
