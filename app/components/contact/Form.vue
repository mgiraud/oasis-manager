<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.email"
            prepend-inner-icon="ri-mail-line"
            label="Email *"
            :error-messages="emailErrors"
            required
            @input="v$.email.$touch()"
            @blur="v$.email.$touch()"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model="item.phoneNumber"
            prepend-inner-icon="ri-phone-line"
            label="Numéro de téléphone"
            :error-messages="phoneNumberErrors"
            @input="v$.phoneNumber.$touch()"
            @blur="v$.phoneNumber.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.firstName"
            label="Prénom"
            :error-messages="firstNameErrors"
            @input="v$.firstName.$touch()"
            @blur="v$.firstName.$touch()"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model="item.lastName"
            label="Nom"
            :error-messages="lastNameErrors"
            @input="v$.lastName.$touch()"
            @blur="v$.lastName.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="item.subject"
            label="Sujet *"
            :error-messages="subjectErrors"
            required
            @input="v$.subject.$touch()"
            @blur="v$.subject.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="item.content"
            rows="10"
            label="Contenu du message *"
            :error-messages="contentErrors"
            required
            @input="v$.content.$touch()"
            @blur="v$.content.$touch()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email, maxLength } from '@vuelidate/validators'
import has from 'lodash/has'
import { FormErrors } from '~/api/repository'
import { BlogArticle } from '~/custom-store/BlogArticleStore'

export default defineComponent({
  props: {
    values: {
      type: Object as () => BlogArticle,
      required: true
    },
    errors: {
      type: Object as () => FormErrors,
      default: () => {}
    }
  },
  setup (props) {
    const item = computed(() => props.values)

    const validation = computed(() => ({
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
    }))

    const v$ = useVuelidate(validation, item)

    const violations = computed(() => props.errors)

    const emailErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.email || !v$.value.email.$dirty) {
        return errors
      }
      has(violations.value, 'email') && errors.push(violations.value.email)
      v$.value.email.email.$invalid && errors.push('Cet email n\'est pas valide')
      v$.value.email.required.$invalid && errors.push('l\'email est obligatoire')
      return errors
    })

    const subjectErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.subject || !v$.value.subject.$dirty) {
        return errors
      }
      has(violations.value, 'subject') && errors.push(violations.value.subject)
      v$.value.subject.required.$invalid && errors.push('Le sujet ne peut pas être vide')
      v$.value.subject.minLength.$invalid && errors.push('Le sujet doit faire au moins 8 caractères')
      v$.value.subject.maxLength.$invalid && errors.push('Le sujet doit faire au maximum 100 caractères')
      return errors
    })

    const contentErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.content || !v$.value.content.$dirty) {
        return errors
      }
      has(violations.value, 'content') && errors.push(violations.value.content)
      v$.value.content.required.$invalid && errors.push('Le contenu du message ne peut pas être vide')
      v$.value.content.minLength.$invalid && errors.push('Le contenu doit faire au moins 10 caractères')
      v$.value.content.maxLength.$invalid && errors.push('Le contenu doit faire au maximum 1000 caractères')
      return errors
    })

    const firstNameErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.firstName || !v$.value.firstName.$dirty) {
        return errors
      }
      has(violations.value, 'firstName') && errors.push(violations.value.firstName)
      v$.value.firstName.maxLength.$invalid && errors.push('Le prénom doit faire au maximum 60 caractères')
      return errors
    })

    const lastNameErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.lastName || !v$.value.lastName.$dirty) {
        return errors
      }
      has(violations.value, 'lastName') && errors.push(violations.value.lastName)
      v$.value.lastName.maxLength.$invalid && errors.push('Le nom doit faire au maximum 60 caractères')
      return errors
    })

    const phoneNumberErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.phoneNumber || !v$.value.phoneNumber.$dirty) {
        return errors
      }
      has(violations.value, 'phoneNumber') && errors.push(violations.value.phoneNumber)
      v$.value.phoneNumber.maxLength.$invalid && errors.push('Le téléphone doit faire au maximum 12 caractères')
      return errors
    })

    return {
      item,
      v$,
      emailErrors,
      subjectErrors,
      contentErrors,
      firstNameErrors,
      lastNameErrors,
      phoneNumberErrors
    }
  }
})
</script>
