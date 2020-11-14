<template>
  <div>
    Administration
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['authenticated', 'isAdmin']
}
</script>
