<template>
  <div>
    Administration
    <Nuxt />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['authenticated', 'isAdmin']
}
</script>
