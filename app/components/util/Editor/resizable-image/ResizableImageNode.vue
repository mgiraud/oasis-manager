<template>
  <node-view-wrapper :style="{ display: nodeDisplay }">
    <div
      ref="imgContainer"
      class="img-container"
      :class="{'is-active': isActive}"
      draggable="true"
      contenteditable="false"
      data-drag-handle
      :style="{width: node.attrs.width}"
    >
      <img
        :src="node.attrs.src"
        :alt="node.attrs.title"
        style="width: 100%;"
        @click="isActive = !isActive"
      >
      <span
        v-show="isActive"
        class="handle"
        @mousedown.prevent="handleMouseDown($event)"
      />
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

interface EditorBtnProps {
  node: typeof NodeViewContent,
  extension: typeof NodeViewContent,
  updateAttributes: Function,
}

const props = defineProps<EditorBtnProps>()

    const isActive = ref(false)
    // const imgContainer = ref(null) as Ref<HTMLElement | null>

    const nodeDisplay = computed(() => {
      if (props.extension.options.inline) {
        return 'inline-block'
      }

      return 'block'
    })

    const handleMouseDown = (e: MouseEvent) => {
      // @ts-ignore
      const startWidth = parseFloat(props.node.attrs.width.match(/(.+)px/)[1])
      const startPosX = e.x

      const onMouseMove = (e: MouseEvent) => {
        const diffInPx = startPosX - e.pageX
        const width = `${startWidth - diffInPx}px`
        // @ts-ignore
        props.updateAttributes({
          width
        })
      }
      const onMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
</script>

<style>

.img-container {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.img-container.is-active {
  border: 1px dashed gray;
}

.handle {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  border: 3px solid black;
  border-top: none;
  border-left: none;
  cursor: nwse-resize;
}
</style>
