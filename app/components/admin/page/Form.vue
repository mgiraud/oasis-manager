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
              :return-object="false"
              clearable
            />
          </v-col>
          <v-col cols="12" md="6" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <ClientOnly>
            <Editor
              v-if="item.content !== undefined"
              v-model="item.content"
            />
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, mixins, namespace, Prop } from 'nuxt-property-decorator'
import { required, minLength, helpers } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'
import Editor from '../../util/Editor.vue'
import { PageCategory } from '~/store/page_category'

const slug = helpers.regex('slug', /^[a-zA-Z0-9-]*$/)
const pageCategoryModule = namespace('page_category')

@Component({
  name: 'AdminPageForm',
  components: {
    Editor
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
})
export default class AdminPageForm extends mixins(validationMixin) {
  @Prop({ type: Object, required: true })
  values!: any

  @Prop({ type: Object, default: () => {} })
  errors!: any

  @Prop({ type: Object, default: () => {} })
  initialValues!: any

  @pageCategoryModule.State('selectItems') categorySelectItems!: PageCategory[] | null
  @pageCategoryModule.Action('fetchSelectItems') categoryGetSelectItems!: () => PageCategory[]

  get item () {
    return this.initialValues || this.values
  }

  get titleErrors () {
    const errors: string[] = []
    if (!this.$v.item.title || !this.$v.item.title.$dirty) { return errors }
    has(this.violations, 'title') && errors.push(this.violations.title)
    !this.$v.item.title.minLength && errors.push('Le titre doit faire au moins 4 caractères')
    return errors
  }

  get urlErrors () {
    const errors: string[] = []
    if (!this.$v.item.url || !this.$v.item.url.$dirty) { return errors }
    has(this.violations, 'url') && errors.push(this.violations.url)
    !this.$v.item.url.minLength && errors.push('Le titre doit faire au moins 2 caractères')
    !this.$v.item.url.slug && errors.push('L\'url doit contenir seulement des chiffres, des lettres et le tiret du haut -')
    return errors
  }

  get contentErrors () {
    const errors: string[] = []
    if (!this.$v.item.content || !this.$v.item.content.$dirty) { return errors }
    has(this.violations, 'url') && errors.push(this.violations.content)
    !this.$v.item.content.slug && errors.push('Le titre doit faire au moins 2 caractères')
    return errors
  }

  get violations () {
    return this.errors || {}
  }

  mounted () {
    this.categoryGetSelectItems()
  }
}
</script>
