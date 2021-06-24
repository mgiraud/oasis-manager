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
import { Component, Vue } from 'nuxt-property-decorator'
import FileManager from '~/components/file_manager/FileManager.vue'

@Component({
  components: {
    FileManager
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_ACCESS_GALLERIES']
  }
})
export default class AdminGallery extends Vue {
}
</script>
