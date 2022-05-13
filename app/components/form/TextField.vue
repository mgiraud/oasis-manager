<template>
  <div class="flex flex-row group py-4 px-3">
    <Icon
      v-if="icon"
      :icon="icon"
      class="h-8 w-10 group-focus-within:stroke-2"
      :class="[`fill-${getColor()}`]"
    />
    <div class="relative w-full">
      <Field :as="as" :id="name" :name="name" :type="type" class="peer w-full outline-none h-fit" :class="{[`text-${disabledColor}`]: isDisabled}" v-bind="fieldAttrs"/>
      <label :for="name"
             :class="{'-top-6 pl-0': !!value, [`text-${getColor()}`]: true}"
             class="transform transition-all absolute top-0 left-0 h-fit flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:-top-6
          ">{{ label }} <Tooltip v-if="error">{{error}}</Tooltip></label>
      <div
        :class="{
        [`border-${getColor()}`]: true,
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
import { useFieldHelper } from '~/composables/useFieldHelper'

interface CustomFieldProps {
  name: string,
  label: string,
  type?: string,
  icon?: string,
  error?: string,
  value?: any,
  fieldAttrs ?: {[key: string]: string | number | boolean},
  as ?: string
}
const props = withDefaults(defineProps<CustomFieldProps>(), {
  type: 'text',
  fieldAttrs: {
    autocomplete: 'off',
    validateOnInput: true,
  },
  as: 'input'
})

const { isDisabled, disabledColor, getColor } = useFieldHelper(props)
</script>
