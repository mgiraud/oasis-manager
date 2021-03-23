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
          <v-textarea
            v-model="item.description"
            label="Nom"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-combobox
            v-model="item.permissions"
            :items="permissions"
            label="Permissions"
            :return-object="false"
            multiple
            clearable
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, mixins, namespace, Prop } from 'nuxt-property-decorator'
import { required, minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'

const securityModule = namespace('security')

@Component({
  validations: {
    item: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  }
})
export default class MemberGroupForm extends mixins(validationMixin) {
  @Prop({ type: Object, default: () => {} })
  values!: any

  @Prop({ type: Object, default: () => {} })
  errors!: any

  @Prop({ type: Object, default: () => {} })
  initialValues!: any

  @securityModule.State('permissions') permissions !: string[]

  get item () {
    return this.initialValues || this.values
  }

  get nameErrors () {
    const errors: string[] = []
    if (!this.$v.item.name || !this.$v.item.name.$dirty) { return errors }
    has(this.violations, 'name') && errors.push(this.violations.name)
    !this.$v.item.name.minLength && errors.push('Le titre doit faire au moins 4 caractères')
    return errors
  }

  get violations () {
    return this.errors || {}
  }
}
</script>
