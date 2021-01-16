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
          <v-toolbar-title>Groupe de membres</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <MemberGroupFilter
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
      <template v-if="item.category" slot="item.category" slot-scope="{ item }">
        <nuxt-link :to="{name: 'admin-memberGroup-id', params: {id: item.category.id }}">
          {{ item.category.name }}
        </nuxt-link>
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="canEditGroup ? () => editHandler(props.item) : null"
        :handle-delete="canDeleteGroup ? () => deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import ActionCell from '../../../components/table/ActionCell'
import FormFilter from '../../../components/form/FormFilter'
import MemberGroupFilter from '../../../components/admin/memberGroup/MemberGroupFilter'
import list from '~/mixins/list'

export default {
  components: {
    ActionCell, FormFilter, MemberGroupFilter
  },
  servicePrefix: 'admin-memberGroup',
  resourcePrefix: '/api/member_groups/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_ACCESS_MEMBER_GROUPS']
  },
  fetchOnServer: false,
  mixins: [list],
  async fetch ({ store }) {
    return await store.dispatch('member_group/fetchAll')
  },
  data: () => ({
    selected: [],
    headers: [
      { text: 'Nom', value: 'name' },
      { text: 'Nombre de membres', value: 'memberCount' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapGetters('member_group', {
      items: 'list'
    }),
    ...mapFields('member_group', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    }),
    canEditGroup () {
      return this.hasPermission('USER_CAN_EDIT_MEMBER_GROUPS')
    },
    canDeleteGroup () {
      return this.hasPermission('USER_CAN_DELETE_MEMBER_GROUPS')
    }
  },
  methods: {
    ...mapActions('member_group', {
      fetchAll: 'fetchAll',
      deleteItem: 'del'
    }),
    editItem (item) {
      this.$router.push({ name: 'admin-memberGroup-id', params: { id: item.url } })
    }
  }
}
</script>
