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

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const securityModule = namespace('security')

@Component({
  middleware: 'notAuthenticated'
})
export default class Login extends Vue {
  credentials = {
    email: '',
    password: ''
  }

  @securityModule.State('credentialError') credentialError!: boolean;

  async postLogin () {
    if (await this.$auth.loginRequest(this.credentials)) {
      window.location.replace('/')
    }
  }
}
</script>
