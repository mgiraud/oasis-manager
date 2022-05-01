<template>
  <FormKit type="form">
    <FormKitSchema :schema="schema" />
  </FormKit>
</template>

<script setup lang="ts">
import { Page } from '~/store/page'

const props = defineProps<{page: Page}>()
const schema = [
  {
    $formkit: 'textarea',
    name: 'title',
    label: 'Titre',
    validation: 'required'
  },
  {
    $formkit: 'textarea',
    name: 'content',
    label: 'Contenu',
    validation: 'required'
  },
]
</script>
