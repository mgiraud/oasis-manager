<template>
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2">
    <TransitionRoot
      :show="notificationStore.show"
      enter="transition ease-in-out duration-3000 transform"
      enter-from="translate-y-full"
      enter-to="translate-y-0"
      leave="transition ease-in-out duration-3000 transform"
      leave-from="translate-y-0"
      leave-to="translate-y-full"
    >
      <div
        :class="`bg-${notificationStore.color}`"
        class="px-3 pt-3 pb-1 text-white rounded-tl-lg rounded-tr-lg"
      >
        {{ notificationStore.text }}
      </div>
    </TransitionRoot>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { onMounted } from '@vue/runtime-core'
import { TransitionRoot } from '@headlessui/vue'
import { useNotificationStore } from '~/store/notification'

const test = ref(false);

onMounted(() => {
  setTimeout(() => {
    test.value = true
  }, 1000)
})

const notificationStore = useNotificationStore()
</script>
