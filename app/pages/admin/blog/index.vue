<template>
  <div class="flex flex-col flex-auto p-3">
    <NuxtLink :to="{name: 'admin-blog-add'}" class="py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center">
      <Icon icon="ri-add-line" class="fill-white w-8 h-8"></Icon>
      <div class="pl-2">Créer un article de blog</div>
    </NuxtLink>
    <div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold">
      <div class="w-full md:w-1/5 flex-1 md:pl-2">Titre</div>
      <div class="w-full md:w-1/6 flex-1">Tags</div>
      <div class="w-full md:w-1/6 flex-initial">Auteur</div>
      <div class="w-full md:w-1/12 flex-initial">Est publié ?</div>
      <div class="w-full md:w-1/12 flex-initial">Actions</div>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9" v-for="article in data">
      <div class="w-full md:w-1/5 flex-1 md:pl-2">{{ article.title }}</div>
      <div class="w-full md:w-1/6 flex-1">{{ article.tags ? article.tags.join(', ') : '' }}</div>
      <div class="w-full md:w-1/6 flex-initial">{{ article.createdBy.nickname }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ article.isPublished }}</div>
      <div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch">
        <div class="bg-primary flex-auto flex items-stretch justify-center">
          <NuxtLink :to="{name: 'admin-blog-id', params: {id: article.id}}" class="w-full flex items-center justify-center">
              <Icon icon="ri-edit-line" class="fill-white w-4 h-4"/>
          </NuxtLink>
        </div>
        <div class="bg-accent flex-auto flex items-stretch justify-center">
          <div @click="deleteArticle(article)" class="w-full flex items-center justify-center cursor-pointer">
              <Icon icon="ri-delete-bin-line" class="fill-white w-4 h-4"/>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDeleteModal v-model:open="dialog" :handle-remove="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { BlogArticle, useBlogArticleStore } from '~/store/blog-article'
import { useNotificationStore } from '~/store/notification'
import ConfirmationDeleteModal from '~/components/admin/ConfirmationDeleteModal.vue'
import Icon from '~/components/util/Icon.vue'

definePageMeta({
  layout: 'admin'
})

const blogArticleStore = useBlogArticleStore()
const notificationStore = useNotificationStore()
const route = useRoute()
const { data, refresh } = await useAsyncData('admin-blog-article-list', async () => {
  await blogArticleStore.fetchAll()
  return blogArticleStore.list
});

const dialog = ref(false)
const articleToDelete: Ref<BlogArticle | null> = ref(null)

const deleteArticle = (article: BlogArticle) => {
  articleToDelete.value = article
  dialog.value = true
}

const handleDelete = async () => {
  if (!articleToDelete.value) {
    return
  }
  try {
    await blogArticleStore.remove(articleToDelete.value.id)
    refresh()
    notificationStore.showMessage('Article correctement supprimée')
  } catch (e) {
    notificationStore.showError('Erreur dans la suppression de l\'article')
  }
  dialog.value = false
}
</script>
