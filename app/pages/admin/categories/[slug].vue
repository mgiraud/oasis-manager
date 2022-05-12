<template>
  <div class="flex flex-col flex-auto p-3">
    <h1 class="mb-4">Édition d'une catégorie</h1>
    <FormComponent v-model:category="categoryEdition" :submit-handler="submit" v-if="categoryEdition" :errors="pageCategoryStore[CRUD_MODE.EDITION].violations"/>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import FormComponent from '~/components/admin/categories/FormComponent.vue'
import { CRUD_MODE } from '~/store/crud'
import { useNotificationStore } from '~/store/notification'
import { PageCategory, usePageCategoryStore } from '~/store/page-category'

definePageMeta({
  layout: 'admin'
})

const pageCategoryStore = usePageCategoryStore()
const route = useRoute()
const categoryEdition: Ref<PageCategory | null> = useState('page-edition', () => null)

await useAsyncData('async-page-edition', async () => {
  await pageCategoryStore.load(route.params.slug as string)
  categoryEdition.value = pageCategoryStore[CRUD_MODE.EDITION].retrieved
});

const notificationStore = useNotificationStore();
const submit = async (data: PageCategory, actions) => {
  if (data.isPublished === 'true') {
    data.isPublished = false
  }
  if (data.showInMenu === 'true') {
    data.showInMenu = false
  }
  try {
    await pageCategoryStore.update(data.slug, data)
    notificationStore.showMessage('Catégorie correctement éditée')
  } catch (e) {
    notificationStore.showError('Erreur dans la sauvegarde la catégorie, vérifie le formulaire')
    actions.setErrors(pageCategoryStore[CRUD_MODE.Edition].violations)
  }
}
</script>
