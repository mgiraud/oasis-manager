<template>
  <div>
    <h1>Administration</h1>
    <div>
      <p>Utiliser le menu pour naviguer</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'is-admin'
})
</script>
