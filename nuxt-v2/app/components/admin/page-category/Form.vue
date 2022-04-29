<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.name"
            label="Nom"
            :error-messages="nameErrors"
            required
            @input="v$.name.$touch()"
            @blur="v$.name.$touch()"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-switch
            v-model="item.showInMenu"
            label="Ajouter au menu"
            input-value="true"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
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

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import has from 'lodash/has'
import { FormErrors } from '../../../api/repository'
import { PageCategory } from '../../../custom-store/PageCategoryStore'

export default defineComponent({
  props: {
    values: {
      type: Object as () => PageCategory,
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
      name: {
        required,
        minLength: minLength(4)
      }
    }))

    const v$ = useVuelidate(validation, item)

    const violations = computed(() => props.errors)

    const nameErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.name || !v$.value.name.$dirty) {
        return errors
      }
      has(violations.value, 'name') && errors.push(violations.value.name)
      v$.value.name.minLength.$invalid && errors.push('Le titre doit faire au moins 4 caractères')
      return errors
    })

    return {
      item,
      v$,
      nameErrors
    }
  }
})
</script>
