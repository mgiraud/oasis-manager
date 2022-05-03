<template>
  <Popover class="relative bg-black inline-flex p-2">
    <PopoverButton class="text-white" :class="props.btnClass" @click="dialog = true">
      Couleur de fond
    </PopoverButton>

    <PopoverPanel class="absolute z-10">
      Couleur de fond
    </PopoverPanel>
  </Popover>

  <TransitionRoot appear :show="dialog" as="template">
    <Dialog as="div" @close="dialog = false" class="relative z-10">
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
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Sélectionne une couleur
              </DialogTitle>
              <Listbox v-model="selectedColor">
                <ListboxOptions static>
                  <ListboxOption
                    v-for="(color, index) in colors"
                    :key="index"
                    @click="chooseBackgroundColor(color)"
                    class="cursor-pointer"
                    :class="color.background"
                  >
                     
                  </ListboxOption>
                  <ListboxOption
                    @click="removeBackgroundColor"
                    class="cursor-pointer"
                  >
                    Aucune couleur
                  </ListboxOption>
                </ListboxOptions>
              </Listbox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/core'
import { EditorColor, editorColors } from './colors'
import { Popover, PopoverButton, PopoverPanel, TransitionRoot,
  TransitionChild, Dialog, DialogPanel, DialogTitle,
  Listbox, ListboxOptions, ListboxOption } from '@headlessui/vue'

interface TextColorBtnProps {
  editor: Editor|null,
}

const props = defineProps<TextColorBtnProps>()
const dialog = ref(false)
const colors = editorColors
const selectedColor = ref(null)

const chooseBackgroundColor = (backgroundColor: EditorColor) => {
  props.editor?.chain().focus().setBackgroundColor(backgroundColor.background).run()
  dialog.value = false
}

const removeBackgroundColor = () => {
  props.editor?.chain().focus().removeBackgroundColor().run()
  dialog.value = false
}
</script>
