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
      <template v-if="item && item.category" slot="item.category" slot-scope="{ item }">
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

<script lang="ts">
import { Store } from 'vuex'
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import ActionCell from '~/components/table/ActionCell.vue'
import PageFilter from '~/components/admin/page/PageFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import list from '~/mixins/list'
import { Page } from '~/store/page'
import { MUTATIONS } from '~/store/crud'

const pageModule = namespace('page')

@Component({
  components: {
    ActionCell, PageFilter, FormFilter
  },
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGES']
  }
})
export default class AdminPageIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Title', value: 'title' },
    { text: 'Url', value: 'url' },
    { text: 'Catégorie', value: 'category' },
    { text: 'est publié', value: 'isPublished' },
    { text: 'est visible dans le menu', value: 'showInMenu' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

  async fetch ({ store }: { store: Store<any> }) {
    return await store.dispatch('page/fetchAll')
  }

    @pageModule.Getter('list') items !: () => Page
    @pageModule.State('deleted') deletedItem!: Page | null
    @pageModule.State('error') error!: string | null
    @pageModule.State('isLoading') isLoading!: boolean
    @pageModule.State('totalItems') totalItems!: number
    @pageModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void

    get canEditPage () {
      return this.hasPermission('USER_CAN_EDIT_PAGES')
    }

    get canDeletePage () {
      return this.hasPermission('USER_CAN_DELETE_PAGES')
    }

    @pageModule.Action('fetchAll') fetchAll!: () => Page[]
    @pageModule.Action('del') deleteItem!: (page: Page) => Promise<void>

    editItem (item: Page) {
      this.$router.push({ name: 'admin-page-id', params: { id: item['@id'] } })
    }
}
</script>
