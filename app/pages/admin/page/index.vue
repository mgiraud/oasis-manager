<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :items-per-page.sync="options.itemsPerPage"
      :loading="isLoading"
      loading-text="Loading..."
      :options.sync="options"
      :server-items-length="totalItems"
      class="elevation-1"
      item-key="@id"
      show-select
      @update:options="onUpdateOptions"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Page</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <AdminPageFilter
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
          </FormFilter>

          <v-btn
            color="primary"
            dark
            class="ml-2"
            @click="addHandler"
          >
            New Item
          </v-btn>
        </v-toolbar>
      </template>
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
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import list from '~/mixins/list'

export default {
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  mixins: [list],
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGES']
  },
  async fetch ({ store }) {
    return await store.dispatch('page/fetchAll')
  },
  data: () => ({
    selected: [],
    headers: [
      { text: 'Title', value: 'title' },
      { text: 'Url', value: 'url' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapGetters('page', {
      items: 'list'
    }),
    ...mapFields('page', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    }),
    canDeletePage () {
      return this.hasPermission('USER_CAN_DELETE_PAGES')
    }
  },
  methods: {
    ...mapActions('page', {
      fetchAll: 'fetchAll',
      deleteItem: 'del'
    }),
    editItem (item) {
      this.$router.push({ name: 'admin-page-id', params: { id: item.url } })
    }
  }
}
</script>
