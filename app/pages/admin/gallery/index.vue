<template>
  <v-container>
    <v-row>
      <v-col>
        <file-manager :show-selection="false"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FileManager from "@/components/file_manager/FileManager";

export default {
  components: { FileManager },
  layout: 'Admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_ACCESS_GALLERIES']
  }
}
</script>
