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
            <PageCategoryFilter
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
        {{ item.category.name }}
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="() => canEditPageCategories ? editHandler(props.item) : null"
        :handle-delete="() => canDeletePageCategories ? deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import ActionCell from '../../../components/table/ActionCell'
import PageCategoryFilter from '../../../components/admin/pageCategory/PageCategoryFilter'
import FormFilter from '../../../components/form/FormFilter'
import list from '~/mixins/list'

export default {
  components: {
    ActionCell, PageCategoryFilter, FormFilter
  },
  servicePrefix: 'admin-pageCategory',
  resourcePrefix: '/api/page_categories/',
  mixins: [list],
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGE_CATEGORIES']
  },
  data: () => ({
    selected: [],
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'est visible dans le menu', value: 'showInMenu' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async fetch ({ store }) {
    return await store.dispatch('page/fetchAll')
  },
  computed: {
    ...mapGetters('page_category', {
      items: 'list'
    }),
    ...mapFields('page_category', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    }),
    canEditPageCategories () {
      return this.hasPermission('USER_CAN_EDIT_PAGE_CATEGORIES')
    },
    canDeletePageCategories () {
      return this.hasPermission('USER_CAN_DELETE_PAGE_CATEGORIES')
    }
  },
  methods: {
    ...mapActions('page_category', {
      fetchAll: 'fetchAll',
      deleteItem: 'del'
    }),
    editItem (item) {
      this.$router.push({ name: 'admin-page-id', params: { id: item.url } })
    }
  }
}
</script>
