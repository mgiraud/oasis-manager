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
          <v-toolbar-title>Réponses au questionnaire</v-toolbar-title>

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
import ContactFilter from '~/components/admin/survey-join/SurveyJoinFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import list from '~/mixins/list'
import { MUTATIONS } from '~/store/crud'
import { HydraGetRequestFilter } from '~/api/hydra'
import { SurveyJoin } from '~/store/survey_join'

const surveyJoinModule = namespace('survey_join')

@Component({
  components: {
    ActionCell, ContactFilter, FormFilter
  },
  servicePrefix: 'admin-survey-join',
  resourcePrefix: '/api/survey_joins/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_VIEW_SURVEY_JOIN']
  }
})
export default class AdminContactIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Email', value: 'email' },
    { text: 'Prénom', value: 'firstName' },
    { text: 'Nom', value: 'lastName' },
    { text: 'A remplis le formulaire le', value: 'createdAt' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

  options: HydraGetRequestFilter = {
    sortBy: ['createdAt'],
    sortDesc: ['desc']
  }

  @surveyJoinModule.Getter('list') items !: () => SurveyJoin
  @surveyJoinModule.State('deleted') deletedItem!: SurveyJoin | null
  @surveyJoinModule.State('error') error!: string | null
  @surveyJoinModule.State('isLoading') isLoading!: boolean
  @surveyJoinModule.State('totalItems') totalItems!: number
  @surveyJoinModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void
  @surveyJoinModule.Action('fetchAll') fetchAll!: () => SurveyJoin[]
  @surveyJoinModule.Action('del') deleteItem!: (surveyJoin: SurveyJoin) => Promise<void>

  formatDate (rawDate: string) {
    return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
  }
}
</script>
