<template>
  <div class="overflow-hidden hidden md:flex flex-no-wrap flex-row bg-white">
<!--    <div @click="previous" class="cursor-pointer grow-0 w-0 flex z-10 items-center">-->
<!--      <div class="w-fit translate-x-1/2"><Icon icon="ri-arrow-left-s-fill" class="fill-white bg-primary rounded-full h-12 w-12 shadow-xs"/></div>-->
<!--    </div>-->
    <div class="flex flex-row flex-nowrap h-96 flex-auto"
         :class="{
            'translate-x-0': !showTransition,
            'transition ease-in duration-700 -translate-x-full': showTransition
          }"
         @transitionend="updateOrder"
    >
      <div v-for="imageObject in mediaNode.mediaObjects"
           class="w-full shrink-0 flex items-center justify-center"
           :class="`order-${order(imageObject)}`"
      >
        <img :src="`http://via.placeholder.com/${indexTosize[imageObject.index]}`" class="w-auto max-h-96 object-scale-down"/>
      </div>
    </div>
    <div @click="next" class="cursor-pointer grow-0 w-0 flex z-10 items-center">
      <div class="w-fit -translate-x-[150%]"><Icon icon="ri-arrow-right-s-fill" class="fill-white bg-primary rounded-full h-12 w-12 shadow-xs"/></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from '@vue/reactivity'
import Icon from '~/components/util/Icon.vue'
import { MediaNode } from '~/store/media-node'
import { MediaObject } from '~/store/media-object'

const props = defineProps<{
  mediaNode: MediaNode
}>()
const indexToOrder: Ref<{[index: number]: number }>  = ref({
  0: 1,
  1: 2,
  2: 3
})
const indexTosize: Ref<{[index: number]: string }>  = ref({
  0: '2500x600',
  1: '340x260',
  2: '1080x260',
})
props.mediaNode.mediaObjects.forEach((mediaObject: MediaObject, index: number) => {
  mediaObject.index = index
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
console.log(indexToOrder.value)
  showTransition.value = 0;
}
</script>
