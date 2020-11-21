<template>
  <v-app>
    <v-app-bar
      src="https://picsum.photos/1920/1080?random"
      color="primary"
      flat
      shrink-on-scroll
      fade-img-on-scroll
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        />
      </template>
      <v-avatar
        class="mr-10"
        color="primary"
        size="32"
      />

      <v-toolbar-title class="primary--text text--darken-4">
        Les transalpins
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="isAdmin" icon color="primary darken-4" @click="redirectToAdmin">
        Admin
      </v-btn>
      <v-btn v-if="isLoggedIn" icon color="primary darken-4" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else icon to="/login">
        <v-icon color="primary darken-4">
          mdi-login
        </v-icon>
      </v-btn>
      <template v-slot:extension>
        <LayoutMenu />
      </template>
    </v-app-bar>

    <v-main class="secondary lighten-2">
      <LayoutSubMenu v-if="activeSlug !== null" />
      <Nuxt />
    </v-main>
    <v-footer color="primary" padless app>
      <v-card
        flat
        tile
        color="primary"
        width="100%"
        class="text-center"
      >
        <v-card-text class="my-0 py-0">
          <v-btn
            v-for="link in ['Link1', 'Link2', 'Link3', 'Link4', 'Link5']"
            :key="link"
            color="white"
            text
            rounded
            class="my-2"
            small
          >
            {{ link }}
          </v-btn>
        </v-card-text>
        <v-divider />
        <v-card-text class="py-1">
          2020-{{ new Date().getFullYear() }} — <strong>Les transalpins</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
