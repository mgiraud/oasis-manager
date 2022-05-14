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
              <Form
                v-slot="{ values, errors }"
                @submit="onFolderCreate"
                class="flex flex-row flex-wrap"
                :validation-schema="{name: 'min:3'}"
              >
                <TextField name="name" :error="errors.name" :value="values.name" label="Nom du dossier" class="w-full" />
                <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Créer le dossier</button>
              </Form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">

import { MediaNode, useMediaNodeStore } from '~/store/media-node'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { Form } from 'vee-validate';
import TextField from '~/components/form/TextField.vue'

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
