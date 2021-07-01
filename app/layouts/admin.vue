<template>
  <v-app>
    <MenuDrawer />
    <v-main>
      <Nuxt />
      <Alert />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MenuDrawer from '~/components/admin/MenuDrawer.vue'
import Alert from '~/components/util/Alert.vue'
import usePermissions from '~/composable/usePermissions'

export default defineComponent({
  components: {
    MenuDrawer, Alert
  },
  middleware: ['isAdmin'],
  setup () {
    const { permissions } = usePermissions()

    return {
      permissions
    }
  }
})
</script>
