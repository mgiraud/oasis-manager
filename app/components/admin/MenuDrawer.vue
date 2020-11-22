<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-sheet
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
      <v-list-item link :to="{name: 'admin'}">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Accueil
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        :value="true"
        no-action
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Pages</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([icon, title, path], i) in pages"
          :key="i"
          link
          :to="{name: path}"
        >
          <v-list-item-title v-text="title" />

          <v-list-item-icon>
            <v-icon v-text="icon" />
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list-group
        :value="true"
        no-action
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Membres</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([icon, title, path], i) in members"
          :key="i"
          link
          :to="{name: path}"
        >
          <v-list-item-title v-text="title" />

          <v-list-item-icon>
            <v-icon v-text="icon" />
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

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
      ['mdi-arrow-left', 'Retour au site', 'index']
    ],
    pages: [
      ['mdi-newspaper', 'Pages', 'admin-page'],
      ['mdi-newspaper', 'Categories', 'admin-pageCategory']
    ],
    members: [
      ['mdi-account', 'Gérer les membres', 'admin-member']
    ]
  }),
  computed: mapState({
    user: s => s.storage.user ? s.storage.user : {}
  }),
  methods: {
    logout () {
      this.$store.dispatch('security/logout')
      this.$router.push({ name: 'index' })
    },
    redirectTo (name) {
      this.$router.push({ name })
    }
  }
}
</script>
