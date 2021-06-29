<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="filteredItems"
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
          <v-toolbar-title>Liste de membres</v-toolbar-title>

          <v-spacer />

          <FormFilter
            :handle-filter="onSendFilter"
            :handle-reset="resetFilter"
          >
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
        :handle-edit="canEdit ? () => editHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, useContext, useFetch } from '@nuxtjs/composition-api'
import itemList from '~/composable/ItemList'
import itemSecurity from '~/composable/itemSecurity'
import ActionCell from '~/components/table/ActionCell.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import MemberFilter from '~/components/admin/member/MemberFilter.vue'
import { memberStore } from '~/custom-store/MemberStore'

const headers = [
  { text: 'Email', value: 'email' },
  { text: 'Pseudo', value: 'nickname' },
  { text: 'Actions', value: 'actions', sortable: false }
]

export default defineComponent({
  components: {
    ActionCell, MemberFilter, FormFilter
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  setup () {
    const context = useContext()
    memberStore.setContext(context)

    useFetch(async () => {
      await memberStore.fetchAll()
    })

    const itemListHelper = itemList(memberStore)

    const filteredItems = computed(() => {
      if (context.$auth.isAdmin) {
        return itemListHelper.items
      }
      return itemListHelper.items.filter(item => !item.isAdmin)
    })

    return {
      ...toRefs(itemListHelper),
      ...toRefs(itemSecurity(memberStore)),
      headers,
      filteredItems
    }
  },
  head () {
    return {
      title: 'Administration - Liste des membres'
    }
  },
  meta: {
    permissions: ['USER_CAN_ACCESS_MEMBERS']
  }
})
</script>
