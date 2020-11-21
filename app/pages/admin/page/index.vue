<template>
  <v-container>
    <v-btn
      color="primary"
      dark
      class="ml-2"
      @click="addHandler"
    >
      New Item
    </v-btn>
    <v-data-table
      v-if="pages"
      :headers="headers"
      :items="pages"
      sort-by="calories"
      class="elevation-1"
    >
      <TableActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="() => editHandler(props.item)"
        :handle-delete="() => deleteHandler(props.item)"
      />
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ListMixin from '~/mixins/list'

export default {
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  mixins: [ListMixin],
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
      this.$router.push({ name: 'admin-page-id', params: { id: item.url } })
    }
  }
}
</script>
