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
          <v-toolbar-title>Groupe de membres</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <MemberGroupFilter
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
        <nuxt-link :to="{name: 'admin-memberGroup-id', params: {id: item.category.id }}">
          {{ item.category.name }}
        </nuxt-link>
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="canEditGroup ? () => editHandler(props.item) : null"
        :handle-delete="canDeleteGroup ? () => deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Store } from 'vuex'
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import ActionCell from '~/components/table/ActionCell.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import MemberGroupFilter from '~/components/admin/memberGroup/MemberGroupFilter.vue'
import { MemberGroup } from '~/store/member_group'
import list from '~/mixins/list'
import { MUTATIONS } from '~/store/crud'

const memberGroupModule = namespace('member_group')

@Component({
  components: {
    ActionCell, FormFilter, MemberGroupFilter
  },
  servicePrefix: 'admin-memberGroup',
  resourcePrefix: '/api/member_groups/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_ACCESS_MEMBER_GROUPS']
  },
  fetchOnServer: false
})
export default class AdminMemberGroupIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Nom', value: 'name' },
    { text: 'Nombre de membres', value: 'memberCount' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

  async fetch ({ store }: { store: Store<any> }) {
    return await store.dispatch('member_group/fetchAll')
  }

  @memberGroupModule.Getter('list') items !: MemberGroup[]
  @memberGroupModule.State('deleted') deletedItem!: MemberGroup | null
  @memberGroupModule.State('error') error!: string | null
  @memberGroupModule.State('isLoading') isLoading!: boolean
  @memberGroupModule.State('totalItems') totalItems!: number
  @memberGroupModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void

  get canEditGroup () {
    return this.hasPermission('USER_CAN_EDIT_MEMBER_GROUPS')
  }

  get canDeleteGroup () {
    return this.hasPermission('USER_CAN_DELETE_MEMBER_GROUPS')
  }

    @memberGroupModule.Action('fetchAll') fetchAll!: () => MemberGroup[]
    @memberGroupModule.Action('del') deleteItem!: (memberGroup: MemberGroup) => Promise<void>

    editItem (item: MemberGroup) {
      this.$router.push({ name: 'admin-memberGroup-id', params: { id: item['@id'] } })
    }
}
</script>
