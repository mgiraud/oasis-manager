<template>
  <ClientOnly>
    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-sm rounded bg-white p-4 rounded-lg flex flex-col">
          <DialogTitle class="pb-2">{{ title }}</DialogTitle>
          <DialogDescription class="pb-2">
            {{ description }}
          </DialogDescription>
          <slot></slot>
          <div class="self-center">
            <button @click="setIsOpen(false)" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Annuler</button>
            <button @click="handleRemove" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent">Confirmer</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </ClientOnly>
</template>


<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'

const props = withDefaults(defineProps<{
  open: boolean,
  handleRemove: Function,
  title?: string,
  description ?: string
}>(), {
  title: 'Suppression de l\'élément',
  description: 'Ceci va supprimer définitivement l\'élément'
})

const emit = defineEmits(['update:open'])
const isOpen = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  }
})

function setIsOpen(value: boolean) {
  isOpen.value = value
}
</script>
