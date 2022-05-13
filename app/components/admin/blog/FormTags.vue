<template>
  <Listbox as="div" v-model="selectedTags" multiple class="flex justify-center flex-col">
  <ListboxButton class="w-full bg-gray-200 p-3">
    {{ selectedTags.length > 0 ? ('Tags: ' + selectedTags.join(', ')) : 'Sélectionne des tags' }}
  </ListboxButton>
  <div class="relative">
    <ListboxOptions class="absolute top-0 w-full bg-gray-200 z-10">
      <ListboxOption
        as="template"
        v-for="(tag,i) in tags"
        :key="i"
        :value="tag"
        v-slot="{ active, selected }"
      >
        <li
          :class="{
                  'text-primary-dark': selected,
                  'bg-primary text-white': active && !selected,
                }"
          class="w-full cursor-pointer p-3"
        >
          {{ tag }}
        </li>
      </ListboxOption>
      <li class="p-3 w-full">
        <input @keyup.enter="addTag" type="text p-2 w-full" placeholder="Ajoute un tag (avec entrée)"/>
      </li>
    </ListboxOptions>
  </div>
  </Listbox>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useField } from 'vee-validate'
import { useBlogArticleStore } from '~/store/blog-article'

const props = defineProps<{
  initialTags: string[],
}>()
const articleStore = useBlogArticleStore();
const { tags: storeTags } = storeToRefs(articleStore)
const additionalTags = ref([])
const tags = computed(() => [
  ...storeTags.value,
  ...additionalTags.value
])
await useAsyncData('blog-tags', async () => {
  await articleStore.fetchTags()
})

const selectedTags = ref(props.initialTags)

const addTag = (e: Event) => {
  const tag = e.target.value
  if (tag !== false && !additionalTags.value.includes(tag) && !storeTags.value.includes(tag)) {
    additionalTags.value.push(tag)
    selectedTags.value.push(tag)
  }
  e.target.value = ''
}
const {
  value: inputValue,
} = useField('tags', undefined, {
  initialValue: props.initialTags
});

watch(() => selectedTags, (newSelectedTags) => {
  inputValue.value = newSelectedTags.value
}, { deep: true })
</script>
