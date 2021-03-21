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
      <template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Page</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <PageFilter
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
        <nuxt-link :to="{name: 'admin-pageCategory-id', params: {id: item.category.id }}">
          {{ item.category.name }}
        </nuxt-link>
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="canEditPage ? () => editHandler(props.item) : null"
        :handle-delete="canDeletePage ? () => deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import ActionCell from '../../../components/table/ActionCell'
import PageFilter from '../../../components/admin/page/PageFilter'
import FormFilter from '../../../components/form/FormFilter'
import list from '~/mixins/list'

export default {
  components: {
    ActionCell, PageFilter, FormFilter
  },
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  mixins: [list],
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGES']
  },
  data: () => ({
    selected: [],
    headers: [
      { text: 'Title', value: 'title' },
      { text: 'Url', value: 'url' },
      { text: 'Catégorie', value: 'category' },
      { text: 'est publié', value: 'isPublished' },
      { text: 'est visible dans le menu', value: 'showInMenu' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async fetch ({ store }) {
    return await store.dispatch('page/fetchAll')
  },
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
    canEditPage () {
      return this.hasPermission('USER_CAN_EDIT_PAGES')
    },
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
