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
          <v-toolbar-title>Inscriptions à la newsletter</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <ContactNewsletterFilter
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
          </FormFilter>
        </v-toolbar>
      </template>
      <template v-if="item" slot="item.createdAt" slot-scope="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import { formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import ActionCell from '~/components/table/ActionCell.vue'
import ContactNewsletterFilter from '~/components/admin/contact-newsletter/ContactNewsletterFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import list from '~/mixins/list'
import { Contact } from '~/store/contact'
import { MUTATIONS } from '~/store/crud'
import { HydraGetRequestFilter } from '~/api/hydra'

const contactNewsletterModule = namespace('contact_newsletter')

@Component({
  components: {
    ActionCell, ContactNewsletterFilter, FormFilter
  },
  servicePrefix: 'admin-contact',
  resourcePrefix: '/api/contacts/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_VIEW_CONTACT_NEWSLETTER']
  }
})
export default class AdminContactIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Email', value: 'email' },
    { text: 'Enregistré le ', value: 'createdAt' }
  ]

  options: HydraGetRequestFilter = {
    sortBy: ['createdAt'],
    sortDesc: ['desc']
  }

  @contactNewsletterModule.Getter('list') items !: () => Contact
  @contactNewsletterModule.State('deleted') deletedItem!: Contact | null
  @contactNewsletterModule.State('error') error!: string | null
  @contactNewsletterModule.State('isLoading') isLoading!: boolean
  @contactNewsletterModule.State('totalItems') totalItems!: number
  @contactNewsletterModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void
  @contactNewsletterModule.Action('fetchAll') fetchAll!: () => Contact[]
  @contactNewsletterModule.Action('del') deleteItem!: (Contact: Contact) => Promise<void>

  formatDate (rawDate: string) {
    return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
  }
}
</script>
