<template>
  <v-container
    fluid
    fill-height
    mb-md-3
    mb-lg-5
  >
    <v-row
      v-if="credentialError"
      align="center"
      justify="center"
    >
      <v-col lg="4">
        <v-alert
          color="red"
          elevation="24"
          type="error"
        >
          Le compte ou le mot de passe ne sont pas valides
        </v-alert>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col lg="4">
        <v-card
          elevation="2"
          shaped
          color="primary"
          dark
        >
          <v-card-title>Connectes-toi !</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="credentials.email"
                prepend-inner-icon="ri-account-circle-line"
                label="email"
                type="email"
              />
              <v-text-field
                v-model="credentials.password"
                prepend-inner-icon="ri-lock-2-line"
                label="password"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              @click="login"
            >
              login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent, useContext
} from '@nuxtjs/composition-api'
import { securityStore } from '../custom-store/SecurityStore'

export default defineComponent({
  setup () {
    securityStore.setContext(useContext())
    return {
      credentialError: securityStore.getState().credentialError
    }
  },
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  head () {
    return {
      title: 'Se connecter'
    }
  },
  methods: {
    async login () {
      if (await this.$auth.loginRequest(this.credentials)) {
        window.location.replace('/')
      }
    }
  }
})
</script>
