<template>
<!--  <v-form>-->
<!--    <v-container>-->
<!--      <v-row>-->
<!--        <v-col cols="12">-->
<!--          <v-text-field-->
<!--            v-model="item.uniqueId"-->
<!--            label="Identifiant unique"-->
<!--            disabled-->
<!--          />-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--      <v-row>-->
<!--        <v-col cols="12">-->
<!--          <v-text-field-->
<!--            v-model="item.customName"-->
<!--            label="Nom personnalisé"-->
<!--            :error-messages="customNameErrors"-->
<!--            required-->
<!--            @input="v$.customName.$touch()"-->
<!--            @blur="v$.customName.$touch()"-->
<!--          />-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--      <v-row>-->
<!--        <v-col-->
<!--          cols="12"-->
<!--          md="12"-->
<!--        >-->
<!--          <p>Appartient aux catégories...</p>-->
<!--          <p-->
<!--            v-if="errors && errors.mediaNodes"-->
<!--            class="error&#45;&#45;text"-->
<!--          >-->
<!--            {{ errors.mediaNodes }}-->
<!--          </p>-->
<!--          <v-treeview-->
<!--            v-model="item.mediaNodes"-->
<!--            :items="tree"-->
<!--            selectable-->
<!--            rounded-->
<!--            hoverable-->
<!--            open-all-->
<!--            selection-type="independent"-->
<!--            item-key="@id"-->
<!--          />-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-container>-->
<!--  </v-form>-->
</template>

<script setup lang="ts">
import has from 'lodash/has'
import { MediaObject } from '~/store/media-object'
import { FormErrors } from '~/types/form'
interface FileDetailsFormProps {
  values: MediaObject,
  errors?: FormErrors | null
  tree?: string[]
}

const props = withDefaults(defineProps<FileDetailsFormProps>(), {
  errors: null,
  tree: []
})

const item = computed(() => props.values)

const violations = computed(() => props.errors)

// const customNameErrors = computed(() => {
//   const errors: string[] = []
//   if (!v$.value.customName || !v$.value.customName.$dirty) {
//     return errors
//   }
//   has(violations.value, 'customName') && errors.push(violations.value.customName)
//   v$.value.customName.minLength.$invalid && errors.push('Le nom personnalisé doit faire au moins 3 caractères')
//   return errors
// })
//
// const mediaNodesErrors = computed(() => {
//   const errors: string[] = []
//   if (!v$.value.mediaNodes || !v$.value.mediaNodes.$dirty) {
//     return errors
//   }
//   has(violations.value, 'mediaNodes') && errors.push(violations.value.mediaNodes)
//   v$.value.mediaNodes.minLength.$invalid && errors.push('Le fichier doit appartenir a au moins une galerie')
//   return errors
// })
</script>
