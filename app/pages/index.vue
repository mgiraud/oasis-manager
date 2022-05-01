<template>
    <PageComponent :page="homePage" v-if="homePage"/>
</template>

<script setup lang="ts">
import PageComponent from '~/components/front/PageComponent.vue'
import { usePageStore } from '~/store/page'

const pageStore = usePageStore()
const homePage = pageStore.findBySlug('home')
</script>
