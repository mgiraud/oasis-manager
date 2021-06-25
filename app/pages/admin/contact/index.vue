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
        <v-toolbar flat color="white">
          <v-toolbar-title>Contact</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <ContactFilter
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
          </FormFilter>
        </v-toolbar>
      </template>
      <template v-if="item && item.createdAt" slot="item.createdAt" slot-scope="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-show="() => showHandler(props.item)"
      />
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import { formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import ActionCell from '~/components/table/ActionCell.vue'
import ContactFilter from '~/components/admin/contact/ContactFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import itemList from '~/composable/ItemList'
import itemSecurity from '~/composable/itemSecurity'
import { contactStore } from '~/store/ContactStore'

const headers = [
  { text: 'Email', value: 'email' },
  { text: 'Prénom', value: 'firstName' },
  { text: 'Nom', value: 'lastName' },
  { text: 'nous a contacte', value: 'createdAt' },
  { text: 'Actions', value: 'actions', sortable: false }
]

export default defineComponent({
  components: {
    ActionCell, ContactFilter, FormFilter
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_VIEW_CONTACT']
  },
  setup () {
    contactStore.setContext(useContext())

    const formatDate = (rawDate: string) => {
      return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
    }

    return {
      headers,
      formatDate,
      ...toRefs(itemList(contactStore, {
        sortBy: ['createdAt'],
        sortDesc: ['desc']
      })),
      ...toRefs(itemSecurity(contactStore))
    }
  }
})
</script>
