<template>
  <v-container>
    <div v-if="isLoggedIn">
      You are logged in
    </div>
    <p v-else>
      Please
      <NuxtLink to="/login">
        login
      </NuxtLink>
    </p>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component
export default class Index extends Vue {
    logout () {
      this.$store.dispatch('member/logout')
    }
  computed: {
    ...mapState({
      isLoggedIn: state => state.member.auth
    })
  }
}
</script>
