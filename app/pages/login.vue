<template>
  <div>
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
        autocomplete="autocomplete"
      />
    </FormKit>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { Credentials, useAuthStore } from '~/store/auth'

const route = useRoute();
const store = useAuthStore()
const credentials = reactive({
  email: '',
  password: ''
})

const submitHandler = async (credentials: Credentials) => {
  await store.login(credentials)
  if (!store.credentialError) {
    navigateTo('/')
  }
}

if (store.isLogged) {
  navigateTo('/')
}

</script>
