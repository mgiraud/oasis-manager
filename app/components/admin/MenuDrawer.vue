<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-sheet
      color="grey lighten-4"
      class="pa-4"
    >
      <v-avatar
        class="mb-4"
        color="grey darken-1"
        size="64"
      />

      <div>{{ user.email }}</div>
    </v-sheet>

    <v-divider />

    <v-list>
      <v-list-item
        v-for="[icon, text, path] in links"
        :key="icon"
        link
        @click="redirectTo(path)"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    links: [
      ['mdi-home', 'Accueil', 'admin'],
      ['mdi-folder-multiple-image', 'Media', 'admin-gallery'],
      ['mdi-account', 'Membres', 'admin-member'],
      ['mdi-arrow-left', 'Retour au site', 'index']
    ]
  }),
  computed: mapState({
    user: s => s.storage.user ? s.storage.user : {}
  }),
  methods: {
    logout () {
      this.$store.dispatch('member/logout', { $repository: this.$repository })
    },
    redirectTo (name) {
      this.$router.push({ name })
    }
  }
}
</script>
