<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="$v.item.title.$model"
            label="Titre"
            :error-messages="titleErrors"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="$v.item.url.$model"
            label="Url"
            :error-messages="urlErrors"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <ClientOnly>
            <UtilEditor v-if="item" v-model="item.content" />
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required, minLength, helpers } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'

const slug = helpers.regex('slug', /^[a-zA-Z0-9-]*$/)

export default {
  name: 'ConfirmDelete',
  mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true,
      default: () => {}
    },
    errors: {
      type: Object,
      default: () => {}
    },
    initialValues: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    item () {
      return this.initialValues || this.values
    },
    titleErrors () {
      const errors = []
      if (!this.$v.item.title.$dirty) { return errors }
      has(this.violations, 'title') && errors.push(this.violations.title)
      !this.$v.item.title.minLength && errors.push('Le titre doit faire au moins 10 caractères')
      return errors
    },
    urlErrors () {
      const errors = []
      if (!this.$v.item.url.$dirty) { return errors }
      has(this.violations, 'url') && errors.push(this.violations.url)
      !this.$v.item.url.minLength && errors.push('Le titre doit faire au moins 2 caractères')
      !this.$v.item.url.slug && errors.push('L\'url doit contenir seulement des chiffres, des lettres et le tiret du haut -')
      return errors
    },
    contentErrors () {
      const errors = []
      if (!this.$v.item.content.$dirty) { return errors }
      has(this.violations, 'url') && errors.push(this.violations.content)
      !this.$v.item.content.slug && errors.push('Le titre doit faire au moins 2 caractères')
      return errors
    },
    violations () {
      return this.errors || {}
    }
  },
  validations: {
    item: {
      title: {
        required,
        minLength: minLength(10)
      },
      url: {
        required,
        minLength: minLength(2),
        slug
      },
      content: {
      }
    }
  }
}
</script>
