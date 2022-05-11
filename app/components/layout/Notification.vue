<template>
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2">
    <TransitionRoot
      :show="show"
      enter="transition ease-in-out duration-3000 transform"
      enter-from="translate-y-full"
      enter-to="translate-y-0"
      leave="transition ease-in-out duration-3000 transform"
      leave-from="translate-y-0"
      leave-to="translate-y-full"
    >
      <div
        :class="`bg-${color}`"
        class="px-3 pt-3 pb-1 text-white rounded-tl-lg rounded-tr-lg"
      >
        {{ text }}
      </div>
    </TransitionRoot>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { TransitionRoot } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '~/store/notification'

const { color, text, show } = storeToRefs(useNotificationStore())
</script>
