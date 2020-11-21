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
        <v-btn v-if="isLoggedIn" icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-container>
      <template v-slot:extension>
        <PageMenu />
      </template>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <PageSubMenu v-if="activeSlug !== null" />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    test () {
      return this.$store.state.page.activeSlug
    },
    ...mapState('page', ['activeSlug']),
    ...mapGetters('security', ['isAdmin', 'isLoggedIn'])
  },
  methods: {
    ...mapActions('security', ['logout']),
    redirectToAdmin () {
      this.$router.push({ path: 'admin' })
    }
  }
}
</script>
