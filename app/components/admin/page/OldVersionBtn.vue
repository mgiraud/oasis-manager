<template>
  <Popover class="relative bg-black flex-auto inline-flex p-2">
    <PopoverButton @click.prevent="dialog = true" >
      <Icon icon="ri-download-cloud-line" class="h-6 w-6 fill-white"  @mouseenter="mouseOn = true" @mouseleave="mouseOn = false"/>
    </PopoverButton>

    <PopoverPanel class="absolute z-10 bg-sky-500 w-24 bottom-10 left-2" v-show="mouseOn" static>
      Récupérer une ancienne version
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
                Récupérer une ancienne version
              </DialogTitle>
              <FormKit
                type="form"
                :actions="false"
                id="log"
                @submit="submitHandler"
              >
                <FormKit
                  type="select"
                  label="Choisis une version"
                  name="log"
                  :options="logs"
                  outer-class="w-full"
                  @change="onLogSelect"
                />
              </FormKit>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { getNode } from '@formkit/core'
import { Popover, PopoverButton, PopoverPanel, TransitionRoot,
  TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import Icon from '~/components/util/Icon.vue'
import { useDateHelper } from '~/composables/useDateHelper'
import { PageLog, usePageLogStore } from '~/store/page-logs'

const props = defineProps<{
  url: string,
  setContent: Function
}>()
const dialog = ref(false)
const mouseOn = ref(false)
const pageLogStore = usePageLogStore()
const { formatRDate } = useDateHelper();

const { refresh } = useAsyncData('page-log-stores', async () => {
  await pageLogStore.fetchAll({
    'page.url': props.url,
    'order[updatedAt]': 'desc'
  })
})
const logs = computed(() => {
  return pageLogStore.list.map(item => {
    return {
      value: item['@id'],
      label: `#${item.id} ${formatRDate(item.updatedAt)} - ${item.draft ? 'Automatique' : `Manuelle par ${item.updatedBy.nickname}`}`
    }
  })
})
const onLogSelect = () => {
  getNode('log')?.submit()
}
const submitHandler = (data: {log: string}) => {
  const pageLog: PageLog | undefined = pageLogStore.find(data.log);
  if (pageLog) {
    props.setContent(pageLog.originalContent)
  }
  dialog.value = false
}

watch(dialog, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    refresh()
  }
})
</script>
