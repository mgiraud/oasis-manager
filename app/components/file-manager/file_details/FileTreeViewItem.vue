<template>
  <div :class="`pl-${level}`">
    <input type="checkbox" :value="item['@id']" @change="onChange" v-model="isChecked" class="ring-primary text-primary border-0 rounded-md focus:ring-0">
    {{ item.name }}
    <FileTreeViewItem
      v-if="item.children.length > 0"
      v-for="child in item.children"
      :item="child"
      :level="level + 1"
      v-model="ids"
    />
  </div>
</template>

<script setup lang="ts">
import { MediaNodeItem } from '~/store/media-node'

const props = defineProps<{
  item: MediaNodeItem,
  level: number,
  modelValue: string[]
}>()

const items = computed(() => props.context.tree)

const emit = defineEmits(['update:modelValue'])
const ids = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const isChecked = computed(() => {
  return ids.value.indexOf(props.item['@id']) !== -1
})

function onChange(event) {
  if (event.target.checked) {
    ids.value = [...ids.value, event.target.value]
  } else {
    ids.value = ids.value.filter(val => val !== event.target.value)
  }
}
</script>
