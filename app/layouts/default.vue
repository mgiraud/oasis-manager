<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar
        color="white"
        flat
        shrink-on-scroll
        fade-img-on-scroll
        prominent
      >
        <!--        <template v-slot:img="{ props }">-->
        <!--          <v-img-->
        <!--            v-bind="props"-->
        <!--            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"-->
        <!--          />-->
        <!--        </template>-->
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        />

        <v-toolbar-title>Transalpins</v-toolbar-title>
        <v-spacer />
        <v-btn v-if="isAdmin" icon @click="redirectToAdmin">
          Admin
        </v-btn>
        <v-btn v-if="isLoggedIn" icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn v-else icon to="/login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <template v-slot:extension>
          <PageMenu />
        </template>
      </v-app-bar>
    </v-card>

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
