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
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import { formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import ActionCell from '~/components/table/ActionCell.vue'
import ContactFilter from '~/components/admin/contact/ContactFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import list from '~/mixins/list'
import { Contact } from '~/store/contact'
import { MUTATIONS } from '~/store/crud'
import { HydraGetRequestFilter } from '~/api/hydra'

const contactModule = namespace('contact')

@Component({
  components: {
    ActionCell, ContactFilter, FormFilter
  },
  servicePrefix: 'admin-contact',
  resourcePrefix: '/api/contacts/',
  layout: 'admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_VIEW_CONTACT']
  }
})
export default class AdminContactIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Email', value: 'email' },
    { text: 'Prénom', value: 'firstName' },
    { text: 'Nom', value: 'lastName' },
    { text: 'nous a contacte', value: 'createdAt' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

  options: HydraGetRequestFilter = {
    sortBy: ['createdAt'],
    sortDesc: ['desc']
  }

  @contactModule.Getter('list') items !: () => Contact
  @contactModule.State('deleted') deletedItem!: Contact | null
  @contactModule.State('error') error!: string | null
  @contactModule.State('isLoading') isLoading!: boolean
  @contactModule.State('totalItems') totalItems!: number
  @contactModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void
  @contactModule.Action('fetchAll') fetchAll!: () => Contact[]
  @contactModule.Action('del') deleteItem!: (Contact: Contact) => Promise<void>

  formatDate (rawDate: string) {
    return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
  }
}
</script>
