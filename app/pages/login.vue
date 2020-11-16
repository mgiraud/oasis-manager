<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col lg="4">
        <v-card
          elevation="2"
          shaped
        >
          <v-card-title>Connectez-vous !</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="credentials.email" prepend-inner-icon="mdi-account" label="email" type="email" />
              <v-text-field v-model="credentials.password" prepend-inner-icon="mdi-lock" label="password" type="password" />
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
export default {
  data: () => {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  middleware: 'notAuthenticated',
  methods: {
    async postLogin () {
      await this.$store.dispatch('security/login', this.credentials)
      return this.$router.push('/')
    }
  }
}
</script>
