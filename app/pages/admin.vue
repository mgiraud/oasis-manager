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
import { Vue, Component } from 'vue-property-decorator'
@Component({
  layout: 'Admin',
  middleware: ['isAdmin']
})
export default class AdminLayout extends Vue {
}
</script>
