<template>
  <div class="flex flex-col flex-auto p-3">
    <div class="flex flex-row flex-wrap items-center justify-between border-b-2 font-bold h-9">
      <div class="w-full md:w-1/5 flex-1">Email</div>
      <div class="w-full md:w-2/12 flex-initial">Prénom</div>
      <div class="w-full md:w-2/12 flex-initial">Nom</div>
      <div class="w-full md:w-2/12 flex-initial">A rempli le formulaire le</div>
      <div class="w-full md:w-2/12 flex-initial">Actions</div>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-between hover:bg-gray-100 hover:text-primary-dark h-9" v-for="join in data">
      <div class="w-full md:w-1/5 flex-1">{{ join.email }}</div>
      <div class="w-full md:w-2/12 flex-initial">{{ join.firstName }}</div>
      <div class="w-full md:w-2/12 flex-initial">{{ join.lastName }}</div>
      <div class="w-full md:w-2/12 flex-initial">{{ formatDate(join.createdAt) }}</div>
      <div class="w-full md:w-2/12 flex-initial">
        <div class="bg-primary flex-auto flex items-stretch justify-center">
          <NuxtLink :to="{name: 'admin-join-id', params: {id: join.id}}" class="w-full flex items-center justify-center">
            <Icon icon="ri-eye-fill" class="fill-white w-8 h-8"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateHelper } from '~/composables/useDateHelper'
import Icon from '~/components/util/Icon.vue'
import { useJoinStore } from '~/store/join'

definePageMeta({
  layout: 'admin'
})

const joinStore = useJoinStore()
const { formatDate } = useDateHelper()
const route = useRoute()
const { data } = await useAsyncData('admin-join-list', async () => {
  await joinStore.fetchAll({
    'order[createdAt]': 'desc',
  })
  return joinStore.list
});
</script>
