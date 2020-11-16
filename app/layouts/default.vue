<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        />

        <v-spacer />

        <v-btn v-if="isAdmin" text @click="redirectToAdmin">
          Admin
        </v-btn>
        <v-btn v-if="isLoggedIn" icon @click="clickLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    ...mapGetters('security', ['isAdmin', 'isLoggedIn'])
  },
  methods: {
    ...mapActions('security', ['logout']),
    clickLogout () {
      this.logout({ repository: this.$repository.member })
    },
    redirectToAdmin () {
      this.$router.push({ path: 'admin' })
    }
  }
}
</script>
