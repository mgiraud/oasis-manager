<template>
  <div class="flex flex-col flex-auto p-3">
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9">
      <div class="w-full md:w-1/5 flex-1">Email</div>
      <div class="w-full md:w-2/12 flex-initial">Prénom</div>
      <div class="w-full md:w-2/12 flex-initial">Nom</div>
      <div class="w-full md:w-2/12 flex-initial">Numéro</div>
      <div class="w-full md:w-2/12 flex-initial">Nous a contacté le</div>
      <div class="w-full md:w-2/12 flex-initial">Actions</div>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9" v-for="contact in data">
      <div class="w-full md:w-1/5 flex-1">{{ contact.email }}</div>
      <div class="w-full md:w-2/12 flex-initial">{{ contact.firstName }}</div>
      <div class="w-full md:w-2/12 flex-initial">{{ contact.lastName }}</div>
      <div class="w-full md:w-2/12 flex-initial">{{ contact.phoneNumber }}</div>
      <div class="w-full md:w-2/12 flex-initial">{{ formatDate(contact.createdAt) }}</div>
      <div class="w-full md:w-2/12 flex-initial">
        <div class="bg-primary flex-auto flex items-stretch justify-center">
          <NuxtLink :to="{name: 'admin-contact-id', params: {id: contact.id}}" class="w-full flex items-center justify-center">
            <Icon icon="ri-eye-fill" class="fill-white w-8 h-8"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateHelper } from '~/composables/useDateHelper'
import { useContactStore } from '~/store/contact'
import Icon from '~/components/util/Icon.vue'

definePageMeta({
  layout: 'admin'
})

const contactStore = useContactStore()
const { formatDate } = useDateHelper()
const route = useRoute()
const { data } = await useAsyncData('admin-contact-list', async () => {
  await contactStore.fetchAll({
    'order[createdAt]': 'desc',
  })
  return contactStore.list
});
</script>
