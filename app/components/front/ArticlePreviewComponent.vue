<template>
  <article class="flex flex-col p-8">
    <div>
      <PreviewImage :media-object="blogArticleStore.getRandomImage(article)" class="max-h-44 object-cover" max-height="44" />
    </div>
    <div class="text-xs mt-2">
      <div class="text-secondary">{{ capitalize(props.article.createdBy.nickname) }}</div>
    </div>
    <div>
      <time :datetime="article.createdAt" class="text-xs uppercase tracking-wider">{{ formatDate(article.createdAt) }}</time>
    </div>
    <header class="py-4">
      <h2>
        {{ article.title }}
      </h2>
    </header>
    <section class="max-h-64 text-ellipsis overflow-hidden">
      <p>{{ article.preview }}</p>
    </section>
    <footer>
      <div class="flex flex-wrap mt-4">
        <div
          v-for="(tag, i) in article.tags"
          :key="i"
          class="bg-primary-dark text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer"
          @click="setActiveTag(tag)"
        >
          {{ tag }}
        </div>
      </div>
      <div class="pt-2 text-primary-dark fill-primary-dark flex uppercase text-xs">
        <Icon icon="ri-arrow-right-s-line" class="h-4 w-4" />
        <NuxtLink :to="{ name: 'blog-id', params: { id: article.id }}">En savoir plus</NuxtLink>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">

import PreviewImage from '~/components/front/blog/PreviewImage.vue'
import { useDateHelper } from '~/composables/useDateHelper'
import { useStringHelper } from '~/composables/useStringHelper'
import { BlogArticle, useBlogArticleStore } from '~/store/blog-article'
import Icon from '~/components/util/Icon.vue'

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
