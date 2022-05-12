<template>
  <div class="flex flex-col flex-auto p-3">
    <h1 class="mb-4">Création d'une page</h1>
    <FormComponent v-model:category="categoryCreation" :submit-handler="submit" :errors="pageCategoryStore[CRUD_MODE.CREATION].violations"/>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { FormActions } from 'vee-validate'
import { CRUD_MODE } from '~/store/crud'
import { useNotificationStore } from '~/store/notification'
import FormComponent from '~/components/admin/categories/FormComponent.vue'
import { PageCategory, usePageCategoryStore } from '~/store/page-category'

definePageMeta({
  layout: 'admin'
})

const pageCategoryStore = usePageCategoryStore()
const route = useRoute()
const app = useNuxtApp()
const categoryCreation: Ref<PageCategory | {}> = useState('page-creation', () => { return {
  isPublished: false,
  showInMenu: false
}})
const notificationStore = useNotificationStore();

const submit = async (data: PageCategory, actions: FormActions<any>) => {
  if (data.isPublished === 'true') {
    data.isPublished = false
  }
  if (data.showInMenu === 'true') {
    data.showInMenu = false
  }
  try {
    await pageCategoryStore.create(data)
    notificationStore.showMessage('Catégorie correctement crée')
    navigateTo({ name: "admin-categories-slug", params: { slug: pageCategoryStore[CRUD_MODE.CREATION].created.slug } })
  } catch (e) {
    notificationStore.showError('Erreur dans la création la catégorie, vérifie le formulaire')
    actions.setErrors(pageCategoryStore[CRUD_MODE.CREATION].violations)
  }
}
</script>
