<template>
  <div class="flex flex-col flex-auto p-3">
    <NuxtLink :to="{name: 'admin-pages-add'}" class="py-2 pl-2 pr-3 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit flex flex-row items-center">
      <Icon icon="ri-add-line" class="fill-white w-8 h-8"></Icon>
      <div class="pl-2">Créer une page</div>
    </NuxtLink>
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 h-9 border-b-2 font-bold">
      <div class="w-full md:w-1/5 flex-1 md:pl-2">Titre</div>
      <div class="w-full md:w-1/6 flex-initial">Url</div>
      <div class="w-full md:w-1/6 flex-initial">Auteur</div>
      <div class="w-full md:w-1/5 flex-1">Catégorie</div>
      <div class="w-full md:w-1/12 flex-initial">Est publié ?</div>
      <div class="w-full md:w-1/12 flex-initial">Menu</div>
      <div class="w-full md:w-1/12 flex-initial">Actions</div>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9" v-for="page in data">
      <div class="w-full md:w-1/5 flex-1 md:pl-2">{{ page.title }}</div>
      <div class="w-full md:w-1/6 flex-initial">/{{ page.url }}</div>
      <div class="w-full md:w-1/6 flex-initial">{{ page.createdBy.nickname }}</div>
      <div class="w-full md:w-1/5 flex-1">{{ page.category ? page.category.name : 'N/A' }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ page.isPublished }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ page.showInMenu }}</div>
      <div class="w-full md:w-1/12 flex-initial flex self-stretch items-stretch">
        <div class="bg-primary flex-auto flex items-stretch justify-center">
          <NuxtLink :to="{name: 'admin-pages-slug', params: {slug: page.url}}" class="w-full flex items-center justify-center">
              <Icon icon="ri-edit-line" class="fill-white w-4 h-4"/>
          </NuxtLink>
        </div>
        <div class="bg-accent flex-auto flex items-stretch justify-center">
          <div @click="deletePage(page)" class="w-full flex items-center justify-center cursor-pointer">
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
import ConfirmationDeleteModal from '~/components/admin/ConfirmationDeleteModal.vue'
import { useNotificationStore } from '~/store/notification'
import { Page, usePageStore } from '~/store/page'
import Icon from '~/components/util/Icon.vue'

definePageMeta({
  layout: 'admin'
})

const pageStore = usePageStore()
const notificationStore = useNotificationStore()
const route = useRoute()
const { data, refresh } = await useAsyncData('page-list', async () => {
  await pageStore.fetchAll()
  return pageStore.list
});
const dialog = ref(false)
const pageToDelete: Ref<Page | null> = ref(null)

const deletePage = (page: Page) => {
  pageToDelete.value = page
  dialog.value = true
}

const handleDelete = async () => {
  if (!pageToDelete.value) {
    return
  }
  try {
    await pageStore.remove(pageToDelete.value.url)
    refresh()
    notificationStore.showMessage('Page correctement supprimée')
  } catch (e) {
    notificationStore.showError('Erreur dans la suppression de la page')
  }
  dialog.value = false
}
</script>
