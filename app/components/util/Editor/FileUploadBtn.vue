<template>
  <Popover class="relative bg-black flex-auto inline-flex p-2" v-slot="{ open }">
    <PopoverButton class="text-white" @click="dialog = true" @mouseover="open = true" @mouseout="open = false">
      <Icon icon="ri-file-transfer-line" class="h-6 w-6 fill-white" />
    </PopoverButton>

    <PopoverPanel class="absolute z-10">
      Téléverser un fichier
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
                Téléverser un fichier
              </DialogTitle>
<!--              <file-manager ref="fileManager" />-->
              <button
                class="bg-primary"
                @click.prevent="injectFilesAndCloseDialog"
              >
                Insérer
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/core'
import { Ref } from '@vue/reactivity'
// import FileManager, { Link, Thumbnail } from '../../file-manager/FileManager.vue'
import { Popover, PopoverButton, PopoverPanel, TransitionRoot,
  TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import Icon from '~/components/util/Icon'

interface FileUploadProps {
  editor: Editor|null,
}

const props = defineProps<FileUploadProps>()
const dialog = ref(false)
const fileManager = ref(null) as Ref<typeof FileManager | null>

const injectFilesAndCloseDialog = () => {
  // @ts-ignore
  fileManager.value?.thumbnails.forEach((thumbnail: Thumbnail) => {
    props.editor?.chain().focus().setImage({ src: thumbnail.src }).run()
  })
  // @ts-ignore
  fileManager.value?.links.forEach((link: Link) => {
    const node = props.editor?.schema.text(link.name, [props?.editor.schema.marks.link.create({ href: link.src })])
    // @ts-ignore
    props.editor?.view.dispatch(props.editor?.state.tr.replaceSelectionWith(node, false))
  })

  dialog.value = false
}

watch(dialog, () => {
  nextTick(() => {
    // @ts-ignore
    fileManager.value?.reset()
  })
})
</script>
