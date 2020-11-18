<template>
  <v-container>
    <v-data-table
      v-if="pages"
      :headers="headers"
      :items="pages"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="canDeletePage"
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGES']
  },
  async fetch ({ store }) {
    return await store.dispatch('page/fetchAll')
  },
  data: () => ({
    headers: [
      { text: 'Title', value: 'title' },
      { text: 'Url', value: 'url' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapGetters('page', { pages: 'list' }),
    ...mapGetters('security', ['hasPermission']),
    canDeletePage () {
      return this.hasPermission('USER_CAN_DELETE_PAGES')
    }
  },
  methods: {
    editItem (item) {
      this.$router.push({ name: 'admin-page-slug-edit', params: { slug: item.url } })
    }
  }
}
</script>
