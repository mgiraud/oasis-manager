<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Nuxt />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  middleware: ['isAdmin'],
  head() {
    return {
      title: 'Administration'
    }
  }
})

</script>
