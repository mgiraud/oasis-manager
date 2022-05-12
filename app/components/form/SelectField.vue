<template>
  <div class="flex flex-row group py-4 px-3">
    <Icon
      v-if="icon"
      :icon="icon"
      class="h-8 w-10 group-focus-within:stroke-2"
      :class="{'fill-accent': !!error, 'fill-primary': !!value && !error, 'fill-gray-500': !value}"
    />
    <div class="relative w-full">
      <Field as="select" :id="name" :name="name" class="peer w-full outline-none h-8" v-bind="fieldAttrs">
        <option v-for="option in options" :value="option.value" :selected="option.value === value">{{option.label}}</option>
      </Field>
      <label :for="name"
             :class="{'text-accent': !!error, 'text-primary': !!value && !error}"
             class="h-1/2 -translate-y-full pl-0 transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full
          ">{{ label }} <Tooltip v-if="error">{{error}}</Tooltip></label>
      <div
        :class="{
        'border-accent': !!error,
        'border-primary': !!value && !error,
        'border-gray-500': !value,
        '-ml-8 w-[calc(100%_+_2rem)]': !!icon,
        'w-full': !icon
      }"
        class="absolute bottom-0 border-b"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import Tooltip from '~/components/util/Tooltip.vue'
import Icon from '~/components/util/Icon.vue'

interface CustomFieldProps {
  name: string,
  label: string,
  icon?: string,
  error?: string,
  value?: any,
  fieldAttrs ?: {[key: string]: string | number | boolean},
  options: [{name: string, value: string}]
}
const props = withDefaults(defineProps<CustomFieldProps>(), {
  fieldAttrs: {
    autocomplete: 'off',
    validateOnInput: true,
  },
  as: 'input'
})
</script>
