<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.title"
            label="Titre"
            :error-messages="titleErrors"
            required
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
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
          sm="6"
          md="6"
        >
          <v-combobox
            v-if="categorySelectItems"
            v-model="item.category"
            :items="categorySelectItems"
            no-data-text="Aucune catégorie n'a ce nom"
            label="Catégorie de la page"
            item-text="name"
            item-value="@id"
            :return-object="false"
            clearable
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
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
              ref="editor"
              v-model="item.content"
            >
              <template #supplemental_btns>
                <v-dialog
                  v-model="dialog"
                  width="90%"
                >
                  <template #activator="{ on: onDropdown, attrs: attrsDropdown }">
                    <v-tooltip top>
                      <template #activator="{ on: onTooltip, attrs: attrsTooltip }">
                        <v-btn
                          small
                          v-bind="{...attrsDropdown, ...attrsTooltip}"
                          v-on="{...onDropdown, ...onTooltip}"
                        >
                          <v-icon>ri-download-cloud-line</v-icon>
                        </v-btn>
                      </template>
                      <span>Charger une ancienne version</span>
                    </v-tooltip>
                  </template>

                  <v-card>
                    <v-card-title class="headline grey lighten-2">
                      Sélectionner une version de la page
                    </v-card-title>

                    <v-card-text>
                      <v-select
                        v-model="selectedLog"
                        :items="pageLogs"
                        :item-text="(item) => {
                          return `#${item.id} ${formatDate(item.updatedAt)} - ${item.draft ? 'Automatique' : `Manuelle par ${item.updatedBy.nickname}`}`
                        }"
                        item-value="@id"
                        label="Choisissez une version"
                      />
                      <v-textarea
                        v-if="selectedLog && findLog(selectedLog)"
                        v-html="findLog(selectedLog).originalContent"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="primary"
                        text
                        @click.prevent="setContent"
                      >
                        Récupérer la version sélectionnée
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </Editor>
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, mixins, namespace, Prop } from 'nuxt-property-decorator'
import { required, minLength, helpers } from 'vuelidate/lib/validators'
import { formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'
import EditorBtn from '~/components/util/Editor/EditorBtn.vue'
import Editor from '~/components/util/Editor.vue'
import { PageCategory } from '~/store/page_category'
import { PageLog } from '~/store/page_log'
import { MediaNode } from '~/store/media_node'

const slug = helpers.regex('slug', /^[a-zA-Z0-9-]*$/)
const pageCategoryModule = namespace('page_category')
const pageLogModule = namespace('page_log')
const mediaNodeModule = namespace('media_node')

@Component({
  name: 'AdminPageForm',
  components: {
    Editor,
    EditorBtn
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
      content: {}
    }
  }
})
export default class AdminPageForm extends mixins(validationMixin) {
  @Prop({ type: Array, required: true })
  pageLogs!: PageLog[]

  @Prop({ type: Object, required: true })
  values!: any

  @Prop({ type: Object, default: () => {} })
  errors!: any

  @Prop({ type: Object, default: () => {} })
  initialValues!: any

  @pageCategoryModule.State('selectItems') categorySelectItems!: PageCategory[] | null
  @pageCategoryModule.Action('fetchSelectItems') categoryGetSelectItems!: () => PageCategory[]
  @pageLogModule.Getter('find') findLog!: (id: string) => PageLog | null
  @mediaNodeModule.State('selectItems') mediaNodes!: MediaNode[] | null
  @mediaNodeModule.Action('fetchSelectItems') getMediaNodes!: () => MediaNode[]

  dialog = false
  selectedLog: string | null = null

  get item () {
    return this.initialValues || this.values
  }

  get titleErrors () {
    const errors: string[] = []
    if (!this.$v.item.title || !this.$v.item.title.$dirty) {
      return errors
    }
    has(this.violations, 'title') && errors.push(this.violations.title)
    !this.$v.item.title.minLength &&
    errors.push('Le titre doit faire au moins 4 caractères')
    return errors
  }

  get urlErrors () {
    const errors: string[] = []
    if (!this.$v.item.url || !this.$v.item.url.$dirty) {
      return errors
    }
    has(this.violations, 'url') && errors.push(this.violations.url)
    !this.$v.item.url.minLength &&
    errors.push('Le titre doit faire au moins 2 caractères')
    !this.$v.item.url.slug &&
    errors.push(
      'L\'url doit contenir seulement des chiffres, des lettres et le tiret du haut -'
    )
    return errors
  }

  get contentErrors () {
    const errors: string[] = []
    if (!this.$v.item.content || !this.$v.item.content.$dirty) {
      return errors
    }
    has(this.violations, 'url') && errors.push(this.violations.content)
    !this.$v.item.content.slug &&
    errors.push('Le titre doit faire au moins 2 caractères')
    return errors
  }

  get violations () {
    return this.errors || {}
  }

  mounted () {
    this.categoryGetSelectItems()
    this.getMediaNodes()
  }

  setContent () {
    if (this.selectedLog && this.findLog(this.selectedLog) && this.$refs.editor) {
      const selectedLogObj = this.findLog(this.selectedLog)
      if (selectedLogObj) {
        (this.$refs.editor as Editor).setContent(selectedLogObj.originalContent)
      }
      this.dialog = false
    }
  }

  formatDate (rawDate: string) {
    return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
  }
}
</script>
