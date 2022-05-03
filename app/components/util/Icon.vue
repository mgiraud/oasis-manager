<template>
  <svg>
    <use v-bind:xlink:href="path"></use>
  </svg>
</template>

<script setup lang="ts">
interface IconProps {
  icon: String,
}
const props = defineProps<IconProps>()
const path = `/icons/remixicon.symbol.svg#${props.icon}`
</script>
