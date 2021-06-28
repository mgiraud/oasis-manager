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

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { NodeViewWrapper, Node } from '@tiptap/vue-2'

export default defineComponent({
  components: {
    NodeViewWrapper
  },
  props: {
    node: {
      type: Object as () => Node,
      required: true
    },
    extension: {
      type: Object as () => Node,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const isActive = ref(false)
    // const imgContainer = ref(null) as Ref<HTMLElement | null>

    const nodeDisplay = computed(() => {
      if (props.extension.options.inline) {
        return 'inline-block'
      }

      return 'block'
    })

    const handleMouseDown = (e: MouseEvent) => {
      const startWidth = parseFloat(props.node.attrs.width.match(/(.+)px/)[1])
      const startPosX = e.x

      const onMouseMove = (e: MouseEvent) => {
        const diffInPx = startPosX - e.pageX
        const width = `${startWidth - diffInPx}px`
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

    return {
      isActive,
      nodeDisplay,
      handleMouseDown
    }
  }
})
</script>

<style lang="scss">

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
