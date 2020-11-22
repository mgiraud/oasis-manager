<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.name"
            label="Nom"
            :error-messages="nameErrors"
            required
            @input="$v.item.name.$touch()"
            @blur="$v.item.name.$touch()"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-switch
            v-model="item.showInMenu"
            label="Ajouter au menu"
            input-value="true"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-switch
            v-model="item.isPublished"
            label="Publier"
            input-value="true"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'

export default {
  name: 'AdminPageCategoryForm',
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
    nameErrors () {
      const errors = []
      if (!this.$v.item.name.$dirty) { return errors }
      has(this.violations, 'name') && errors.push(this.violations.name)
      !this.$v.item.name.minLength && errors.push('Le titre doit faire au moins 4 caractères')
      return errors
    },
    violations () {
      return this.errors || {}
    }
  },
  validations: {
    item: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  }
}
</script>
