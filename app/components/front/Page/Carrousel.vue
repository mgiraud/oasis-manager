<template>
  <div class="overflow-hidden hidden md:flex flex-no-wrap flex-row bg-white" v-if="mediaNode.mediaObjects.length > 0">
<!--    <div @click="previous" class="cursor-pointer grow-0 w-0 flex z-10 items-center">-->
<!--      <div class="w-fit translate-x-1/2"><Icon icon="ri-arrow-left-s-fill" class="fill-white bg-primary rounded-full h-12 w-12 shadow-xs"/></div>-->
<!--    </div>-->
    <div class="flex flex-row flex-nowrap h-96 flex-auto bg-primary"
         :class="{
            'translate-x-0': !showTransition,
            'transition ease-in duration-700 -translate-x-full': showTransition
          }"
         @transitionend="updateOrder"
    >
      <div v-for="imageObject in mediaNode.mediaObjects"
           class="w-full shrink-0 flex items-center justify-center h-96 group"
           :class="`order-${order(imageObject)}`"
      >
        <img :src="imageObject.contentUrl" class="w-auto object-cover"/>
      </div>
    </div>
    <div @click="next" class="cursor-pointer grow-0 w-0 flex z-10 items-center" v-if="mediaNode.mediaObjects.length > 1">
      <div class="w-fit -translate-x-[150%]"><Icon icon="ri-arrow-right-s-fill" class="fill-white bg-primary rounded-full h-12 w-12 shadow-xs"/></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import Icon from '~/components/util/Icon.vue'
import { MediaNode } from '~/store/media-node'
import { MediaObject, useMediaObjectStore } from '~/store/media-object'

const props = defineProps<{
  mediaNode: MediaNode
}>()
const indexToOrder: Ref<{[index: number]: number }>  = ref({})
props.mediaNode.mediaObjects.forEach((mediaObject: MediaObject, index: number) => {
  mediaObject.index = index
  indexToOrder.value[index] = index + 1
})

const current = ref(0)
const nbItems = props.mediaNode.mediaObjects.length
const showTransition = ref(0)
const order = computed(() => (mediaObject: MediaObject) => {
  return indexToOrder.value[mediaObject.index ?? 0]
})

const next = () => {
  showTransition.value = 1;
}

const previous = () => {
  showTransition.value = -1;
}

const updateOrder = () => {
  if (showTransition.value !== 1) {
    return
  }
  if (current.value === (nbItems - 1)) {
    current.value = 0
  } else {
    current.value += 1
  }

  let order = 1;
  for (let i = current.value; i < nbItems; i++) {
    indexToOrder.value[i] = order
    order++;
  }

  for (let i = 0; i < current.value; i++) {
    indexToOrder.value[i] = order
    order++;
  }
  showTransition.value = 0;
}
</script>
