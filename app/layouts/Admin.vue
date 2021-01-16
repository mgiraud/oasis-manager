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

<script>
import MenuDrawer from '../components/admin/MenuDrawer'
import Alert from '../components/util/Alert'

export default {
  components: {
    MenuDrawer, Alert
  }
}
</script>
