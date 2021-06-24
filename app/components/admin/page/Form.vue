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
            @input="v$.title.$touch()"
            @blur="v$.title.$touch()"
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
            @input="v$.url.$touch()"
            @blur="v$.url.$touch()"
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
            v-if="pageCategoryState.selectItems"
            v-model="item.category"
            :items="pageCategoryState.selectItems"
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
            v-if="mediaNodeState.selectItems"
            v-model="item.mediaNode"
            :items="mediaNodeState.selectItems"
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
import { PropType } from 'vue'
import { required, minLength} from '@vuelidate/validators'
import { formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import has from 'lodash/has'
import { FormErrors } from '~/api/repository'
import EditorBtn from '~/components/util/Editor/EditorBtn.vue'
import Editor from '~/components/util/Editor.vue'
import { computed, defineComponent, onMounted, Ref, ref, useContext, watch } from '@nuxtjs/composition-api'
import { PageLog } from '~/store/PageLogStore'
import { Page } from '~/store/PageStore'
import { mediaNodeStore } from '~/store/MediaNodeStore'
import { pageCategoryStore } from '~/store/PageCategoryStore'
import { pageLogStore } from '~/store/PageLogStore'
import useVuelidate from '@vuelidate/core'

const slug = value => value.match(/^[a-zA-Z0-9-]*$/)

export default defineComponent({
  components: {
    Editor,
    EditorBtn
  },
  props: {
    pageLogs: {
      type: Array as () => PropType<PageLog[]>,
      required: true
    },
    values: {
      type: Object as () => Page,
      required: true
    },
    errors: {
      type: Object as () => FormErrors,
      default: () => {}
    }
  },
  setup (props) {
    const context = useContext()
    mediaNodeStore.setContext(context)
    pageCategoryStore.setContext(context)
    pageLogStore.setContext(context)
    const dialog = ref(false)
    const selectedLog: Ref<string | null> = ref(null)
    const editor: Ref<Editor | null> = ref(null)
    const item = ref(props.values)

    watch(() => props.values, (values) => {
      console.log(values)
      item.value = values
    })
    const validation = computed(() => ({
      title: {
        required,
        minLength: minLength(4)
      },
      url: {
        required,
        minLength: minLength(2),
        slug
      }
    }))

    const v$ = useVuelidate(validation, item)

    const violations = computed(() => {
      return props.errors || {}
    })

    const titleErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.title || !v$.value.title.$dirty) {
        return errors
      }
      has(violations.value, 'title') && errors.push(violations.value.title)
      v$.value.title.required.$invalid && errors.push('Le titre est obligatoire')
      v$.value.title.minLength.$invalid && errors.push('Le titre doit faire au moins 4 caractères')
      return errors
    })

    const urlErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.url || !v$.value.url.$dirty) {
        return errors
      }
      has(violations.value, 'url') && errors.push(violations.value.url)
      v$.value.url.minLength.$invalid && errors.push('Le titre doit faire au moins 2 caractères')
      v$.value.url.slug.$invalid && errors.push('L\'url doit contenir seulement des chiffres, des lettres et le tiret du haut -')
      return errors
    })

    const contentErrors = computed(() => {
      const errors: string[] = []
      if (!v$.content || !v$.content.$dirty) {
        return errors
      }
      has(violations.value, 'url') && errors.push(violations.value.content)
      v$.content.slug.$invalid && errors.push('Le titre doit faire au moins 2 caractères')
      return errors
    })

    onMounted(() => {
      pageCategoryStore.fetchSelectItems()
      mediaNodeStore.fetchSelectItems()
    })

    const setContent = () => {
      if (selectedLog && pageLogStore.find(selectedLog.value) && editor.value) {
        const selectedLogObj = pageLogStore.find(selectedLog.value)
        if (selectedLogObj) {
          editor.value.setContent(selectedLogObj.originalContent)
        }
        dialog.value = false
      }
    }

    const formatDate = (rawDate: string) => {
      return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
    }

    return {
      item,
      titleErrors,
      urlErrors,
      contentErrors,
      formatDate,
      dialog,
      setContent,
      selectedLog,
      v$,
      mediaNodeState: mediaNodeStore.getState(),
      pageCategoryState: pageCategoryStore.getState(),
      findLog: pageLogStore.find,
      editor
    }
  }
})
</script>
