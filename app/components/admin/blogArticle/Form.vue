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
            @input="v$.title.$touch()"
            @blur="v$.title.$touch()"
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
          sm="6"
          md="6"
        >
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
            v-if="state.mediaNodes"
            v-model="item.mediaNode"
            :items="state.mediaNodes"
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
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { FormErrors } from '~/api/repository'
import { mediaNodeStore } from '~/store/MediaNodeStore'
import { Page } from '~/store/PageStore'
import Editor from '../../util/Editor.vue'

export default defineComponent({
  components: {
    Editor
  },
  props: {
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
    const item = computed(() => props.values)

    const validation = computed(() => ({
      title: {
        required,
        minLength: minLength(4)
      },
      content: {
        required,
        minLength: minLength(2)
      }
    }))

    const v$ = useVuelidate(validation, item)

    const violations = computed(() => props.errors)

    const titleErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.title || !v$.value.title.$dirty) {
        return errors
      }
      has(violations.value, 'title') && errors.push(violations.value.title)
      v$.value.title.minLength.$invalid && errors.push('Le titre doit faire au moins 4 caractères')
      return errors
    })

    const contentErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.content || !v$.value.content.$dirty) {
        return errors
      }
      has(violations.value, 'content') && errors.push(violations.value.content)
      v$.value.content.slug.$invalid && errors.push('Le contenu doit faire au moins 2 caractères')
      return errors
    })

    onMounted(() => {
      mediaNodeStore.fetchAll()
    })

    return {
      item,
      v$,
      titleErrors,
      contentErrors,
      state: mediaNodeStore.getState()
    }
  }
})
</script>
