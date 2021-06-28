<template>
  <v-container>
    <v-row>
      <v-col>
        <file-manager :show-selection="false" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import FileManager from '~/components/file-manager/FileManager.vue'

export default defineComponent({
  components: {
    FileManager
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_ACCESS_GALLERIES']
  }
})
</script>
