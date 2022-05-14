<template>
  <div class="flex bg-white flex-auto flex-col">
    <Title>{{ page ? page.title : 'Habitat participatif situé vers la région grenobloise' }}</Title>
    <Carrousel :media-node="page.mediaNode" v-if="page !== null && page.mediaNode !== null"/>
    <PageComponent :page="page" v-if="page" class="p-3"/>
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from '~/store/page'
import PageComponent from '~/components/front/PageComponent.vue'
import Carrousel from '~/components/front/Page/Carrousel.vue'

const route = useRoute()
const pageStore = usePageStore()
const page = pageStore.findBySlug(route.params.slug[0])
</script>
