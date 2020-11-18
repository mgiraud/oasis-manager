<template>
  <v-form>
    <v-text-field
      v-model="$v.item.title.$model"
      label="Titre"
      :error-messages="titleErrors"
      required
    />
  </v-form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'

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
    violations () {
      return this.errors || {}
    }
  },
  validations: {
    item: {
      title: {
        required,
        minLength: minLength(10)
      }
    }
  }
}
</script>
