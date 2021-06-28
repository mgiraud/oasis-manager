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
          <v-toolbar-title>Groupe de membres</v-toolbar-title>

          <v-spacer />

          <FormFilter
            :handle-filter="onSendFilter"
            :handle-reset="resetFilter"
          >
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
      <template
        v-if="item && item.category"
        slot="item.category"
        slot-scope="{ item }"
      >
        <nuxt-link :to="{name: 'admin-member-group-id', params: {id: item.category.id }}">
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
import { defineComponent, toRefs, useContext, useFetch } from '@nuxtjs/composition-api'
import ActionCell from '~/components/table/ActionCell.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import MemberGroupFilter from '~/components/admin/memberGroup/MemberGroupFilter.vue'
import itemList from '~/composable/ItemList'
import itemSecurity from '~/composable/itemSecurity'
import { memberGroupStore } from '~/custom-store/MemberGroupStore'

const headers = [
  { text: 'Nom', value: 'name' },
  { text: 'Nombre de membres', value: 'memberCount' },
  { text: 'Actions', value: 'actions', sortable: false }
]

export default defineComponent({
  components: {
    ActionCell, MemberGroupFilter, FormFilter
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  setup () {
    memberGroupStore.setContext(useContext())

    useFetch(async () => {
      await memberGroupStore.fetchAll()
    })

    return {
      ...toRefs(itemList(memberGroupStore)),
      ...toRefs(itemSecurity(memberGroupStore)),
      headers
    }
  },
  head () {
    return {
      title: 'Administration - Liste des groupes de membre'
    }
  },
  meta: {
    permissions: ['USER_CAN_ACCESS_MEMBER_GROUPS']
  }
})
</script>
