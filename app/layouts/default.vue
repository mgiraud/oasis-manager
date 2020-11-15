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
    </v-app-bar>

    <v-main class="grey lighten-3">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    ...mapState({
      isLoggedIn: state => state.member.auth
    }),
    ...mapGetters({
      isAdmin: 'member/isAdmin'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('member/logout', { $repository: this.$repository })
    },
    redirectToAdmin () {
      this.$router.push({ path: 'admin' })
    }
  }
}
</script>
