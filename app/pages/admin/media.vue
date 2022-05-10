<template>
  <FileManager :show-selection="false" class="flex-auto pl-3 pt-3"/>
</template>

<script setup lang="ts">
import FileManager from '~/components/file-manager/FileManager.vue'

definePageMeta({
  layout: 'admin'
})
</script>
