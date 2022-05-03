<template>
  <Popover class="relative bg-black inline-flex p-2">
    <PopoverButton class="text-white" :class="props.btnClass" @click="props.clickHandler">
      <component :is="props.iconComponent" />
      {{ props.label }}
    </PopoverButton>

    <PopoverPanel class="absolute z-10">
      {{ props.label }}
    </PopoverPanel>
  </Popover>
</template>

<script setup lang="ts">

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

interface EditorBtnProps {
  btnClass?: object|null,
  clickHandler: Function,
  iconComponent: string,
  label: string
}

const props = defineProps<EditorBtnProps>()
</script>
