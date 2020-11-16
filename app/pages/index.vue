<template>
  <v-container>
    <div v-if="isLoggedIn">
      You are logged in
    </div>
    <p v-else>
      Please
      <NuxtLink to="/login">
        login
      </NuxtLink>.
    </p>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('security', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('security', ['logout'])
  }
}
</script>
