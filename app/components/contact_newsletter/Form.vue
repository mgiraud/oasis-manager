<template>
  <v-form @submit.prevent="sendForm">
    <v-text-field
      v-model="item.email"
      label="Inscrivez-vous à la newsletter !"
      :error-messages="emailErrors"
      @input="$v.item.email.$touch()"
      @blur="$v.item.email.$touch()"
    />
  </v-form>
</template>

<script>
import { email } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { mapFields } from 'vuex-map-fields'
import notification from '../../mixins/notification'

export default {
  name: 'ContactNewsletterForm',
  mixins: [validationMixin, notification],
  data: () => ({
    item: {
      email: null
    }
  }),
  computed: {
    ...mapFields('contact_newsletter', { errors: 'violations' }),
    emailErrors () {
      const errors = []
      if (!this.$v.item.email.$dirty) {
        return errors
      }
      has(this.violations, 'email') && errors.push(this.violations.email)
      !this.$v.item.email.email && errors.push('Cet email n\'est pas valide')
      return errors
    },
    ...mapFields('contact_newsletter', ['error', 'isLoading', 'created', 'violations'])
  },
  watch: {
    created (created) {
      if (!created) {
        return
      }

      this.item.email = null
      this.timeout = 10000
      this.showMessage('Vous être maintenant inscrit à la newsletter !')
    },

    error (message) {
      message && this.showError(message)
    }
  },
  methods: {
    ...mapActions('contact_newsletter', ['create']),
    sendForm () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.create(this.$v.item.$model)
      }
    }
  },
  validations: {
    item: {
      email: {
        email
      }
    }
  }
}
</script>
