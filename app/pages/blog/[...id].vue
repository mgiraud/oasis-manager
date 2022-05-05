<template>
  <div class="flex bg-white flex-auto flex-col">
    {{article}}
    <ArticleComponent :article="article" v-if="article"/>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import ArticleComponent from '~/components/front/ArticleComponent.vue'
import { useBlogArticleStore } from '~/store/blog-article'
import { CRUD_MODE } from '~/store/crud'

const route = useRoute()
const blogArticleStore = useBlogArticleStore()
await useAsyncData('article', () => blogArticleStore.load(route.params.id[0]))
// console.log(blogArticleStore[CRUD_MODE.EDITION])
const article = blogArticleStore[CRUD_MODE.EDITION].retrieved
</script>
