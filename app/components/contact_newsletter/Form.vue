<template>
  <v-form @submit.prevent="sendForm">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="item.email"
            label="Inscrivez-vous à la newsletter !"
            :error-messages="emailErrors"
            required
            @input="$v.item.email.$touch()"
            @blur="$v.item.email.$touch()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { mapFields } from 'vuex-map-fields'
import create from '../../mixins/create'

export default {
  name: 'ContactNewsletterForm',
  mixins: [validationMixin, create],
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
      !this.$v.item.email.required && errors.push('l\'email est obligatoire')
      !this.$v.item.email.email && errors.push('Cet email n\'est pas valide')
      return errors
    },
    violations () {
      return this.errors || {}
    }
  },
  methods: {
    ...mapActions('contact_newsletter', ['create', 'reset']),
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
        required,
        email
      }
    }
  }
}
</script>
