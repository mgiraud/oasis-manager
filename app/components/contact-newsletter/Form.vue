<template>
  <v-form @submit.prevent="sendForm">
    <v-text-field
      v-model="item.email"
      label="Inscris-toi à la newsletter !"
      :error-messages="emailErrors"
      class="newsletter-input"
      prepend-icon="ri-mail-line"
      append-outer-icon="ri-send-plane-fill"
      @input="v$.email.$touch()"
      @blur="v$.email.$touch()"
      @click:append-outer="sendForm"
    />
  </v-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, useContext, watch } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
import { email } from '@vuelidate/validators'
import has from 'lodash/has'
import { ContactNewsletter, contactNewsletterStore } from '~/custom-store/ContactNewsletterStore'
import { notificationStore } from '~/custom-store/NotificationStore'

export default defineComponent({
  setup () {
    contactNewsletterStore.setContext(useContext())
    const item = reactive({ email: null })

    const validation = computed(() => ({
      email: {
        email
      }
    }))

    const v$ = useVuelidate(validation, item)
    const violations = computed(() => {
      return contactNewsletterStore.getState().violations
    })

    const emailErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.email || !v$.value.email.$dirty) {
        return errors
      }
      // @ts-ignore
      has(violations.value, 'email') && errors.push(violations.value.email)
      v$.value.email.$invalid && errors.push('Cet email n\'est pas valide')
      return errors
    })

    // @ts-ignore
    watch(() => contactNewsletterStore.getState().created, (created: ContactNewsletter) => {
      if (!created) {
        return
      }

      item.email = null
      notificationStore.showMessage('Tu es maintenant inscrit à la newsletter !')
    })

    watch(() => contactNewsletterStore.getState().error, (message: string | null) => {
      message && notificationStore.showError(message)
    })

    const sendForm = () => {
      if (!v$.value) {
        return
      }
      v$.value.$touch()
      if (!v$.value.$invalid) {
        contactNewsletterStore.create(item)
      }
    }

    return {
      item,
      v$,
      emailErrors,
      sendForm,
      state: contactNewsletterStore.getState()
    }
  }
})
</script>

<style scoped>
form {
  margin-right: 20px;
  padding-top: 10px;
}
</style>
