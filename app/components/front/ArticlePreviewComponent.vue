<template>
  <article class="flex flex-col p-8">
    <div>
      <!--    <image-preview-->
      <!--      v-if="article.mediaNode"-->
      <!--      :media-objects="article.mediaNode.mediaObjects"-->
      <!--    />-->
    </div>
    <div class="flex justify-between">
      <time :datetime="props.article.createdAt">{{ formatDate(props.article.createdAt) }}</time>
      <div class="self-end">{{ capitalize(props.article.createdBy.nickname) }}</div>
    </div>
    <header>
      <h2>
        {{ props.article.title }}
      </h2>
    </header>
    <section>
      {{ props.article.preview }}
    </section>
    <footer>
      <div class="flex flex-wrap">
        <div
          v-for="(tag, i) in props.article.tags"
          :key="i"
          class="text-amber-800 uppercase px-2 pb-4"
        >
          {{ tag }}
        </div>
      </div>
      <div>
        <NuxtLink :to="{ name: 'blog-id', params: { id: props.article.id }}">En savoir plus</NuxtLink>
      </div>
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
