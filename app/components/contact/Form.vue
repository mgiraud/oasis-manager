<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.email"
            label="Email"
            :error-messages="emailErrors"
            required
            @input="$v.item.email.$touch()"
            @blur="$v.item.email.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.phoneNumber"
            label="Numéro de téléphone"
            :error-messages="phoneNumberErrors"
            @input="$v.item.phoneNumber.$touch()"
            @blur="$v.item.phoneNumber.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.firstName"
            label="Prénom"
            :error-messages="firstNameErrors"
            @input="$v.item.firstName.$touch()"
            @blur="$v.item.firstName.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.lastName"
            label="Nom"
            :error-messages="lastNameErrors"
            @input="$v.item.lastName.$touch()"
            @blur="$v.item.lastName.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="item.subject"
            label="Sujet"
            :error-messages="subjectErrors"
            required
            @input="$v.item.subject.$touch()"
            @blur="$v.item.subject.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="item.content"
            label="Contenu du message"
            :error-messages="contentErrors"
            required
            @input="$v.item.content.$touch()"
            @blur="$v.item.content.$touch()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'

export default {
  name: 'ContactForm',
  mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    errors: {
      type: Object,
      default: () => {
      }
    },
    initialValues: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    item () {
      return this.initialValues || this.values
    },
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
    subjectErrors () {
      const errors = []
      if (!this.$v.item.subject.$dirty) {
        return errors
      }
      has(this.violations, 'subject') && errors.push(this.violations.subject)
      !this.$v.item.subject.required && errors.push('Le sujet ne peut pas être vide')
      !this.$v.item.subject.minLength && errors.push('Le sujet doit faire au moins 8 caractères')
      !this.$v.item.subject.maxLength && errors.push('Le sujet doit faire au maximum 100 caractères')
      return errors
    },
    contentErrors () {
      const errors = []
      if (!this.$v.item.content.$dirty) {
        return errors
      }
      has(this.violations, 'content') && errors.push(this.violations.content)
      !this.$v.item.content.required && errors.push('Le contenu du message ne peut pas être vide')
      !this.$v.item.content.minLength && errors.push('Le contenu doit faire au moins 10 caractères')
      !this.$v.item.content.maxLength && errors.push('Le contenu doit faire au maximum 1000 caractères')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.item.firstName.$dirty) {
        return errors
      }
      has(this.violations, 'firstName') && errors.push(this.violations.firstName)
      !this.$v.item.firstName.maxLength && errors.push('Le prénom doit faire au maximum 60 caractères')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.item.lastName.$dirty) {
        return errors
      }
      has(this.violations, 'lastName') && errors.push(this.violations.lastName)
      !this.$v.item.lastName.maxLength && errors.push('Le nom doit faire au maximum 60 caractères')
      return errors
    },
    phoneNumberErrors () {
      const errors = []
      if (!this.$v.item.phoneNumber.$dirty) {
        return errors
      }
      has(this.violations, 'phoneNumber') && errors.push(this.violations.phoneNumber)
      !this.$v.item.phoneNumber.maxLength && errors.push('Le téléphone doit faire au maximum 12 caractères')
      return errors
    },
    violations () {
      return this.errors || {}
    }
  },
  methods: {
    ...mapActions('member_group', {
      groupsGetSelectItems: 'fetchSelectItems'
    })
  },
  validations: {
    item: {
      email: {
        required,
        email
      },
      subject: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(100)
      },
      content: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(1000)
      },
      firstName: {
        maxLength: maxLength(60)
      },
      lastName: {
        maxLength: maxLength(60)
      },
      phoneNumber: {
        maxLength: maxLength(12)
      }
    }
  }
}
</script>
