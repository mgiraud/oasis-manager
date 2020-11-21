<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.title"
            label="Titre"
            :error-messages="titleErrors"
            required
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.url"
            label="Url"
            :error-messages="urlErrors"
            required
            @input="$v.item.url.$touch()"
            @blur="$v.item.url.$touch()"
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
          <v-col cols="12" sm="6" md="6">
            <v-combobox
              v-if="categorySelectItems"
              v-model="item.category"
              :items="categorySelectItems"
              no-data-text="Aucune catégorie n'a ce nom"
              label="category"
              item-text="name"
              item-value="@id"
            />
          </v-col>
          <v-col cols="12" md="6" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <ClientOnly>
            <UtilEditor
              v-if="item.content !== undefined"
              v-model="item.content"
              @input="$v.item.title.$touch()"
              @blur="$v.item.title.$touch()"
            />
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required, minLength, helpers } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
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
    ...mapFields('page_categories', {
      categorySelectItems: 'selectItems'
    }),
    item () {
      return this.initialValues || this.values
    },
    titleErrors () {
      const errors = []
      if (!this.$v.item.title.$dirty) { return errors }
      has(this.violations, 'title') && errors.push(this.violations.title)
      !this.$v.item.title.minLength && errors.push('Le titre doit faire au moins 4 caractères')
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
  mounted () {
    this.categoryGetSelectItems()
  },
  methods: {
    ...mapActions('page_categories', {
      categoryGetSelectItems: 'fetchSelectItems'
    })
  },
  validations: {
    item: {
      title: {
        required,
        minLength: minLength(4)
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
