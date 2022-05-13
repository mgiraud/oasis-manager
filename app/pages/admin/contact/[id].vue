<template>
  <div class="flex flex-col flex-auto p-3">
    <h1 class="mb-4">Détail d'un contact</h1>
    <div class="py-2">
      Prénom et Nom : {{ contact.firstName }} {{ contact.lastName }}
    </div>
    <div class="py-2">
      Email et numéro : {{ contact.email }} {{ contact.phoneNumber }}
    </div>
    <div class="py-2">
      Date et ip : {{ formatDate(contact.createdAt) }} {{ contact.ip }}
    </div>
    <div class="py-2">
      Sujet : {{ contact.subject }}
    </div>
    <div class="py-2">
      {{ contact.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import { useDateHelper } from '~/composables/useDateHelper'
import { BlogArticle } from '~/store/blog-article'
import { useContactStore } from '~/store/contact'
import { CRUD_MODE } from '~/store/crud'

definePageMeta({
  layout: 'admin'
})

const { formatDate } = useDateHelper()
const contactStore = useContactStore()
const route = useRoute()
const contact: Ref<BlogArticle | null> = useState('contact-view', () => null)

await useAsyncData('async-page-edition', async () => {
  await contactStore.load(route.params.id, {
    'groups[]': 'blog_article:read:edition'
  })
  contact.value = contactStore[CRUD_MODE.EDITION].retrieved
});
</script>
