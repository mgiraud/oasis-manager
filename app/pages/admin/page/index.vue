<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :items-per-page.sync="filterOptions.itemsPerPage"
      :loading="pageState.isLoading"
      loading-text="Loading..."
      :options.sync="filterOptions"
      :server-items-length="pageState.totalItems"
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
import { computed, defineComponent, ref, useContext, useMeta, toRefs, useRouter, useFetch } from '@nuxtjs/composition-api'
import ActionCell from '~/components/table/ActionCell.vue'
import PageFilter from '~/components/admin/page/PageFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import { Page, pageStore } from '~/store/PageStore'
import { securityStore } from '~/store/SecurityStore'
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
    const router = useRouter()
    const selected = ref([])
    pageStore.setContext(useContext())

    const canEditPage = computed(() => {
      return securityStore.hasPermission('USER_CAN_EDIT_PAGES')
    })

    const canDeletePage = computed(() => {
      return securityStore.hasPermission('USER_CAN_DELETE_PAGES')
    })

    const editItem = (item: Page) => {
      router.push(pageStore.getEditLocation(item))
    }

    useFetch(async () => {
      await pageStore.fetchAll()
    });

    const itemListHelper = itemList(pageStore)
    return {
      selected,
      canEditPage,
      canDeletePage,
      editItem,
      ...toRefs(itemListHelper),
      pageState: pageStore.getState(),
      items: pageStore.list,
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
