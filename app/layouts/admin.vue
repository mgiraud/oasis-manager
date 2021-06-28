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
import { securityStore } from '~/custom-store/SecurityStore'

export default defineComponent({
  components: {
    MenuDrawer, Alert
  },
  setup () {
    const { permissions } = usePermissions()

    return {
      a: securityStore.getState().permissions,
      permissions
    }
  }
})
</script>
