<template>
  <v-app>
    <MenuDrawer />
    <v-main>
      <Nuxt />
      <Alert />
    </v-main>
  </v-app>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl font-marker text-primary-dark;
  }
  h2 {
    @apply text-xl font-marker text-primary;
  }
}
</style>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MenuDrawer from '../components/admin/MenuDrawer.vue'
import Alert from '../components/util/Alert.vue'
import usePermissions from '../composable/usePermissions'

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
