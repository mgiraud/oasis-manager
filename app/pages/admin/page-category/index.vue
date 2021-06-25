<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :items-per-page.sync="filterOptions.itemsPerPage"
      :loading="state.isLoading"
      loading-text="Loading..."
      :options.sync="filterOptions"
      :server-items-length="state.totalItems"
      class="elevation-1"
      item-key="@id"
      show-select
      @update:options="onUpdateOptions"
    >
      <template #top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title>Page</v-toolbar-title>

          <v-spacer />

          <FormFilter
            :handle-filter="onSendFilter"
            :handle-reset="resetFilter"
          >
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
      <template
        v-if="item && item.category"
        slot="item.category"
        slot-scope="{ item }"
      >
        {{ item.category.name }}
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="() => canEdit ? editHandler(props.item) : null"
        :handle-delete="() => canDelete ? deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import itemList from '~/composable/ItemList'
import itemSecurity from '~/composable/itemSecurity'
import { pageCategoryStore } from '~/store/PageCategoryStore'
import ActionCell from '~/components/table/ActionCell.vue'
import PageCategoryFilter from '~/components/admin/page-category/PageCategoryFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Visible dans le menu', value: 'showInMenu' },
  { text: 'Est publié', value: 'isPublished' },
  { text: 'Actions', value: 'actions', sortable: false }
]

export default defineComponent({
  components: {
    ActionCell, PageCategoryFilter, FormFilter
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGE_CATEGORIES']
  },
  setup () {
    pageCategoryStore.setContext(useContext())
    return {
      ...toRefs(itemList(pageCategoryStore)),
      ...toRefs(itemSecurity(pageCategoryStore)),
      headers
    }
  }
})
</script>
