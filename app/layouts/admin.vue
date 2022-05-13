<template>
  <div class="flex min-h-screen">
    <Menu class="w-80"/>
    <slot/>
    <Notification />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-4xl font-marker text-primary-dark;
  }
  h2 {
    @apply text-3xl font-marker text-primary;
  }
  h3 {
    @apply text-2xl font-marker text-primary-dark;
  }
}
</style>

<script setup lang="ts">
import Menu from '~/components/layout/admin/Menu.vue'
import Notification from '~/components/layout/Notification.vue'

definePageMeta({
  middleware: 'is-admin',
})
</script>
