<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" :open="show" @close="show = false" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-100"
            >
              <DialogTitle as="h3">Ajouter un dossier</DialogTitle>
              <FormKit
                type="form"
                @submit="onFolderCreate"
                :actions="false"
                id="folder"
              >
                <FormKit
                  name="name"
                  type="text"
                  label="Nom du dossier"
                  validation="length:3"
                  outer-class="w-full"
                />
              </FormKit>
              <button
                class="bg-primary text-white py-3 px-5 text-sm uppercase rounded-md hover:bg-primary-dark"
                @click.prevent="submitForm"
              >
                Créer le dossier
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">

import { getNode } from '@formkit/core'
import { Ref } from '@vue/reactivity'
import { MediaNode, useMediaNodeStore } from '~/store/media-node'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

interface FileNavigatorProps {
  mediaNode?: MediaNode | null,
  dialog: boolean
  refresh: Function
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  mediaNode: null
})

const emit = defineEmits(['update:dialog']);

const show = computed({
  get() {
    return props.dialog
  },
  set(value) {
    emit('update:dialog', value)
  }
})

const submitForm = () => {
  getNode('folder').submit()
}

const newFolderName = ref(null) as Ref<null | string>
const mediaNodeStore = useMediaNodeStore()

const onFolderCreate = async (data: {name: string}) => {
  show.value = false
  if (!data.name) {
    return
  }
  await mediaNodeStore.create({
    name: data.name,
    parent: props.mediaNode?.['@id']
  })
  // @ts-ignore
  await props.refresh()
}
</script>
