<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        Ah bah y'a rien ici
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  head () {
    return {
      title: 'Lost in Administration'
    }
  }
})

</script>
