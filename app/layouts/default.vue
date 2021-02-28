<template>
  <v-app>
    <v-app-bar
      src="https://picsum.photos/1920/1080?random"
      color="primary"
      flat
      shrink-on-scroll
      fade-img-on-scroll
      app
      dark
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        />
      </template>

      <v-toolbar-title>
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
        <Menu />
      </template>
    </v-app-bar>

    <v-main class="secondary lighten-3">
      <SubMenu v-if="activeSlug !== null" />
      <v-card v-show="showNewsletter" class="card-newsletter">
        <v-card-text>
          <newsletter-form :on-click-close="onNewsletterClose" />
        </v-card-text>
      </v-card>
      <Nuxt />
      <alert />
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
            v-for="link in [{label: 'Mentions légales', url: 'mentions_legales'}]"
            :key="link.label"
            :to="link.url"
            color="white"
            text
            rounded
            class="my-2"
            small
          >
            {{ link.label }}
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
import Menu from '../components/layout/Menu'
import SubMenu from '../components/layout/SubMenu'
import NewsletterForm from '../components/contact_newsletter/Form'
import Alert from '../components/util/Alert'

export default {
  components: {
    Menu, SubMenu, NewsletterForm, Alert
  },
  data: () => ({
    showNewsletter: true
  }),
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
    },
    onNewsletterClose () {
      this.showNewsletter = false
    }
  }
}
</script>

<style>
  .card-newsletter > .v-card__text {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .card-newsletter > .v-card__text > .v-form {
    padding-top: 0px;
  }

  .card-newsletter > .v-card__text > .v-form > .v-text-field {
    margin-top: 0px;
  }
</style>
