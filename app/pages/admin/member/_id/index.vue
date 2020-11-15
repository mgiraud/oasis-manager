<template>
  <v-container>
    {{ getMember($route.params.id) }}
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'admin',
  middleware: 'authenticated',
  fetchOnServer: false,
  async validate ({ store, $repository }) {
    const hasMembers = store.state.member.members !== null
    if (hasMembers) { return true }
    await store.dispatch('member/getMembers', { $repository })
    return true
  },
  computed: {
    ...mapGetters('member', ['getMember'])
  }
}
</script>
