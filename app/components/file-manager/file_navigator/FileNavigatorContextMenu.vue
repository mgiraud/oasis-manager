<template>
  <div
    id="fileNavigatorContextMenu"
    class="context-menu flex flex-col"
  >
    <div @click="dialog = true">
      Ajouter un dossier
    </div>
  </div>
  <TransitionRoot appear :show="dialog" as="template" v-if="mediaNode">
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
                Ajouter un dossier
              </DialogTitle>
<!--              <v-form>-->
<!--                <v-text-field-->
<!--                  v-model="newFolderName"-->
<!--                  label="Nom du dossier"-->
<!--                  required-->
<!--                />-->
<!--              </v-form>-->
              <button
                class="bg-primary"
                @click.prevent="onFolderCreate"
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

import { Ref } from '@vue/reactivity'
import { MediaNode, useMediaNodeStore } from '~/store/media-node'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

interface FileNavigatorProps {
  mediaNode?: MediaNode | null,
  refresh: Function
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  mediaNode: null
})

const contextMenu: Ref<HTMLElement | null> = ref(null)
const dialog = ref(false)
const newFolderName = ref(null) as Ref<null | string>
const mediaNodeStore = useMediaNodeStore()

onMounted(() => {
  contextMenu.value = document.getElementById('fileNavigatorContextMenu') as HTMLElement
  document.addEventListener(document.ontouchstart !== null ? 'click' : 'touchstart', onClick, false)
})

const showMenu = (event: MouseEvent) => {
  if (!contextMenu.value) {
    return
  }
  if ((contextMenu.value.offsetWidth + event.pageX) >= window.innerWidth) {
    contextMenu.value.style.left = (event.pageX - contextMenu.value.offsetWidth + 2) + 'px'
  } else {
    contextMenu.value.style.left = (event.pageX - 2) + 'px'
  }
  if ((contextMenu.value.offsetHeight + event.pageY) >= window.innerHeight) {
    contextMenu.value.style.top = (event.pageY - contextMenu.value.offsetHeight + 2) + 'px'
  } else {
    contextMenu.value.style.top = (event.pageY - 2) + 'px'
  }
  contextMenu.value.classList.add('context-menu--active')
}

const hideMenu = () => {
  if (!contextMenu.value) {
    return
  }

  contextMenu.value.style.left = '0px'
  contextMenu.value.style.top = '0px'
  contextMenu.value.classList.remove('context-menu--active')
}

const onClick = (e: MouseEvent | TouchEvent) => {
  if (!e.target || !contextMenu.value) {
    return
  }
  if (!contextMenu.value.contains(e.target as Node)) {
    hideMenu()
  }
}

const onFolderCreate = async () => {
  dialog.value = false
  if (!newFolderName || !props.mediaNode) {
    return
  }
  await mediaNodeStore.create({
    name: newFolderName.value,
    parent: props.mediaNode['@id']
  })
  // @ts-ignore
  await props.refresh()
}
</script>

<style
  scoped
  lang="scss"
>
.context-menu {
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  position: fixed;
  z-index: 1000000;

  &--active {
    display: block;
  }
}
</style>
