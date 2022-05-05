<template>
    <PageComponent :page="homePage" v-if="homePage"/>
  {{articles}}
</template>

<script setup lang="ts">
import PageComponent from '~/components/front/PageComponent.vue'
import { useBlogArticleStore } from '~/store/blog-article'
import { usePageStore } from '~/store/page'

const blogArticleStore = useBlogArticleStore()
const pageStore = usePageStore()
await useAsyncData('articles', () => blogArticleStore.fetchAll({ 'order[createdAt]': 'desc' }))
const homePage = pageStore.findBySlug('home')
const articles = blogArticleStore.list

</script>
