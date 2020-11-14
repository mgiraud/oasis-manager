<template>
  <v-container>
    <AdminMediaFileUploadForm />
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated'
}
</script>
