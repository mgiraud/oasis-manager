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
      <template v-if="item && item.category" slot="item.category" slot-scope="{ item }">
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

<script lang="ts">
import { Store } from 'vuex'
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import ActionCell from '~/components/table/ActionCell.vue'
import PageCategoryFilter from '~/components/admin/pageCategory/PageCategoryFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import { PageCategory } from '~/store/page_category'
import list from '~/mixins/list'
import { MUTATIONS } from '~/store/crud'

const pageCategoryModule = namespace('page_category')

@Component({
  components: {
    ActionCell, PageCategoryFilter, FormFilter
  },
  servicePrefix: 'admin-pageCategory',
  resourcePrefix: '/api/page_categories/',
  layout: 'admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGE_CATEGORIES']
  }
})
export default class AdminPageCategoryIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Name', value: 'name' },
    { text: 'est visible dans le menu', value: 'showInMenu' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

  async fetch ({ store }: { store: Store<any> }) {
    return await store.dispatch('page/fetchAll')
  }

  @pageCategoryModule.Getter('list') items !: () => PageCategory
  @pageCategoryModule.State('deleted') deletedItem!: PageCategory | null
  @pageCategoryModule.State('error') error!: string | null
  @pageCategoryModule.State('isLoading') isLoading!: boolean
  @pageCategoryModule.State('totalItems') totalItems!: number
  @pageCategoryModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void

  get canEditPageCategories () {
    return this.hasPermission('USER_CAN_EDIT_PAGE_CATEGORIES')
  }

  get canDeletePageCategories () {
    return this.hasPermission('USER_CAN_DELETE_PAGE_CATEGORIES')
  }

  @pageCategoryModule.Action('fetchAll') fetchAll!: () => PageCategory[]
  @pageCategoryModule.Action('del') deleteItem!: (pageCategory: PageCategory) => Promise<void>

  editItem (item: PageCategory) {
    this.$router.push({ name: 'admin-pageCategory-id', params: { id: item['@id'] } })
  }
}
</script>
