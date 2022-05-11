<template>
  <div class="relative flex flex-col items-center group">
    <Icon :icon="icon" :class="iconClass"/>
    <div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex min-w-max">
      <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-accent shadow-lg">
        <slot></slot>
      </span>
      <div class="w-3 h-3 -mt-2 rotate-45 bg-secondary"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/util/Icon.vue'
interface TooltipProps {
  icon?: String,
  iconClass?: String,
}

const props = withDefaults(defineProps<TooltipProps>(), {
  icon: 'ri-error-warning-fill',
  iconClass: 'fill-accent h-6 w-6'
})
</script>
