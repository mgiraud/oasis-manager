<template>
  <Popover class="relative bg-black flex-auto inline-flex p-2" v-slot="{ open }">
    <PopoverButton class="text-white" @click="dialog = true" @mouseover="open = true" @mouseout="open = false">
      <Icon icon="ri-font-size" class="h-6 w-6 fill-white" />
    </PopoverButton>

    <PopoverPanel class="absolute z-10">
      Police de caractère
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
              <Listbox v-model="selectedFont">
                <ListboxOptions static>
                  <ListboxOption
                    v-for="(font, index) in fonts"
                    :key="index"
                    @click="selectFontFamily(font)"
                    class="cursor-pointer"
                    :style="'font-family: ' + font"
                  >
                    {{ font }}
                  </ListboxOption>
                  <ListboxOption
                    @click="removeFontFamily"
                    class="cursor-pointer"
                  >
                    Police par défaut
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
import { Popover, PopoverButton, PopoverPanel, TransitionRoot,
  TransitionChild, Dialog, DialogPanel, DialogTitle,
  Listbox, ListboxOptions, ListboxOption } from '@headlessui/vue'
import Icon from '~/components/util/Icon'

const fonts = [
  'Permanent Marker',
  'Amatic SC',
  'Caveat',
  'Helvetica'
]

interface FontFamilyBtnProps {
  editor: Editor|null,
}

const props = defineProps<FontFamilyBtnProps>()
const dialog = ref(false)
const selectedFont = ref(null)

const selectFontFamily = (font: string) => {
  props.editor?.chain().focus().setFontFamily(font).run()
  dialog.value = false
}

const removeFontFamily = () => {
  props.editor?.chain().focus().unsetFontFamily().run()
  dialog.value = false
}
</script>
