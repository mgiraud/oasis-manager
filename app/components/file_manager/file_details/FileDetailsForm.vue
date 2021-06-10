<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
              v-model="item.uniqueId"
              label="Identifiant unique"
              disabled
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
              v-model="item.customName"
              label="Nom personnalisé"
              :error-messages="customNameErrors"
              required
              @input="$v.item.customName.$touch()"
              @blur="$v.item.customName.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <p>Appartient aux catégories...</p>
          <p class="error--text" v-if="errors && errors.mediaNodes">{{ errors.mediaNodes }}</p>
          <v-treeview
              :items="tree"
              selectable
              rounded
              hoverable
              open-all
              selection-type="independent"
              v-model="item.mediaNodes"
              item-key="@id"
          >
          </v-treeview>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, mixins, namespace, Prop } from 'nuxt-property-decorator'
import { minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'

@Component({
  name: 'AdminPageForm',
  validations: {
    item: {
      customName: {
        minLength: minLength(3)
      },
      mediaNodes: {
        minLength: minLength(1)
      }
    }
  }
})
export default class FileDetailsForm extends mixins(validationMixin) {
  @Prop({ type: Object, required: true }) values!: any
  @Prop({
    type: Object, default: () => {
    }
  }) errors!: any
  @Prop({ type: Array, default: () => [] }) tree!: any

  get item () {
    return this.values
  }

  get customNameErrors () {
    const errors: string[] = []
    if (!this.$v.item.customName || !this.$v.item.customName.$dirty) {
      return errors
    }
    has(this.violations, 'customName') && errors.push(this.violations.customName)
    !this.$v.item.customName.minLength && errors.push('Le nom personnalisé doit faire au moins 3 caractères')
    return errors
  }

  get mediaNodesErrors () {
    const errors: string[] = []
    if (!this.$v.item.mediaNodes || !this.$v.item.mediaNodes.$dirty) {
      return errors
    }
    has(this.violations, 'mediaNodes') && errors.push(this.violations.mediaNodes)
    !this.$v.item.mediaNodes.minLength && errors.push('Le fichier doit appartenir a au moins une galerie')
    return errors
  }

  get violations () {
    return this.errors || {}
  }
}
</script>