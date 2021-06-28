<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="400px"
    color="primary darken-3"
  >
    <v-sheet
      class="pa-4 white--text"
      color="primary darken-3"
    >
      <div>{{ member.nickname || member.email }}</div>
    </v-sheet>

    <v-divider />

    <v-list>
      <v-list-item
        link
        :to="{name: 'admin'}"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon>ri-home-line</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Accueil
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{name: 'admin-gallery'}"
      >
        <v-list-item-icon>
          <v-icon color="white">
            ri-folder-open-line
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">
          Gérer les fichiers
        </v-list-item-title>
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
          <v-list-item-title
            class="white--text"
            v-text="title"
          />

          <v-list-item-icon>
            <v-icon
              color="white"
              v-text="icon"
            />
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
          <v-list-item-title
            class="white--text"
            v-text="title"
          />

          <v-list-item-icon>
            <v-icon
              color="white"
              v-text="icon"
            />
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
          <v-list-item-title
            class="white--text"
            v-text="title"
          />

          <v-list-item-icon>
            <v-icon
              color="white"
              v-text="icon"
            />
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list-item
        link
        :to="{name: 'index'}"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon>ri-arrow-left-circle-fill</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Retour au site</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        @click="logout"
      >
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
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { securityStore } from '~/custom-store/SecurityStore'

const blogItems = [
  ['ri-article-line', 'Article', 'admin-blog-article', 'USER_CAN_ACCESS_BLOG_ARTICLES']
]

const pageItems = [
  ['ri-article-line', 'Pages', 'admin-page', 'USER_CAN_ACCESS_PAGES'],
  ['ri-folder-line', 'Categories', 'admin-page-category', 'USER_CAN_ACCESS_PAGE_CATEGORIES']
]

const memberItems = [
  ['ri-user-line', 'Gérer les membres', 'admin-member', 'USER_CAN_ACCESS_MEMBERS'],
  ['ri-group-line', 'Gérer les groupes', 'admin-member-group', 'USER_CAN_ACCESS_MEMBER_GROUPS'],
  ['ri-contacts-line', 'Prises de contact', 'admin-contact', 'USER_CAN_VIEW_CONTACT'],
  ['ri-mail-line', 'Inscriptions à la newsletter', 'admin-contact-newsletter', 'USER_CAN_VIEW_CONTACT_NEWSLETTER'],
  ['ri-survey-line', 'Réponses au questionnaire', 'admin-survey-join', 'USER_CAN_VIEW_SURVEY_JOIN']
]

export default defineComponent({
  setup () {
    const context = useContext()
    const drawer = ref(null)
    const member = computed(() => {
      return context.$auth.member ?? {}
    })

    const filteredMemberItems = computed(() => {
      return memberItems.filter(([_icon, _title, _path, permission]) => securityStore.hasPermission(permission))
    })

    const filteredPageItems = computed(() => {
      return pageItems.filter(([_icon, _title, _path, permission]) => securityStore.hasPermission(permission))
    })

    const filteredBlogItems = computed(() => {
      return blogItems.filter(([_icon, _title, _path, permission]) => securityStore.hasPermission(permission))
    })

    return {
      drawer,
      member,
      filteredMemberItems,
      filteredPageItems,
      filteredBlogItems
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$router.push({ name: 'index' })
    }
  }
})

</script>
