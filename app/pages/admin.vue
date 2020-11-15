<template>
  <div>
    Administration
    <Nuxt />
  </div>
</template>

<script>
export default {
  layout: 'Admin',
  middleware: ['authenticated', 'isAdmin']
}
</script>
