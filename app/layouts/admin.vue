<template>
  <v-app>
    <MenuDrawer />
    <v-main>
      <v-container fluid>
        <Nuxt />
        <Alert />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MenuDrawer from '~/components/admin/MenuDrawer.vue'
import Alert from '~/components/util/Alert.vue'

@Component({
  components: {
    MenuDrawer, Alert
  }
})
export default class AdminLayout extends Vue {
}
</script>
