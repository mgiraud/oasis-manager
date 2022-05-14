<template>
  <div class="flex flex-col w-full">
    <FileTreeViewItem
      v-for="item in tree"
      :item="item"
      :level="1"
      v-model="choices"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import FileTreeViewItem from '~/components/file-manager/file_details/FileTreeViewItem.vue'
import { MediaNodeItem } from '~/store/media-node'

const props = defineProps<{
  name: string,
  tree: MediaNodeItem[],
  value: string[]
}>()

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});

const choices = ref(props.value ? [...props.value] : [])

watch(choices, (newChoices) => {
  inputValue.value = newChoices
  // props.context.node.input(newChoices)
})
</script>
