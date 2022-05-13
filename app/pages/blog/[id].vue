<template>
  <div class="flex bg-white flex-auto flex-col">
    <Title>{{article ? 'Article - ' + article.title : 'Habitat participatif situé vers la région grenobloise'}}</Title>
    <Carrousel :media-node="article.mediaNode" v-if="article !== null && article.mediaNode !== null"/>
    <ArticleComponent :article="article" v-if="article"/>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import ArticleComponent from '~/components/front/blog/ArticleComponent.vue'
import { useBlogArticleStore } from '~/store/blog-article'
import { CRUD_MODE } from '~/store/crud'
import Carrousel from '~/components/front/Page/Carrousel.vue'

const route = useRoute()
const blogArticleStore = useBlogArticleStore()
await useAsyncData('article', () => blogArticleStore.load(route.params.id))
const article = blogArticleStore[CRUD_MODE.EDITION].retrieved
</script>
