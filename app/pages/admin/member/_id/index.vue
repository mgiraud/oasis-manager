<template>
  <v-container>
    {{ getMember($route.params.id) }}
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'Admin',
  middleware: 'authenticated',
  fetchOnServer: false,
  async validate ({ store }) {
    const hasMembers = store.state.member.members !== null
    if (hasMembers) { return true }
    await store.dispatch('member/getMembers')
    return true
  },
  computed: {
    ...mapGetters('member', ['getMember'])
  }
}
</script>
