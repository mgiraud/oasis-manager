<template>
  <v-container fluid fill-height mb-md-3 mb-lg-5>
    <v-row v-if="credentialError" align="center" justify="center">
      <v-col lg="4">
        <v-alert
          color="red"
          elevation="24"
          type="error"
        >
          Bad credentials
        </v-alert>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col lg="4">
        <v-card
          elevation="2"
          shaped
          color="primary"
          dark
        >
          <v-card-title>Connectez-vous !</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="credentials.email" prepend-inner-icon="ri-account-circle-line" label="email" type="email" />
              <v-text-field v-model="credentials.password" prepend-inner-icon="ri-lock-2-line" label="password" type="password" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="postLogin">
              login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'notAuthenticated',
  data: () => {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('security', ['credentialError'])
  },
  methods: {
    async postLogin () {
      if (await this.$store.dispatch('security/login', this.credentials)) {
        this.$router.push('/')
      }
    }
  }
}
</script>
