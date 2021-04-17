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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <template #img="{ props }">
        <v-img
          v-bind="props"
        />
      </template>

      <v-toolbar-title>
        <NuxtLink to="/" class="header-link">
          Les transalpins
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="isAdmin" icon color="primary darken-4" @click="redirectToAdmin">
        Admin
      </v-btn>
      <v-btn v-if="loggedIn" icon color="primary darken-4" @click="logout">
        <v-icon>ri-logout-box-line</v-icon>
      </v-btn>
      <v-btn v-else icon to="/login">
        <v-icon color="primary darken-4">
          ri-login-box-line
        </v-icon>
      </v-btn>
      <template v-if="!$vuetify.breakpoint.mobile" #extension>
        <v-container fluid class="header-extension-container">
          <v-row no-gutters>
            <Menu />
          </v-row>
          <v-row no-gutters class="header-extension-row-submenu">
            <SubMenu v-if="activeSlug !== null" />
          </v-row>
        </v-container>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mobile"
      v-model="drawer"
      app
      width="auto"
      temporary
    >
      <side-menu />
    </v-navigation-drawer>

    <v-main class="secondary lighten-3">
      <v-card v-show="showSubHeader" class="card-newsletter">
        <v-card-text>
          <v-container fluid ma-0 pa-0 fill-height>
            <v-row no-gutters align="center" justify="center">
              <v-col lg="4" md="5" sm="6">
                <newsletter-form />
              </v-col>
              <v-col lg="2" md="3" sm="6">
                ET&nbsp;&nbsp;
                <v-btn
                  color="primary"
                  @click="redirectToHelloAsso"
                >
                  Adhère à l'association !
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
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

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Menu from '~/components/layout/Menu.vue'
import SubMenu from '~/components/layout/SubMenu.vue'
import SideMenu from '~/components/layout/SideMenu.vue'
import NewsletterForm from '~/components/contact_newsletter/Form.vue'
import Alert from '~/components/util/Alert.vue'

const securityModule = namespace('security')
const pageModule = namespace('page')

@Component({
  components: {
    Menu, SubMenu, NewsletterForm, Alert, SideMenu
  }
})
export default class DefaultLayout extends Vue {
    showSubHeader = true
    drawer = false
    @pageModule.State('activeSlug') activeSlug!: string | null
    @securityModule.Action('logout') logout!: () => void

    get loggedIn () {
      return this.$auth.loggedIn
    }

    get isAdmin () {
      return this.$auth.isAdmin
    }

    redirectToAdmin () {
      this.$router.push({ path: 'admin' })
    }

    onSubHeaderClose () {
      this.showSubHeader = false
    }

    redirectToHelloAsso () {
      window.open('https://www.helloasso.com/associations/les-transalpins/adhesions/adhesion-a-l-association-les-translapins', '_')
    }
}
</script>

<style>
  .header-extension-container {
    padding:0px;
  }

  .header-extension-container > .row{
    margin-left: -16px;
    margin-right: -16px;
  }

  .header-extension-row-submenu {
    position: absolute;
    min-width: 100%;
    box-shadow: 0px 3px 3px -3px rgba(0, 0, 0, 0.1);
  }

  .v-application a.header-link {
    text-decoration: none;
    text-transform: capitalize;
    color: white;
  }

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
