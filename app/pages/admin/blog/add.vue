<template>
  <div class="flex flex-col flex-auto p-3">
    <h1 class="mb-4">Création d'une article</h1>
    <FormComponent v-model:article="articleCreation" :submit-handler="submit" :errors="blogArticleStore[CRUD_MODE.CREATION].violations"/>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { FormActions } from 'vee-validate'
import FormComponent from '~/components/admin/blog/FormComponent.vue'
import { BlogArticle, useBlogArticleStore } from '~/store/blog-article'
import { CRUD_MODE } from '~/store/crud'
import { useNotificationStore } from '~/store/notification'

const blogArticleStore = useBlogArticleStore()
const route = useRoute()
const app = useNuxtApp()
const articleCreation: Ref<BlogArticle | {}> = useState('article-creation', () => { return {
  content: '',
  isPublished: false,
}})
const notificationStore = useNotificationStore();

const submit = async (data: BlogArticle, actions: FormActions<any>) => {
  if (data.isPublished === 'true') {
    data.isPublished = false
  }
  try {
    await blogArticleStore.create(data)
    notificationStore.showMessage('Article correctement crée')
    navigateTo({ name: "admin-blog-id", params: { id: blogArticleStore[CRUD_MODE.CREATION].created.id } })
  } catch (e) {
    notificationStore.showError('Erreur dans la création l\'article, vérifie le formulaire')
    actions.setErrors(blogArticleStore[CRUD_MODE.CREATION].violations)
  }
}

definePageMeta({
  layout: 'admin'
})
</script>
