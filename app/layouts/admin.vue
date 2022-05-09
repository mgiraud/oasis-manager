<template>
  <div class="flex">
    <Menu class="w-80"/>
    <slot />
    <Notification />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl font-marker text-primary-dark;
  }
  h2 {
    @apply text-xl font-marker text-primary;
  }
}
</style>

<script setup lang="ts">
import Menu from '~/components/layout/admin/Menu.vue'
import Notification from '~/components/layout/Notification.vue'
</script>
