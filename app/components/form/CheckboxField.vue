<template>
  <div class="flex flex-row group py-4 px-3">
    <Field :id="name" v-bind="{fieldAttrs}" type="checkbox" :name="name" :value="true" :unchecked-value="false" class="h-5 w-5 mr-2" />
    <label :for="name">
      {{ label }}
      <Tooltip v-if="error">{{error}}</Tooltip>
    </label>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import Tooltip from '~/components/util/Tooltip.vue'

interface CustomFieldProps {
  name: string,
  label: string,
  error?: string,
  fieldAttrs ?: {[key: string]: string | number | boolean},
}
const props = withDefaults(defineProps<CustomFieldProps>(), {
  fieldAttrs: {
    autocomplete: 'off',
    validateOnInput: true,
  },
  as: 'input'
})
</script>
