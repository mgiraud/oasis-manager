<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="auto"
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
        v-if="filteredPageItems.length > 0"
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
          v-for="([icon, title, path], i) in filteredPageItems"
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
        v-if="filteredMemberItems.length > 0"
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
          v-for="([icon, title, path, permission], i) in filteredMemberItems"
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

      <v-list-item link :to="{name: 'index'}">
        <v-list-item-icon>
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Retour au site</v-list-item-title>
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
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    links: [
      ['mdi-home', 'Accueil', 'admin'],
      ['mdi-folder-multiple-image', 'Media', 'admin-gallery'],
      ['mdi-arrow-left', 'Retour au site', 'index']
    ],
    pageItems: [
      ['mdi-newspaper-variant-outline', 'Pages', 'admin-page', 'USER_CAN_ACCESS_PAGES'],
      ['mdi-newspaper-variant-multiple', 'Categories', 'admin-pageCategory', 'USER_CAN_ACCESS_PAGE_CATEGORIES']
    ],
    memberItems: [
      ['mdi-account', 'Gérer les membres', 'admin-member', 'USER_CAN_ACCESS_MEMBERS'],
      ['mdi-account-multiple', 'Gérer les groupes', 'admin-memberGroup', 'USER_CAN_ACCESS_MEMBER_GROUPS']
    ]
  }),
  computed: {
    ...mapState({
      user: s => s.storage && s.storage.user ? s.storage.user : {}
    }),
    ...mapGetters('security', ['hasPermission']),
    filteredMemberItems () {
      return this.memberItems.filter(([icon, title, path, permission]) => this.hasPermission(permission))
    },
    filteredPageItems () {
      return this.pageItems.filter(([icon, title, path, permission]) => this.hasPermission(permission))
    }
  },
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
