<template>
  <div class="flex bg-white flex-row flex-wrap px-3 justify-center h-fit">
    <div
      v-for="(tag, i) in tags"
      :key="i"
      class="text-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer w-fit h-fit hover:bg-primary-dark"
      :class="{'bg-primary-dark': activeTags.indexOf(tag) !== -1, 'bg-primary': activeTags.indexOf(tag) === -1}"
      @click="toggleTag(tag)"
    >
      {{ tag }}
    </div>
    <div
      class="fill-white uppercase px-2 py-1 rounded-tl-lg rounded-br-lg mx-1 text-xs cursor-pointer w-fit h-fit hover:bg-primary-dark"
      :class="{'bg-primary-dark': activeTags.length === 0, 'bg-primary': activeTags.length > 0}"
      @click="clearTags"
    >
      <Icon icon="ri-close-circle-line" class="h-4 w-4"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { storeToRefs } from 'pinia'
import Icon from '~/components/util/Icon.vue'
import { useBlogArticleStore } from '~/store/blog-article'

const articleStore = useBlogArticleStore();
const { tags, activeTags } = storeToRefs(articleStore)
await useAsyncData('blog-tags', () => articleStore.fetchTags())
const toggleTag = (tag: string) => {
  if (activeTags.value.indexOf(tag) !== -1) {
    articleStore.$patch({
      activeTags: activeTags.value.filter((aTag: string) => aTag !== tag)
    })
  } else {
    activeTags.value.push(tag)
    articleStore.$patch({activeTags: activeTags.value});
  }
}
const clearTags = () => {
  articleStore.$patch({activeTags: []});
}
</script>
