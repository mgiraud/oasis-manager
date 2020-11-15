<template>
  <v-container>
    <div v-if="isLoggedIn">
      You are logged in
    </div>
    <p v-else>
      Please
      <NuxtLink to="/login">
        login
      </NuxtLink>.
    </p>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isLoggedIn: state => state.member.auth
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('member/logout', { $repository: this.$repository })
    }
  }
}
</script>
