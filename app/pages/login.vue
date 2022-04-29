<template>
  <div>
    <h1>COUCOU</h1>
    <FormKit
      type="form"
      v-model="credentials"
      submit-label="Se connecter"
      @submit="submitHandler"
    >
      <FormKit
        label="Email"
        type="text"
        name="email"
        validation="required|email"
        validation-visibility="live"
        validation-label="Input"
      />
      <FormKit
        label="Mot de passe"
        type="password"
        name="password"
        validation="required"
      />
    </FormKit>
    <pre wrap>{{ credentials }}</pre>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { Credentials, useAuthStore } from '~/store/auth'

const store = useAuthStore()
const credentials = reactive({
  email: '',
  password: ''
})

const submitHandler = (credentials: Credentials) => {
  store.login(credentials)
}

</script>
