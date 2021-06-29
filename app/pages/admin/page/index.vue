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
      <template
        v-if="item && item.category"
        slot="item.category"
        slot-scope="{ item }"
      >
        <nuxt-link :to="{name: 'admin-page-category-id', params: {id: item.category.id }}">
          {{ item.category.name }}
        </nuxt-link>
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="canEdit ? () => editHandler(props.item) : null"
        :handle-delete="canDelete ? () => deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, toRefs, useRouter, useFetch } from '@nuxtjs/composition-api'
import ActionCell from '~/components/table/ActionCell.vue'
import PageFilter from '~/components/admin/page/PageFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import itemSecurity from '~/composable/itemSecurity'
import { Page, pageStore } from '~/custom-store/PageStore'
import { securityStore } from '~/custom-store/SecurityStore'
import itemList from '~/composable/ItemList'

const headers = [
  { text: 'Title', value: 'title' },
  { text: 'Url', value: 'url' },
  { text: 'Catégorie', value: 'category' },
  { text: 'est publié', value: 'isPublished' },
  { text: 'est visible dans le menu', value: 'showInMenu' },
  { text: 'Actions', value: 'actions', sortable: false }
]

export default defineComponent({
  components: {
    ActionCell, PageFilter, FormFilter
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  setup () {
    pageStore.setContext(useContext())

    useFetch(async () => {
      await pageStore.fetchAll()
    })

    return {
      ...toRefs(itemList(pageStore)),
      ...toRefs(itemSecurity(pageStore)),
      headers
    }
  },
  head () {
    return {
      title: 'Administration - Liste des pages'
    }
  },
  meta: {
    permissions: ['USER_CAN_ACCESS_PAGES']
  }
})
</script>
