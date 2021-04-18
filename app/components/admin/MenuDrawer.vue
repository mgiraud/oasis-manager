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

      <div>{{ member.email }}</div>
    </v-sheet>

    <v-divider />

    <v-list>
      <v-list-item link :to="{name: 'admin'}">
        <v-list-item-icon>
          <v-icon>ri-home-line</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Accueil
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        v-if="filteredBlogItems.length > 0"
        :value="true"
        no-action
        sub-group
      >
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Blog</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([icon, title, path], i) in filteredBlogItems"
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
        v-if="filteredPageItems.length > 0"
        :value="true"
        no-action
        sub-group
      >
        <template #activator>
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
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Membres</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([icon, title, path], i) in filteredMemberItems"
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
          <v-icon>ri-arrow-left-circle-fill</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Retour au site</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon>ri-logout-circle-line</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, namespace, State, Component } from 'nuxt-property-decorator'
import { Member } from '~/store/member'

const securityModule = namespace('security')

@Component
export default class MenuDrawer extends Vue {
  drawer = null

  blogItems = [
    ['ri-article-line', 'Article', 'admin-blogArticle', 'USER_CAN_ACCESS_BLOG_ARTICLES']
  ]

  pageItems = [
    ['ri-article-line', 'Pages', 'admin-page', 'USER_CAN_ACCESS_PAGES'],
    ['ri-folder-line', 'Categories', 'admin-pageCategory', 'USER_CAN_ACCESS_PAGE_CATEGORIES']
  ]

  memberItems = [
    ['ri-user-line', 'Gérer les membres', 'admin-member', 'USER_CAN_ACCESS_MEMBERS'],
    ['ri-group-line', 'Gérer les groupes', 'admin-memberGroup', 'USER_CAN_ACCESS_MEMBER_GROUPS']
  ]

  @State('storage') storage!: {user?: Member}
  @securityModule.Getter('hasPermission') hasPermission!: (permission: string) => boolean

  get member () {
    return this.$auth.member ?? {}
  }

  get filteredMemberItems () {
    return this.memberItems.filter(([_icon, _title, _path, permission]) => this.hasPermission(permission))
  }

  get filteredPageItems () {
    return this.pageItems.filter(([_icon, _title, _path, permission]) => this.hasPermission(permission))
  }

  get filteredBlogItems () {
    return this.blogItems.filter(([_icon, _title, _path, permission]) => this.hasPermission(permission))
  }

  logout () {
    this.$auth.logout()
    this.$router.push({ name: 'index' })
  }

  redirectTo (name: string) {
    this.$router.push({ name })
  }
}
</script>
