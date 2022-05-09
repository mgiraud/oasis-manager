<template>
  <div class="bg-primary flex flex-col">
    <div class="w-full text-center h-12 flex-row items-center justify-center flex ">
        <div
          v-for="link in [{label: 'Mentions légales', url: 'mentions-legales'}]"
          :key="link.label"
          @click="redirectTo(link.url)"
          class="my-2 cursor-pointer text-white text-xs uppercase"
        >
          {{ link.label }}
        </div>
    </div>
    <div class="w-full text-center text-gray-600">
      2020-{{ new Date().getFullYear() }} — <strong>Les transalpins</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
  const redirectTo = (url: string) => {
    navigateTo(url)
  }
</script>
