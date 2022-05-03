<template>
  <Popover class="relative bg-black inline-flex p-2 flex-auto">
    <PopoverButton @click.prevent="props.clickHandler" >
      <Icon :icon="props.iconComponent" :class="props.btnClass" class="h-6 w-6 fill-white"  @mouseenter="mouseOn = true" @mouseleave="mouseOn = false"/>
    </PopoverButton>

    <PopoverPanel class="absolute z-10 bg-sky-500 w-24 bottom-10 left-2" v-show="mouseOn" static>
      {{ props.label }}
    </PopoverPanel>
  </Popover>
</template>

<script setup lang="ts">

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import Icon from '~/components/util/Icon'

interface EditorBtnProps {
  btnClass?: object|null,
  clickHandler: Function,
  iconComponent: string,
  label: string
}

const props = defineProps<EditorBtnProps>()
const mouseOn = ref(false)
</script>
