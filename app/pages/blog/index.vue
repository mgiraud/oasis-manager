<template>
  <div class="flex bg-white flex-auto flex-col px-3">
    <Title>Blog</Title>
    <TagCloud />
    <div v-for="(article, i) in articles" class="w-full flex flex-col py-2">
      <div class="flex flex-row">
        <div :class="{'order-1': i % 2 === 1}" class="px-3 w-40">
          <PreviewImage :media-object="blogArticleStore.getRandomImage(article)" class="h-20 before:text-[6px]"/>
        </div>
        <div :class="{'text-right': i % 2 === 1}" class="flex flex-col w-full justify-center">
          <p class="w-full"><b class="text-lg">{{article.title }}</b> | {{article.preview }}</p>
          <div :class="{'self-end': i % 2 === 1}" class="pt-2 text-primary-dark fill-primary-dark flex uppercase text-xs items-center">
            <div
              v-for="(tag, i) in article.tags"
              :key="i"
              class="bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer"
              @click="setActiveTag(tag)"
            >
              {{ tag }}
            </div>
            <Icon icon="ri-arrow-right-s-line" class="h-4 w-4" />
            <NuxtLink :to="{ name: 'blog-id', params: { id: article.id }}">En savoir plus</NuxtLink>
          </div>
        </div>
      </div>
      <div class="h-2 w-1/2 border-b self-center"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { storeToRefs } from 'pinia'
import PreviewImage from '~/components/front/blog/PreviewImage.vue'
import TagCloud from '~/components/front/blog/TagCloud.vue'
import { useBlogArticleStore } from '~/store/blog-article'
import Icon from '~/components/util/Icon.vue'

const route = useRoute()
const blogArticleStore = useBlogArticleStore()
await useAsyncData('blog-articles-index', () => blogArticleStore.fetchAll({ 'order[createdAt]': 'desc', 'itemsPerPage': 50 }))
const { listWithActiveTags: articles } = storeToRefs(blogArticleStore)
const setActiveTag = (tag: string) => {
  blogArticleStore.$patch({
    activeTags: [tag]
  })
}
</script>
