<template>
  <FileTreeViewItem
    v-for="item in items"
    :item="item"
    :level="1"
    v-model="choices"
  />
</template>

<script setup lang="ts">
import { FormKitFrameworkContext } from '@formkit/core'
import FileTreeViewItem from '~/components/file-manager/file_details/FileTreeViewItem.vue'

const props = defineProps<{
  context: FormKitFrameworkContext,
}>()

const items = computed(() => props.context.tree)
const choices = ref(props.context._value ? [...props.context._value] : [])

watch(choices, (newChoices) => {
  props.context.node.input(newChoices)
})
</script>
