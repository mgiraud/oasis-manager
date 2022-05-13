<template>
  <div class="flex flex-col flex-auto p-3">
    <h1 class="mb-4">Édition d'un article</h1>
    <FormComponent v-model:article="articleEdition" :submit-handler="submit" v-if="articleEdition" :errors="blogArticleStore[CRUD_MODE.EDITION].violations"/>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import FormComponent from '~/components/admin/blog/FormComponent.vue'
import { BlogArticle, useBlogArticleStore } from '~/store/blog-article'
import { CRUD_MODE } from '~/store/crud'
import { useNotificationStore } from '~/store/notification'

definePageMeta({
  layout: 'admin'
})

const blogArticleStore = useBlogArticleStore()
const route = useRoute()
const articleEdition: Ref<BlogArticle | null> = useState('page-edition', () => null)

await useAsyncData('async-page-edition', async () => {
  await blogArticleStore.load(route.params.id, {
    'groups[]': 'blog_article:read:edition'
  })
  articleEdition.value = blogArticleStore[CRUD_MODE.EDITION].retrieved
});

const notificationStore = useNotificationStore();
const submit = async (data: BlogArticle, actions) => {
  if (data.isPublished === 'true') {
    data.isPublished = false
  }
  if (data.showInMenu === 'true') {
    data.showInMenu = false
  }
  try {
    await blogArticleStore.update(data.id, data)
    notificationStore.showMessage('Article correctement éditée')
  } catch (e) {
    notificationStore.showError('Erreur dans la sauvegarde l\'article, vérifie le formulaire')
    actions.setErrors(blogArticleStore[CRUD_MODE.Edition].violations)
  }
}
</script>
