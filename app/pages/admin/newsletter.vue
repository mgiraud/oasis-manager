<template>
  <div class="flex flex-col flex-auto p-3">
    <div class="flex flex-row flex-wrap items-center justify-between h-9 border-b-2 font-bold">
      <div class="w-full md:w-1/5 flex-1">Email</div>
      <div class="w-full md:w-1/12 flex-initial">Ip</div>
      <div class="w-full md:w-1/12 flex-initial">Créé le</div>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9" v-for="contact in data">
      <div class="w-full md:w-1/5 flex-1">{{ contact.email }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ contact.ip }}</div>
      <div class="w-full md:w-1/12 flex-initial">{{ formatDate(contact.createdAt) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateHelper } from '~/composables/useDateHelper'
import { useContactNewsletterStore } from '~/store/contact-newsletter'

definePageMeta({
  layout: 'admin'
})

const contactNewsetterStore = useContactNewsletterStore()
const { formatDate } = useDateHelper()
const route = useRoute()
const { data } = await useAsyncData('admin-contact-newsletter-list', async () => {
  await contactNewsetterStore.fetchAll({
    'order[createdAt]': 'desc',
  })
  return contactNewsetterStore.list
});
</script>
