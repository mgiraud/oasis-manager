<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="filteredItems"
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
          <v-toolbar-title>Liste de membres</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <MemberFilter
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
          </FormFilter>
        </v-toolbar>
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="canEditMember ? () => editHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Store } from 'vuex'
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import isAdmin from '~/middleware/isAdmin'
import ActionCell from '~/components/table/ActionCell.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import MemberFilter from '~/components/admin/member/MemberFilter.vue'
import list from '~/mixins/list'
import { Member } from '~/store/member'
import { MUTATIONS } from '~/store/crud'

const memberModule = namespace('member')

@Component({
  components: {
    ActionCell, FormFilter, MemberFilter
  },
  servicePrefix: 'admin-member',
  resourcePrefix: '/api/members/',
  layout: 'admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_MEMBERS']
  }
})
export default class AdminMemberIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Email', value: 'email' },
    { text: 'Pseudo', value: 'nickname' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

  async fetch ({ store }: {store: Store<any>}) {
    await store.dispatch('member/fetchAll')
  }

  @memberModule.Getter('list') items !: Member[]
  @memberModule.State('deleted') deletedItem!: Member | null
  @memberModule.State('error') error!: string | null
  @memberModule.State('isLoading') isLoading!: boolean
  @memberModule.State('totalItems') totalItems!: number
  @memberModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void

  get filteredItems () {
    if (isAdmin) { return this.items }
    return this.items.filter(item => !item.isAdmin)
  }

  get canEditMember () {
    return this.hasPermission('USER_CAN_EDIT_MEMBERS')
  }

    @memberModule.Action('fetchAll') fetchAll!: () => Member[]
    @memberModule.Action('del') deleteItem!: (member: Member) => Promise<void>

    editItem (item: Member) {
      this.$router.push({ name: 'admin-member-id', params: { id: item.id.toString() } })
    }
}
</script>
