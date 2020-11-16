<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="members"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="canDeleteUser"
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'Admin',
  middleware: 'authenticated',
  fetchOnServer: false,
  async fetch ({ store }) {
    await store.dispatch('member/getMembers')
  },
  data: () => ({
    headers: [
      { text: 'Email', value: 'email' },
      { text: 'Pseudo', value: 'nickname' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapState('member', ['members']),
    ...mapGetters('security', ['hasPermission']),
    canDeleteUser () {
      return this.hasPermission('USER_CAN_DELETE_MEMBERS')
    }
  },
  methods: {
    editItem (item) {
      this.$router.push({ name: 'admin-member-id', params: { id: item.id } })
    }
  }
}
</script>
