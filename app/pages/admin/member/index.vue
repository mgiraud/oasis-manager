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
          <v-toolbar-title>Liste de membres</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <AdminMemberFilter
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
        :handle-edit="canEditMember ? () => editHandler(props.item) : null"
        :handle-delete="canDeleteMember ? () => deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import list from '~/mixins/list'

export default {
  servicePrefix: 'admin-member',
  resourcePrefix: '/api/members/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_MEMBERS']
  },
  mixins: [list],
  async fetch ({ store }) {
    await store.dispatch('member/fetchAll')
  },
  data: () => ({
    selected: [],
    headers: [
      { text: 'Email', value: 'email' },
      { text: 'Pseudo', value: 'nickname' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapGetters('member', {
      items: 'list'
    }),
    ...mapFields('member', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    }),
    canDeleteMember () {
      return this.hasPermission('USER_CAN_DELETE_MEMBERS')
    },
    canEditMember () {
      return this.hasPermission('USER_CAN_EDIT_MEMBERS')
    }
  },
  methods: {
    ...mapActions('member', {
      fetchAll: 'fetchAll',
      deleteItem: 'del'
    }),
    editItem (item) {
      this.$router.push({ name: 'admin-member-id', params: { id: item.id } })
    }
  }
}
</script>
