<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="item.title"
            label="Titre"
            :error-messages="titleErrors"
            required
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
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
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-if="item.tags"
            v-model="item.tags"
            :items="item.tags"
            no-data-text="Aucun tag"
            label="Tags"
            :return-object="false"
            clearable
            multiple
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-combobox
              v-if="mediaNodes"
              v-model="item.mediaNode"
              :items="mediaNodes"
              no-data-text="Aucun galerie n'a ce nom"
              label="Lier une galerie à cette page"
              item-text="name"
              item-value="@id"
              :return-object="false"
              clearable
          />
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
import { required, minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'
import Editor from '../../util/Editor.vue'
import { PageCategory } from '~/store/page_category'
import { MediaNode } from '~/store/media_node'

const mediaNodeModule = namespace('media_node')

@Component({
  components: {
    Editor
  },
  validations: {
    item: {
      title: {
        required,
        minLength: minLength(4)
      }
    }
  }
})
export default class AdminBlogArticleForm extends mixins(validationMixin) {
  @Prop({ type: Object, required: true })
  values!: any

  @Prop({ type: Object, default: () => {} })
  errors!: any

  @Prop({ type: Object, default: () => {} })
  initialValues!: any

  @mediaNodeModule.State('selectItems') mediaNodes!: MediaNode[] | null
  @mediaNodeModule.Action('fetchSelectItems') getMediaNodes!: () => MediaNode[]

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

  get contentErrors () {
    const errors: string[] = []
    if (!this.$v.item.content || !this.$v.item.content.$dirty) { return errors }
    has(this.violations, 'content') && errors.push(this.violations.content)
    !this.$v.item.content.slug && errors.push('Le contenu doit faire au moins 2 caractères')
    return errors
  }

  get violations () {
    return this.errors || {}
  }

  mounted() {
    this.getMediaNodes()
  }
}
</script>
