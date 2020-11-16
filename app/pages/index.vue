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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('permission', ['isLoggedIn'])
  },
  methods: {
    logout () {
      this.$store.dispatch('member/logout', { $repository: this.$repository })
    }
  }
}
</script>
