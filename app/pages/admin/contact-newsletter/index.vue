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
          <v-toolbar-title>Inscriptions à la newsletter</v-toolbar-title>

          <v-spacer />

          <FormFilter
            :handle-filter="onSendFilter"
            :handle-reset="resetFilter"
          >
            <ContactNewsletterFilter
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
          </FormFilter>
        </v-toolbar>
      </template>
      <template
        v-if="item"
        slot="item.createdAt"
        slot-scope="{ item }"
      >
        {{ formatDate(item.createdAt) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import ActionCell from '~/components/table/ActionCell.vue'
import ContactNewsletterFilter from '~/components/admin/contact-newsletter/ContactNewsletterFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import itemList from '~/composable/ItemList'
import itemSecurity from '~/composable/itemSecurity'
import { contactNewsletterStore } from '~/custom-store/ContactNewsletterStore'
import { formatDate } from '~/composable/helpers/formatDate'

const headers = [
  { text: 'Email', value: 'email' },
  { text: 'Enregistré le ', value: 'createdAt' }
]

export default defineComponent({
  components: {
    ActionCell, ContactNewsletterFilter, FormFilter
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_VIEW_CONTACT_NEWSLETTER']
  },
  setup () {
    contactNewsletterStore.setContext(useContext())

    return {
      headers,
      formatDate,
      ...toRefs(itemList(contactNewsletterStore, {
        sortBy: ['createdAt'],
        sortDesc: ['desc']
      })),
      ...toRefs(itemSecurity(contactNewsletterStore))
    }
  }
})
</script>
